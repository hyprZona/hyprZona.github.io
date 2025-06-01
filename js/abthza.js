// Wait for DOM to be loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    AOS.init({
        duration: 800,
        easing: 'ease-out',
        once: false
    });

    // Initialize Typed.js for mission text
    new Typed('#mission-text', {
        strings: [
  'Loading system parameters...',
  'Initializing reality distortion...',
  'hyprZona is a multimedia chaos engine. ^500\nWe make games, stories, and brain-melting soundtracks that challenge the digital status quo.^1000',
  'We\'re here to resurrect the art of fun, madness, and meaning—^500all wrapped in satire, style, and just enough emotional trauma.',
  'hyprZona doesn\'t chase trends. We burn them. ^300\nIf it doesn\'t break brains or bend reality, we don\'t ship it.',
  'Built for misfits, overthinkers, and Gen-Z rebels tired of the fake-deep, RTX-fueled mediocrity.',
  'This isn\'t content. This is chaos with a cause.'
],
        typeSpeed: 40,
        backSpeed: 30,
        backDelay: 1000,
        startDelay: 1000,
        showCursor: true,
        cursorChar: '_',
        loop: false
    });

    // Glitch effect for text elements
    const glitchTexts = document.querySelectorAll('.glitch-text');
    glitchTexts.forEach(text => {
        // Create data-text attribute for glitch effect
        text.setAttribute('data-text', text.textContent);
        
        // Add random glitch effect
        setInterval(() => {
            if (Math.random() > 0.9) {
                addGlitchEffect(text);
            }
        }, 3000);
    });

    // Mini glitch effect for smaller text elements
    const miniGlitchTexts = document.querySelectorAll('.glitch-text-mini');
    miniGlitchTexts.forEach(text => {
        text.setAttribute('data-text', text.textContent);
    });

    // Terminal typing effect for origin story
    const terminalContent = document.querySelector('.terminal-scrollable');
    if (terminalContent) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('terminal-reveal');
                    typeTerminalText();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        observer.observe(terminalContent);
    }

    // Handle timeline scroll effects
    const timelineContainer = document.querySelector('.timeline-container');
    if (timelineContainer) {
        initializeTimelineEffects();
    }

    // Initialize hover effects for pillars
    const pillars = document.querySelectorAll('.pillar');
    pillars.forEach(pillar => {
        pillar.addEventListener('mouseenter', () => {
            addHoverGlitch(pillar);
        });
    });

    // CTA button effects
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        initializeCtaEffects(ctaButton);
    }

    // Initialize section navigation FIRST - before setting up observers
    initializeSectionNavigation();

    // Section Navigation - Click handlers and scroll spy
    const navItems = document.querySelectorAll('.section-navigator li');
    const sections = document.querySelectorAll('.section');
    
    // Click navigation
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const targetId = item.getAttribute('data-section');
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                // Remove active class from all sections and nav items
                sections.forEach(s => s.classList.remove('active'));
                navItems.forEach(n => n.classList.remove('active'));
                
                // Add active class to target section and nav item
                targetSection.classList.add('active');
                item.classList.add('active');
                
                // Update URL hash
                history.pushState(null, null, `#${targetId}`);
            }
        });
    });
    
    // Scroll spy for automatic navigation highlighting
    const observerOptions = {
        root: null,
        rootMargin: '-50% 0px',
        threshold: 0
    };
    
    const observerCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const activeItem = document.querySelector(
                    `.section-navigator li[data-section="${entry.target.id}"]`
                );
                if (activeItem) {
                    document.querySelectorAll('.section-navigator li').forEach(
                        item => item.classList.remove('active')
                    );
                    activeItem.classList.add('active');
                }
            }
        });
    };
    
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach(section => observer.observe(section));
});

// Glitch effect function
function addGlitchEffect(element) {
    const originalText = element.textContent;
    const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    
    let glitchText = '';
    for (let i = 0; i < originalText.length; i++) {
        if (Math.random() > 0.8) {
            glitchText += glitchChars[Math.floor(Math.random() * glitchChars.length)];
        } else {
            glitchText += originalText[i];
        }
    }
    
    element.textContent = glitchText;
    setTimeout(() => {
        element.textContent = originalText;
    }, 100);
}

// Terminal typing effect
function typeTerminalText() {
    const terminalLines = document.querySelectorAll('.terminal-line');
    let delay = 0;
    
    terminalLines.forEach((line, index) => {
        const text = line.textContent;
        line.textContent = '';
        
        setTimeout(() => {
            let charIndex = 0;
            const interval = setInterval(() => {
                if (charIndex < text.length) {
                    line.textContent += text[charIndex];
                    charIndex++;
                } else {
                    clearInterval(interval);
                }
            }, 20);
        }, delay);
        
        delay += text.length * 20 + 500;
    });
}

// Timeline effects
function initializeTimelineEffects() {
    const timelineDots = document.querySelectorAll('.timeline-dot');
    
    timelineDots.forEach(dot => {
        dot.addEventListener('mouseenter', () => {
            gsap.to(dot, {
                scale: 1.5,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        dot.addEventListener('mouseleave', () => {
            gsap.to(dot, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.in'
            });
        });
    });
}

// Hover glitch effect for pillars
function addHoverGlitch(element) {
    const glitchColors = ['var(--neon-cyan)', 'var(--neon-red)'];
    const originalColor = window.getComputedStyle(element).borderColor;
    
    let colorIndex = 0;
    const interval = setInterval(() => {
        element.style.borderColor = glitchColors[colorIndex];
        colorIndex = (colorIndex + 1) % glitchColors.length;
    }, 100);
    
    setTimeout(() => {
        clearInterval(interval);
        element.style.borderColor = originalColor;
    }, 500);
}

// CTA button effects
function initializeCtaEffects(button) {
    button.addEventListener('mouseenter', () => {
        gsap.to(button.querySelector('.button-glitch'), {
            opacity: 0.2,
            duration: 0.2,
            ease: 'none',
            yoyo: true,
            repeat: -1
        });
    });
    
    button.addEventListener('mouseleave', () => {
        gsap.to(button.querySelector('.button-glitch'), {
            opacity: 0,
            duration: 0.2
        });
    });
}

// SIMPLIFIED: Section navigation initialization - always defaults to WTF section
function initializeSectionNavigation() {
    const sections = document.querySelectorAll('.section');
    const navItems = document.querySelectorAll('.section-navigator li');
    
    // Clear all active states
    sections.forEach(s => s.classList.remove('active'));
    navItems.forEach(n => n.classList.remove('active'));
    
    // Set WTF section as default active section
    const defaultSection = document.getElementById('wtf-section');
    const defaultNavItem = document.querySelector(`.section-navigator li[data-section="wtf-section"]`);
    
    defaultSection.classList.add('active');
    defaultNavItem.classList.add('active');

    // Add click handlers without hash updates
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const targetId = item.getAttribute('data-section');
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                // Remove active class from all sections and nav items
                sections.forEach(s => s.classList.remove('active'));
                navItems.forEach(n => n.classList.remove('active'));
                
                // Add active class to target section and nav item
                targetSection.classList.add('active');
                item.classList.add('active');
            }
        });
    });

    // Remove scroll spy since it's not needed
    // Keep sections array from overflowing
    sections.forEach(section => {
        section.style.display = 'none';
    });
    defaultSection.style.display = 'block';

    // Update display when changing sections
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const targetId = item.getAttribute('data-section');
            sections.forEach(section => {
                section.style.display = section.id === targetId ? 'block' : 'none';
            });
        });
    });
}