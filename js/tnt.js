// ===== GLOBAL VARIABLES =====
const chapterData = [
    {
        id: 1,
        wattpadId: '1537822241',
        title: "Chapter 0: The Beginning of an End",
        codeName: "Code-named entry: REQUIEM",
        date: "2025-05-05",
        teaser: "Every victory leaves a scar. Some wounds are meant to bleed forever.",
        synopsis: "In a blazing inferno, Tom faces the bitter taste of a hollow victory that spirals into a desperate trap. A single shot ignites a chain reaction, sealing his fate within the crumbling Mantalia Mansion. As he makes a final, heartbreaking call to Tim, their partnership, and Tom's life, are consumed by fire and smoke, leaving only ruin and a haunting promise.",
        status: "published"
    },
    {
        id: 2,
        wattpadId: '1537843419',
        title: "Chapter 1: Shadows of Valor",
        codeName: "Code-named entry: ASCENSION",
        date: "2025-05-08",
        teaser: "Some secrets are buried deeper than graves, and betrayal cuts sharper than any blade.",
        synopsis: "Eight years of absence melt away as President Frank Martin and Director General Mary Martin journey to reunite with their son, Tom, at St. Augustus Boarding School. But as the past — a brutal drug empire, a daring encounter with Darko Petrović, and the rise of UISIA under Jack Underwood — unfolds, a chilling present threat looms. Vice President Samuel White, a pawn of the vengeful John Gregg, orchestrates a silent, inescapable attack, transforming a hopeful reunion into a deadly ambush.",
        status: "published"
    },
    {
        id: 3,
        wattpadId: '1537849044',
        title: "Chapter 2: Embers of Innocence",
        codeName: "Code-named entry: ECHO",
        date: "2025-05-12",
        teaser: "Laughter and light mask the creeping darkness. Some goodbyes are never spoken.",
        synopsis: "Frank and Mary Martin reminisce about their extraordinary past, from their unique first meeting during a hostage situation to Mary's history with Darko Petrović. Their journey to reunite with Tom is violently interrupted by John Gregg, who, with chilling calm, orchestrates a drone attack, offering them a sinister choice before their sedan explodes. Unaware of the tragedy, Tom celebrates his 15th birthday at St. Augustus with Millie and friends, while Captain Gustavo races against time to uncover the truth behind the Martins' disappearance, as John sets his sights on dismantling Frank's legacy.",
        status: "published"
    },
    {
        id: 4,
        wattpadId: '1538068112',
        title: "Chapter 3: The Last Dance",
        codeName: "Code-named entry: REQUIEM",
        date: "2025-05-15",
        teaser: "A forced smile, a secret video, and a birthday shattered. Some goodbyes are delivered by strangers.",
        synopsis: "Tom's frantic attempts to contact his parents on his 15th birthday are met with silence, as Captain Gustavo receives a cryptic tip about Corvette Point. Meanwhile, John orchestrates the release of a devastating video to Bill, showing the Martins' convoy in a fiery explosion, gloating about his 'empire.' At St. Augustus, Tom's surprise birthday party, thrown by Millie, erupts in joy until Bill arrives, hinting at a coming storm. As Gustavo's team races to the ominous Corvette Point, UISIA Director Jack Underwood watches President White's panicked press conference and confirms the footage's authenticity, realizing the 'Empire' is far more than just drugs, and prepares his agency for a long, cold night of interrogation and pursuit.",
        status: "published"
    },
    {
        id: 5,
        wattpadId: '1538080695',
        title: "Chapter 4: Shades of Truth",
        codeName: "Code-named entry: REVELATION",
        date: "2025-05-19",
        teaser: "Every secret has a price, and some truths burn hotter than any flame.",
        synopsis: "Millie confronts Bill at Tom's birthday party, only to be handed a newspaper bearing the devastating headline: President Frank Martin and General Mary Martin are dead. As Millie struggles with the news, Captain Gustavo's team discovers a high-tech bunker at Corvette Point, uncovering a shocking file that suggests Frank's involvement with the criminal 'Empire' and massive bribes. Meanwhile, UISIA Director Jack Underwood corners a terrified Vice President Samuel White, who, under duress, calls John, initiating a desperate trace to uncover the mastermind behind the Martins' alleged demise.",
        status: "current"
    },
    {
        id: 6,
        wattpadId: '1543609937',
        title: "Chapter 5: The Silence before the Storm",
        codeName: "Code-named entry: OBLIVION",
        date: "2025-05-22",
        teaser: "A broken heart, a dangerous game, and a secret that will shatter everything.",
        synopsis: "Millie grapples with the devastating news of Tom's parents' death and their imminent return to Germany, while White, under Underwood's guidance, successfully tricks John into revealing his network's vulnerabilities. However, John's ominous return call and the brutal murder of White's secretary signal a dangerous shift in the game. Meanwhile, Underwood's agency launches a full-scale assault on John's facilities, but a critical message about 'Virelians' and a surprise military jet ambush complicate their mission. Back at St. Augustus, Millie plans to break the news to Tom, while at Corvette Point, forensic evidence confirms the Martins' death by specialized drones, and Gustavo uncovers shocking truths about Frank's family's deep, tangled history with the powerful 'Empire'—an Empire that now has its sights set on Tom.",
        status: "upcoming"
    },
    {
        id: 7,
        wattpadId: '1544420538',
        title: "Chapter 6: The Edge of Truth",
        codeName: "Code-named entry: PRELUDE",
        date: "2025-05-26",
        teaser: "Some truths unravel with a whisper, others detonate with a headline. Innocence, once shattered, can never be fully restored.",
        synopsis: "Underwood's cloaked jet is ambushed by military jets, revealing John's advanced tech and forcing an emergency landing, as John's plan to dismantle the Martins' legacy escalates. White, under duress, cancels Hans Kraus's contract, driving him back to Germany but not before Hans calls Millie to confirm the Martins' death and their dating status. Meanwhile, at Corvette Point, officers confirm the Martins' deaths were orchestrated with advanced military drones, and Gustavo discovers files detailing Frank's family's deep connection to a shadowy 'Empire' and a chilling 'Asset or dead' status for Tom. As Millie struggles with how to tell Tom, his phone rings—Captain Gustavo, before the call is abruptly cut. Millie hands Tom a newspaper, the headline screaming the devastating truth of his parents' demise.",
        status: "upcoming"
    },
    {
        id: 8,
        wattpadId: '1545112462',
        title: "Chapter 7: Echoes of Loss",
        codeName: "Code-named entry: REQUIEM",
        date: "2025-05-29",
        teaser: "Grief takes many forms: denial, anger, and a desperate search for truth. Some goodbyes are only the beginning.",
        synopsis: "Tom reels from the devastating news of his parents' death, initially misunderstanding the newspaper's headline before the brutal truth shatters his world. Millie provides unwavering support as Tom grapples with overwhelming grief. A haunting voicemail from Captain Gustavo confirms the Martins' demise, hints at a larger conspiracy targeting Tom, and abruptly cuts out. Meanwhile, at Corvette Point, a massacre ensues as John's forces overwhelm Gustavo's team, but Gustavo is rescued by Jack Underwood and his UISIA agents, who arrive in their newly revealed, cloaked jet. As White's 'suicide' becomes public, setting off national unrest, Tom finds a fleeting peace with Millie before she leaves for Germany. Their heartfelt goodbye, marked by promises and a final kiss, is secretly recorded. Moments later, Tom meets Timothy Darkens, a survivor from Virelia, hinting at a new alliance and a deeper mystery.",
        status: "upcoming"
    }
];

