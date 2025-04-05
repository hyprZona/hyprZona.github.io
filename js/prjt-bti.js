// Add these helper functions at the top of the file
function getYouTubeEmbedUrl(videoId) {
    return `https://www.youtube.com/embed/${videoId}?enablejsapi=1&rel=0&modestbranding=1`;
}

function resetIframe(iframe, videoId) {
    if (!iframe) return;
    const newSrc = getYouTubeEmbedUrl(videoId);
    iframe.src = newSrc;
}

// Update these variables at the top
let currentLightboxIndex = 0;
let currentLightboxImages = [];
let originalOverflow = '';

// Update these functions for screenshot handling
let currentScreenshotIndex = 0;
let activeScreenshots = [];

function openScreenshot(element) {
    const lightbox = document.querySelector('.screenshot-lightbox');
    if (!lightbox) return;

    // Store original overflow state
    originalOverflow = document.body.style.overflow;
    
    // Get all screenshots from active version
    const activeVersion = document.querySelector('.version-wrapper.active');
    const screenshots = Array.from(activeVersion.querySelectorAll('.screenshot'));
    currentLightboxIndex = screenshots.indexOf(element);
    currentLightboxImages = screenshots;

    updateLightboxContent(element);
    
    // Show lightbox and prevent scroll
    lightbox.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function updateLightboxContent(element) {
    const lightbox = document.querySelector('.screenshot-lightbox');
    const lightboxImg = lightbox.querySelector('img');
    const lightboxCaption = lightbox.querySelector('.lightbox-caption');
    
    const img = element.querySelector('img');
    const caption = element.querySelector('.screenshot-caption');
    
    if (img && caption) {
        lightboxImg.src = img.src;
        lightboxCaption.textContent = caption.textContent;
    }
}

function closeLightbox(event) {
    if (event) event.stopPropagation();
    
    const lightbox = document.querySelector('.screenshot-lightbox');
    if (!lightbox) return;
    
    lightbox.style.display = 'none';
    
    // Restore original overflow state
    document.body.style.overflow = originalOverflow;
}

function prevScreenshot(event) {
    if (event) event.stopPropagation();
    if (currentLightboxImages.length === 0) return;
    
    currentLightboxIndex = (currentLightboxIndex - 1 + currentLightboxImages.length) % currentLightboxImages.length;
    updateLightboxContent(currentLightboxImages[currentLightboxIndex]);
}

function nextScreenshot(event) {
    if (event) event.stopPropagation();
    if (currentLightboxImages.length === 0) return;
    
    currentLightboxIndex = (currentLightboxIndex + 1) % currentLightboxImages.length;
    updateLightboxContent(currentLightboxImages[currentLightboxIndex]);
}

// DOM Elements
const originalVersion = document.querySelector('.original');
const remadeVersion = document.querySelector('.remade');
const carouselItems = document.querySelectorAll('.carousel-item');
let currentSlide = 0;

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    switchVersion('original');
    showSlide(0);
    positionPanels();
    
    // Show first carousel item
    showSlide(currentSlide);
    
    // Handle window resize
    window.addEventListener('resize', positionPanels);

    // Handle project card clicks
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = card.dataset.section;
            showSection(sectionId);
        });
    });

    // Function to show section
    function showSection(sectionId) {
        // Hide all sections
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });

        // Show selected section
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
            // Initialize BTI section if it's being shown
            if (sectionId === 'bti-section') {
                switchVersion('original'); // or 'remade' depending on your default
            }
        }
    }

    // Add close functionality (optional)
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.section').forEach(section => {
                section.classList.remove('active');
            });
        }
    });

    // Initialize all video iframes
    document.querySelectorAll('.video-container').forEach(container => {
        const iframe = container.querySelector('iframe');
        const activeButton = container.querySelector('.video-btn.active');
        if (iframe && activeButton) {
            const videoId = activeButton.dataset.video;
            resetIframe(iframe, videoId);
        }
    });

    // Move lightbox to body level
    const lightbox = document.querySelector('.screenshot-lightbox');
    if (lightbox) {
        document.body.appendChild(lightbox);
    }

    // Add proper event listeners for lightbox controls
    if (lightbox) {
        const closeBtn = lightbox.querySelector('.lightbox-close');
        const prevBtn = lightbox.querySelector('.lightbox-prev');
        const nextBtn = lightbox.querySelector('.lightbox-next');
        
        closeBtn.onclick = (e) => {
            e.preventDefault();
            e.stopPropagation();
            closeLightbox();
        };
        
        prevBtn.onclick = (e) => {
            e.preventDefault();
            e.stopPropagation();
            prevScreenshot();
        };
        
        nextBtn.onclick = (e) => {
            e.preventDefault();
            e.stopPropagation();
            nextScreenshot();
        };
        
        // Close on background click
        lightbox.onclick = (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        };
    }

    // Initialize video buttons
    document.querySelectorAll('.video-btn').forEach(button => {
        button.addEventListener('click', () => switchVideo(button));
    });

    // Initialize lightbox
    initializeLightbox();

    // Add section close button functionality
    const closeButtons = document.querySelectorAll('.section-close');
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const section = button.closest('.section');
            if (section) {
                section.classList.remove('active');
                // Reset any active content
                const videos = section.querySelectorAll('iframe');
                videos.forEach(video => {
                    video.src = video.src;
                });
            }
        });
    });
});

