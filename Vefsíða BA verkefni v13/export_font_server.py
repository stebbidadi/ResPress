from __future__ import annotations

import base64
import copy
import io
import math
import os
import zipfile
import smtplib
from dataclasses import dataclass
from typing import Dict, Optional, Tuple

from email.message import EmailMessage
from flask import Flask, jsonify, request
from flask_cors import CORS
from fontTools.pens.ttGlyphPen import TTGlyphPen
from fontTools.pens.t2CharStringPen import T2CharStringPen
from fontTools.ttLib import TTFont


app = Flask(__name__)
CORS(app, resources={
    r"/export-font": {"origins": "*"},
    r"/export-font-legacy": {"origins": "*"},
    r"/email-font": {"origins": "*"},
    r"/email-font-legacy": {"origins": "*"},
})

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

LEGACY_FONT_PATHS = {
    "plex": os.path.join(BASE_DIR, "fonts", "IBMPlexMono-Regular.ttf"),
    "vt323": os.path.join(BASE_DIR, "fonts", "VT323-Regular.ttf"),
    "times": os.path.join(BASE_DIR, "fonts", "Tinos-Regular.ttf"),
    "impact": os.path.join(BASE_DIR, "fonts", "Anton-Regular.ttf"),
}

DEFAULT_GLYPHS = (
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    'ÁáÐðÉéÍíÓóÚúÝýÞþÆæÖö'
    '0123456789.,:;!?\'"()[]{}<>+-=_/\\\\@#%&* '
)


@dataclass
class ExportSettings:
    resolution: float
    scale: float
    hinting: bool
    inverted: bool
    grid_visible: bool
    color_mode: bool
    threshold_label: str
    glyphs: str


def b64decode_to_bytes(data: str) -> bytes:
    return base64.b64decode(data.encode("utf-8"))


def b64encode_bytes(data: bytes) -> str:
    return base64.b64encode(data).decode("utf-8")


def sanitize_filename(value: str, fallback: str = "unstable-letters-font") -> str:
    value = (value or "").strip()
    cleaned = "".join(ch for ch in value if ch not in '<>:"/\\|?*\x00')
    cleaned = "-".join(cleaned.split())
    cleaned = cleaned.strip(".-")
    return cleaned or fallback


def get_export_settings(payload: dict) -> ExportSettings:
    raw = payload.get("settings", {}) or {}
    return ExportSettings(
        resolution=float(raw.get("resolution", 40)),
        scale=float(raw.get("scale", 100)),
        hinting=bool(raw.get("hinting", False)),
        inverted=bool(raw.get("inverted", False)),
        grid_visible=bool(raw.get("gridVisible", False)),
        color_mode=bool(raw.get("colorMode", False)),
        threshold_label=str(raw.get("thresholdLabel", "Unstable")),
        glyphs=str(raw.get("glyphs", DEFAULT_GLYPHS)) or DEFAULT_GLYPHS,
    )


def get_outline_kind(font: TTFont) -> str:
    if "glyf" in font:
        return "glyf"
    if "CFF2" in font:
        return "CFF2"
    if "CFF " in font:
        return "CFF"
    raise ValueError("Unsupported font outline format. Expected glyf, CFF, or CFF2.")


def set_all_name_records(font: TTFont, family_name: str, style_name: str = "Regular") -> None:
    if "name" not in font:
        return

    full_name = f"{family_name} {style_name}".strip()
    postscript_name = f"{family_name.replace(' ', '')}-{style_name.replace(' ', '')}"[:63]
    replacements = {
        1: family_name,
        2: style_name,
        4: full_name,
        6: postscript_name,
        16: family_name,
        17: style_name,
    }

    for record in font["name"].names:
        replacement = replacements.get(record.nameID)
        if replacement is None:
            continue
        try:
            record.string = replacement.encode(record.getEncoding(), errors="replace")
        except Exception:
            try:
                record.string = replacement.encode("utf-16-be")
            except Exception:
                pass