// Add this helper function after the chapterData array
function formatWattpadUrl(chapter) {
    if (!chapter.wattpadId) {
        console.error(`No Wattpad ID found for chapter ${chapter.id}`);
        return '#';
    }

    // Extract chapter title and clean it for URL
    const titleMatch = chapter.title.match(/Chapter \d+:\s*(.+)/);
    const chapterTitle = titleMatch ? titleMatch[1] : chapter.title;
    
    // Format the title for URL (lowercase, replace spaces with hyphens, remove special chars)
    const urlTitle = chapterTitle
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-');

    return `${chapter.wattpadId}-the-t%27n%27t-a-story-of-the-scars-${urlTitle}`;
}

// Character Profile Data
const characterProfiles = {
    tom: {
    name: "Tom Martin",
    image: "https://lh3.googleusercontent.com/pw/AP1GczMVTik5VE-kCh9CwFH-AXZkV2V_BfUqRC6W80Atc1kt43JOQSJOlXSFWoGaUdDy45SDS4AtEoEpCY5y5RxZHR6xWRNYmTnNSdVeezHewgdS6IcfYvmxaz0W8gTK8g5gfWi1PagHg-e2BBsOxRvGPTWb=w869-h869-s-no-gm",
    codename: "Ghost Protocol",
    status: "MIA",
    affiliation: "St. Augustus Boarding School / U.I.S.I.A. (Undercover Ops)",
    background: "Tom Martin, son of the late President Frank Martin and General Mary Martin, grew up in St. Augustus Boarding School. When his parents were assassinated, Tom's carefully constructed world shattered, and a fire ignited within him—a mission for justice, vengeance, and redemption. Now a top operative of the rogue intelligence unit U.I.S.I.A., he walks the tightrope between survival and sacrifice.",
    strengths: [
        "Instinctive tactical improvisation",
        "Natural charisma and leadership",
        "Close-quarters combat mastery",
        "Expert in infiltration and disguise"
    ],
    weaknesses: [
        "Severe trust issues",
        "Carries deep emotional trauma",
        "Dramatic under pressure (main character syndrome)",
        "Volatile temper when emotionally provoked"
    ],
    quote: "Some men chase peace. I chase ghosts. And when I catch them… I bury them.",
},
    tim: {
    name: "TIMOTHY DARKENS",
    image: "https://lh3.googleusercontent.com/pw/AP1GczPVNIlQadbVEMfnYHwIR2Qpr75dbtkolH9x74xKRQ_UFeMDRJ-_bktwQRYg4c3nv7tX1lCLJJZtFgAhXuocRFfhuywjkYHV-Qex2pCAh7dZc9JcokfYNZgYXq41zRyb3U24DY1aZA59BcFLS0QNBxWa=w869-h869-s-no-gm",
    codename: "Shadow Protocol",
    status: "Active",
    affiliation: "U.I.S.I.A. (United Islands Security and Intelligence Association)",
    background: "After escaping the ruins of his homeland, Tim was one of the few survivors rescued from a warzone drenched in ash and silence. His parents, broken by grief, hanged themselves. His brother? Slaughtered by loan sharks. What remained was a boy sharpened by loss, hardened by the streets, and refined into a silent blade of justice. Brought into Tom's life not just as a partner, but as a lifeline, Tim’s presence was never an accident—it was calculated salvation.",
    strengths: [
        "Stealth expert",
        "Sharpshooter with surgical aim",
        "Highly adaptable in all combat ranges",
        "Mentally intelligent and street-smart",
        "Crafting specialist and weapon improviser"
    ],
    weaknesses: [
        "Emotionally vulnerable",
        "Nightmares from war trauma",
        "Occasional self-doubt about his mission",
        "Identity crisis when trust is broken"
    ],
    quote: "I don’t need an army. Just silence, a blade, and a reason."
}
};

