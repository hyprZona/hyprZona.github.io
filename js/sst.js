const socialTab = document.getElementById('socialTab');
const socialLinks = document.getElementById('socialLinks');

// Initial state
socialTab.style.opacity = '1';
socialTab.style.transition = 'opacity 1s ease-in-out';
socialLinks.style.display = 'none'; // Hide links initially

// Add delay and fade effect for tab
setTimeout(() => {
    socialTab.style.opacity = '0.15';
}, 10000);

socialTab.addEventListener('click', () => {
    // Reset tab opacity on click
    socialTab.style.opacity = '1';
    
    // Toggle social links
    if (socialLinks.style.display === 'none') {
        socialLinks.style.display = 'block';
    } else {
        socialLinks.style.display = 'none';
        // Fade tab after hiding links
        setTimeout(() => {
            socialTab.style.opacity = '0.15';
        }, 5000);
    }
});

// Add hover effect to tab
socialTab.addEventListener('mouseover', () => {
    socialTab.style.opacity = '1';
});

socialTab.addEventListener('mouseout', () => {
    // Only fade if links are not showing
    if (socialLinks.style.display === 'none') {
        socialTab.style.opacity = '0.15';
    }
});