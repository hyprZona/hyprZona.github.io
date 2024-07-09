document.addEventListener('DOMContentLoaded', () => {
    const chapterDropdown = document.getElementById('chapter-dropdown');
    const prevButton = document.getElementById('prev-button');
    const nextButton = document.getElementById('next-button');
    const fullscreenButton = document.getElementById('fullscreen-button');
    const headerToggle = document.querySelector('.header-toggle');
    const headerSidebar = document.querySelector('.header-sidebar');
    const navToggle = document.querySelector('.navbar-toggle');
    const sidebar = document.querySelector('.sidebar');
    const unlockPopup = document.getElementById('unlock-popup');
    const unlockDateSpan = document.getElementById('unlock-date');

    const chapters = [
        { part: 'Intro', title: 'Introduction', url: 'https://drive.google.com/file/d/1-M1PZxH3xwgJmT0fTjYV4tEIh4gEGbim/preview', unlockDate: new Date('2024-05-03T18:30:00Z') },
        { part: 'Part 1', title: 'Chapter 1: Legacy of Shadows', url: 'https://drive.google.com/file/d/1FXG4_Z4OESFEfdH-BcHolCWUCOQqeD0l/preview', unlockDate: new Date('2024-05-05T18:30:00Z') },
        { part: 'Part 1', title: 'Chapter 2: The Chinatown War', url: 'https://drive.google.com/file/d/1D2wx8s0ZQC96BI-vGjZojKZTl_KH_AjX/preview', unlockDate: new Date('2024-05-12T18:30:00Z') },
        { part: 'Part 1', title: 'Chapter 3: The Unbreakable Duo', url: 'https://drive.google.com/file/d/1RxPZFJ9knB7AH98yNy7wCbJDq0Fv1luC/preview', unlockDate: new Date('2024-05-19T18:30:00Z') },
        { part: 'Part 1', title: 'Chapter 4: Ending the Cartel', url: 'https://drive.google.com/file/d/1PEIZcyEed0HzhKDWNz5YZGMaiSPpaOuu/preview', unlockDate: new Date('2024-05-26T18:30:00Z') },
        { part: 'Part 2', title: 'Chapter 5: The Bad Old Times', url: 'https://drive.google.com/file/d/1BUIeFJ9pGFY8xasOUmK7phGSn9L5QlDy/preview', unlockDate: new Date('2024-06-02T18:30:00Z') },
        { part: 'Part 2', title: 'Chapter 6: Shaping Up', url: 'https://drive.google.com/file/d/1ndzTkWDmhtGnWun0HXo15_JA6rCsJ6x7/preview', unlockDate: new Date('2024-06-09T18:30:00Z') },
        { part: 'Part 2', title: "Chapter 7: The T'N'T", url: 'https://drive.google.com/file/d/1eNZkkLq9H7zycUYJ0OnY2o3SpTJhsa8c/preview', unlockDate: new Date('2024-06-16T18:30:00Z') },
        { part: 'Part 3', title: 'Chapter 8: The Black Van', url: 'https://drive.google.com/file/d/19FdPLlCDlzPQGi2p4pmfbsvkWfJXUyjM/preview', unlockDate: new Date('2024-06-23T18:30:00Z') },
        { part: 'Part 3', title: 'Chapter 9: Prototype 5', url: 'https://drive.google.com/file/d/1NZE6AOh_0UbujSMquFopRIUjTqri3OJK/preview', unlockDate: new Date('2024-06-30T18:30:00Z') },
        { part: 'Part 3', title: 'Chapter 10: Ending it once & for all', url: 'https://drive.google.com/file/d/1CDZY8pnIuSBXKzqXGH_U1oDQ4-psYbKi/preview', unlockDate: new Date('2024-07-07T18:30:00Z') },
        { part: 'Part 3', title: 'Chapter 11: Not all ends well', url: 'https://drive.google.com/file/d/1DsrffcD7VEBqPJbDMOZVo_cNIJgjFxNF/preview', unlockDate: new Date('2024-07-14T18:30:00Z') },
        { part: 'Credits', title: 'Post Credits', url: 'https://drive.google.com/file/d/1DsrffcD7VEBqPJbDMOZVo_cNIJgjFxNF/preview', unlockDate: new Date('2024-07-14T18:30:00Z') },
    ];

    let currentChapterIndex = 0;

    function populateChapterDropdown() {
        chapterDropdown.innerHTML = '';
        let currentPart = '';

        const now = new Date();

        chapters.forEach((chapter, index) => {
            // Only add chapters that are unlocked
            if (now >= chapter.unlockDate) {
                // Create an option for each chapter
                const option = document.createElement('option');
                option.value = index;
                option.textContent = `${chapter.title}`;

                // Check if it's a new part
                if (chapter.part !== currentPart) {
                    // Create a disabled option for the part
                    const partOption = document.createElement('option');
                    partOption.textContent = `${chapter.part}`;
                    partOption.disabled = true;
                    chapterDropdown.appendChild(partOption);
                    currentPart = chapter.part;
                }

                // Append the chapter option
                chapterDropdown.appendChild(option);
            }
        });

        // Update buttons visibility based on the first available chapter
        updateButtonsVisibility();
    }

    function loadPDF(url) {
        const iframe = document.createElement('iframe');
        iframe.src = url;
        iframe.width = "100%";
        iframe.height = "100%";
        iframe.style.border = "none";
        iframe.style.backgroundColor= "transparent";

        const main = document.querySelector('main');
        main.innerHTML = ''; // Clear previous content
        main.appendChild(iframe);

        // Set the height of the main container to fit the screen dynamically
        const header = document.querySelector('header'); // Ensure header element is correctly selected
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
            unlockDateSpan.textContent = chapter.unlockDate.toLocaleString(); // Display unlock date
            return;
        } else {
            unlockPopup.classList.add('hidden');
        }

        loadPDF(chapter.url);
        updateButtonsVisibility();
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
    // Find the index of the current chapter in the dropdown options, skipping disabled options
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

    headerToggle.addEventListener('click', () => {
        headerSidebar.classList.toggle('open');
    });

    navToggle.addEventListener('click', () => {
        sidebar.classList.toggle('open');
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

    // Initial setup
    populateChapterDropdown();
    loadChapter(currentChapterIndex);
});
