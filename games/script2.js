// Blood Drip Effects Enhancement
class BloodEffect {
    constructor() {
        this.container = document.querySelector('.blood-drips-container');
        this.maxDrips = 20;
        this.drips = [];
        this.init();
    }

    init() {
        this.createInitialDrips();
        this.startPeriodicRefresh();
    }

    createDrip() {
        const drip = document.createElement('div');
        drip.className = 'blood-drip';
        this.setDripProperties(drip);
        this.container.appendChild(drip);
        return drip;
    }

    setDripProperties(drip) {
        const randomLeft = Math.random() * 100;
        const randomHeight = 50 + Math.random() * 150;
        const randomDelay = Math.random() * 5;
        const randomDuration = 3 + Math.random() * 4;

        drip.style.left = `${randomLeft}%`;
        drip.style.setProperty('--drip-height', `${randomHeight}px`);
        drip.style.animationDelay = `${randomDelay}s`;
        drip.style.animationDuration = `${randomDuration}s`;
    }

    createInitialDrips() {
        for (let i = 0; i < this.maxDrips; i++) {
            this.drips.push(this.createDrip());
        }
    }

    refreshDrip(drip) {
        drip.style.opacity = '0';
        setTimeout(() => {
            this.setDripProperties(drip);
            drip.style.opacity = '1';
        }, 300);
    }

    startPeriodicRefresh() {
        setInterval(() => {
            const randomDrips = this.drips
                .sort(() => Math.random() - 0.5)
                .slice(0, Math.floor(this.maxDrips / 3));
            
            randomDrips.forEach((drip, index) => {
                setTimeout(() => this.refreshDrip(drip), index * 100);
            });
        }, 6000);
    }
}

// Smooth Scroll Enhancement
class SmoothScroll {
    constructor() {
        this.initializeScrollListeners();
    }

    initializeScrollListeners() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', this.handleClick.bind(this));
        });
    }

    handleClick(e) {
        e.preventDefault();
        const targetId = e.currentTarget.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (!targetElement) return;

        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });

        // Update active nav state
        this.updateActiveNavItem(targetId);
    }

    updateActiveNavItem(targetId) {
        document.querySelectorAll('.nav a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === targetId) {
                link.classList.add('active');
            }
        });
    }
}

// Parallax Effect Enhancement
class ParallaxEffect {
    constructor() {
        this.hero = document.querySelector('.hero');
        this.features = document.querySelectorAll('.feature-card');
        this.lastScrollPosition = window.pageYOffset;
        this.ticking = false;
        
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => this.handleScroll());
        window.addEventListener('resize', () => this.handleScroll());
    }

    handleScroll() {
        this.lastScrollPosition = window.pageYOffset;
        if (!this.ticking) {
            window.requestAnimationFrame(() => {
                this.updateParallax();
                this.ticking = false;
            });
            this.ticking = true;
        }
    }

    updateParallax() {
        // Hero parallax
        const scrolled = this.lastScrollPosition;
        const speed = 0.5;
        this.hero.style.transform = `translateY(${scrolled * speed}px)`;
        
        // Feature cards parallax
        this.features.forEach((card, index) => {
            const rect = card.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (isVisible) {
                const distance = window.innerHeight - rect.top;
                const movement = Math.min(Math.max(distance / window.innerHeight, 0), 1);
                const translateY = (1 - movement) * 50;
                const opacity = movement;
                
                card.style.transform = `translateY(${translateY}px)`;
                card.style.opacity = opacity;
            }
        });
    }
}

// Intersection Observer for Animations
class ScrollAnimations {
    constructor() {
        this.animatedElements = '.feature-card, .story-content, .media-item, .hero-content';
        this.observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };
        
        this.init();
    }

    init() {
        this.observer = new IntersectionObserver(
            this.handleIntersection.bind(this),
            this.observerOptions
        );

        document.querySelectorAll(this.animatedElements).forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            this.observer.observe(element);
        });
    }

    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                this.observer.unobserve(entry.target);
            }
        });
    }
}

// Initialize all effects
document.addEventListener('DOMContentLoaded', () => {
    const bloodEffect = new BloodEffect();
    const smoothScroll = new SmoothScroll();
    const parallaxEffect = new ParallaxEffect();
    const scrollAnimations = new ScrollAnimations();
});