def compute_glyph_bounds(font: TTFont, glyph_name: str) -> Optional[Tuple[float, float, float, float]]:
    glyph_set = font.getGlyphSet()
    from fontTools.pens.recordingPen import RecordingPen

    rec = RecordingPen()
    try:
        glyph_set[glyph_name].draw(rec)
    except Exception:
        return None

    min_x = math.inf
    min_y = math.inf
    max_x = -math.inf
    max_y = -math.inf

    for operator, operands in rec.value:
        if operator in {"moveTo", "lineTo"}:
            x, y = operands[0]
            min_x = min(min_x, x)
            min_y = min(min_y, y)
            max_x = max(max_x, x)
            max_y = max(max_y, y)
        elif operator in {"qCurveTo", "curveTo"}:
            for pt in operands:
                if pt is None:
                    continue
                x, y = pt
                min_x = min(min_x, x)
                min_y = min(min_y, y)
                max_x = max(max_x, x)
                max_y = max(max_y, y)

    if min_x is math.inf:
        return None
    return min_x, min_y, max_x, max_y


def set_glyph_from_bitmap(font: TTFont, glyph_name: str, bitmap_payload: dict) -> None:
    outline_kind = get_outline_kind(font)

    cols = int(bitmap_payload["width"])
    rows = int(bitmap_payload["height"])
    pixels = bitmap_payload["pixels"]
    bounds = bitmap_payload["bounds"]

    min_x = float(bounds["minX"])
    min_y = float(bounds["minY"])
    max_x = float(bounds["maxX"])
    max_y = float(bounds["maxY"])

    if cols <= 0 or rows <= 0 or len(pixels) != cols * rows:
        raise ValueError(f"Invalid bitmap payload for glyph {glyph_name}")

    target_w = max(1.0, max_x - min_x)
    target_h = max(1.0, max_y - min_y)

    cell_w = target_w / cols
    cell_h = target_h / rows

    if outline_kind == "glyf":
        pen = TTGlyphPen(font.getGlyphSet())
    else:
        pen = T2CharStringPen(width=None, glyphSet=font.getGlyphSet(), roundTolerance=0.5)

    for row in range(rows):
        for col in range(cols):
            idx = row * cols + col
            if not pixels[idx]:
                continue

            x0 = min_x + col * cell_w
            x1 = min_x + (col + 1) * cell_w
            y_top = max_y - row * cell_h
            y_bottom = max_y - (row + 1) * cell_h

            pen.moveTo((round(x0), round(y_top)))
            pen.lineTo((round(x1), round(y_top)))
            pen.lineTo((round(x1), round(y_bottom)))
            pen.lineTo((round(x0), round(y_bottom)))
            pen.closePath()

    if outline_kind == "glyf":
        glyph = pen.glyph()
        glyph.recalcBounds(font["glyf"])
        font["glyf"][glyph_name] = glyph
    else:
        cff_table = font["CFF2"] if "CFF2" in font else font["CFF "]
        top_dict = cff_table.cff.topDictIndex[0]
        private = getattr(top_dict, "Private", None)
        charstring = pen.getCharString(
            private=private,
            globalSubrs=getattr(top_dict, "GlobalSubrs", None),
            optimize=True,
        )
        top_dict.CharStrings[glyph_name] = charstring


def align_rebuilt_glyph_to_source(font: TTFont, source_font: TTFont, glyph_name: str) -> None:
    source_bounds = compute_glyph_bounds(source_font, glyph_name)
    rebuilt_bounds = compute_glyph_bounds(font, glyph_name)

    if not source_bounds or not rebuilt_bounds:
        return

    src_min_x, src_min_y, _, _ = source_bounds
    new_min_x, new_min_y, _, _ = rebuilt_bounds

    dx = int(round(src_min_x - new_min_x))
    dy = int(round(src_min_y - new_min_y))

    if dx == 0 and dy == 0:
        return

    outline_kind = get_outline_kind(font)

    if outline_kind == "glyf":
        glyph = font["glyf"][glyph_name]
        if hasattr(glyph, "coordinates") and glyph.coordinates is not None:
            glyph.coordinates.translate((dx, dy))
            glyph.recalcBounds(font["glyf"])


def update_hmtx_after_outline_change(font: TTFont, source_font: TTFont, glyph_name: str) -> None:
    if "hmtx" not in font or "hmtx" not in source_font:
        return
    if glyph_name in source_font["hmtx"].metrics:
        font["hmtx"].metrics[glyph_name] = source_font["hmtx"].metrics[glyph_name]


