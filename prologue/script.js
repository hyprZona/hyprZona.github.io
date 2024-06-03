document.addEventListener('DOMContentLoaded', () => {
    const prevButton = document.getElementById('prev-button');
    const nextButton = document.getElementById('next-button');
    const chapterDropdown = document.getElementById('chapter-dropdown');
    const unlockPopup = document.getElementById('unlock-popup');
    const unlockDateElem = document.getElementById('unlock-date');
    const fullscreenButton = document.getElementById('fullscreen-button');

    // Mobile-specific elements
    const prevButtonMobile = document.getElementById('prev-button-mobile');
    const nextButtonMobile = document.getElementById('next-button-mobile');
    const chapterDropdownMobile = document.getElementById('chapter-dropdown-mobile');
    const fullscreenButtonMobile = document.getElementById('fullscreen-button-mobile');

    const chapters = [
        { key: 'introduction', title: 'Introduction', url: 'https://drive.google.com/file/d/1_ZfX-yrzAt6RVFfYONOonBdbWGf8i_F7/preview', unlockDate: new Date('2024-05-03') },
        { key: 'part1-ch1', title: 'Part I - Chapter 1', url: 'https://drive.google.com/file/d/1FXG4_Z4OESFEfdH-BcHolCWUCOQqeD0l/preview', unlockDate: new Date('2024-05-05') },
        { key: 'part1-ch2', title: 'Part I - Chapter 2', url: 'https://drive.google.com/file/d/1D2wx8s0ZQC96BI-vGjZojKZTl_KH_AjX/preview', unlockDate: new Date('2024-05-12') },
        { key: 'part1-ch3', title: 'Part I - Chapter 3', url: 'https://drive.google.com/file/d/1RxPZFJ9knB7AH98yNy7wCbJDq0Fv1luC/preview', unlockDate: new Date('2024-05-19') },
        { key: 'part1-ch4', title: 'Part I - Chapter 4', url: 'https://drive.google.com/file/d/1PEIZcyEed0HzhKDWNz5YZGMaiSPpaOuu/preview', unlockDate: new Date('2024-05-26') },
        { key: 'part2-ch5', title: 'Part II - Chapter 5', url: 'https://drive.google.com/file/d/1BUIeFJ9pGFY8xasOUmK7phGSn9L5QlDy/preview', unlockDate: new Date('2024-06-02') },
        { key: 'part2-ch6', title: 'Part II - Chapter 6', url: 'https://drive.google.com/file/d/1ndzTkWDmhtGnWun0HXo15_JA6rCsJ6x7/preview', unlockDate: new Date('2024-06-09') },
        { key: 'part2-ch7', title: 'Part II - Chapter 7', url: 'https://drive.google.com/file/d/1eNZkkLq9H7zycUYJ0OnY2o3SpTJhsa8c/preview', unlockDate: new Date('2024-06-16') },
        { key: 'part3-ch8', title: 'Part III - Chapter 8', url: 'https://drive.google.com/file/d/19FdPLlCDlzPQGi2p4pmfbsvkWfJXUyjM/preview', unlockDate: new Date('2024-06-23') },
        { key: 'part3-ch9', title: 'Part III - Chapter 9', url: 'https://drive.google.com/file/d/1NZE6AOh_0UbujSMquFopRIUjTqri3OJK/preview', unlockDate: new Date('2024-06-30') },
        { key: 'part3-ch10', title: 'Part III - Chapter 10', url: 'https://drive.google.com/file/d/1CDZY8pnIuSBXKzqXGH_U1oDQ4-psYbKi/preview', unlockDate: new Date('2024-07-07') },
        { key: 'part3-ch11', title: 'Part III - Chapter 11', url: 'https://drive.google.com/file/d/1DsrffcD7VEBqPJbDMOZVo_cNIJgjFxNF/preview', unlockDate: new Date('2024-07-14') }
    ];

    let currentIndex = 0;
    const now = new Date();

    // Populate the dropdown with unlocked chapters for both desktop and mobile
    chapters.forEach((chapter, index) => {
        if (now >= chapter.unlockDate) {
            const option = document.createElement('option');
            option.value = index;
            option.text = chapter.title;
            chapterDropdown.appendChild(option);

            const optionMobile = document.createElement('option');
            optionMobile.value = index;
            optionMobile.text = chapter.title;
            chapterDropdownMobile.appendChild(optionMobile);
        }
    });

    // Load the initial chapter
    loadChapter(currentIndex);

    // Desktop event listeners
    prevButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            loadChapter(currentIndex);
        }
    });

    nextButton.addEventListener('click', () => {
        if (currentIndex < chapters.length - 1) {
            currentIndex++;
            loadChapter(currentIndex);
        }
    });

    chapterDropdown.addEventListener('change', () => {
        const selectedIndex = parseInt(chapterDropdown.value, 10);
        if (selectedIndex >= 0 && selectedIndex < chapters.length) {
            currentIndex = selectedIndex;
            loadChapter(currentIndex);
        }
    });

    fullscreenButton.addEventListener('click', () => {
        toggleFullscreen();
    });

    // Mobile event listeners
    prevButtonMobile.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            loadChapter(currentIndex);
        }
    });

    nextButtonMobile.addEventListener('click', () => {
        if (currentIndex < chapters.length - 1) {
            currentIndex++;
            loadChapter(currentIndex);
        }
    });

    chapterDropdownMobile.addEventListener('change', () => {
        const selectedIndex = parseInt(chapterDropdownMobile.value, 10);
        if (selectedIndex >= 0 && selectedIndex < chapters.length) {
            currentIndex = selectedIndex;
            loadChapter(currentIndex);
        }
    });

    fullscreenButtonMobile.addEventListener('click', () => {
        toggleFullscreen();
    });

    function toggleFullscreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    }

    function loadChapter(index) {
        const chapter = chapters[index];
        if (now >= chapter.unlockDate) {
            loadPDF(chapter.url);
            prevButton.style.display = index === 0 ? 'none' : 'inline-block';
            nextButton.style.display = index === chapters.length - 1 ? 'none' : 'inline-block';
            prevButtonMobile.style.display = index === 0 ? 'none' : 'inline-block';
            nextButtonMobile.style.display = index === chapters.length - 1 ? 'none' : 'inline-block';
            chapterDropdown.value = index;
            chapterDropdownMobile.value = index;
        } else {
            unlockDateElem.textContent = chapter.unlockDate.toDateString();
            unlockPopup.classList.remove('hidden');
            setTimeout(() => unlockPopup.classList.add('hidden'), 3000);
            nextButton.style.display = 'none';
            nextButtonMobile.style.display = 'none';
        }
    }

    function loadPDF(url) {
        const iframe = document.createElement('iframe');
        iframe.src = url;
        iframe.width = "100%";
        iframe.height = "100%"; // Make iframe take the full height of the main element
        iframe.style.border = "none";

        const main = document.querySelector('main');
        main.innerHTML = ''; // Clear previous content
        main.appendChild(iframe);

        // Set the height of the main container to fit the screen dynamically
        const headerHeight = document.querySelector('header').offsetHeight;
        main.style.height = `calc(100vh - ${headerHeight}px)`;
    }
});

$(document).ready(function() {
    $('.navbar-toggle').on('click', function() {
        $('.sidebar').toggleClass('open');
    });

    $('.expandable').on('click', function() {
        $(this).find('.submenu').slideToggle();
        $(this).find('.expand-icon').toggleClass('rotated');
    });

    $('.news-carousel').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        dots: true,
        arrows: false,
        adaptiveHeight: true,
    });
});