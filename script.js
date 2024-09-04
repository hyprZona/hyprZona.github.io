$(document).ready(function() {
    // Navigation toggle for mobile
    $('.nav-toggle').click(function() {
        $('.sidebar').toggleClass('active');
        $(this).toggleClass('active');
    });

    // Submenu toggle
    $('.expandable > a').click(function(e) {
        e.preventDefault();
        $(this).parent().toggleClass('expanded');
        $(this).next('.submenu').slideToggle(300);
    });

    // Smooth scrolling for anchor links
    $('a[href^="#"]').on('click', function(event) {
        var target = $(this.getAttribute('href'));
        if (target.length) {
            event.preventDefault();
            $('html, body').stop().animate({
                scrollTop: target.offset().top
            }, 1000);
        }
    });

    // Add active class to current page in navigation
    var path = window.location.pathname;
    var page = path.split("/").pop();
    
    $('.sidebar li a').each(function() {
        var href = $(this).attr('href');
        if (page === href) {
            $(this).parent().addClass('active');
        }
    });

    // Lazy loading for images
    if ('IntersectionObserver' in window) {
        const images = document.querySelectorAll('img[data-src]');
        const config = {
            rootMargin: '50px 0px',
            threshold: 0.01
        };

        let observer = new IntersectionObserver((entries, self) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    let img = entry.target;
                    img.src = img.dataset.src;
                    self.unobserve(img);
                }
            });
        }, config);

        images.forEach(image => {
            observer.observe(image);
        });
    }

    // Simple form validation for contact form (if added later)
    $('form').submit(function(event) {
        var isValid = true;
        $(this).find('input[required], textarea[required]').each(function() {
            if (!$(this).val()) {
                isValid = false;
                $(this).addClass('error');
            } else {
                $(this).removeClass('error');
            }
        });
        if (!isValid) {
            event.preventDefault();
        }
    });

    // Expandable sections toggle
    $('.expandable-section h2').click(function() {
        $(this).next('.content').slideToggle(300);
        $(this).find('.arrow').toggleClass('rotated');
    });

    // Calculate and display age
    function calculateAge(birthDate) {
        const birth = new Date(birthDate);
        const diff = Date.now() - birth.getTime();
        const ageDate = new Date(diff);
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }

    // Set age dynamically
    const birthDate = '2007-12-17'; // Replace with actual birthdate
    const age = calculateAge(birthDate);
    $('#age').text(age);
});
