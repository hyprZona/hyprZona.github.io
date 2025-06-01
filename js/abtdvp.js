// Initialize GSAP for animations
gsap.registerPlugin(ScrollTrigger);

// Wait for DOM to be loaded
document.addEventListener('DOMContentLoaded', function() { 
    // Initialize glitch effects
    initGlitchEffects();
    
    // Initialize timeline animations
    initTimeline();
    
    // Initialize stats panel
    initStatsPanel();
    
    // Initialize skill tree
    initSkillTree();
    
    // Initialize fun facts terminal
    initFunFacts();
    
    // Initialize conspiracy board
    initConspiracyBoard();
    
    // Initialize game teaser
    initGameTeaser();
    
    // Initialize easter egg
    initEasterEgg();
    
    initSections();
});

// Glitch effects
function initGlitchEffects() {
    const glitchToggle = document.getElementById('glitch-toggle');
    const glitchTexts = document.querySelectorAll('.glitch-text');
    
    glitchToggle.addEventListener('change', () => {
        document.body.classList.toggle('glitch-mode');
        if (glitchToggle.checked) {
            startGlitchMode();
        } else {
            stopGlitchMode();
        }
    });
}

function startGlitchMode() {
    const glitchTexts = document.querySelectorAll('.glitch-text');
    glitchTexts.forEach(text => {
        text.dataset.originalText = text.textContent;
    });
    
    window.glitchInterval = setInterval(() => {
        glitchTexts.forEach(text => {
            if (Math.random() > 0.7) {
                createGlitch(text);
            }
        });
    }, 2000);
}

function stopGlitchMode() {
    clearInterval(window.glitchInterval);
    const glitchTexts = document.querySelectorAll('.glitch-text');
    glitchTexts.forEach(text => {
        if (text.dataset.originalText) {
            text.textContent = text.dataset.originalText;
        }
    });
}

function createGlitch(element) {
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

// Timeline animations
function initTimeline() {
    const timelineEvents = document.querySelectorAll('.timeline-event');
    
    timelineEvents.forEach(event => {
        ScrollTrigger.create({
            trigger: event,
            start: 'top center',
            onEnter: () => {
                event.classList.add('active');
                event.querySelector('.event-content').style.transform = 'translateX(0)';
            }
        });
    });
}

// Stats panel
function initStatsPanel() {
    const statFilters = document.querySelectorAll('.stat-filter');
    const statGroups = document.querySelectorAll('.stat-group');
    
    // Initialize first group's stats
    animateStatBars(document.querySelector('.stat-group[data-category="sfw"]'));
    
    statFilters.forEach(filter => {
        filter.addEventListener('click', () => {
            const category = filter.dataset.filter;
            
            statFilters.forEach(f => f.classList.remove('active'));
            filter.classList.add('active');
            
            statGroups.forEach(group => {
                if (group.dataset.category === category) {
                    group.classList.remove('hidden');
                    animateStatBars(group);
                } else {
                    group.classList.add('hidden');
                }
            });
        });
    });
}

function animateStatBars(group) {
    const bars = group.querySelectorAll('.stat-fill');
    bars.forEach((bar, index) => {
        const value = bar.parentElement.dataset.value;
        gsap.fromTo(bar, 
            { width: '0%' },
            { 
                width: `${Math.min(value, 100)}%`,
                duration: 1,
                ease: 'power2.out',
                delay: index * 0.1
            }
        );
    });
}

// Skill tree
function initSkillTree() {
    const skillTabs = document.querySelectorAll('.skill-tab');
    const skillTrees = document.querySelectorAll('.skill-tree');
    const secretInput = document.getElementById('secret-command');
    
    skillTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            if (tab.classList.contains('locked')) return;
            
            const tabId = tab.dataset.tab;
            skillTabs.forEach(t => t.classList.remove('active'));
            skillTrees.forEach(tree => tree.classList.remove('active'));
            
            tab.classList.add('active');
            document.querySelector(`.skill-tree[data-tab="${tabId}"]`).classList.add('active');
        });
    });

    secretInput.addEventListener('keyup', (e) => {
        if (e.target.value.toLowerCase() === 'sudo unlock') {
            unlockForbiddenSkills();
        }
    });
}

