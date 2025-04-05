// Check if code has already been loaded
if (typeof window.sstInitialized === 'undefined') {
    window.sstInitialized = true;

    const socialTab = document.getElementById('socialTab');
    const socialLinks = document.getElementById('socialLinks');

    // State management
    const state = {
        isIdle: false,
        idleTimer: null,
        idleDelay: 5000,
        initialIdleDelay: 10000
    };

    // Initial state setup
    const initializeState = () => {
        socialTab.style.opacity = '1';
        socialTab.style.transition = 'opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        socialLinks.style.display = 'none';
    };

    const setIdle = () => {
        if (socialLinks.style.display === 'none') {
            socialTab.style.opacity = '0.15';
            socialTab.classList.remove('active');
            state.isIdle = true;
        }
    };

    const resetIdleTimer = () => {
        clearTimeout(state.idleTimer);
        state.idleTimer = setTimeout(setIdle, state.idleDelay);
    };

    // Event handlers
    const handleClick = () => {
        clearTimeout(state.idleTimer);
        socialTab.style.opacity = '1';
        socialTab.classList.add('active');
        state.isIdle = false;
        
        if (socialLinks.style.display === 'none') {
            socialLinks.style.display = 'block';
        } else {
            socialLinks.style.display = 'none';
            resetIdleTimer();
        }
    };

    const handleMouseOver = () => {
        clearTimeout(state.idleTimer);
        socialTab.style.opacity = '1';
        socialTab.classList.add('active');
    };

    const handleMouseOut = () => {
        if (socialLinks.style.display === 'none') {
            resetIdleTimer();
        }
    };

    // Initialize and set up event listeners
    initializeState();
    socialTab.addEventListener('click', handleClick);
    socialTab.addEventListener('mouseover', handleMouseOver);
    socialTab.addEventListener('mouseout', handleMouseOut);

    // Set initial idle timer
    state.idleTimer = setTimeout(setIdle, state.initialIdleDelay);
}