import CloudConvert from 'cloudconvert';
import fs from 'fs';
import formidable from 'formidable';

import { kv } from '@vercel/kv';

// This is a Vercel specific configuration to disable body parsing,
// allowing formidable to handle the raw stream.
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  // Rate Limiting Logic (5 requests per hour per IP)
  try {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    if (!ip) {
      return res.status(400).json({ error: 'Could not identify your address.' });
    }

    const RATE_LIMIT_COUNT = 5; // Max requests
    const RATE_LIMIT_DURATION = 3600; // 1 hour in seconds

    const key = `rate_limit_pdf_converter_${ip.replace(/[:.]/g, '_')}`;
    const data = await kv.get(key);
    const now = Date.now();

    let currentRequestData = data || { count: 0, lastRequest: now };

    if ((now - currentRequestData.lastRequest) / 1000 > RATE_LIMIT_DURATION) {
      currentRequestData = { count: 0, lastRequest: now };
    }

    if (currentRequestData.count >= RATE_LIMIT_COUNT) {
      return res.status(429).json({ error: 'Vous avez atteint la limite de 5 conversions par heure. Veuillez réessayer plus tard.' });
    }
    
    await kv.set(key, { ...currentRequestData, count: currentRequestData.count + 1 }, { ex: RATE_LIMIT_DURATION });

  } catch (error) {
    console.error('Rate limiting error:', error);
    return res.status(500).json({ error: 'Could not process your request due to a server issue.' });
  }

  // 1. Check for API Key
  const apiKey = process.env.CLOUDCONVERT_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'CloudConvert API key is not configured.' });
  }

  // Initialize CloudConvert - using sandbox if the env var is set to 'true'
  const cloudConvert = new CloudConvert(apiKey, process.env.CLOUDCONVERT_SANDBOX === 'true');

  // 2. Parse the incoming form data (the PDF file)
  const form = formidable({});
  try {
    const [fields, files] = await form.parse(req);
    const file = files.file?.[0];

    if (!file) {
      return res.status(400).json({ error: 'No file uploaded.' });
    }

    // 3. Create CloudConvert Job
    let job = await cloudConvert.jobs.create({
      tasks: {
        'import-pdf': {
          operation: 'import/upload',
        },
        'convert-to-docx': {
          operation: 'convert',
          input: 'import-pdf',
          output_format: 'docx'
        },
        'export-file': {
          operation: 'export/url',
          input: 'convert-to-docx',
          inline: false, // false creates a persistent URL for the file
        },
      },
      tag: 'pdf-to-docx-conversion',
    });

    // 4. Upload the file
    const uploadTask = job.tasks.find(task => task.name === 'import-pdf');
    await cloudConvert.tasks.upload(uploadTask, fs.createReadStream(file.filepath), file.originalFilename);

    // 5. Wait for the job to finish
    job = await cloudConvert.jobs.wait(job.id);

    if (job.status === 'error') {
      const failedTask = job.tasks.find(task => task.status === 'error');
      const errorMessage = failedTask?.message || 'A task failed during conversion.';
      throw new Error(`Conversion failed: ${errorMessage}`);
    }

    // 6. Get the download URL from the export task
    const exportTask = job.tasks.find(task => task.name === 'export-file');
    const result = exportTask.result;
    const downloadUrl = result.files[0].url;

    // 7. Send the download URL back to the client
    res.status(200).json({ downloadUrl });

  } catch (error) {
    console.error('Error during CloudConvert process:', error);
    if (error.response) {
      console.error('Error response body:', error.response.body);
    }
    res.status(500).json({ error: 'An error occurred during the file conversion process.', details: error.message });
  }
}