def update_font_vertical_metrics(font: TTFont, source_font: TTFont) -> None:
    y_min = None
    y_max = None

    for glyph_name in font.getGlyphOrder():
        bounds = compute_glyph_bounds(font, glyph_name)
        if not bounds:
            continue
        _, gy_min, _, gy_max = bounds
        y_min = gy_min if y_min is None else min(y_min, gy_min)
        y_max = gy_max if y_max is None else max(y_max, gy_max)

    if y_min is None or y_max is None:
        return

    units_per_em = int(font["head"].unitsPerEm) if "head" in font else 1000
    pad = max(20, int(units_per_em * 0.04))

    if "hhea" in font and "hhea" in source_font:
        font["hhea"].ascent = source_font["hhea"].ascent
        font["hhea"].descent = source_font["hhea"].descent
        font["hhea"].lineGap = source_font["hhea"].lineGap

    if "OS/2" in font and "OS/2" in source_font:
        src_os2 = source_font["OS/2"]
        os2 = font["OS/2"]
        os2.sTypoAscender = src_os2.sTypoAscender
        os2.sTypoDescender = src_os2.sTypoDescender
        os2.sTypoLineGap = src_os2.sTypoLineGap
        os2.usWinAscent = src_os2.usWinAscent
        os2.usWinDescent = src_os2.usWinDescent

    needed_y_max = int(y_max + pad)
    needed_y_min = int(y_min - pad)

    if "hhea" in font:
        font["hhea"].ascent = max(font["hhea"].ascent, needed_y_max)
        font["hhea"].descent = min(font["hhea"].descent, needed_y_min)

    if "OS/2" in font:
        os2 = font["OS/2"]
        os2.usWinAscent = max(os2.usWinAscent, max(0, needed_y_max))
        os2.usWinDescent = max(os2.usWinDescent, max(0, abs(needed_y_min)))

    if "head" in font:
        font["head"].yMax = max(font["head"].yMax, needed_y_max)
        font["head"].yMin = min(font["head"].yMin, needed_y_min)


def rebuild_derivative_font(
    source_font: TTFont,
    family_name: str,
    glyph_bitmaps: Dict[str, dict],
) -> TTFont:
    font = copy.deepcopy(source_font)
    outline_kind = get_outline_kind(font)

    for glyph_name, bitmap_payload in glyph_bitmaps.items():
        if glyph_name not in font.getGlyphOrder():
            continue
        set_glyph_from_bitmap(font, glyph_name, bitmap_payload)
        align_rebuilt_glyph_to_source(font, source_font, glyph_name)
        update_hmtx_after_outline_change(font, source_font, glyph_name)

    if outline_kind == "glyf" and "maxp" in font:
        font["maxp"].numGlyphs = len(font.getGlyphOrder())

    update_font_vertical_metrics(font, source_font)
    set_all_name_records(font, family_name, "Regular")
    return font


def source_extension(file_name: str, font: TTFont) -> str:
    lower = (file_name or "").lower()
    if lower.endswith(".otf"):
        return ".otf"
    if lower.endswith(".ttf"):
        return ".ttf"
    return ".otf" if get_outline_kind(font) in {"CFF", "CFF2"} else ".ttf"