// ===== UTILITY FUNCTIONS =====
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        if (!func || typeof func !== 'function') return;
        
        const later = () => {
            clearTimeout(timeout);
            try {
                func(...args);
            } catch (error) {
                console.error('Error in debounced function:', error);
            }
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// ===== TYPING EFFECT =====
class TypingEffect {
    constructor(element, text, speed = 50) {
        this.element = element;
        this.text = text;
        this.speed = speed;
        this.currentIndex = 0;
    }

    start() {
        this.element.textContent = '';
        this.typeNextCharacter();
    }

    typeNextCharacter() {
        if (this.currentIndex < this.text.length) {
            this.element.textContent += this.text.charAt(this.currentIndex);
            this.currentIndex++;
            setTimeout(() => this.typeNextCharacter(), this.speed);
        }
    }
}

// ===== GLITCH EFFECT =====
class GlitchEffect {
    constructor(element) {
        this.element = element;
        this.originalText = element.textContent;
        this.glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
        this.isGlitching = false;
    }

    start(duration = 1000) {
        if (this.isGlitching) return;
        
        this.isGlitching = true;
        const startTime = Date.now();
        
        const glitchFrame = () => {
            const elapsed = Date.now() - startTime;
            if (elapsed < duration) {
                this.randomizeText();
                requestAnimationFrame(glitchFrame);
            } else {
                this.element.textContent = this.originalText;
                this.isGlitching = false;
            }
        };
        
        requestAnimationFrame(glitchFrame);
    }

    randomizeText() {
        let glitchedText = '';
        for (let i = 0; i < this.originalText.length; i++) {
            if (Math.random() < 0.1) {
                glitchedText += this.glitchChars[Math.floor(Math.random() * this.glitchChars.length)];
            } else {
                glitchedText += this.originalText[i];
            }
        }
        this.element.textContent = glitchedText;
    }
}

// ===== CHAPTER MANAGEMENT =====
function createChapterCard(chapter) {
    const currentDate = new Date();
    const chapterDate = new Date(chapter.date);
    const isUnlocked = chapterDate <= currentDate;
    
    const statusClass = isUnlocked ? 
        (chapter.status === 'current' ? 'current' : 'published') : 
        'upcoming';
    
    const statusIcon = isUnlocked ? 
        (chapter.status === 'current' ? '⚡' : '✓') : 
        '🔒';

    return `
        <div class="chapter-card ${statusClass}" data-chapter-id="${chapter.id}">
            <div class="chapter-header">
                <div class="chapter-icon">${statusIcon}</div>
                <div class="chapter-info">
                    <h3>${chapter.title}</h3>
                    <div class="chapter-code">${chapter.codeName}</div>
                </div>
            </div>
            <div class="chapter-meta">
                <div class="chapter-date">
                    <i class="fas fa-calendar"></i>
                    ${new Date(chapter.date).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric',
                        year: 'numeric'
                    })}
                </div>
                <div class="chapter-status ${statusClass}">
                    ${statusClass.toUpperCase()}
                </div>
            </div>
            <div class="chapter-teaser">
                "${chapter.teaser}"
            </div>
            ${isUnlocked ? `
                <div class="chapter-buttons">
                    <button class="expand-btn" onclick="toggleChapterSpoiler(${chapter.id})">
                        <i class="fas fa-eye"></i> Reveal Synopsis
                    </button>
                    <a href="https://www.wattpad.com/${formatWattpadUrl(chapter)}" 
                       class="wattpad-btn" target="_blank">
                        <i class="fab fa-wattpad"></i> Read on Wattpad
                    </a>
                </div>
                <div class="chapter-spoiler" id="spoiler-${chapter.id}">
                    <h4>⚠️ Synopsis (Spoiler Warning)</h4>
                    <p>${chapter.synopsis}</p>
                </div>
            ` : `
                <div class="chapter-locked">
                    <i class="fas fa-lock"></i> Locked until release
                </div>
            `}
        </div>
    `;
}

function populateChapters() {
    const chapterGrid = document.getElementById('chapterGrid');
    if (!chapterGrid) return;

    chapterGrid.innerHTML = chapterData.map(createChapterCard).join('');
    
    // Add fade-in animation to chapter cards
    const cards = chapterGrid.querySelectorAll('.chapter-card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add('fade-in');
    });
}

