const assistiveBall = document.getElementById('assistiveBall');
const roadmap = document.getElementById('roadmap');

// Initial state
assistiveBall.style.opacity = '1';
assistiveBall.style.transition = 'opacity 1s ease-in-out';
roadmap.style.display = 'none';

let isIdle = true;
let idleTimer;
let roadmapTimer; // New timer for roadmap auto-hide

// Function to handle idle state
const setIdle = () => {
    if (roadmap.style.display === 'none') {
        assistiveBall.style.opacity = '0.15';
        assistiveBall.classList.remove('active');
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

assistiveBall.addEventListener('click', () => {
    clearTimeout(idleTimer);
    clearTimeout(roadmapTimer); // Clear roadmap timer
    assistiveBall.style.opacity = '1';
    assistiveBall.classList.add('active');
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

assistiveBall.addEventListener('mouseover', () => {
    if (isIdle) {
        assistiveBall.style.opacity = '1';
        assistiveBall.classList.add('active'); // Add animation on hover
    }
});

assistiveBall.addEventListener('mouseout', () => {
    if (isIdle && roadmap.style.display === 'none') {
        assistiveBall.style.opacity = '0.15';
    }
});