const pptxgen = require("pptxgenjs");
const fs      = require("fs");
const path    = require("path");
const sharp   = require("sharp");

// ── FRESH PALETTE: Teal & Coral Energy ──────────────────────────
const C = {
  teal:       "028090",
  tealDark:   "015F6B",
  tealLight:  "E0F4F6",
  tealMid:    "5DB8C4",
  coral:      "F96167",
  coralLight: "FEE8E9",
  coralDark:  "C73D42",
  amber:      "F4A261",
  amberLight: "FEF3E9",
  amberDark:  "C97D3C",
  white:      "FFFFFF",
  offWhite:   "F7FBFC",
  darkBg:     "021B1E",
  darkBg2:    "033740",
  textDark:   "0D2B30",
  textGray:   "5A7A80",
  green:      "2DC653",
  greenLight: "E6FAF0",
  yellow:     "FFD166",
  navy:       "1A3A4A",
};

// ── Load real device photos as base64 ───────────────────────────
function photoData(filename) {
  const buf = fs.readFileSync(path.join(__dirname, filename));
  return "image/png;base64," + buf.toString("base64");
}

// ── Generate small SVG-based UI icons via sharp ─────────────────
async function svgIcon(svgContent, size = 128) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">${svgContent}</svg>`;
  return "image/png;base64," + (await sharp(Buffer.from(svg)).png().toBuffer()).toString("base64");
}

