document.addEventListener('DOMContentLoaded', () => {
    // Advanced Noir Cursor Effect
    const cursor = document.createElement('div');
    cursor.classList.add('noir-cursor');
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
    });

    // Interactive elements with cursor effect
    const interactiveElements = document.querySelectorAll('a, button, .interactive');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
            el.classList.add('element-hover');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
            el.classList.remove('element-hover');
        });
    });

    // Smooth Scrolling for Navigation
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });

    // Refined Parallax Effect with Containment
    const parallaxElements = [
        { element: document.querySelector('#hero'), speed: 0.2, container: document.querySelector('#hero-container') },
        { element: document.querySelector('#synopsis'), speed: 0.1, container: document.querySelector('#synopsis-container') },
        { element: document.querySelector('#author-note'), speed: 0.1, container: document.querySelector('#author-note-container') },
        { element: document.querySelector('#reviews'), speed: 0.2, container: document.querySelector('#reviews-container') },
        { element: document.querySelector('#trailer'), speed: 0.2, container: document.querySelector('#trailer-container') }
    ];

    function applyParallax() {
        const scrollPosition = window.pageYOffset;
        
        parallaxElements.forEach(item => {
            if (item.element && item.container) {
                // Calculate parallax within container bounds
                const containerRect = item.container.getBoundingClientRect();
                const containerTop = containerRect.top + window.pageYOffset;
                const containerHeight = containerRect.height;
                
                // Only apply parallax when section is in view
                if (
                    scrollPosition + window.innerHeight > containerTop &&
                    scrollPosition < containerTop + containerHeight
                ) {
                    // Constrain parallax movement to prevent excessive shifting
                    const translateY = Math.max(
                        -containerHeight * 0.2, 
                        Math.min(
                            containerHeight * 0.2, 
                            scrollPosition * item.speed
                        )
                    );
                    
                    // Use transform for better performance
                    item.element.style.transform = `translateY(${translateY}px)`;
                }
            }
        });
    }

    // Throttle parallax to improve performance
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                applyParallax();
                ticking = false;
            });
            ticking = true;
        }
    });

    // Animated Reveal for Sections
    const revealSections = document.querySelectorAll('#synopsis, #author-note, #reviews, #purchase, #trailer');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealSections.forEach(section => {
        section.classList.add('section-hidden');
        revealObserver.observe(section);
    });
});

// Additional Noir-inspired Styles
const noirStyleSheet = document.createElement('style');
noirStyleSheet.textContent = `
    /* Prevent section overlapping */
    #hero-container, #synopsis-container, #author-note-container, 
    #reviews-container, #trailer-container {
        position: relative;
        overflow: hidden;
    }

    /* Ensure sections have proper spacing */
    #hero, #synopsis, #author-note, #reviews, #trailer {
        position: relative;
        margin-bottom: 2rem;
        padding: 2rem 0;
    }

    /* Noir Cursor */
    .noir-cursor {
        position: fixed;
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background: rgba(255,255,255,0.1);
        border: 1px solid rgba(255,255,255,0.3);
        transform: translate(-50%, -50%);
        pointer-events: none;
        transition: transform 0.2s ease, background 0.2s ease;
        mix-blend-mode: difference;
        z-index: 9999;
    }

    .noir-cursor.hover {
        transform: translate(-50%, -50%) scale(2);
        background: rgba(255,255,255,0.2);
    }

    /* Section Reveal Animation */
    .section-hidden {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 1s ease, transform 1s ease;
    }

    .section-revealed {
        opacity: 1;
        transform: translateY(0);
    }

    /* Hover Effects */
    .element-hover {
        transform: scale(1.05);
        transition: transform 0.3s ease;
    }
`;
document.head.appendChild(noirStyleSheet);