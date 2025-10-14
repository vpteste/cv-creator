
import fetch from 'node-fetch';
import { URLSearchParams } from 'url';
import { kv } from '@vercel/kv';
import { createHash } from 'crypto';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  try {
    const { imageBase64, language = 'fre' } = req.body;

    if (!imageBase64) {
      return res.status(400).json({ error: 'No imageBase64 provided.' });
    }

    const imageHash = createHash('sha256').update(imageBase64).digest('hex');
    const cacheKey = `${imageHash}_${language}`;

    const cachedResult = await kv.get(cacheKey);
    if (cachedResult) {
      return res.status(200).json({ extractedText: cachedResult, fromCache: true });
    }

    const apiKey = process.env.OCR_SPACE_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'OCR API key is not configured on the server.' });
    }

    const params = new URLSearchParams();
    params.append('apikey', apiKey);
    params.append('base64Image', imageBase64);
    params.append('language', language);

    const ocrResponse = await fetch('https://api.ocr.space/parse/image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params,
    });

    const ocrData = await ocrResponse.json();

    if (!ocrResponse.ok || ocrData.IsErroredOnProcessing) {
      const errorMessage = Array.isArray(ocrData.ErrorMessage)
        ? ocrData.ErrorMessage.join(', ')
        : ocrData.ErrorMessage || 'An error occurred during OCR processing.';
      return res.status(500).json({ error: errorMessage });
    }

    if (!ocrData.ParsedResults || ocrData.ParsedResults.length === 0) {
      return res.status(404).json({ error: 'Could not extract text from the image.' });
    }

    const extractedText = ocrData.ParsedResults[0].ParsedText;

    await kv.set(cacheKey, extractedText, { ex: 60 * 60 * 24 * 30 });

    return res.status(200).json({ extractedText: extractedText, fromCache: false });

  } catch (error) {
    console.error('Error in Base64 OCR proxy:', error);
    return res.status(500).json({ error: 'Failed to process the request.' });
  }
}