async function main() {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";

  // ── Real device photos ───────────────────────────────────────
  const photoKeyboard  = photoData("img_keyboard.png");
  const photoMouse     = photoData("img_mouse.png");
  const photoMic       = photoData("img_microphone.png");
  const photoCamera    = photoData("img_camera.png");
  const photoMonitor   = photoData("img_monitor.png");
  const photoSpeakers  = photoData("img_speakers.png");
  const photoPrinter   = photoData("img_printer.png");

  // ── Small SVG UI icons ───────────────────────────────────────
  const icoArrowR = await svgIcon(`<polygon points="20,54 80,54 80,30 108,64 80,98 80,74 20,74" fill="#028090"/>`, 128);
  const icoArrowL = await svgIcon(`<polygon points="108,54 48,54 48,30 20,64 48,98 48,74 108,74" fill="#028090"/>`, 128);
  const icoCheck  = await svgIcon(`<circle cx="64" cy="64" r="60" fill="#2DC653"/><polyline points="32,64 55,88 95,40" stroke="white" stroke-width="10" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`, 128);
  const icoStar   = await svgIcon(`<polygon points="64,10 79,50 122,50 88,73 100,115 64,91 28,115 40,73 6,50 49,50" fill="#FFD166"/>`, 128);
  const icoLight  = await svgIcon(`<ellipse cx="64" cy="52" rx="32" ry="38" fill="#FFD166"/><rect x="48" y="86" width="32" height="8" rx="4" fill="#C97D3C"/><rect x="50" y="96" width="28" height="8" rx="4" fill="#C97D3C"/><line x1="64" y1="8" x2="64" y2="18" stroke="#FFD166" stroke-width="5"/><line x1="20" y1="24" x2="27" y2="31" stroke="#FFD166" stroke-width="5"/><line x1="108" y1="24" x2="101" y2="31" stroke="#FFD166" stroke-width="5"/>`, 128);
  const icoRocket = await svgIcon(`<path d="M64 10 C64 10 90 30 90 70 L74 90 L54 90 L38 70 C38 30 64 10 64 10Z" fill="#028090"/><circle cx="64" cy="56" r="12" fill="#E0F4F6"/><polygon points="38,90 30,115 54,90" fill="#F96167"/><polygon points="90,90 98,115 74,90" fill="#F96167"/>`, 128);
  const icoQ      = await svgIcon(`<circle cx="64" cy="64" r="60" fill="#F96167"/><text x="64" y="85" font-size="72" text-anchor="middle" fill="white" font-family="Arial" font-weight="bold">?</text>`, 128);
  const icoHome   = await svgIcon(`<polygon points="64,15 110,55 100,55 100,105 70,105 70,75 58,75 58,105 28,105 28,55 18,55" fill="#F4A261"/><rect x="52" y="75" width="24" height="30" rx="3" fill="#C97D3C"/>`, 128);
  const icoBrain  = await svgIcon(`<ellipse cx="45" cy="60" rx="30" ry="38" fill="#5DB8C4"/><ellipse cx="83" cy="60" rx="30" ry="38" fill="#5DB8C4"/><ellipse cx="64" cy="58" rx="16" ry="40" fill="#028090"/>`, 128);
  const icoBook   = await svgIcon(`<rect x="20" y="18" width="72" height="88" rx="6" fill="#028090"/><rect x="24" y="22" width="64" height="80" rx="4" fill="#E0F4F6"/><line x1="56" y1="22" x2="56" y2="102" stroke="#028090" stroke-width="4"/><rect x="30" y="36" width="20" height="4" rx="2" fill="#5DB8C4"/><rect x="30" y="46" width="20" height="4" rx="2" fill="#5DB8C4"/>`, 128);
  const icoHand   = await svgIcon(`<rect x="52" y="40" width="12" height="45" rx="6" fill="#028090"/><rect x="38" y="48" width="12" height="40" rx="6" fill="#028090"/><rect x="66" y="44" width="12" height="42" rx="6" fill="#028090"/><rect x="80" y="52" width="12" height="34" rx="6" fill="#028090"/><rect x="30" y="72" width="58" height="30" rx="10" fill="#028090"/>`, 128);
  const icoInput  = await svgIcon(`<rect x="12" y="30" width="104" height="68" rx="8" fill="#F96167"/><text x="64" y="75" font-size="36" text-anchor="middle" fill="white" font-family="Arial" font-weight="bold">IN</text><polygon points="64,10 80,30 48,30" fill="#C73D42"/>`, 128);
  const icoOutput = await svgIcon(`<rect x="12" y="30" width="104" height="68" rx="8" fill="#F4A261"/><text x="64" y="75" font-size="28" text-anchor="middle" fill="white" font-family="Arial" font-weight="bold">OUT</text><polygon points="64,118 48,98 80,98" fill="#C97D3C"/>`, 128);

  // ── helpers ──────────────────────────────────────────────────
  function darkSlide(pres) {
    const s = pres.addSlide();
    s.background = { color: C.darkBg };
    s.addShape(pres.shapes.OVAL, { x: 7.8, y: -1.2, w: 4.5, h: 4.5, fill: { color: C.darkBg2 }, line: { color: C.darkBg2 } });
    s.addShape(pres.shapes.OVAL, { x: -1.5, y: 3.5, w: 3.5, h: 3.5, fill: { color: C.darkBg2 }, line: { color: C.darkBg2 } });
    return s;
  }
  function lightSlide(pres, bg = C.white) {
    const s = pres.addSlide();
    s.background = { color: bg };
    return s;
  }
  function tealHeader(s, text, y = 0, h = 0.95) {
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0, y, w: 10, h, fill: { color: C.teal }, line: { color: C.teal }, rectRadius: 0 });
    s.addText(text, { x: 0.35, y, w: 9.3, h, fontSize: 24, bold: true, color: C.white, fontFace: "Calibri", align: "center", valign: "middle" });
  }

  // ══════════════════════════════════════════════════════════════
  // SLIDE 1 — TITLE
  // ══════════════════════════════════════════════════════════════
  {
    const s = darkSlide(pres);
    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 5.2, h: 5.625, fill: { color: C.teal }, line: { color: C.teal } });
    s.addImage({ data: icoInput,  x: 0.5, y: 0.6,  w: 1.4, h: 1.4 });
    s.addImage({ data: icoOutput, x: 3.1, y: 0.6,  w: 1.4, h: 1.4 });
    s.addShape(pres.shapes.RECTANGLE, { x: 0.4, y: 2.1, w: 4.4, h: 0.03, fill: { color: C.white, transparency: 60 }, line: { color: C.white, transparency: 60 } });
    s.addText("Session 2", { x: 0.4, y: 2.2, w: 4.4, h: 0.65, fontSize: 20, color: C.tealLight, fontFace: "Calibri", align: "center" });
    s.addText("Input &\nOutput", { x: 0.3, y: 2.8, w: 4.6, h: 1.5, fontSize: 46, bold: true, color: C.white, fontFace: "Calibri", align: "center" });
    s.addText("Ages 6–10  ·  Online via Zoom", { x: 0.3, y: 4.4, w: 4.6, h: 0.5, fontSize: 13, color: C.tealLight, fontFace: "Calibri", align: "center" });
    s.addText("How do we talk\nto a computer?", { x: 5.5, y: 1.0, w: 4.2, h: 1.3, fontSize: 22, color: C.tealLight, fontFace: "Calibri", align: "center" });
    s.addText("And how does it\ntalk back to us?", { x: 5.5, y: 2.4, w: 4.2, h: 1.3, fontSize: 22, bold: true, color: C.yellow, fontFace: "Calibri", align: "center" });
    for (let i = 0; i < 3; i++) s.addImage({ data: icoStar, x: 6.3 + i * 0.75, y: 4.0, w: 0.5, h: 0.5 });
    s.addNotes("Welcome back! Say: 'Last time we learned what a computer is and its parts. Today we learn HOW we talk to computers and how they talk back!'");
  }

  // ══════════════════════════════════════════════════════════════
  // SLIDE 2 — AGENDA
  // ══════════════════════════════════════════════════════════════
  {
    const s = lightSlide(pres, C.offWhite);
    tealHeader(s, "📋  What We Will Do Today");
    const steps = [
      { n: "1", ico: icoBrain,   label: "Recap",    desc: "Quick memory check from Session 1",          c: C.teal   },
      { n: "2", ico: icoInput,   label: "INPUT",    desc: "Learn what Input means + 4 input devices",   c: C.coral  },
      { n: "3", ico: icoOutput,  label: "OUTPUT",   desc: "Learn what Output means + 3 output devices", c: C.amber  },
      { n: "4", ico: icoHand,    label: "Activity", desc: "Raise your hands — Input or Output?",        c: C.green  },
      { n: "5", ico: icoQ,       label: "Quiz",     desc: "4 quick questions in the chat",              c: C.tealMid},
      { n: "6", ico: icoHome,    label: "Homework", desc: "Sort and draw input & output devices",       c: C.amber  },
    ];
    steps.forEach((st, i) => {
      const cy = 1.08 + i * 0.74;
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.4, y: cy, w: 9.2, h: 0.65, fill: { color: st.c, transparency: 88 }, line: { color: st.c, pt: 1 }, rectRadius: 0.1 });
      s.addShape(pres.shapes.OVAL, { x: 0.48, y: cy + 0.04, w: 0.56, h: 0.56, fill: { color: st.c }, line: { color: st.c } });
      s.addText(st.n, { x: 0.48, y: cy + 0.04, w: 0.56, h: 0.56, fontSize: 14, bold: true, color: C.white, fontFace: "Calibri", align: "center", valign: "middle" });
      s.addImage({ data: st.ico, x: 1.18, y: cy + 0.09, w: 0.47, h: 0.47 });
      s.addText(st.label, { x: 1.75, y: cy, w: 1.4, h: 0.65, fontSize: 14, bold: true, color: st.c, fontFace: "Calibri", valign: "middle" });
      s.addText(st.desc,  { x: 3.2,  y: cy, w: 6.3, h: 0.65, fontSize: 13, color: C.textDark, fontFace: "Calibri", valign: "middle" });
    });
    s.addNotes("Read the agenda so students know what to expect. Takes about 1 minute.");
  }

  // ══════════════════════════════════════════════════════════════
  // SLIDE 3 — RECAP FROM SESSION 1
  // ══════════════════════════════════════════════════════════════
  {
    const s = lightSlide(pres, C.tealLight);
    tealHeader(s, "🧠  Quick Recap — What Did We Learn Last Time?");
    const qs = [
      { q: "What is a computer?",               a: "A smart machine that follows instructions!", ico: icoBook  },
      { q: "What part helps us TYPE?",          a: "The Keyboard!",                              ico: icoInput },
      { q: "What part helps us SEE?",           a: "The Monitor!",                               ico: icoOutput},
      { q: "What part helps us CLICK?",         a: "The Mouse!",                                 ico: icoBook  },
    ];
    qs.forEach((q, i) => {
      const cy = 1.15 + i * 1.02;
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.4, y: cy, w: 4.7, h: 0.85, fill: { color: C.white }, line: { color: C.teal, pt: 1.5 }, rectRadius: 0.1 });
      s.addImage({ data: q.ico, x: 0.55, y: cy + 0.17, w: 0.5, h: 0.5 });
      s.addText(q.q, { x: 1.15, y: cy, w: 3.85, h: 0.85, fontSize: 14, bold: true, color: C.textDark, fontFace: "Calibri", valign: "middle" });
      s.addImage({ data: icoArrowR, x: 5.25, y: cy + 0.28, w: 0.5, h: 0.3 });
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 5.9, y: cy, w: 3.7, h: 0.85, fill: { color: C.teal, transparency: 15 }, line: { color: C.teal, pt: 1.5 }, rectRadius: 0.1 });
      s.addText(q.a, { x: 6.0, y: cy, w: 3.5, h: 0.85, fontSize: 14, bold: true, color: C.white, fontFace: "Calibri", valign: "middle", align: "center" });
    });
    s.addNotes("Ask each question out loud. Pause 5 seconds. Then reveal the answer. Ask students to type in chat or say it aloud. Keep it quick — 3 minutes max.");
  }

  // ══════════════════════════════════════════════════════════════
  // SLIDE 4 — HOW DO WE TALK TO A COMPUTER?
  // ══════════════════════════════════════════════════════════════
  {
    const s = darkSlide(pres);
    s.addText("How Do We Talk to a Computer? 🤔", { x: 0.5, y: 0.3, w: 9, h: 1.0, fontSize: 32, bold: true, color: C.yellow, fontFace: "Calibri", align: "center" });
    s.addText("And how does the computer talk BACK to us?", { x: 0.5, y: 1.25, w: 9, h: 0.6, fontSize: 18, color: C.tealLight, fontFace: "Calibri", align: "center" });
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.4, y: 2.0, w: 3.8, h: 2.8, fill: { color: C.darkBg2 }, line: { color: C.tealMid, pt: 1.5 }, rectRadius: 0.15 });
    s.addText("👤", { x: 0.4, y: 2.1, w: 3.8, h: 1.0, fontSize: 52, fontFace: "Calibri", align: "center" });
    s.addText("YOU", { x: 0.4, y: 3.1, w: 3.8, h: 0.5, fontSize: 20, bold: true, color: C.tealLight, fontFace: "Calibri", align: "center" });
    s.addText("Type, click, speak,\ntake a photo…", { x: 0.5, y: 3.6, w: 3.6, h: 0.75, fontSize: 13, color: C.tealMid, fontFace: "Calibri", align: "center" });
    s.addImage({ data: icoArrowR, x: 4.38, y: 2.8, w: 0.7, h: 0.5 });
    s.addText("INPUT", { x: 4.28, y: 3.3, w: 0.9, h: 0.4, fontSize: 10, bold: true, color: C.coral, fontFace: "Calibri", align: "center" });
    s.addImage({ data: icoArrowL, x: 4.38, y: 3.9, w: 0.7, h: 0.5 });
    s.addText("OUTPUT", { x: 4.22, y: 4.38, w: 1.05, h: 0.4, fontSize: 10, bold: true, color: C.amber, fontFace: "Calibri", align: "center" });
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 5.4, y: 2.0, w: 4.2, h: 2.8, fill: { color: C.darkBg2 }, line: { color: C.tealMid, pt: 1.5 }, rectRadius: 0.15 });
    s.addText("🖥️", { x: 5.4, y: 2.1, w: 4.2, h: 1.0, fontSize: 52, fontFace: "Calibri", align: "center" });
    s.addText("COMPUTER", { x: 5.4, y: 3.1, w: 4.2, h: 0.5, fontSize: 20, bold: true, color: C.tealLight, fontFace: "Calibri", align: "center" });
    s.addText("Show on screen, play sound,\nprint on paper…", { x: 5.5, y: 3.6, w: 4.0, h: 0.75, fontSize: 13, color: C.tealMid, fontFace: "Calibri", align: "center" });
    s.addNotes("Say: 'When you type on a keyboard, that's INPUT — you're sending info TO the computer. When the computer shows something on screen, that's OUTPUT — the computer is sending info back to YOU.'");
  }

  // ══════════════════════════════════════════════════════════════
  // SLIDE 5 — WHAT IS INPUT? (definition)
  // ══════════════════════════════════════════════════════════════
  {
    const s = lightSlide(pres, C.coralLight);
    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 4.2, h: 5.625, fill: { color: C.coral }, line: { color: C.coral } });
    s.addText("INPUT", { x: 0.1, y: 0.4, w: 4.0, h: 1.1, fontSize: 52, bold: true, color: C.white, fontFace: "Calibri", align: "center" });
    s.addImage({ data: icoInput, x: 1.2, y: 1.65, w: 1.8, h: 1.8 });
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.2, y: 3.6, w: 3.8, h: 1.7, fill: { color: C.coralDark, transparency: 30 }, line: { color: C.white, transparency: 60, pt: 1 }, rectRadius: 0.12 });
    s.addText("Input = Sending\ninformation TO\nthe computer", { x: 0.25, y: 3.62, w: 3.7, h: 1.66, fontSize: 16, bold: true, color: C.white, fontFace: "Calibri", align: "center", valign: "middle" });
    s.addText("What is INPUT? 🎤", { x: 4.5, y: 0.25, w: 5.2, h: 0.8, fontSize: 26, bold: true, color: C.coral, fontFace: "Calibri" });
    const points = [
      { t: "YOU give information TO the computer",    ico: icoArrowR },
      { t: "You tell the computer what to do",        ico: icoArrowR },
      { t: "The computer LISTENS and receives it",    ico: icoCheck  },
    ];
    points.forEach((p, i) => {
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 4.5, y: 1.15 + i * 0.88, w: 5.1, h: 0.75, fill: { color: C.white }, line: { color: C.coral, pt: 1 }, rectRadius: 0.1 });
      s.addImage({ data: p.ico, x: 4.62, y: 1.23 + i * 0.88, w: 0.45, h: 0.45 });
      s.addText(p.t, { x: 5.15, y: 1.15 + i * 0.88, w: 4.35, h: 0.75, fontSize: 13, color: C.textDark, fontFace: "Calibri", valign: "middle" });
    });
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 4.5, y: 3.85, w: 5.1, h: 1.5, fill: { color: C.white }, line: { color: C.coral, pt: 2 }, rectRadius: 0.12 });
    s.addImage({ data: icoLight, x: 4.65, y: 4.0, w: 0.55, h: 0.55 });
    s.addText("Think of it like talking to a friend!\nWhen YOU speak — that is INPUT.\nYou are giving information to someone.", { x: 5.28, y: 3.88, w: 4.2, h: 1.44, fontSize: 12.5, color: C.coral, fontFace: "Calibri", italic: true, valign: "middle" });
    s.addNotes("Analogy: 'When you talk to a friend, your voice is INPUT — you're giving them information. Same with a computer!'");
  }

  // ══════════════════════════════════════════════════════════════
  // SLIDE 6 — INPUT DEVICE: KEYBOARD  (real photo)
  // ══════════════════════════════════════════════════════════════
  {
    const s = lightSlide(pres, C.white);
    tealHeader(s, "⌨️  Input Device 1 — The Keyboard");
    // Photo in a rounded frame
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.25, y: 1.05, w: 4.1, h: 4.1, fill: { color: C.coralLight }, line: { color: C.coral, pt: 2 }, rectRadius: 0.18 });
    s.addImage({ data: photoKeyboard, x: 0.38, y: 1.18, w: 3.84, h: 3.84 });
    const items = [
      "Types letters  A, B, C…",
      "Types numbers  1, 2, 3…",
      "Writes words and sentences",
      "Has special keys: Enter, Space, Delete",
    ];
    items.forEach((txt, i) => {
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 4.65, y: 1.15 + i * 0.88, w: 5.0, h: 0.75, fill: { color: C.coralLight }, line: { color: C.coral, pt: 1 }, rectRadius: 0.1 });
      s.addText("⌨️  " + txt, { x: 4.75, y: 1.15 + i * 0.88, w: 4.8, h: 0.75, fontSize: 14, color: C.textDark, fontFace: "Calibri", valign: "middle" });
    });
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 4.65, y: 4.65, w: 5.0, h: 0.75, fill: { color: C.coral }, line: { color: C.coral }, rectRadius: 0.1 });
    s.addText("INPUT ✓  — It sends typing TO the computer!", { x: 4.7, y: 4.65, w: 4.9, h: 0.75, fontSize: 14, bold: true, color: C.white, fontFace: "Calibri", valign: "middle", align: "center" });
    s.addText("🎯  Find the letter M on your keyboard right now!", { x: 0.35, y: 5.15, w: 4.2, h: 0.4, fontSize: 12, bold: true, color: C.coral, fontFace: "Calibri", align: "center" });
    s.addNotes("Activity: Ask each student to press a letter and hold it up to camera, or type it in chat.");
  }

  // ══════════════════════════════════════════════════════════════
  // SLIDE 7 — INPUT DEVICE: MOUSE  (real photo)
  // ══════════════════════════════════════════════════════════════
  {
    const s = lightSlide(pres, C.white);
    tealHeader(s, "🖱️  Input Device 2 — The Mouse");
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.25, y: 1.05, w: 4.1, h: 4.1, fill: { color: C.coralLight }, line: { color: C.coral, pt: 2 }, rectRadius: 0.18 });
    s.addImage({ data: photoMouse, x: 0.38, y: 1.18, w: 3.84, h: 3.84 });
    const items = [
      "Single click — selects items",
      "Double click — opens files & programs",
      "Right click — shows extra options",
      "Scroll wheel — moves up and down",
    ];
    items.forEach((txt, i) => {
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 4.65, y: 1.15 + i * 0.88, w: 5.0, h: 0.75, fill: { color: C.coralLight }, line: { color: C.coral, pt: 1 }, rectRadius: 0.1 });
      s.addText("🖱️  " + txt, { x: 4.75, y: 1.15 + i * 0.88, w: 4.8, h: 0.75, fontSize: 14, color: C.textDark, fontFace: "Calibri", valign: "middle" });
    });
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 4.65, y: 4.65, w: 5.0, h: 0.75, fill: { color: C.coral }, line: { color: C.coral }, rectRadius: 0.1 });
    s.addText("INPUT ✓  — It sends clicks & movement TO the computer!", { x: 4.7, y: 4.65, w: 4.9, h: 0.75, fontSize: 13, bold: true, color: C.white, fontFace: "Calibri", valign: "middle", align: "center" });
    s.addText("🎯  Show me: left click, then right click!", { x: 0.35, y: 5.15, w: 4.2, h: 0.4, fontSize: 12, bold: true, color: C.coral, fontFace: "Calibri", align: "center" });
    s.addNotes("Students on laptops use a trackpad — that is also a mouse input device. Let them know this.");
  }

  // ══════════════════════════════════════════════════════════════
  // SLIDE 8 — INPUT DEVICE: MICROPHONE  (real photo)
  // ══════════════════════════════════════════════════════════════
  {
    const s = lightSlide(pres, C.white);
    tealHeader(s, "🎤  Input Device 3 — The Microphone");
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.25, y: 1.05, w: 4.1, h: 4.1, fill: { color: C.coralLight }, line: { color: C.coral, pt: 2 }, rectRadius: 0.18 });
    s.addImage({ data: photoMic, x: 0.38, y: 1.18, w: 3.84, h: 3.84 });
    const items = [
      "Records your voice to the computer",
      "Used in video calls (like Zoom!)",
      "Used to give voice commands",
      "Used to make recordings & podcasts",
    ];
    items.forEach((txt, i) => {
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 4.65, y: 1.15 + i * 0.88, w: 5.0, h: 0.75, fill: { color: C.coralLight }, line: { color: C.coral, pt: 1 }, rectRadius: 0.1 });
      s.addText("🎤  " + txt, { x: 4.75, y: 1.15 + i * 0.88, w: 4.8, h: 0.75, fontSize: 14, color: C.textDark, fontFace: "Calibri", valign: "middle" });
    });
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 4.65, y: 4.65, w: 5.0, h: 0.75, fill: { color: C.coral }, line: { color: C.coral }, rectRadius: 0.1 });
    s.addText("INPUT ✓  — It sends your voice TO the computer!", { x: 4.7, y: 4.65, w: 4.9, h: 0.75, fontSize: 14, bold: true, color: C.white, fontFace: "Calibri", valign: "middle", align: "center" });
    s.addText("🎯  Right now you are using a microphone!", { x: 0.35, y: 5.15, w: 4.2, h: 0.4, fontSize: 12, bold: true, color: C.coral, fontFace: "Calibri", align: "center" });
    s.addNotes("Point out that they're using a microphone RIGHT NOW in this Zoom call! That makes it very real for them.");
  }

  // ══════════════════════════════════════════════════════════════
  // SLIDE 9 — INPUT DEVICE: CAMERA  (real photo)
  // ══════════════════════════════════════════════════════════════
  {
    const s = lightSlide(pres, C.white);
    tealHeader(s, "📷  Input Device 4 — The Camera / Webcam");
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.25, y: 1.05, w: 4.1, h: 4.1, fill: { color: C.coralLight }, line: { color: C.coral, pt: 2 }, rectRadius: 0.18 });
    s.addImage({ data: photoCamera, x: 0.38, y: 1.18, w: 3.84, h: 3.84 });
    const items = [
      "Takes photos and sends them to computer",
      "Records videos for the computer",
      "Used in video calls to show your face",
      "Used to scan documents and QR codes",
    ];
    items.forEach((txt, i) => {
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 4.65, y: 1.15 + i * 0.88, w: 5.0, h: 0.75, fill: { color: C.coralLight }, line: { color: C.coral, pt: 1 }, rectRadius: 0.1 });
      s.addText("📷  " + txt, { x: 4.75, y: 1.15 + i * 0.88, w: 4.8, h: 0.75, fontSize: 13.5, color: C.textDark, fontFace: "Calibri", valign: "middle" });
    });
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 4.65, y: 4.65, w: 5.0, h: 0.75, fill: { color: C.coral }, line: { color: C.coral }, rectRadius: 0.1 });
    s.addText("INPUT ✓  — It sends pictures & video TO the computer!", { x: 4.7, y: 4.65, w: 4.9, h: 0.75, fontSize: 13, bold: true, color: C.white, fontFace: "Calibri", valign: "middle", align: "center" });
    s.addText("🎯  Your webcam is on right now — wave hello!", { x: 0.35, y: 5.15, w: 4.2, h: 0.4, fontSize: 12, bold: true, color: C.coral, fontFace: "Calibri", align: "center" });
    s.addNotes("Tell them: 'Your Zoom camera is a webcam — an input device sending your face to everyone else!' Ask them to wave.");
  }

  // ══════════════════════════════════════════════════════════════
  // SLIDE 10 — ALL INPUT DEVICES TOGETHER  (real photos)
  // ══════════════════════════════════════════════════════════════
  {
    const s = lightSlide(pres, C.white);
    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 1.0, fill: { color: C.coral }, line: { color: C.coral } });
    s.addText("🎯  All INPUT Devices — Can You Name Them?", { x: 0.3, y: 0, w: 9.4, h: 1.0, fontSize: 24, bold: true, color: C.white, fontFace: "Calibri", align: "center", valign: "middle" });
    s.addText("INPUT = Sending information TO the computer", { x: 0.4, y: 1.08, w: 9.2, h: 0.52, fontSize: 16, bold: true, color: C.coral, fontFace: "Calibri", align: "center" });
    const devs = [
      { photo: photoKeyboard, name: "Keyboard",   use: "We type letters & numbers" },
      { photo: photoMouse,    name: "Mouse",      use: "We click and move things" },
      { photo: photoMic,      name: "Microphone", use: "We record our voice" },
      { photo: photoCamera,   name: "Camera",     use: "We send photos & video" },
    ];
    devs.forEach((d, i) => {
      const cx = 0.35 + i * 2.35;
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: cx, y: 1.7, w: 2.2, h: 3.65, fill: { color: C.coralLight }, line: { color: C.coral, pt: 2 }, rectRadius: 0.14,
        shadow: { type: "outer", color: "000000", blur: 8, offset: 2, angle: 45, opacity: 0.08 } });
      s.addImage({ data: d.photo, x: cx + 0.1, y: 1.78, w: 2.0, h: 2.0 });
      s.addText(d.name, { x: cx, y: 3.83, w: 2.2, h: 0.48, fontSize: 14, bold: true, color: C.coral, fontFace: "Calibri", align: "center" });
      s.addText(d.use,  { x: cx + 0.1, y: 4.3, w: 2.0, h: 0.8, fontSize: 11.5, color: C.textDark, fontFace: "Calibri", align: "center" });
      s.addShape(pres.shapes.OVAL, { x: cx + 0.82, y: 5.08, w: 0.55, h: 0.45, fill: { color: C.coral }, line: { color: C.coral } });
      s.addText(String(i + 1), { x: cx + 0.82, y: 5.08, w: 0.55, h: 0.45, fontSize: 13, bold: true, color: C.white, fontFace: "Calibri", align: "center", valign: "middle" });
    });
    s.addText("👉  Point at each one — can you say what it does?", { x: 0.35, y: 5.38, w: 9.3, h: 0.2, fontSize: 12, bold: true, color: C.coral, fontFace: "Calibri", align: "center" });
    s.addNotes("Quick verbal recall. Point to each card without showing the name. See if students remember. Great energy moment!");
  }

  // ══════════════════════════════════════════════════════════════
  // SLIDE 11 — WHAT IS OUTPUT? (definition)
  // ══════════════════════════════════════════════════════════════
  {
    const s = lightSlide(pres, C.amberLight);
    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 4.2, h: 5.625, fill: { color: C.amber }, line: { color: C.amber } });
    s.addText("OUTPUT", { x: 0.1, y: 0.4, w: 4.0, h: 1.1, fontSize: 44, bold: true, color: C.white, fontFace: "Calibri", align: "center" });
    s.addImage({ data: icoOutput, x: 1.2, y: 1.65, w: 1.8, h: 1.8 });
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.2, y: 3.6, w: 3.8, h: 1.7, fill: { color: C.amberDark, transparency: 30 }, line: { color: C.white, transparency: 60, pt: 1 }, rectRadius: 0.12 });
    s.addText("Output = Receiving\ninformation FROM\nthe computer", { x: 0.25, y: 3.62, w: 3.7, h: 1.66, fontSize: 16, bold: true, color: C.white, fontFace: "Calibri", align: "center", valign: "middle" });
    s.addText("What is OUTPUT? 🔊", { x: 4.5, y: 0.25, w: 5.2, h: 0.8, fontSize: 26, bold: true, color: C.amberDark, fontFace: "Calibri" });
    const points = [
      { t: "The computer gives information TO YOU",   ico: icoArrowL },
      { t: "The computer shows or plays its answer",  ico: icoArrowL },
      { t: "YOU see, hear, or read the result",       ico: icoCheck  },
    ];
    points.forEach((p, i) => {
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 4.5, y: 1.15 + i * 0.88, w: 5.1, h: 0.75, fill: { color: C.white }, line: { color: C.amber, pt: 1 }, rectRadius: 0.1 });
      s.addImage({ data: p.ico, x: 4.62, y: 1.23 + i * 0.88, w: 0.45, h: 0.45 });
      s.addText(p.t, { x: 5.15, y: 1.15 + i * 0.88, w: 4.35, h: 0.75, fontSize: 13, color: C.textDark, fontFace: "Calibri", valign: "middle" });
    });
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 4.5, y: 3.85, w: 5.1, h: 1.5, fill: { color: C.white }, line: { color: C.amber, pt: 2 }, rectRadius: 0.12 });
    s.addImage({ data: icoLight, x: 4.65, y: 4.0, w: 0.55, h: 0.55 });
    s.addText("Think of it like a friend replying to you!\nWhen THEY speak back — that is OUTPUT.\nThe computer is giving you information.", { x: 5.28, y: 3.88, w: 4.2, h: 1.44, fontSize: 12.5, color: C.amberDark, fontFace: "Calibri", italic: true, valign: "middle" });
    s.addNotes("Analogy: 'When your friend replies to you, their voice is OUTPUT — they're giving information back. The computer does the same with a screen, speaker or printer!'");
  }

  // ══════════════════════════════════════════════════════════════
  // SLIDE 12 — OUTPUT DEVICE: MONITOR  (real photo)
  // ══════════════════════════════════════════════════════════════
  {
    const s = lightSlide(pres, C.white);
    tealHeader(s, "🖥️  Output Device 1 — The Monitor");
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.25, y: 1.05, w: 4.1, h: 4.1, fill: { color: C.amberLight }, line: { color: C.amber, pt: 2 }, rectRadius: 0.18 });
    s.addImage({ data: photoMonitor, x: 0.38, y: 1.18, w: 3.84, h: 3.84 });
    const items = [
      "Shows pictures and photos",
      "Plays videos and movies",
      "Displays games on screen",
      "Shows text, words and numbers",
    ];
    items.forEach((txt, i) => {
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 4.65, y: 1.15 + i * 0.88, w: 5.0, h: 0.75, fill: { color: C.amberLight }, line: { color: C.amber, pt: 1 }, rectRadius: 0.1 });
      s.addText("🖥️  " + txt, { x: 4.75, y: 1.15 + i * 0.88, w: 4.8, h: 0.75, fontSize: 14, color: C.textDark, fontFace: "Calibri", valign: "middle" });
    });
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 4.65, y: 4.65, w: 5.0, h: 0.75, fill: { color: C.amber }, line: { color: C.amber }, rectRadius: 0.1 });
    s.addText("OUTPUT ✓  — It shows information FROM the computer!", { x: 4.7, y: 4.65, w: 4.9, h: 0.75, fontSize: 13, bold: true, color: C.white, fontFace: "Calibri", valign: "middle", align: "center" });
    s.addText("🤔  What are YOU looking at right now?", { x: 0.35, y: 5.15, w: 4.2, h: 0.4, fontSize: 12, bold: true, color: C.amberDark, fontFace: "Calibri", align: "center" });
    s.addNotes("Ask: 'What are you looking at right now?' — the answer is a MONITOR! Makes it very concrete.");
  }

  // ══════════════════════════════════════════════════════════════
  // SLIDE 13 — OUTPUT DEVICE: SPEAKERS  (real photo)
  // ══════════════════════════════════════════════════════════════
  {
    const s = lightSlide(pres, C.white);
    tealHeader(s, "🔊  Output Device 2 — Speakers");
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.25, y: 1.05, w: 4.1, h: 4.1, fill: { color: C.amberLight }, line: { color: C.amber, pt: 2 }, rectRadius: 0.18 });
    s.addImage({ data: photoSpeakers, x: 0.38, y: 1.18, w: 3.84, h: 3.84 });
    const items = [
      "Plays music and songs",
      "Plays sounds in games",
      "Lets you hear people talk in video calls",
      "Reads out text from the computer",
    ];
    items.forEach((txt, i) => {
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 4.65, y: 1.15 + i * 0.88, w: 5.0, h: 0.75, fill: { color: C.amberLight }, line: { color: C.amber, pt: 1 }, rectRadius: 0.1 });
      s.addText("🔊  " + txt, { x: 4.75, y: 1.15 + i * 0.88, w: 4.8, h: 0.75, fontSize: 14, color: C.textDark, fontFace: "Calibri", valign: "middle" });
    });
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 4.65, y: 4.65, w: 5.0, h: 0.75, fill: { color: C.amber }, line: { color: C.amber }, rectRadius: 0.1 });
    s.addText("OUTPUT ✓  — It plays sounds FROM the computer!", { x: 4.7, y: 4.65, w: 4.9, h: 0.75, fontSize: 14, bold: true, color: C.white, fontFace: "Calibri", valign: "middle", align: "center" });
    s.addText("🎵  You can hear my voice right now — that is a speaker!", { x: 0.35, y: 5.15, w: 4.2, h: 0.4, fontSize: 11, bold: true, color: C.amberDark, fontFace: "Calibri", align: "center" });
    s.addNotes("Tell them: 'You can hear my voice right now through your SPEAKERS — that is output from the computer coming to you!'");
  }

  // ══════════════════════════════════════════════════════════════
  // SLIDE 14 — OUTPUT DEVICE: PRINTER  (real photo)
  // ══════════════════════════════════════════════════════════════
  {
    const s = lightSlide(pres, C.white);
    tealHeader(s, "🖨️  Output Device 3 — The Printer");
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.25, y: 1.05, w: 4.1, h: 4.1, fill: { color: C.amberLight }, line: { color: C.amber, pt: 2 }, rectRadius: 0.18 });
    s.addImage({ data: photoPrinter, x: 0.38, y: 1.18, w: 3.84, h: 3.84 });
    const items = [
      "Prints documents on paper",
      "Prints homework and school work",
      "Prints photos and pictures",
      "Turns computer information into paper!",
    ];
    items.forEach((txt, i) => {
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 4.65, y: 1.15 + i * 0.88, w: 5.0, h: 0.75, fill: { color: C.amberLight }, line: { color: C.amber, pt: 1 }, rectRadius: 0.1 });
      s.addText("🖨️  " + txt, { x: 4.75, y: 1.15 + i * 0.88, w: 4.8, h: 0.75, fontSize: 14, color: C.textDark, fontFace: "Calibri", valign: "middle" });
    });
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 4.65, y: 4.65, w: 5.0, h: 0.75, fill: { color: C.amber }, line: { color: C.amber }, rectRadius: 0.1 });
    s.addText("OUTPUT ✓  — It brings information OUT of the computer!", { x: 4.7, y: 4.65, w: 4.9, h: 0.75, fontSize: 13, bold: true, color: C.white, fontFace: "Calibri", valign: "middle", align: "center" });
    s.addText("🤔  Have you ever used a printer at home or school?", { x: 0.35, y: 5.15, w: 4.2, h: 0.4, fontSize: 11.5, bold: true, color: C.amberDark, fontFace: "Calibri", align: "center" });
    s.addNotes("Ask: 'Who has a printer at home?' or 'Have you printed something at school?' This connects it to real life.");
  }

  // ══════════════════════════════════════════════════════════════
  // SLIDE 15 — ALL OUTPUT DEVICES TOGETHER  (real photos)
  // ══════════════════════════════════════════════════════════════
  {
    const s = lightSlide(pres, C.white);
    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 1.0, fill: { color: C.amber }, line: { color: C.amber } });
    s.addText("🎯  All OUTPUT Devices — Can You Name Them?", { x: 0.3, y: 0, w: 9.4, h: 1.0, fontSize: 24, bold: true, color: C.white, fontFace: "Calibri", align: "center", valign: "middle" });
    s.addText("OUTPUT = Receiving information FROM the computer", { x: 0.4, y: 1.08, w: 9.2, h: 0.52, fontSize: 16, bold: true, color: C.amberDark, fontFace: "Calibri", align: "center" });
    const devs = [
      { photo: photoMonitor,  name: "Monitor",  use: "We SEE pictures and text" },
      { photo: photoSpeakers, name: "Speakers", use: "We HEAR sound and music" },
      { photo: photoPrinter,  name: "Printer",  use: "We READ pages on paper" },
    ];
    devs.forEach((d, i) => {
      const cx = 0.85 + i * 2.9;
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: cx, y: 1.7, w: 2.55, h: 3.65, fill: { color: C.amberLight }, line: { color: C.amber, pt: 2 }, rectRadius: 0.14,
        shadow: { type: "outer", color: "000000", blur: 8, offset: 2, angle: 45, opacity: 0.08 } });
      s.addImage({ data: d.photo, x: cx + 0.15, y: 1.78, w: 2.25, h: 2.25 });
      s.addText(d.name, { x: cx, y: 4.08, w: 2.55, h: 0.48, fontSize: 15, bold: true, color: C.amberDark, fontFace: "Calibri", align: "center" });
      s.addText(d.use,  { x: cx + 0.1, y: 4.55, w: 2.35, h: 0.65, fontSize: 12.5, color: C.textDark, fontFace: "Calibri", align: "center" });
      s.addShape(pres.shapes.OVAL, { x: cx + 0.98, y: 5.1, w: 0.58, h: 0.45, fill: { color: C.amber }, line: { color: C.amber } });
      s.addText(String(i + 1), { x: cx + 0.98, y: 5.1, w: 0.58, h: 0.45, fontSize: 13, bold: true, color: C.white, fontFace: "Calibri", align: "center", valign: "middle" });
    });
    s.addText("👉  Point at each one — can you say what it does?", { x: 0.35, y: 5.38, w: 9.3, h: 0.2, fontSize: 12, bold: true, color: C.amberDark, fontFace: "Calibri", align: "center" });
    s.addNotes("Same as Input summary — cover the name and ask students to guess. Then reveal. Energy check before the activity.");
  }

  // ══════════════════════════════════════════════════════════════
  // SLIDE 16 — THE SIMPLE RULE
  // ══════════════════════════════════════════════════════════════
  {
    const s = darkSlide(pres);
    s.addText("The Simple Rule 💡", { x: 0.5, y: 0.2, w: 9, h: 0.9, fontSize: 34, bold: true, color: C.yellow, fontFace: "Calibri", align: "center" });
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.4, y: 1.25, w: 4.2, h: 3.5, fill: { color: C.coral, transparency: 15 }, line: { color: C.coral, pt: 2 }, rectRadius: 0.18 });
    s.addImage({ data: icoInput, x: 1.45, y: 1.5, w: 1.3, h: 1.3 });
    s.addText("INPUT", { x: 0.4, y: 2.85, w: 4.2, h: 0.75, fontSize: 34, bold: true, color: C.coral, fontFace: "Calibri", align: "center" });
    s.addText("WE tell the computer\nsomething", { x: 0.5, y: 3.6, w: 4.0, h: 0.85, fontSize: 16, color: C.white, fontFace: "Calibri", align: "center" });
    s.addText("Keyboard · Mouse · Mic · Camera", { x: 0.5, y: 4.45, w: 4.0, h: 0.22, fontSize: 11, color: C.tealLight, fontFace: "Calibri", align: "center" });
    s.addText("⟷", { x: 4.7, y: 2.5, w: 0.6, h: 0.6, fontSize: 22, color: C.yellow, fontFace: "Calibri", align: "center" });
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 5.4, y: 1.25, w: 4.2, h: 3.5, fill: { color: C.amber, transparency: 15 }, line: { color: C.amber, pt: 2 }, rectRadius: 0.18 });
    s.addImage({ data: icoOutput, x: 6.45, y: 1.5, w: 1.3, h: 1.3 });
    s.addText("OUTPUT", { x: 5.4, y: 2.85, w: 4.2, h: 0.75, fontSize: 34, bold: true, color: C.amber, fontFace: "Calibri", align: "center" });
    s.addText("The computer tells\nUS something", { x: 5.5, y: 3.6, w: 4.0, h: 0.85, fontSize: 16, color: C.white, fontFace: "Calibri", align: "center" });
    s.addText("Monitor · Speakers · Printer", { x: 5.5, y: 4.45, w: 4.0, h: 0.22, fontSize: 11, color: C.tealLight, fontFace: "Calibri", align: "center" });
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.4, y: 4.9, w: 9.2, h: 0.55, fill: { color: C.teal, transparency: 20 }, line: { color: C.tealMid, pt: 1 }, rectRadius: 0.1 });
    s.addText("Easy way to remember: INPUT goes IN  —  OUTPUT comes OUT! 🎯", { x: 0.5, y: 4.9, w: 9.0, h: 0.55, fontSize: 14, bold: true, color: C.yellow, fontFace: "Calibri", align: "center", valign: "middle" });
    s.addNotes("Say this out loud: 'INPUT goes IN to the computer. OUTPUT comes OUT of the computer.' Ask them to repeat it with you 3 times — repetition helps kids remember!");
  }

  // ══════════════════════════════════════════════════════════════
  // SLIDE 17 — ACTIVITY: RAISE YOUR HANDS!  (real photos)
  // ══════════════════════════════════════════════════════════════
  {
    const s = lightSlide(pres, C.offWhite);
    tealHeader(s, "🙋  Activity — Raise Your Hands!");
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.4, y: 1.08, w: 9.2, h: 0.85, fill: { color: C.tealLight }, line: { color: C.teal, pt: 1 }, rectRadius: 0.1 });
    s.addText("✋ ONE hand up = INPUT      ✋✋ TWO hands up = OUTPUT", {
      x: 0.5, y: 1.08, w: 9.0, h: 0.85, fontSize: 17, bold: true, color: C.tealDark, fontFace: "Calibri", align: "center", valign: "middle" });
    const items = [
      { name: "Keyboard",   photo: photoKeyboard,  answer: "INPUT",  color: C.coral, answerBg: C.coralLight },
      { name: "Monitor",    photo: photoMonitor,   answer: "OUTPUT", color: C.amber, answerBg: C.amberLight },
      { name: "Microphone", photo: photoMic,       answer: "INPUT",  color: C.coral, answerBg: C.coralLight },
      { name: "Speakers",   photo: photoSpeakers,  answer: "OUTPUT", color: C.amber, answerBg: C.amberLight },
      { name: "Camera",     photo: photoCamera,    answer: "INPUT",  color: C.coral, answerBg: C.coralLight },
      { name: "Printer",    photo: photoPrinter,   answer: "OUTPUT", color: C.amber, answerBg: C.amberLight },
    ];
    items.forEach((it, i) => {
      const col = i % 3; const row = Math.floor(i / 3);
      const cx = 0.38 + col * 3.17; const cy = 2.05 + row * 1.65;
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: cx, y: cy, w: 2.95, h: 1.5, fill: { color: it.answerBg }, line: { color: it.color, pt: 2 }, rectRadius: 0.12,
        shadow: { type: "outer", color: "000000", blur: 6, offset: 2, angle: 45, opacity: 0.08 } });
      // Photo square on the left
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: cx + 0.08, y: cy + 0.1, w: 1.28, h: 1.28, fill: { color: it.color, transparency: 85 }, line: { color: it.color, pt: 0.5 }, rectRadius: 0.08 });
      s.addImage({ data: it.photo, x: cx + 0.1, y: cy + 0.12, w: 1.24, h: 1.24 });
      s.addText(it.name, { x: cx + 1.45, y: cy + 0.1, w: 1.42, h: 0.55, fontSize: 13, bold: true, color: it.color, fontFace: "Calibri", valign: "middle" });
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: cx + 1.45, y: cy + 0.72, w: 1.42, h: 0.58, fill: { color: it.color }, line: { color: it.color }, rectRadius: 0.08 });
      s.addText(it.answer, { x: cx + 1.45, y: cy + 0.72, w: 1.42, h: 0.58, fontSize: 12, bold: true, color: C.white, fontFace: "Calibri", align: "center", valign: "middle" });
    });
    s.addNotes("Go card by card. Cover the answer badge if possible (or use a black box overlay). Show the device, pause 5 seconds, then ask students to raise hands. 1 hand = Input, 2 hands = Output. Reveal after.");
  }

  // ══════════════════════════════════════════════════════════════
  // SLIDE 18 — QUIZ
  // ══════════════════════════════════════════════════════════════
  {
    const s = darkSlide(pres);
    s.addText("⭐  Quiz Time — Are You Ready?", { x: 0.5, y: 0.2, w: 9, h: 0.85, fontSize: 30, bold: true, color: C.yellow, fontFace: "Calibri", align: "center" });
    s.addText("Type INPUT or OUTPUT in the chat — GO! 🚀", { x: 0.5, y: 1.02, w: 9, h: 0.5, fontSize: 15, color: C.tealLight, fontFace: "Calibri", align: "center" });
    const qs = [
      { q: "1.  Is a keyboard INPUT or OUTPUT?",   hint: "Answer: INPUT ✓",                          c: C.coral   },
      { q: "2.  Is a monitor INPUT or OUTPUT?",    hint: "Answer: OUTPUT ✓",                         c: C.amber   },
      { q: "3.  What does a microphone do?",       hint: "Sends voice TO the computer",              c: C.tealMid },
      { q: "4.  What does a printer do?",          hint: "Prints information OUT of the computer",   c: C.green   },
    ];
    qs.forEach((q, i) => {
      const cy = 1.65 + i * 0.92;
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.4, y: cy, w: 5.8, h: 0.78, fill: { color: q.c, transparency: 80 }, line: { color: q.c, pt: 1 }, rectRadius: 0.1 });
      s.addText(q.q, { x: 0.55, y: cy, w: 5.65, h: 0.78, fontSize: 15, bold: true, color: C.white, fontFace: "Calibri", valign: "middle" });
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 6.35, y: cy, w: 3.25, h: 0.78, fill: { color: q.c, transparency: 50 }, line: { color: q.c, pt: 1 }, rectRadius: 0.1 });
      s.addText(q.hint, { x: 6.45, y: cy, w: 3.1, h: 0.78, fontSize: 12, color: C.white, fontFace: "Calibri", valign: "middle", italic: true });
    });
    s.addText("🎉  Amazing — you all learned so much today!", { x: 0.5, y: 5.42, w: 9, h: 0.18, fontSize: 13, color: C.tealLight, fontFace: "Calibri", align: "center" });
    s.addNotes("Read each question aloud. Cover the hint column if you want (or use a black shape overlay). Pause 8 seconds. Then reveal hint. Celebrate every correct answer!");
  }

  // ══════════════════════════════════════════════════════════════
  // SLIDE 19 — HOMEWORK + GOODBYE
  // ══════════════════════════════════════════════════════════════
  {
    const s = lightSlide(pres, C.offWhite);
    tealHeader(s, "📝  Homework + See You Next Time!");
    // Task 1
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.4, y: 1.1, w: 4.45, h: 4.2, fill: { color: C.white }, line: { color: C.coral, pt: 2 }, rectRadius: 0.14,
      shadow: { type: "outer", color: "000000", blur: 8, offset: 2, angle: 45, opacity: 0.08 } });
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.4, y: 1.1, w: 4.45, h: 0.65, fill: { color: C.coral }, line: { color: C.coral }, rectRadius: 0.14 });
    s.addText("✏️  Task 1 — Sort the Devices", { x: 0.45, y: 1.1, w: 4.35, h: 0.65, fontSize: 14, bold: true, color: C.white, fontFace: "Calibri", align: "center", valign: "middle" });
    s.addText("Make two columns on paper:\nINPUT  and  OUTPUT\nThen write each device under the right column:", { x: 0.6, y: 1.85, w: 4.1, h: 0.85, fontSize: 12, color: C.textDark, fontFace: "Calibri" });
    const dlist = ["Keyboard", "Mouse", "Microphone", "Camera", "Monitor", "Speakers", "Printer"];
    dlist.slice(0, 6).forEach((d, i) => {
      const col = i % 2; const row = Math.floor(i / 2);
      const bx = 0.6 + col * 2.1; const by = 2.82 + row * 0.5;
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: bx, y: by, w: 1.95, h: 0.4, fill: { color: C.coralLight }, line: { color: C.coral, pt: 0.5 }, rectRadius: 0.07 });
      s.addText("→  " + d, { x: bx, y: by, w: 1.95, h: 0.4, fontSize: 12, color: C.textDark, fontFace: "Calibri", valign: "middle", align: "center" });
    });
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 1.65, y: 4.33, w: 1.95, h: 0.4, fill: { color: C.coralLight }, line: { color: C.coral, pt: 0.5 }, rectRadius: 0.07 });
    s.addText("→  Printer", { x: 1.65, y: 4.33, w: 1.95, h: 0.4, fontSize: 12, color: C.textDark, fontFace: "Calibri", valign: "middle", align: "center" });
    // Task 2
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 5.15, y: 1.1, w: 4.45, h: 4.2, fill: { color: C.white }, line: { color: C.teal, pt: 2 }, rectRadius: 0.14,
      shadow: { type: "outer", color: "000000", blur: 8, offset: 2, angle: 45, opacity: 0.08 } });
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 5.15, y: 1.1, w: 4.45, h: 0.65, fill: { color: C.teal }, line: { color: C.teal }, rectRadius: 0.14 });
    s.addText("🎨  Task 2 — Draw & Label", { x: 5.2, y: 1.1, w: 4.35, h: 0.65, fontSize: 14, bold: true, color: C.white, fontFace: "Calibri", align: "center", valign: "middle" });
    s.addText("Draw your computer setup at home.\nLabel each part as INPUT or OUTPUT.\n\nBonus star ⭐ if you can name\n3 input AND 3 output devices\nfrom memory!", { x: 5.3, y: 1.85, w: 4.15, h: 3.35, fontSize: 13, color: C.textDark, fontFace: "Calibri", valign: "top" });
    // Next session teaser
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.4, y: 5.28, w: 9.2, h: 0.22, fill: { color: C.tealLight }, line: { color: C.teal, pt: 1 }, rectRadius: 0.06 });
    s.addText("🚀  Next Session: How does a computer THINK? We will learn about the CPU and Memory!", { x: 0.5, y: 5.28, w: 9.0, h: 0.22, fontSize: 10.5, bold: true, color: C.tealDark, fontFace: "Calibri", align: "center", valign: "middle" });
    s.addNotes("Explain both tasks. Encourage parents to help. Tell them next session is about how the computer 'thinks' — CPU and Memory! End with a big 'Well done, amazing work today!'");
  }

  // Save
  await pres.writeFile({ fileName: "Session2_InputOutput.pptx" });
  console.log("✅  Session2_InputOutput.pptx saved!");
}

main().catch(console.error);