// Version switching function
function switchVersion(version) {
    // Remove active class from both versions and buttons
    document.querySelectorAll('.version-wrapper').forEach(el => {
        el.classList.remove('active');
    });
    document.querySelectorAll('.bti-switch button').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Add active class to selected version
    const selectedVersion = document.querySelector('.' + version);
    selectedVersion.classList.add('active');
    
    // Add active class to selected button
    const selectedButton = document.querySelector(`[data-version="${version}"]`);
    selectedButton.classList.add('active');
    
    // Reset carousel
    const carouselItems = selectedVersion.querySelectorAll('.carousel-item');
    carouselItems.forEach((item, index) => {
        item.classList.remove('active');
        if (index === 0) item.classList.add('active');
    });

    // Reset all video containers in both versions
    document.querySelectorAll('.video-container').forEach(container => {
        const iframe = container.querySelector('iframe');
        const activeButton = container.querySelector('.video-btn.active');
        if (iframe && activeButton) {
            const videoId = activeButton.dataset.video;
            resetIframe(iframe, videoId);
        }
    });

    handleVersionChange(version);
}

// Position panels function
function positionPanels() {
    const isMobile = window.innerWidth <= 768;
    const panels = document.querySelectorAll('.bti-left-panel, .bti-right-panel');
    
    panels.forEach(panel => {
        if (isMobile) {
            panel.style.position = 'relative';
        } else {
            panel.style.position = 'fixed';
        }
    });
}

// Modify the carousel navigation functions
function showSlide(index) {
    // Get carousel items only from the active version
    const activeVersion = document.querySelector('.version-wrapper.active');
    if (!activeVersion) return;
    
    const items = activeVersion.querySelectorAll('.carousel-item');
    if (!items.length) return;
    
    items.forEach(item => {
        item.classList.remove('active');
        
        // If this item contains a video, pause/reset it
        const iframe = item.querySelector('iframe');
        if (iframe) {
            // Store current src
            const currentSrc = iframe.src;
            // Reset iframe src to stop video
            iframe.src = '';
            // Set it back after a brief moment
            setTimeout(() => {
                iframe.src = currentSrc;
            }, 100);
        }
    });

    // Show new item
    items[index].classList.add('active');

    // If new item is not video container, ensure video is hidden
    if (!items[index].classList.contains('video-container')) {
        const videoContainers = activeVersion.querySelectorAll('.video-container');
        videoContainers.forEach(container => {
            container.style.display = 'none';
        });
    } else {
        // Show video container if it's the active slide
        items[index].style.display = 'flex';
    }
}

function btinextSlide() {
    const activeVersion = document.querySelector('.version-wrapper.active');
    if (!activeVersion) return;
    
    const items = activeVersion.querySelectorAll('.carousel-item');
    if (!items.length) return;
    
    const currentSlide = Array.from(items).findIndex(item => item.classList.contains('active'));
    const nextIndex = (currentSlide + 1) % items.length;
    showSlide(nextIndex);
}

function btiprevSlide() {
    const activeVersion = document.querySelector('.version-wrapper.active');
    if (!activeVersion) return;
    
    const items = activeVersion.querySelectorAll('.carousel-item');
    if (!items.length) return;
    
    const currentSlide = Array.from(items).findIndex(item => item.classList.contains('active'));
    const prevIndex = (currentSlide - 1 + items.length) % items.length;
    showSlide(prevIndex);
}

// Add this function to your JavaScript
function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Show selected section
    document.querySelector(sectionId).classList.add('active');
}

// Add this after your existing code

function switchVideo(button) {
    // Get all video buttons in the current carousel item
    const buttons = button.parentElement.querySelectorAll('.video-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    // Get the video ID from the button's data attribute
    const videoId = button.dataset.video;
    
    // Find the iframe in the same carousel item
    const iframe = button.closest('.video-container').querySelector('iframe');
    
    // Update the iframe source with proper parameters
    resetIframe(iframe, videoId);
}

// Lightbox functionality
function initializeLightbox() {
    const lightboxes = document.querySelectorAll('.screenshot-lightbox');
    if (lightboxes.length > 1) {
        lightboxes.forEach((box, index) => {
            if (index > 0) box.remove();
        });
    }
    
    const lightbox = lightboxes[0];
    if (lightbox && lightbox.parentElement !== document.body) {
        document.body.appendChild(lightbox);
        setupLightboxControls(lightbox);
    }
}

function setupLightboxControls(lightbox) {
    // Remove existing onclick attributes
    lightbox.removeAttribute('onclick');
    const closeBtn = lightbox.querySelector('.lightbox-close');
    const prevBtn = lightbox.querySelector('.lightbox-prev');
    const nextBtn = lightbox.querySelector('.lightbox-next');
    
    closeBtn?.removeAttribute('onclick');
    prevBtn?.removeAttribute('onclick');
    nextBtn?.removeAttribute('onclick');
    
    // Add event listeners
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox(e);
        }
    });
    
    closeBtn?.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        closeLightbox();
    });
    
    prevBtn?.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        prevScreenshot(e);
    });
    
    nextBtn?.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        nextScreenshot(e);
    });
    
    // Add keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (lightbox.style.display === 'flex') {
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') prevScreenshot();
            if (e.key === 'ArrowRight') nextScreenshot();
        }
    });
}

// Add new animation handling
function handleVersionChange(version) {
    const container = document.querySelector('.bti-container');
    
    if (version === 'original') {
        container.style.animation = 'glitch-bti 0.3s infinite';
    } else {
        container.style.animation = 'bounce-bti 2s infinite';
    }
}