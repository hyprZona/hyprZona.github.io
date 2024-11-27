// Enhanced script.js with improved animations and eerie effects

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all features
    initializeCarousels();
    initializeParallax();
    initializeFeatureCards();
    initializeEerieEffects();
    initializeAudioEffects();
});

const playButton = document.querySelector('.cta-button');

playButton.addEventListener('click', () => {
  // Trigger download or other action here
  window.location.href = '#download'; // Or use a specific download URL
});

// Enhanced carousel functionality with smooth transitions
function initializeCarousels() {
    const carousels = {
        gameplay: {
            container: document.querySelector('.gameplay-carousel .carousel-container'),
            slides: document.querySelectorAll('.gameplay-carousel .carousel-slide'),
            prevBtn: document.querySelector('.gameplay-carousel .prev'),
            nextBtn: document.querySelector('.gameplay-carousel .next'),
            currentIndex: 0,
            autoPlayInterval: 6000,
            isHovered: false
        },
        reviews: {
            container: document.querySelector('.review-container'),
            slides: document.querySelectorAll('.review-slide'),
            currentIndex: 0,
            autoPlayInterval: 5000,
            isHovered: false
        }
    };

    // Initialize each carousel
    Object.values(carousels).forEach(carousel => {
        if (!carousel.container) return;

        // Add transition property
        carousel.container.style.transition = 'transform 0.8s cubic-bezier(0.645, 0.045, 0.355, 1.000)';

        // Pause on hover
        carousel.container.addEventListener('mouseenter', () => {
            carousel.isHovered = true;
        });

        carousel.container.addEventListener('mouseleave', () => {
            carousel.isHovered = false;
        });

        // Auto-play functionality
        setInterval(() => {
            if (!carousel.isHovered) {
                moveCarousel(carousel, 'next');
            }
        }, carousel.autoPlayInterval);
    });

    // Set up gameplay carousel controls
    if (carousels.gameplay.prevBtn && carousels.gameplay.nextBtn) {
        carousels.gameplay.prevBtn.addEventListener('click', () => {
            moveCarousel(carousels.gameplay, 'prev');
        });

        carousels.gameplay.nextBtn.addEventListener('click', () => {
            moveCarousel(carousels.gameplay, 'next');
        });
    }

    // Enhanced touch support
    Object.values(carousels).forEach(carousel => {
        addEnhancedTouchSupport(carousel);
    });
}

// Improved carousel movement with acceleration
function moveCarousel(carousel, direction) {
    if (!carousel.container || !carousel.slides.length) return;

    const slideWidth = carousel.slides[0].offsetWidth;
    const slidesCount = carousel.slides.length;

    // Update index with wrapping
    if (direction === 'next') {
        carousel.currentIndex = (carousel.currentIndex + 1) % slidesCount;
    } else {
        carousel.currentIndex = (carousel.currentIndex - 1 + slidesCount) % slidesCount;
    }

    // Apply transform with easing
    const transform = `translateX(-${carousel.currentIndex * slideWidth}px)`;
    carousel.container.style.transform = transform;

    // Add eerie effect on slide change
    createEerieTransitionEffect();
}

// Enhanced touch support with improved sensitivity
function addEnhancedTouchSupport(carousel) {
    let startX, moveX, startTime;
    const threshold = 50; // Reduced threshold for better responsiveness
    const timeThreshold = 300; // Maximum time for swipe in ms

    carousel.container.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        startTime = Date.now();
        carousel.container.style.transition = 'none'; // Disable transition during touch
    });

    carousel.container.addEventListener('touchmove', (e) => {
        moveX = e.touches[0].clientX;
        const diff = moveX - startX;
        
        // Add immediate feedback during swipe
        carousel.container.style.transform = `translateX(${diff}px)`;
    });

    carousel.container.addEventListener('touchend', () => {
        const endTime = Date.now();
        const timeElapsed = endTime - startTime;
        
        // Restore transition
        carousel.container.style.transition = 'transform 0.8s cubic-bezier(0.645, 0.045, 0.355, 1.000)';

        if (timeElapsed <= timeThreshold) {
            if (startX - moveX > threshold) {
                moveCarousel(carousel, 'next');
            } else if (moveX - startX > threshold) {
                moveCarousel(carousel, 'prev');
            }
        }
    });
}

// Enhanced parallax effect with depth layers
function initializeParallax() {
    const hero = document.querySelector('.hero-section');
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        if (hero) {
            hero.style.backgroundPositionY = `${scrolled * 0.5}px`;
        }

        // Multi-layer parallax effect
        parallaxElements.forEach(element => {
            const speed = element.dataset.parallax || 0.2;
            const reverseDirection = element.dataset.parallaxReverse === 'true';
            const offset = reverseDirection ? -scrolled * speed : scrolled * speed;
            element.style.transform = `translateY(${offset}px)`;
        });
    });
}

// Improved feature card animations with stagger effect
function initializeFeatureCards() {
    const cards = document.querySelectorAll('.feature-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add stagger delay based on index
                setTimeout(() => {
                    entry.target.classList.add('feature-card-visible');
                    createEerieGlowEffect(entry.target);
                }, index * 150);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '50px'
    });

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px) scale(0.95)';
        observer.observe(card);
    });
}

// New: Eerie ambient effects
function initializeEerieEffects() {
    // Create floating particles
    createFloatingParticles();
    
    // Add random glitch effects
    setInterval(() => {
        if (Math.random() < 0.1) { // 10% chance every interval
            createGlitchEffect();
        }
    }, 3000);
}

// New: Audio effects system
function initializeAudioEffects() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    // Hover sound effect
    function createHoverSound() {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(440, audioContext.currentTime);
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.start();
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        
        setTimeout(() => oscillator.stop(), 100);
    }

    // Add hover sound to interactive elements
    document.querySelectorAll('a, button, .feature-card').forEach(element => {
        element.addEventListener('mouseenter', () => {
            createHoverSound();
        });
    });
}

// Utility: Create eerie glow effect
function createEerieGlowEffect(element) {
    const glow = document.createElement('div');
    glow.classList.add('eerie-glow');
    element.appendChild(glow);
    
    setTimeout(() => glow.remove(), 1000);
}

// Utility: Create glitch effect
function createGlitchEffect() {
    const glitch = document.createElement('div');
    glitch.classList.add('glitch-effect');
    document.body.appendChild(glitch);
    
    setTimeout(() => glitch.remove(), 150);
}

// Utility: Create floating particles
function createFloatingParticles() {
    const particleContainer = document.createElement('div');
    particleContainer.classList.add('particle-container');
    document.body.appendChild(particleContainer);

    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.classList.add('floating-particle');
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.animationDelay = `${Math.random() * 5}s`;
        particleContainer.appendChild(particle);
    }
}

// Utility: Create eerie transition effect
function createEerieTransitionEffect() {
    const effect = document.createElement('div');
    effect.classList.add('eerie-transition');
    document.body.appendChild(effect);
    
    setTimeout(() => effect.remove(), 800);
}

// Handle loading states with enhanced transition
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    createEerieTransitionEffect();
});

// Enhanced image preloading with loading animation
function preloadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                const loadingOverlay = document.createElement('div');
                loadingOverlay.classList.add('image-loading-overlay');
                img.parentNode.appendChild(loadingOverlay);

                const tempImage = new Image();
                tempImage.src = img.dataset.src;
                
                tempImage.onload = () => {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    loadingOverlay.remove();
                    imageObserver.unobserve(img);
                };
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Initialize preloading
preloadImages();