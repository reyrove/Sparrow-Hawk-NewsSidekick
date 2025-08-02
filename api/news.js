import fetch from 'node-fetch';

export default async function handler(req, res) {
  const { q = 'technology', lang = 'en' } = req.query;
  const apiKey = process.env.NEWS_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'API key missing' });
  }

  const url = `https://newsdata.io/api/1/news?apikey=${apiKey}&q=${encodeURIComponent(q)}&language=${lang}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Serverless fetch failed:', error);
    res.status(500).json({ error: 'Failed to fetch news' });
  }
}