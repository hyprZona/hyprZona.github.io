// Select all navigation links
const navLinks = document.querySelectorAll('nav a');

navLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();  // Prevent default anchor link behavior (jumping)

    const targetSection = this.getAttribute('href');
    const targetElement = document.querySelector(targetSection);

    // Smooth scroll animation with basic linear easing
    const scrollOptions = {
      behavior: "smooth",
      block: "start"
    };

    targetElement.scrollIntoView(scrollOptions);
  });
});
