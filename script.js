document.addEventListener('DOMContentLoaded', () => {
    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Enhanced smooth scrolling with custom easing
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                // Add a subtle highlight effect
                targetElement.classList.add('scroll-highlight');
                setTimeout(() => {
                    targetElement.classList.remove('scroll-highlight');
                }, 1500);
            }
        });
    });

    // Project Carousel Auto-Scroll with Enhanced Interactions
    function initProjectCarousel() {
        const carousel = document.querySelector('.project-carousel');
        if (!carousel) return;

        const projects = carousel.querySelectorAll('.project-card');
        let currentIndex = 0;
        let autoScrollInterval;

        function rotateProjects() {
            // Remove active states from all projects
            projects.forEach(project => {
                project.classList.remove('active');
                project.classList.add('fade-out');
            });
            
            // Add active state to current project
            projects[currentIndex].classList.remove('fade-out');
            projects[currentIndex].classList.add('active');
            
            // Move to next project
            currentIndex = (currentIndex + 1) % projects.length;
        }

        function startAutoScroll() {
            autoScrollInterval = setInterval(rotateProjects, 5000);
        }

        function stopAutoScroll() {
            clearInterval(autoScrollInterval);
        }

        // Manual navigation controls
        projects.forEach((project, index) => {
            project.addEventListener('mouseenter', () => {
                stopAutoScroll();
                
                // Highlight hovered project
                projects.forEach(p => p.classList.remove('hover'));
                project.classList.add('hover');
            });

            project.addEventListener('mouseleave', () => {
                project.classList.remove('hover');
                startAutoScroll();
            });
        });

        // Initial setup
        rotateProjects();
        startAutoScroll();
    }

    // Enhanced Reveal Animations for Sections
    function addScrollRevealAnimations() {
        const sections = document.querySelectorAll('.about-section, .featured-projects, .testimonials, .contact-section, .about-me-section, .news-section');
        
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    entry.target.classList.remove('hidden');
                    
                    // Add stagger effect for child elements
                    const animatableElements = entry.target.querySelectorAll(
                        'h2, h3, p, .project-card, .testimonial-card, .news-card, .social-group'
                    );
                    
                    animatableElements.forEach((el, index) => {
                        el.style.transitionDelay = `${index * 0.1}s`;
                        el.classList.add('stagger-reveal');
                    });
                }
            });
        }, observerOptions);

        sections.forEach(section => {
            section.classList.add('hidden');
            observer.observe(section);
        });
    }

    // Dynamic News/Announcements Update (Enhanced)
    function updateNewsSection() {
        const newsContainer = document.querySelector('.news-container');
        if (!newsContainer) return;

        // Placeholder for potential dynamic content fetching
        const newsUpdates = [
            {
                date: 'September 2024',
                title: 'Beyond the Illusions Out Now',
                description: 'Experience our first game on itch.io! It is just a prototype meant to set my hands in Godot.',
                link: 'games/BTI.html'
            }
        ];

        // Dynamically add news updates with enhanced animation
        newsUpdates.forEach((update, index) => {
            const newsCard = document.createElement('div');
            newsCard.classList.add('news-card', 'news-card-dynamic');
            newsCard.style.animationDelay = `${index * 0.2}s`;
            newsCard.innerHTML = `
                <span class="news-date">${update.date}</span>
                <h3>${update.title}</h3>
                <p>${update.description}</p>
                <a href="${update.link}" class="btn btn-primary">Read More</a>
            `;
            newsContainer.appendChild(newsCard);
        });
    }

    // Navigation Menu Interactivity
    function enhanceNavigation() {
        const nav = document.getElementById('main-nav');
        const navLinks = nav.querySelectorAll('ul li a');

        navLinks.forEach(link => {
            link.addEventListener('mouseenter', () => {
                navLinks.forEach(otherLink => {
                    if (otherLink !== link) {
                        otherLink.style.opacity = '0.5';
                    }
                });
            });

            link.addEventListener('mouseleave', () => {
                navLinks.forEach(otherLink => {
                    otherLink.style.opacity = '1';
                });
            });
        });
    }

    // Initialize all features
    initProjectCarousel();
    addScrollRevealAnimations();
    updateNewsSection();
    enhanceNavigation();

    // Add a global loading fade-out effect
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });
});

// Performance and Accessibility Enhancements
document.addEventListener('DOMContentLoaded', () => {
    // Lazy loading for images
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        let imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    let image = entry.target;
                    image.src = image.dataset.src;
                    image.classList.add('fade-in');
                    imageObserver.unobserve(image);
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.01
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    }
});