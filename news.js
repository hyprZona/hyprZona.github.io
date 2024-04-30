window.onload = function() {
    fetchNews();
};

function fetchNews() {
    fetch('news/')
    .then(response => response.text())
    .then(data => {
        const newsFiles = data.split('\n').filter(file => file.trim().endsWith('.txt'));
        generateNewsCards(newsFiles);
    })
    .catch(error => console.error('Error fetching news:', error));
}

function generateNewsCards(newsFiles) {
    const newsContainer = document.getElementById('newsContainer');

    newsFiles.forEach(newsFile => {
        fetch('news/' + newsFile)
        .then(response => response.text())
        .then(content => {
            const card = document.createElement('div');
            card.classList.add('news-card');

            const heading = document.createElement('h2');
            heading.textContent = newsFile.split('.')[0]; // Extract filename without extension

            const contentPreview = document.createElement('p');
            contentPreview.textContent = content.substring(0, 100) + '...'; // Display first 100 characters as preview

            const readMoreLink = document.createElement('a');
            readMoreLink.href = 'news/' + newsFile;
            readMoreLink.textContent = 'Read more';

            card.appendChild(heading);
            card.appendChild(contentPreview);
            card.appendChild(readMoreLink);

            newsContainer.appendChild(card);
        })
        .catch(error => console.error('Error fetching news content:', error));
    });
}