def build_zip_bytes(
    source_font_bytes: bytes,
    source_file_name: str,
    export_name: str,
    settings: ExportSettings,
    glyph_bitmaps: Dict[str, dict],
    export_card_png_base64: Optional[str],
    include_ttf_secondary: bool = False,
) -> Tuple[bytes, str]:
    export_name = sanitize_filename(export_name)

    source_font = TTFont(
        io.BytesIO(source_font_bytes),
        recalcBBoxes=True,
        recalcTimestamp=False,
    )

    derivative_font = rebuild_derivative_font(
        source_font=source_font,
        family_name=export_name,
        glyph_bitmaps=glyph_bitmaps,
    )

    outline_kind = get_outline_kind(source_font)
    derivative_ext = ".otf" if include_ttf_secondary or outline_kind in {"CFF", "CFF2"} else ".ttf"

    derivative_out_name = f"{export_name}{derivative_ext}"
    secondary_ttf_out_name = f"{export_name}.ttf"
    card_out_name = f"{export_name}-card.png"
    zip_name = f"{export_name}.zip"

    derivative_buf = io.BytesIO()
    derivative_font.save(derivative_buf)
    derivative_bytes = derivative_buf.getvalue()

    zip_buf = io.BytesIO()
    with zipfile.ZipFile(zip_buf, "w", compression=zipfile.ZIP_DEFLATED) as zf:
        zf.writestr(derivative_out_name, derivative_bytes)

        if include_ttf_secondary and secondary_ttf_out_name != derivative_out_name:
            zf.writestr(secondary_ttf_out_name, derivative_bytes)

        if export_card_png_base64:
            zf.writestr(card_out_name, b64decode_to_bytes(export_card_png_base64))

    return zip_buf.getvalue(), zip_name



def send_zip_email(email_to: str, export_name: str, zip_name: str, zip_bytes: bytes) -> None:
    smtp_host = os.environ.get("EXPORT_FONT_SMTP_HOST")
    smtp_port = int(os.environ.get("EXPORT_FONT_SMTP_PORT", "587"))
    smtp_user = os.environ.get("EXPORT_FONT_SMTP_USER")
    smtp_pass = os.environ.get("EXPORT_FONT_SMTP_PASS")
    smtp_from = os.environ.get("EXPORT_FONT_SMTP_FROM") or smtp_user
    use_ssl = os.environ.get("EXPORT_FONT_SMTP_SSL", "0") == "1"

    if not smtp_host or not smtp_from:
        raise RuntimeError(
            "Email is not configured. Set EXPORT_FONT_SMTP_HOST and EXPORT_FONT_SMTP_FROM "
            "(plus EXPORT_FONT_SMTP_USER / EXPORT_FONT_SMTP_PASS if your SMTP server needs login)."
        )

    msg = EmailMessage()
    msg["Subject"] = f"Your custom font export: {export_name}"
    msg["From"] = smtp_from
    msg["To"] = email_to
    msg.set_content(
        "Here is your custom font export from Unstable Letters.\n\n"
        "The ZIP contains the generated font file and the export card."
    )
    msg.add_attachment(
        zip_bytes,
        maintype="application",
        subtype="zip",
        filename=zip_name,
    )

    if use_ssl:
        with smtplib.SMTP_SSL(smtp_host, smtp_port) as server:
            if smtp_user and smtp_pass:
                server.login(smtp_user, smtp_pass)
            server.send_message(msg)
    else:
        with smtplib.SMTP(smtp_host, smtp_port) as server:
            server.starttls()
            if smtp_user and smtp_pass:
                server.login(smtp_user, smtp_pass)
            server.send_message(msg)


def email_zip_response(payload: dict, zip_bytes: bytes, zip_name: str, export_name: str):
    email_to = (payload.get("email_to") or "").strip()
    if not email_to or "@" not in email_to:
        return ("Missing or invalid email_to", 400)

    send_zip_email(email_to, export_name, zip_name, zip_bytes)
    return jsonify({"ok": True})


@app.route("/export-font", methods=["POST"])
def export_font():
    payload = request.get_json(force=True, silent=False)

    font_base64 = payload.get("font_base64")
    file_name = payload.get("file_name", "uploaded-font.ttf")
    export_name = payload.get("export_name", "unstable-letters-font")
    export_card_png_base64 = payload.get("export_card_png_base64")
    glyph_bitmaps = payload.get("glyph_bitmaps") or {}

    if not font_base64:
        return ("Missing font_base64", 400)

    if not glyph_bitmaps:
        return ("Missing glyph_bitmaps", 400)

    try:
        settings = get_export_settings(payload)
        source_font_bytes = b64decode_to_bytes(font_base64)
        zip_bytes, zip_name = build_zip_bytes(
            source_font_bytes,
            file_name,
            export_name,
            settings,
            glyph_bitmaps,
            export_card_png_base64,
        )
    except Exception as exc:
        return (f"Export failed: {exc}", 500)

    return jsonify({
        "zip_filename": zip_name,
        "zip_base64": b64encode_bytes(zip_bytes),
    })


