const backToTopButton = document.querySelector('.back-to-top');

async function fetchNews(query, containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = `<div class="loading">Loading ${query} news...</div>`;

  try {
    const response = await fetch('/api/news', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ query, lang: 'en' })
    });

    if (!response.ok) throw new Error('Network response not ok');

    const data = await response.json();

    if (!data.results || data.results.length === 0) {
      container.innerHTML = `<div class="error">No news found for ${query}</div>`;
      return;
    }

    container.innerHTML = data.results.map(article => `
      <a href="${article.link}" target="_blank" rel="noopener noreferrer" class="news-card">
        <img src="${article.image_url || 'images/default-news.png'}" alt="${article.title}" />
        <h3>${article.title}</h3>
        <p>${article.description || 'No description available.'}</p>
        <span>Source: ${article.source_id || 'Unknown'}</span>
      </a>
    `).join('');

  } catch (error) {
    container.innerHTML = `<div class="error">Failed to load ${query} news. Try again later.</div>`;
    console.error(`Error fetching ${query} news:`, error);
  }
}


// Load news for all categories
const categories = [
  { query: 'technology', containerId: 'technologyNews' },
  { query: 'ai', containerId: 'aiNews' },
  { query: 'crypto', containerId: 'cryptoNews' },
  { query: 'web3', containerId: 'web3News' },
  { query: 'textile engineering', containerId: 'textileNews' },
  { query: 'fun', containerId: 'funNews' },
];

categories.forEach(cat => fetchNews(cat.query, cat.containerId));

// Back to top button logic
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTopButton.classList.add('visible');
  } else {
    backToTopButton.classList.remove('visible');
  }
});

backToTopButton.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});