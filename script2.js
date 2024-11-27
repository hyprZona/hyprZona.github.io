// Smooth Scrolling for Navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Mobile Navigation Toggle
function toggleMobileMenu() {
    const navMenu = document.querySelector('nav ul');
    const menuToggle = document.querySelector('.menu-toggle');
    
    navMenu.classList.toggle('active');
    menuToggle.classList.toggle('active');
}

// Intersection Observer for Animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const fadeInObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Apply fade-in animation to sections
const fadeInElements = document.querySelectorAll('.hero-section, .about-section, .music-section, .contact-section');
fadeInElements.forEach(element => {
    fadeInObserver.observe(element);
});

// Background Parallax Effect
function parallaxEffect() {
    const heroSection = document.querySelector('.hero-section');
    let scrollPosition = window.pageYOffset;
    
    heroSection.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
}

// Streaming Links Interaction
function setupStreamingLinks() {
    const streamingLinks = document.querySelectorAll('.platform-link');
    
    streamingLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.backgroundColor = 'var(--accent-color)';
            this.style.color = 'var(--dark-bg)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.backgroundColor = 'transparent';
            this.style.color = 'var(--text-primary)';
        });
    });
}

// Social Media Links Tracking
function trackSocialMediaClicks() {
    const socialLinks = document.querySelectorAll('.social-icon');
    
    socialLinks.forEach(link => {
        link.addEventListener('click', function() {
            // In a real-world scenario, you'd integrate with analytics
            console.log(`Social link clicked: ${this.href}`);
        });
    });
}

// Initialize Event Listeners
function initializeEventListeners() {
    window.addEventListener('scroll', parallaxEffect);
    setupStreamingLinks();
    trackSocialMediaClicks();
}

// Dynamic Year in Footer
function updateCopyrightYear() {
    const yearElement = document.querySelector('footer p');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.innerHTML = `&copy; ${currentYear} hyprNoise | Fading Ashes by hyprZona`;
    }
}

// Page Load Initialization
document.addEventListener('DOMContentLoaded', () => {
    initializeEventListeners();
    updateCopyrightYear();
});

// Optional: Add custom video modal functionality
function setupVideoModal() {
    const videoTriggers = document.querySelectorAll('.video-trigger');
    const videoModal = document.createElement('div');
    videoModal.classList.add('video-modal');
    videoModal.innerHTML = `
        <div class="video-container">
            <span class="close-modal">&times;</span>
            <iframe src="" frameborder="0" allowfullscreen></iframe>
        </div>
    `;
    document.body.appendChild(videoModal);

    videoTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            const videoSrc = trigger.getAttribute('data-video-src');
            const iframe = videoModal.querySelector('iframe');
            iframe.src = videoSrc;
            videoModal.classList.add('active');
        });
    });

    videoModal.querySelector('.close-modal').addEventListener('click', () => {
        const iframe = videoModal.querySelector('iframe');
        iframe.src = '';
        videoModal.classList.remove('active');
    });
}

// Error Tracking (placeholder for actual implementation)
window.addEventListener('error', (event) => {
    console.error('An error occurred:', event.error);
    // In a production environment, you would send this to an error tracking service
});

// Add to existing JavaScript

// Enhanced Mobile Menu Toggle
function toggleMobileMenu() {
    const navMenu = document.querySelector('nav ul');
    const menuToggle = document.querySelector('.menu-toggle');
    const isActive = navMenu.classList.toggle('active');
    
    menuToggle.setAttribute('aria-expanded', isActive);
    menuToggle.setAttribute('aria-label', isActive ? 'Close Menu' : 'Open Menu');
}

// Share Page Functionality
function shareContent() {
    if (navigator.share) {
        navigator.share({
            title: 'Fading Ashes by hyprZona',
            text: 'Check out this amazing music project!',
            url: window.location.href
        }).catch(console.error);
    } else {
        // Fallback for browsers that don't support Web Share API
        const tempInput = document.createElement('input');
        tempInput.value = window.location.href;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        alert('Link copied to clipboard!');
    }
}

// Preload YouTube Videos for Performance
function preloadYouTubeVideos() {
    const iframes = document.querySelectorAll('iframe');
    iframes.forEach(iframe => {
        iframe.setAttribute('loading', 'lazy');
    });
}

// Performance Monitoring
function logPagePerformance() {
    if (performance) {
        const {loadEventEnd, navigationStart} = performance.timing;
        console.log(`Page load time: ${loadEventEnd - navigationStart}ms`);
    }
}

// Add to DOMContentLoaded event
document.addEventListener('DOMContentLoaded', () => {
    initializeEventListeners();
    updateCopyrightYear();
    preloadYouTubeVideos();
    logPagePerformance();

    // Add keyboard navigation support
    document.querySelectorAll('a').forEach(link => {
        link.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                link.click();
            }
        });
    });
});