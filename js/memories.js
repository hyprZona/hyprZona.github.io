// Beyond the Illusions - Mystical Interactive Script

class MysticalWebsite {
    constructor() {
        // Initialize properties first
        this.runeSequence = [];
        this.correctSequence = ['fire', 'water', 'earth', 'nature', 'wind', 'shadow'];
        this.unlockedFolklore = new Set();
        this.prophecyTexts = []; // Renamed from changingTexts
        this.ambientSounds = {};
        this.glitchTimeout = null;

        // Initialize core functions
        this.setupAudioSystem();
        
        // Bind methods after they're initialized
        this.bindMethods();
        
        // Initialize the site
        this.init();

        // Ensure characters are visible even if animations fail
        setTimeout(() => {
            document.querySelectorAll('.character-banner-container').forEach(banner => {
                if (!banner.classList.contains('revealed')) {
                    banner.classList.add('revealed');
                }
            });
        }, 1000);
    }

    bindMethods() {
        // List all methods that need binding
        const methodsToBind = [
            'handleNavClick',
            'enterWarZone',
            'handleRuneClick',
            'activateCharacterEffects',
            'deactivateCharacterEffects',
            'activateScroll',
            'revealRedacted',
            'handleRiddleInput',
            'handleCTAClick',
            'closeSecretPage',
            'playSound'
        ];

        // Bind each method
        methodsToBind.forEach(method => {
            if (this[method]) {
                this[method] = this[method].bind(this);
            }
        });
    }

    init() {
        try {
            this.setupEventListeners();
            this.initializeAnimations();
            this.startAmbientEffects();
            this.initializeChangingTexts();
            this.initializeRuneSystem(); // Add this line
            this.initializeRedactedText();
            this.initializeSecretSystem();
        } catch (error) {
            console.error('Initialization error:', error);
        }
    }

    // Renamed method to avoid confusion
    initializeChangingTexts() {
        const changingText = document.querySelector('.changing-text');
        if (changingText) {
            const texts = [
                "The sixth was never lost",
                "She walked away unseen",
                "One lives, in silence"
            ];
            let currentIndex = 0;

            setInterval(() => {
                currentIndex = (currentIndex + 1) % texts.length;
                this.morphText(changingText, texts[currentIndex]);
            }, 4000);
        }
    }

    morphText(element, newText) {
        // Add glitch effect
        element.style.opacity = '0';
        element.classList.add('text-morphing');
        
        setTimeout(() => {
            element.textContent = newText;
            element.style.opacity = '1';
            element.classList.remove('text-morphing');
        }, 300);
    }

