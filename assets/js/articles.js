async function buildArticles() {
			const response = await fetch('published-articles.json');
			if (!response.ok) {
				console.error("Failed to load articles.json");
				return;
			}

			const articles = await response.json();

			// Convert and sort by date
			articles.forEach(a => { a.date = a.date ? new Date(a.date) : null; });
			articles.sort((a, b) => {
				if (!a.date && !b.date) return 0;
				if (!a.date) return 1;
				if (!b.date) return -1;
				return b.date - a.date;
			});

			const container = document.querySelector(".posts");
			const filtersContainer = document.querySelector(".filters");
			container.innerHTML = "";
			filtersContainer.innerHTML = "";

			// Collect unique categories
			const allCategories = [...new Set(articles.map(a => a.categories?.toLowerCase().trim()).filter(Boolean))];

			// Build filter buttons
			const allBtn = document.createElement("button");
			allBtn.textContent = "All";
			allBtn.classList.add("active");
			allBtn.dataset.filter = "all";
			filtersContainer.appendChild(allBtn);

			allCategories.forEach(cat => {
				const btn = document.createElement("button");
				btn.textContent = cat.charAt(0).toUpperCase() + cat.slice(1);
				btn.dataset.filter = cat;
				filtersContainer.appendChild(btn);
			});

			// Render all articles
			articles.forEach(data => {
				const article = document.createElement("article");
				article.dataset.category = data.categories?.toLowerCase().trim() || "uncategorized";
				article.innerHTML = `
				<a href="${data.url}" target="_blank" class="image">
					<img src="${data.img || 'images/placeholder.jpg'}" alt="">
				</a>
				<h3><a href="${data.url}" target="_blank">${data.title || 'Untitled'}</a></h3>
				<p style="font-size: 0.85em; color: #888; margin-top: -0.5em;">
					${data.date ? data.website + ' • ' + new Date(data.date).toLocaleDateString('en-US', {
					year: 'numeric',
					month: 'short',
					day: 'numeric'
				}) : ''}
				</p>
				`;
				container.appendChild(article);
			});

			// Add filtering behavior
			const buttons = document.querySelectorAll(".filters button");
			const allArticles = document.querySelectorAll(".posts article");

			buttons.forEach(btn => {
				btn.addEventListener("click", () => {
					buttons.forEach(b => b.classList.remove("active"));
					btn.classList.add("active");
					const filter = btn.dataset.filter;

					allArticles.forEach(article => {
						const category = article.dataset.category;
						article.style.display = (filter === "all" || category === filter) ? "block" : "none";
					});
				});
			});
		}

		document.addEventListener('DOMContentLoaded', buildArticles);