const backToTopButton = document.querySelector('.back-to-top');

function fetchNews(query, containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = '<div class="loading">Loading...</div>';

  fetch(`/api/news?q=${encodeURIComponent(query)}`)
    .then(r => r.json())
    .then(data => displayNews(data.results || [], containerId))
    .catch(err => {
      console.error(`Error loading ${containerId}:`, err);
      container.innerHTML = '<div class="error">Failed to load news. Try again later.</div>';
    });
}

fetchNews('technology', 'technologyNews');
fetchNews('artificial intelligence OR AI', 'aiNews');
fetchNews('crypto', 'cryptoNews');
fetchNews('web3', 'web3News');
fetchNews('textile engineering', 'textileNews');
fetchNews('entertainment', 'funNews');

function displayNews(articles, containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = '';

  articles.forEach(article => {
    const link = document.createElement('a');
    link.href = article.link;
    link.target = '_blank';
    link.className = 'news-card';
    link.innerHTML = `
      <img src="${article.image_url || 'https://via.placeholder.com/300x180'}" alt="News image">
      <h3>${article.title}</h3>
    `;
    container.appendChild(link);
  });
}

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    backToTopButton.classList.add('visible');
  } else {
    backToTopButton.classList.remove('visible');
  }
});

backToTopButton.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});