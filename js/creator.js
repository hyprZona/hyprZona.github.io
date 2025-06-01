// Initialize glitch text effect
document.addEventListener('DOMContentLoaded', () => {
    // Set data-text attributes for glitch effect
    const glitchTexts = document.querySelectorAll('.glitch-text');
    glitchTexts.forEach(text => {
        text.setAttribute('data-text', text.textContent);
    });

    // Addeffects
    const buttons = document.querySelectorAll('.select-btn, .cta-btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            
            glitchButtonText(button);
        });
        
        button.addEventListener('click', () => {
            if (button.classList.contains('select-btn')) {
               
                simulateCharacterSelect(button.getAttribute('data-character'));
            } else {

                simulateRealmTransition(button.id);
            }
        });
    });

    // Character cards hover effects
    const characterCards = document.querySelectorAll('.character-card');
    characterCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            randomGlitch(card);
        });
    });

    // Konami code implementation
    let konamiSequence = [
        'ArrowUp', 'ArrowUp', 
        'ArrowDown', 'ArrowDown', 
        'ArrowLeft', 'ArrowRight', 
        'ArrowLeft', 'ArrowRight', 
        'b', 'a'
    ];
    let konamiPosition = 0;

    document.addEventListener('keydown', (e) => {
        const key = e.key;
        
        if (key === konamiSequence[konamiPosition]) {
            konamiPosition++;
            
            if (konamiPosition === konamiSequence.length) {
                activateKonamiCode();
                konamiPosition = 0;
            }
        } else {
            konamiPosition = 0;
        }
    });

    // Close Konami content
    const closeButton = document.querySelector('.close-konami');
    closeButton.addEventListener('click', () => {
        const konamiContent = document.querySelector('.konami-content');
        konamiContent.classList.remove('active');
    });

    // Initialize the feed lines with random appearances
    animateFeedLines();
});

// Function to create text distortion effect on buttons
function glitchButtonText(button) {
    const originalText = button.textContent;
    const distortText = () => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()';
        let distorted = '';
        for (let i = 0; i < originalText.length; i++) {
            if (Math.random() > 0.7) {
                distorted += chars.charAt(Math.floor(Math.random() * chars.length));
            } else {
                distorted += originalText[i];
            }
        }
        button.textContent = distorted;
    };

    let iterations = 0;
    const interval = setInterval(() => {
        distortText();
        iterations++;
        if (iterations > 5) {
            clearInterval(interval);
            button.textContent = originalText;
        }
    }, 50);
}

// Function to create random glitch effects on character cards
function randomGlitch(element) {
    const glitchDuration = Math.random() * 100 + 50;
    const glitchOffset = Math.random() * 10 - 5;
    
    element.style.transform = `translateX(${glitchOffset}px)`;
    
    setTimeout(() => {
        element.style.transform = 'translateY(-5px)';
    }, glitchDuration);
}

// Function to simulate character selection
function simulateCharacterSelect(character) {
    const card = document.getElementById(character);
    const allCards = document.querySelectorAll('.character-card');
    const dvlprCta = document.getElementById('dvlpr-cta');
    const dakinhoodCta = document.getElementById('dakindahood-cta');
    
    // Store selected character in a data attribute on body
    document.body.dataset.selectedCharacter = character;
    
    // Hide both buttons first
    dvlprCta.style.display = 'none';
    dakinhoodCta.style.display = 'none';
    
    // Update CTA button visibility with animation
    if (character === 'dvlpr') {
        setTimeout(() => {
            dvlprCta.style.display = 'block';
            dvlprCta.classList.add('visible');
            dakinhoodCta.classList.remove('visible');
        }, 500); // Delay to match the card animation
    } else {
        setTimeout(() => {
            dakinhoodCta.style.display = 'block';
            dakinhoodCta.classList.add('visible');
            dvlprCta.classList.remove('visible');
        }, 500);
    }
    
    // Create flash effect
    const flash = document.createElement('div');
    flash.style.position = 'fixed';
    flash.style.top = '0';
    flash.style.left = '0';
    flash.style.width = '100%';
    flash.style.height = '100%';
    flash.style.backgroundColor = 'white';
    flash.style.opacity = '0';
    flash.style.zIndex = '999';
    flash.style.transition = 'opacity 0.2s ease';
    document.body.appendChild(flash);
    
    // Sequence of events
    setTimeout(() => {
        flash.style.opacity = '0.8';
        
        setTimeout(() => {
            flash.style.opacity = '0';
            
            // Highlight selected character
            allCards.forEach(c => {
                if (c.id !== character) {
                    c.style.opacity = '0.5';
                    c.style.transform = 'scale(0.95)';
                } else {
                    c.style.transform = 'scale(1.05)';
                    c.style.boxShadow = c.id === 'dvlpr' 
                        ? '0 0 30px rgba(0, 250, 255, 0.7)' 
                        : '0 0 30px rgba(255, 18, 79, 0.7)';
                }
            });
            
            setTimeout(() => {
                document.body.removeChild(flash);
            }, 500);
        }, 200);
    }, 10);
}