    setupEventListeners() {
        // Navigation smooth scrolling
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', this.handleNavClick.bind(this));
        });

        // War Zone button
        const warBtn = document.getElementById('enterWarBtn');
        if (warBtn) {
            warBtn.addEventListener('click', this.enterWarZone.bind(this));
            warBtn.addEventListener('mouseenter', this.playHoverSound.bind(this));
        }

        // Rune circles
        document.querySelectorAll('.rune-circle').forEach(rune => {
            rune.addEventListener('click', this.handleRuneClick.bind(this));
        });

        // Character banners
        document.querySelectorAll('.character-banner').forEach(banner => {
            banner.addEventListener('mouseenter', this.activateCharacterEffects.bind(this));
            banner.addEventListener('mouseleave', this.deactivateCharacterEffects.bind(this));
        });

        // Scroll fragments
        document.querySelectorAll('.scroll-fragment').forEach(scroll => {
            scroll.addEventListener('click', this.activateScroll.bind(this));
        });

        // Redacted lines
        document.querySelectorAll('.redacted-line').forEach(line => {
            line.addEventListener('click', this.revealRedacted.bind(this));
        });

        // Folklore riddles
        const riddleInput = document.getElementById('riddleInput');
        if (riddleInput) {
            riddleInput.addEventListener('keypress', this.handleRiddleInput.bind(this));
        }

        // CTA buttons
        document.querySelectorAll('.cta-btn').forEach(btn => {
            btn.addEventListener('click', this.handleCTAClick.bind(this));
        });

        // Secret page closer
        const closeSecret = document.getElementById('closeSecret');
        if (closeSecret) {
            closeSecret.addEventListener('click', this.closeSecretPage.bind(this));
        }

        // Glitch scroll effect
        const glitchScroll = document.querySelector('.glitch-scroll');
        if (glitchScroll) {
            this.setupGlitchEffect(glitchScroll);
        }

        // Window events
        window.addEventListener('scroll', this.handleScroll.bind(this));
        window.addEventListener('resize', this.handleResize.bind(this));
    }

    handleNavClick(e) {
        e.preventDefault();
        const target = e.target.getAttribute('href');
        const element = document.querySelector(target);
        
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Add mystical flash effect
            this.createMysticalFlash(element);
        }
    }

    createMysticalFlash(element) {
        const flash = document.createElement('div');
        flash.style.cssText = `
            position: absolute;
            top: -50px;
            left: 50%;
            transform: translateX(-50%);
            width: 100px;
            height: 100px;
            background: radial-gradient(circle, var(--arcane-gold) 0%, transparent 70%);
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
            animation: mysticalFlash 1s ease-out forwards;
        `;
        
        element.style.position = 'relative';
        element.appendChild(flash);
        
        setTimeout(() => {
            flash.remove();
        }, 1000);
    }

    enterWarZone() {
        const warBtn = document.getElementById('enterWarBtn');
        if (!warBtn) return;

        // Create epic flash effect
        const flash = document.createElement('div');
        flash.className = 'war-flash';
        document.body.appendChild(flash);

        // Play thunder sound
        this.playSound('thunder');

        // Trigger screen shake
        document.body.classList.add('screen-shake');

        // Animate button
        warBtn.classList.add('war-activated');

        setTimeout(() => {
            flash.remove();
            document.body.classList.remove('screen-shake');
            
            // Redirect to demo or trigger download
            this.initiateWarSequence();
        }, 2000);
    }

    initiateWarSequence() {
        // Show loading sequence
        const loadingSequence = [
            "Accessing memory fragments...",
            "Calibrating reality anchors...",
            "Establishing neural link...",
            "Warning: Memory corruption detected...",
            "Initializing war protocol..."
        ];

        this.showLoadingSequence(loadingSequence, () => {
            // Redirect to demo page or trigger download
            window.location.href = 'demo/index.html';
        });
    }

    showLoadingSequence(messages, callback) {
        const overlay = document.createElement('div');
        overlay.className = 'loading-overlay';
        
        const container = document.createElement('div');
        container.className = 'loading-container';
        
        overlay.appendChild(container);
        document.body.appendChild(overlay);

        let index = 0;
        const interval = setInterval(() => {
            if (index < messages.length) {
                const message = document.createElement('div');
                message.className = 'loading-message';
                message.textContent = messages[index];
                container.appendChild(message);
                
                // Add glitch effect
                this.addGlitchEffect(message);
                
                index++;
            } else {
                clearInterval(interval);
                setTimeout(callback, 1000);
            }
        }, 1000);
    }

    activateCharacterEffects(e) {
        const banner = e.currentTarget;
        const element = banner.dataset.element;
        
        // Add elemental particles
        this.createElementalParticles(banner, element);
        
        // Play hover sound
        this.playSound('character-hover');
        
        // Add power surge effect
        banner.classList.add('power-surge');
    }

    createElementalParticles(banner, element) {
        const particles = document.createElement('div');
        particles.className = `elemental-particles ${element}-particles`;
        banner.appendChild(particles);

        // Remove after animation
        setTimeout(() => particles.remove(), 1000);
    }

    revealRedacted(e) {
        const line = e.currentTarget;
        const text = line.dataset.reveal;
        
        if (!text) return;

        // Create glitch effect
        this.createGlitchText(line, text);
        
        // Play reveal sound
        this.playSound('reveal');
        
        // Mark as revealed
        line.classList.add('revealed');
    }

    createGlitchText(element, finalText) {
        const glitchDuration = 1000;
        const steps = 10;
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()';
        
        let startTime = Date.now();
        
        const glitch = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const progress = elapsed / glitchDuration;
            
            if (progress >= 1) {
                clearInterval(glitch);
                element.textContent = finalText;
                return;
            }
            
            // Generate glitch text
            let glitchText = '';
            for (let i = 0; i < finalText.length; i++) {
                if (Math.random() < progress) {
                    glitchText += finalText[i];
                } else {
                    glitchText += chars[Math.floor(Math.random() * chars.length)];
                }
            }
            
            element.textContent = glitchText;
        }, glitchDuration / steps);
    }

    checkMoonPhase() {
        const today = new Date();
        const phase = this.getMoonPhase(today);
        
        if (phase === 0) { // Full moon
            document.body.classList.add('full-moon');
            this.revealHiddenContent();
        }
    }

    getMoonPhase(date) {
        // Moon phase calculation
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        
        // Complex moon phase calculation
        // Returns value between 0-1, where 0 = full moon
        // ... moon phase calculation math ...
        
        return 0; // Placeholder
    }

    revealHiddenContent() {
        const hiddenElements = document.querySelectorAll('.moon-sensitive');
        hiddenElements.forEach(element => {
            element.classList.add('revealed');
        });
    }

    // Add sound effects system
    setupAudioSystem() {
        // Define all sounds with valid SoundJay URLs
        this.sounds = {
            thunder: new Audio('https://www.soundjay.com/nature/sounds/rain-03.mp3'),
            reveal: new Audio('https://www.soundjay.com/buttons/sounds/button-09a.mp3'),
            'character-hover': new Audio('https://www.soundjay.com/buttons/sounds/button-16a.mp3'),
            glitch: new Audio('https://www.soundjay.com/misc/sounds/magic-chime-03.mp3'),
            unlock: new Audio('https://www.soundjay.com/misc/sounds/briefcase-lock-4.mp3'),
            hover: new Audio('https://www.soundjay.com/buttons/sounds/button-17.mp3'),
            rune: new Audio('https://www.soundjay.com/misc/sounds/magic-chime-01.mp3'),
            scroll: new Audio('https://www.soundjay.com/misc/sounds/page-flip-01a.mp3'),
            error: new Audio('https://www.soundjay.com/misc/sounds/fail-buzzer-01.mp3')
        };

        // Improved sound initialization with error handling
        Object.entries(this.sounds).forEach(([name, sound]) => {
            // Add error handling for each sound
            sound.addEventListener('error', (e) => {
                console.warn(`Failed to load sound: ${name}`, e);
            });

            // Set properties
            sound.volume = 0.3;
            sound.preload = 'auto';

            // Load the sound
            try {
                sound.load();
            } catch (err) {
                console.warn(`Error loading sound: ${name}`, err);
            }
        });
    }

    // Improved sound playing function with fallback
    playSound(soundName) {
        if (!this.sounds[soundName]) {
            console.warn(`Sound not found: ${soundName}`);
            return;
        }

        const sound = this.sounds[soundName];

        // Try to play the sound with error handling and fallback
        try {
            // Create a new instance for overlapping sounds
            const soundInstance = new Audio(sound.src);
            soundInstance.volume = sound.volume;
            
            soundInstance.play()
                .catch(err => {
                    console.warn(`Sound playback failed: ${soundName}`, err);
                    // Try fallback for interaction requirement
                    document.addEventListener('click', () => {
                        soundInstance.play().catch(e => 
                            console.warn(`Fallback playback failed: ${soundName}`, e)
                        );
                    }, { once: true });
                });
        } catch (err) {
            console.warn(`Error playing sound: ${soundName}`, err);
        }
    }

    playHoverSound() {
        this.playSound('hover');
    }

    // Update the rune click handler
    handleRuneClick(e) {
        const rune = e.currentTarget;
        const runeType = rune.getAttribute('data-rune');
        
        // Add visual feedback
        rune.classList.add('activated');
        this.playSound('rune');
        
        this.runeSequence.push(runeType);
        
        // Check sequence length
        if (this.runeSequence.length === this.correctSequence.length) {
            // Convert arrays to strings for comparison
            const currentSequence = JSON.stringify(this.runeSequence);
            const correctSequence = JSON.stringify(this.correctSequence);
            
            if (currentSequence === correctSequence) {
                this.playSound('unlock');
                this.revealHiddenTruth();
            } else {
                this.playSound('error');
                // Reset sequence
                this.runeSequence = [];
                document.querySelectorAll('.rune-circle').forEach(r => {
                    r.classList.remove('activated');
                });
            }
        }
    }

    revealHiddenTruth() {
        const hiddenTruth = document.getElementById('hiddenTruth');
        if (hiddenTruth) {
            hiddenTruth.classList.add('revealed');
            
            // Add close functionality
            const closeBtn = document.getElementById('closeHiddenTruth');
            if (closeBtn) {
                closeBtn.addEventListener('click', () => {
                    hiddenTruth.classList.remove('revealed');
                    this.playSound('glitch');
                    
                    // Reset rune sequence
                    this.runeSequence = [];
                    document.querySelectorAll('.rune-circle').forEach(rune => {
                        rune.classList.remove('activated');
                    });
                });
            }
        }
    }

    initializeRuneSystem() {
        const runeCircles = document.querySelectorAll('.rune-circle');
        
        runeCircles.forEach(rune => {
            rune.addEventListener('click', (e) => {
                const runeElement = e.currentTarget;
                const runeType = runeElement.getAttribute('data-rune');
                
                // Visual feedback
                runeElement.classList.add('activated');
                this.playSound('rune');
                
                // Add to sequence
                this.runeSequence.push(runeType);
                
                // Check sequence
                if (this.runeSequence.length === this.correctSequence.length) {
                    if (this.checkRuneSequence()) {
                        this.playSound('unlock');
                        this.revealSecretPage();
                    } else {
                        this.playSound('error');
                        this.resetRuneSequence();
                    }
                }
            });
        });
    }

    revealHiddenScroll() {
        const hiddenScroll = document.createElement('div');
        hiddenScroll.className = 'scroll-fragment revealed';
        hiddenScroll.innerHTML = `
            <div class="scroll-content">
                <p class="prophecy-text">The elements aligned as one... The truth emerges from chaos.</p>
                <p class="prophecy-text changing-text">Before they were Supreme, they were something far more... entertaining.</p>
            </div>
        `;
        
        document.querySelector('.cracked-scrolls').appendChild(hiddenScroll);
        this.playSound('unlock');
    }

    activateScroll(e) {
        const scroll = e.currentTarget;
        
        // Add activation effect
        scroll.classList.add('scroll-active');
        
        // Play scroll sound
        this.playSound('scroll');
        
        // Add particle effect
        this.createScrollParticles(scroll);
        
        // Reveal hidden content if any
        const hiddenContent = scroll.querySelector('.hidden-content');
        if (hiddenContent) {
            hiddenContent.classList.add('revealed');
        }
    }

    createScrollParticles(element) {
        const particles = document.createElement('div');
        particles.className = 'scroll-particles';
        element.appendChild(particles);
        
        // Clean up particles after animation
        setTimeout(() => particles.remove(), 1000);
    }

    checkRuneSequence() {
        return this.runeSequence.every((rune, index) => 
            rune === this.correctSequence[index]
        );
    }

    revealSecretPage() {
        const secretPage = document.getElementById('secretPage');
        if (secretPage) {
            secretPage.classList.remove('hidden');
            this.playSound('unlock');
            
            // Add close functionality
            const closeBtn = document.getElementById('closeSecret');
            if (closeBtn) {
                closeBtn.addEventListener('click', () => {
                    secretPage.classList.add('hidden');
                    this.playSound('glitch');
                });
            }
        }
    }

    resetRuneSequence() {
        this.runeSequence = [];
        
        // Reset all rune visuals
        document.querySelectorAll('.rune-circle').forEach(rune => {
            rune.classList.remove('activated');
        });
        
        // Play error sound
        this.playSound('error');
        
        // Add error feedback
        document.body.classList.add('sequence-error');
        setTimeout(() => {
            document.body.classList.remove('sequence-error');
        }, 500);
    }

    // Update the riddle checking method
    handleRiddleInput(e) {
        if (e.key === 'Enter') {
            const input = e.target;
            const answer = input.value.toLowerCase().trim();
            
            const riddleAnswers = {
                'betrayal': 'The first truth is revealed...',
                'sixfold': 'The second seal breaks...',
                'origin': 'The final lock shatters...'
            };

            if (riddleAnswers[answer]) {
                // Find and unlock corresponding entry
                const entry = document.querySelector(`.folklore-entry[data-riddle="${answer}"]`);
                if (entry) {
                    entry.classList.remove('locked');
                    const lock = entry.querySelector('.entry-lock');
                    const content = entry.querySelector('.entry-content');
                    
                    if (lock) lock.remove();
                    if (content) content.classList.remove('hidden');
                    
                    // Add reveal effect
                    entry.style.animation = 'unlockReveal 0.5s ease-out';
                    this.playSound('unlock');
                    
                    // Clear input
                    input.value = '';
                    
                    // Check if all entries are unlocked
                    this.checkAllEntriesUnlocked();
                }
            } else {
                // Wrong answer feedback
                input.classList.add('error');
                this.playSound('error');
                setTimeout(() => input.classList.remove('error'), 500);
            }
        }
    }

    checkAllEntriesUnlocked() {
        const allEntries = document.querySelectorAll('.folklore-entry');
        const unlockedEntries = document.querySelectorAll('.folklore-entry:not(.locked)');
        
        if (allEntries.length === unlockedEntries.length) {
            this.revealSecretPage();
        }
    }

    closeSecretPage() {
        const secretPage = document.querySelector('.secret-page');
        if (secretPage) {
            secretPage.classList.remove('active');
            setTimeout(() => {
                secretPage.style.display = 'none';
            }, 1000);
        }
    }

    setupGlitchEffect(element) {
        let stareTime = 0;
        
        element.addEventListener('mouseover', () => {
            stareTime = Date.now();
            this.glitchTimeout = setTimeout(() => {
                this.triggerGlitchSequence(element);
            }, 3000); // Trigger after 3 seconds of staring
        });
        
        element.addEventListener('mouseout', () => {
            clearTimeout(this.glitchTimeout);
            stareTime = 0;
        });
    }

    handleScroll() {
        // Update scroll-based effects
        this.updateParallaxEffects();
        this.checkScrollReveal();
    }

    handleResize() {
        // Update responsive elements
        this.updateResponsiveLayout();
    }

    deactivateCharacterEffects(e) {
        const banner = e.currentTarget;
        banner.classList.remove('power-surge');
        
        // Remove any remaining particle effects
        const particles = banner.querySelector('.elemental-particles');
        if (particles) {
            particles.remove();
        }
    }

    // Add other helper methods
    updateParallaxEffects() {
        requestAnimationFrame(() => {
            const scrolled = window.pageYOffset;
            document.querySelectorAll('.parallax').forEach(element => {
                const speed = element.dataset.speed || 0.5;
                element.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });
    }

    checkScrollReveal() {
        document.querySelectorAll('.scroll-reveal').forEach(element => {
            if (this.isInViewport(element)) {
                element.classList.add('revealed');
            }
        });
    }

    updateResponsiveLayout() {
        // Update any responsive elements that need manual adjustment
        const viewportWidth = window.innerWidth;
        document.body.classList.toggle('mobile', viewportWidth < 768);
    }

    isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= window.innerHeight &&
            rect.right <= window.innerWidth
        );
    }

    checkRiddleAnswer(answer) {
        const riddles = {
            'silence': 'The first truth is revealed...',
            'shadow': 'The second seal breaks...',
            'betrayal': 'The final lock shatters...'
        };
        
        if (riddles[answer]) {
            this.revealRiddleContent(answer, riddles[answer]);
        } else {
            this.showRiddleError();
        }
    }

    revealRiddleContent(answer, message) {
        // Find the riddle container
        const riddleContainer = document.querySelector(`[data-riddle="${answer}"]`);
        if (!riddleContainer) return;

        // Create reveal effect
        this.addGlitchEffect(riddleContainer);
        
        // Show success message
        const messageElement = document.createElement('div');
        messageElement.className = 'riddle-message';
        messageElement.textContent = message;
        riddleContainer.appendChild(messageElement);

        // Add revealed class
        riddleContainer.classList.add('revealed');
        
        // Play success sound
        this.playSound('unlock');

        // Check if all riddles are solved
        this.checkAllRiddles();
    }

    showRiddleError() {
        // Visual feedback for wrong answer
        const riddleInput = document.getElementById('riddleInput');
        if (!riddleInput) return;

        riddleInput.classList.add('error');
        
        // Play error sound
        this.playSound('error');
        
        // Clear error state
        setTimeout(() => {
            riddleInput.classList.remove('error');
        }, 1000);
    }

    addGlitchEffect(element) {
        // Add glitch class
        element.classList.add('glitch-effect');
        
        // Create glitch layers
        const content = element.innerHTML;
        const glitch1 = document.createElement('div');
        const glitch2 = document.createElement('div');
        
        glitch1.className = 'glitch-layer glitch-layer--1';
        glitch2.className = 'glitch-layer glitch-layer--2';
        
        glitch1.innerHTML = content;
        glitch2.innerHTML = content;
        
        element.appendChild(glitch1);
        element.appendChild(glitch2);
        
        // Remove glitch effect after animation
        setTimeout(() => {
            element.classList.remove('glitch-effect');
            glitch1.remove();
            glitch2.remove();
        }, 2000);
    }

    checkAllRiddles() {
        const totalRiddles = document.querySelectorAll('[data-riddle]').length;
        const solvedRiddles = document.querySelectorAll('[data-riddle].revealed').length;
        
        if (totalRiddles === solvedRiddles) {
            this.onAllRiddlesSolved();
        }
    }

    onAllRiddlesSolved() {
        // Create final reveal effect
        const folkloreSection = document.querySelector('.folklore-section');
        if (!folkloreSection) return;

        // Add epic reveal animation
        this.addGlitchEffect(folkloreSection);
        
        // Play special sound
        this.playSound('unlock');
        
        // Show hidden content
        const hiddenContent = document.querySelector('.folklore-hidden');
        if (hiddenContent) {
            setTimeout(() => {
                hiddenContent.classList.add('revealed');
            }, 2000);
        }
    }

    initializeAnimations() {
        // Check if GSAP is available
        if (typeof gsap === 'undefined') {
            console.warn('GSAP not loaded. Falling back to basic animations.');
            this.initializeBasicAnimations();
            return;
        }

        // Initialize GSAP with ScrollTrigger
        gsap.registerPlugin(ScrollTrigger);

        // Sigil split animation
        const sigil = document.querySelector('.glyph-sigil');
        if (sigil) {
            gsap.to(sigil, {
                scrollTrigger: {
                    trigger: sigil,
                    start: 'top center',
                    toggleActions: 'play none none reverse'
                },
                scaleX: 1.2,
                duration: 2,
                ease: 'power2.inOut'
            });
        }

        // Character banner animations
        const characterBanners = document.querySelectorAll('.character-banner-container');
        const observerOptions = {
            threshold: 0.2,
            rootMargin: '0px'
        };

        const bannerObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    // Optional: Stop observing after reveal
                    bannerObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);

        characterBanners.forEach(banner => {
            bannerObserver.observe(banner);
        });

        // Scroll fragments reveal
        gsap.utils.toArray('.scroll-fragment').forEach((scroll, index) => {
            gsap.from(scroll, {
                scrollTrigger: {
                    trigger: scroll,
                    start: 'top bottom-=50',
                    toggleActions: 'play none none reverse'
                },
                opacity: 0,
                y: 30,
                rotation: gsap.utils.random(-5, 5),
                duration: 1,
                delay: index * 0.2,
                ease: 'power2.out'
            });
        });

        // Floating runes animation
        const runes = document.querySelectorAll('.floating-rune');
        runes.forEach(rune => {
            gsap.to(rune, {
                y: 'random(-20, 20)',
                x: 'random(-20, 20)',
                rotation: 'random(-15, 15)',
                duration: 'random(2, 4)',
                ease: 'sine.inOut',
                repeat: -1,
                yoyo: true
            });
        });

        // Add parallax effect to background layers
        gsap.utils.toArray('.parallax-layer').forEach(layer => {
            const depth = layer.dataset.depth || 0.1;
            gsap.to(layer, {
                scrollTrigger: {
                    trigger: layer,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true
                },
                y: (i, target) => -ScrollTrigger.maxScroll(window) * depth,
                ease: 'none'
            });
        });

        // Initialize ambient background effects
        this.initializeAmbientEffects();
    }

    initializeBasicAnimations() {
        // Basic CSS animations as fallback
        document.querySelectorAll('.character-banner').forEach(banner => {
            banner.style.opacity = '0';
            banner.style.transform = 'translateY(50px)';
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        banner.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                        banner.style.opacity = '1';
                        banner.style.transform = 'translateY(0)';
                        observer.unobserve(banner);
                    }
                });
            }, { threshold: 0.1 });
            
            observer.observe(banner);
        });

        // Basic animations for other elements
        const animateOnScroll = (elements, className) => {
            elements.forEach(element => {
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            element.classList.add(className);
                            observer.unobserve(element);
                        }
                    });
                }, { threshold: 0.1 });
                
                observer.observe(element);
            });
        };

        animateOnScroll(document.querySelectorAll('.scroll-fragment'), 'fade-in');
        animateOnScroll(document.querySelectorAll('.gameplay-feature'), 'fade-in');
        animateOnScroll(document.querySelectorAll('.folklore-entry'), 'fade-in');
    }

    initializeAmbientEffects() {
        // Create drifting embers
        const emberContainer = document.querySelector('.ember-container');
        if (emberContainer) {
            for (let i = 0; i < 50; i++) {
                const ember = document.createElement('div');
                ember.className = 'ember';
                ember.style.left = `${Math.random() * 100}%`;
                ember.style.animationDuration = `${gsap.utils.random(2, 6)}s`;
                ember.style.animationDelay = `${Math.random() * 2}s`;
                emberContainer.appendChild(ember);
            }
        }

        // Initialize fog effect
        const fogLayers = document.querySelectorAll('.fog-layer');
        fogLayers.forEach((fog, index) => {
            gsap.to(fog, {
                x: index % 2 === 0 ? '+=100%' : '-=100%',
                repeat: -1,
                duration: 20 + index * 5,
                ease: 'none'
            });
        });
    }

    startAmbientEffects() {
        // Start background effects
        this.startBackgroundParticles();
        this.startAmbientSounds();
        this.startRuneFloating();
    }

    startBackgroundParticles() {
        const particleContainer = document.querySelector('.ambient-background');
        if (!particleContainer) return;

        // Create particles
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'ambient-particle';
            particle.style.setProperty('--delay', `${Math.random() * 5}s`);
            particle.style.setProperty('--duration', `${5 + Math.random() * 5}s`);
            particleContainer.appendChild(particle);
        }
    }

    startAmbientSounds() {
        this.ambientSounds = {
            background: new Audio('https://www.soundjay.com/free-music/sounds/heart-of-the-sea-01.mp3'),
            whispers: new Audio('https://www.soundjay.com/human/sounds/hair-brush-1.mp3')
        };

        // Set properties for ambient sounds
        Object.values(this.ambientSounds).forEach(sound => {
            sound.loop = true;
            sound.volume = 0.1;
        });

        // Start ambient sounds on user interaction
        document.addEventListener('click', () => {
            Object.values(this.ambientSounds).forEach(sound => {
                sound.play().catch(() => {
                    console.warn('Ambient sound autoplay blocked');
                });
            });
        }, { once: true });
    }

    startRuneFloating() {
        document.querySelectorAll('.floating-rune').forEach(rune => {
            rune.style.setProperty('--float-duration', `${3 + Math.random() * 2}s`);
            rune.style.setProperty('--float-delay', `${Math.random() * 2}s`);
        });
    }

    morphText(element, newText) {
        // Create glitch effect during text change
        element.classList.add('text-morphing');
        
        setTimeout(() => {
            element.textContent = newText;
            element.classList.remove('text-morphing');
        }, 500);
    }

    initializeRedactedText() {
        document.querySelectorAll('.redacted').forEach(text => {
            const originalText = text.textContent;
            const redactedText = '█'.repeat(originalText.length);
            text.textContent = redactedText;
            text.dataset.original = originalText;

            text.addEventListener('mouseover', () => {
                if (Math.random() < 0.3) { // 30% chance to reveal
                    this.glitchReveal(text);
                }
            });
        });
    }

    glitchReveal(element) {
        const original = element.dataset.original;
        const steps = 10;
        let step = 0;

        const glitchInterval = setInterval(() => {
            if (step >= steps) {
                clearInterval(glitchInterval);
                element.textContent = original;
                return;
            }

            element.textContent = original.split('').map(char => 
                Math.random() > step/steps ? '█' : char
            ).join('');

            step++;
        }, 50);
    }

    // Add to MysticalWebsite class
    initializeSecretSystem() {
        // Secret can be triggered by:
        // 1. Completing all folklore riddles
        // 2. Clicking the prepare button with correct timing
        // 3. Finding hidden rune sequence
        
        const prepareBtn = document.getElementById('prepareBtn');
        if (prepareBtn) {
            let clickCount = 0;
            let lastClickTime = 0;
            
            prepareBtn.addEventListener('click', () => {
                const currentTime = new Date().getTime();
                
                if (currentTime - lastClickTime < 500) { // Double click within 500ms
                    clickCount++;
                    if (clickCount === 3) { // Triple click triggers secret
                        this.revealSecretPage();
                    }
                } else {
                    clickCount = 1;
                }
                
                lastClickTime = currentTime;
            });
        }
    }

    // Add error handling wrapper
    safeExecute(fn, context = 'Unknown') {
        try {
            fn();
        } catch (error) {
            console.error(`Error in ${context}:`, error);
        }
    }
}

// Initialize with error handling
document.addEventListener('DOMContentLoaded', () => {
    try {
        window.mysticalWebsite = new MysticalWebsite();
    } catch (error) {
        console.error('Failed to initialize MysticalWebsite:', error);
        
        // Attempt recovery
        const recoveryInterval = setInterval(() => {
            try {
                window.mysticalWebsite = new MysticalWebsite();
                clearInterval(recoveryInterval);
                console.log('Successfully recovered MysticalWebsite initialization');
            } catch (error) {
                console.warn('Recovery attempt failed, will retry...');
            }
        }, 5000);
    }
});

function initializeNavigation() {
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.section-navigator li');
    
    // Update active section based on scroll position
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const targetId = entry.target.id;
                updateActiveNav(targetId);
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));

    // Add click handlers
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const targetId = item.getAttribute('data-section');
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    function updateActiveNav(sectionId) {
        navItems.forEach(item => {
            const itemTarget = item.getAttribute('data-section');
            item.classList.toggle('active', itemTarget === sectionId);
        });
    }
}

// Call on DOMContentLoaded
document.addEventListener('DOMContentLoaded', initializeNavigation);