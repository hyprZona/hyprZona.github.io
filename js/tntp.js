// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Wait a small amount of time to ensure DOM is fully ready
    setTimeout(() => {
        initQuoteCarousel();
        initScrollAnimations();
        initCharacterCards();
        addGlitchEffects();
        initSectionNavigation();
        
        // Force a check for visible elements
        window.dispatchEvent(new Event('scroll'));
    }, 100);
});

// Quote Carousel Functionality
function initQuoteCarousel() {
    const quotes = document.querySelectorAll('.quote');
    let currentIndex = 0;
    
    // First quote is already active from HTML
    
    // Automatically cycle through quotes
    setInterval(() => {
        quotes[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % quotes.length;
        quotes[currentIndex].classList.add('active');
    }, 5000); // Change quote every 5 seconds
}

// Scroll Animations
function initScrollAnimations() {
    const elements = document.querySelectorAll('.section-header, .about-text, .structure-item, .character-card, .preview-container, .testimonial');
    
    elements.forEach(element => {
        // Remove any existing opacity setting
        element.style.removeProperty('opacity');
        element.classList.add('fade-in-ready');
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px'
    });
    
    elements.forEach(element => observer.observe(element));
}

// Character Card Interactions
function initCharacterCards() {
    const cards = document.querySelectorAll('.character-card');
    
    cards.forEach(card => {
        // Mouse hover effect
        card.addEventListener('mouseenter', function() {
            // Add a subtle glow effect based on character
            if (this.id === 'tom-card') {
                this.style.boxShadow = '0 0 15px rgba(0, 255, 255, 0.3)';
            } else if (this.id === 'tim-card') {
                this.style.boxShadow = '0 0 15px rgba(255, 0, 51, 0.3)';
            } else if (this.id === 'narrator-card') {
                this.style.boxShadow = '0 0 15px rgba(221, 170, 0, 0.3)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = '';
        });
        
        // Click for more info (placeholder for future functionality)
        card.addEventListener('click', function() {
            // Simple visual feedback
            this.classList.add('glitch-effect');
            
            // Remove after animation completes
            setTimeout(() => {
                this.classList.remove('glitch-effect');
            }, 500);
        });
    });
}

// Add Glitch Effects to Various Elements
function addGlitchEffects() {
    // Add glitch effect to specific elements
    const glitchElements = [
        document.querySelector('.title'),
        ...document.querySelectorAll('.character-card h3'),
        document.querySelector('.preview-container .file-tab')
    ];
    
    glitchElements.forEach(element => {
        if (element) {
            // Random glitch effect
            setInterval(() => {
                // Only trigger sometimes to make it seem random
                if (Math.random() < 0.05) { // 5% chance every interval
                    element.classList.add('glitch-effect');
                    
                    setTimeout(() => {
                        element.classList.remove('glitch-effect');
                    }, 200);
                }
            }, 2000);
        }
    });
}

// Parallax Effect for Background (subtle)
window.addEventListener('scroll', function() {
    const scrollPosition = window.pageYOffset;
    
    // Apply parallax effect to the hero background
    const heroElement = document.querySelector('.hero::before');
    if (heroElement) {
        heroElement.style.transform = `translateY(${scrollPosition * 0.4}px)`;
    }
});

// Easter Egg - Konami Code
// Up, Up, Down, Down, Left, Right, Left, Right, B, A
(() => {
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiCodePosition = 0;
    
    document.addEventListener('keydown', function(e) {
        // Get the key pressed
        const key = e.key.toLowerCase();
        
        // Check if the key matches the next key in the Konami code
        const requiredKey = konamiCode[konamiCodePosition].toLowerCase();
        
        if (key === requiredKey) {
            // Move to the next key in the sequence
            konamiCodePosition++;
            
            // If the full sequence is entered
            if (konamiCodePosition === konamiCode.length) {
                activateEasterEgg();
                konamiCodePosition = 0; // Reset position
            }
        } else {
            konamiCodePosition = 0; // Reset position if wrong key
        }
    });
    
    function activateEasterEgg() {
        // Create a matrix-like effect over the screen
        const container = document.createElement('div');
        container.style.position = 'fixed';
        container.style.top = '0';
        container.style.left = '0';
        container.style.width = '100vw';
        container.style.height = '100vh';
        container.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
        container.style.zIndex = '9999';
        container.style.display = 'flex';
        container.style.justifyContent = 'center';
        container.style.alignItems = 'center';
        container.style.flexDirection = 'column';
        container.style.color = 'var(--color-neon-cyan)';
        
        const message = document.createElement('h2');
        message.textContent = "THE TRUTH IS OUT THERE";
        message.style.fontFamily = 'Special Elite, cursive';
        message.style.letterSpacing = '3px';
        message.style.textShadow = '0 0 10px var(--color-neon-cyan)';
        
        const subMessage = document.createElement('p');
        subMessage.textContent = "Initiating Protocol T'N'T...";
        subMessage.style.marginTop = '1rem';
        
        container.appendChild(message);
        container.appendChild(subMessage);
        document.body.appendChild(container);
        
        // Remove after a few seconds
        setTimeout(() => {
            container.style.transition = 'opacity 1s ease';
            container.style.opacity = '0';
            
            setTimeout(() => {
                document.body.removeChild(container);
            }, 1000);
        }, 3000);
    }
})();

// Experimental: Text scramble effect (applied to certain elements)
class TextScramble {
    constructor(el) {
        this.el = el;
        this.chars = '!<>-_\\/[]{}—=+*^?#________';
        this.update = this.update.bind(this);
    }
    
    setText(newText) {
        const oldText = this.el.innerText;
        const length = Math.max(oldText.length, newText.length);
        const promise = new Promise((resolve) => this.resolve = resolve);
        this.queue = [];
        
        for (let i = 0; i < length; i++) {
            const from = oldText[i] || '';
            const to = newText[i] || '';
            const start = Math.floor(Math.random() * 40);
            const end = start + Math.floor(Math.random() * 40);
            this.queue.push({ from, to, start, end });
        }
        
        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
        return promise;
    }
    
    update() {
        let output = '';
        let complete = 0;
        
        for (let i = 0, n = this.queue.length; i < n; i++) {
            let { from, to, start, end, char } = this.queue[i];
            
            if (this.frame >= end) {
                complete++;
                output += to;
            } else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) {
                    char = this.randomChar();
                    this.queue[i].char = char;
                }
                output += `<span class="dud">${char}</span>`;
            } else {
                output += from;
            }
        }
        
        this.el.innerHTML = output;
        
        if (complete === this.queue.length) {
            this.resolve();
        } else {
            this.frameRequest = requestAnimationFrame(this.update);
            this.frame++;
        }
    }
    
    randomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
}

// Apply text scramble effect to the tagline
document.addEventListener('DOMContentLoaded', function() {
    const tagline = document.querySelector('.tagline');
    const originalText = tagline.innerText;
    
    // Apply effect when the element comes into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const scrambler = new TextScramble(tagline);
                scrambler.setText(originalText);
                observer.unobserve(tagline);
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(tagline);
});

function initSectionNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    let currentSection = '';

    // Click handling
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const sectionId = item.getAttribute('data-section');
            const section = document.getElementById(sectionId);
            
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Scroll spy
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                currentSection = entry.target.id;
                updateActiveNav();
            }
        });
    }, { threshold: 0.5 });

    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });

    function updateActiveNav() {
        navItems.forEach(item => {
            const sectionId = item.getAttribute('data-section');
            item.classList.toggle('active', sectionId === currentSection);
        });
    }
}