@app.route("/export-font-legacy", methods=["POST"])
def export_font_legacy():
    payload = request.get_json(force=True, silent=False)

    font_key = payload.get("font_key")
    export_name = payload.get("export_name", "unstable-letters-font")
    export_card_png_base64 = payload.get("export_card_png_base64")
    glyph_bitmaps = payload.get("glyph_bitmaps") or {}

    if not font_key:
        return ("Missing font_key", 400)

    if font_key not in LEGACY_FONT_PATHS:
        return (f"Unsupported legacy font key: {font_key}", 400)

    if not glyph_bitmaps:
        return ("Missing glyph_bitmaps", 400)

    font_path = LEGACY_FONT_PATHS[font_key]
    if not os.path.exists(font_path):
        return (f"Legacy font file not found: {font_path}", 400)

    try:
        settings = get_export_settings(payload)

        with open(font_path, "rb") as f:
            source_font_bytes = f.read()

        source_file_name = os.path.basename(font_path)

        zip_bytes, zip_name = build_zip_bytes(
            source_font_bytes,
            source_file_name,
            export_name,
            settings,
            glyph_bitmaps,
            export_card_png_base64,
            include_ttf_secondary=True,
        )
    except Exception as exc:
        return (f"Export failed: {exc}", 500)

    return jsonify({
        "zip_filename": zip_name,
        "zip_base64": b64encode_bytes(zip_bytes),
    })



@app.route("/email-font", methods=["POST"])
def email_font():
    payload = request.get_json(force=True, silent=False)

    font_base64 = payload.get("font_base64")
    file_name = payload.get("file_name", "uploaded-font.ttf")
    export_name = payload.get("export_name", "unstable-letters-font")
    export_card_png_base64 = payload.get("export_card_png_base64")
    glyph_bitmaps = payload.get("glyph_bitmaps") or {}

    if not font_base64:
        return ("Missing font_base64", 400)

    if not glyph_bitmaps:
        return ("Missing glyph_bitmaps", 400)

    try:
        settings = get_export_settings(payload)
        source_font_bytes = b64decode_to_bytes(font_base64)
        zip_bytes, zip_name = build_zip_bytes(
            source_font_bytes,
            file_name,
            export_name,
            settings,
            glyph_bitmaps,
            export_card_png_base64,
        )
        return email_zip_response(payload, zip_bytes, zip_name, sanitize_filename(export_name))
    except Exception as exc:
        return (f"Email export failed: {exc}", 500)


@app.route("/email-font-legacy", methods=["POST"])
def email_font_legacy():
    payload = request.get_json(force=True, silent=False)

    font_key = payload.get("font_key")
    export_name = payload.get("export_name", "unstable-letters-font")
    export_card_png_base64 = payload.get("export_card_png_base64")
    glyph_bitmaps = payload.get("glyph_bitmaps") or {}

    if not font_key:
        return ("Missing font_key", 400)

    if font_key not in LEGACY_FONT_PATHS:
        return (f"Unsupported legacy font key: {font_key}", 400)

    if not glyph_bitmaps:
        return ("Missing glyph_bitmaps", 400)

    font_path = LEGACY_FONT_PATHS[font_key]
    if not os.path.exists(font_path):
        return (f"Legacy font file not found: {font_path}", 400)

    try:
        settings = get_export_settings(payload)
        with open(font_path, "rb") as f:
            source_font_bytes = f.read()

        zip_bytes, zip_name = build_zip_bytes(
            source_font_bytes,
            os.path.basename(font_path),
            export_name,
            settings,
            glyph_bitmaps,
            export_card_png_base64,
            include_ttf_secondary=True,
        )
        return email_zip_response(payload, zip_bytes, zip_name, sanitize_filename(export_name))
    except Exception as exc:
        return (f"Email export failed: {exc}", 500)


if __name__ == "__main__":
    host = os.environ.get("EXPORT_FONT_HOST", "127.0.0.1")
    port = int(os.environ.get("EXPORT_FONT_PORT", "8000"))
    app.run(host=host, port=port, debug=True)