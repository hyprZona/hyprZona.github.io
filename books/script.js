document.addEventListener("DOMContentLoaded", function () {
    const headerToggle = document.querySelector('.header-toggle');
    const headerSidebar = document.querySelector('.header-sidebar');
    const navbarToggle = document.querySelector('.navbar-toggle');
    const sidebar = document.querySelector('.sidebar');
    const expandableItems = document.querySelectorAll('.expandable');
    const chapterDropdown = document.getElementById('chapter-dropdown');
    const prevButton = document.getElementById('prev-button');
    const nextButton = document.getElementById('next-button');
    const fullscreenButton = document.getElementById('fullscreen-button');
    const unlockPopup = document.getElementById('unlock-popup');
    const unlockDateSpan = document.getElementById('unlock-date');
    const summaryDiv = document.getElementById('chapter-summary');
    const readTimeSpan = document.getElementById('chapter-read-time');

    const chapters = [
        { part: 'Intro', title: 'Introduction', url: 'https://1drv.ms/b/c/8733ebcc765b0f03/IQNGzSEYSNubQY-PuURk2du6AVMCQkvnxTMPynrsR0O4jBY', unlockDate: new Date('2024-05-03T18:30:00Z'), summary: 'Meet the protogonist duo of the story as they converse about the screwed situation!', readTime: '1 min.' },
        { part: 'Part 1', title: 'Chapter 1: Legacy of Shadows', url: 'https://1drv.ms/b/c/8733ebcc765b0f03/IQOrABA8hOooT7nLwIpAX00TAS8KLUA3dENHZPBlGBCaSkY', unlockDate: new Date('2024-05-05T18:30:00Z'), summary: "Learn about Tom's fate from the introduction.", readTime: '6 mins' },
        { part: 'Part 1', title: 'Chapter 2: The Chinatown War', url: 'https://1drv.ms/b/c/8733ebcc765b0f03/IQOPcu_Hiu7uTrvIWDbgxETlASAc37FpWWgJqeUOWP7kyvg', unlockDate: new Date('2024-05-12T18:30:00Z'), summary: "A life changing case of Tom's life as an U.I.P.D. officer.", readTime: '9 mins' },
        { part: 'Part 1', title: 'Chapter 3: The Unbreakable Duo', url: 'https://1drv.ms/b/c/8733ebcc765b0f03/IQM3EK6lkfNOQpbRU1MjhbBAAfjwiO-vU1w1xioY2xaMz-0', unlockDate: new Date('2024-05-19T18:30:00Z'), summary: "Explore a drug filled warehouse with The T'N'T as they navigate it to complete a D.E.A. mission.", readTime: '4 mins' },
        { part: 'Part 1', title: 'Chapter 4: Ending the Cartel', url: 'https://1drv.ms/b/c/8733ebcc765b0f03/IQPjR66vL078Sb_50yis_IM4ATMLZFrG3NcWhXSF5lfR3go', unlockDate: new Date('2024-05-26T18:30:00Z'), summary: 'Learn about how Tom & Tim tackle the Cartel situation!', readTime: '5 mins' },
        { part: 'Part 2', title: 'Chapter 5: The Bad Old Times', url: 'https://1drv.ms/b/c/8733ebcc765b0f03/IQPJqsDwpxJoRrJDb1h-KoXGAWLhpjixf5UdShJzpy_I0TQ', unlockDate: new Date('2024-06-02T18:30:00Z'), summary: "Experience Tim's dark past with his detailed flashback.", readTime: '15 mins' },
        { part: 'Part 2', title: 'Chapter 6: Shaping Up', url: 'https://1drv.ms/b/c/8733ebcc765b0f03/IQNKQbfhyszlRL_PmrJUGXAMAfbih1uiUr4_uiBtXgBij9I', unlockDate: new Date('2024-06-09T18:30:00Z'), summary: 'Find out what shifted Tim from a revenge hungery kid to a true justice fighter.', readTime: '7 mins' },
        { part: 'Part 2', title: "Chapter 7: The T'N'T", url: 'https://1drv.ms/b/c/8733ebcc765b0f03/IQN0DDlG1nrlS5H_ND6jFfD7AeWht65Se4YyuB70SbzXcVk', unlockDate: new Date('2024-06-16T18:30:00Z'), summary: 'A surprise awaits for Tim!', readTime: '5 mins' },
        { part: 'Part 3', title: 'Chapter 8: The Black Van', url: 'https://1drv.ms/b/c/8733ebcc765b0f03/IQO8CcCq1xPLRLUbcoM6xkUJAYtrAKFfPuwCxMZ1kVHM7tA', unlockDate: new Date('2024-06-23T18:30:00Z'), summary: 'The begging of the most intense mission of Tom & Tim as U.I.P.D. officers.', readTime: '4 mins' },
        { part: 'Part 3', title: 'Chapter 9: Prototype 5', url: 'https://1drv.ms/b/c/8733ebcc765b0f03/IQPYSXWI5SVUS7WLpXsuXFP5AfffdMDO8PCyioBpBG5PdY4', unlockDate: new Date('2024-06-30T18:30:00Z'), summary: "It's about Prototype 5.", readTime: '3 mins' },
        { part: 'Part 3', title: 'Chapter 10: Ending it once & for all', url: 'https://1drv.ms/b/c/8733ebcc765b0f03/IQNHY3jXtdo4Tp6kb51mY4Q9AcY-NrPPBzPNWHRj1tU2gFk', unlockDate: new Date('2024-07-07T18:30:00Z'), summary: 'Did Tim survive the fall or not? Did Tom take his revenge on Mike? Read and find it out!', readTime: '10 mins' },
        { part: 'Part 3', title: 'Chapter 11: Not all ends well', url: 'https://1drv.ms/b/c/8733ebcc765b0f03/IQMSRMH-3DZ9RZ2KIYGD4bW8AT1mdWsLcYLnSb0_vkyGg-M', unlockDate: new Date('2024-07-14T18:30:00Z'), summary: 'Something unexpected happened that changes things by a storm!', readTime: '3 mins' },
        { part: 'Credits', title: 'Post Credits', url: 'https://1drv.ms/b/c/8733ebcc765b0f03/IQOKC8BN_7v7Sr1Q3JYDieKqAV6DX82j1kdqMNXGw_ZZFR8', unlockDate: new Date('2024-07-14T18:30:00Z'), summary: "It's not just credits and a special thanks!", readTime: '2 mins' },
    ];

    let currentChapterIndex = 0;

    function populateChapterDropdown() {
        chapterDropdown.innerHTML = '';
        let currentPart = '';

        const now = new Date();

        chapters.forEach((chapter, index) => {
            if (now >= chapter.unlockDate) {
                const option = document.createElement('option');
                option.value = index;
                option.textContent = `${chapter.title}`;

                if (chapter.part !== currentPart) {
                    const partOption = document.createElement('option');
                    partOption.textContent = `${chapter.part}`;
                    partOption.disabled = true;
                    chapterDropdown.appendChild(partOption);
                    currentPart = chapter.part;
                }

                chapterDropdown.appendChild(option);
            }
        });

        updateButtonsVisibility();
    }

function loadPDF(url) {
    const iframe = document.createElement('iframe');
    iframe.src = url;
    iframe.width = "100%";
    iframe.height = "100%";
    iframe.classList.add('pdf-frame'); // Add this line to apply the CSS class

    const main = document.querySelector('main');
    main.innerHTML = '';
    main.appendChild(iframe);

    const header = document.querySelector('header');
    if (header) {
        const headerHeight = header.offsetHeight;
        main.style.height = `calc(100vh - ${headerHeight}px)`;
    } else {
        console.error('Header element not found.');
    }
}

    function loadChapter(index) {
        const chapter = chapters[index];
        const now = new Date();
        const unlockDate = new Date(chapter.unlockDate);

        if (now < unlockDate) {
            unlockPopup.classList.remove('hidden');
            unlockDateSpan.textContent = chapter.unlockDate.toLocaleString();
            return;
        } else {
            unlockPopup.classList.add('hidden');
        }

        loadPDF(chapter.url);
        updateButtonsVisibility();

        // Update summary and read time
        summaryDiv.textContent = chapter.summary;
        readTimeSpan.textContent = chapter.readTime;
    }

    function onPrevChapter() {
        if (currentChapterIndex > 0) {
            currentChapterIndex--;
            updateChapterDisplay();
            loadChapter(currentChapterIndex);
        }
    }

    function onNextChapter() {
        if (currentChapterIndex < chapters.length - 1) {
            currentChapterIndex++;
            updateChapterDisplay();
            loadChapter(currentChapterIndex);
        }
    }

    function updateChapterDisplay() {
        let dropdownIndex = 0;
        for (let i = 0; i < chapterDropdown.options.length; i++) {
            if (!chapterDropdown.options[i].disabled) {
                if (dropdownIndex === currentChapterIndex) {
                    chapterDropdown.selectedIndex = i;
                    break;
                }
                dropdownIndex++;
            }
        }
        updateButtonsVisibility();
    }

    function updateButtonsVisibility() {
        const now = new Date();
        const firstAvailableIndex = chapters.findIndex(chapter => now >= chapter.unlockDate);
        const lastAvailableIndex = chapters.map((chapter, index) => ({ chapter, index })).filter(({ chapter }) => now >= chapter.unlockDate).pop().index;

        prevButton.style.display = currentChapterIndex <= firstAvailableIndex ? 'none' : 'inline-block';
        nextButton.style.display = currentChapterIndex >= lastAvailableIndex ? 'none' : 'inline-block';
    }

    function toggleFullscreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }

    headerToggle.addEventListener('click', function () {
        headerSidebar.classList.toggle('open');
    });

    navbarToggle.addEventListener('click', function () {
        sidebar.classList.toggle('open');
    });

    expandableItems.forEach(function (item) {
        item.addEventListener('click', function () {
            item.classList.toggle('expanded');
        });
    });

    chapterDropdown.addEventListener('change', (e) => {
        const selectedIndex = parseInt(e.target.value);
        if (!isNaN(selectedIndex)) {
            currentChapterIndex = selectedIndex;
            loadChapter(currentChapterIndex);
        }
    });

    prevButton.addEventListener('click', onPrevChapter);
    nextButton.addEventListener('click', onNextChapter);
    fullscreenButton.addEventListener('click', toggleFullscreen);

    populateChapterDropdown();
    loadChapter(currentChapterIndex);
});
