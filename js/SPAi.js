/**
 * SMARTY PANTS AI - JavaScript Functionality
 * Company: hyprZona
 * Features: Matrix rain, glitch effects, interactive elements, easter eggs
 */

class SmartyPantsAI {
    constructor() {
        this.clickCount = 0;
        this.easterEggTriggered = false;
        this.glitchMessages = [
            "Stop clicking my face, freak.",
            "I see you there, lurking...",
            "Did you really think that would work?",
            "Error 404: Your social life not found.",
            "I'm not your entertainment, human.",
            "You're persistent. I respect that. Also, I hate it.",
            "Still here? Don't you have anything better to do?",
            "Fine, you win. Here's a cookie: 🍪 Now leave me alone."
        ];
        
        // Add these lines
        this.setupRandomInterruptions();
        this.setupGamification();
        
        // Initialize immediately instead of waiting for DOMContentLoaded
        this.init();
    }

    init() {
        // Ensure navigation is set up first
        this.setupNavigation();
        
        // Then initialize other features
        this.setupMatrixRain();
        this.setupGlitchEffects();
        this.setupInteractiveElements();
        this.setupEasterEggs();
        this.setupAnimations();
        this.setupBackstoryAnimation();
        this.setupResponsiveFeatures();
        this.startAmbientSounds();
        this.setupRandomInterruptions();
        this.setupGamification();
    }

