(function() {
  const cards = [...document.querySelectorAll('.display-card.article')];
  if (!cards.length) {
    console.log('⚠️ No articles found. Scroll down fully, then run again.');
    return;
  }

  const articles = cards.map(card => {
    const linkEl = card.querySelector('a.dc-img-link');
    const titleEl = card.querySelector('.display-card-title a');
    const dateEl = card.querySelector('.display-card-date');
    const excerptEl = card.querySelector('.display-card-excerpt');
    const imgEl = card.querySelector('img[data-img-url]');
    
    const url = linkEl ? new URL(linkEl.getAttribute('href'), window.location.origin).href : '';
    const title = titleEl ? titleEl.textContent.trim() : '';
    const date = dateEl ? dateEl.textContent.trim() : '';
    const excerpt = excerptEl ? excerptEl.textContent.trim() : '';
    const img = imgEl ? imgEl.getAttribute('data-img-url') : '';

    return { title, url, date, excerpt, img };
  });

  console.table(articles);
  copy(JSON.stringify(articles, null, 2));
  alert(`✅ Copied ${articles.length} article links to clipboard!`);
})();