function toggleChapterSpoiler(chapterId) {
    const spoiler = document.getElementById(`spoiler-${chapterId}`);
    const button = spoiler.previousElementSibling;
    
    if (spoiler.classList.contains('visible')) {
        spoiler.classList.remove('visible');
        button.innerHTML = '<i class="fas fa-eye"></i> Reveal Synopsis';
    } else {
        spoiler.classList.add('visible');
        button.innerHTML = '<i class="fas fa-eye-slash"></i> Hide Synopsis';
    }
}

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    const animatedElements = document.querySelectorAll(`
        .status-card,
        .character-card,
        .about-content,
        .milestone,
        .note-container
    `);

    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// ===== NAVBAR SCROLL EFFECT =====
function initNavbarScrollEffect() {
    const navbar = document.querySelector('.navbar');
    let lastScrollY = window.scrollY;

    const handleScroll = debounce(() => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            navbar.style.background = 'rgba(0, 0, 0, 0.98)';
            navbar.style.backdropFilter = 'blur(15px)';
        } else {
            navbar.style.background = 'rgba(0, 0, 0, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        }

        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }

        lastScrollY = currentScrollY;
    }, 10);

    window.addEventListener('scroll', handleScroll);
}

// ===== TERMINAL TYPING EFFECT =====
function initTerminalEffect() {
    const commandElement = document.querySelector('.typing-effect');
    if (!commandElement) return;

    const originalText = commandElement.textContent;
    
    // Wait for page load, then start typing
    setTimeout(() => {
        const typewriter = new TypingEffect(commandElement, originalText, 80);
        typewriter.start();
    }, 1000);
}