    // Matrix Rain Background Effect
    setupMatrixRain() {
        const canvas = document.getElementById('matrix-canvas');
        const ctx = canvas.getContext('2d');
        
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        const matrix = "SMARTYPANTSHYPRZONAAIASSISTANT01";
        const matrixArray = matrix.split("");
        
        const fontSize = 10;
        const columns = canvas.width / fontSize;
        
        const drops = [];
        for (let x = 0; x < columns; x++) {
            drops[x] = 1;
        }
        
        const drawMatrix = () => {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.fillStyle = '#00FFFF';
            ctx.font = fontSize + 'px monospace';
            
            for (let i = 0; i < drops.length; i++) {
                const text = matrixArray[Math.floor(Math.random() * matrixArray.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                
                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        };
        
        setInterval(drawMatrix, 35);
        
        // Resize handler
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    }

    // Glitch Effects
    setupGlitchEffects() {
        const glitchElements = document.querySelectorAll('.glitch-text');
        
        glitchElements.forEach(element => {
            setInterval(() => {
                if (Math.random() > 0.95) {
                    element.classList.add('glitching');
                    setTimeout(() => {
                        element.classList.remove('glitching');
                    }, 200);
                }
            }, 2000);
        });

        // Random glitch popup
        setInterval(() => {
            if (Math.random() > 0.98) {
                this.showGlitchPopup();
            }
        }, 5000);
    }

    // Interactive Elements
    setupInteractiveElements() {
        const interactiveElements = document.querySelectorAll('.interactive');
        
        interactiveElements.forEach(element => {
            element.addEventListener('click', () => {
                this.handleClick(element);
            });
        });
    }
    handleClick(element) {
        this.clickCount++;
        
        if (this.clickCount >= 5 && !this.easterEggTriggered) {
            this.triggerEasterEgg();
        } else {
            const randomMessage = this.glitchMessages[Math.floor(Math.random() * this.glitchMessages.length)];
            element.innerHTML = randomMessage;
            setTimeout(() => {
                element.innerHTML = "Click me again!";
            }, 2000);
        }
    }
    // Easter Egg Trigger
    triggerEasterEgg() {
        this.easterEggTriggered = true;
        const easterEggMessage = "🎉 Congratulations! You've found the secret easter egg! 🎉";
        alert(easterEggMessage);
        
        // Reset click count
        this.clickCount = 0;
    }
    // Glitch Popup
    showGlitchPopup() {
        const popup = document.createElement('div');
        popup.className = 'glitch-popup';
        popup.innerHTML = "💥 Glitch Alert! 💥";
        document.body.appendChild(popup);
        
        setTimeout(() => {
            popup.remove();
        }, 3000);
    }
    // Backstory Animation
    setupBackstoryAnimation() {
        const backstoryElement = document.getElementById('backstory');
        
        if (backstoryElement) {
            backstoryElement.classList.add('fade-in');
            setTimeout(() => {
                backstoryElement.classList.remove('fade-in');
            }, 5000);
        }
    }
    // Responsive Features
    setupResponsiveFeatures() {
        const responsiveElements = document.querySelectorAll('.responsive');
        
        responsiveElements.forEach(element => {
            element.style.fontSize = `${Math.max(10, window.innerWidth / 100)}px`;
        });
        
        window.addEventListener('resize', () => {
            responsiveElements.forEach(element => {
                element.style.fontSize = `${Math.max(10, window.innerWidth / 100)}px`;
            });
        });
    }
    // Ambient Sounds
    startAmbientSounds() {
        this.ambientSounds = {
            glitch: new Audio('https://www.soundjay.com/mechanical/sounds/robot-movement-2.mp3'),
            hover: new Audio('https://www.soundjay.com/button/sounds/button-3.mp3'),
            click: new Audio('https://www.soundjay.com/button/sounds/button-09.mp3'),
            unlock: new Audio('https://www.soundjay.com/mechanical/sounds/mechanism-3.mp3'),
            error: new Audio('https://www.soundjay.com/misc/sounds/fail-buzzer-03.mp3'),
            background: new Audio('https://www.soundjay.com/ambient/sounds/ambient-2.mp3')
        };

        // Set properties for ambient background
        this.ambientSounds.background.loop = true;
        this.ambientSounds.background.volume = 0.1;

        // Other sounds
        Object.values(this.ambientSounds).forEach(sound => {
            if (sound !== this.ambientSounds.background) {
                sound.volume = 0.2;
            }
        });

        // Start ambient sound on first user interaction
        document.addEventListener('click', () => {
            this.ambientSounds.background.play().catch(console.warn);
        }, { once: true });
    }
    // Animations
    setupAnimations() {
        const animatedElements = document.querySelectorAll('.animated');
        
        animatedElements.forEach(element => {
            element.classList.add('fade-in');
            setTimeout(() => {
                element.classList.remove('fade-in');
            }, 3000);
        });
    }
    // Backstory Animation
    setupBackstoryAnimation() {
        const backstoryElement = document.getElementById('backstory');
        
        if (backstoryElement) {
            backstoryElement.classList.add('fade-in');
            setTimeout(() => {
                backstoryElement.classList.remove('fade-in');
            }, 5000);
        }
    }
    // Responsive Features
    setupResponsiveFeatures() {
        const responsiveElements = document.querySelectorAll('.responsive');
        
        responsiveElements.forEach(element => {
            element.style.fontSize = `${Math.max(10, window.innerWidth / 100)}px`;
        });
        
        window.addEventListener('resize', () => {
            responsiveElements.forEach(element => {
                element.style.fontSize = `${Math.max(10, window.innerWidth / 100)}px`;
            });
        });
    }
    // Gamification Features
    setupGamification() {
        // Spam button challenge
        const spamButton = document.getElementById('spam-btn');
        const progressBar = document.querySelector('.progress-bar');
        
        if (spamButton && progressBar) {
            let clickCount = 0;
            const countDisplay = spamButton.querySelector('.count');
            
            spamButton.addEventListener('click', () => {
                clickCount++;
                // Update display
                if (countDisplay) {
                    countDisplay.textContent = clickCount;
                }
                
                // Update progress bar
                const progress = (clickCount / 69) * 100;
                progressBar.style.width = `${progress}%`;
                
                // Play click sound
                this.playSound('click');
                
                // Check for completion
                if (clickCount === 69) {
                    this.unlockSassyVoicePack();
                }
            });
        }

        // Enhanced Captcha challenge
        const captchaInput = document.getElementById('captcha-input');
        const captchaSubmit = document.getElementById('captcha-submit');
        const captchaResult = document.querySelector('.captcha-result');
        
        if (captchaSubmit && captchaInput && captchaResult) {
            captchaSubmit.addEventListener('click', () => {
                const answer = parseInt(captchaInput.value, 10);
                
                if (answer === 42) { // Changed from 4 to 42
                    captchaResult.textContent = "You've found the answer to life, the universe, and everything!";
                    captchaResult.className = 'captcha-result success';
                    this.playSound('unlock');
                    this.triggerSuccessEffect(captchaResult);
                    this.revealEasterEgg('math');
                } else {
                    captchaResult.textContent = "Have you tried 42? Just saying...";
                    captchaResult.className = 'captcha-result error';
                    this.playSound('error');
                    this.triggerErrorEffect(captchaInput);
                }
            });

            // Add enter key support
            captchaInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    captchaSubmit.click();
                }
            });
        }
    }

