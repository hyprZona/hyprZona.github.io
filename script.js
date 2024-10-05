document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Parallax effect for hero section
    window.addEventListener('scroll', () => {
        const heroSection = document.querySelector('.hero');
        const scrollPosition = window.pageYOffset;
        heroSection.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
    });

    // Neon flicker effect for logo
    const logo = document.querySelector('.logo');
    setInterval(() => {
        logo.style.textShadow = Math.random() > 0.9 ? 'none' : '0 0 10px var(--primary-color), 0 0 20px var(--primary-color), 0 0 30px var(--primary-color)';
    }, 100);

    // Animate news items on scroll
    const newsItems = document.querySelectorAll('.news-item');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    newsItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(item);
    });

    // Typing effect for subtitle
    const subtitle = document.querySelector('.subtitle');
    const text = subtitle.textContent;
    subtitle.textContent = '';
    let index = 0;
    function typeText() {
        if (index < text.length) {
            subtitle.textContent += text.charAt(index);
            index++;
            setTimeout(typeText, 50);
        }
    }
    setTimeout(typeText, 1000);

    // Scroll reveal animation
    function revealOnScroll() {
        var reveals = document.querySelectorAll('.reveal');
        
        for (var i = 0; i < reveals.length; i++) {
            var windowHeight = window.innerHeight;
            var elementTop = reveals[i].getBoundingClientRect().top;
            var elementVisible = 150;
            
            if (elementTop < windowHeight - elementVisible) {
                reveals[i].classList.add('active');
            } else {
                reveals[i].classList.remove('active');
            }
        }
    }
    window.addEventListener('scroll', revealOnScroll);
    
    // Trigger initial check for scroll reveal
    revealOnScroll();
});

document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Parallax effect for hero section
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        window.addEventListener('scroll', () => {
            const scrollPosition = window.pageYOffset;
            heroSection.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
        });
    }

    // Neon flicker effect for logo
    const logo = document.querySelector('.logo');
    if (logo) {
        setInterval(() => {
            logo.style.textShadow = Math.random() > 0.9 ? 'none' : '0 0 10px var(--primary-color), 0 0 20px var(--primary-color), 0 0 30px var(--primary-color)';
        }, 100);
    }

    // Animate news items on scroll
    const newsItems = document.querySelectorAll('.news-item');
    if (newsItems.length > 0) {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        newsItems.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            observer.observe(item);
        });
    }

    // Typing effect for subtitle
    const subtitle = document.querySelector('.subtitle');
    if (subtitle) {
        const text = subtitle.textContent;
        subtitle.textContent = '';
        let index = 0;
        function typeText() {
            if (index < text.length) {
                subtitle.textContent += text.charAt(index);
                index++;
                setTimeout(typeText, 50);
            }
        }
        setTimeout(typeText, 1000);
    }

    // Scroll reveal animation
    function revealOnScroll() {
        var reveals = document.querySelectorAll('.reveal');
        
        for (var i = 0; i < reveals.length; i++) {
            var windowHeight = window.innerHeight;
            var elementTop = reveals[i].getBoundingClientRect().top;
            var elementVisible = 150;
            
            if (elementTop < windowHeight - elementVisible) {
                reveals[i].classList.add('active');
            } else {
                reveals[i].classList.remove('active');
            }
        }
    }
    if (document.querySelectorAll('.reveal').length > 0) {
        window.addEventListener('scroll', revealOnScroll);
        // Trigger initial check for scroll reveal
        revealOnScroll();
    }

    // Interactive menu functionality
    const gamesButton = document.querySelector('#gamesButton');
    const storiesButton = document.querySelector('#storiesButton');
    const menuOverlay = document.querySelector('#menuOverlay');
    const closeButton = document.querySelector('#closeButton');
    const gamesOptions = document.querySelector('#gamesOptions');
    const storiesOptions = document.querySelector('#storiesOptions');

    if (gamesButton && storiesButton && menuOverlay && closeButton && gamesOptions && storiesOptions) {
        function showMenu(options) {
            menuOverlay.style.display = 'flex';
            options.style.display = 'block';
        }

        function hideMenu() {
            menuOverlay.style.display = 'none';
            gamesOptions.style.display = 'none';
            storiesOptions.style.display = 'none';
        }

        gamesButton.addEventListener('click', () => showMenu(gamesOptions));
        storiesButton.addEventListener('click', () => showMenu(storiesOptions));
        closeButton.addEventListener('click', hideMenu);
    } else {
        console.warn('Some elements for the interactive menu are missing. Please check your HTML.');
    }
});