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

$(document).ready(function() {
  // Toggle the sidebar on mobile devices
  $('.navbar-toggle').on('click', function() {
    $('.sidebar').toggleClass('open');
  });

  // Expandable menu items
  $('.expandable').on('click', function() {
    $(this).find('.submenu').slideToggle();
    $(this).find('.expand-icon').toggleClass('rotated');
  });

  // News carousel settings
  $('.news-carousel').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    dots: true,
    arrows: false,
    adaptiveHeight: true,
  });

  // Open the modal when the button is clicked
  $('#playMazeBtn').on('click', function() {
    openModal();
  });

  // Close the modal when the <span> (x) is clicked
  $('.close').on('click', function() {
    closeModal();
  });

  // Close the modal when clicking outside of it
  $(window).on('click', function(event) {
    if ($(event.target).is('#mazeModal')) {
      closeModal();
    }
  });

  // Additional dynamic functionalities
  // Add more dynamic interactions here as needed
});
