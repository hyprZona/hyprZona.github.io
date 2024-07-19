// Navbar toggle script for responsive design
const navbarToggle = document.querySelector('.navbar-toggle');
const sidebar = document.querySelector('.sidebar');

navbarToggle.addEventListener('click', () => {
  sidebar.classList.toggle('open');
});

// Open Modal
function openModal() {
  document.getElementById("mazeModal").style.display = "block";
}

// Close Modal
function closeModal() {
  document.getElementById("mazeModal").style.display = "none";
}

// Close Modal if clicked outside of the content
window.onclick = function(event) {
  var modal = document.getElementById("mazeModal");
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// Show alert for noob choice
function showNoobAlert() {
  alert("Noob!");
}

function toggleBookInfo() {
  const fullDescription = document.querySelector('.book-info-container .full-description');
  const expandIcon = document.querySelector('.book-info-container .expand-icon');
  const shortDescription = document.querySelector('.short-description');

  if (fullDescription.classList.contains('hidden')) {
    fullDescription.classList.remove('hidden');
    expandIcon.textContent = 'Show Less';
    shortDescription.classList.add('hidden');
  } else {
    fullDescription.classList.add('hidden');
    expandIcon.textContent = 'Show More';
    shortDescription.classList.remove('hidden');
  }
}

function toggleGameInfo(gameId) {
  const gameSection = document.querySelector(`.${gameId.toLowerCase()}-section`);
  const gameDetails = gameSection.querySelector('.game-details');
  const gameSummary = gameSection.querySelector('.game-summary');
  const gameScreenshots = gameSection.querySelectorAll('.game-section')[0];
  const gameTrailers = gameSection.querySelectorAll('.game-section')[1];
  const expandIcon = gameSection.querySelector('.expand-icon');

  if (gameDetails.classList.contains('hidden')) {
    gameDetails.classList.remove('hidden');
    gameSummary.classList.remove('hidden');
    gameScreenshots.classList.remove('hidden');
    gameTrailers.classList.remove('hidden');
    expandIcon.textContent = 'Show Less';
  } else {
    gameDetails.classList.add('hidden');
    gameSummary.classList.add('hidden');
    gameScreenshots.classList.add('hidden');
    gameTrailers.classList.add('hidden');
    expandIcon.textContent = 'Show More';
  }
}

// Function to calculate age
function calculateAge(birthDate) {
  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  let months = today.getMonth() - birth.getMonth();

  if (months < 0 || (months === 0 && today.getDate() < birth.getDate())) {
    age--;
    months += 12;
  }

  return `${age} (${months} months)`;
}

// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function() {
  // Set the calculated age in the span
  document.getElementById('age').innerText = calculateAge('2007-12-17');

  // Handle expandable sections
  document.querySelectorAll('.expandable-section h2').forEach(section => {
    section.addEventListener('click', () => {
      section.parentElement.classList.toggle('open');
    });
  });
});

// Slick Carousel Initialization
$(document).ready(function(){
  $('.news-carousel').slick({
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000
  });
});
