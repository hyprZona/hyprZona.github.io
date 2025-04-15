document.addEventListener('DOMContentLoaded', () => {
    // Existing carousel functions
    function prevSlide(carouselId) {
        let carousel = document.getElementById(carouselId);
        carousel.appendChild(carousel.firstElementChild);
    }
    
    function nextSlide(carouselId) {
        let carousel = document.getElementById(carouselId);
        carousel.insertBefore(carousel.lastElementChild, carousel.firstElementChild);
    }

    // Section handling function
    function showSection(sectionId) {
        // Hide all sections first
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });

        // Show selected section
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            console.log(`Activating section: ${sectionId}`); // Debug log
            targetSection.classList.add('active');
            
            // Initialize specific sections
            if (sectionId === 'tnt-section') {
                // Ensure switchTNTVersion is available
                if (typeof window.switchTNTVersion === 'function') {
                    window.switchTNTVersion('original');
                }
            }
        }
    }

    // Add click handlers to all project cards
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = card.getAttribute('href')?.substring(1); // Get sectionId from href
            if (sectionId) {
                console.log(`Card clicked for section: ${sectionId}`); // Debug log
                showSection(sectionId);
            }
        });
    });

    // Make functions globally available
    window.prevSlide = prevSlide;
    window.nextSlide = nextSlide;
    window.showSection = showSection;
});