// ===== GLITCH HOVER EFFECTS =====
function initGlitchEffects() {
    const glitchElements = document.querySelectorAll('.glitch-text');
    
    glitchElements.forEach(element => {
        const glitch = new GlitchEffect(element);
        
        element.addEventListener('mouseenter', () => {
            glitch.start(500);
        });
    });
}

// ===== HERO PARALLAX EFFECT =====
function initParallaxEffect() {
    const heroSection = document.querySelector('.hero-section');
    const rainOverlay = document.querySelector('.rain-overlay');
    const smokeOverlay = document.querySelector('.smoke-overlay');
    
    if (!heroSection || !rainOverlay || !smokeOverlay) return;

    const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        
        const xPercent = (clientX / innerWidth - 0.5) * 2;
        const yPercent = (clientY / innerHeight - 0.5) * 2;
        
        if (rainOverlay) {
            rainOverlay.style.transform = `translate(${xPercent * 10}px, ${yPercent * 10}px)`;
        }
        
        if (smokeOverlay) {
            smokeOverlay.style.transform = `translate(${xPercent * -5}px, ${yPercent * -5}px)`;
        }
    };

    heroSection.addEventListener('mousemove', debounce(handleMouseMove, 16));
}

// ===== TIMELINE PROGRESS =====
function updateTimelineProgress() {
    const progressBar = document.getElementById('timelineProgress');
    if (!progressBar) return;
    
    // Calculate progress based on current date
    const currentDate = new Date();
    const startDate = new Date('2025-05-01');
    const endDate = new Date('2025-11-30');
    
    const totalDuration = endDate - startDate;
    const elapsed = currentDate - startDate;
    const progressPercent = Math.min(Math.max((elapsed / totalDuration) * 100, 0), 100);
    
    // Update the progress bar
    progressBar.style.width = `${progressPercent}%`;
    
    // Add pulsing effect to current milestone
    const currentMilestone = document.querySelector('.milestone[data-status="current"]');
    if (currentMilestone) {
        currentMilestone.style.animationDelay = '0s';
    }
}

// ===== SMOOTH SCROLLING =====
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== KEYBOARD SHORTCUTS =====
function initKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        // Konami code easter egg
        if (e.code === 'ArrowUp' || e.code === 'ArrowDown' || 
            e.code === 'ArrowLeft' || e.code === 'ArrowRight' || 
            e.code === 'KeyB' || e.code === 'KeyA') {
            // Track konami code sequence (simplified)
            // Full implementation would track the complete sequence
        }
        
        // Quick navigation shortcuts
        if (e.ctrlKey || e.metaKey) {
            switch(e.key) {
                case '1':
                    e.preventDefault();
                    document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' });
                    break;
                case '2':
                    e.preventDefault();
                    document.getElementById('status')?.scrollIntoView({ behavior: 'smooth' });
                    break;
                case '3':
                    e.preventDefault();
                    document.getElementById('chapters')?.scrollIntoView({ behavior: 'smooth' });
                    break;
                case '4':
                    e.preventDefault();
                    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
                    break;
            }
        }
    });
}

