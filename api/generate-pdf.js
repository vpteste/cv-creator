const chromium = require('@sparticuz/chromium');
const puppeteer = require('puppeteer-core');

export default async function handler(request, response) {
  console.log('[PDF Generation] - Function invoked.');
  if (request.method !== 'POST') {
    console.log(`[PDF Generation] - Method Not Allowed: ${request.method}`);
    return response.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    console.log('[PDF Generation] - Reading HTML and CSS from request body.');
    const { html, css } = request.body;
    if (!html) {
      console.error('[PDF Generation] - Error: HTML content is required.');
      return response.status(400).json({ error: 'HTML content is required.' });
    }
    console.log('[PDF Generation] - HTML content received.');

    console.log('[PDF Generation] - Getting Chromium executable path...');
    const executablePath = await chromium.executablePath();
    console.log(`[PDF Generation] - Chromium executable path: ${executablePath}`);

    console.log('[PDF Generation] - Launching Puppeteer...');
    const browser = await puppeteer.launch({
      args: chromium.args,
      executablePath: executablePath,
      headless: chromium.headless,
    });
    console.log('[PDF Generation] - Puppeteer launched successfully.');

    console.log('[PDF Generation] - Creating new page...');
    const page = await browser.newPage();
    console.log('[PDF Generation] - New page created.');

    console.log('[PDF Generation] - Setting page content...');
    await page.setContent(html, { waitUntil: 'networkidle0' });
    console.log('[PDF Generation] - Page content set.');

    if (css) {
      console.log('[PDF Generation] - Injecting CSS...');
      await page.addStyleTag({ content: css });
      console.log('[PDF Generation] - CSS injected.');
    }

    console.log('[PDF Generation] - Waiting for final rendering (1s timeout)...');
    await page.waitForTimeout(1000);
    console.log('[PDF Generation] - Final rendering wait complete.');

    console.log('[PDF Generation] - Generating PDF buffer...');
    const pdf = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: '15mm', right: '15mm', bottom: '15mm', left: '15mm' },
    });
    console.log('[PDF Generation] - PDF buffer generated successfully.');

    console.log('[PDF Generation] - Closing browser...');
    await browser.close();
    console.log('[PDF Generation] - Browser closed.');

    console.log('[PDF Generation] - Sending PDF response to client.');
    response.setHeader('Content-Type', 'application/pdf');
    response.setHeader('Content-Disposition', 'attachment; filename=cv.pdf');
    return response.status(200).send(pdf);

  } catch (error) {
    console.error('--- PDF GENERATION FAILED ---');
    console.error('Error Message:', error.message);
    console.error('Full Error Object:', JSON.stringify(error, null, 2));
    return response.status(500).json({ error: `An error occurred during PDF generation. Check server logs for details. Message: ${error.message}` });
  }
}
