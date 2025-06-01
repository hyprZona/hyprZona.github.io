// ===== CHAOS CONTROLLER =====
class ChaosController {
    constructor() {
        this.isAudioEnabled = false;
        this.currentChaosLevel = 1;
        this.idleTimer = null;
        // Remove cursor trail related code
        this.lastMouseMove = Date.now();
        
        this.init();
    }
    
    init() {
        // Remove setupCursorChaos()
        this.setupButtonChaos();
        this.setupSigilChaos();
        this.setupAudioChaos();
        this.setupScrollChaos();
        this.setupIdleChaos();
        this.setupCountdownChaos();
        this.setupRandomChaos();
        this.setupImageChaos();
        this.setupEyeTracking();
        this.enableAudioContext();
    }
    
    // ===== BUTTON CHAOS =====
    setupButtonChaos() {
        const mainButton = document.getElementById('main-play-btn');
        const finalButtons = document.querySelectorAll('.final-btn');
        
        // Main cursed button
        mainButton.addEventListener('mouseenter', () => {
            this.playRandomSound();
            this.shakeElement(mainButton);
        });
        
        mainButton.addEventListener('click', (e) => {
            e.preventDefault();
            this.playSound('glitch');
            this.flashScreen();
            
            // Fake download or redirect
            setTimeout(() => {
                alert('Just kidding! This is a demo. But the emotional damage is real. 💀');
            }, 1000);
        });
        
        // Final buttons
        finalButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                
                if (btn.classList.contains('therapist-btn')) {
                    this.openTherapistModal();
                } else {
                    this.playSound('victory');
                    this.celebrateChaos();
                }
            });
        });
    }
    
    // ===== SIGIL CHAOS =====
    setupSigilChaos() {
        const sigils = document.querySelectorAll('.sigil');
        
        sigils.forEach(sigil => {
            sigil.addEventListener('click', () => {
                const fragmentId = sigil.dataset.reveals;
                const fragment = document.querySelector(`[data-fragment="${fragmentId}"]`);
                
                if (fragment) {
                    fragment.classList.remove('hidden');
                    fragment.classList.add('visible');
                    sigil.classList.add('clicked');
                    
                    this.playSound('mystical');
                    this.addRandomBloodDrip(fragment);
                }
            });
            
            // Random sigil twitch
            setInterval(() => {
                if (Math.random() < 0.1) {
                    sigil.style.animation = 'sigil-chaos 0.3s ease';
                    setTimeout(() => {
                        sigil.style.animation = 'sigil-pulse 2s ease-in-out infinite';
                    }, 300);
                }
            }, 2000);
        });
    }
    
    // ===== AUDIO CHAOS =====
    setupAudioChaos() {
        // Sound effect library
        this.sounds = {
            fart: this.createFartSound(),
            moan: this.createMoanSound(),
            glitch: this.createGlitchSound(),
            scream: this.createScreamSound(),
            mystical: this.createMysticalSound(),
            victory: this.createVictorySound()
        };
        
        // Setup hover sounds for various elements
        const hoverElements = document.querySelectorAll('button, .sigil, .screenshot-item, .postit');
        
        hoverElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                if (this.isAudioEnabled) {
                    this.playRandomSound();
                }
            });
        });
    }
    
    enableAudioContext() {
        // Enable audio on first user interaction
        document.addEventListener('click', () => {
            if (!this.isAudioEnabled) {
                this.isAudioEnabled = true;
                this.showAudioNotification();
            }
        }, { once: true });
    }
    
    createFartSound() {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.type = 'sawtooth';
        oscillator.frequency.setValueAtTime(80, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(40, audioContext.currentTime + 0.3);
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        return () => {
            if (audioContext.state === 'suspended') audioContext.resume();
            oscillator.start();
            oscillator.stop(audioContext.currentTime + 0.3);
        };
    }
    
    createMoanSound() {
        return () => {
            const utterance = new SpeechSynthesisUtterance('Ahhhh~');
            utterance.pitch = 1.5;
            utterance.rate = 0.5;
            utterance.volume = 0.3;
            speechSynthesis.speak(utterance);
        };
    }
    
    createGlitchSound() {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.type = 'square';
        oscillator.frequency.setValueAtTime(440, audioContext.currentTime);
        gainNode.gain.setValueAtTime(0.5, audioContext.currentTime);
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        return () => {
            if (audioContext.state === 'suspended') audioContext.resume();
            oscillator.start();
            setTimeout(() => {
                gainNode.gain.setValueAtTime(0, audioContext.currentTime);
                oscillator.stop(audioContext.currentTime + 0.1);
            }, 100);
        };
    }
    
    createScreamSound() {
        const audio = new Audio('sounds/scream.mp3');
        audio.volume = 0.5;
        
        return () => {
            if (this.isAudioEnabled) {
                audio.currentTime = 0;
                audio.play();
            }
        };
    }
    createMysticalSound() {
        const audio = new Audio('sounds/mystical.mp3');
        audio.volume = 0.5;
        
        return () => {
            if (this.isAudioEnabled) {
                audio.currentTime = 0;
                audio.play();
            }
        };
    }
    
    createVictorySound() {
        const audio = new Audio('sounds/victory.mp3');
        audio.volume = 0.5;
        
        return () => {
            if (this.isAudioEnabled) {
                audio.currentTime = 0;
                audio.play();
            }
        };
    }
}

