// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const acceptCheckbox = document.getElementById('accept-doom');
    const abandonButton = document.getElementById('abandon-hope');
    const glitchTexts = document.querySelectorAll('.glitch-text');
    const warningItems = document.querySelectorAll('.glitch-item');
    const body = document.body;
    
    // Initialize GSAP animations
    initGlitchEffects();
    
    // Enable button only when checkbox is checked
    acceptCheckbox.addEventListener('change', function() {
        if (this.checked) {
            abandonButton.disabled = false;
            playGlitchSound('enable');
            
            // Special effect when enabled
            gsap.to(abandonButton, {
                duration: 0.3,
                backgroundColor: 'rgba(255, 0, 51, 0.2)',
                boxShadow: '0 0 10px #FF0033, 0 0 20px #FF0033',
                ease: 'power2.out'
            });
            
            // Text reveal animation
            const buttonText = abandonButton.querySelector('.button-text');
            gsap.fromTo(buttonText, 
                { text: "L0@d1ng..." },
                { 
                    duration: 1.5, 
                    text: "Abandon Hope", 
                    ease: "none",
                    onUpdate: function() {
                        if (Math.random() < 0.1) {
                            buttonText.style.letterSpacing = `${Math.random() * 2}px`;
                            setTimeout(() => {
                                buttonText.style.letterSpacing = '0';
                            }, 50);
                        }
                    }
                }
            );
        } else {
            abandonButton.disabled = true;
            gsap.to(abandonButton, {
                duration: 0.3,
                backgroundColor: 'var(--dark-gray)',
                boxShadow: 'none',
                ease: 'power2.out'
            });
        }
    });
    
    // Add click event to the button
    abandonButton.addEventListener('click', function() {
        if (!this.disabled) {
            playGlitchSound('abandon');
            triggerAbandonAnimation();
            
            // After the animation, redirect or show next page
            setTimeout(() => {
                window.location.href = 'hero.html'; // Replace with actual destination
            }, 2000);
        }
    });
    
    // Add hover effects to warning items
    warningItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            if (Math.random() > 0.7) {
                triggerMiniGlitch(this);
            }
        });
    });
    
    // Easter egg: Konami code
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;
    
    document.addEventListener('keydown', function(e) {
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                triggerEasterEgg();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });
    
    // Initialize GSAP glitch effects
    function initGlitchEffects() {
        // Logo animation
        const logo = document.querySelector('.logo .glitch-text');
        createTextGlitch(logo, 5000);
        
        // Warning header animation
        const warningTitle = document.querySelector('.warning-header h1');
        createTextGlitch(warningTitle, 7000);
        
        // Randomly trigger glitches on text elements
        setInterval(() => {
            const randomIndex = Math.floor(Math.random() * glitchTexts.length);
            const randomDuration = Math.random() * 200 + 100;
            triggerTextGlitch(glitchTexts[randomIndex], randomDuration);
        }, 3000);
        
        // Create scanline effect
        animateScanline();
    }
    
    // Create persistent glitch effect on text
    function createTextGlitch(element, interval) {
        if (!element) return;
        
        setInterval(() => {
            const glitchDuration = Math.random() * 200 + 100;
            
            // Before glitch
            const beforeOffset = Math.random() * 10 - 5;
            const beforeColor = Math.random() > 0.5 ? 'var(--neon-cyan)' : 'var(--neon-red)';
            
            // After glitch
            const afterOffset = Math.random() * 10 - 5;
            const afterColor = Math.random() > 0.5 ? 'var(--neon-red)' : 'var(--neon-cyan)';
            
            // Apply glitch
            element.style.position = 'relative';
            
            // Create glitch effect with pseudo-elements
            gsap.to(element, {
                duration: 0.1,
                opacity: 0.9,
                skewX: Math.random() * 10 - 5,
                ease: 'power4.out',
                onStart: function() {
                    element.style.textShadow = `${beforeOffset}px 0 0 ${beforeColor}, ${afterOffset}px 0 0 ${afterColor}`;
                },
                onComplete: function() {
                    gsap.to(element, {
                        duration: 0.1,
                        opacity: 1,
                        skewX: 0,
                        ease: 'power4.out',
                        onComplete: function() {
                            element.style.textShadow = '';
                        }
                    });
                }
            });
        }, interval);
    }
    
    // Trigger a one-time text glitch
    function triggerTextGlitch(element, duration) {
        if (!element) return;
        
        const originalPosition = element.style.position || 'relative';
        const originalTransform = element.style.transform || '';
        
        // Random glitch parameters
        const xShift = Math.floor(Math.random() * 7) - 3;
        const yShift = Math.floor(Math.random() * 7) - 3;
        const scaleValue = 1 + (Math.random() * 0.1 - 0.05);
        
        // Apply glitch
        gsap.to(element, {
            duration: duration / 1000,
            x: xShift,
            y: yShift,
            scaleX: scaleValue,
            opacity: 0.9,
            ease: 'rough',
            onComplete: function() {
                gsap.to(element, {
                    duration: duration / 2000,
                    x: 0,
                    y: 0,
                    scaleX: 1,
                    opacity: 1,
                    ease: 'power1.out'
                });
            }
        });
        
        // Temporary glitch clones
        const elementParent = element.parentNode;
        
        if (Math.random() > 0.7) {
            // Create RGB split effect
            const beforeClone = element.cloneNode(true);
            const afterClone = element.cloneNode(true);
            
            beforeClone.style.position = 'absolute';
            beforeClone.style.top = '0';
            beforeClone.style.left = '0';
            beforeClone.style.color = 'var(--neon-cyan)';
            beforeClone.style.clipPath = 'inset(0 0 50% 0)';
            beforeClone.style.transform = `translateX(${Math.random() * 5 - 2.5}px)`;
            beforeClone.style.opacity = '0.8';
            beforeClone.style.zIndex = '-1';
            beforeClone.style.pointerEvents = 'none';
            
            afterClone.style.position = 'absolute';
            afterClone.style.top = '0';
            afterClone.style.left = '0';
            afterClone.style.color = 'var(--neon-red)';
            afterClone.style.clipPath = 'inset(50% 0 0 0)';
            afterClone.style.transform = `translateX(${Math.random() * 10 - 5}px)`;
            afterClone.style.opacity = '0.8';
            
            // Add them temporarily to DOM for animation
            const parent = element.parentNode;
            parent.appendChild(beforeClone);
            parent.appendChild(afterClone);
            
            // Remove after animation
            setTimeout(() => {
                parent.removeChild(beforeClone);
                parent.removeChild(afterClone);
            }, duration);
        }
    } // Added missing closing brace
    
    // Trigger mini glitch on hover
    function triggerMiniGlitch(element) {
        const originalColor = element.style.color;
        const glitchDuration = 300;
        
        gsap.to(element, {
            duration: glitchDuration / 1000,
            color: Math.random() > 0.5 ? 'var(--neon-cyan)' : 'var(--neon-red)',
            x: Math.random() * 5 - 2.5,
            ease: 'power2.inOut',
            onComplete: function() {
                gsap.to(element, {
                    duration: glitchDuration / 2000,
                    color: originalColor,
                    x: 0,
                    ease: 'power1.out'
                });
            }
        });
    }
    
    // Trigger full screen abandon animation
    function triggerAbandonAnimation() {
        // Create full screen overlay
        const overlay = document.createElement('div');
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100vw';
        overlay.style.height = '100vh';
        overlay.style.backgroundColor = 'black';
        overlay.style.zIndex = '9999';
        overlay.style.opacity = '0';
        document.body.appendChild(overlay);
        
        // Text to show
        const glitchText = document.createElement('div');
        glitchText.innerText = "SYSTEM COMPROMISED";
        glitchText.style.position = 'absolute';
        glitchText.style.top = '50%';
        glitchText.style.left = '50%';
        glitchText.style.transform = 'translate(-50%, -50%)';
        glitchText.style.color = 'var(--neon-red)';
        glitchText.style.fontFamily = 'var(--terminal)';
        glitchText.style.fontSize = '3rem';
        glitchText.style.textAlign = 'center';
        glitchText.style.opacity = '0';
        glitchText.style.textShadow = 'var(--neon-red-glow)';
        overlay.appendChild(glitchText);
        
        // Animate overlay
        gsap.to(overlay, {
            duration: 0.3,
            opacity: 1,
            ease: 'power2.in'
        });
        
        // Shake the screen
        gsap.to(body, {
            duration: 0.1,
            x: 10,
            ease: 'steps(1)',
            repeat: 10,
            yoyo: true
        });
        
        // Show and animate the text
        setTimeout(() => {
            gsap.to(glitchText, {
                duration: 0.1,
                opacity: 1,
                ease: 'none',
                onComplete: function() {
                    // Create RGB split effect on text
                    const redText = glitchText.cloneNode(true);
                    const blueText = glitchText.cloneNode(true);
                    
                    redText.style.color = 'var(--neon-red)';
                    redText.style.position = 'absolute';
                    redText.style.top = '0';
                    redText.style.left = '0';
                    redText.style.opacity = '0.8';
                    
                    blueText.style.color = 'var(--neon-cyan)';
                    blueText.style.position = 'absolute';
                    blueText.style.top = '0';
                    blueText.style.left = '0';
                    blueText.style.opacity = '0.8';
                    
                    glitchText.appendChild(redText);
                    glitchText.appendChild(blueText);
                    
                    // Animate RGB split
                    gsap.to(redText, {
                        duration: 0.05,
                        x: -5,
                        y: -3,
                        repeat: 10,
                        yoyo: true
                    });
                    
                    gsap.to(blueText, {
                        duration: 0.05,
                        x: 5,
                        y: 3,
                        repeat: 10,
                        yoyo: true
                    });
                }
            });
        }, 300);
    }
    
    // Animate the scanline effect
    function animateScanline() {
        const scanline = document.querySelector('.scanline');
        if (!scanline) return;
        
        gsap.to(scanline, {
            duration: 8,
            backgroundPosition: '0 100vh',
            ease: 'none',
            repeat: -1
        });
    }
    
    // Sound Toggle
    const soundToggle = document.getElementById('soundToggle');
    let isMuted = localStorage.getItem('isMuted') === 'true';
    
    updateSoundToggle();
    
    soundToggle.addEventListener('click', () => {
        isMuted = !isMuted;
        localStorage.setItem('isMuted', isMuted);
        updateSoundToggle();
    });
    
    function updateSoundToggle() {
        soundToggle.textContent = isMuted ? '🔇' : '🔊';
        soundToggle.classList.toggle('muted', isMuted);
    }

    // Play glitch sounds (if user has interacted with the page)
    function playGlitchSound(type) {
        if (isMuted) return;
        
        // Only play sounds if user has interacted with the page (browser policy)
        if (!acceptCheckbox.hasUserInteraction) return;
        
        // Create audio element
        const audio = new Audio();
        audio.volume = 0.3;
        
        switch(type) {
            case 'enable':
                audio.src = 'data:audio/mp3;base64,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';
                break;
            case 'abandon':
                audio.src = 'data:audio/mp3;base64,SUQzBAAAAAACKFRYWFgAAAASAAADbWFqb3JfYnJhbmQATTRBIABUWFhYAAAAEQAAA21pbm9yX3ZlcnNpb24AMABUWFhYAAAAJAAAAGNvbXBhdGlibGVfYnJhbmRzAGlzbzZtcDQxAE00QSAAVFhYWAAAADUAAABkZXNjcmlwdGlvbgBDbGlwIGNvbnZlcnRlZCB1c2luZyBmZmFtcGVnIHdlYnNpdGUAVFNTRQAAAA8AAANMYXZmNTguNzcuMTAwAAAAAAAAAAAAAAD/+9DEAAMIgGMpjBGAIPuMZTGGMgAAAAukGYLAgCAIGFAcDgcOAgCAgJ0wQNA6YbYAXoW2oDloGbMAOmQWMSgHEwGAVTA6AMMGYDiIAcoAgYHGGoKtKwlQRDApAEMA0A48AyaQQACQA1zACQBkiaBEYDIAJAAMpkMBEMDVDRB6KU5BhAgEGAEgLJgDYAqYAuAFmAGAAxgEAA4YEUBKmAngGZgBAAsYAwADxgLYBSmQAEwDgQADABABYLoJHvFrWPPt7e/8V4v4FIIxlnw13l3l3i7yIR5d5p8vIiImTJ/iEcVZjIjmMiIiIid+LvLvJZIxHOXeRERERzl5GXiRn96qT5d4YYXiqmGC8/qbcQAAAFSNiYzXNu5mYALOJrmLrKLuMxsyNvV7F3F3jyMuIiI9V5l3kRO8V5l5ERE78XkQjnLyWTzyZeSyeSyeXeRETEfHxVRB6tRBEQeA8B/8NgP/Y8Qf4DgHiDxB/xAA/+AwH/0BAP/gMAHiAwHwgABwEAP/u8AAIAQeIDAf/9jxB/iAB/8RgA/+gIB/8BgA8QGAA=';
                break;
            default:
                return;
        }
        
        // Play the sound
        audio.play().catch(e => {
            // Browser may block autoplay, ignore error
            console.log('Sound play prevented by browser policy');
        });
    }
    
    // Track if user has interacted with the page (for sound playback)
    document.addEventListener('click', function() {
        acceptCheckbox.hasUserInteraction = true;
    });
    
    // Add doom acceptance sound
    acceptCheckbox.addEventListener('change', function() {
        if (this.checked && !isMuted) {
            const doomSound = new Audio('data:audio/mp3;base64,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');
            doomSound.volume = 0.3;
            doomSound.play().catch(console.warn);
        }
    });
});