/**
 * Session 3 — Hardware, Software & Programming Languages
 * Parent Study Guide PDF Generator
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
  purple:     '#7C3AED',
  purpleLight:'#EDE9FE',
  purpleDark: '#5B21B6',
  indigo:     '#6366F1',
};

function roundedRect(doc, x, y, w, h, r, opts = {}) {
  doc.save();
  doc.roundedRect(x, y, w, h, r);
  if (opts.fill) doc.fill(opts.fill);
  if (opts.stroke) doc.lineWidth(opts.lineWidth || 1).stroke(opts.stroke);
  doc.restore();
}

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

function tipBox(doc, x, y, w, text, icon, bgColor, textColor) {
  const h = 45;
  roundedRect(doc, x, y, w, h, 8, { fill: bgColor });
  doc.fill(textColor || C.textDark)
     .font('Helvetica-Bold')
     .fontSize(10)
     .text(`${icon}  ${text}`, x + 14, y + 13, { width: w - 28, lineGap: 2 });
  return y + h + 10;
}

function ensureSpace(doc, needed, margin = 50) {
  if (doc.y + needed > doc.page.height - margin) {
    doc.addPage();
    return margin;
  }
  return doc.y;
}

function generatePDF() {
  const doc = new PDFDocument({
    size: 'A4',
    margins: { top: 50, bottom: 50, left: 50, right: 50 },
    info: {
      Title: 'Session 3 — Hardware, Software & Programming Languages | Parent Study Guide',
      Author: 'Kids Computer Class',
    },
  });

  const outputPath = path.join(__dirname, 'Session3_StudyGuide.pdf');
  const stream = fs.createWriteStream(outputPath);
  doc.pipe(stream);

  const pageW = doc.page.width;
  const margin = 50;
  const contentW = pageW - margin * 2;
  let y = 0;

  // ─────────────────────────────────────────────────────
  // PAGE 1: COVER
  // ─────────────────────────────────────────────────────
  roundedRect(doc, 0, 0, pageW, 8, 0, { fill: C.purple });

  roundedRect(doc, margin, 60, contentW, 200, 16, { fill: C.darkBg });
  roundedRect(doc, margin + 20, 75, 90, 24, 6, { fill: C.teal });
  doc.fill(C.white).font('Helvetica-Bold').fontSize(11).text('SESSION 3', margin + 30, 80);

  doc.fill(C.yellow).font('Helvetica-Bold').fontSize(32).text('Hardware & Software', margin + 20, 110, { width: contentW - 40 });
  doc.fill(C.white).font('Helvetica-Bold').fontSize(22).text('+ Programming Languages', margin + 20, 150, { width: contentW - 40 });

  doc.fill(C.white).font('Helvetica').fontSize(13).text('Parent Study Guide — Help Your Child Learn at Home', margin + 20, 185, { width: contentW - 40 });

  roundedRect(doc, margin + 20, 215, 130, 24, 6, { fill: C.amber });
  doc.fill(C.white).font('Helvetica-Bold').fontSize(10).text('Ages 6 – 10  |  Online Class', margin + 30, 220);

  doc.moveTo(margin, 280).lineTo(margin + contentW, 280).lineWidth(2).stroke(C.tealLight);

  y = 300;
  roundedRect(doc, margin, y, contentW, 100, 12, { fill: C.tealLight });
  doc.fill(C.tealDark).font('Helvetica-Bold').fontSize(14).text('Dear Parents,', margin + 18, y + 14, { width: contentW - 36 });
  doc.fill(C.textDark).font('Helvetica').fontSize(10.5).text('This guide helps you review Session 3 with your child. We explored the difference between Hardware (the things you can touch) and Software (the programs inside). We also introduced Programming Languages and how we use them to talk to computers!', margin + 18, y + 34, { width: contentW - 36, lineGap: 3 });

  y = 420;
  doc.fill(C.navy).font('Helvetica-Bold').fontSize(16).text("What's Inside This Guide", margin, y);
  y += 28;

  const tocItems = [
    { num: '1', label: 'Hardware', desc: 'The parts you can touch and see', color: C.coral },
    { num: '2', label: 'Software', desc: 'The instructions and programs inside', color: C.purple },
    { num: '3', label: 'The Rule', desc: 'An easy way to tell them apart', color: C.teal },
    { num: '4', label: 'Programming Languages', desc: 'How we talk to the computer', color: C.amber },
    { num: '5', label: 'Activities & Homework', desc: 'Practice games for home', color: C.green },
  ];

  tocItems.forEach((item) => {
    roundedRect(doc, margin, y, contentW, 34, 8, { fill: C.offWhite });
    roundedRect(doc, margin + 10, y + 6, 22, 22, 11, { fill: item.color });
    doc.fill(C.white).font('Helvetica-Bold').fontSize(11).text(item.num, margin + 15, y + 10, { width: 12, align: 'center' });
    doc.fill(C.textDark).font('Helvetica-Bold').fontSize(11).text(item.label, margin + 42, y + 5, { width: 160 });
    doc.fill(C.textGray).font('Helvetica').fontSize(9).text(item.desc, margin + 42, y + 19, { width: contentW - 60 });
    y += 40;
  });

  const footerY = doc.page.height - 40;
  doc.fill(C.textGray).font('Helvetica').fontSize(8).text('Kids Computer Class — Session 3 Study Guide', margin, footerY, { width: contentW, align: 'center' });

  // ─────────────────────────────────────────────────────
  // PAGE 2: HARDWARE
  // ─────────────────────────────────────────────────────
  doc.addPage();
  roundedRect(doc, 0, 0, pageW, 6, 0, { fill: C.coral });

  y = 50;
  doc.fill(C.navy).font('Helvetica-Bold').fontSize(22).text('1. Hardware', margin, y);
  y += 36;

  roundedRect(doc, margin, y, contentW, 90, 12, { fill: C.coralLight });
  roundedRect(doc, margin, y, 6, 90, 3, { fill: C.coral });

  doc.fill(C.coral).font('Helvetica-Bold').fontSize(18).text('HARDWARE = The Body', margin + 20, y + 15);
  doc.fill(C.textDark).font('Helvetica').fontSize(11).text('Hardware is any part of the computer that you can TOUCH, HOLD, or DROP.', margin + 20, y + 40, { width: contentW - 40, lineGap: 3 });
  
  y += 105;
  tipBox(doc, margin, y, contentW, 'Analogy: If a computer is like a person, Hardware is the body (bones, eyes, hands).', '🙋', C.amberLight, C.amberDark);
  y += 65;

  y = sectionHeader(doc, 'Examples of Hardware', C.coralDark, y);

  const hwExamples = [
    { name: 'Monitor', desc: 'The screen you look at.' },
    { name: 'Keyboard & Mouse', desc: 'The tools you use to click and type.' },
    { name: 'CPU (Processor)', desc: 'The brain chip inside the computer.' },
    { name: 'Headphones', desc: 'The device you wear to listen to sound.' }
  ];

  hwExamples.forEach(hw => {
    roundedRect(doc, margin, y, contentW, 35, 6, { fill: C.offWhite });
    doc.fill(C.coralDark).font('Helvetica-Bold').fontSize(11).text(hw.name + ':', margin + 10, y + 10, { continued: true });
    doc.fill(C.textDark).font('Helvetica').fontSize(11).text(' ' + hw.desc);
    y += 45;
  });

  doc.fill(C.textGray).font('Helvetica').fontSize(8).text('Page 2', margin, footerY, { width: contentW, align: 'center' });

  // ─────────────────────────────────────────────────────
  // PAGE 3: SOFTWARE
  // ─────────────────────────────────────────────────────
  doc.addPage();
  roundedRect(doc, 0, 0, pageW, 6, 0, { fill: C.purple });

  y = 50;
  doc.fill(C.navy).font('Helvetica-Bold').fontSize(22).text('2. Software', margin, y);
  y += 36;

  roundedRect(doc, margin, y, contentW, 90, 12, { fill: C.purpleLight });
  roundedRect(doc, margin, y, 6, 90, 3, { fill: C.purple });

  doc.fill(C.purple).font('Helvetica-Bold').fontSize(18).text('SOFTWARE = The Brain & Thoughts', margin + 20, y + 15);
  doc.fill(C.textDark).font('Helvetica').fontSize(11).text('Software is the programs, apps, and instructions inside the computer. You CANNOT touch it physically.', margin + 20, y + 40, { width: contentW - 40, lineGap: 3 });

  y += 105;
  tipBox(doc, margin, y, contentW, 'Analogy: If a computer is like a person, Software is the thoughts, memories, and ideas inside the brain.', '🧠', C.purpleLight, C.purpleDark);
  y += 65;

  y = sectionHeader(doc, 'Examples of Software', C.purpleDark, y);

  const swExamples = [
    { name: 'Games', desc: 'Roblox, Minecraft, or puzzle games.' },
    { name: 'Web Browsers', desc: 'Google Chrome or Safari.' },
    { name: 'Apps', desc: 'YouTube, Zoom, or a drawing app like MS Paint.' },
    { name: 'Operating System', desc: 'Windows, macOS, or iOS that runs the device.' }
  ];

  swExamples.forEach(sw => {
    roundedRect(doc, margin, y, contentW, 35, 6, { fill: C.offWhite });
    doc.fill(C.purpleDark).font('Helvetica-Bold').fontSize(11).text(sw.name + ':', margin + 10, y + 10, { continued: true });
    doc.fill(C.textDark).font('Helvetica').fontSize(11).text(' ' + sw.desc);
    y += 45;
  });

  y += 10;
  roundedRect(doc, margin, y, contentW, 80, 12, { fill: C.darkBg });
  doc.fill(C.yellow).font('Helvetica-Bold').fontSize(13).text('The Golden Rule:', margin + 20, y + 15);
  doc.fill(C.white).font('Helvetica').fontSize(11).text('Hardware needs Software to know what to do.\nSoftware needs Hardware to run.\nThey work as a TEAM!', margin + 20, y + 35, { lineGap: 4 });

  doc.fill(C.textGray).font('Helvetica').fontSize(8).text('Page 3', margin, footerY, { width: contentW, align: 'center' });

  // ─────────────────────────────────────────────────────
  // PAGE 4: PROGRAMMING LANGUAGES
  // ─────────────────────────────────────────────────────
  doc.addPage();
  roundedRect(doc, 0, 0, pageW, 6, 0, { fill: C.amber });

  y = 50;
  doc.fill(C.navy).font('Helvetica-Bold').fontSize(22).text('3. Programming Languages', margin, y);
  y += 36;

  roundedRect(doc, margin, y, contentW, 110, 12, { fill: C.amberLight });
  doc.fill(C.amberDark).font('Helvetica-Bold').fontSize(14).text('How do we talk to the computer?', margin + 20, y + 20);
  doc.fill(C.textDark).font('Helvetica').fontSize(11).text('As humans, we communicate with each other using human languages like English, Arabic, Spanish, or French. \n\nBut computers don\'t understand human language. To talk to a computer and tell it what to do, we use a Programming Language!', margin + 20, y + 45, { width: contentW - 40, lineGap: 3 });
  
  y += 130;

  // Split Panel
  const halfW = (contentW - 20) / 2;
  
  roundedRect(doc, margin, y, halfW, 110, 8, { fill: C.tealLight });
  doc.fill(C.tealDark).font('Helvetica-Bold').fontSize(14).text('Human Languages', margin + 10, y + 15, { width: halfW - 20, align: 'center' });
  doc.fill(C.textDark).font('Helvetica').fontSize(10).text('Used to talk to other humans.\nExamples:\n• English\n• Arabic\n• French', margin + 20, y + 40, { lineGap: 3 });

  roundedRect(doc, margin + halfW + 20, y, halfW, 110, 8, { fill: C.purpleLight });
  doc.fill(C.purpleDark).font('Helvetica-Bold').fontSize(14).text('Programming Languages', margin + halfW + 30, y + 15, { width: halfW - 20, align: 'center' });
  doc.fill(C.textDark).font('Helvetica').fontSize(10).text('Used to talk to computers.\nExamples:\n• Python\n• JavaScript\n• Scratch', margin + halfW + 40, y + 40, { lineGap: 3 });

  y += 130;

  tipBox(doc, margin, y, contentW, 'When we write instructions for the computer using a Programming Language, we are creating Software!', '💻', C.greenLight, C.tealDark);
  
  y += 70;
  roundedRect(doc, margin, y, contentW, 120, 12, { fill: C.darkBg });
  doc.fill(C.yellow).font('Helvetica-Bold').fontSize(14).text('Summary of How It Works:', margin + 20, y + 20);
  doc.fill(C.white).font('Helvetica').fontSize(11).text('1. We learn a Programming Language.\n2. We use it to write instructions (Code/Software).\n3. The computer\'s Hardware runs the instructions.\n4. The computer does what we asked!', margin + 20, y + 45, { lineGap: 4 });

  doc.fill(C.textGray).font('Helvetica').fontSize(8).text('Page 4', margin, footerY, { width: contentW, align: 'center' });

  // ─────────────────────────────────────────────────────
  // PAGE 5: PRACTICE & HOMEWORK
  // ─────────────────────────────────────────────────────
  doc.addPage();
  roundedRect(doc, 0, 0, pageW, 6, 0, { fill: C.green });

  y = 50;
  doc.fill(C.navy).font('Helvetica-Bold').fontSize(22).text('4. Practice & Homework', margin, y);
  y += 36;

  // Activity 1
  roundedRect(doc, margin, y, contentW, 28, 8, { fill: C.coral });
  doc.fill(C.white).font('Helvetica-Bold').fontSize(12).text('Activity: Hardware or Software?', margin + 14, y + 7);
  y += 38;

  doc.fill(C.textDark).font('Helvetica').fontSize(10).text('Read each item with your child. Ask them: "Can you touch it?" Then decide if it is Hardware or Software.', margin, y, { width: contentW, lineGap: 2 });
  y += 35;

  const quizItems = [
    { name: 'Mouse', answer: 'HARDWARE' },
    { name: 'YouTube', answer: 'SOFTWARE' },
    { name: 'Keyboard', answer: 'HARDWARE' },
    { name: 'Minecraft Game', answer: 'SOFTWARE' },
    { name: 'Monitor', answer: 'HARDWARE' },
    { name: 'Zoom App', answer: 'SOFTWARE' }
  ];

  roundedRect(doc, margin, y, contentW, 22, 4, { fill: C.navy });
  doc.fill(C.white).font('Helvetica-Bold').fontSize(9);
  doc.text('Item', margin + 10, y + 6, { width: 100 });
  doc.text('Answer', margin + 180, y + 6, { width: 100 });
  y += 26;

  quizItems.forEach((q, i) => {
    const bg = i % 2 === 0 ? C.offWhite : C.white;
    roundedRect(doc, margin, y, contentW, 20, 2, { fill: bg });
    doc.fill(C.textDark).font('Helvetica-Bold').fontSize(9).text(q.name, margin + 10, y + 5, { width: 150 });
    
    const badgeColor = q.answer === 'HARDWARE' ? C.coral : C.purple;
    roundedRect(doc, margin + 180, y + 3, 70, 14, 4, { fill: badgeColor });
    doc.fill(C.white).font('Helvetica-Bold').fontSize(8).text(q.answer, margin + 180, y + 5, { width: 70, align: 'center' });
    y += 22;
  });

  y += 30;

  // Homework Task
  roundedRect(doc, margin, y, contentW, 28, 8, { fill: C.amber });
  doc.fill(C.white).font('Helvetica-Bold').fontSize(12).text('Homework Task', margin + 14, y + 7);
  y += 38;

  doc.fill(C.textDark).font('Helvetica').fontSize(10.5).text('Ask your child to find 3 pieces of Hardware in your house, and name 3 pieces of Software (like apps on a phone or tablet). Have them explain why they are Hardware or Software.', margin, y, { width: contentW, lineGap: 4 });
  
  y += 50;

  // Next Session
  roundedRect(doc, margin, y, contentW, 65, 12, { fill: C.tealLight });
  doc.fill(C.tealDark).font('Helvetica-Bold').fontSize(14).text('Coming Up Next...', margin + 16, y + 12, { width: contentW - 32 });
  doc.fill(C.textDark).font('Helvetica').fontSize(11).text('In the next session, we will start exploring our first Programming Language and write our first code!', margin + 16, y + 34, { width: contentW - 32 });

  doc.fill(C.textGray).font('Helvetica').fontSize(8).text('Page 5', margin, footerY, { width: contentW, align: 'center' });

  doc.end();

  stream.on('finish', () => {
    console.log(`\n✅ PDF generated successfully!`);
    console.log(`📄 File: ${outputPath}`);
    console.log(`📏 Size: ${(fs.statSync(outputPath).size / 1024).toFixed(1)} KB`);
  });
}

generatePDF();
