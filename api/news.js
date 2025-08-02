import fetch from 'node-fetch';

export default async (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  
  // Handle API key
  const apiKey = process.env.GNEWS_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'Server configuration error' });
  }

  try {
    const { q, max = '6' } = req.query;
    
    const url = `https://gnews.io/api/v4/search?q=${encodeURIComponent(q)}&token=${apiKey}&lang=en&max=${max}`;
    
    // Cache responses for 1 hour (Vercel Edge Cache)
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');
    
    const response = await fetch(url);
    if (!response.ok) throw new Error(`API error: ${response.status}`);
    
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('News API Error:', error);
    res.status(500).json({ 
      error: error.message || 'Failed to fetch news' 
    });
  }
};