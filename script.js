const newsCategories = {
  technology: { query: 'technology', container: 'technologyNews' },
  ai: { query: 'artificial intelligence OR AI', container: 'aiNews' },
  crypto: { query: 'crypto OR cryptocurrency', container: 'cryptoNews' },
  web3: { query: 'web3 OR blockchain', container: 'web3News' },
  textile: { query: 'textile engineering', container: 'textileNews' },
  fun: { query: 'entertainment OR gaming', container: 'funNews' }
};

function loadAllNews() {
  Object.values(newsCategories).forEach(({ query, container }) => {
    fetchNews(query, container);
  });
}

async function fetchNews(query, containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = '<div class="loading">Loading...</div>';

  try {
    const response = await fetch(`/api/news?q=${encodeURIComponent(query)}`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    
    const data = await response.json();
    displayNews(data.articles || [], containerId);
  } catch (err) {
    console.error(`Error loading ${containerId}:`, err);
    container.innerHTML = `
      <div class="error">
        Failed to load news. 
        <button onclick="fetchNews('${query}', '${containerId}')">Retry</button>
      </div>
    `;
  }
}

function displayNews(articles, containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = '';

  if (!articles.length) {
    container.innerHTML = '<div class="error">No news found</div>';
    return;
  }

  articles.forEach(article => {
    const card = document.createElement('a');
    card.className = 'news-card';
    card.href = article.url;
    card.target = '_blank';
    card.rel = 'noopener noreferrer';
    
    card.innerHTML = `
      <img src="${article.image || 'https://via.placeholder.com/400x200?text=No+Image'}" 
           alt="${article.title}" 
           onerror="this.src='https://via.placeholder.com/400x200?text=Image+Failed'">
      <h3>${article.title}</h3>
      ${article.description ? `<p>${article.description}</p>` : ''}
    `;
    
    container.appendChild(card);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  loadAllNews();
  
  const backToTop = document.querySelector('.back-to-top');
  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('visible', window.scrollY > 300);
  });
  
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});