function unlockForbiddenSkills() {
    const forbiddenTab = document.querySelector('.skill-tab[data-tab="forbidden"]');
    const forbiddenTree = document.querySelector('.skill-tree[data-tab="forbidden"]');
    
    // Remove locked class and add active class
    forbiddenTab.classList.remove('locked');
    
    // Show the forbidden skills
    document.querySelectorAll('.skill-tree').forEach(tree => tree.classList.remove('active'));
    forbiddenTree.classList.add('active');
    
    // Update tab states
    document.querySelectorAll('.skill-tab').forEach(tab => tab.classList.remove('active'));
    forbiddenTab.classList.add('active');
    
    // Reveal redacted content
    document.querySelectorAll('.skill-node.redacted').forEach(node => {
        node.classList.remove('redacted');
        const title = node.querySelector('h4');
        const description = node.querySelector('p');
        const opValue = node.querySelector('.op-value');
        
        if (node.dataset.skill === 'universe-reboot') {
            title.textContent = 'Universe Reboot';
            description.textContent = 'Complete system reset of all reality instances.';
            opValue.dataset.value = '999';
        } else if (node.dataset.skill === 'code-ascension') {
            title.textContent = 'Code Ascension';
            description.textContent = 'Transcend the boundaries of mortal programming.';
            opValue.dataset.value = '888';
        }
    });
    
    // Add glitch effect to reveal
    createGlitch(forbiddenTab);
}

