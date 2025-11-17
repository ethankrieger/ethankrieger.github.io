fetch('video-game-quotes.json')
  .then(response => response.json())
  .then(quotes => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const { quote, author } = quotes[randomIndex];
    const quoteElement = document.getElementById('quote');
    quoteElement.textContent = `“${quote}” — ${author}`;
  })
  .catch(error => console.error('Error loading quotes:', error));
