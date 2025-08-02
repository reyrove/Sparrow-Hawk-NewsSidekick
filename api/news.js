const fetch = require('node-fetch');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { query, lang } = req.body;

    if (!query) {
      return res.status(400).json({ error: 'Missing query parameter' });
    }

    const apiKey = process.env.NEWS_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'API key not configured' });
    }

    const newsApiUrl = `https://api.thenewsapi.com/v1/news/all?api_token=${apiKey}&q=${encodeURIComponent(query)}&language=${lang || 'en'}`;

    const response = await fetch(newsApiUrl);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || 'Failed to fetch news');
    }

    const data = await response.json();

    return res.status(200).json(data);

  } catch (error) {
    console.error('News API Error:', error);
    return res.status(500).json({ error: error.message || 'Server error fetching news' });
  }
};
