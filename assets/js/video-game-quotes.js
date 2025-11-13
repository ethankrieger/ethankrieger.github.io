fetch('video-game-quotes.json')
    .then(response => response.json())
    .then(quotes => {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      const quoteElement = document.getElementById('quote');
      quoteElement.textContent = quotes[randomIndex].quote;
    })
    .catch(error => console.error('Error loading quotes:', error));