// Add click handler to deselect character
document.addEventListener('click', (e) => {
    const selectedCharacter = document.body.dataset.selectedCharacter;
    if (!selectedCharacter) return;

    // Don't deselect if clicking on CTA buttons or selected character card
    if (e.target.closest('.cta-btn') || 
        e.target.closest(`#${selectedCharacter}`) ||
        e.target.closest('.select-btn')) {
        return;
    }

    // Deselect character
    resetCharacterSelect();
    delete document.body.dataset.selectedCharacter;
});

// Function to reset character selection
function resetCharacterSelect() {
    const allCards = document.querySelectorAll('.character-card');
    const dvlprCta = document.getElementById('dvlpr-cta');
    const dakinhoodCta = document.getElementById('dakindahood-cta');
    
    // Reset cards with transition
    allCards.forEach(card => {
        card.style.transition = 'all 0.3s ease';
        card.style.opacity = '1';
        card.style.transform = '';
        card.style.boxShadow = '';
    });
    
    // Hide CTA buttons with fade out
    if (dvlprCta.classList.contains('visible')) {
        dvlprCta.classList.remove('visible');
        setTimeout(() => dvlprCta.style.display = 'none', 300);
    }
    if (dakinhoodCta.classList.contains('visible')) {
        dakinhoodCta.classList.remove('visible');
        setTimeout(() => dakinhoodCta.style.display = 'none', 300);
    }
}

// Function to simulate realm transition for CTA buttons
function simulateRealmTransition(buttonId) {
    // Create a glitch effect div
    const glitchEffect = document.createElement('div');
    glitchEffect.style.position = 'fixed';
    glitchEffect.style.top = '0';
    glitchEffect.style.left = '0';
    glitchEffect.style.width = '100%';
    glitchEffect.style.height = '100%';
    glitchEffect.style.zIndex = '999';
    glitchEffect.style.pointerEvents = 'none';
    
    // Add scanlines
    for (let i = 0; i < 50; i++) {
        const scanline = document.createElement('div');
        scanline.style.position = 'absolute';
        scanline.style.top = `${i * 2}%`;
        scanline.style.width = '100%';
        scanline.style.height = '1px';
        scanline.style.backgroundColor = 'rgba(0, 255, 255, 0.5)';
        scanline.style.opacity = Math.random();
        glitchEffect.appendChild(scanline);
    }
    
    document.body.appendChild(glitchEffect);
    
    // Animate scanlines
    let frame = 0;
    const interval = setInterval(() => {
        const scanlines = glitchEffect.children;
        for (let i = 0; i < scanlines.length; i++) {
            scanlines[i].style.transform = `translateX(${Math.random() * 10 - 5}px)`;
            scanlines[i].style.opacity = Math.random();
        }
        
        frame++;
        if (frame > 10) {
            clearInterval(interval);
            
            // Redirect to appropriate page
            const url = buttonId === 'dvlpr-cta' ? 'abtdVp.html' : 'abtdak.html';
            window.location.href = url;
        }
    }, 50);
}

