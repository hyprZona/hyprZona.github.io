/**
 * hyprZona - dakindahood About Page
 * JavaScript functionality for mode switching and animations
 */

// Initialize GSAP
gsap.registerPlugin(ScrollTrigger);

// Konami Code initialization
function initKonamiCode() {
    let konamiCode = [
        'ArrowUp', 'ArrowUp', 
        'ArrowDown', 'ArrowDown', 
        'ArrowLeft', 'ArrowRight', 
        'ArrowLeft', 'ArrowRight', 
        'b', 'a'
    ];
    let konamiIndex = 0;
    
    document.addEventListener('keydown', (e) => {
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            
            if (konamiIndex === konamiCode.length) {
                activateEasterEgg();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });
}

// Create screen glitch effect - move outside DOMContentLoaded
function createScreenGlitch() {
    const glitchOverlay = document.querySelector('.glitch-overlay');
    
    // Add intense glitch class
    glitchOverlay.style.opacity = '0.8';
    glitchOverlay.style.transform = `translateX(${Math.random() * 10 - 5}px)`;
    
    // Add scan line effect
    document.body.style.backgroundPosition = `0 ${Math.random() * 10}px`;
    
    // Remove effect after short time
    setTimeout(() => {
        glitchOverlay.style.opacity = '0.2';
        glitchOverlay.style.transform = 'translateX(0)';
        document.body.style.backgroundPosition = '0 0';
    }, 150);
}

document.addEventListener('DOMContentLoaded', function() {
    // Set initial state
    setDefaultMode();
    
    // Mode toggle functionality
    const modeToggle = document.getElementById('mode-toggle');
    const znuLabel = document.querySelector('.znu-label');
    const irlLabel = document.querySelector('.irl-label');
    
    function updateToggleState(mode) {
        if (mode === 'irl') {
            modeToggle.checked = true;
            document.body.classList.remove('znu-mode');
            document.body.classList.add('irl-mode');
            znuLabel.classList.remove('active');
            irlLabel.classList.add('active');
            document.getElementById('znu-section').classList.remove('active');
            document.getElementById('irl-section').classList.add('active');
        } else {
            modeToggle.checked = false;
            document.body.classList.remove('irl-mode');
            document.body.classList.add('znu-mode');
            irlLabel.classList.remove('active');
            znuLabel.classList.add('active');
            document.getElementById('irl-section').classList.remove('active');
            document.getElementById('znu-section').classList.add('active');
        }
    }

    // Toggle event listeners
    modeToggle.addEventListener('change', function() {
        updateToggleState(this.checked ? 'irl' : 'znu');
    });

    znuLabel.addEventListener('click', function() {
        updateToggleState('znu');
    });

    irlLabel.addEventListener('click', function() {
        updateToggleState('irl');
    });

    function setDefaultMode() {
        // Set to IRL mode by default
        updateToggleState('irl');
        
        // Show IRL section and hide ZNU section
        const znuSection = document.getElementById('znu-section');
        const irlSection = document.getElementById('irl-section');
        
        znuSection.style.display = 'none';
        irlSection.style.display = 'block';
        
        // Update toggle state
        modeToggle.checked = true;
    }

    // Call setDefaultMode on page load
    setDefaultMode();
    
    // DOM Elements
    const body = document.body;
    const terminalLines = document.querySelectorAll('.terminal-line');
    const typewriterLines = document.querySelectorAll('.typewriter-line');
    const skillBars = document.querySelectorAll('.skill-bar');
    const facts = document.querySelectorAll('.fact-item');
    
    // Initialize all components
    initializePage();
    initMirrorText();
    initKonamiCode(); // Now this will work
    
    // Event Listeners
    modeToggle.addEventListener('change', toggleMode);
    znuLabel.addEventListener('click', () => setMode('znu'));
    irlLabel.addEventListener('click', () => setMode('irl'));

    /**
     * Initialize the page with all animations and default state
     */
    function initializePage() {
        // Initialize facts immediately
        const facts = document.querySelectorAll('.fact-item');
        facts.forEach((fact, index) => {
            gsap.fromTo(fact,
                { opacity: 0, x: -50 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 0.5,
                    delay: index * 0.1,
                    ease: "power2.out"
                }
            );
        });

        // Make sure sections are visible
        if (document.body.classList.contains('znu-mode')) {
            document.getElementById('znu-section').style.display = 'block';
            document.getElementById('znu-section').style.opacity = '1';
        }

        // Initialize other components
        animateTerminalLines();
        setRandomGlitchEvents();
    }
    
    /**
     * Toggle between ZNU and IRL modes
     */
    function toggleMode() {
        if (modeToggle.checked) {
            setMode('irl');
        } else {
            setMode('znu');
        }
    }
    
    /**
     * Set mode to either ZNU or IRL
     * @param {string} mode - 'znu' or 'irl'
     */
    function setMode(mode) {
        const znuSection = document.getElementById('znu-section');
        const irlSection = document.getElementById('irl-section');
        const znuLabel = document.querySelector('.znu-label');
        const irlLabel = document.querySelector('.irl-label');
        
        // Create transition effect
        const overlay = document.createElement('div');
        overlay.className = 'mode-transition-overlay';
        document.body.appendChild(overlay);
        
        gsap.timeline()
            .to(overlay, {
                opacity: 1,
                duration: 0.3,
                ease: 'power2.in',
                onStart: () => {
                    createScreenGlitch();
                    document.body.classList.add('transitioning');
                }
            })
            .call(() => {
                // Switch mode
                if (mode === 'znu') {
                    znuSection.style.display = 'block';
                    irlSection.style.display = 'none';
                    znuLabel.classList.add('active');
                    irlLabel.classList.remove('active');
                    document.body.classList.remove('irl-mode');
                    document.body.classList.add('znu-mode');
                    
                    // Show facts immediately without scroll animation
                    const facts = document.querySelectorAll('.fact-item');
                    facts.forEach((fact, index) => {
                        gsap.fromTo(fact,
                            { opacity: 0, x: -50 },
                            {
                                opacity: 1,
                                x: 0,
                                duration: 0.5,
                                delay: index * 0.1,
                                ease: "power2.out"
                            }
                        );
                    });
                } else {
                    irlSection.style.display = 'block';
                    znuSection.style.display = 'none';
                    irlLabel.classList.add('active');
                    znuLabel.classList.remove('active');
                    document.body.classList.remove('znu-mode');
                    document.body.classList.add('irl-mode');
                }
                createScreenGlitch();
            })
            .to(overlay, {
                opacity: 0,
                duration: 0.3,
                delay: 0.1,
                ease: 'power2.out',
                onComplete: () => {
                    overlay.remove();
                    document.body.classList.remove('transitioning');
                }
            });
    }
    
    /**
     * Create reality shift transition
     */
    function createRealityShift(callback) {
        const overlay = document.createElement('div');
        overlay.className = 'reality-shift-overlay';
        document.body.appendChild(overlay);
        
        // Create glitch effect during transition
        document.body.classList.add('shifting-reality');
        createScreenGlitch();
        
        gsap.timeline()
            .to(overlay, {
                opacity: 1,
                duration: 0.3,
                ease: 'power2.in',
                onComplete: () => {
                    callback();
                    createScreenGlitch();
                }
            })
            .to(overlay, {
                opacity: 0,
                duration: 0.3,
                ease: 'power2.out',
                onComplete: () => {
                    overlay.remove();
                    document.body.classList.remove('shifting-reality');
                    // Force ScrollTrigger to recalculate
                    ScrollTrigger.refresh();
                }
            });
    }

    /**
     * Enhanced terminal animation with GSAP
     */
    function animateTerminalLines() {
        terminalLines.forEach(line => {
            const delay = parseInt(line.getAttribute('data-delay') || '0');
            
            gsap.to(line, {
                opacity: 1,
                duration: 0.3,
                delay: delay / 1000,
                onStart: () => {
                    typewriterEffect(line);
                }
            });
        });
    }

    /**
     * Enhanced typewriter effect
     */
    function typewriterEffect(element) {
        const originalText = element.textContent;
        const spans = originalText.split('').map(char => {
            return `<span style="opacity: 0">${char}</span>`;
        });
        
        element.innerHTML = spans.join('');
        element.style.width = 'auto';
        element.style.display = 'block';
        
        const characters = element.querySelectorAll('span');
        
        characters.forEach((char, index) => {
            gsap.to(char, {
                opacity: 1,
                duration: 0.01,
                delay: index * 0.03,
                ease: "none",
                onComplete: () => {
                    if (index === characters.length - 1) {
                        // Animation complete
                        element.innerHTML = originalText;
                    }
                }
            });
        });
    }

    /**
     * Animate typewriter lines with delay
     */
    function animateTypewriterLines() {
        typewriterLines.forEach(line => {
            line.style.animation = 'none';
            line.style.opacity = '0';
            line.style.width = '0';
            
            // Force reflow
            void line.offsetWidth;
            
            const delay = parseInt(line.getAttribute('data-delay') || '0');
            
            setTimeout(() => {
                line.style.animation = 'typewriter 3s steps(40, end) forwards, blink-caret 0.75s step-end infinite';
            }, delay);
        });
    }
    
    /**
     * Set and animate skill bars
     */
    function setSkillBarWidths() {
        skillBars.forEach(bar => {
            const level = parseInt(bar.getAttribute('data-level') || '0');
            bar.style.width = '0';
            
            // Set max width based on level
            setTimeout(() => {
                const maxWidth = Math.min(level, 100) + '%';
                bar.style.width = maxWidth;
            }, 500);
        });
    }
    
    /**
     * Animate skill bars
     */
    function animateSkillBars() {
        skillBars.forEach(bar => {
            bar.style.width = '0';
            
            // Force reflow
            void bar.offsetWidth;
            
            const level = parseInt(bar.getAttribute('data-level') || '0');
            const maxWidth = Math.min(level, 100) + '%';
            
            setTimeout(() => {
                bar.style.width = maxWidth;
            }, 300);
        });
    }
    
    /**
     * Set random glitch events
     */
    function setRandomGlitchEvents() {
        // Create screen glitch effect randomly
        setInterval(() => {
            if (Math.random() < 0.2 && body.classList.contains('znu-mode')) {
                createScreenGlitch();
            }
        }, 5000);
    }
    
    /**
     * Create screen glitch effect
     */
    function createScreenGlitch() {
        const glitchOverlay = document.querySelector('.glitch-overlay');
        
        // Add intense glitch class
        glitchOverlay.style.opacity = '0.8';
        glitchOverlay.style.transform = `translateX(${Math.random() * 10 - 5}px)`;
        
        // Add scan line effect
        body.style.backgroundPosition = `0 ${Math.random() * 10}px`;
        
        // Remove effect after short time
        setTimeout(() => {
            glitchOverlay.style.opacity = '0.2';
            glitchOverlay.style.transform = 'translateX(0)';
            body.style.backgroundPosition = '0 0';
        }, 150);
    }
    /**
     * Initialize animations for mirror text effect
     */
    function initMirrorText() {
        const mirrorTexts = document.querySelectorAll('.name-highlight');
        
        mirrorTexts.forEach(text => {
            text.addEventListener('mouseover', () => {
                text.classList.add('mirror-active');
                
                setTimeout(() => {
                    text.classList.remove('mirror-active');
                }, 1000);
            });
        });
    }
    
    // Initialize mirror text effect
    initMirrorText();
    
    /**
     * Create Easter Egg for Konami Code
     */
    let konamiCode = [
        'ArrowUp', 'ArrowUp', 
        'ArrowDown', 'ArrowDown', 
        'ArrowLeft', 'ArrowRight', 
        'ArrowLeft', 'ArrowRight', 
        'b', 'a'
    ];
    let konamiIndex = 0;
    
    document.addEventListener('keydown', (e) => {
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            
            if (konamiIndex === konamiCode.length) {
                activateEasterEgg();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });
    
    /**
     * Activate Easter Egg
     */
    function activateEasterEgg() {
        // Create intense glitch effect
        const glitchOverlay = document.querySelector('.glitch-overlay');
        
        glitchOverlay.style.opacity = '1';
        document.body.classList.add('easter-egg');
        
        // Create message
        const easterEggMessage = document.createElement('div');
        easterEggMessage.className = 'easter-egg-message';
        easterEggMessage.innerHTML = '<span class="glitch-text" data-text="ZNU UNSEALED">ZNU UNSEALED</span><p>dVlpr will be notified of this breach</p>';
        
        document.body.appendChild(easterEggMessage);
        
        // Remove after delay
        setTimeout(() => {
            easterEggMessage.remove();
            glitchOverlay.style.opacity = body.classList.contains('znu-mode') ? '0.2' : '0';
            document.body.classList.remove('easter-egg');
        }, 5000);
    }

    // Add this to your initialization code
    function setDefaultMode() {
        const modeToggle = document.getElementById('mode-toggle');
        const znuSection = document.getElementById('znu-section');
        const irlSection = document.getElementById('irl-section');
        
        // Set to IRL mode
        document.body.classList.remove('znu-mode');
        document.body.classList.add('irl-mode');
        modeToggle.checked = true;
        
        // Update sections
        znuSection.style.display = 'none';
        znuSection.classList.remove('active');
        irlSection.style.display = 'block';
        irlSection.classList.add('active');
        
        // Update labels
        document.querySelector('.znu-label').classList.remove('active');
        document.querySelector('.irl-label').classList.add('active');
    }

    // Enhanced skill bar animations
    function initSkillBars() {
        const skillBars = document.querySelectorAll('.skill-bar');
        
        skillBars.forEach(bar => {
            const level = bar.getAttribute('data-level');
            
            gsap.fromTo(bar, 
                { width: '0%' },
                {
                    width: `${level}%`,
                    duration: 1.5,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: bar,
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });
    }

    // Enhanced loading overlay
    window.addEventListener('load', function() {
        const loadingOverlay = document.createElement('div');
        loadingOverlay.className = 'loading-overlay';
        loadingOverlay.innerHTML = `
            <div class="loading-content">
                <h2 class="glitch-text" data-text="hyprZona">hyprZona</h2>
                <div class="loading-bar-container">
                    <div class="loading-bar"></div>
                </div>
                <p class="loading-text">accessing profile<span class="dots">...</span></p>
            </div>
        `;
        
        document.body.appendChild(loadingOverlay);
        
        // Animate loading bar with GSAP
        gsap.to(loadingOverlay.querySelector('.loading-bar'), {
            width: '100%',
            duration: 1.5,
            ease: 'power2.inOut',
            onComplete: () => {
                gsap.to(loadingOverlay, {
                    opacity: 0,
                    duration: 0.5,
                    delay: 0.2,
                    onComplete: () => {
                        loadingOverlay.remove();
                        // Now this will work because createScreenGlitch is in global scope
                        createScreenGlitch();
                    }
                });
            }
        });
        
        // Animate loading dots
        const dots = loadingOverlay.querySelector('.dots');
        gsap.to(dots, {
            opacity: 0,
            duration: 0.5,
            repeat: -1,
            yoyo: true
        });
    });
});

// Disable right-click to enhance immersion (can be removed if not desired)
document.addEventListener('contextmenu', event => {
    event.preventDefault();
    
    // Create small glitch effect when right-clicked
    if (document.body.classList.contains('znu-mode')) {
        const glitchOverlay = document.querySelector('.glitch-overlay');
        glitchOverlay.style.opacity = '0.5';
        
        setTimeout(() => {
            glitchOverlay.style.opacity = '0.2';
        }, 300);
    }
    
    return false;
}, false);