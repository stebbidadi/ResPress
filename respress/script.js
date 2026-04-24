// --------------------------------------------------
// DOM REFERENCES
// --------------------------------------------------

const textInput = document.getElementById('textInput');
const inputCount = document.getElementById('inputCount');
const resSlider = document.getElementById('resSlider');
const resValue = document.getElementById('resValue');
const scaleSlider = document.getElementById('scaleSlider');
const scaleValue = document.getElementById('scaleValue');

const displayCanvas = document.getElementById('displayCanvas');
const sourceCanvas = document.getElementById('sourceCanvas');
const bufferCanvas = document.getElementById('bufferCanvas');
const compositionCanvas = document.getElementById('compositionCanvas');
const stage = document.getElementById('stage');
const stageScroller = document.getElementById('stageScroller');

const displayCtx = displayCanvas.getContext('2d', { willReadFrequently: true });
const sourceCtx = sourceCanvas.getContext('2d', { willReadFrequently: true });
const bufferCtx = bufferCanvas.getContext('2d', { willReadFrequently: true });
const compositionCtx = compositionCanvas.getContext('2d', { willReadFrequently: true });

const hintBtn = document.getElementById('hintBtn');
const contrastBtn = document.getElementById('contrastBtn');
const gridBtn = document.getElementById('gridBtn');
const shapeBtn = document.getElementById('shapeBtn');
const infoBtn = document.getElementById('infoBtn');
const presentationBtn = document.getElementById('presentationBtn');
const langBtn = document.getElementById('langBtn');
const resetBtn = document.getElementById('resetBtn');

const fontMenuBtn = document.getElementById('fontMenuBtn');
const fontMenu = document.getElementById('fontMenu');
const fontMenuWrap = document.querySelector('.font-menu-wrap');
const fontOptions = Array.from(document.querySelectorAll('.font-option'));
const uploadFontBtn = document.getElementById('uploadFontBtn');
const customFontBtn = document.getElementById('customFontBtn');
const fontUploadInput = document.getElementById('fontUploadInput');

const toolsMenuBtn = document.getElementById('toolsMenuBtn');
const toolsMenu = document.getElementById('toolsMenu');
const toolsMenuWrap = document.querySelector('.tools-menu-wrap');

const downloadMenuBtn = document.getElementById('downloadMenuBtn');
const downloadMenu = document.getElementById('downloadMenu');
const downloadPngBtn = document.getElementById('downloadPngBtn');
const downloadFontBtn = document.getElementById('downloadFontBtn');
const emailFontBtn = document.getElementById('emailFontBtn');
const downloadMenuWrap = document.querySelector('.download-menu-wrap');

const helpBtn = document.getElementById('helpBtn');
const helpPanel = document.getElementById('helpPanel');

const exportModal = document.getElementById('exportModal');
const exportModalTitle = document.getElementById('exportModalTitle');
const exportNameInput = document.getElementById('exportNameInput');
const exportCancelBtn = document.getElementById('exportCancelBtn');
const exportConfirmBtn = document.getElementById('exportConfirmBtn');
const exportEmailInput = document.getElementById('exportEmailInput');

const projectPopup = document.getElementById('projectPopup');
const projectPopupText = document.getElementById('projectPopupText');
const projectPopupClose = document.getElementById('projectPopupClose');
const projectPopupContinue = document.getElementById('projectPopupContinue');
const projectPopupLangBtn = document.getElementById('projectPopupLangBtn');

const projectTag = document.getElementById('projectTag');

const sliderLabel = document.getElementById('sliderLabel');
const sliderMin = document.getElementById('sliderMin');
const sliderMax = document.getElementById('sliderMax');
const scaleLabel = document.getElementById('scaleLabel');
const scaleMin = document.getElementById('scaleMin');
const scaleMax = document.getElementById('scaleMax');

const introScreen = document.getElementById('introScreen');
const introCanvas = document.getElementById('introCanvas');
const introCredit = document.getElementById('introCredit');
const introLangBtn = document.getElementById('introLangBtn');
const startBtn = document.getElementById('startBtn');
const app = document.getElementById('app');

const introCtx = introCanvas.getContext('2d', { willReadFrequently: true });
const introSourceCanvas = document.createElement('canvas');
const introBufferCanvas = document.createElement('canvas');
const introSourceCtx = introSourceCanvas.getContext('2d', { willReadFrequently: true });
const introBufferCtx = introBufferCanvas.getContext('2d', { willReadFrequently: true });

// --------------------------------------------------
// CONSTANTS
// --------------------------------------------------

const DEFAULT_TEXT =
  'letters are what is legible. If something is not legible, then it is not letters. There are no illegible letters. Illegibility does not exist.';

const EXPORTED_GLYPHS =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzÁáÐðÉéÍíÓóÚúÝýÞþÆæÖö0123456789.,:;!?\'"()[]{}<>+-=_/\\\\@#%&* ';

  const fontMap = {
    plex: '"IBM Plex Mono", monospace',
    vt323: '"VT323", monospace',
    times: '"Tinos", serif',
    impact: '"Anton", sans-serif'
  };
  
  const fontLabels = {
    plex: 'IBM Plex Mono',
    vt323: 'VT323',
    times: 'Tinos',
    impact: 'Anton'
  };

const EXPORT_BACKEND_BASE = (window.RESPRESS_EXPORT_BACKEND_URL || '').replace(/\/$/, '');
const EXPORT_BACKEND_URL = `${EXPORT_BACKEND_BASE}/export-font`;
const EXPORT_LEGACY_BACKEND_URL = `${EXPORT_BACKEND_BASE}/export-font-legacy`;
const EMAIL_BACKEND_URL = `${EXPORT_BACKEND_BASE}/email-font`;
const EMAIL_LEGACY_BACKEND_URL = `${EXPORT_BACKEND_BASE}/email-font-legacy`;
const LEGACY_EXPORT_SOURCE_SIZE = 96;
const LEGACY_EXPORT_PADDING = 12;

// --------------------------------------------------
// TRANSLATIONS
// --------------------------------------------------

const translations = {
  en: {
    title: 'ResPress',
    placeholder: 'Type here',
    sliderLabel: 'Unstable → Stable',
    sliderMin: 'Unreadable',
    sliderMax: 'Clear',
    scaleLabel: 'Scale',
    scaleMin: 'Small',
    scaleMax: 'Large',
    hintOn: 'Hinting: On',
    hintOff: 'Hinting: Off',
    contrastDark: 'White on Black',
    contrastLight: 'Black on White',
    gridOn: 'Grid: On',
    gridOff: 'Grid: Off',
    shapeSquare: 'Shape: Square',
    shapeCircle: 'Shape: Circle',
    infoOn: 'Info Panel: On',
    infoOff: 'Info Panel: Off',
    presentationOn: 'Presentation: On',
    presentationOff: 'Presentation: Off',
    toolsMenu: 'Tools',
    download: 'Download',
    downloadPng: 'Download PNG',
    downloadFont: 'Get Custom Font',
    emailFont: 'Email Custom Font',
    reset: 'Reset',
    lang: 'IS',
    introTitle: 'ResPress',
    start: 'Start',
    uploadFont: 'Upload Font',
    customPrefix: 'Custom: ',
    uploadFontError: 'Font upload failed.',
    thresholdNoise: 'Noise',
    thresholdUnstable: 'Unstable',
    thresholdEmerging: 'Emerging',
    thresholdLegible: 'Legible',
    thresholdClear: 'Clear',
    exportTitlePng: 'Name PNG export',
    exportTitleZip: 'Name custom font',
    exportTitleEmail: 'Email custom font',
    exportEmailPlaceholder: 'Email address',
    exportSave: 'Save',
    exportCancel: 'Cancel',
    exportDefaultPng: 'respress-image',
    exportDefaultZip: 'respress-font',
    exportProjectLine: 'The Edge of Legibility',
    exportPackaged: 'Includes custom font + export card',
    popupText:
      'ResPress is a digital tool that explores the relationship between resolution, legibility, and typography in a digital world. At the heart of the project rests the question: how much information does a letter need to keep its original meaning, and what happens when it begins to break down? By lowering resolution and simplifying form, users test the limits of types legibility, where letters become patterns, symbols, or new visual forms. The result is not only a visual experiment, but a typeface that can be exported and used further. ResPress uses technical limitations as a creative method for rethinking how we read digital type.',
    popupContinue: 'Continue',
    shortcutsTitle: 'Shortcuts',
    shortcutGrid: 'Grid',
    shortcutHinting: 'Hinting',
    shortcutContrast: 'Contrast',
    shortcutShape: 'Pixel Shape',
    shortcutInfo: 'Info Panel',
    shortcutLanguage: 'Language',
    shortcutPresentation: 'Presentation',
    shortcutReset: 'Reset',
    infoResolution: 'Resolution',
    infoScale: 'Scale',
    infoCellSize: 'Cell',
    infoGridSize: 'Grid',
    infoAppearanceDark: 'Dark',
    infoAppearanceLight: 'Light',
    infoShapeSquare: 'Square',
    infoShapeCircle: 'Circle',
    byCredit: 'ResPress by Stefán Daði Karelsson',
    exportZipError: 'Custom font export failed.',
    exportSectionSystem: 'SYSTEM',
    exportSectionOutput: 'OUTPUT',
    exportSectionPreview: 'PREVIEW',
    exportStateLabel: 'State',
    exportNeedsUpload: 'Upload a font first for source-preserving export.',
    exportServerOffline: 'Export server not reachable. Start the Python export server first.',
    exportEmailSent: 'Custom font emailed.',
    exportEmailError: 'Custom font email failed. Check the server email settings.'
  },
  is: {
    title: 'ResPress',
    placeholder: 'Skrifaðu hér',
    sliderLabel: 'Óstöðugt → Stöðugt',
    sliderMin: 'Ólæsilegt',
    sliderMax: 'Skýrt',
    scaleLabel: 'Stærð',
    scaleMin: 'Lítið',
    scaleMax: 'Stórt',
    hintOn: 'Mýking: Á',
    hintOff: 'Mýking: Af',
    contrastDark: 'Hvítt á svörtu',
    contrastLight: 'Svart á hvítu',
    gridOn: 'Grid: Á',
    gridOff: 'Grid: Af',
    shapeSquare: 'Form: Ferningar',
    shapeCircle: 'Form: Punktar',
    infoOn: 'Upplýsingar: Á',
    infoOff: 'Upplýsingar: Af',
    presentationOn: 'Sýning: Á',
    presentationOff: 'Sýning: Af',
    toolsMenu: 'Tól',
    download: 'Sækja',
    downloadPng: 'Sækja PNG',
    downloadFont: 'Sækja sérletur',
    emailFont: 'Senda sérletur í email',
    reset: 'Endurstilla',
    lang: 'EN',
    introTitle: 'ResPress',
    start: 'Byrja',
    uploadFont: 'Hlaða inn letri',
    customPrefix: 'Sérletur: ',
    uploadFontError: 'Ekki tókst að hlaða inn letri.',
    thresholdNoise: 'Óreiða',
    thresholdUnstable: 'Óstöðugt',
    thresholdEmerging: 'Að skýrast',
    thresholdLegible: 'Læsilegt',
    thresholdClear: 'Skýrt',
    exportTitlePng: 'Nefndu PNG útflutning',
    exportTitleZip: 'Nefndu sérletursútflutning',
    exportTitleEmail: 'Senda sérletur í email',
    exportEmailPlaceholder: 'Email',
    exportSave: 'Vista',
    exportCancel: 'Hætta við',
    exportDefaultPng: 'respress-mynd',
    exportDefaultZip: 'respress-letur',
    exportProjectLine: 'Mörk læsileikans',
    exportPackaged: 'ZIP inniheldur sérletur og myndkort',
    popupText:
      'ResPress er stafrænt verkfæri sem skoðar samband upplausnar, læsileika og stafrænnar leturfræði. Verkefnið spyr hversu miklar upplýsingar bókstafur þarf til að halda merkingu sinni, og hvað gerist þegar hann byrjar að brotna niður. Með því að lækka upplausn og einfalda form geta notendur ýtt letri að mörkum læsileika, þar sem stafir verða að mynstrum, táknum eða nýjum formum. Útkoman er ekki aðeins sjónræn tilraun, heldur letur sem hægt er að hlaða niður og nota áfram. ResPress notar tæknilegar hindranir sem skapandi aðferð til að endurhugsa hvernig við lesum stafrænt letur.',
    popupContinue: 'Halda áfram',
    shortcutsTitle: 'Flýtilyklar',
    shortcutGrid: 'Grid',
    shortcutHinting: 'Mýking',
    shortcutContrast: 'Birtuskil',
    shortcutShape: 'Pixlaform',
    shortcutInfo: 'Upplýsingar',
    shortcutLanguage: 'Tungumál',
    shortcutPresentation: 'Sýning',
    shortcutReset: 'Endurstilla',
    infoResolution: 'Upplausn',
    infoScale: 'Stærð',
    infoCellSize: 'Reitur',
    infoGridSize: 'Grid',
    infoAppearanceDark: 'Dökkt',
    infoAppearanceLight: 'Ljóst',
    infoShapeSquare: 'Ferningar',
    infoShapeCircle: 'Punktar',
    byCredit: 'ResPress eftir Stefán Daða Karelsson',
    exportZipError: 'Ekki tókst að búa til sérletursútflutning.',
    exportSectionSystem: 'KERFI',
    exportSectionOutput: 'ÚTTAK',
    exportSectionPreview: 'FORSKOÐUN',
    exportStateLabel: 'Staða',
    exportNeedsUpload: 'Hlaðið inn letri fyrst fyrir útflutning sem varðveitir uppruna.',
    exportServerOffline: 'Ekki næst samband við export þjón. Ræstu Python export server fyrst.',
    exportEmailSent: 'Sérletur sent í email.',
    exportEmailError: 'Ekki tókst að senda email. Athugaðu email stillingar á server.'
  }
};