// Function to activate Konami code easter egg
function activateKonamiCode() {
   
    
    const konamiContent = document.querySelector('.konami-content');
    konamiContent.classList.add('active');
    
    // Create glitch effect
    const glitchItems = konamiContent.querySelectorAll('*');
    glitchItems.forEach(item => {
        if (Math.random() > 0.7) {
            const originalTransform = item.style.transform;
            item.style.transform = `${originalTransform} skew(${Math.random() * 10 - 5}deg)`;
            
            setTimeout(() => {
                item.style.transform = originalTransform;
            }, 300);
        }
    });
}

// Animate feed lines with random glitch effects
function animateFeedLines() {
    const feedLines = document.querySelectorAll('.feed-line');
    
    feedLines.forEach((line, index) => {
        // Random delay for each line
        setTimeout(() => {
            line.style.opacity = '1';
            
            // Add typewriter effect
            const text = line.textContent;
            line.textContent = '';
            
            let charIndex = 0;
            const typeInterval = setInterval(() => {
                if (charIndex < text.length) {
                    line.textContent += text.charAt(charIndex);
                    charIndex++;
                } else {
                    clearInterval(typeInterval);
                    
                    // Random glitch effect
                    if (Math.random() > 0.7) {
                        setTimeout(() => {
                            const originalText = line.textContent;
                            const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()';
                            let distorted = '';
                            
                            for (let i = 0; i < originalText.length; i++) {
                                if (Math.random() > 0.9) {
                                    distorted += chars.charAt(Math.floor(Math.random() * chars.length));
                                } else {
                                    distorted += originalText[i];
                                }
                            }
                            
                            line.textContent = distorted;
                            
                            setTimeout(() => {
                                line.textContent = originalText;
                            }, 200);
                        }, Math.random() * 3000);
                    }
                }
            }, 30);
        }, index * 1000);
    });
    
    // Restart animation after it completes
    setTimeout(() => {
        animateFeedLines();
    }, 20000);
}

// Add screen distortion effect on page load
window.addEventListener('load', () => {
    const glitchOverlay = document.querySelector('.glitch-overlay');
    
    // Initial screen distortion
    setTimeout(() => {
        glitchOverlay.style.backgroundImage = `
            repeating-linear-gradient(
                ${Math.random() * 180}deg,
                rgba(0, 0, 0, 0.1),
                rgba(0, 0, 0, 0.1) ${Math.random() * 5}px,
                transparent ${Math.random() * 5}px,
                transparent ${Math.random() * 10}px
            )
        `;
        
        // Random screen distortions throughout the session
        setInterval(() => {
            if (Math.random() > 0.9) {
                glitchOverlay.style.backgroundImage = `
                    repeating-linear-gradient(
                        ${Math.random() * 180}deg,
                        rgba(0, 0, 0, 0.1),
                        rgba(0, 0, 0, 0.1) ${Math.random() * 5}px,
                        transparent ${Math.random() * 5}px,
                        transparent ${Math.random() * 10}px
                    )
                `;
                
                setTimeout(() => {
                    glitchOverlay.style.backgroundImage = `
                        repeating-linear-gradient(
                            0deg,
                            rgba(0, 0, 0, 0.1),
                            rgba(0, 0, 0, 0.1) 1px,
                            transparent 1px,
                            transparent 2px
                        )
                    `;
                }, 200);
            }
        }, 5000);
    }, 1000);

    // Add "Press any key to start" functionality
    const blinkContainer = document.querySelector('.blink-container');
    const characterSelect = document.querySelector('.character-select');
    
    // Initially hide character select
    characterSelect.style.opacity = '0';
    characterSelect.style.pointerEvents = 'none';
    
    // Show on any key press or click
    const startGame = () => {
        
        
        // Hide blink text with glitch effect
        blinkContainer.style.animation = 'glitch 0.3s forwards';
        
        setTimeout(() => {
            blinkContainer.style.display = 'none';
            
            // Show character select with fade in
            characterSelect.style.transition = 'opacity 1s ease';
            characterSelect.style.opacity = '1';
            characterSelect.style.pointerEvents = 'auto';
        }, 500);
        
        // Remove event listeners
        document.removeEventListener('keydown', startGame);
        document.removeEventListener('click', startGame);
    };
    
    document.addEventListener('keydown', startGame);
    document.addEventListener('click', startGame);
});