function initializeLoreSection() {
    const sigils = document.querySelectorAll('.sigil.clickable');
    const fragments = document.querySelectorAll('.lore-fragment');
    const firstFragment = document.querySelector('.lore-fragment[data-fragment="1"]');
    
    // Ensure first fragment is always visible
    if (firstFragment) {
        firstFragment.classList.remove('hidden');
        firstFragment.classList.add('visible');
    }

    // Setup other fragments
    fragments.forEach(fragment => {
        if (fragment !== firstFragment) {
            fragment.classList.add('hidden');
            fragment.classList.remove('visible');
        }
    });

    sigils.forEach(sigil => {
        sigil.addEventListener('click', () => {
            const targetId = sigil.getAttribute('data-reveals');
            const targetFragment = document.querySelector(`.lore-fragment[data-fragment="${targetId}"]`);
            
            if (targetFragment && targetFragment !== firstFragment) {
                // Hide all fragments except the first one
                fragments.forEach(f => {
                    if (f !== firstFragment && f !== targetFragment) {
                        f.classList.add('hidden');
                        f.classList.remove('visible');
                    }
                });
                
                // Show target fragment
                targetFragment.classList.remove('hidden');
                targetFragment.classList.add('visible');
                
                // Update sigil states
                sigils.forEach(s => s.classList.remove('active'));
                sigil.classList.add('active');
            }
        });
    });
}

// Add at the end of the file
function initializeSectionNavigation() {
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.section-navigator li');
    
    // Update active section based on scroll position
    function updateActiveSection() {
        const scrollPosition = window.scrollY;
        
        sections.forEach((section, index) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop - window.innerHeight/2 &&
                scrollPosition < sectionTop + sectionHeight - window.innerHeight/2) {
                navItems.forEach(item => item.classList.remove('active'));
                navItems[index].classList.add('active');
            }
        });
    }

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

    // Update active section on scroll
    window.addEventListener('scroll', updateActiveSection);
    
    // Initial update
    updateActiveSection();
}

// Call initialization when document is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeLoreSection();
    initializeSectionNavigation();
});

// Add to your existing JS file
function initializeSelfDestruct() {
    let countdown = 60;
    const countdownElement = document.getElementById('countdown');
    let timer;

    // Check if user is in final section
    function checkFinalSection() {
        const finalSection = document.getElementById('final');
        const rect = finalSection.getBoundingClientRect();
        return rect.top <= window.innerHeight && rect.bottom >= 0;
    }

    // Start countdown when final section is visible
    function startCountdown() {
        if (checkFinalSection() && !timer) {
            timer = setInterval(() => {
                countdown--;
                countdownElement.textContent = countdown;

                if (countdown <= 5) {
                    document.body.style.animation = 'burn 1s infinite';
                }

                if (countdown <= 0) {
                    clearInterval(timer);
                    // Instead of window.close(), redirect to a blank page
                    document.body.innerHTML = '';
                    document.body.style.background = 'orange';
                    setTimeout(() => {
                        window.location.href = '404.html';
                    }, 1000);
                }
            }, 1000);
        }
    }

    // Add burn animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes burn {
            0% { filter: brightness(1) contrast(1); }
            50% { filter: brightness(1.5) contrast(2) hue-rotate(90deg); }
            100% { filter: brightness(1) contrast(1); }
        }
    `;
    document.head.appendChild(style);

    // Check visibility on scroll
    window.addEventListener('scroll', startCountdown);
    
    // Initial check
    startCountdown();
}

// Call when document is loaded
document.addEventListener('DOMContentLoaded', initializeSelfDestruct);