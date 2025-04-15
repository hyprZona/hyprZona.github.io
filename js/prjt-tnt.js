document.addEventListener('DOMContentLoaded', () => {
    // Cache DOM elements
    const tntSection = document.getElementById('tnt-section');
    if (!tntSection) {
        console.error('TNT Section not found!');
        return;
    }

    // Debug log
    console.log('TNT Section initialized');

    let currentSlide = 0;

    // Section activation handler - simplified for expanded version only
    function handleSectionActivation() {
        if (tntSection.classList.contains('active')) {
            console.log('TNT Section activated');
            
            // Get expanded version and its slides
            const expandedVersion = tntSection.querySelector('.tnt-version.expanded');
            if (!expandedVersion) {
                console.error('Expanded version not found');
                return;
            }

            // Show expanded version
            expandedVersion.classList.add('active');
            
            // Reset carousel to first slide
            const slides = expandedVersion.querySelectorAll('.tnt-carousel-item');
            slides.forEach((slide, index) => {
                slide.classList.remove('active');
                if (index === 0) slide.classList.add('active');
            });
            currentSlide = 0;
            
            console.log('TNT Section initialized with expanded version');
        }
    }

    // Update navigation button listeners
    const prevBtn = tntSection.querySelector('.tnt-prev-btn');
    const nextBtn = tntSection.querySelector('.tnt-next-btn');

    if (prevBtn) {
        prevBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const slides = tntSection.querySelectorAll('.tnt-carousel-item');
            if (!slides.length) return;
            
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            slides[currentSlide].classList.add('active');
            
            console.log('Previous slide - new index:', currentSlide);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const slides = tntSection.querySelectorAll('.tnt-carousel-item');
            if (!slides.length) return;
            
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
            
            console.log('Next slide - new index:', currentSlide);
        });
    }

    // Close button functionality
    const closeButton = tntSection.querySelector('.section-close');
    if (closeButton) {
        closeButton.addEventListener('click', () => {
            tntSection.classList.remove('active');
        });
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!tntSection.classList.contains('active')) return;

        switch(e.key) {
            case 'ArrowLeft':
                if (prevBtn) prevBtn.click();
                break;
            case 'ArrowRight':
                if (nextBtn) nextBtn.click();
                break;
            case 'Escape':
                tntSection.classList.remove('active');
                break;
        }
    });

    // Mutation observer for class changes
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                handleSectionActivation();
            }
        });
    });

    observer.observe(tntSection, { 
        attributes: true,
        attributeFilter: ['class']
    });

    // Initial state check
    if (tntSection.classList.contains('active')) {
        handleSectionActivation();
    }
});