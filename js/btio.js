// Beyond the Illusions - Interactive Effects

// Update the section navigation array in btio.js
const sectionOrder = [
    'landing',
    'about',
    'dans-descent',
    'features',
    'devlog',
    'atmosphere',
    'folklore', // Add this
    'endings',
    'download'
];

class AtmosphericEffects {
    constructor() {
        this.isAudioPlaying = false;
        this.audioTimeout = null;
        this.crowTimer = null;
        this.glitchTimer = null;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.startAmbientEffects();
        this.initializeMemoryFragments();
        this.setupAudioControls();
        this.initializeScrollEffects();
        this.setupGlitchEffects();
    }

    setupEventListeners() {
        // Whisper glitch on hero hover
        const hero = document.querySelector('.hero');
        const whisper = document.getElementById('whisper');
        
        if (hero && whisper) {
            hero.addEventListener('mouseenter', () => {
                whisper.style.animationDuration = '2s';
            });
            
            hero.addEventListener('mouseleave', () => {
                whisper.style.animationDuration = '8s';
            });
        }

        // Forest silhouette interaction
        const silhouette = document.getElementById('silhouette');
        if (silhouette) {
            silhouette.addEventListener('click', () => {
                this.triggerJumpScare();
            });
        }

        // Static glitch on illusion text
        document.addEventListener('mouseover', (e) => {
            if (e.target.textContent && e.target.textContent.toLowerCase().includes('illusion')) {
                this.triggerStaticGlitch();
            }
        });

        // Timeline item interactions
        const timelineItems = document.querySelectorAll('.timeline-item');
        timelineItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                this.highlightTimelineItem(item, index);
            });
        });

        // Ending card interactions
        const endingCards = document.querySelectorAll('.ending-card');
        endingCards.forEach(card => {
            card.addEventListener('click', () => {
                this.revealEndingHint(card);
            });
        });

        // Polaroid interactions
        const polaroids = document.querySelectorAll('.polaroid');
        polaroids.forEach(polaroid => {
            polaroid.addEventListener('click', () => {
                this.polaroidEffect(polaroid);
            });
        });
    }

    startAmbientEffects() {
        // Subtle cursor following mist effect
        let mouseX = 0, mouseY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            // Update mist layers based on mouse position
            const mistLayers = document.querySelectorAll('.mist-layer');
            mistLayers.forEach((layer, index) => {
                const speed = (index + 1) * 0.01;
                const offsetX = (mouseX - window.innerWidth / 2) * speed;
                const offsetY = (mouseY - window.innerHeight / 2) * speed;
                
                layer.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
            });
        });

        // Random ambient audio whispers
        this.scheduleRandomWhisper();
    }

    scheduleRandomWhisper() {
        const delay = Math.random() * 30000 + 15000; // 15-45 seconds
        
        setTimeout(() => {
            this.playAmbientWhisper();
            this.scheduleRandomWhisper();
        }, delay);
    }

    playAmbientWhisper() {
        const whisperAudio = document.getElementById('ambient-whisper');
        if (whisperAudio && !this.isAudioPlaying) {
            const playPromise = whisperAudio.play();
            
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    whisperAudio.volume = 0.1;
                }).catch(error => {
                    console.error('Whisper audio failed:', error);
                });
            }
        }
    }

    initializeMemoryFragments() {
        const fragments = document.querySelectorAll('.fragment');
        
        fragments.forEach(fragment => {
            const trigger = fragment.querySelector('.fragment-trigger');
            const content = fragment.querySelector('.fragment-content');
            
            if (trigger && content) {
                trigger.addEventListener('click', (e) => {
                    e.preventDefault();
                    
                    // Close other open fragments
                    document.querySelectorAll('.fragment.active').forEach(f => {
                        if (f !== fragment) f.classList.remove('active');
                    });
                    
                    // Toggle current fragment
                    fragment.classList.toggle('active');
                    
                    // Add typing effect to content
                    if (fragment.classList.contains('active')) {
                        this.typeWriterEffect(content);
                    }
                });
            }
        });

        // Close fragments when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.fragment')) {
                document.querySelectorAll('.fragment.active').forEach(f => {
                    f.classList.remove('active');
                });
            }
        });
    }

    typeWriterEffect(element) {
        const text = element.textContent;
        element.textContent = '';
        element.style.opacity = '1';
        
        let index = 0;
        const type = () => {
            if (index < text.length) {
                element.textContent += text[index];
                index++;
                setTimeout(type, Math.random() * 50 + 25);
            }
        };
        
        type();
    }

    setupAudioControls() {
        const playBtn = document.getElementById('atmospherePlay');
        const atmosphereTrack = document.getElementById('atmosphere-track');
        const whisperAudio = document.getElementById('ambient-whisper');
        
        // Preload audio files
        if (atmosphereTrack) {
            atmosphereTrack.load();
            atmosphereTrack.preload = 'auto';
        }
        
        if (whisperAudio) {
            whisperAudio.load();
            whisperAudio.preload = 'auto';
        }
        
        if (playBtn && atmosphereTrack) {
            playBtn.addEventListener('click', () => {
                if (this.isAudioPlaying) {
                    this.pauseAtmosphere(atmosphereTrack, playBtn);
                } else {
                    this.playAtmosphere(atmosphereTrack, playBtn);
                }
            });
        }
    }

    playAtmosphere(audio, button) {
        // Create user interaction promise
        const playPromise = audio.play();

        if (playPromise !== undefined) {
            playPromise.then(() => {
                this.isAudioPlaying = true;
                button.textContent = '⏸ Pause the Whispers';
                button.classList.add('playing');
                audio.volume = 0.3;
            }).catch(error => {
                console.error('Audio play failed:', error);
                // Fallback for autoplay restrictions
                button.textContent = '🔇 Click again to enable audio';
                setTimeout(() => {
                    this.playAtmosphere(audio, button);
                }, 1000);
            });
        }
    }

    pauseAtmosphere(audio, button) {
        // The creepy continuation effect - audio keeps playing for 5 seconds
        button.textContent = '▶ Experience the Atmosphere';
        button.classList.remove('playing');
        
        // Visual indication that it should have stopped
        button.style.opacity = '0.5';
        
        // Actually pause after 5 seconds with fade
        this.audioTimeout = setTimeout(() => {
            audio.volume = 0.3;
            const fadeOut = setInterval(() => {
                if (audio.volume > 0.05) {
                    audio.volume -= 0.05;
                } else {
                    audio.pause();
                    audio.volume = 0.3;
                    clearInterval(fadeOut);
                    this.isAudioPlaying = false;
                    button.style.opacity = '1';
                }
            }, 100);
        }, 5000);
    }

    initializeScrollEffects() {
        // Parallax effect for forest silhouette
        const silhouette = document.getElementById('silhouette');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.5;
            
            if (silhouette) {
                silhouette.style.transform = `translateY(${parallax}px)`;
            }
            
            // Fade in sections on scroll
            this.handleScrollAnimations();
        });
    }

    handleScrollAnimations() {
        const sections = document.querySelectorAll('section');
        const windowHeight = window.innerHeight;
        
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            const sectionTop = rect.top;
            
            if (sectionTop < windowHeight * 0.8 && sectionTop > -rect.height) {
                section.classList.add('visible');
            }
        });
    }

    setupGlitchEffects() {
        // Random glitch effects
        this.scheduleRandomGlitch();
        
        // Glitch on specific interactions
        const redactedElements = document.querySelectorAll('.redacted');
        redactedElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                this.triggerTextGlitch(element);
            });
        });
    }

    scheduleRandomGlitch() {
        const delay = Math.random() * 60000 + 30000; // 30-90 seconds
        
        this.glitchTimer = setTimeout(() => {
            this.triggerStaticGlitch();
            this.scheduleRandomGlitch();
        }, delay);
    }

    triggerStaticGlitch() {
        const staticGlitch = document.getElementById('staticGlitch');
        if (staticGlitch) {
            staticGlitch.classList.add('active');
            setTimeout(() => {
                staticGlitch.classList.remove('active');
            }, 1000);
        }
    }
    triggerTextGlitch(element) {
        element.classList.add('glitch-effect');
        setTimeout(() => {
            element.classList.remove('glitch-effect');
        }, 500);
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    const effects = new AtmosphericEffects();
    
    // Add section navigation
    const sections = document.querySelectorAll('section[id]');
    let currentSection = '';
    
    const sectionNav = document.createElement('nav');
    sectionNav.className = 'section-navigator';
    
    sections.forEach(section => {
        const navItem = document.createElement('a');
        navItem.className = 'nav-item';
        navItem.dataset.section = section.id;
        navItem.textContent = section.querySelector('section[id]')?.textContent || section.id;
        
        navItem.addEventListener('click', (e) => {
            e.preventDefault();
            section.scrollIntoView({ behavior: 'smooth' });
        });
        
        sectionNav.appendChild(navItem);
    });
    
    document.body.appendChild(sectionNav);
    
    // Update active section on scroll
    const updateActiveSection = () => {
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
                currentSection = section.id;
                document.querySelectorAll('.nav-item').forEach(item => {
                    item.classList.toggle('active', item.dataset.section === currentSection);
                });
            }
        });
    };
    
    window.addEventListener('scroll', updateActiveSection);
    updateActiveSection();
});