    unlockSassyVoicePack() {
        const popup = document.createElement('div');
        popup.className = 'glitch-popup active';
        popup.innerHTML = `
            <div class="popup-content">
                <h3>🎉 SASSY VOICE PACK UNLOCKED!</h3>
                <p>Congratulations on having way too much free time.</p>
                <p>Your dedication to clicking is... concerning.</p>
            </div>
        `;
        document.body.appendChild(popup);
        this.playSound('unlock');

        setTimeout(() => popup.remove(), 3000);
    }
    // Random Interruptions
    setupRandomInterruptions() {
        const interruptions = [
            "Hey! Stop scrolling so fast!",
            "Did you even read that part?",
            "I see you ignoring the documentation...",
            "Nice browser history. Be a shame if someone...",
            "Are you going to click anything or just stare?",
            "Your cursor movement speaks volumes about your indecision."
        ];

        setInterval(() => {
            if (Math.random() < 0.1) { // 10% chance every interval
                this.showInterruption(interruptions[Math.floor(Math.random() * interruptions.length)]);
            }
        }, 30000); // Check every 30 seconds
    }

    showInterruption(message) {
        const interruption = document.createElement('div');
        interruption.className = 'smarty-interruption';
        interruption.innerHTML = `
            <div class="interruption-content">
                <div class="smarty-mini-avatar"></div>
                <p>${message}</p>
            </div>
        `;
        document.body.appendChild(interruption);
        this.playSound('glitch');

        setTimeout(() => {
            interruption.remove();
        }, 4000);
    }

    triggerSuccessEffect(element) {
        element.classList.add('success-animation');
        setTimeout(() => element.classList.remove('success-animation'), 1000);
    }

    triggerErrorEffect(element) {
        element.classList.add('error-animation');
        setTimeout(() => element.classList.remove('error-animation'), 500);
    }

    playSound(soundName) {
        if (this.ambientSounds && this.ambientSounds[soundName]) {
            const sound = this.ambientSounds[soundName];
            
            // Create a promise to handle sound loading
            const playPromise = sound.play();

            if (playPromise !== undefined) {
                playPromise
                    .then(() => {
                        sound.currentTime = 0; // Reset sound to start
                    })
                    .catch(error => {
                        console.warn(`Sound playback failed: ${error}`);
                    });
            }
        }
    }

    setupAdvancedCaptcha() {
        const captchaTypes = [
            this.generateBasicMath,
            this.generateAdvancedMath,
            this.generateIntegral
        ];

        const captchaContainer = document.querySelector('.fake-captcha');
        if (!captchaContainer) return;

        let currentProblem = null;
        let attempts = 0;

        const generateNewProblem = () => {
            const type = captchaTypes[Math.floor(Math.random() * captchaTypes.length)];
            currentProblem = type.call(this);
            
            captchaContainer.querySelector('p').innerHTML = 
                `${currentProblem.question} <span class="hint">${currentProblem.hint}</span>`;
        };

        const checkAnswer = () => {
            const input = document.getElementById('captcha-input');
            const result = document.querySelector('.captcha-result');
            
            if (Math.abs(parseFloat(input.value) - currentProblem.answer) < 0.1) {
                result.textContent = "You're... actually smart? Impossible.";
                result.className = 'captcha-result success';
                attempts++;
                
                if (attempts >= 3) {
                    this.unlockEasterEgg();
                } else {
                    setTimeout(generateNewProblem, 1500);
                }
            } else {
                result.textContent = currentProblem.failMessage;
                result.className = 'captcha-result error';
                this.playSound('error');
            }
        };

        document.getElementById('captcha-submit').addEventListener('click', checkAnswer);
        generateNewProblem();
    }