// --------------------------------------------------
// STATE
// --------------------------------------------------

const state = {
  dpr: Math.max(1, Math.min(window.devicePixelRatio || 1, 2)),
  maxChars: 500,
  hinting: false,
  inverted: false,
  gridVisible: false,
  infoVisible: true,
  pixelShape: 'square',
  presentationMode: false,
  language: 'en',
  fontKey: 'plex',
  fontFamily: fontMap.plex,
  customFontLoaded: false,
  customFontFamily: '',
  customFontLabel: '',
  customFontFace: null,
  customFontFile: null,
  customFontBytes: null,
  customFontMime: '',
  customFontParsed: null,
  customFontMetrics: null,
  lastSampleW: 0,
  lastSampleH: 0,
  lastPixelSizeX: 0,
  lastPixelSizeY: 0,
  introActive: true,
  introLeaving: false,
  introFinished: false,
  introStartTime: 0,
  introExitStart: 0,
  introRaf: 0,
  introDisplayProgress: 0.22,
  textScale: 1,
  fontMenuOpen: false,
  toolsMenuOpen: false,
  downloadMenuOpen: false,
  helpOpen: false,
  exportModalOpen: false,
  pendingExportResolver: null,
  exportModalNeedsEmail: false,
  popupSeen: false,
  popupOpen: false,
  legacyGlyphRenderCanvas: null,
  legacyGlyphRenderCtx: null,
  legacySmallCanvas: null,
  legacySmallCtx: null,
  legacyUpCanvas: null,
  legacyUpCtx: null
};

// --------------------------------------------------
// SMALL HELPERS
// --------------------------------------------------

function setText(el, value) {
  if (el) el.textContent = value;
}

function setHidden(el, hidden) {
  if (el) el.hidden = hidden;
}

function bufferToBase64(buffer) {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const chunkSize = 0x8000;

  for (let i = 0; i < bytes.length; i += chunkSize) {
    const chunk = bytes.subarray(i, i + chunkSize);
    binary += String.fromCharCode(...chunk);
  }

  return btoa(binary);
}

function base64ToBlob(base64, mimeType = 'application/octet-stream') {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);

  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i);
  }

  return new Blob([bytes], { type: mimeType });
}

function parseFontMetrics(font) {
  if (!font) return null;

  const unitsPerEm = font.unitsPerEm || 1000;
  const ascender = Number.isFinite(font.ascender) ? font.ascender : unitsPerEm * 0.8;
  const descender = Number.isFinite(font.descender) ? font.descender : -unitsPerEm * 0.2;

  let typoAscender = ascender;
  let typoDescender = descender;
  let typoLineGap = 0;

  try {
    const os2 = font.tables?.os2;
    if (os2) {
      if (Number.isFinite(os2.sTypoAscender)) typoAscender = os2.sTypoAscender;
      if (Number.isFinite(os2.sTypoDescender)) typoDescender = os2.sTypoDescender;
      if (Number.isFinite(os2.sTypoLineGap)) typoLineGap = os2.sTypoLineGap;
    }
  } catch (error) {
    console.warn(error);
  }

  const ascentRatio = typoAscender / unitsPerEm;
  const descentRatio = Math.abs(typoDescender) / unitsPerEm;
  const lineGapRatio = Math.max(0, typoLineGap / unitsPerEm);
  const totalRatio = Math.max(0.001, ascentRatio + descentRatio + lineGapRatio);

  return {
    unitsPerEm,
    ascender,
    descender,
    typoAscender,
    typoDescender,
    typoLineGap,
    ascentRatio,
    descentRatio,
    lineGapRatio,
    totalRatio
  };
}

function getActiveFontMetrics() {
  if (state.fontKey === 'custom' && state.customFontMetrics) {
    return state.customFontMetrics;
  }

  return {
    unitsPerEm: 1000,
    ascender: 800,
    descender: -200,
    typoAscender: 800,
    typoDescender: -200,
    typoLineGap: 120,
    ascentRatio: 0.8,
    descentRatio: 0.2,
    lineGapRatio: 0.12,
    totalRatio: 1.12
  };
}

function getLineMetricsForSize(size) {
  const metrics = getActiveFontMetrics();
  const total = metrics.totalRatio || 1.12;
  const ascent = size * (metrics.ascentRatio / total);
  const descent = size * (metrics.descentRatio / total);
  const lineGap = size * (metrics.lineGapRatio / total);
  const lineHeight = ascent + descent + lineGap;

  return {
    ascent,
    descent,
    lineGap,
    lineHeight
  };
}

function getTextRenderFont(token, size) {
  const weight = state.fontKey === 'custom' ? '400' : '700';
  return `${weight} ${size}px ${state.fontFamily}`;
}

// --------------------------------------------------
// TEXT + INPUT HELPERS
// --------------------------------------------------

function normalizeText(value) {
  return value.replace(/\r\n/g, '\n').slice(0, state.maxChars);
}

function autoGrowTextarea() {
  if (!textInput) return;
  textInput.style.height = 'auto';
  const nextHeight = Math.min(Math.max(textInput.scrollHeight, 100), 200);
  textInput.style.height = `${nextHeight}px`;
}

function syncTextField() {
  const normalized = normalizeText(textInput?.value || '');
  if (textInput && textInput.value !== normalized) {
    textInput.value = normalized;
  }
  if (inputCount) inputCount.textContent = normalized.length;
  autoGrowTextarea();
  return normalized;
}

function isEmojiChar(char) {
  return /\p{Extended_Pictographic}/u.test(char);
}

function tokenizeLine(line) {
  const chars = Array.from(line);
  const tokens = [];
  let current = '';
  let currentIsEmoji = null;

  for (const char of chars) {
    const isEmoji = isEmojiChar(char) || char === '\uFE0F' || char === '\u200D';

    if (current === '') {
      current = char;
      currentIsEmoji = isEmoji;
      continue;
    }

    if (isEmoji === currentIsEmoji) {
      current += char;
    } else {
      tokens.push({ text: current, emoji: currentIsEmoji });
      current = char;
      currentIsEmoji = isEmoji;
    }
  }

  if (current) {
    tokens.push({ text: current, emoji: currentIsEmoji });
  }

  return tokens;
}

// --------------------------------------------------
// FONT HELPERS
// --------------------------------------------------

function getActiveFontLabel() {
  const t = translations[state.language];

  if (state.fontKey === 'custom' && state.customFontLoaded) {
    return `${t.customPrefix}${state.customFontLabel}`;
  }

  return fontLabels[state.fontKey] || fontLabels.plex;
}

function getSafeDisplayFontName(fileName) {
  const base = (fileName || 'Custom Font').replace(/\.[^.]+$/, '').trim();
  const cleaned = base.replace(/[_-]+/g, ' ').replace(/\s+/g, ' ').trim();
  return cleaned || 'Custom Font';
}