// Update stat bar initialization
function initializeStatBars() {
    const statBars = document.querySelectorAll('.stat-bar');
    statBars.forEach(bar => {
        const value = bar.dataset.value || "0";
        const fill = bar.querySelector('.stat-fill');
        
        // Force a reflow
        void fill.offsetWidth;
        
        // Set the width with animation
        setTimeout(() => {
            fill.style.width = `${value}%`;
        }, 100);
    });
}

// Add to DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    // Animate stat bars on load
    setTimeout(() => {
        document.querySelectorAll('.stat-bar').forEach(bar => {
            const value = bar.dataset.value;
            bar.querySelector('.stat-fill').style.width = `${value}%`;
        });
    }, 500);

    // Easter egg screen glitch
    let hoverTimer;
    document.querySelectorAll('.character-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            hoverTimer = setTimeout(() => {
                const glitch = document.createElement('div');
                glitch.className = 'screen-glitch';
                document.body.appendChild(glitch);
                
                setTimeout(() => glitch.classList.add('active'), 100);
                
                const messages = [
                    "ANALYZING USER INTENT...",
                    "EXCESSIVE STARING DETECTED",
                    "PREPARING COUNTERMEASURES",
                    "INITIATING REALITY DISTORTION"
                ];
                
                const message = messages[Math.floor(Math.random() * messages.length)];
                glitch.textContent = message;
                
                setTimeout(() => {
                    glitch.classList.remove('active');
                    setTimeout(() => glitch.remove(), 300);
                }, 2000);
            }, 5000); // Trigger after 5 seconds of hover
        });
        
        card.addEventListener('mouseleave', () => {
            clearTimeout(hoverTimer);
        });
    });
});

// Add to DOMContentLoaded event
document.addEventListener('DOMContentLoaded', () => {
    // Random quotes system
    const dvlprQuotes = [
        "He didn't break the system. He just replaced it with his own.",
        "Some people write code. He writes chaos.",
        "Debug by day, destroy by night."
    ];
    
    const dakinhoodQuotes = [
        "He doesn't speak often, but when he does, your OS cries.",
        "Vibe architect, reality hacker, chaos whisperer.",
        "The quiet one. Until he's not."
    ];

    function setRandomQuote(character) {
        const quotes = character === 'dvlpr' ? dvlprQuotes : dakinhoodQuotes;
        const tagline = document.querySelector(`#${character} .character-tagline`);
        tagline.textContent = quotes[Math.floor(Math.random() * quotes.length)];
    }

    // Set initial random quotes
    setRandomQuote('dvlpr');
    setRandomQuote('dakindahood');

    // Track hover time for easter egg
    const cards = document.querySelectorAll('.character-card');
    cards.forEach(card => {
        let hoverTime = 0;
        let hoverInterval;

        card.addEventListener('mouseenter', () => {
            hoverInterval = setInterval(() => {
                hoverTime++;
                if (hoverTime >= 10) {
                    card.setAttribute('data-hover-time', '10');
                    clearInterval(hoverInterval);
                }
            }, 1000);
        });

        card.addEventListener('mouseleave', () => {
            clearInterval(hoverInterval);
            hoverTime = 0;
            card.removeAttribute('data-hover-time');
        });
    });

    // Stat bars functionality
    const statBars = document.querySelectorAll('.stat-bar');
    statBars.forEach(bar => {
        const value = bar.getAttribute('data-value');
        const tooltip = bar.getAttribute('data-tooltip');
        
        // Set initial fill
        const fill = bar.querySelector('.stat-fill');
        fill.style.width = `${value}%`;
        
        // Tooltip functionality
        bar.addEventListener('mouseenter', () => {
            const tooltipElement = document.createElement('div');
            tooltipElement.className = 'tooltip';
            tooltipElement.textContent = tooltip;
            document.body.appendChild(tooltipElement);
            
            const rect = bar.getBoundingClientRect();
            tooltipElement.style.left = `${rect.left + window.scrollX}px`;
            tooltipElement.style.top = `${rect.top + window.scrollY - tooltipElement.offsetHeight}px`;
        });
        
        bar.addEventListener('mouseleave', () => {
            const tooltipElement = document.querySelector('.tooltip');
            if (tooltipElement) {
                document.body.removeChild(tooltipElement);
            }
        });
    });
});