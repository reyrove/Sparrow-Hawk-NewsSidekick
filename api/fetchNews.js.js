// /api/fetchNews.js
export default async function handler(req, res) {
  const { query } = req.query;
  const apiKey = process.env.GNEWS_API_KEY;

  if (!query) {
    res.status(400).json({ error: "Missing query parameter 'query'" });
    return;
  }

  if (!apiKey) {
    res.status(500).json({ error: "API key not configured" });
    return;
  }

  const url = `https://gnews.io/api/v4/search?q=${encodeURIComponent(query)}&token=${apiKey}&lang=en`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      const errorText = await response.text();
      res.status(response.status).json({ error: `Failed to fetch news: ${errorText}` });
      return;
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    console.error('API fetch error:', err);
    res.status(500).json({ error: "Internal server error" });
  }
}