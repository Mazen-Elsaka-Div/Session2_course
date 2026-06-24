/**
 * Session 2 — Input & Output
 * Parent Study Guide PDF Generator
 * 
 * Generates a beautiful, printable PDF for parents to help
 * their kids revise Input & Output concepts at home.
 */

const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

// ─── Color palette ───────────────────────────────────
const C = {
  teal:       '#028090',
  tealDark:   '#015F6B',
  tealLight:  '#E0F4F6',
  coral:      '#F96167',
  coralLight: '#FEE8E9',
  coralDark:  '#C73D42',
  amber:      '#F4A261',
  amberLight: '#FEF3E9',
  amberDark:  '#C97D3C',
  green:      '#2DC653',
  greenLight: '#E6FAF0',
  yellow:     '#FFD166',
  navy:       '#1A3A4A',
  darkBg:     '#021B1E',
  darkBg2:    '#033740',
  textDark:   '#0D2B30',
  textGray:   '#5A7A80',
  white:      '#FFFFFF',
  offWhite:   '#F7FBFC',
};

// ─── Helper: hex to RGB ──────────────────────────────
function hexToRGB(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return [r, g, b];
}

// ─── Helper: draw rounded rect ───────────────────────
function roundedRect(doc, x, y, w, h, r, opts = {}) {
  doc.save();
  doc.roundedRect(x, y, w, h, r);
  if (opts.fill) {
    doc.fill(opts.fill);
  }
  if (opts.stroke) {
    doc.lineWidth(opts.lineWidth || 1).stroke(opts.stroke);
  }
  doc.restore();
}

// ─── Helper: draw a section header bar ───────────────
function sectionHeader(doc, text, color, y) {
  const margin = 50;
  const width = doc.page.width - margin * 2;
  roundedRect(doc, margin, y, width, 36, 8, { fill: color });
  doc.fill(C.white)
     .font('Helvetica-Bold')
     .fontSize(16)
     .text(text, margin + 14, y + 9, { width: width - 28 });
  return y + 48;
}

// ─── Helper: draw device card ────────────────────────
function deviceCard(doc, x, y, w, h, opts) {
  const { name, type, description, imagePath, color, lightColor } = opts;

  // Card background
  roundedRect(doc, x, y, w, h, 10, { fill: lightColor });
  // Left color strip
  roundedRect(doc, x, y, 5, h, 2, { fill: color });

  let contentX = x + 16;
  let contentY = y + 10;
  const contentW = w - 32;

  // Try to add image
  if (imagePath && fs.existsSync(imagePath)) {
    try {
      const imgSize = 55;
      doc.image(imagePath, x + w - imgSize - 14, y + (h - imgSize) / 2, {
        width: imgSize,
        height: imgSize,
        fit: [imgSize, imgSize],
      });
    } catch (e) {
      // skip image if it fails
    }
  }

  // Device name
  doc.fill(color)
     .font('Helvetica-Bold')
     .fontSize(13)
     .text(name, contentX, contentY, { width: contentW - 70 });
  contentY += 18;

  // Type badge
  const badgeText = type === 'input' ? 'INPUT' : 'OUTPUT';
  const badgeW = 50;
  roundedRect(doc, contentX, contentY, badgeW, 15, 4, { fill: color });
  doc.fill(C.white)
     .font('Helvetica-Bold')
     .fontSize(8)
     .text(badgeText, contentX + 4, contentY + 3, { width: badgeW - 8 });
  contentY += 22;

  // Description
  doc.fill(C.textDark)
     .font('Helvetica')
     .fontSize(9)
     .text(description, contentX, contentY, { width: contentW - 70, lineGap: 2 });

  return y + h + 8;
}

// ─── Helper: draw a tip box ──────────────────────────
function tipBox(doc, x, y, w, text, icon, bgColor, textColor) {
  const h = 40;
  roundedRect(doc, x, y, w, h, 8, { fill: bgColor });
  doc.fill(textColor || C.textDark)
     .font('Helvetica-Bold')
     .fontSize(10)
     .text(`${icon}  ${text}`, x + 14, y + 13, { width: w - 28 });
  return y + h + 10;
}

