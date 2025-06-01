/**
 * Glitchpocalypse - hyprZona
 * Main JavaScript functionality for the music showcase page
 */

class GlitchpocalypsePlayer {
    constructor() {
        try {
            // Initialize properties
            this.currentTrack = null;
            this.audioPlayer = document.getElementById('audio-player');
            this.source = null; // Add source tracking
            
            // Initialize canvas with performance optimization
            this.waveformCanvas = document.getElementById('waveform-canvas');
            if (this.waveformCanvas) {
                this.ctx = this.waveformCanvas.getContext('2d', { 
                    willReadFrequently: true 
                });
            }
            
            this.particleSystem = null;
            this.currentMode = 'studio';
            this.audioContext = null;
            this.analyser = null;
            this.dataArray = null;
            this.isPlaying = false;
            this.glitchIntensity = 0;

            // Initialize systems only if required elements exist
            if (this.waveformCanvas && this.ctx) {
                this.initAudio();
                this.initVisualizer();
            }

            this.initParticles();
            this.setupEventListeners();
            this.startGlitchEffects();
            this.setupNavigation();
        } catch (error) {
            console.warn('GlitchpocalypsePlayer initialization error:', error);
        }
    }

    initAudio() {
        try {
            // Create audio context only if it doesn't exist
            if (!this.audioContext) {
                this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            }

            // Create analyser only if it doesn't exist
            if (!this.analyser) {
                this.analyser = this.audioContext.createAnalyser();
                this.analyser.fftSize = 2048;
            }
            
            // Only create and connect the source if it hasn't been done before
            if (!this.source) {
                this.source = this.audioContext.createMediaElementSource(this.audioPlayer);
                this.source.connect(this.analyser);
                this.analyser.connect(this.audioContext.destination);
            }
            
            // Set up data array for visualization
            this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);
        } catch (error) {
            console.warn('Audio initialization failed:', error);
        }
    }

    initParticles() {
        // Make sure particles.js is loaded
        if (typeof particlesJS !== 'undefined') {
            particlesJS('particles-container', {
                particles: {
                    number: { value: 80, density: { enable: true, value_area: 800 } },
                    color: { value: '#00ffff' },
                    shape: {
                        type: 'polygon',
                        polygon: { nb_sides: 4 }
                    },
                    opacity: {
                        value: 0.5,
                        random: true,
                        anim: {
                            enable: true,
                            speed: 1,
                            opacity_min: 0.1,
                            sync: false
                        }
                    },
                    size: {
                        value: 3,
                        random: true,
                        anim: {
                            enable: true,
                            speed: 2,
                            size_min: 0.1,
                            sync: false
                        }
                    },
                    line_linked: {
                        enable: true,
                        distance: 150,
                        color: '#00ffff',
                        opacity: 0.4,
                        width: 1
                    },
                    move: {
                        enable: true,
                        speed: 2,
                        direction: 'none',
                        random: true,
                        straight: false,
                        out_mode: 'out',
                        bounce: false
                    }
                },
                interactivity: {
                    detect_on: 'window',
                    events: {
                        onhover: {
                            enable: true,
                            mode: 'repulse'
                        },
                        onclick: {
                            enable: true,
                            mode: 'push'
                        },
                        resize: true
                    },
                    modes: {
                        repulse: {
                            distance: 100,
                            duration: 0.4
                        },
                        push: {
                            particles_nb: 4
                        }
                    }
                },
                retina_detect: true
            });
        } else {
            console.error('particles.js is not loaded');
        }
    }

    initVisualizer() {
        const resizeCanvas = () => {
            this.waveformCanvas.width = window.innerWidth;
            this.waveformCanvas.height = window.innerHeight;
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Start animation loop
        this.animate();
    }

    animate() {
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        this.ctx.fillRect(0, 0, this.waveformCanvas.width, this.waveformCanvas.height);

        if (this.isPlaying) {
            this.analyser.getByteFrequencyData(this.dataArray);
            this.drawWaveform();
        }

        // Add glitch effect
        if (Math.random() < 0.05) {
            this.addGlitchEffect();
        }

        requestAnimationFrame(() => this.animate());
    }

    drawWaveform() {
        const width = this.waveformCanvas.width;
        const height = this.waveformCanvas.height;
        const sliceWidth = width / this.dataArray.length;
        
        this.ctx.strokeStyle = `rgb(0, ${255 - this.glitchIntensity}, ${255 - this.glitchIntensity})`;
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();

        let x = 0;
        for (let i = 0; i < this.dataArray.length; i++) {
            const v = this.dataArray[i] / 128.0;
            const y = (v * height / 2) + this.glitchOffset();

            if (i === 0) {
                this.ctx.moveTo(x, y);
            } else {
                this.ctx.lineTo(x, y);
            }

            x += sliceWidth;
        }

        this.ctx.stroke();
    }

    glitchOffset() {
        return Math.random() * this.glitchIntensity;
    }

    addGlitchEffect() {
        const imageData = this.ctx.getImageData(0, 0, this.waveformCanvas.width, this.waveformCanvas.height);
        const pixels = imageData.data;

        // Randomly offset RGB channels
        for (let i = 0; i < pixels.length; i += 4) {
            if (Math.random() < 0.01) {
                const offset = Math.floor(Math.random() * 30) * 4;
                pixels[i] = pixels[i + offset] || pixels[i];
                pixels[i + 1] = pixels[i + offset + 1] || pixels[i + 1];
            }
        }

        this.ctx.putImageData(imageData, 0, 0);
    }

    setupEventListeners() {
        // Track control buttons
        document.querySelectorAll('.play-track-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const trackId = e.target.closest('.track-item').dataset.track;
                this.playTrack(trackId);
            });
        });

        // Lore buttons
        document.querySelectorAll('.lore-drop-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const loreItem = e.target.closest('.lore-item');
                this.revealLore(loreItem);
            });
        });

        // Secret code input
        const secretInput = document.querySelector('.secret-input');
        if (secretInput) {
            secretInput.addEventListener('input', (e) => {
                this.checkSecretCode(e.target.value);
            });
        }
    }

    // Update the navigation setup
    setupNavigation() {
        const navItems = document.querySelectorAll('.side-navigator li');
        
        // Handle nav clicks
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                const targetId = item.getAttribute('data-section');
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    // Smooth scroll to section
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                    
                    // Update active state
                    navItems.forEach(navItem => navItem.classList.remove('active'));
                    item.classList.add('active');
                }
            });
        });

        // Scroll spy using Intersection Observer
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const id = entry.target.id;
                        navItems.forEach(item => {
                            const isActive = item.getAttribute('data-section') === id;
                            item.classList.toggle('active', isActive);
                        });
                    }
                });
            },
            {
                threshold: 0.5,
                rootMargin: '-50% 0px -50% 0px'
            }
        );

        // Observe all sections
        document.querySelectorAll('section[id]').forEach(section => {
            observer.observe(section);
        });
    }

    updateActiveSection(sectionId) {
        // Update navigation state
        document.querySelectorAll('nav a').forEach(link => {
            const href = link.getAttribute('href').substring(1);
            link.classList.toggle('active', href === sectionId);
        });

        // Add glitch effect on section change
        this.glitchIntensity = 30;
        setTimeout(() => {
            this.glitchIntensity = 20;
        }, 500);
    }

    playTrack(trackId) {
        // Track data mapping
        const tracks = {
            '1': {
                url: 'https://drive.google.com/file/d/19p4G1nvm_QoW5lqE7yF37F6ZjvNxMFCK/view?usp=sharing',
                title: 'Twisted Memories',
                artist: 'Glitchpocalypse'
            },
            // Add more tracks here
        };

        const track = tracks[trackId];
        if (!track) return;

        this.audioPlayer.src = track.url;
        this.audioPlayer.play();
        this.isPlaying = true;
        this.glitchIntensity = 20;

        // Update UI
        document.querySelector('.track-title').textContent = track.title;
        document.querySelector('.track-artist').textContent = track.artist;

        // Start cassette animation
        document.querySelectorAll('.cassette-reel').forEach(reel => {
            reel.classList.add('playing');
        });
    }

    cycleMode() {
        const modes = ['studio', 'lore', 'chaos'];
        const currentIndex = modes.indexOf(this.currentMode);
        this.currentMode = modes[(currentIndex + 1) % modes.length];

        // Update UI
        document.body.className = this.currentMode + '-mode';
        document.getElementById('mode-btn').textContent = 
            `🎛️ ${this.currentMode.charAt(0).toUpperCase() + this.currentMode.slice(1)}`;

        // Adjust glitch intensity based on mode
        this.glitchIntensity = this.currentMode === 'chaos' ? 50 : 20;
    }

    revealLore(loreItem) {
        const expand = loreItem.querySelector('.lore-expand');
        expand.style.height = expand.style.height ? null : expand.scrollHeight + 'px';
        
        // Add glitch effect
        loreItem.classList.add('glitching');
        setTimeout(() => {
            loreItem.classList.remove('glitching');
        }, 1000);
    }

    checkSecretCode(code) {
        const secretCodes = {
            'BROKEN_CONSOLE': () => this.unlockSecretTrack('Broken Console Symphony'),
            'HAUNTED_MIDI': () => this.unlockSecretTrack('Ghost in the MIDI'),
            '3AM_DEBUG': () => this.unlockSecretTrack('3AM Debug Session')
        };

        if (secretCodes[code]) {
            secretCodes[code]();
            this.playGlitchSound();
        }
    }

    unlockSecretTrack(trackName) {
        const notification = document.createElement('div');
        notification.className = 'secret-unlock-notification';
        notification.textContent = `Unlocked: ${trackName}`;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    playGlitchSound() {
        const glitchSound = new Audio('assets/sounds/glitch.mp3');
        glitchSound.volume = 0.3;
        glitchSound.play();
    }

    startGlitchEffects() {
        // Initialize glitch interval
        this.glitchInterval = setInterval(() => {
            // Random glitch intensity
            this.glitchIntensity = Math.random() * 30;
            
            // Random glitch overlays
            const elements = document.querySelectorAll('.glitch-text');
            elements.forEach(element => {
                if (Math.random() < 0.1) { // 10% chance for each element
                    element.classList.add('glitching');
                    setTimeout(() => {
                        element.classList.remove('glitching');
                    }, 200 + Math.random() * 400);
                }
            });

            // VHS tracking effect
            if (Math.random() < 0.05) { // 5% chance
                document.body.classList.add('vhs-track');
                setTimeout(() => {
                    document.body.classList.remove('vhs-track');
                }, 100 + Math.random() * 200);
            }
        }, 2000); // Check every 2 seconds

        // Clean up on page unload
        window.addEventListener('beforeunload', () => {
            clearInterval(this.glitchInterval);
        });
    }
}

// Initialize with error handling
window.addEventListener('load', () => {
    try {
        window.glitchPlayer = new GlitchpocalypsePlayer();
    } catch (error) {
        console.error('Failed to initialize GlitchpocalypsePlayer:', error);
    }
});