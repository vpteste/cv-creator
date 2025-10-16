import fetch from 'node-fetch';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  const { tiktokUrl } = req.body;

  if (!tiktokUrl || !tiktokUrl.includes('tiktok.com')) {
    return res.status(400).json({ error: 'A valid TikTok URL is required.' });
  }

  const apiKey = process.env.TIKTOK_DOWNLOADER_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'TikTok API key is not configured on the server.' });
  }

  const url = `https://tiktok-video-downloader-api.p.rapidapi.com/media?videoUrl=${encodeURIComponent(tiktokUrl)}`;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': apiKey,
      'X-RapidAPI-Host': 'tiktok-video-downloader-api.p.rapidapi.com'
    }
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();

    if (!response.ok || data.status === 'error' || !data.downloadUrl) {
      throw new Error(data.message || 'Failed to download TikTok video.');
    }

    res.status(200).json({
      title: data.description || 'TikTok Video',
      downloadUrl: data.downloadUrl
    });

  } catch (error) {
    console.error('Error calling TikTok Downloader API:', error);
    res.status(500).json({ error: error.message || 'An internal server error occurred.' });
  }
}
