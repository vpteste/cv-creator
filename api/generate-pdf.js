const chromium = require('@sparticuz/chromium');
const puppeteer = require('puppeteer-core');

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    return response.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const { html, css } = request.body;
    if (!html) {
      return response.status(400).json({ error: 'HTML content is required.' });
    }

    const browser = await puppeteer.launch({
      args: chromium.args,
      executablePath: await chromium.executablePath(),
      headless: chromium.headless,
    });

    const page = await browser.newPage();
    
    // Inject the HTML and CSS into the page
    await page.setContent(html, { waitUntil: 'networkidle0' });
    if (css) {
      await page.addStyleTag({ content: css });
    }

    // Wait for fonts or images if necessary
    await page.waitForTimeout(1000); // Give a second for any final rendering

    const pdf = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: '15mm', right: '15mm', bottom: '15mm', left: '15mm' },
    });

    await browser.close();

    response.setHeader('Content-Type', 'application/pdf');
    response.setHeader('Content-Disposition', 'attachment; filename=cv.pdf');
    return response.status(200).send(pdf);

  } catch (error) {
    console.error('Error generating PDF:', error);
    return response.status(500).json({ error: `An error occurred: ${error.message}` });
  }
}