// Fun facts terminal
function initFunFacts() {
    const facts = [
  "He once broke ChatGPT by asking for a joke in binary. It laughed in Morse code.",
  "His code doesn't run on computers, computers run from his code.",
  "Debug logs cry when he opens them.",
  "Stack Overflow moderators have him blocked.",
  "His commit messages are considered psychological warfare.",
  "dVlpr doesn't sleep; he just hits Ctrl+Alt+Del on his brain to restart.",
  "He once hacked the simulation and set everyone's FPS to 5. That was called the Great Depression.",
  "The '404 Not Found' error? That's because dVlpr actually found it and stole it.",
  "Chuck Norris fears him. dVlpr once deleted his roundhouse kick mid-animation.",
  "He created time zones just so he could schedule his pranks across the globe.",
  "The Bermuda Triangle? That was just dVlpr's early attempt at teleportation.",
  "He made Google search his name whenever you search 'who is the GOAT?'",
  "He gave aliens WiFi before humans even discovered fire.",
  "NASA tracks UFOs. dVlpr tracks NASA.",
  "He's the only person alive who can reply to a scam email and end up scamming them instead.",
  "When he deletes a file, it doesn't go to the Recycle Bin. It goes straight to Hell.",
  "He once DDoS'd a parallel universe just to see what would happen.",
  "Every CAPTCHA fears him. He can read the unreadable text without blinking.",
  "His first word wasn’t 'mama' or 'dada,' it was sudo rm -rf /.",
  "He once tried online dating, but his Riz was so powerful that the servers crashed.",
  "Area 51 doesn't have aliens; they just store dVlpr's search history there.",
  "He once trolled a genie, wished for more wishes, and broke the economy of wishes.",
  "His WiFi has no password. Not because it's open, but because he is the internet.",
  "He doesn’t 'download' games, he just forces them to appear on his PC.",
  "He once asked AI to draw 'something original,' and the AI self-destructed.",
  "He doesn’t write bugs—he writes features so advanced, reality lags behind.",
  "When he hits F5, actual tornadoes form.",
  "His GitHub repo was declared a Level 5 existential threat.",
  "The cloud doesn’t store his data. It just borrows it and hopes he never notices.",
  "He once fixed a bug so hard, the app turned into a religion.",
  "When he says 'Hello, World,' the world responds.",
  "He doesn’t run benchmarks. Benchmarks run to him for approval.",
  "He once forked a repo and the original project ceased to exist out of respect.",
  "His keyboard types back in fear.",
  "Quantum computers ask him for tips.",
  "When he comments code, Stack Overflow adds it to the Bible.",
  "Hackers dream of being hacked by him—just once.",
  "He doesn't read documentation. It reads itself aloud in his presence.",
  "He once wrote a Hello World program that won a Pulitzer.",
  "Even infinite loops pause to let him through.",
  "He once uploaded a bug to VirusTotal. The internet caught a cold.",
  "He doesn’t version-control. Time controls itself to fit his commits.",
  "He can write JavaScript that types itself.",
  "His code runs on calculators, toasters, and bad vibes.",
  "When he opens VS Code, every tab salutes.",
  "His Stack Overflow rep is so high, he had to open a second account to not break the site.",
  "When he says 'brb', the Matrix pauses.",
  "AI tools consult him before updating.",
  "His comments in code aren’t explanations—they’re warnings.",
  "He once updated a driver so hard, the hardware turned into software.",
  "His exception handling? Reality warping.",
  "He can brute-force SHA-256 with a sudoku puzzle and sheer willpower.",
  "He once installed Linux on a potato. The potato now writes C++.",
  "His 'dark mode' is just the lights turning off in fear.",
  "Even memes ask his permission before spreading."
];

    
    let currentFactIndex = 0;
    let isLocked = false;
    
    const factDisplay = document.querySelector('.current-fact');
    const lockButton = document.getElementById('lock-fact');
    const nextButton = document.getElementById('next-fact');
    
    function showNextFact() {
        if (isLocked) return;
        
        currentFactIndex = (currentFactIndex + 1) % facts.length;
        gsap.to(factDisplay, {
            opacity: 0,
            duration: 0.3,
            onComplete: () => {
                factDisplay.textContent = facts[currentFactIndex];
                gsap.to(factDisplay, {
                    opacity: 1,
                    duration: 0.3
                });
            }
        });
    }

    let factInterval = setInterval(showNextFact, 5000);
    
    lockButton.addEventListener('click', () => {
        isLocked = !isLocked;
        lockButton.textContent = isLocked ? 'Unlock Fact' : 'Lock Fact';
        if (isLocked) {
            clearInterval(factInterval);
        } else {
            factInterval = setInterval(showNextFact, 5000);
        }
    });
    
    nextButton.addEventListener('click', showNextFact);
}

// Conspiracy board
function initConspiracyBoard() {
    const notes = document.querySelectorAll('.conspiracy-note');
    const strings = document.querySelectorAll('.conspiracy-string');
    
    function updateConnections() {
        strings.forEach((string, index) => {
            if (index + 1 < notes.length) {
                const startPin = notes[index].querySelector('.conspiracy-pin');
                const endPin = notes[index + 1].querySelector('.conspiracy-pin');
                
                if (startPin && endPin) {
                    const board = document.querySelector('.conspiracy-board');
                    const boardRect = board.getBoundingClientRect();
                    
                    // Get precise pin centers
                    const startRect = startPin.getBoundingClientRect();
                    const endRect = endPin.getBoundingClientRect();
                    
                    // Calculate exact center points of pins
                    const startX = startRect.left + (startRect.width / 2) - boardRect.left;
                    const startY = startRect.top + (startRect.height / 2) - boardRect.top;
                    const endX = endRect.left + (endRect.width / 2) - boardRect.left;
                    const endY = endRect.top + (endRect.height / 2) - boardRect.top;
                    
                    // Calculate precise length using Pythagorean theorem
                    const length = Math.sqrt(
                        Math.pow(endX - startX, 2) + 
                        Math.pow(endY - startY, 2)
                    );
                    
                    // Calculate precise angle in radians then convert to degrees
                    const angle = Math.atan2(endY - startY, endX - startX) * (180 / Math.PI);
                    
                    // Set string properties with exact positioning
                    gsap.set(string, {
                        position: 'absolute',
                        top: startY,
                        left: startX,
                        width: length,
                        rotation: angle,
                        transformOrigin: '0 50%', // Center origin for more precise rotation
                        backgroundColor: 'rgba(255, 255, 255, 0.3)',
                        height: '1px' // Thinner line for more precision
                    });
                }
            }
        });
    }
    
    // Initial update with slight delay to ensure DOM is ready
    setTimeout(updateConnections, 100);
    
    // Update on window resize with debounce
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(updateConnections, 100);
    });
    
    // Update on scroll with RAF for smooth performance
    let ticking = false;
    document.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateConnections();
                ticking = false;
            });
            ticking = true;
        }
    });
    
    // Periodic updates to handle any dynamic content changes
    const updateInterval = setInterval(updateConnections, 2000);
    
    // Cleanup on page unload
    window.addEventListener('unload', () => clearInterval(updateInterval));
}