// ===== CHARACTER CARD EFFECTS =====
function initCharacterEffects() {
    const characterCards = document.querySelectorAll('.character-card');
    if (!characterCards.length) return;
    
    characterCards.forEach(card => {
        const image = card.querySelector('.character-image img');
        const overlay = card.querySelector('.character-overlay');
        
        card.addEventListener('mouseenter', () => {
            // Add subtle shake effect
            card.style.animation = 'subtle-shake 0.3s ease-in-out';
            
            // Enhanced image effects
            if (image) {
                image.style.transform = 'scale(1.1)';
                image.style.filter = 'grayscale(30%) contrast(1.3) brightness(1.1)';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.animation = '';
            
            if (image) {
                image.style.transform = 'scale(1.05)';
                image.style.filter = 'grayscale(100%) contrast(1.2)';
            }
        });
    });
}

// Add subtle shake animation
const shakeKeyframes = `
    @keyframes subtle-shake {
        0%, 100% { transform: translateY(-10px) translateX(0); }
        25% { transform: translateY(-10px) translateX(-1px); }
        75% { transform: translateY(-10px) translateX(1px); }
    }
`;

// ===== PERFORMANCE MONITORING =====
function initPerformanceMonitoring() {
    // Monitor scroll performance
    let scrollCount = 0;
    const scrollMonitor = () => {
        scrollCount++;
        if (scrollCount % 100 === 0) {
            console.log(`Scroll events: ${scrollCount}`);
        }
    };
    
    window.addEventListener('scroll', debounce(scrollMonitor, 100));
    
    // Monitor page load time
    window.addEventListener('load', () => {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log(`Page load time: ${loadTime}ms`);
    });
}

// ===== ERROR HANDLING =====
function initErrorHandling() {
    window.addEventListener('error', (e) => {
        if (e && e.error) {
            console.error('JavaScript error:', e.error);
            
            // Graceful degradation for critical features
            if (e.error.message && e.error.message.includes('animation')) {
                document.body.style.setProperty('--animation-disabled', '1');
            }
        }
    });
    
    // Handle unhandled promise rejections
    window.addEventListener('unhandledrejection', (e) => {
        if (e && e.reason) {
            console.error('Unhandled promise rejection:', e.reason);
        }
        e.preventDefault();
    });
}

// ===== MOBILE OPTIMIZATIONS =====
function initMobileOptimizations() {
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        // Reduce animation complexity on mobile
        document.documentElement.style.setProperty('--reduced-motion', '1');
        
        // Optimize touch interactions
        const touchElements = document.querySelectorAll('.chapter-card, .character-card, .status-card');
        
        touchElements.forEach(element => {
            element.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.98)';
            }, { passive: true });
            
            element.addEventListener('touchend', function() {
                this.style.transform = '';
            }, { passive: true });
        });
    }
    
    // Handle orientation changes
    window.addEventListener('orientationchange', debounce(() => {
        // Recalculate layouts after orientation change
        updateTimelineProgress();
    }, 250));
}

// ===== EASTER EGGS =====
function initEasterEggs() {
    let clickCount = 0;
    const heroTitle = document.querySelector('.title-main');
    
    if (heroTitle) {
        heroTitle.addEventListener('click', () => {
            clickCount++;
            
            if (clickCount === 5) {
                // Trigger special glitch effect
                heroTitle.style.animation = 'glitch 2s infinite';
                
                setTimeout(() => {
                    heroTitle.style.animation = '';
                    clickCount = 0;
                }, 5000);
            }
        });
    }
    
    // Console message easter egg
    console.log(`
    %c████████ ██   ██ ███████     ████████       ███    ██       ████████ 
    %c   ██    ██   ██ ██             ██          ████   ██          ██    
    %c   ██    ███████ █████          ██    █████ ██ ██  ██    █████ ██    
    %c   ██    ██   ██ ██             ██          ██  ██ ██          ██    
    %c   ██    ██   ██ ███████        ██          ██   ████          ██    
    %c
    %cWelcome to the T'N'T universe. Nobody walks out clean.
    %cDeveloped by hyprZona with digital blood, sweat, and code (tears).
    `, 
    'color: #00ffff; font-family: monospace;',
    'color: #ff0040; font-family: monospace;',
    'color: #00ffff; font-family: monospace;',
    'color: #ff0040; font-family: monospace;',
    'color: #00ffff; font-family: monospace;',
    'color: #ffffff;',
    'color: #ff0040; font-weight: bold;',
    'color: #00ffff; font-style: italic;'
    );
}

// ===== PROFILE MODAL FUNCTIONS =====
function showProfile(character) {
    const modal = document.getElementById('profileModal');
    const modalContent = modal.querySelector('.modal-content');
    const profile = characterProfiles[character];
    
    if (!modal || !profile) return;
    
    // Update modal content
    document.getElementById('modalImage').src = profile.image;
    document.getElementById('modalName').textContent = profile.name;
    document.getElementById('modalCodename').textContent = profile.codename;
    document.getElementById('modalStatus').textContent = profile.status;
    document.getElementById('modalAffiliation').textContent = profile.affiliation;
    document.getElementById('modalBackground').textContent = profile.background;
    
    // Update lists
    const strengthsList = document.getElementById('modalStrengths');
    const weaknessesList = document.getElementById('modalWeaknesses');
    
    strengthsList.innerHTML = profile.strengths.map(s => `<li>${s}</li>`).join('');
    weaknessesList.innerHTML = profile.weaknesses.map(w => `<li>${w}</li>`).join('');
    
    document.getElementById('modalQuote').textContent = profile.quote;
    
    // Show modal with animation
    modal.classList.add('active');
    // Important: Add these lines to make content visible
    setTimeout(() => {
        modalContent.style.opacity = '1';
        modalContent.style.transform = 'translateY(0)';
    }, 10);
    
    document.body.style.overflow = 'hidden';
}

