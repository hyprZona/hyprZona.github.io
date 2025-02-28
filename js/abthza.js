/* filepath: /C:/Users/mehta/hypFinale/js/abthza.js */
document.addEventListener('DOMContentLoaded', () => {
    const section = document.getElementById('abthza');
    const cards = Array.from(section.querySelectorAll('.card'));
    const summaryCircle = section.querySelector('.summary-circle');
    const summaryPanel = section.querySelector('.summary-panel');
    
    let currentIndex = 0;
    let isAnimating = false;

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