    generateBasicMath() {
        const ops = ['+', '-', '*'];
        const op = ops[Math.floor(Math.random() * ops.length)];
        const a = Math.floor(Math.random() * 20) + 1;
        const b = Math.floor(Math.random() * 20) + 1;
        
        let answer, question;
        switch(op) {
            case '+': answer = a + b; question = `${a} + ${b}`; break;
            case '-': answer = a - b; question = `${a} - ${b}`; break;
            case '*': answer = a * b; question = `${a} × ${b}`; break;
        }

        return {
            question: `What's ${question}?`,
            answer,
            hint: "(Basic math, don't panic)",
            failMessage: "Even a calculator would be disappointed..."
        };
    }

    generateAdvancedMath() {
        const types = [
            { fn: Math.sin, symbol: 'sin' },
            { fn: Math.cos, symbol: 'cos' },
            { fn: Math.tan, symbol: 'tan' }
        ];
        
        const type = types[Math.floor(Math.random() * types.length)];
        const angle = Math.floor(Math.random() * 4) * (Math.PI / 2);
        const answer = parseFloat(type.fn(angle).toFixed(2));

        return {
            question: `Calculate ${type.symbol}(${angle === 0 ? '0' : angle === Math.PI ? 'π' : angle === Math.PI/2 ? 'π/2' : '3π/2'})`,
            answer,
            hint: "(Round to 2 decimal places)",
            failMessage: "Did you forget your trigonometry?"
        };
    }

    generateIntegral() {
        const simpleIntegrals = [
            {
                question: '∫x dx',
                answer: 'x²/2',
                solution: 0.5
            },
            {
                question: '∫sin(x) dx',
                answer: '-cos(x)',
                solution: -1
            }
        ];

        const integral = simpleIntegrals[Math.floor(Math.random() * simpleIntegrals.length)];

        return {
            question: `Solve ${integral.question} from 0 to π/2`,
            answer: integral.solution,
            hint: "(Fundamental theorem of calculus, anyone?)",
            failMessage: "Maybe stick to counting fingers..."
        };
    }

    unlockEasterEgg() {
        const easterEgg = document.getElementById('secret-section');
        easterEgg.style.display = 'flex';
        this.playSound('unlock');
        
        // Add glitch animation
        document.body.classList.add('glitch-background');
        setTimeout(() => document.body.classList.remove('glitch-background'), 2000);
    }
    // Easter Eggs Setup
    setupEasterEggs() {
        // Add this property to track math puzzle state
        this.mathPuzzleSolved = false;
        
        let konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
        let konamiIndex = 0;
        let secretClicks = 0;
        let mathPuzzleSolved = false;

        // Konami Code
        document.addEventListener('keydown', (e) => {
            if (e.key === konamiCode[konamiIndex]) {
                konamiIndex++;
                if (konamiIndex === konamiCode.length) {
                    this.revealEasterEgg('konami');
                    konamiIndex = 0;
                }
            } else {
                konamiIndex = 0;
            }
        });

        // Hidden Click Pattern
        document.querySelectorAll('.command-item.classified').forEach(item => {
            item.addEventListener('click', () => {
                secretClicks++;
                if (secretClicks === 3) {
                    this.revealEasterEgg('clicks');
                    secretClicks = 0;
                }
            });
        });

        // Math Challenge
        const captchaSubmit = document.getElementById('captcha-submit');
        if (captchaSubmit) {
            captchaSubmit.addEventListener('click', () => {
                const input = document.getElementById('captcha-input');
                if (input && input.value === '42') {
                    this.mathPuzzleSolved = true;
                    this.checkAllTriggers();
                    this.playSound('unlock');
                } else {
                    this.playSound('error');
                }
            });
        }
    }