// Update the character cards to use the new profile system
function initCharacterProfiles() {
    const profileButtons = document.querySelectorAll('.profile-btn');
    const modal = document.getElementById('profileModal');
    const modalContent = modal.querySelector('.modal-content');
    
    profileButtons.forEach(button => {
        const character = button.closest('.character-card').classList.contains('tom-card') ? 'tom' : 'tim';
        button.addEventListener('click', () => showProfile(character));
    });
    
    // Close modal functionality
    if (modal) {
        const closeBtn = modal.querySelector('.close-modal');
        closeBtn.addEventListener('click', () => {
            modalContent.style.opacity = '0';
            modalContent.style.transform = 'translateY(-50px)';
            setTimeout(() => {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }, 300);
        });
        
        // Close on overlay click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modalContent.style.opacity = '0';
                modalContent.style.transform = 'translateY(-50px)';
                setTimeout(() => {
                    modal.classList.remove('active');
                    document.body.style.overflow = '';
                }, 300);
            }
        });
    }
}

// ===== DYNAMIC CHAPTER STATUS =====
function updateStatusCardChapter() {
    // Find the latest published chapter
    const publishedChapters = chapterData.filter(ch => ch.status === 'published');
    const latestPublished = publishedChapters[publishedChapters.length - 1];
    
    if (!latestPublished) return;

    // Get chapter number from the latest published chapter's id
    // Subtract 1 from id since chapter numbers start from 0 (Prologue)
    const chapterNum = latestPublished.id - 1;

    // Find and update the status card chapter number
    const statusChapterValue = document.querySelector('.status-card .stats .stat-item:first-child .value');
    if (statusChapterValue) {
        statusChapterValue.textContent = `Ch. ${chapterNum}`;
    }
}

// Update the initialization to include both updates
function updateChapterStatus() {
    const currentDate = new Date();
    
    chapterData.forEach(chapter => {
        const chapterDate = new Date(chapter.date);
        
        if (chapterDate <= currentDate) {
            chapter.status = 'published';
        } else if (chapterDate > currentDate && chapter.status === 'current') {
            chapter.status = 'current';
        } else {
            chapter.status = 'upcoming';
        }
    });
    
    // Find the first non-published chapter and mark it as current
    const firstUpcoming = chapterData.find(chapter => chapter.status === 'upcoming');
    if (firstUpcoming) {
        firstUpcoming.status = 'current';
    }
    
    // Update both the chapters grid and status card
    populateChapters();
    updateStatusCardChapter();
}

