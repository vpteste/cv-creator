import fetch from 'node-fetch';
import FormData from 'form-data';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  const apiKey = process.env.REMOVEBG_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'API key for remove.bg is not configured.' });
  }

  try {
    const { image } = req.body; // image is a base64 string
    if (!image) {
      return res.status(400).json({ error: 'Image data is required.' });
    }

    // remove.bg expects the base64 data without the data URI prefix
    const base64Data = image.replace(/^data:image\/\w+;base64,/, "");

    const formData = new FormData();
    formData.append('image_file_b64', base64Data);
    formData.append('size', 'auto');

    const response = await fetch('https://api.remove.bg/v1/removebg', {
      method: 'POST',
      headers: {
        'X-Api-Key': apiKey,
      },
      body: formData,
    });

    if (!response.ok) {
      // Read the raw error response body as text
      const errorBody = await response.text();
      console.error('Raw error response from remove.bg:', errorBody);

      // Try to parse as JSON for a structured error, but fall back to raw text
      let errorMessage = 'Failed to process image with remove.bg';
      try {
        const errorData = JSON.parse(errorBody);
        errorMessage = errorData.errors?.[0]?.title || errorMessage;
      } catch (e) {
        // Response was not JSON, use a snippet of the raw text
        if (errorBody) {
          errorMessage = errorBody.substring(0, 200); // Return the first 200 chars of the error
        }
      }
      return res.status(response.status).json({ error: errorMessage });
    }

    // Stream the image data directly back to the client
    res.setHeader('Content-Type', response.headers.get('content-type'));
    response.body.pipe(res);

  } catch (error) {
    console.error('Error in remove-background proxy:', error);
    res.status(500).json({ error: 'Internal server error.', details: error.message });
  }
}