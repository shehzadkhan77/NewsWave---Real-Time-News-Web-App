const apiKey = '26c40b8fa2a24dd6906ed4b2892e57d4';
const newsContainer = document.getElementById('news-container');

// Icons for news sources
const sourceIcons = {
    'Dawn News': 'fas fa-newspaper',
    'ARY News': 'fas fa-tv',
    'Geo News': 'fas fa-globe',
};

// Fetch news from multiple sources
async function fetchNews() {
    try {
        const sources = ['bbc-news', 'cnn', 'the-verge']; // Add more sources as needed
        const promises = sources.map(source =>
            fetch(`https://newsapi.org/v2/top-headlines?sources=${source}&apiKey=${apiKey}`)
                .then(response => response.json())
        );
        const results = await Promise.all(promises);
        const articles = results.flatMap(result => result.articles);
        displayNews(articles);
    } catch (error) {
        console.error('Error fetching news:', error);
    }
}

// Display news articles
function displayNews(articles) {
    newsContainer.innerHTML = '';
    articles.forEach(article => {
        const newsCard = document.createElement('div');
        newsCard.classList.add('news-card');

        const image = document.createElement('img');
        image.src = article.urlToImage || 'default-image.jpg';
        image.alt = article.title;

        const content = document.createElement('div');
        content.classList.add('news-card-content');

        const title = document.createElement('h3');
        title.textContent = article.title;

        const description = document.createElement('p');
        description.textContent = article.description || 'No description available.';

        const source = document.createElement('div');
        source.innerHTML = `<i class="${sourceIcons[article.source.name] || 'fas fa-newspaper'} source-icon"></i> ${article.source.name}`;

        const link = document.createElement('a');
        link.href = article.url;
        link.textContent = 'Read More';
        link.target = '_blank';

        content.appendChild(title);
        content.appendChild(description);
        content.appendChild(source);
        content.appendChild(link);

        newsCard.appendChild(image);
        newsCard.appendChild(content);

        newsContainer.appendChild(newsCard);
    });
}

// Fetch news every 5 minutes
fetchNews();
setInterval(fetchNews, 5 * 60 * 1000);