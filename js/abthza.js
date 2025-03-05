/* filepath: /C:/Users/mehta/hypFinale/js/abthza.js */
document.addEventListener('DOMContentLoaded', () => {
    const section = document.getElementById('abthza');
    const cards = Array.from(section.querySelectorAll('.card'));
    const summaryCircle = section.querySelector('.summary-circle');
    const summaryPanel = section.querySelector('.summary-panel');
    
    let currentIndex = 0;
    let isAnimating = false;
    let fadeTimeout;

    // Initialize summary circle state
    if (summaryCircle) {
        summaryCircle.style.opacity = '1';
        summaryCircle.style.transition = 'opacity 1s ease-in-out';

        // Fade after 10 seconds
        fadeTimeout = setTimeout(() => {
            if (summaryPanel.style.display !== 'block') {
                summaryCircle.style.opacity = '0.15';
            }
        }, 10000);

        // Update click handler
        summaryCircle.addEventListener('click', () => {
            clearTimeout(fadeTimeout);
            summaryCircle.style.opacity = '1';
            
            if (summaryPanel.style.display === 'block') {
                summaryPanel.style.display = 'none';
                // Fade after closing panel
                fadeTimeout = setTimeout(() => {
                    summaryCircle.style.opacity = '0.15';
                }, 1000);
            } else {
                summaryPanel.style.display = 'block';
            }
        });

        // Add hover effects
        summaryCircle.addEventListener('mouseover', () => {
            summaryCircle.style.opacity = '1';
        });

        summaryCircle.addEventListener('mouseout', () => {
            if (summaryPanel.style.display !== 'block') {
                summaryCircle.style.opacity = '0.15';
            }
        });
    }

    function showCard(index) {
        if (isAnimating || index === currentIndex) return;
        isAnimating = true;

        // Get current and next card
        const currentCard = cards[currentIndex];
        const nextCard = cards[index];

        // Hide current card
        currentCard.style.transform = `translateX(${index > currentIndex ? -100 : 100}%) scale(0.9)`;
        currentCard.style.opacity = '0';
        currentCard.classList.remove('active');

        // Show next card
        nextCard.style.transform = 'translateX(0) scale(1)';
        nextCard.style.opacity = '1';
        nextCard.classList.add('active');

        // Update buttons
        section.querySelectorAll('.carousel-btn').forEach((btn, idx) => {
            btn.classList.toggle('active', idx === index);
            btn.style.backgroundColor = idx === index ? '#f00' : '#0ff';
        });

        currentIndex = index;
        setTimeout(() => isAnimating = false, 500);
    }

    // Initialize cards positions
    cards.forEach((card, idx) => {
        if (idx === 0) {
            card.classList.add('active');
            card.style.transform = 'translateX(0) scale(1)';
            card.style.opacity = '1';
        } else {
            card.style.transform = 'translateX(100%) scale(0.9)';
            card.style.opacity = '0';
        }
    });

    // Event Listeners
    section.querySelectorAll('.carousel-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const index = parseInt(btn.dataset.index);
            showCard(index);
        });
    });

    // Summary toggle
    summaryCircle?.addEventListener('click', () => {
        summaryPanel.style.display = 
            summaryPanel.style.display === 'block' ? 'none' : 'block';
    });

    // Initialize first card
    showCard(0);
});