// ===== SECTION NAVIGATOR =====
function initSectionNavigator() {
    const sections = document.querySelectorAll('section[id]');
    const navigator = document.querySelector('.section-navigator');
    
    // Update active section on scroll
    const updateActiveSection = () => {
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= (sectionTop - sectionHeight/3)) {
                currentSection = section.getAttribute('id');
            }
        });
        
        // Update active state in navigator
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
            if (item.dataset.section === currentSection) {
                item.classList.add('active');
            }
        });
    };
    
    // Smooth scroll to section when clicking navigator items
    navigator.addEventListener('click', (e) => {
        if (e.target.classList.contains('nav-item')) {
            e.preventDefault();
            const targetId = e.target.dataset.section;
            const targetSection = document.getElementById(targetId);
            
            targetSection.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
    
    // Update active section on scroll
    window.addEventListener('scroll', debounce(updateActiveSection, 100));
    
    // Initial update
    updateActiveSection();
}

// ===== DYNAMIC ROADMAP UPDATE =====
function updateRoadmap() {
    const timelineTrack = document.querySelector('.timeline-track');
    if (!timelineTrack) return;
    
    // Define chapter counts for each part
    const partStructure = {
        prologue: { start: 1, end: 1 }, // Chapter 0 (id 1)
        partI: { start: 2, end: 8 },    // 7 chapters
        partII: { start: 9, end: 17 },  // 9 chapters
        partIII: { start: 18, end: 26 }, // 9 chapters
        partIV: { start: 27, end: 33 },  // 7 chapters
        epilogue: { start: 34, end: 34 } // Final chapter
    };
    
    // Calculate current progress
    const currentDate = new Date();
    let totalProgress = 0;
    
    // Check prologue
    if (chapterData[0].status === 'published') {
        totalProgress += 16.67; // 1/6 of total progress
    }
    
    // Check Part I progress
    const partIChapters = chapterData.slice(1, 8);
    const partIPublished = partIChapters.filter(ch => ch.status === 'published').length;
    const partIProgress = (partIPublished / 7) * 16.67;
    totalProgress += partIProgress;
    
    // Update milestone statuses
    document.querySelectorAll('.milestone').forEach(milestone => {
        const milestoneText = milestone.querySelector('h4')?.textContent.toLowerCase();
        
        if (milestoneText.includes('prologue')) {
            milestone.dataset.status = chapterData[0].status === 'published' ? 'complete' : 'pending';
        }
        else if (milestoneText.includes('part i')) {
            const allPublished = partIChapters.every(ch => ch.status === 'published');
            const anyPublished = partIChapters.some(ch => ch.status === 'published');
            milestone.dataset.status = allPublished ? 'complete' : 
                                     anyPublished ? 'current' : 'pending';
        }
        else {
            milestone.dataset.status = 'pending';
        }
    });
    
    // Update progress bar
    const progressBar = document.getElementById('timelineProgress');
    if (progressBar) {
        progressBar.style.width = `${totalProgress}%`;
    }
}

// Add styles for the new Wattpad button
const styles = `
    .chapter-buttons {
        display: flex;
        gap: 1rem;
        margin-top: 1rem;
    }

    .wattpad-btn {
        background: transparent;
        border: 1px solid #ff6600;
        color: #ff6600;
        padding: 0.5rem 1rem;
        border-radius: 4px;
        cursor: pointer;
        font-family: var(--font-mono);
        font-size: 0.8rem;
        transition: all 0.3s ease;
        text-decoration: none;
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
    }

    .wattpad-btn:hover {
        background: #ff6600;
        color: var(--color-black);
    }
`;

// Add the styles to the document
const styleSheet = document.createElement("style");
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    console.log('Initializing T\'N\'T website...');
    
    try {
        // Core functionality
        const chapterGrid = document.getElementById('chapterGrid');
        if (chapterGrid) {
            populateChapters();
        }

        // Update chapter status and status card
        updateChapterStatus();
        updateStatusCardChapter();
        
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            initNavbarScrollEffect();
        }

        const terminalElement = document.querySelector('.typing-effect');
        if (terminalElement) {
            initTerminalEffect();
        }

        const glitchElements = document.querySelectorAll('.glitch-text');
        if (glitchElements.length > 0) {
            initGlitchEffects();
        }

        initScrollAnimations();
        updateTimelineProgress();
        
        // Enhanced features
        const heroSection = document.querySelector('.hero-section');
        if (heroSection) {
            initParallaxEffect();
        }

        const characterCards = document.querySelectorAll('.character-card');
        if (characterCards.length > 0) {
            initCharacterEffects();
        }

        initKeyboardShortcuts();
        initMobileOptimizations();
        
        // Monitoring and error handling
        initPerformanceMonitoring();
        initErrorHandling();
        
        // Fun stuff
        initEasterEggs();
        
        // Initialize character profiles
        initCharacterProfiles();
        
        // Update chapter status and initialize dynamic features
        updateChapterStatus();
        initSectionNavigator();
        updateRoadmap();
        
        console.log('T\'N\'T website initialized successfully.');
        
    } catch (error) {
        console.error('Error initializing website:', error);
        
        // Fallback initialization for critical features
        const chapterGrid = document.getElementById('chapterGrid');
        if (chapterGrid) {
            populateChapters();
            updateStatusCardChapter(); // Add fallback update
        }
    }
});

// ===== GLOBAL FUNCTIONS (for HTML onclick handlers) =====
window.toggleChapterSpoiler = toggleChapterSpoiler;

// ===== RESIZE HANDLER =====
window.addEventListener('resize', debounce(() => {
    updateTimelineProgress();
    
    // Reinitialize mobile optimizations if screen size changes significantly
    const wasMobile = document.documentElement.style.getPropertyValue('--reduced-motion') === '1';
    const isMobile = window.innerWidth <= 768;
    
    if (wasMobile !== isMobile) {
        initMobileOptimizations();
    }
}, 250));