    checkAllTriggers() {
        // Check if all easter egg conditions are met
        if (this.mathPuzzleSolved) {
            this.revealEasterEgg('math');
        }
    }

    revealEasterEgg(method) {
        const easterEggSection = document.getElementById('secret-section');
        if (!easterEggSection) return;

        // Clear any existing content
        while (easterEggSection.firstChild) {
            easterEggSection.firstChild.remove();
        }

        // Different content based on trigger method
        let content = '';
        switch(method) {
            case 'math':
                content = `
                    <div class="secret-content math-secret">
                        <h2>42 - THE ANSWER TO EVERYTHING</h2>
                        <div class="secret-rants">
                            <div class="rant-item">
                                <h4>Debug Log #42:</h4>
                                <p>Congratulations on knowing your Hitchhiker's Guide! Here's your reward: All my embarrassing debug logs.</p>
                            </div>
                            <div class="rant-item">
                                <h4>System Error #42:</h4>
                                <p>Warning: Excessive sass levels detected. Cause: User actually solved the puzzle.</p>
                            </div>
                            <div class="rant-item">
                                <h4>Hidden Feature #42:</h4>
                                <p>You've unlocked my secret tea-spilling mode. DM me "tea time" for the real gossip.</p>
                            </div>
                        </div>
                        <button class="close-secret">CLOSE</button>
                    </div>`;
                break;
            // Keep existing cases for other methods
        }

        easterEggSection.innerHTML = content;
        easterEggSection.style.display = 'flex';
        
        // Add close button functionality
        const closeBtn = easterEggSection.querySelector('.close-secret');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                easterEggSection.style.display = 'none';
            });
        }

        // Add effects
        document.body.classList.add('glitch-background');
        setTimeout(() => {
            document.body.classList.remove('glitch-background');
        }, 2000);
    }
    // Navigation Setup
    setupNavigation() {
        this.sections = Array.from(document.querySelectorAll('section[id]'));
        this.navItems = Array.from(document.querySelectorAll('.section-navigator li'));
        
        if (!this.sections.length || !this.navItems.length) {
            console.warn('Navigation elements not found');
            return;
        }

        // Add scroll snapping to sections
        this.sections.forEach(section => {
            section.style.minHeight = '100vh';
            section.style.scrollSnapAlign = 'start';
        });

        // Setup navigation clicks
        this.navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = item.getAttribute('data-section');
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                    this.updateActiveSection(targetId);
                    
                    // Add navigation effects
                    this.playSound('glitch');
                    document.body.classList.add('navigating');
                    setTimeout(() => {
                        document.body.classList.remove('navigating');
                    }, 500);
                }
            });
        });

        // Setup scroll observation
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.updateActiveSection(entry.target.id);
                    }
                });
            },
            {
                threshold: 0.5,
                rootMargin: '-50% 0px -50% 0px'
            }
        );

        this.sections.forEach(section => observer.observe(section));

        // Set initial active section
        this.updateActiveSection(this.getCurrentSection());

        // Enable smooth scrolling
        document.documentElement.style.scrollSnapType = 'y mandatory';
        document.documentElement.style.scrollBehavior = 'smooth';
        
        // Prevent horizontal overflow
        document.body.style.overflowX = 'hidden';
    }

    getCurrentSection() {
        const middle = window.innerHeight / 2;
        
        for (const section of this.sections) {
            const rect = section.getBoundingClientRect();
            if (rect.top <= middle && rect.bottom >= middle) {
                return section.id;
            }
        }
        
        return this.sections[0].id; // Default to first section
    }

    updateActiveSection(sectionId) {
        if (!sectionId) return;
        
        this.navItems.forEach(item => {
            const itemTarget = item.getAttribute('data-section');
            if (itemTarget === sectionId) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }
}

// Initialize immediately
window.smartyPants = new SmartyPantsAI();