const navLinks = document.querySelectorAll('nav a');  // Declare navLinks outside the loop

navLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();  // Prevent default anchor link behavior
    const targetSection = this.getAttribute('href').replace('#', '');  // Remove leading '#' (optional)
    const targetElement = document.querySelector('#' + targetSection);  // Use ID selector

    // Smooth scroll animation with basic linear easing
    const scrollOptions = {
      behavior: "smooth",
      block: "start"
    };

    targetElement.scrollIntoView(scrollOptions);
  });
});