async function loadCustomFontFromFile(file) {
  if (!file) return;

  const familyName = `UploadedFont_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
  const rawBuffer = await file.arrayBuffer();

  // Keep separate copies: one for export, one for opentype.js parsing,
  // and one for browser preview. Some valid OTF/CFF fonts can preview in
  // the browser even if opentype.js cannot parse them, so parsing is allowed
  // to fail without blocking the upload.
  const exportBuffer = rawBuffer.slice(0);
  const parseBuffer = rawBuffer.slice(0);
  const previewBuffer = rawBuffer.slice(0);

  const fontFace = new FontFace(familyName, previewBuffer);
  await fontFace.load();

  let parsedFont = null;
  let parsedMetrics = null;
  try {
    if (typeof opentype !== 'undefined') {
      parsedFont = opentype.parse(parseBuffer);
      parsedMetrics = parseFontMetrics(parsedFont);
    }
  } catch (error) {
    console.warn('Unable to parse uploaded font with opentype.js. Falling back to browser-rendered export.', error);
  }

  if (state.customFontFace) {
    try {
      document.fonts.delete(state.customFontFace);
    } catch (error) {
      console.warn(error);
    }
  }

  document.fonts.add(fontFace);

  state.customFontFace = fontFace;
  state.customFontLoaded = true;
  state.customFontFamily = familyName;
  state.customFontLabel = getSafeDisplayFontName(file.name);
  state.customFontFile = file;
  state.customFontBytes = exportBuffer;
  state.customFontMime = file.type || 'font/otf';
  state.customFontParsed = parsedFont;
  state.customFontMetrics = parsedMetrics;
  state.fontKey = 'custom';
  state.fontFamily = `"${familyName}", sans-serif`;

  updateUI();
  syncTextField();
  draw();

  if (!state.introFinished) {
    renderIntroStatic();
  }
}

// --------------------------------------------------
// TEXT LAYOUT + MEASURING
// --------------------------------------------------

function measureMixedLine(ctx, line, size) {
  const tokens = tokenizeLine(line || ' ');
  let width = 0;

  for (const token of tokens) {
    ctx.font = getTextRenderFont(token, size);
    width += ctx.measureText(token.text).width;
  }

  return width;
}

function splitWordForWidth(ctx, word, size, maxWidth) {
  if (measureMixedLine(ctx, word, size) <= maxWidth) return [word];

  const chars = Array.from(word);
  const parts = [];
  let current = '';

  for (const char of chars) {
    const test = current + char;
    if (current && measureMixedLine(ctx, test, size) > maxWidth) {
      parts.push(current);
      current = char;
    } else {
      current = test;
    }
  }

  if (current) parts.push(current);
  return parts;
}

function wrapTextMixed(ctx, text, maxWidth, size) {
  const paragraphs = text.split('\n');
  const lines = [];

  for (const paragraph of paragraphs) {
    if (paragraph === '') {
      lines.push('');
      continue;
    }

    const words = paragraph.split(' ');
    let current = '';

    for (const rawWord of words) {
      const pieces = splitWordForWidth(ctx, rawWord, size, maxWidth);

      for (const piece of pieces) {
        const candidate = current ? `${current} ${piece}` : piece;

        if (!current) {
          current = piece;
          continue;
        }

        if (measureMixedLine(ctx, candidate, size) <= maxWidth) {
          current = candidate;
        } else {
          lines.push(current);
          current = piece;
        }
      }
    }

    lines.push(current || '');
  }

  return lines;
}

function fitTextBlock(ctx, text, width, height) {
  let size = Math.max(18, Math.min(width * 0.13, height * 0.22));
  let lines = [];
  let lineMetrics = getLineMetricsForSize(size);

  while (size >= 18) {
    lines = wrapTextMixed(ctx, text || ' ', width, size);
    lineMetrics = getLineMetricsForSize(size);
    const widest = Math.max(...lines.map((line) => measureMixedLine(ctx, line, size)), 0);
    const totalHeight = lines.length * lineMetrics.lineHeight;

    if (widest <= width && totalHeight <= height) {
      break;
    }

    size -= 2;
  }

  return { size, lines, lineMetrics };
}

function getTextLayout(cssWidth, text) {
  const paddingX = cssWidth * 0.07;
  const tempCanvas = document.createElement('canvas');
  const tempCtx = tempCanvas.getContext('2d');

  const probeHeight = Math.max(640, Math.floor(window.innerHeight * 0.7));
  const fit = fitTextBlock(tempCtx, text, cssWidth - paddingX * 2, probeHeight * 0.76);
  const scaledSize = Math.max(14, fit.size * state.textScale);
  const lines = wrapTextMixed(tempCtx, text || ' ', cssWidth - paddingX * 2, scaledSize);
  const lineMetrics = getLineMetricsForSize(scaledSize);
  const paddingY = Math.max(84, cssWidth * 0.08);
  const totalHeight = lines.length * lineMetrics.lineHeight;

  return { scaledSize, lines, lineMetrics, paddingX, paddingY, totalHeight };
}

function estimateCompositionHeight(cssWidth, text) {
  const stageMin = Math.max(420, stage?.clientHeight || Math.floor(window.innerHeight * 0.5));
  const { totalHeight, paddingY } = getTextLayout(cssWidth, text);
  const needed = Math.ceil(totalHeight + paddingY * 2);
  return Math.max(stageMin, needed);
}

function drawMixedLine(ctx, line, xPosition, baselineY, size, monoColor, align = 'center') {
  const tokens = tokenizeLine(line || ' ');
  const totalWidth = measureMixedLine(ctx, line, size);
  let x = align === 'left' ? xPosition : xPosition - totalWidth / 2;

  for (const token of tokens) {
    ctx.font = getTextRenderFont(token, size);

    ctx.fillStyle = monoColor;
    ctx.fillText(token.text, x, baselineY);
    x += ctx.measureText(token.text).width;
  }
}

// --------------------------------------------------
// RENDERING HELPERS
// --------------------------------------------------

function mapResolution(t) {
  const clamped = Math.max(0, Math.min(1, t));

  if (clamped <= 0.2) {
    const a = clamped / 0.2;
    return 0.01 + a * 0.04;
  }

  if (clamped <= 0.75) {
    const b = (clamped - 0.2) / 0.55;
    return 0.05 + Math.pow(b, 1.8) * 0.22;
  }

  if (clamped <= 0.93) {
    const c = (clamped - 0.75) / 0.18;
    return 0.27 + Math.pow(c, 1.5) * 0.38;
  }

  const d = (clamped - 0.93) / 0.07;
  return 0.65 + d * 0.35;
}

function getThresholdLabel(value) {
  const num = Number(value);
  const t = translations[state.language];

  if (num < 20) return t.thresholdNoise;
  if (num < 48) return t.thresholdUnstable;
  if (num < 68) return t.thresholdEmerging;
  if (num < 88) return t.thresholdLegible;
  return t.thresholdClear;
}

function applyThreshold(ctx, w, h) {
  const image = ctx.getImageData(0, 0, w, h);
  const data = image.data;

  for (let i = 0; i < data.length; i += 4) {
    const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
    const value = avg > 128 ? 255 : 0;
    data[i] = value;
    data[i + 1] = value;
    data[i + 2] = value;
    data[i + 3] = 255;
  }

  ctx.putImageData(image, 0, 0);
}

function applyHintedLevels(ctx, w, h) {
  const image = ctx.getImageData(0, 0, w, h);
  const data = image.data;
  const levels = [0, 90, 170, 255];

  for (let i = 0; i < data.length; i += 4) {
    const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
    let value = 0;

    if (avg < 32) value = levels[0];
    else if (avg < 96) value = levels[1];
    else if (avg < 180) value = levels[2];
    else value = levels[3];

    data[i] = value;
    data[i + 1] = value;
    data[i + 2] = value;
    data[i + 3] = 255;
  }

  ctx.putImageData(image, 0, 0);
}

function processMonoCanvas(ctx, w, h) {
  if (state.hinting) {
    applyHintedLevels(ctx, w, h);
  } else {
    applyThreshold(ctx, w, h);
  }
}

function getInfoLines() {
  const t = translations[state.language];
  const cellX = state.lastPixelSizeX || 1;
  const cellY = state.lastPixelSizeY || 1;
  const gridW = state.lastSampleW || 0;
  const gridH = state.lastSampleH || 0;

  return [
    getActiveFontLabel(),
    `${t.infoResolution} ${resSlider.value}`,
    `${t.infoScale} ${scaleSlider.value}%`,
    `${state.pixelShape === 'circle' ? t.infoShapeCircle : t.infoShapeSquare}`,
    `${t.infoCellSize} ${cellX}×${cellY}px`,
    `${t.infoGridSize} ${gridW}×${gridH}`,
    state.gridVisible ? 'Grid On' : 'Grid Off',
    state.hinting ? 'Hinting On' : 'Hinting Off',
    state.inverted ? t.infoAppearanceLight : t.infoAppearanceDark
  ];
}

function drawGridOverlay(ctx, outW, outH, sampleW, sampleH) {
  if (!state.gridVisible || sampleW <= 1 || sampleH <= 1) return;

  const cellW = outW / sampleW;
  const cellH = outH / sampleH;

  ctx.save();
  ctx.beginPath();

  for (let x = 0; x <= sampleW; x += 1) {
    const px = Math.round(x * cellW) + 0.5;
    ctx.moveTo(px, 0);
    ctx.lineTo(px, outH);
  }

  for (let y = 0; y <= sampleH; y += 1) {
    const py = Math.round(y * cellH) + 0.5;
    ctx.moveTo(0, py);
    ctx.lineTo(outW, py);
  }

  ctx.lineWidth = 1;
  ctx.strokeStyle = state.inverted
    ? 'rgba(0,0,0,0.18)'
    : 'rgba(255,255,255,0.18)';
  ctx.stroke();
  ctx.restore();
}

function drawInfoOverlay(ctx, outW, outH) {
  const t = translations[state.language];
  const lines = getInfoLines();

  const innerPad = Math.round(13 * state.dpr);
  const titleSize = 11 * state.dpr;
  const textSize = 11 * state.dpr;
  const lineHeight = Math.round(16 * state.dpr);
  const maxPanelW = Math.round(Math.min(outW * 0.34, 420 * state.dpr));

  ctx.save();
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  ctx.font = `${state.fontKey === 'custom' ? '400' : '500'} ${textSize}px ${state.fontFamily}`;

  const measuredW = Math.max(
    ctx.measureText(t.title).width,
    ...lines.map((line) => ctx.measureText(line).width)
  );
  const panelW = Math.min(
    maxPanelW,
    Math.max(210 * state.dpr, Math.ceil(measuredW + innerPad * 2))
  );
  const panelH = innerPad * 2 + Math.round(20 * state.dpr) + lineHeight * lines.length;
  const panelMargin = Math.round(10 * state.dpr);
  const panelX = Math.max(panelMargin, outW - panelW - panelMargin);
  const panelY = panelMargin;

  const panelBg = state.inverted ? 'rgba(255,255,255,0.58)' : 'rgba(0,0,0,0.52)';
  const textColor = state.inverted ? '#000' : '#fff';
  const subColor = state.inverted ? 'rgba(0,0,0,0.72)' : 'rgba(255,255,255,0.72)';
  const borderColor = state.inverted ? 'rgba(0,0,0,0.07)' : 'rgba(255,255,255,0.07)';

  if (typeof ctx.roundRect === 'function') {
    ctx.beginPath();
    ctx.roundRect(panelX, panelY, panelW, panelH, Math.round(6 * state.dpr));
    ctx.fillStyle = panelBg;
    ctx.fill();
    ctx.strokeStyle = borderColor;
    ctx.lineWidth = 1;
    ctx.stroke();
  } else {
    ctx.fillStyle = panelBg;
    ctx.fillRect(panelX, panelY, panelW, panelH);
  }

  ctx.font = `${state.fontKey === 'custom' ? '400' : '700'} ${titleSize}px ${state.fontFamily}`;
  ctx.fillStyle = textColor;
  ctx.fillText(t.title, panelX + innerPad, panelY + innerPad, panelW - innerPad * 2);

  ctx.font = `${state.fontKey === 'custom' ? '400' : '500'} ${textSize}px ${state.fontFamily}`;
  ctx.fillStyle = subColor;

  for (let i = 0; i < lines.length; i += 1) {
    ctx.fillText(
      lines[i],
      panelX + innerPad,
      panelY + innerPad + 20 * state.dpr + i * lineHeight,
      panelW - innerPad * 2
    );
  }

  ctx.restore();
}

function drawComposition(ctx, outW, outH, text, options = {}) {
  const bg = state.inverted ? '#fff' : '#000';
  const fg = state.inverted ? '#000' : '#fff';

  const cssWidth = outW / state.dpr;
  const cssHeight = outH / state.dpr;
  const { scaledSize, lines, lineMetrics, paddingX, paddingY, totalHeight } = getTextLayout(cssWidth, text);

  const centeredBaseline = (cssHeight - totalHeight) / 2 + lineMetrics.ascent;
  let baselineY = options.centerText ? Math.max(lineMetrics.ascent, centeredBaseline) : paddingY + lineMetrics.ascent;

  ctx.setTransform(state.dpr, 0, 0, state.dpr, 0, 0);
  ctx.clearRect(0, 0, cssWidth, cssHeight);
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, cssWidth, cssHeight);

  ctx.textAlign = 'left';
  ctx.textBaseline = 'alphabetic';
  ctx.fillStyle = fg;

  const textAlignMode = options.textAlign || (options.centerText ? 'center' : 'left');
  const textX = textAlignMode === 'center' ? cssWidth / 2 : paddingX;

  for (const line of lines) {
    drawMixedLine(ctx, line || ' ', textX, baselineY, scaledSize, fg, textAlignMode);
    baselineY += lineMetrics.lineHeight;
  }

  ctx.setTransform(1, 0, 0, 1, 0, 0);
}

function drawPixelShapeOutput(targetCtx, source, outW, outH, sampleW, sampleH, bg) {
  targetCtx.setTransform(1, 0, 0, 1, 0, 0);
  targetCtx.clearRect(0, 0, outW, outH);
  targetCtx.fillStyle = bg;
  targetCtx.fillRect(0, 0, outW, outH);

  if (state.pixelShape !== 'circle') {
    targetCtx.imageSmoothingEnabled = false;
    targetCtx.drawImage(source, 0, 0, outW, outH);
    return;
  }

  const sourceCtxForPixels = source.getContext('2d', { willReadFrequently: true });
  const image = sourceCtxForPixels.getImageData(0, 0, sampleW, sampleH);
  const cellW = outW / sampleW;
  const cellH = outH / sampleH;
  const radius = Math.max(0.35, Math.min(cellW, cellH) * 0.46);

  targetCtx.save();
  for (let row = 0; row < sampleH; row += 1) {
    for (let col = 0; col < sampleW; col += 1) {
      const idx = (row * sampleW + col) * 4;
      targetCtx.fillStyle = 'rgba(' + image.data[idx] + ',' + image.data[idx + 1] + ',' + image.data[idx + 2] + ',' + (image.data[idx + 3] / 255) + ')';
      targetCtx.beginPath();
      targetCtx.arc((col + 0.5) * cellW, (row + 0.5) * cellH, radius, 0, Math.PI * 2);
      targetCtx.fill();
    }
  }
  targetCtx.restore();
}

function renderToCanvas(targetCtx, outW, outH, options = {}) {
  const text = syncTextField() || ' ';
  const sliderValue = Number(resSlider.value);
  const mapped = mapResolution(sliderValue / 100);
  const bg = state.inverted ? '#fff' : '#000';
  const showGrid = options.showGrid ?? true;
  const showInfo = options.showInfo ?? true;

  const compositionScale = 3;
  const compW = Math.max(64, Math.floor(outW * compositionScale));
  const compH = Math.max(64, Math.floor(outH * compositionScale));

  compositionCanvas.width = compW;
  compositionCanvas.height = compH;
  drawComposition(compositionCtx, compW, compH, text, options);

  sourceCanvas.width = outW;
  sourceCanvas.height = outH;
  sourceCtx.setTransform(1, 0, 0, 1, 0, 0);
  sourceCtx.clearRect(0, 0, outW, outH);
  sourceCtx.imageSmoothingEnabled = true;
  sourceCtx.drawImage(compositionCanvas, 0, 0, outW, outH);

  if (sliderValue >= 99.5 || mapped >= 0.995) {
    targetCtx.setTransform(1, 0, 0, 1, 0, 0);
    targetCtx.clearRect(0, 0, outW, outH);
    targetCtx.fillStyle = bg;
    targetCtx.fillRect(0, 0, outW, outH);
    targetCtx.imageSmoothingEnabled = true;
    targetCtx.drawImage(sourceCanvas, 0, 0, outW, outH);

    processMonoCanvas(targetCtx, outW, outH);

    state.lastSampleW = outW;
    state.lastSampleH = outH;
    state.lastPixelSizeX = 1;
    state.lastPixelSizeY = 1;

    if (showGrid) drawGridOverlay(targetCtx, outW, outH, state.lastSampleW, state.lastSampleH);
    if (showInfo && state.infoVisible && !state.presentationMode) drawInfoOverlay(targetCtx, outW, outH);
    return;
  }

  const aspect = outW / outH;
  const smallH = Math.max(8, Math.floor(8 + mapped * outH));
  const smallW = Math.max(8, Math.floor(smallH * aspect));

  bufferCanvas.width = smallW;
  bufferCanvas.height = smallH;
  bufferCtx.setTransform(1, 0, 0, 1, 0, 0);
  bufferCtx.clearRect(0, 0, smallW, smallH);
  bufferCtx.imageSmoothingEnabled = state.hinting;
  bufferCtx.drawImage(sourceCanvas, 0, 0, smallW, smallH);

  processMonoCanvas(bufferCtx, smallW, smallH);

  drawPixelShapeOutput(targetCtx, bufferCanvas, outW, outH, smallW, smallH, bg);

  state.lastSampleW = smallW;
  state.lastSampleH = smallH;
  state.lastPixelSizeX = Number((outW / smallW).toFixed(1));
  state.lastPixelSizeY = Number((outH / smallH).toFixed(1));

  if (showGrid) drawGridOverlay(targetCtx, outW, outH, smallW, smallH);
  if (showInfo && state.infoVisible && !state.presentationMode) drawInfoOverlay(targetCtx, outW, outH);
}

// --------------------------------------------------
// STAGE + DRAW
// --------------------------------------------------

function updateSliderVisuals() {
  if (!resSlider || !scaleSlider) return;

  const resPercent = ((Number(resSlider.value) - Number(resSlider.min)) /
    (Number(resSlider.max) - Number(resSlider.min))) * 100;
  const scalePercent = ((Number(scaleSlider.value) - Number(scaleSlider.min)) /
    (Number(scaleSlider.max) - Number(scaleSlider.min))) * 100;

  resSlider.style.setProperty('--percent', `${resPercent}%`);
  scaleSlider.style.setProperty('--percent', `${scalePercent}%`);
}

function getStageDimensions() {
  const cssWidth = Math.max(
    320,
    Math.floor(stageScroller?.clientWidth || stage?.clientWidth || window.innerWidth)
  );
  const text = syncTextField() || ' ';
  const cssHeight = estimateCompositionHeight(cssWidth, text);

  return {
    cssWidth,
    cssHeight,
    pixelWidth: Math.floor(cssWidth * state.dpr),
    pixelHeight: Math.floor(cssHeight * state.dpr)
  };
}

function draw() {
  const dims = getStageDimensions();

  if (displayCanvas.width !== dims.pixelWidth || displayCanvas.height !== dims.pixelHeight) {
    displayCanvas.width = dims.pixelWidth;
    displayCanvas.height = dims.pixelHeight;
    displayCanvas.style.width = `${dims.cssWidth}px`;
    displayCanvas.style.height = `${dims.cssHeight}px`;
  }

  updateSliderVisuals();

  if (resValue) resValue.textContent = resSlider.value;
  if (scaleValue) scaleValue.textContent = `${scaleSlider.value}%`;

  if (!displayCanvas.width || !displayCanvas.height) return;

  renderToCanvas(displayCtx, displayCanvas.width, displayCanvas.height, {
    showGrid: true,
    showInfo: true
  });
}

function resizeStage() {
  draw();
}

// --------------------------------------------------
// INTRO + POPUP
// --------------------------------------------------

function resizeIntroCanvas() {
  const bounds = introCanvas.getBoundingClientRect();
  const width = Math.max(320, Math.floor(bounds.width * state.dpr));
  const height = Math.max(120, Math.floor(bounds.height * state.dpr));

  if (introCanvas.width !== width || introCanvas.height !== height) {
    introCanvas.width = width;
    introCanvas.height = height;
  }
}

function renderIntroStatic() {
  const w = introCanvas.width || Math.max(320, Math.floor(introCanvas.clientWidth * state.dpr));
  const h = introCanvas.height || Math.max(120, Math.floor(introCanvas.clientHeight * state.dpr));

  if (!introCanvas.width || !introCanvas.height) {
    introCanvas.width = w;
    introCanvas.height = h;
  }

  introCtx.setTransform(1, 0, 0, 1, 0, 0);
  introCtx.clearRect(0, 0, w, h);
  introCtx.fillStyle = '#000';
  introCtx.fillRect(0, 0, w, h);
  introCtx.fillStyle = '#fff';
  introCtx.textAlign = 'center';
  introCtx.textBaseline = 'middle';
  introCtx.font = `700 ${Math.min(w * 0.13, h * 0.58)}px ${state.fontFamily}`;
  introCtx.fillText(translations[state.language].introTitle, w / 2, h / 2);
}

function drawIntroFrame(now) {
  const w = introCanvas.width;
  const h = introCanvas.height;

  if (!w || !h) {
    renderIntroStatic();
    return;
  }

  const t = translations[state.language];
  const title = t.introTitle;
  const bg = '#000';
  const fg = '#fff';

  if (!state.introStartTime) {
    state.introStartTime = now;
  }

  let targetProgress = 0.22;

  if (state.introLeaving) {
    const elapsed = Math.min(1, (now - state.introExitStart) / 980);
    const eased = 1 - Math.pow(1 - elapsed, 3);
    targetProgress = 0.24 + eased * 0.76;
    state.introDisplayProgress += (targetProgress - state.introDisplayProgress) * 0.16;
  } else {
    const elapsed = (now - state.introStartTime) / 1000;
    const wave = (Math.sin(elapsed * 0.65) + 1) / 2;
    targetProgress = 0.12 + wave * 0.46;
    state.introDisplayProgress += (targetProgress - state.introDisplayProgress) * 0.05;
  }

  const progress = Math.max(0, Math.min(1, state.introDisplayProgress));
  const mapped = mapResolution(progress);

  introSourceCanvas.width = w;
  introSourceCanvas.height = h;
  introSourceCtx.setTransform(1, 0, 0, 1, 0, 0);
  introSourceCtx.clearRect(0, 0, w, h);
  introSourceCtx.fillStyle = bg;
  introSourceCtx.fillRect(0, 0, w, h);
  introSourceCtx.textAlign = 'center';
  introSourceCtx.textBaseline = 'middle';
  introSourceCtx.fillStyle = fg;
  introSourceCtx.font = `700 ${Math.min(w * 0.13, h * 0.58)}px ${state.fontFamily}`;
  introSourceCtx.fillText(title, w / 2, h / 2);

  if (progress >= 0.995) {
    introCtx.setTransform(1, 0, 0, 1, 0, 0);
    introCtx.clearRect(0, 0, w, h);
    introCtx.fillStyle = bg;
    introCtx.fillRect(0, 0, w, h);
    introCtx.imageSmoothingEnabled = true;
    introCtx.drawImage(introSourceCanvas, 0, 0, w, h);
  } else {
    const aspect = w / h;
    const smallH = Math.max(8, Math.floor(8 + mapped * h));
    const smallW = Math.max(8, Math.floor(smallH * aspect));

    introBufferCanvas.width = smallW;
    introBufferCanvas.height = smallH;
    introBufferCtx.setTransform(1, 0, 0, 1, 0, 0);
    introBufferCtx.clearRect(0, 0, smallW, smallH);
    introBufferCtx.imageSmoothingEnabled = false;
    introBufferCtx.drawImage(introSourceCanvas, 0, 0, smallW, smallH);
    processMonoCanvas(introBufferCtx, smallW, smallH);

    introCtx.setTransform(1, 0, 0, 1, 0, 0);
    introCtx.clearRect(0, 0, w, h);
    introCtx.fillStyle = bg;
    introCtx.fillRect(0, 0, w, h);
    introCtx.imageSmoothingEnabled = false;
    introCtx.drawImage(introBufferCanvas, 0, 0, w, h);
  }

  if (state.introLeaving && progress >= 0.996) {
    finishIntro();
    return;
  }

  if (state.introActive && !state.introFinished) {
    state.introRaf = requestAnimationFrame(drawIntroFrame);
  }
}

function startIntroLoop() {
  cancelAnimationFrame(state.introRaf);
  state.introActive = true;
  state.introLeaving = false;
  state.introFinished = false;
  state.introStartTime = performance.now();
  state.introDisplayProgress = 0.22;
  renderIntroStatic();
  state.introRaf = requestAnimationFrame(drawIntroFrame);
}

function openProjectPopup() {
  if (!projectPopup) {
    forceEnterApp();
    return;
  }

  state.popupOpen = true;
  projectPopup.hidden = false;
  projectPopup.classList.remove('is-closing');
  projectPopup.style.opacity = '1';
}

function closeProjectPopupAndEnter() {
  if (projectPopup) {
    projectPopup.classList.add('is-closing');
    projectPopup.style.opacity = '0';

    setTimeout(() => {
      projectPopup.hidden = true;
      projectPopup.style.opacity = '';
      projectPopup.classList.remove('is-closing');
    }, 320);
  }

  state.popupOpen = false;
  state.popupSeen = true;

  setTimeout(() => {
    forceEnterApp();
  }, 120);
}

function finishIntro() {
  if (state.introFinished) return;

  state.introFinished = true;
  state.introActive = false;
  cancelAnimationFrame(state.introRaf);
  introScreen.classList.add('is-exiting');

  setTimeout(() => {
    introScreen.hidden = true;
    introScreen.setAttribute('aria-hidden', 'true');
    openProjectPopup();
  }, 360);
}

function forceEnterApp() {
  if (app) app.classList.remove('app-hidden');

  if (textInput) textInput.focus();
  resizeStage();
}

function leaveIntro() {
  if (state.introFinished || state.introLeaving) return;

  state.introLeaving = true;
  state.introExitStart = performance.now();

  setTimeout(() => {
    if (!state.introFinished) {
      finishIntro();
    }
  }, 1040);
}

// --------------------------------------------------
// MENU + UI STATE
// --------------------------------------------------

function setFontMenu(open) {
  state.fontMenuOpen = open;
  setHidden(fontMenu, !open);
  if (fontMenuBtn) {
    fontMenuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    fontMenuBtn.classList.toggle('is-active', open);
  }
}

function setToolsMenu(open) {
  state.toolsMenuOpen = open;
  setHidden(toolsMenu, !open);
  if (toolsMenuBtn) {
    toolsMenuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    toolsMenuBtn.classList.toggle('is-active', open);
  }
}

function setDownloadMenu(open) {
  state.downloadMenuOpen = open;
  setHidden(downloadMenu, !open);
  if (downloadMenuBtn) {
    downloadMenuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    downloadMenuBtn.classList.toggle('is-active', open);
  }
}

function setHelpPanel(open) {
  state.helpOpen = open;
  setHidden(helpPanel, !open);
  if (helpBtn) helpBtn.classList.toggle('is-active', open);
}

function closeAllMenus() {
  setFontMenu(false);
  setToolsMenu(false);
  setDownloadMenu(false);
  setHelpPanel(false);
}

function updateFontMenuHighlight() {
  fontOptions.forEach((btn) => {
    const key = btn.dataset.font;
    btn.classList.toggle('is-active', key === state.fontKey);
  });

  if (customFontBtn) {
    const t = translations[state.language];
    customFontBtn.hidden = !state.customFontLoaded;
    customFontBtn.textContent = `${t.customPrefix}${state.customFontLabel || 'Custom Font'}`;
    customFontBtn.classList.toggle(
      'is-active',
      state.customFontLoaded && state.fontKey === 'custom'
    );
  }

  if (fontMenuBtn) fontMenuBtn.textContent = getActiveFontLabel();
}

function updateToggleStates() {
  if (hintBtn) hintBtn.classList.toggle('is-active', state.hinting);
  if (contrastBtn) contrastBtn.classList.toggle('is-active', state.inverted);
  if (gridBtn) gridBtn.classList.toggle('is-active', state.gridVisible);
  if (shapeBtn) shapeBtn.classList.toggle('is-active', state.pixelShape === 'circle');
  if (infoBtn) infoBtn.classList.toggle('is-active', state.infoVisible);
  if (presentationBtn) presentationBtn.classList.toggle('is-active', state.presentationMode);
  document.body.classList.toggle('presentation-mode', state.presentationMode);
}

function updateHelpPanelText() {
  if (!helpPanel) return;

  const t = translations[state.language];
  const helpTitle = helpPanel.querySelector('.help-title');
  const helpRows = helpPanel.querySelectorAll('.help-row');

  if (helpTitle) helpTitle.textContent = t.shortcutsTitle;

  const labels = [
    t.shortcutGrid,
    t.shortcutHinting,
    t.shortcutContrast,
    t.shortcutShape,
    t.shortcutInfo,
    t.shortcutLanguage,
    t.shortcutPresentation,
    t.shortcutReset
  ];

  helpRows.forEach((row, index) => {
    const spans = row.querySelectorAll('span');
    if (spans[1] && labels[index]) {
      spans[1].textContent = labels[index];
    }
  });
}

function updateExportModalText() {
  const t = translations[state.language];
  if (exportCancelBtn) exportCancelBtn.textContent = t.exportCancel;
  if (exportConfirmBtn) exportConfirmBtn.textContent = t.exportSave;
  if (exportEmailInput) exportEmailInput.placeholder = t.exportEmailPlaceholder;
}

function updatePopupText() {
  const t = translations[state.language];
  if (projectPopupText) projectPopupText.textContent = t.popupText;
  if (projectPopupContinue) projectPopupContinue.textContent = t.popupContinue;
}

function updateUI() {
  const t = translations[state.language];

  document.title = t.title;
  document.documentElement.lang = state.language;

  setText(projectTag, t.title);
  if (textInput) textInput.placeholder = t.placeholder;
  setText(sliderLabel, t.sliderLabel);
  setText(sliderMin, t.sliderMin);
  setText(sliderMax, t.sliderMax);
  setText(scaleLabel, t.scaleLabel);
  setText(scaleMin, t.scaleMin);
  setText(scaleMax, t.scaleMax);
  setText(hintBtn, state.hinting ? t.hintOn : t.hintOff);
  setText(contrastBtn, state.inverted ? t.contrastLight : t.contrastDark);
  setText(gridBtn, state.gridVisible ? t.gridOn : t.gridOff);
  setText(shapeBtn, state.pixelShape === 'circle' ? t.shapeCircle : t.shapeSquare);
  setText(infoBtn, state.infoVisible ? t.infoOn : t.infoOff);
  setText(presentationBtn, state.presentationMode ? t.presentationOn : t.presentationOff);
  setText(langBtn, t.lang);
  setText(introLangBtn, t.lang);
  setText(projectPopupLangBtn, t.lang);
  setText(downloadMenuBtn, t.download);
  setText(downloadPngBtn, t.downloadPng);
  setText(downloadFontBtn, t.downloadFont);
  setText(emailFontBtn, t.emailFont);
  setText(toolsMenuBtn, t.toolsMenu);
  setText(resetBtn, t.reset);
  setText(introCredit, t.byCredit);
  setText(startBtn, t.start);
  setText(uploadFontBtn, t.uploadFont);

  updateFontMenuHighlight();
  updateToggleStates();
  updateHelpPanelText();
  updateExportModalText();
  updatePopupText();

  renderIntroStatic();

  if (state.introActive && !state.introFinished) {
    resizeIntroCanvas();
  }
}

// --------------------------------------------------
// TEXT ACTIONS
// --------------------------------------------------

function togglePresentationMode() {
  state.presentationMode = !state.presentationMode;
  closeAllMenus();
  updateUI();
  draw();
}

function resetTool() {
  state.hinting = false;
  state.inverted = false;
  state.gridVisible = false;
  state.infoVisible = true;
  state.pixelShape = 'square';
  state.presentationMode = false;
  state.language = 'en';
  state.fontKey = 'plex';
  state.fontFamily = fontMap.plex;
  state.textScale = 1;

  if (textInput) textInput.value = DEFAULT_TEXT;
  if (resSlider) resSlider.value = '40';
  if (scaleSlider) scaleSlider.value = '100';

  closeAllMenus();

  updateUI();
  syncTextField();
  draw();
}

// --------------------------------------------------
// EXPORT HELPERS
// --------------------------------------------------

function sanitizeFilename(value, fallback = 'unstable-letters') {
  const cleaned = (value || '')
    .trim()
    .replace(/[<>:"/\\|?*\x00-\x1F]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^\.+|\.+$/g, '');

  return cleaned || fallback;
}

function openExportModal(title, defaultValue, needsEmail = false) {
  if (!exportModal) {
    return Promise.resolve(needsEmail ? { name: defaultValue, email: '' } : defaultValue);
  }

  state.exportModalNeedsEmail = needsEmail;
  if (exportModalTitle) exportModalTitle.textContent = title;
  if (exportNameInput) exportNameInput.value = defaultValue;
  if (exportEmailInput) {
    exportEmailInput.value = '';
    exportEmailInput.hidden = !needsEmail;
  }
  exportModal.hidden = false;
  state.exportModalOpen = true;

  requestAnimationFrame(() => {
    if (exportNameInput) {
      exportNameInput.focus();
      exportNameInput.select();
    }
  });

  return new Promise((resolve) => {
    state.pendingExportResolver = resolve;
  });
}

function closeExportModal(result = null) {
  if (exportModal) exportModal.hidden = true;
  state.exportModalOpen = false;

  if (state.pendingExportResolver) {
    state.pendingExportResolver(result);
    state.pendingExportResolver = null;
  }

  state.exportModalNeedsEmail = false;
}

async function askExportName(defaultBase, mode = 'png') {
  const t = translations[state.language];
  const title = mode === 'zip' ? t.exportTitleZip : t.exportTitlePng;
  const raw = await openExportModal(title, defaultBase, false);

  if (raw === null) return null;
  return sanitizeFilename(raw, defaultBase);
}

async function askEmailExportDetails(defaultBase) {
  const t = translations[state.language];
  const raw = await openExportModal(t.exportTitleEmail, defaultBase, true);

  if (!raw || !raw.name || !raw.email) return null;

  return {
    name: sanitizeFilename(raw.name, defaultBase),
    email: raw.email.trim()
  };
}

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.download = filename;
  link.href = url;
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1500);
}

async function downloadHighResPNG() {
  const defaultName = `threshold-${getActiveFontLabel().toLowerCase().replace(/\s/g, '-')}-${resSlider.value}`;

  const filenameBase = await askExportName(defaultName, 'png');
  if (!filenameBase) return;

  const exportCssWidth = 2400;
  const exportCssHeight = estimateCompositionHeight(
    exportCssWidth,
    syncTextField() || ' '
  );

  const exportCanvas = document.createElement('canvas');
  exportCanvas.width = exportCssWidth;
  exportCanvas.height = exportCssHeight;

  const exportCtx = exportCanvas.getContext('2d', { willReadFrequently: true });
  const oldDpr = state.dpr;

  state.dpr = 1;
  renderToCanvas(exportCtx, exportCssWidth, exportCssHeight, {
    showGrid: true,
    showInfo: true
  });
  state.dpr = oldDpr;

  const blob = await new Promise((resolve) => {
    exportCanvas.toBlob(resolve, 'image/png');
  });

  if (blob) {
    downloadBlob(blob, `${filenameBase}.png`);
    resizeStage();
  }
}

// --------------------------------------------------
// FONT EXPORT CARD
// --------------------------------------------------

function formatExportTimestamp() {
  const now = new Date();
  return new Intl.DateTimeFormat(
    state.language === 'is' ? 'is-IS' : 'en-GB',
    {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    }
  ).format(now);
}

function createExportCardCanvas(nameBase = 'unstable-letters-font') {
  const t = translations[state.language];
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  const width = 1200;
  const height = 1320;
  const pad = 56;
  const previewW = width - pad * 2;
  const previewH = 520;

  canvas.width = width;
  canvas.height = height;

  const bg = state.inverted ? '#ffffff' : '#000000';
  const fg = state.inverted ? '#000000' : '#ffffff';
  const muted = state.inverted ? 'rgba(0,0,0,0.68)' : 'rgba(255,255,255,0.68)';
  const line = state.inverted ? 'rgba(0,0,0,0.12)' : 'rgba(255,255,255,0.12)';
  const lineStrong = state.inverted ? 'rgba(0,0,0,0.18)' : 'rgba(255,255,255,0.18)';
  const info = getInfoLines();

  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, width, height);

  ctx.strokeStyle = line;
  ctx.lineWidth = 2;
  ctx.strokeRect(pad, pad, width - pad * 2, height - pad * 2);

  ctx.fillStyle = fg;
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  ctx.font = '700 44px "IBM Plex Mono", monospace';
  ctx.fillText(t.title, pad, pad + 2);

  ctx.font = '500 20px "IBM Plex Mono", monospace';
  ctx.fillStyle = muted;
  ctx.fillText(t.exportProjectLine, pad, pad + 54);

  ctx.fillStyle = fg;
  ctx.font = '700 22px "IBM Plex Mono", monospace';
  ctx.fillText(nameBase, width - pad - 300, pad + 4);

  ctx.font = '500 18px "IBM Plex Mono", monospace';
  ctx.fillStyle = muted;
  ctx.fillText(formatExportTimestamp(), width - pad - 300, pad + 34);

  ctx.strokeStyle = lineStrong;
  ctx.beginPath();
  ctx.moveTo(pad, pad + 96);
  ctx.lineTo(width - pad, pad + 96);
  ctx.stroke();

  ctx.fillStyle = fg;
  ctx.font = '700 18px "IBM Plex Mono", monospace';
  ctx.fillText(t.exportSectionPreview, pad, pad + 116);

  const previewCanvas = document.createElement('canvas');
  previewCanvas.width = previewW;
  previewCanvas.height = previewH;
  const previewCtx = previewCanvas.getContext('2d', { willReadFrequently: true });

  const oldDpr = state.dpr;
  const oldPresentation = state.presentationMode;

  state.dpr = 1;
  state.presentationMode = false;
  renderToCanvas(previewCtx, previewW, previewH, {
    showGrid: false,
    showInfo: false,
    centerText: true
  });
  state.dpr = oldDpr;
  state.presentationMode = oldPresentation;

  const previewY = pad + 148;
  ctx.drawImage(previewCanvas, pad, previewY, previewW, previewH);

  ctx.strokeStyle = line;
  ctx.strokeRect(pad, previewY, previewW, previewH);

  const cardsY = previewY + previewH + 34;
  const cardsH = 286;
  const gap = 28;
  const colW = (width - pad * 2 - gap) / 2;

  ctx.strokeStyle = line;
  ctx.strokeRect(pad, cardsY, colW, cardsH);
  ctx.fillStyle = fg;
  ctx.font = '700 18px "IBM Plex Mono", monospace';
  ctx.fillText(t.exportSectionSystem, pad + 20, cardsY + 18);

  ctx.fillStyle = muted;
  ctx.font = '500 18px "IBM Plex Mono", monospace';
  let leftY = cardsY + 50;
  for (const lineText of info) {
    ctx.fillText(lineText, pad + 20, leftY);
    leftY += 30;
  }

  const rightX = pad + colW + gap;
  ctx.strokeStyle = line;
  ctx.strokeRect(rightX, cardsY, colW, cardsH);
  ctx.fillStyle = fg;
  ctx.font = '700 18px "IBM Plex Mono", monospace';
  ctx.fillText(t.exportSectionOutput, rightX + 20, cardsY + 18);

  const outputLines = [
    `Font: ${getActiveFontLabel()}`,
    `Resolution: ${resSlider.value}`,
    `Scale: ${scaleSlider.value}%`,
    state.pixelShape === 'circle' ? 'Shape: Circle' : 'Shape: Square',
    state.gridVisible ? 'Grid: On' : 'Grid: Off',
    state.hinting ? 'Hinting: On' : 'Hinting: Off',
    t.exportPackaged
  ];

  ctx.fillStyle = muted;
  ctx.font = '500 18px "IBM Plex Mono", monospace';
  let rightY = cardsY + 50;
  for (const lineText of outputLines) {
    ctx.fillText(lineText, rightX + 20, rightY);
    rightY += 30;
  }

  ctx.strokeStyle = lineStrong;
  ctx.beginPath();
  ctx.moveTo(pad, height - pad - 54);
  ctx.lineTo(width - pad, height - pad - 54);
  ctx.stroke();

  ctx.fillStyle = muted;
  ctx.font = '500 16px "IBM Plex Mono", monospace';
  ctx.fillText(t.byCredit, pad, height - pad - 34);

  return canvas;
}

async function renderCardAsBase64Png(nameBase) {
  const cardCanvas = createExportCardCanvas(nameBase);

  const blob = await new Promise((resolve, reject) => {
    cardCanvas.toBlob((nextBlob) => {
      if (!nextBlob) {
        reject(new Error('Failed to generate export card.'));
        return;
      }
      resolve(nextBlob);
    }, 'image/png');
  });

  const buffer = await blob.arrayBuffer();
  return bufferToBase64(buffer);
}

// --------------------------------------------------
// GLYPH BITMAP EXPORT HELPERS
// --------------------------------------------------

function getGlyphBitmapPayloadFromGlyph(glyph, sourceFont, options = {}) {
  if (!glyph) return null;

  const unitsPerEm = sourceFont.unitsPerEm || 1000;
  const glyphBounds = glyph.getBoundingBox();

  if (
    !Number.isFinite(glyphBounds.x1) ||
    !Number.isFinite(glyphBounds.y1) ||
    !Number.isFinite(glyphBounds.x2) ||
    !Number.isFinite(glyphBounds.y2)
  ) {
    return null;
  }

  const paddingUnits = Math.max(20, Math.round(unitsPerEm * 0.08));
  const minX = glyphBounds.x1 - paddingUnits;
  const minY = glyphBounds.y1 - paddingUnits;
  const maxX = glyphBounds.x2 + paddingUnits;
  const maxY = glyphBounds.y2 + paddingUnits;

  const paddedWidth = Math.max(1, maxX - minX);
  const paddedHeight = Math.max(1, maxY - minY);

  const sourceSize = options.sourceSize || 160;
  const glyphCanvas = document.createElement('canvas');
  const glyphCtx = glyphCanvas.getContext('2d', { willReadFrequently: true });
  glyphCanvas.width = sourceSize;
  glyphCanvas.height = sourceSize;

  glyphCtx.clearRect(0, 0, sourceSize, sourceSize);
  glyphCtx.fillStyle = '#000';
  glyphCtx.fillRect(0, 0, sourceSize, sourceSize);

  const scale = Math.min(sourceSize / paddedWidth, sourceSize / paddedHeight);
  const drawSize = unitsPerEm * scale;
  const baselineX = (-minX) * scale;
  const baselineY = maxY * scale;

  glyphCtx.fillStyle = '#fff';
  const path = glyph.getPath(baselineX, baselineY, drawSize);
  path.fill = '#fff';
  path.draw(glyphCtx);

  const sliderValue = Number(resSlider.value);
  const mapped = mapResolution(sliderValue / 100);

  let finalCanvas = glyphCanvas;
  let finalCtx = glyphCtx;

  if (!(sliderValue >= 99.5 || mapped >= 0.995)) {
    const sampleSize = Math.max(
      2,
      Math.min(sourceSize, Math.round(2 + mapped * (sourceSize - 2)))
    );

    const smallCanvas = document.createElement('canvas');
    const smallCtx = smallCanvas.getContext('2d', { willReadFrequently: true });
    smallCanvas.width = sampleSize;
    smallCanvas.height = sampleSize;

    smallCtx.clearRect(0, 0, sampleSize, sampleSize);
    smallCtx.imageSmoothingEnabled = state.hinting;
    smallCtx.drawImage(glyphCanvas, 0, 0, sampleSize, sampleSize);

    if (state.hinting) applyHintedLevels(smallCtx, sampleSize, sampleSize);
    else applyThreshold(smallCtx, sampleSize, sampleSize);

    finalCanvas = smallCanvas;
    finalCtx = smallCtx;
  } else {
    if (state.hinting) applyHintedLevels(finalCtx, sourceSize, sourceSize);
    else applyThreshold(finalCtx, sourceSize, sourceSize);
  }

  const width = finalCanvas.width;
  const height = finalCanvas.height;
  const image = finalCtx.getImageData(0, 0, width, height);
  const pixels = [];

  for (let i = 0; i < image.data.length; i += 4) {
    pixels.push(image.data[i] > 127 ? 1 : 0);
  }

  return {
    width,
    height,
    pixels,
    bounds: {
      minX,
      minY,
      maxX,
      maxY
    }
  };
}


function getUnicodeGlyphKey(char) {
  const codePoint = char.codePointAt(0);
  if (!Number.isFinite(codePoint)) return null;
  return `uni_${codePoint.toString(16).toUpperCase().padStart(4, '0')}`;
}

function renderUploadedFallbackGlyphBitmap(char, options = {}) {
  const sourceSize = options.sourceSize || 160;
  const padding = options.padding || Math.round(sourceSize * 0.12);
  const innerSize = sourceSize - padding * 2;

  const sliderValue = Number(resSlider.value);
  const mapped = mapResolution(sliderValue / 100);
  const sampleSize = sliderValue >= 99.5 || mapped >= 0.995
    ? sourceSize
    : Math.max(
        2,
        Math.min(innerSize, Math.round(2 + mapped * (innerSize - 2)))
      );

  const glyphCanvas = document.createElement('canvas');
  const glyphCtx = glyphCanvas.getContext('2d', { willReadFrequently: true });
  glyphCanvas.width = sourceSize;
  glyphCanvas.height = sourceSize;

  glyphCtx.setTransform(1, 0, 0, 1, 0, 0);
  glyphCtx.clearRect(0, 0, sourceSize, sourceSize);
  glyphCtx.fillStyle = '#000';
  glyphCtx.fillRect(0, 0, sourceSize, sourceSize);

  glyphCtx.fillStyle = '#fff';
  glyphCtx.textAlign = 'center';
  glyphCtx.textBaseline = 'middle';
  glyphCtx.font = `400 ${Math.floor(innerSize * 0.86)}px ${state.fontFamily}`;
  glyphCtx.fillText(char, sourceSize / 2, sourceSize / 2);

  let finalCanvas = glyphCanvas;
  let finalCtx = glyphCtx;

  if (sliderValue >= 99.5 || mapped >= 0.995) {
    if (state.hinting) applyHintedLevels(glyphCtx, sourceSize, sourceSize);
    else applyThreshold(glyphCtx, sourceSize, sourceSize);
  } else {
    const smallCanvas = document.createElement('canvas');
    const smallCtx = smallCanvas.getContext('2d', { willReadFrequently: true });
    smallCanvas.width = sampleSize;
    smallCanvas.height = sampleSize;

    smallCtx.setTransform(1, 0, 0, 1, 0, 0);
    smallCtx.clearRect(0, 0, sampleSize, sampleSize);
    smallCtx.imageSmoothingEnabled = state.hinting;
    smallCtx.drawImage(
      glyphCanvas,
      padding,
      padding,
      innerSize,
      innerSize,
      0,
      0,
      sampleSize,
      sampleSize
    );

    if (state.hinting) applyHintedLevels(smallCtx, sampleSize, sampleSize);
    else applyThreshold(smallCtx, sampleSize, sampleSize);

    finalCanvas = smallCanvas;
    finalCtx = smallCtx;
  }

  const width = finalCanvas.width;
  const height = finalCanvas.height;
  const image = finalCtx.getImageData(0, 0, width, height);
  const pixels = [];

  for (let i = 0; i < image.data.length; i += 4) {
    pixels.push(image.data[i] > 127 ? 1 : 0);
  }

  return {
    width,
    height,
    pixels,
    bounds: {
      minX: 0,
      minY: 0,
      maxX: 1000,
      maxY: 1000
    }
  };
}

function buildUploadedFallbackGlyphBitmapPayloads() {
  const payload = {};

  for (const char of EXPORTED_GLYPHS) {
    if (char === ' ') continue;

    const key = getUnicodeGlyphKey(char);
    if (!key) continue;

    payload[key] = renderUploadedFallbackGlyphBitmap(char, {
      sourceSize: 160,
      padding: 18
    });
  }

  return payload;
}

function buildGlyphBitmapPayloads() {
  // Uploaded-font export no longer depends on opentype.js parsing.
  // The browser renders each exported character with the active uploaded font,
  // then the backend maps the Unicode keys back into the real source font cmap.
  // This is more reliable for valid OTF/CFF fonts that preview correctly but
  // are fragile in opentype.js.
  return buildUploadedFallbackGlyphBitmapPayloads();
}

// --------------------------------------------------
// LEGACY BACKEND EXPORT HELPERS
// --------------------------------------------------

function getLegacyGlyphNameMap() {
  return {
    'A': 'A',
    'B': 'B',
    'C': 'C',
    'D': 'D',
    'E': 'E',
    'F': 'F',
    'G': 'G',
    'H': 'H',
    'I': 'I',
    'J': 'J',
    'K': 'K',
    'L': 'L',
    'M': 'M',
    'N': 'N',
    'O': 'O',
    'P': 'P',
    'Q': 'Q',
    'R': 'R',
    'S': 'S',
    'T': 'T',
    'U': 'U',
    'V': 'V',
    'W': 'W',
    'X': 'X',
    'Y': 'Y',
    'Z': 'Z',
    'a': 'a',
    'b': 'b',
    'c': 'c',
    'd': 'd',
    'e': 'e',
    'f': 'f',
    'g': 'g',
    'h': 'h',
    'i': 'i',
    'j': 'j',
    'k': 'k',
    'l': 'l',
    'm': 'm',
    'n': 'n',
    'o': 'o',
    'p': 'p',
    'q': 'q',
    'r': 'r',
    's': 's',
    't': 't',
    'u': 'u',
    'v': 'v',
    'w': 'w',
    'x': 'x',
    'y': 'y',
    'z': 'z',
    'Á': 'Aacute',
    'á': 'aacute',
    'Ð': 'Eth',
    'ð': 'eth',
    'É': 'Eacute',
    'é': 'eacute',
    'Í': 'Iacute',
    'í': 'iacute',
    'Ó': 'Oacute',
    'ó': 'oacute',
    'Ú': 'Uacute',
    'ú': 'uacute',
    'Ý': 'Yacute',
    'ý': 'yacute',
    'Þ': 'Thorn',
    'þ': 'thorn',
    'Æ': 'AE',
    'æ': 'ae',
    'Ö': 'Odieresis',
    'ö': 'odieresis',
    '0': 'zero',
    '1': 'one',
    '2': 'two',
    '3': 'three',
    '4': 'four',
    '5': 'five',
    '6': 'six',
    '7': 'seven',
    '8': 'eight',
    '9': 'nine',
    '.': 'period',
    ',': 'comma',
    ':': 'colon',
    ';': 'semicolon',
    '!': 'exclam',
    '?': 'question',
    "'": 'quotesingle',
    '"': 'quotedbl',
    '(': 'parenleft',
    ')': 'parenright',
    '[': 'bracketleft',
    ']': 'bracketright',
    '{': 'braceleft',
    '}': 'braceright',
    '<': 'less',
    '>': 'greater',
    '+': 'plus',
    '-': 'hyphen',
    '=': 'equal',
    '_': 'underscore',
    '/': 'slash',
    '\\': 'backslash',
    '@': 'at',
    '#': 'numbersign',
    '%': 'percent',
    '&': 'ampersand',
    '*': 'asterisk'
  };
}

function getLegacyGlyphContexts(sourceSize, sampleSize) {
  if (!state.legacyGlyphRenderCanvas) {
    state.legacyGlyphRenderCanvas = document.createElement('canvas');
    state.legacyGlyphRenderCtx = state.legacyGlyphRenderCanvas.getContext('2d', {
      willReadFrequently: true
    });
  }

  if (!state.legacySmallCanvas) {
    state.legacySmallCanvas = document.createElement('canvas');
    state.legacySmallCtx = state.legacySmallCanvas.getContext('2d', {
      willReadFrequently: true
    });
  }

  if (!state.legacyUpCanvas) {
    state.legacyUpCanvas = document.createElement('canvas');
    state.legacyUpCtx = state.legacyUpCanvas.getContext('2d', {
      willReadFrequently: true
    });
  }

  if (
    state.legacyGlyphRenderCanvas.width !== sourceSize ||
    state.legacyGlyphRenderCanvas.height !== sourceSize
  ) {
    state.legacyGlyphRenderCanvas.width = sourceSize;
    state.legacyGlyphRenderCanvas.height = sourceSize;
  }

  if (
    state.legacySmallCanvas.width !== sampleSize ||
    state.legacySmallCanvas.height !== sampleSize
  ) {
    state.legacySmallCanvas.width = sampleSize;
    state.legacySmallCanvas.height = sampleSize;
  }

  if (
    state.legacyUpCanvas.width !== sourceSize ||
    state.legacyUpCanvas.height !== sourceSize
  ) {
    state.legacyUpCanvas.width = sourceSize;
    state.legacyUpCanvas.height = sourceSize;
  }

  return {
    glyphCanvas: state.legacyGlyphRenderCanvas,
    glyphCtx: state.legacyGlyphRenderCtx,
    smallCanvas: state.legacySmallCanvas,
    smallCtx: state.legacySmallCtx,
    upCanvas: state.legacyUpCanvas,
    upCtx: state.legacyUpCtx
  };
}

function renderGlyphBitmap(char, options = {}) {
  const sourceSize = options.sourceSize || LEGACY_EXPORT_SOURCE_SIZE;
  const padding = options.padding || LEGACY_EXPORT_PADDING;
  const innerSize = sourceSize - padding * 2;

  const sliderValue = Number(resSlider.value);
  const mapped = mapResolution(sliderValue / 100);
  const sampleSize = sliderValue >= 99.5 || mapped >= 0.995
    ? sourceSize
    : Math.max(
        2,
        Math.min(innerSize, Math.round(2 + mapped * (innerSize - 2)))
      );

  const {
    glyphCanvas,
    glyphCtx,
    smallCanvas,
    smallCtx,
    upCanvas,
    upCtx
  } = getLegacyGlyphContexts(sourceSize, sampleSize);

  glyphCtx.setTransform(1, 0, 0, 1, 0, 0);
  glyphCtx.clearRect(0, 0, sourceSize, sourceSize);
  glyphCtx.fillStyle = '#000';
  glyphCtx.fillRect(0, 0, sourceSize, sourceSize);

  glyphCtx.fillStyle = '#fff';
  glyphCtx.textAlign = 'center';
  glyphCtx.textBaseline = 'middle';

  const baseSize = Math.floor(sourceSize * 0.62 * state.textScale);
  const fontSize = Math.max(18, Math.min(baseSize, innerSize));
  glyphCtx.font = `700 ${fontSize}px ${state.fontFamily}`;
  glyphCtx.fillText(char, sourceSize / 2, sourceSize / 2);

  if (sliderValue >= 99.5 || mapped >= 0.995) {
    if (state.hinting) applyHintedLevels(glyphCtx, sourceSize, sourceSize);
    else applyThreshold(glyphCtx, sourceSize, sourceSize);

    return {
      canvas: glyphCanvas,
      width: sourceSize,
      height: sourceSize
    };
  }

  smallCtx.setTransform(1, 0, 0, 1, 0, 0);
  smallCtx.clearRect(0, 0, sampleSize, sampleSize);
  smallCtx.imageSmoothingEnabled = state.hinting;
  smallCtx.drawImage(
    glyphCanvas,
    padding,
    padding,
    innerSize,
    innerSize,
    0,
    0,
    sampleSize,
    sampleSize
  );

  if (state.hinting) applyHintedLevels(smallCtx, sampleSize, sampleSize);
  else applyThreshold(smallCtx, sampleSize, sampleSize);

  // For backend font export, keep the actual sampled bitmap size.
  // Before this, legacy glyphs were upscaled back to a fixed 96×96 grid,
  // so circle exports always had almost the same dot density no matter
  // where the resolution slider was. Sending the low-resolution sample
  // lets the Python exporter rebuild fewer/larger or more/smaller circles.
  return {
    canvas: smallCanvas,
    width: sampleSize,
    height: sampleSize
  };
}

function buildLegacyGlyphBitmapPayloads() {
  const glyphNameMap = getLegacyGlyphNameMap();
  const payload = {};

  for (const char of EXPORTED_GLYPHS) {
    if (char === ' ') continue;

    const glyphName = glyphNameMap[char];
    if (!glyphName) continue;

    const rendered = renderGlyphBitmap(char, {
      sourceSize: LEGACY_EXPORT_SOURCE_SIZE,
      padding: LEGACY_EXPORT_PADDING
    });

    const ctx = rendered.canvas.getContext('2d', { willReadFrequently: true });
    const image = ctx.getImageData(0, 0, rendered.width, rendered.height);
    const pixels = [];

    for (let i = 0; i < image.data.length; i += 4) {
      pixels.push(image.data[i] > 127 ? 1 : 0);
    }

    payload[glyphName] = {
      width: rendered.width,
      height: rendered.height,
      pixels,
      bounds: {
        minX: 0,
        minY: 0,
        maxX: 1000,
        maxY: 1000
      }
    };
  }

  return payload;
}

async function generateLegacyFontViaBackend() {
  const t = translations[state.language];
  const defaultName = `${t.exportDefaultZip}-${sanitizeFilename(
    getThresholdLabel(resSlider.value).toLowerCase()
  )}`;

  const filenameBase = await askExportName(defaultName, 'zip');
  if (!filenameBase) return;

  const exportCardBase64 = await renderCardAsBase64Png(filenameBase);
  const glyphBitmaps = buildLegacyGlyphBitmapPayloads();

  let response;
  try {
    response = await fetch(EXPORT_LEGACY_BACKEND_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        font_key: state.fontKey,
        export_name: filenameBase,
        settings: {
          resolution: Number(resSlider.value),
          scale: Number(scaleSlider.value),
          hinting: !!state.hinting,
          inverted: !!state.inverted,
          gridVisible: !!state.gridVisible,
          colorMode: false,
          pixelShape: state.pixelShape,
          thresholdLabel: getThresholdLabel(resSlider.value),
          glyphs: EXPORTED_GLYPHS
        },
        glyph_bitmaps: glyphBitmaps,
        export_card_png_base64: exportCardBase64
      })
    });
  } catch (error) {
    console.error(error);
    alert(t.exportServerOffline);
    return;
  }

  if (!response.ok) {
    const message = await response.text().catch(() => '');
    console.error(message);
    alert(message || t.exportZipError);
    return;
  }

  const payload = await response.json();
  if (!payload?.zip_base64 || !payload?.zip_filename) {
    alert(t.exportZipError);
    return;
  }

  const zipBlob = base64ToBlob(payload.zip_base64, 'application/zip');
  downloadBlob(zipBlob, payload.zip_filename);
}

// --------------------------------------------------
// EMAIL EXPORT
// --------------------------------------------------

async function emailFontViaBackend() {
  const t = translations[state.language];
  const defaultName = `${t.exportDefaultZip}-${sanitizeFilename(
    getThresholdLabel(resSlider.value).toLowerCase()
  )}`;
  const details = await askEmailExportDetails(defaultName);
  if (!details) return;

  const exportCardBase64 = await renderCardAsBase64Png(details.name);
  const usingUploadedFont = state.fontKey === 'custom' && state.customFontLoaded;
  const settings = {
    resolution: Number(resSlider.value),
    scale: Number(scaleSlider.value),
    hinting: !!state.hinting,
    inverted: !!state.inverted,
    gridVisible: !!state.gridVisible,
    colorMode: false,
    pixelShape: state.pixelShape,
    thresholdLabel: getThresholdLabel(resSlider.value),
    glyphs: EXPORTED_GLYPHS
  };

  let url = EMAIL_LEGACY_BACKEND_URL;
  let body = {
    font_key: state.fontKey,
    export_name: details.name,
    email_to: details.email,
    settings,
    glyph_bitmaps: buildLegacyGlyphBitmapPayloads(),
    export_card_png_base64: exportCardBase64
  };

  if (usingUploadedFont) {
    if (!state.customFontBytes || !state.customFontFile) {
      alert(t.exportNeedsUpload);
      return;
    }

    url = EMAIL_BACKEND_URL;
    body = {
      file_name: state.customFontFile.name,
      font_base64: bufferToBase64(state.customFontBytes),
      export_name: details.name,
      email_to: details.email,
      settings,
      glyph_bitmaps: buildGlyphBitmapPayloads(),
      export_card_png_base64: exportCardBase64
    };
  }

  let response;
  try {
    response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
  } catch (error) {
    console.error(error);
    alert(t.exportServerOffline);
    return;
  }

  if (!response.ok) {
    const message = await response.text().catch(() => '');
    console.error(message);
    alert(message || t.exportEmailError);
    return;
  }

  alert(t.exportEmailSent);
}

// --------------------------------------------------
// SOURCE-PRESERVING EXPORT
// --------------------------------------------------

async function generateSourcePreservingFontZIP() {
  const t = translations[state.language];

  if (!state.customFontLoaded || !state.customFontBytes || !state.customFontFile) {
    alert(t.exportNeedsUpload);
    return;
  }

  const defaultName = `${t.exportDefaultZip}-${sanitizeFilename(
    getThresholdLabel(resSlider.value).toLowerCase()
  )}`;

  const filenameBase = await askExportName(defaultName, 'zip');
  if (!filenameBase) return;

  const exportCardBase64 = await renderCardAsBase64Png(filenameBase);
  const fontBase64 = bufferToBase64(state.customFontBytes);
  const glyphBitmaps = buildGlyphBitmapPayloads();

  let response;
  try {
    response = await fetch(EXPORT_BACKEND_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        file_name: state.customFontFile.name,
        font_base64: fontBase64,
        export_name: filenameBase,
        settings: {
          resolution: Number(resSlider.value),
          scale: Number(scaleSlider.value),
          hinting: !!state.hinting,
          inverted: !!state.inverted,
          gridVisible: !!state.gridVisible,
          colorMode: false,
          pixelShape: state.pixelShape,
          thresholdLabel: getThresholdLabel(resSlider.value),
          glyphs: EXPORTED_GLYPHS
        },
        glyph_bitmaps: glyphBitmaps,
        export_card_png_base64: exportCardBase64
      })
    });
  } catch (error) {
    console.error(error);
    alert(t.exportServerOffline);
    return;
  }

  if (!response.ok) {
    const message = await response.text().catch(() => '');
    console.error(message);
    alert(message || t.exportZipError);
    return;
  }

  const payload = await response.json();
  if (!payload?.zip_base64 || !payload?.zip_filename) {
    alert(t.exportZipError);
    return;
  }

  const zipBlob = base64ToBlob(payload.zip_base64, 'application/zip');
  downloadBlob(zipBlob, payload.zip_filename);
}

async function generateCustomFontZIP() {
  const usingUploadedFont = state.fontKey === 'custom' && state.customFontLoaded;

  if (usingUploadedFont) {
    await generateSourcePreservingFontZIP();
    return;
  }

  await generateLegacyFontViaBackend();
}

// --------------------------------------------------
// LANGUAGE + SHORTCUTS
// --------------------------------------------------

function toggleLanguage() {
  state.language = state.language === 'en' ? 'is' : 'en';
  updateUI();
  draw();
}

function handleShortcut(event) {
  const target = event.target;
  const isTypingTarget =
    target instanceof HTMLTextAreaElement ||
    target instanceof HTMLInputElement ||
    target.isContentEditable;

  if (!event.shiftKey || event.repeat) return;
  if (isTypingTarget && event.key.toLowerCase() !== 'escape') return;

  const key = event.key.toLowerCase();

  switch (key) {
    case 'g':
      event.preventDefault();
      state.gridVisible = !state.gridVisible;
      updateUI();
      draw();
      break;
    case 'h':
      event.preventDefault();
      state.hinting = !state.hinting;
      updateUI();
      draw();
      break;
    case 'c':
      event.preventDefault();
      state.inverted = !state.inverted;
      updateUI();
      draw();
      break;
    case 'l':
      event.preventDefault();
      toggleLanguage();
      break;
    case 'o':
      event.preventDefault();
      state.pixelShape = state.pixelShape === 'circle' ? 'square' : 'circle';
      updateUI();
      draw();
      break;
    case 'i':
      event.preventDefault();
      state.infoVisible = !state.infoVisible;
      updateUI();
      draw();
      break;
    case 'p':
      event.preventDefault();
      togglePresentationMode();
      break;
    case 'r':
      event.preventDefault();
      resetTool();
      break;
    default:
      break;
  }
}

// --------------------------------------------------
// EVENT BINDING
// --------------------------------------------------

function bindTextEvents() {
  if (!textInput) return;

  textInput.addEventListener('input', () => {
    syncTextField();
    draw();
  });

  if (resSlider) resSlider.addEventListener('input', draw);

  if (scaleSlider) {
    scaleSlider.addEventListener('input', () => {
      state.textScale = Number(scaleSlider.value) / 100;
      draw();
    });
  }
}

function bindMenuEvents() {
  if (fontMenuBtn) {
    fontMenuBtn.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      const willOpen = !state.fontMenuOpen;
      closeAllMenus();
      setFontMenu(willOpen);
    });
  }

  if (toolsMenuBtn) {
    toolsMenuBtn.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      const willOpen = !state.toolsMenuOpen;
      closeAllMenus();
      setToolsMenu(willOpen);
    });
  }

  if (downloadMenuBtn) {
    downloadMenuBtn.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      const willOpen = !state.downloadMenuOpen;
      closeAllMenus();
      setDownloadMenu(willOpen);
    });
  }

  if (helpBtn) {
    helpBtn.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      const willOpen = !state.helpOpen;
      closeAllMenus();
      setHelpPanel(willOpen);
    });
  }
}

function bindFontEvents() {
  if (uploadFontBtn && fontUploadInput) {
    uploadFontBtn.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      fontUploadInput.click();
    });

    fontUploadInput.addEventListener('change', async () => {
      const [file] = fontUploadInput.files || [];
      fontUploadInput.value = '';

      if (!file) return;

      try {
        await loadCustomFontFromFile(file);
      } catch (error) {
        console.error(error);
        alert(translations[state.language].uploadFontError);
      }
    });
  }

  fontOptions.forEach((btn) => {
    btn.addEventListener('click', (event) => {
      event.stopPropagation();

      const key = btn.dataset.font;

      if (key === 'custom') {
        if (!state.customFontLoaded) return;
        state.fontKey = 'custom';
        state.fontFamily = `"${state.customFontFamily}", sans-serif`;
        updateFontMenuHighlight();
        draw();

        if (!state.introFinished) renderIntroStatic();
        return;
      }

      if (!fontMap[key]) return;

      state.fontKey = key;
      state.fontFamily = fontMap[key];
      updateFontMenuHighlight();
      draw();

      if (!state.introFinished) renderIntroStatic();
    });
  });
}

function bindToolEvents() {
  if (hintBtn) {
    hintBtn.addEventListener('click', (event) => {
      event.stopPropagation();
      state.hinting = !state.hinting;
      updateUI();
      draw();
    });
  }

  if (contrastBtn) {
    contrastBtn.addEventListener('click', (event) => {
      event.stopPropagation();
      state.inverted = !state.inverted;
      updateUI();
      draw();
    });
  }

  if (gridBtn) {
    gridBtn.addEventListener('click', (event) => {
      event.stopPropagation();
      state.gridVisible = !state.gridVisible;
      updateUI();
      draw();
    });
  }

  if (shapeBtn) {
    shapeBtn.addEventListener('click', (event) => {
      event.stopPropagation();
      state.pixelShape = state.pixelShape === 'circle' ? 'square' : 'circle';
      updateUI();
      draw();
    });
  }

  if (infoBtn) {
    infoBtn.addEventListener('click', (event) => {
      event.stopPropagation();
      state.infoVisible = !state.infoVisible;
      updateUI();
      draw();
    });
  }

  if (presentationBtn) {
    presentationBtn.addEventListener('click', (event) => {
      event.stopPropagation();
      togglePresentationMode();
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', (event) => {
      event.stopPropagation();
      resetTool();
    });
  }
}

function bindLanguageEvents() {
  if (langBtn) {
    langBtn.addEventListener('click', (event) => {
      event.stopPropagation();
      toggleLanguage();
    });
  }

  if (introLangBtn) {
    introLangBtn.addEventListener('click', (event) => {
      event.stopPropagation();
      toggleLanguage();
    });
  }

  if (projectPopupLangBtn) {
    projectPopupLangBtn.addEventListener('click', (event) => {
      event.stopPropagation();
      toggleLanguage();
    });
  }
}

function bindIntroEvents() {
  if (startBtn) {
    startBtn.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      leaveIntro();
    });
  }

  if (introScreen) {
    introScreen.addEventListener('click', (event) => {
      const introInner = document.querySelector('.intro-inner');
      if (
        event.target === introScreen ||
        event.target === introCanvas ||
        event.target === introInner
      ) {
        leaveIntro();
      }
    });
  }
}

function bindPopupEvents() {
  if (projectPopupContinue) {
    projectPopupContinue.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      closeProjectPopupAndEnter();
    });
  }

  if (projectPopupClose) {
    projectPopupClose.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      closeProjectPopupAndEnter();
    });
  }

  if (projectPopup) {
    projectPopup.addEventListener('click', (event) => {
      if (event.target === projectPopup) {
        closeProjectPopupAndEnter();
      }
    });
  }
}

function bindExportEvents() {
  if (downloadPngBtn) {
    downloadPngBtn.addEventListener('click', async (event) => {
      event.stopPropagation();
      setDownloadMenu(false);
      await downloadHighResPNG();
    });
  }

  if (downloadFontBtn) {
    downloadFontBtn.addEventListener('click', async (event) => {
      event.stopPropagation();
      setDownloadMenu(false);

      try {
        await generateCustomFontZIP();
      } catch (error) {
        console.error(error);
        alert(translations[state.language].exportZipError);
      }
    });
  }

  if (emailFontBtn) {
    emailFontBtn.addEventListener('click', async (event) => {
      event.stopPropagation();
      setDownloadMenu(false);

      try {
        await emailFontViaBackend();
      } catch (error) {
        console.error(error);
        alert(translations[state.language].exportEmailError);
      }
    });
  }

  if (exportCancelBtn) {
    exportCancelBtn.addEventListener('click', () => {
      closeExportModal(null);
    });
  }

  if (exportConfirmBtn) {
    exportConfirmBtn.addEventListener('click', () => {
      closeExportModal(state.exportModalNeedsEmail ? {
        name: exportNameInput ? exportNameInput.value : '',
        email: exportEmailInput ? exportEmailInput.value : ''
      } : (exportNameInput ? exportNameInput.value : null));
    });
  }

  if (exportNameInput) {
    exportNameInput.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        closeExportModal(state.exportModalNeedsEmail ? {
          name: exportNameInput.value,
          email: exportEmailInput ? exportEmailInput.value : ''
        } : exportNameInput.value);
      } else if (event.key === 'Escape') {
        event.preventDefault();
        closeExportModal(null);
      }
    });
  }

  if (exportEmailInput) {
    exportEmailInput.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        closeExportModal({
          name: exportNameInput ? exportNameInput.value : '',
          email: exportEmailInput.value
        });
      } else if (event.key === 'Escape') {
        event.preventDefault();
        closeExportModal(null);
      }
    });
  }

  if (exportModal) {
    exportModal.addEventListener('click', (event) => {
      if (event.target === exportModal) {
        closeExportModal(null);
      }
    });
  }
}

function bindDocumentEvents() {
  document.addEventListener('click', (event) => {
    if (state.exportModalOpen || state.popupOpen) return;

    const target = event.target;
    const clickedInsideFont = fontMenuWrap?.contains(target);
    const clickedInsideTools = toolsMenuWrap?.contains(target);
    const clickedInsideDownload = downloadMenuWrap?.contains(target);
    const clickedInsideHelp = !!(!helpPanel?.hidden && helpPanel?.contains(target));
    const clickedHelpBtn = !!helpBtn?.contains(target);

    if (
      !clickedInsideFont &&
      !clickedInsideTools &&
      !clickedInsideDownload &&
      !clickedInsideHelp &&
      !clickedHelpBtn
    ) {
      closeAllMenus();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      if (state.popupOpen) {
        closeProjectPopupAndEnter();
        return;
      }

      closeAllMenus();

      if (state.exportModalOpen) {
        closeExportModal(null);
        return;
      }

      if (state.presentationMode) {
        state.presentationMode = false;
        updateUI();
        draw();
      }
    }

    handleShortcut(event);
  });
}

function bindWindowEvents() {
  window.addEventListener('resize', () => {
    if (!state.introFinished) {
      resizeIntroCanvas();
      renderIntroStatic();
    }

    resizeStage();
  });
}

function bindEvents() {
  bindTextEvents();
  bindMenuEvents();
  bindFontEvents();
  bindToolEvents();
  bindLanguageEvents();
  bindIntroEvents();
  bindPopupEvents();
  bindExportEvents();
  bindDocumentEvents();
  bindWindowEvents();
}

// --------------------------------------------------
// INIT
// --------------------------------------------------

function initApp() {
  state.textScale = Number(scaleSlider?.value || 100) / 100;
  updateUI();
  syncTextField();
  updateSliderVisuals();
  resizeIntroCanvas();
  renderIntroStatic();
  resizeStage();
  startIntroLoop();
  bindEvents();
}

if (document.fonts && document.fonts.ready) {
  document.fonts.ready.then(initApp).catch(initApp);
} else {
  initApp();
}
