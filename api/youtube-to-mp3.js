import fetch from 'node-fetch';
import ytdl from 'ytdl-core';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  const { youtubeUrl } = req.body;

  if (!youtubeUrl || !ytdl.validateURL(youtubeUrl)) {
    return res.status(400).json({ error: 'A valid YouTube URL is required.' });
  }

  const apiKey = process.env.YOUTUBE_CONVERTER_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'API key is not configured on the server.' });
  }

  try {
    const videoId = ytdl.getVideoID(youtubeUrl);
    const url = `https://youtube-mp36.p.rapidapi.com/dl?id=${videoId}`;

    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': apiKey,
        'X-RapidAPI-Host': 'youtube-mp36.p.rapidapi.com'
      }
    };

    const response = await fetch(url, options);
    const data = await response.json();

    if (!response.ok || data.status === 'fail') {
      throw new Error(data.msg || 'Failed to convert video. The service may be down or the video is restricted.');
    }

    // The API response contains `link` and `title`
    res.status(200).json({
      title: data.title,
      downloadUrl: data.link
    });

  } catch (error) {
    console.error('Error calling YouTube to MP3 API:', error);
    res.status(500).json({ error: error.message || 'An internal server error occurred.' });
  }
}
