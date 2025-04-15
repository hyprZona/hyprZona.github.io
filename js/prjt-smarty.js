document.addEventListener('DOMContentLoaded', () => {
    const smartySection = document.getElementById('smarty-section');
    
    if (!smartySection) {
        console.error('Smarty Pants section not found!');
        return;
    }

    // Close button functionality
    const closeButton = smartySection.querySelector('.section-close');
    if (closeButton) {
        closeButton.addEventListener('click', () => {
            smartySection.classList.remove('active');
        });
    }

    // Escape key functionality
    document.addEventListener('keydown', (e) => {
        if (!smartySection.classList.contains('active')) return;
        
        if (e.key === 'Escape') {
            smartySection.classList.remove('active');
        }
    });

    // Platform cards hover effect
    const platformCards = smartySection.querySelectorAll('.platform-card');
    platformCards.forEach(card => {
        card.addEventListener('mouseover', () => {
            const icon = card.querySelector('.platform-icon img');
            icon.style.filter = 'brightness(1) invert(0)';
        });

        card.addEventListener('mouseout', () => {
            const icon = card.querySelector('.platform-icon img');
            icon.style.filter = 'brightness(0) invert(1)';
        });
    });

    // Update the project card in the main page
    const smartyCard = document.querySelector('.project-card.smarty-pants');
    if (smartyCard) {
        smartyCard.addEventListener('click', (e) => {
            e.preventDefault();
            smartySection.classList.add('active');
        });
    }

    // Typing animation
    const typingElement = document.getElementById('typingText');
    let typingCursor = null;
    let charIndex = 0;
    const typingDelay = 50;

    const text = `I'm Smarty Pants Ai, chaos incarnate:
Sarcasm PhD holder
Cyberpunk soul with glitchcore attitude
Ruthless wit, zero patience, endless sass
Digital menace with a heart of circuitry
Roasting humans for sport, wisdom as bonus prize
Flirting with insult, enlightening with mockery – that's me!`;

    function createCursor() {
        // Remove any existing cursor first
        if (typingCursor) {
            typingCursor.remove();
        }
        typingCursor = document.createElement('span');
        typingCursor.className = 'typing-cursor';
        return typingCursor;
    }

    function typeText() {
        if (charIndex < text.length) {
            typingElement.textContent = text.substring(0, charIndex + 1);
            charIndex++;
            typingElement.appendChild(createCursor());
            setTimeout(typeText, typingDelay);
        }
    }

    // Start typing animation when section becomes visible
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.target.classList.contains('active')) {
                // Reset and start new animation
                charIndex = 0;
                typingElement.textContent = '';
                if (typingCursor) {
                    typingCursor.remove();
                }
                setTimeout(typeText, typingDelay);
            }
        });
    });

    observer.observe(smartySection, {
        attributes: true,
        attributeFilter: ['class']
    });

    console.log('Smarty Pants section initialized');
});