// Game teaser
function initGameTeaser() {
    const launchButton = document.getElementById('game-launch');
    
    launchButton.addEventListener('click', () => {
        createGlitch(launchButton);
        gsap.to('.static-overlay', {
            opacity: 0.5,
            duration: 0.2,
            yoyo: true,
            repeat: 3
        });
        
        setTimeout(() => {
            alert('Error: dVlpr.exe has crashed reality.js');
        }, 1000);
    });
}

// Witness button scroll effect
document.getElementById('witness-btn').addEventListener('click', () => {
    gsap.to(window, {
        duration: 1,
        scrollTo: '#legend',
        ease: 'power2.inOut'
    });
});

// Avatar hover effect
const avatar = document.getElementById('avatar');
avatar.addEventListener('mouseover', () => {
    gsap.to('.glitch-overlay', {
        opacity: 0.2,
        duration: 0.3
    });
    
    document.body.style.filter = 'hue-rotate(90deg)';
    setTimeout(() => {
        document.body.style.filter = 'none';
    }, 300);
});

// Easter egg hover effect
function initEasterEgg() {
    const sections = document.querySelectorAll('.section');
    let hoverTimer;
    const messages = [
        "Why are you staring so hard?",
        "SYSTEM BREACH DETECTED",
        "Is there something on my face?",
        "Stop it, you're making the pixels nervous",
        "INITIATING SELF-DESTRUCT SEQUENCE..."
    ];

    sections.forEach(section => {
        section.addEventListener('mouseenter', () => {
            hoverTimer = setTimeout(() => {
                const egg = document.createElement('div');
                egg.className = 'hover-easter-egg';
                egg.textContent = messages[Math.floor(Math.random() * messages.length)];
                document.body.appendChild(egg);
                
                setTimeout(() => {
                    egg.classList.add('active');
                    setTimeout(() => {
                        egg.remove();
                    }, 20000);
                }, 100);
            }, 50000);
        });

        section.addEventListener('mouseleave', () => {
            clearTimeout(hoverTimer);
        });
    });
}

// Section navigation
function initSections() {
    const sections = document.querySelectorAll('.section');
    const navItems = document.querySelectorAll('.section-navigator li');
    
    // Show first section by default
    sections[0].classList.add('active');
    navItems[0].classList.add('active');
    
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const targetId = item.getAttribute('data-section');
            const targetSection = document.getElementById(targetId);
            
            sections.forEach(s => s.classList.remove('active'));
            navItems.forEach(n => n.classList.remove('active'));
            
            targetSection.classList.add('active');
            item.classList.add('active');
        });
    });
    
    // Check URL hash on load
    if (window.location.hash) {
        const targetId = window.location.hash.substring(1);
        const targetSection = document.getElementById(targetId);
        const targetNav = document.querySelector(`[data-section="${targetId}"]`);
        
        if (targetSection && targetNav) {
            sections.forEach(s => s.classList.remove('active'));
            navItems.forEach(n => n.classList.remove('active'));
            
            targetSection.classList.add('active');
            targetNav.classList.add('active');
        }
    }
}