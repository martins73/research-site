/**
 * Generate CV PDF from the Jekyll-built cv-print page using Puppeteer.
 *
 * Usage: node generate-cv-pdf.js
 */

const puppeteer = require('puppeteer');
const { PDFDocument } = require('pdf-lib');
const http = require('http');
const fs = require('fs');
const path = require('path');

const SITE_DIR = path.resolve(__dirname, '../../_site');
const OUTPUT_PATH = path.resolve(__dirname, '../../assets/martin-gonzalez-cabello-cv.pdf');
const PORT = 8787;

function startServer(directory, port) {
  const mimeTypes = {
    '.html': 'text/html',
    '.css':  'text/css',
    '.js':   'application/javascript',
    '.woff2': 'font/woff2',
    '.woff': 'font/woff',
    '.png':  'image/png',
    '.jpg':  'image/jpeg',
    '.svg':  'image/svg+xml',
    '.pdf':  'application/pdf',
  };

  const server = http.createServer((req, res) => {
    let filePath = path.join(directory, req.url);
    if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
      filePath = path.join(filePath, 'index.html');
    }
    if (!fs.existsSync(filePath)) {
      res.writeHead(404);
      res.end('Not found');
      return;
    }
    const ext = path.extname(filePath);
    const contentType = mimeTypes[ext] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': contentType });
    fs.createReadStream(filePath).pipe(res);
  });

  return new Promise((resolve) => {
    server.listen(port, () => {
      console.log(`Serving ${directory} on http://localhost:${port}`);
      resolve(server);
    });
  });
}

async function generatePDF() {
  const printPagePath = path.join(SITE_DIR, 'cv-print', 'index.html');
  if (!fs.existsSync(printPagePath)) {
    console.error(`Error: ${printPagePath} not found.`);
    process.exit(1);
  }

  const server = await startServer(SITE_DIR, PORT);
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  try {
    const page = await browser.newPage();
    await page.goto(`http://localhost:${PORT}/cv-print/`, {
      waitUntil: 'networkidle0',
      timeout: 30000,
    });

    // 1. Set document title for the browser rendering process
    await page.evaluate(() => {
      document.title = "Martin Gonzalez Cabello";
    });

    await page.evaluateHandle('document.fonts.ready');

    await page.pdf({
      path: OUTPUT_PATH,
      format: 'Letter',
      margin: {
        top: '0.75in',
        right: '1in',
        bottom: '0.75in',
        left: '1in',
      },
      printBackground: false,
      displayHeaderFooter: true,
      headerTemplate: `
        <div style="width: 100%; font-size: 8px; text-align: right; padding-right: 1in; color: #4A4A4A; font-family: Palatino, Georgia, serif;">
          <span style="margin-right: 4px;">Martin Gonzalez Cabello</span>
        </div>
      `,
      footerTemplate: `
        <div style="width: 100%; font-size: 8px; text-align: center; color: #4A4A4A; font-family: Palatino, Georgia, serif;">
          <span class="pageNumber"></span>
        </div>
      `,
    });

    // 2. Set permanent PDF metadata using pdf-lib
    const pdfBytes = fs.readFileSync(OUTPUT_PATH);
    const pdfDoc = await PDFDocument.load(pdfBytes);
    
    // This title is what shows up in the PDF properties
    pdfDoc.setTitle('Martin Gonzalez Cabello - CV'); 
    pdfDoc.setAuthor('Martin Gonzalez Cabello');
    pdfDoc.setSubject('Curriculum Vitae');
    
    const savedBytes = await pdfDoc.save();
    fs.writeFileSync(OUTPUT_PATH, savedBytes);

    console.log(`PDF generated with metadata: ${OUTPUT_PATH}`);
  } finally {
    await browser.close();
    server.close();
  }
}

generatePDF().catch((err) => {
  console.error('PDF generation failed:', err);
  process.exit(1);
});
