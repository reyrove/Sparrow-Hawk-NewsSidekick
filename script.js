// Function to fetch news by query and container ID
function fetchNews(query, containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = '<div class="loading">Loading...</div>';

  // Call your own API route on Vercel
  const url = `/api/fetchNews?query=${encodeURIComponent(query)}`;

  fetch(url)
    .then(res => {
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      return res.json();
    })
    .then(data => {
      if (!data.articles || data.articles.length === 0) {
        container.innerHTML = '<div>No news found.</div>';
        return;
      }
      displayNews(data.articles, containerId);
    })
    .catch(err => {
      console.error(`Error loading ${containerId}:`, err);
      container.innerHTML = '<div class="error">Failed to load news. Try again later.</div>';
    });
}

// Function to display only title + image
function displayNews(articles, containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = '';

  articles.forEach(article => {
    const card = document.createElement('div');
    card.className = 'news-card';

    const imageUrl = article.image || 'https://via.placeholder.com/120x80?text=No+Image';

    card.innerHTML = `
      <img src="${imageUrl}" alt="News image">
      <a href="${article.url}" target="_blank" rel="noopener noreferrer">${article.title}</a>
    `;

    container.appendChild(card);
  });
}

// Example fetches, adjust as needed
fetchNews('technology', 'technologyNews');
fetchNews('artificial intelligence OR AI', 'aiNews');
fetchNews('crypto', 'cryptoNews');
fetchNews('web3', 'web3News');
fetchNews('textile engineering', 'textileNews');
fetchNews('entertainment', 'funNews');