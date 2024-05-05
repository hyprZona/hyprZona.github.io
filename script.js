// Get the modal
  var modal = document.getElementById("mazeModal");

  // Get the button that opens the modal
  var btn = document.getElementById("playMazeBtn");

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];

  // When the user clicks the button, open the modal 
  function openModal() {
   modal.style.display = "block";
  }

  // When the user clicks on <span> (x), close the modal
  function closeModal() {
   modal.style.display = "none";
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
   if (event.target == modal) {
    modal.style.display = "none";
   }
  }

// Define a function to create cards for each news item
function createNewsCards() {
  const newsContainer = document.getElementById('news-container');

  // Define news data for the first news item (you can add more as needed)
  const newsData = [
    {
      title: "HyprZona Launch",
      postedAt: "May 01, 2024",
      content: "We're glad to start HyprZona, and .....",
      modifiedAt: "May 01, 2024",
      link: "news/thankyou.html"
    },
    {
      title: "The T'N'T: Prologue Preview",
      postedAt: "May 03, 2024",
      content: "We're happy to announce that .....",
      modifiedAt: "May 03, 2024",
      link: "news/tntprev.html"
    }
  ];

  // Iterate through each news item and create a card
  newsData.forEach(newsItem => {
    const card = document.createElement('div');
    card.classList.add('news-card');

    const header = document.createElement('div');
    header.classList.add('news-header');
    header.innerHTML = `<h2>${newsItem.title}</h2><p>Posted at: ${newsItem.postedAt}</p>`;

    const body = document.createElement('div');
    body.classList.add('news-body');
    body.innerHTML = `<p>${newsItem.content}</p>`;

    const footer = document.createElement('div');
    footer.classList.add('news-footer');
    footer.innerHTML = `<p>Modified at: ${newsItem.modifiedAt}</p>`;

    card.appendChild(header);
    card.appendChild(body);
    card.appendChild(footer);

    // Create an anchor element to link to the news page
    const link = document.createElement('a');
    link.href = newsItem.link;
    link.classList.add('card-link');
    link.appendChild(card);

    // Append the card to the news container
    newsContainer.appendChild(link);
  });
}

// Call the createNewsCards function when the window loads
window.onload = createNewsCards;