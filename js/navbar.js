const assistiveBall = document.getElementById('assistiveBall');
const roadmap = document.getElementById('roadmap');

// Initial state
assistiveBall.style.opacity = '1';
assistiveBall.style.transition = 'opacity 1s ease-in-out';
roadmap.style.display = 'none';

let isIdle = true;
let idleTimer;
let roadmapTimer; // New timer for roadmap auto-hide

// Update the setIdle function
const setIdle = () => {
    if (roadmap.style.display === 'none' && !assistiveBall.matches(':hover')) {
        assistiveBall.classList.remove('active', 'animated');
        assistiveBall.classList.add('idle');
        isIdle = true;
    }
};

// Function to auto-hide roadmap
const hideRoadmap = () => {
    roadmap.style.display = 'none';
    // Start idle timer for assistive ball
    idleTimer = setTimeout(setIdle, 5000);
};

// Initial fade after 10 seconds
idleTimer = setTimeout(setIdle, 10000);

// Update click handlers for roadmap links
const roadmapLinks = roadmap.querySelectorAll('.section-link');
roadmapLinks.forEach(link => {
    link.addEventListener('click', () => {
        // Clear any existing timer
        clearTimeout(roadmapTimer);
        
        // Hide roadmap immediately when link is clicked
        roadmap.style.display = 'none';
        
        // Start idle timer for assistive ball
        idleTimer = setTimeout(setIdle, 5000);
        
        // Optional: Add smooth scrolling
        const targetId = link.getAttribute('href').slice(1);
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Reset timer on roadmap interaction
roadmap.addEventListener('mouseover', () => {
    clearTimeout(roadmapTimer);
});

roadmap.addEventListener('mouseout', () => {
    if (roadmap.style.display === 'block') {
        roadmapTimer = setTimeout(hideRoadmap, 15000);
    }
});

// Update click handler
assistiveBall.addEventListener('click', () => {
    clearTimeout(idleTimer);
    clearTimeout(roadmapTimer); // Clear roadmap timer
    assistiveBall.classList.remove('idle');
    assistiveBall.classList.add('active', 'animated');
    isIdle = false;
    
    if (roadmap.style.display === 'none') {
        roadmap.style.display = 'block';
        // Start timer to auto-hide roadmap
        roadmapTimer = setTimeout(hideRoadmap, 15000);
    } else {
        roadmap.style.display = 'none';
        idleTimer = setTimeout(setIdle, 5000);
    }
});

// Update mouseover handler
assistiveBall.addEventListener('mouseover', () => {
    clearTimeout(idleTimer);
    assistiveBall.classList.remove('idle');
    assistiveBall.classList.add('animated');
    if (isIdle) {
        assistiveBall.classList.add('active');
    }
});

// Update mouseout handler
assistiveBall.addEventListener('mouseout', () => {
    if (isIdle && roadmap.style.display === 'none') {
        assistiveBall.classList.remove('active', 'animated');
        assistiveBall.classList.add('idle');
    }
});

// Initial setup
assistiveBall.classList.add('animated');