// ─── Check space & add page if needed ────────────────
function ensureSpace(doc, needed, margin = 50) {
  if (doc.y + needed > doc.page.height - margin) {
    doc.addPage();
    return margin;
  }
  return doc.y;
}

// ═══════════════════════════════════════════════════════
//  MAIN PDF GENERATION
// ═══════════════════════════════════════════════════════
function generatePDF() {
  const doc = new PDFDocument({
    size: 'A4',
    margins: { top: 50, bottom: 50, left: 50, right: 50 },
    info: {
      Title: 'Session 2 — Input & Output | Parent Study Guide',
      Author: 'Kids Computer Class',
      Subject: 'Computer Input & Output Devices for Kids ages 6-10',
    },
  });

  const outputPath = path.join(__dirname, 'Session2_StudyGuide.pdf');
  const stream = fs.createWriteStream(outputPath);
  doc.pipe(stream);

  const pageW = doc.page.width;
  const margin = 50;
  const contentW = pageW - margin * 2;

  // ─────────────────────────────────────────────────────
  // PAGE 1: COVER
  // ─────────────────────────────────────────────────────

  // Top decorative bar
  roundedRect(doc, 0, 0, pageW, 8, 0, { fill: C.coral });

  // Title section background
  roundedRect(doc, margin, 60, contentW, 180, 16, { fill: C.darkBg });

  // Session badge
  roundedRect(doc, margin + 20, 75, 90, 24, 6, { fill: C.teal });
  doc.fill(C.white)
     .font('Helvetica-Bold')
     .fontSize(11)
     .text('SESSION 2', margin + 30, 80);

  // Main title
  doc.fill(C.yellow)
     .font('Helvetica-Bold')
     .fontSize(32)
     .text('Input & Output', margin + 20, 110, { width: contentW - 40 });

  // Subtitle
  doc.fill(C.white)
     .font('Helvetica')
     .fontSize(13)
     .text('Parent Study Guide — Help Your Child Learn at Home', margin + 20, 155, { width: contentW - 40 });

  // Age badge
  roundedRect(doc, margin + 20, 195, 130, 24, 6, { fill: C.amber });
  doc.fill(C.white)
     .font('Helvetica-Bold')
     .fontSize(10)
     .text('Ages 6 – 10  |  Online Class', margin + 30, 200);

  // Decorative line
  doc.moveTo(margin, 260).lineTo(margin + contentW, 260).lineWidth(2).stroke(C.tealLight);

  // Welcome message
  let y = 280;
  roundedRect(doc, margin, y, contentW, 100, 12, { fill: C.tealLight });
  doc.fill(C.tealDark)
     .font('Helvetica-Bold')
     .fontSize(14)
     .text('Dear Parents,', margin + 18, y + 14, { width: contentW - 36 });
  doc.fill(C.textDark)
     .font('Helvetica')
     .fontSize(10.5)
     .text(
       'This study guide covers everything your child learned in Session 2 about computer Input and Output devices. Use it to review the material together, practice with the activities, and reinforce the key concepts. Each section includes simple explanations and fun tips to make learning enjoyable!',
       margin + 18, y + 34, { width: contentW - 36, lineGap: 3 }
     );

  // What's inside
  y = 400;
  doc.fill(C.navy)
     .font('Helvetica-Bold')
     .fontSize(16)
     .text("What's Inside This Guide", margin, y);
  y += 28;

  const tocItems = [
    { num: '1', label: 'Key Concepts', desc: 'What is Input? What is Output?', color: C.teal },
    { num: '2', label: 'Input Devices', desc: 'Keyboard, Mouse, Microphone, Camera & more', color: C.coral },
    { num: '3', label: 'Output Devices', desc: 'Monitor, Speakers, Printer & more', color: C.amber },
    { num: '4', label: 'The Simple Rule', desc: 'An easy way to remember Input vs Output', color: C.green },
    { num: '5', label: 'Practice Activities', desc: 'Fun exercises to do together at home', color: C.teal },
    { num: '6', label: 'Homework Tasks', desc: 'Sort devices & draw your computer setup', color: C.coralDark },
  ];

  tocItems.forEach((item) => {
    roundedRect(doc, margin, y, contentW, 34, 8, { fill: C.offWhite });
    // Number circle
    roundedRect(doc, margin + 10, y + 6, 22, 22, 11, { fill: item.color });
    doc.fill(C.white).font('Helvetica-Bold').fontSize(11)
       .text(item.num, margin + 15, y + 10, { width: 12, align: 'center' });
    // Label
    doc.fill(C.textDark).font('Helvetica-Bold').fontSize(11)
       .text(item.label, margin + 42, y + 5, { width: 150 });
    // Desc
    doc.fill(C.textGray).font('Helvetica').fontSize(9)
       .text(item.desc, margin + 42, y + 19, { width: contentW - 60 });
    y += 40;
  });

  // Footer
  const footerY = doc.page.height - 40;
  doc.fill(C.textGray).font('Helvetica').fontSize(8)
     .text('Kids Computer Class — Session 2 Study Guide', margin, footerY, { width: contentW, align: 'center' });

  // ─────────────────────────────────────────────────────
  // PAGE 2: KEY CONCEPTS
  // ─────────────────────────────────────────────────────
  doc.addPage();
  roundedRect(doc, 0, 0, pageW, 6, 0, { fill: C.teal });

  y = 50;
  doc.fill(C.navy).font('Helvetica-Bold').fontSize(22)
     .text('1. Key Concepts', margin, y);
  y += 36;

  // How we talk to computers
  roundedRect(doc, margin, y, contentW, 55, 10, { fill: C.darkBg });
  doc.fill(C.yellow).font('Helvetica-Bold').fontSize(13)
     .text('How Do We Talk to a Computer?', margin + 16, y + 10, { width: contentW - 32 });
  doc.fill(C.white).font('Helvetica').fontSize(10)
     .text('We send information TO the computer (Input), and the computer sends information BACK to us (Output). It\'s like a conversation!', margin + 16, y + 28, { width: contentW - 32 });
  y += 70;

  // INPUT definition box
  roundedRect(doc, margin, y, contentW, 100, 12, { fill: C.coralLight });
  roundedRect(doc, margin, y, 6, 100, 3, { fill: C.coral });

  doc.fill(C.coral).font('Helvetica-Bold').fontSize(18)
     .text('INPUT', margin + 20, y + 10);
  doc.fill(C.coralDark).font('Helvetica-Bold').fontSize(11)
     .text('Sending information TO the computer', margin + 20, y + 32);

  const inputBullets = [
    'YOU give information TO the computer',
    'You tell the computer what to do',
    'The computer LISTENS and receives it',
  ];
  doc.fill(C.textDark).font('Helvetica').fontSize(10);
  inputBullets.forEach((b, i) => {
    doc.text(`  •  ${b}`, margin + 20, y + 50 + i * 15, { width: contentW - 40 });
  });
  y += 115;

  // Analogy
  y = tipBox(doc, margin, y, contentW,
    'Think of it like talking to a friend! When YOU speak — that is INPUT. You are giving information to someone.',
    '💡', C.coralLight, C.coralDark);

  // OUTPUT definition box
  roundedRect(doc, margin, y, contentW, 100, 12, { fill: C.amberLight });
  roundedRect(doc, margin, y, 6, 100, 3, { fill: C.amber });

  doc.fill(C.amber).font('Helvetica-Bold').fontSize(18)
     .text('OUTPUT', margin + 20, y + 10);
  doc.fill(C.amberDark).font('Helvetica-Bold').fontSize(11)
     .text('Receiving information FROM the computer', margin + 20, y + 32);

  const outputBullets = [
    'The computer gives information TO YOU',
    'The computer shows or plays its answer',
    'YOU see, hear, or read the result',
  ];
  doc.fill(C.textDark).font('Helvetica').fontSize(10);
  outputBullets.forEach((b, i) => {
    doc.text(`  •  ${b}`, margin + 20, y + 50 + i * 15, { width: contentW - 40 });
  });
  y += 115;

  // Analogy
  y = tipBox(doc, margin, y, contentW,
    'Think of it like a friend replying! When THEY speak back — that is OUTPUT. The computer is giving you information.',
    '💡', C.amberLight, C.amberDark);

  // The Simple Rule
  y += 5;
  roundedRect(doc, margin, y, contentW, 80, 12, { fill: C.darkBg });
  
  // Input side
  const halfW = (contentW - 30) / 2;
  roundedRect(doc, margin + 10, y + 10, halfW, 60, 8, { fill: C.coral });
  doc.fill(C.white).font('Helvetica-Bold').fontSize(14)
     .text('INPUT', margin + 20, y + 18, { width: halfW - 20, align: 'center' });
  doc.fill(C.white).font('Helvetica').fontSize(9)
     .text('WE tell the computer\nKeyboard · Mouse · Mic · Camera', margin + 20, y + 36, { width: halfW - 20, align: 'center', lineGap: 2 });

  // Arrow
  doc.fill(C.yellow).font('Helvetica-Bold').fontSize(20)
     .text('<>', margin + halfW + 10, y + 28, { width: 30, align: 'center' });

  // Output side
  roundedRect(doc, margin + halfW + 20, y + 10, halfW, 60, 8, { fill: C.amber });
  doc.fill(C.white).font('Helvetica-Bold').fontSize(14)
     .text('OUTPUT', margin + halfW + 30, y + 18, { width: halfW - 20, align: 'center' });
  doc.fill(C.white).font('Helvetica').fontSize(9)
     .text('The computer tells US\nMonitor · Speakers · Printer', margin + halfW + 30, y + 36, { width: halfW - 20, align: 'center', lineGap: 2 });

  y += 95;

  // Memory tip
  tipBox(doc, margin, y, contentW,
    'Easy way to remember: INPUT goes IN to the computer — OUTPUT comes OUT of the computer!',
    '🎯', C.greenLight, C.tealDark);

  // Footer
  doc.fill(C.textGray).font('Helvetica').fontSize(8)
     .text('Kids Computer Class — Session 2 Study Guide  |  Page 2', margin, footerY, { width: contentW, align: 'center' });

  // ─────────────────────────────────────────────────────
  // PAGE 3: INPUT DEVICES
  // ─────────────────────────────────────────────────────
  doc.addPage();
  roundedRect(doc, 0, 0, pageW, 6, 0, { fill: C.coral });

  y = 50;
  doc.fill(C.navy).font('Helvetica-Bold').fontSize(22)
     .text('2. Input Devices', margin, y);
  doc.fill(C.textGray).font('Helvetica').fontSize(10)
     .text('These devices send information TO the computer', margin, y + 28);
  y += 50;

  // Input devices data
  const inputDevices = [
    {
      name: 'Keyboard',
      type: 'input',
      description: 'Types letters (A, B, C…), numbers (1, 2, 3…), words and sentences. Has special keys like Enter, Space, and Delete.',
      image: 'img_keyboard.png',
      color: C.coral,
      lightColor: C.coralLight,
      challenge: 'Find the letter M on your keyboard right now!',
    },
    {
      name: 'Mouse',
      type: 'input',
      description: 'Single click selects items. Double click opens files & programs. Right click shows extra options. Scroll wheel moves up and down.',
      image: 'img_mouse.png',
      color: C.coral,
      lightColor: C.coralLight,
      challenge: 'Show me: left click, then right click!',
    },
    {
      name: 'Microphone',
      type: 'input',
      description: 'Records your voice to the computer. Used in video calls (like Zoom!), voice commands, and making recordings & podcasts.',
      image: 'img_microphone.png',
      color: C.coral,
      lightColor: C.coralLight,
      challenge: 'Try recording a voice message on your computer!',
    },
    {
      name: 'Camera / Webcam',
      type: 'input',
      description: 'Takes photos and records videos for the computer. Used in video calls to show your face. Can scan documents and QR codes.',
      image: 'img_camera.png',
      color: C.coral,
      lightColor: C.coralLight,
      challenge: 'Wave hello at your webcam!',
    },
  ];

  inputDevices.forEach((device) => {
    y = ensureSpace(doc, 95, margin);
    y = deviceCard(doc, margin, y, contentW, 85, {
      name: device.name,
      type: device.type,
      description: device.description,
      imagePath: path.join(__dirname, device.image),
      color: device.color,
      lightColor: device.lightColor,
    });
  });

  // More input devices from home
  y = ensureSpace(doc, 130, margin);
  y = sectionHeader(doc, 'More Input Devices You Use at Home!', C.coralDark, y);

  const moreInputDevices = [
    { name: 'TV Remote', desc: 'Press buttons to tell the TV what to show — that\'s INPUT!' },
    { name: 'Game Controller', desc: 'Buttons send your moves to the console — INPUT!' },
    { name: 'Touch Screen', desc: 'Your finger tap sends info to the tablet/phone — INPUT!' },
    { name: 'Voice Commands', desc: '"Hey Siri!" or "Alexa!" — your voice is INPUT to a smart device!' },
  ];

  moreInputDevices.forEach((d) => {
    roundedRect(doc, margin + 10, y, contentW - 20, 28, 6, { fill: C.coralLight });
    doc.fill(C.coralDark).font('Helvetica-Bold').fontSize(10)
       .text(`${d.name}:`, margin + 20, y + 7, { continued: true, width: contentW - 40 });
    doc.fill(C.textDark).font('Helvetica').fontSize(10)
       .text(`  ${d.desc}`, { width: contentW - 40 });
    y += 34;
  });

  y += 5;
  tipBox(doc, margin, y, contentW,
    'Any time YOU send information to a machine — that is INPUT. The machine listens to you!',
    '💡', C.coralLight, C.coralDark);

  // Footer
  doc.fill(C.textGray).font('Helvetica').fontSize(8)
     .text('Kids Computer Class — Session 2 Study Guide  |  Page 3', margin, footerY, { width: contentW, align: 'center' });

  // ─────────────────────────────────────────────────────
  // PAGE 4: OUTPUT DEVICES
  // ─────────────────────────────────────────────────────
  doc.addPage();
  roundedRect(doc, 0, 0, pageW, 6, 0, { fill: C.amber });

  y = 50;
  doc.fill(C.navy).font('Helvetica-Bold').fontSize(22)
     .text('3. Output Devices', margin, y);
  doc.fill(C.textGray).font('Helvetica').fontSize(10)
     .text('These devices receive information FROM the computer and show/play it for you', margin, y + 28);
  y += 50;

  const outputDevices = [
    {
      name: 'Monitor / Screen',
      type: 'output',
      description: 'Shows pictures, photos, videos, movies, games, and text on screen. Everything you SEE comes from the monitor.',
      image: 'img_monitor.png',
      color: C.amber,
      lightColor: C.amberLight,
    },
    {
      name: 'Speakers',
      type: 'output',
      description: 'Plays music, songs, game sounds, and lets you hear people talk in video calls. Everything you HEAR comes from speakers.',
      image: 'img_speakers.png',
      color: C.amber,
      lightColor: C.amberLight,
    },
    {
      name: 'Printer',
      type: 'output',
      description: 'Prints documents, homework, photos, and pictures on paper. Turns computer information into physical pages you can hold.',
      image: 'img_printer.png',
      color: C.amber,
      lightColor: C.amberLight,
    },
  ];

  outputDevices.forEach((device) => {
    y = ensureSpace(doc, 95, margin);
    y = deviceCard(doc, margin, y, contentW, 85, {
      name: device.name,
      type: device.type,
      description: device.description,
      imagePath: path.join(__dirname, device.image),
      color: device.color,
      lightColor: device.lightColor,
    });
  });

  // More output devices from home
  y = ensureSpace(doc, 130, margin);
  y = sectionHeader(doc, 'More Output Devices You Use at Home!', C.amberDark, y);

  const moreOutputDevices = [
    { name: 'Headphones', desc: 'Sound comes OUT — you hear music or calls privately. That\'s OUTPUT!' },
    { name: 'Television', desc: 'Shows pictures & plays sound — a big OUTPUT device at home!' },
    { name: 'Smart Speaker', desc: 'Alexa / Google Home plays music & talks back — that\'s OUTPUT!' },
  ];

  moreOutputDevices.forEach((d) => {
    roundedRect(doc, margin + 10, y, contentW - 20, 28, 6, { fill: C.amberLight });
    doc.fill(C.amberDark).font('Helvetica-Bold').fontSize(10)
       .text(`${d.name}:`, margin + 20, y + 7, { continued: true, width: contentW - 40 });
    doc.fill(C.textDark).font('Helvetica').fontSize(10)
       .text(`  ${d.desc}`, { width: contentW - 40 });
    y += 34;
  });

  y += 5;
  tipBox(doc, margin, y, contentW,
    'Any time a machine gives information BACK to you — with sound, light or a picture — that is OUTPUT!',
    '💡', C.amberLight, C.amberDark);

  // Footer
  doc.fill(C.textGray).font('Helvetica').fontSize(8)
     .text('Kids Computer Class — Session 2 Study Guide  |  Page 4', margin, footerY, { width: contentW, align: 'center' });

  // ─────────────────────────────────────────────────────
  // PAGE 5: PRACTICE ACTIVITIES & HOMEWORK
  // ─────────────────────────────────────────────────────
  doc.addPage();
  roundedRect(doc, 0, 0, pageW, 6, 0, { fill: C.green });

  y = 50;
  doc.fill(C.navy).font('Helvetica-Bold').fontSize(22)
     .text('4. Practice Activities', margin, y);
  y += 36;

  // Activity 1: Sort the Devices
  roundedRect(doc, margin, y, contentW, 28, 8, { fill: C.coral });
  doc.fill(C.white).font('Helvetica-Bold').fontSize(12)
     .text('Activity 1: Is It INPUT or OUTPUT?', margin + 14, y + 7);
  y += 38;

  doc.fill(C.textDark).font('Helvetica').fontSize(10)
     .text('Read each device name below with your child. Ask them: "Is this INPUT or OUTPUT?" Let them answer first, then check together!', margin, y, { width: contentW, lineGap: 2 });
  y += 35;

  const quizDevices = [
    { name: 'Keyboard', answer: 'INPUT', reason: 'It sends typing TO the computer' },
    { name: 'Monitor', answer: 'OUTPUT', reason: 'It shows information FROM the computer' },
    { name: 'Microphone', answer: 'INPUT', reason: 'It sends voice TO the computer' },
    { name: 'Speakers', answer: 'OUTPUT', reason: 'They play sounds FROM the computer' },
    { name: 'Camera', answer: 'INPUT', reason: 'It sends pictures TO the computer' },
    { name: 'Printer', answer: 'OUTPUT', reason: 'It prints information FROM the computer' },
    { name: 'Mouse', answer: 'INPUT', reason: 'It sends clicks & movement TO the computer' },
    { name: 'Headphones', answer: 'OUTPUT', reason: 'They play sound FROM the computer' },
    { name: 'TV Remote', answer: 'INPUT', reason: 'It sends commands TO the TV' },
    { name: 'Television', answer: 'OUTPUT', reason: 'It shows pictures FROM a device' },
  ];

  // Table header
  roundedRect(doc, margin, y, contentW, 22, 4, { fill: C.navy });
  doc.fill(C.white).font('Helvetica-Bold').fontSize(9);
  doc.text('Device', margin + 10, y + 6, { width: 100 });
  doc.text('Type', margin + 130, y + 6, { width: 60 });
  doc.text('Why?', margin + 200, y + 6, { width: contentW - 210 });
  y += 26;

  quizDevices.forEach((q, i) => {
    const bg = i % 2 === 0 ? C.offWhite : C.white;
    const isInput = q.answer === 'INPUT';
    roundedRect(doc, margin, y, contentW, 20, 2, { fill: bg });
    doc.fill(C.textDark).font('Helvetica-Bold').fontSize(9)
       .text(q.name, margin + 10, y + 5, { width: 100 });
    // Badge
    const badgeColor = isInput ? C.coral : C.amber;
    roundedRect(doc, margin + 130, y + 3, 48, 14, 4, { fill: badgeColor });
    doc.fill(C.white).font('Helvetica-Bold').fontSize(8)
       .text(q.answer, margin + 134, y + 5, { width: 40, align: 'center' });
    doc.fill(C.textGray).font('Helvetica').fontSize(8)
       .text(q.reason, margin + 200, y + 5, { width: contentW - 210 });
    y += 22;
  });

  y += 15;

  // Activity 2: The Conversation Game
  y = ensureSpace(doc, 150, margin);
  roundedRect(doc, margin, y, contentW, 28, 8, { fill: C.teal });
  doc.fill(C.white).font('Helvetica-Bold').fontSize(12)
     .text('Activity 2: The Conversation Game', margin + 14, y + 7);
  y += 38;

  doc.fill(C.textDark).font('Helvetica').fontSize(10)
     .text('Play this game with your child to reinforce the concept:', margin, y, { width: contentW });
  y += 20;

  const gameSteps = [
    'You say a device name (e.g., "Keyboard!")',
    'Your child shouts "INPUT!" or "OUTPUT!"',
    'Ask them: "Why?" — they explain the reason',
    'Switch roles! Let your child name devices for you to answer',
    'Try naming devices from around the house (remote, TV, headphones…)',
  ];

  gameSteps.forEach((step, i) => {
    roundedRect(doc, margin + 10, y, 22, 22, 11, { fill: C.teal });
    doc.fill(C.white).font('Helvetica-Bold').fontSize(10)
       .text(`${i + 1}`, margin + 15, y + 5, { width: 12, align: 'center' });
    doc.fill(C.textDark).font('Helvetica').fontSize(10)
       .text(step, margin + 42, y + 5, { width: contentW - 52 });
    y += 28;
  });

  y += 10;
  tipBox(doc, margin, y, contentW,
    'Tip for Parents: Repetition is key! Quiz your child during the week — at meals, in the car, or before bedtime.',
    '⭐', C.greenLight, C.tealDark);

  // Footer
  doc.fill(C.textGray).font('Helvetica').fontSize(8)
     .text('Kids Computer Class — Session 2 Study Guide  |  Page 5', margin, footerY, { width: contentW, align: 'center' });

  // ─────────────────────────────────────────────────────
  // PAGE 6: HOMEWORK
  // ─────────────────────────────────────────────────────
  doc.addPage();
  roundedRect(doc, 0, 0, pageW, 6, 0, { fill: C.teal });

  y = 50;
  doc.fill(C.navy).font('Helvetica-Bold').fontSize(22)
     .text('5. Homework Tasks', margin, y);
  doc.fill(C.textGray).font('Helvetica').fontSize(10)
     .text('Help your child complete these tasks before the next session', margin, y + 28);
  y += 55;

  // Task 1: Sort the Devices
  roundedRect(doc, margin, y, contentW, 200, 12, { fill: C.coralLight });
  roundedRect(doc, margin, y, contentW, 32, 8, { fill: C.coral });
  doc.fill(C.white).font('Helvetica-Bold').fontSize(13)
     .text('Task 1: Sort the Devices', margin + 14, y + 8);
  y += 42;

  doc.fill(C.textDark).font('Helvetica-Bold').fontSize(10)
     .text('Make two columns on paper and write each device under the correct column:', margin + 16, y, { width: contentW - 32 });
  y += 22;

  // Draw two column headers
  const col1X = margin + 20;
  const col2X = margin + contentW / 2 + 10;
  const colW = (contentW - 60) / 2;

  roundedRect(doc, col1X, y, colW, 24, 6, { fill: C.coral });
  doc.fill(C.white).font('Helvetica-Bold').fontSize(12)
     .text('INPUT', col1X, y + 5, { width: colW, align: 'center' });

  roundedRect(doc, col2X, y, colW, 24, 6, { fill: C.amber });
  doc.fill(C.white).font('Helvetica-Bold').fontSize(12)
     .text('OUTPUT', col2X, y + 5, { width: colW, align: 'center' });
  y += 32;

  // Input column answers
  const inputAnswers = ['Keyboard', 'Mouse', 'Microphone', 'Camera'];
  const outputAnswers = ['Monitor', 'Speakers', 'Printer'];

  inputAnswers.forEach((item, i) => {
    doc.fill(C.textDark).font('Helvetica').fontSize(10)
       .text(`  •  ${item}`, col1X + 10, y + i * 18);
  });

  outputAnswers.forEach((item, i) => {
    doc.fill(C.textDark).font('Helvetica').fontSize(10)
       .text(`  •  ${item}`, col2X + 10, y + i * 18);
  });

  y += Math.max(inputAnswers.length, outputAnswers.length) * 18 + 15;

  doc.fill(C.coralDark).font('Helvetica-Bold').fontSize(9)
     .text('(Answers are shown above for parent reference — cover them when working with your child!)', margin + 16, y, { width: contentW - 32 });

  y = 310;

  // Task 2: Draw & Label
  roundedRect(doc, margin, y, contentW, 140, 12, { fill: C.tealLight });
  roundedRect(doc, margin, y, contentW, 32, 8, { fill: C.teal });
  doc.fill(C.white).font('Helvetica-Bold').fontSize(13)
     .text('Task 2: Draw & Label', margin + 14, y + 8);
  y += 42;

  doc.fill(C.textDark).font('Helvetica').fontSize(10.5)
     .text('Ask your child to:', margin + 16, y, { width: contentW - 32, lineGap: 4 });
  y += 18;

  const drawSteps = [
    'Draw their computer setup at home (monitor, keyboard, mouse, speakers, etc.)',
    'Label each part as INPUT or OUTPUT',
    'Use different colors for input devices and output devices',
  ];
  drawSteps.forEach((step) => {
    doc.fill(C.textDark).font('Helvetica').fontSize(10)
       .text(`  •  ${step}`, margin + 16, y, { width: contentW - 32 });
    y += 17;
  });

  y += 8;
  roundedRect(doc, margin + 16, y, contentW - 32, 26, 6, { fill: C.amberLight });
  doc.fill(C.amberDark).font('Helvetica-Bold').fontSize(9)
     .text('Bonus Star: If your child can name 3 input AND 3 output devices from memory!', margin + 26, y + 7, { width: contentW - 52 });

  y = 470;

  // Coming up next
  roundedRect(doc, margin, y, contentW, 65, 12, { fill: C.darkBg });
  doc.fill(C.yellow).font('Helvetica-Bold').fontSize(14)
     .text('Coming Up Next...', margin + 16, y + 12, { width: contentW - 32 });
  doc.fill(C.white).font('Helvetica').fontSize(11)
     .text('Session 3: How does a computer THINK? We will learn about the CPU and Memory!', margin + 16, y + 34, { width: contentW - 32 });

  y = 555;

  // Final parent tips
  roundedRect(doc, margin, y, contentW, 140, 12, { fill: C.greenLight });
  doc.fill(C.tealDark).font('Helvetica-Bold').fontSize(14)
     .text('Tips for Parents', margin + 16, y + 12, { width: contentW - 32 });
  y += 35;

  const parentTips = [
    'Point out input and output devices as you see them around the house during the week.',
    'When your child uses a tablet, phone, or TV — ask them "Is that input or output?"',
    'Praise effort and encourage curiosity — there are no wrong questions!',
    'Practice the vocabulary: Input, Output, Keyboard, Mouse, Monitor, Speakers, Printer, Microphone, Camera.',
    'Make it a game: who can spot more input/output devices in one room?',
  ];

  parentTips.forEach((tip) => {
    doc.fill(C.textDark).font('Helvetica').fontSize(9.5)
       .text(`  ✓  ${tip}`, margin + 16, y, { width: contentW - 32, lineGap: 1 });
    y += 18;
  });

  // Footer
  doc.fill(C.textGray).font('Helvetica').fontSize(8)
     .text('Kids Computer Class — Session 2 Study Guide  |  Page 6', margin, footerY, { width: contentW, align: 'center' });

  // ─── FINALIZE ──────────────────────────────────────
  doc.end();

  stream.on('finish', () => {
    console.log(`\n✅ PDF generated successfully!`);
    console.log(`📄 File: ${outputPath}`);
    console.log(`📏 Size: ${(fs.statSync(outputPath).size / 1024).toFixed(1)} KB`);
  });
}

generatePDF();
