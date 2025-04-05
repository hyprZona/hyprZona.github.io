document.addEventListener('DOMContentLoaded', () => {
    // Review carousel
    const reviews = {
        real: [
            { text: "This game made me question my sanity, and I loved every second of it!", author: "Random Itch User (probably)" },
            { text: "10/10 would get mentally scarred again!", author: "bobluthegaymer" },
            { text: "Never thought I'd cry over a cave shape.", author: "Game'shot" },
            { text: "I thought I was playing a horror game, but it turned out to be a therapy session.", author: "idkscracth" },
            { text: "Nice game...", author: "StupenRio"}
        ],
        character: [
            { text: "100/10, the cave was shaped like my dick. But my therapy bills are through the roof.", author: "Dan (Still in Therapy)" },
            { text: "Why did I agree to be in this game?", author: "Aria" },
            { text: "Can we get a huinya?", author: "Horny Monsters" },
            { text: "Fucker exposed my truth!", author: "Vedant Aggarwal"}
        ]
    };

    let currentReviewIndex = 0;
    let currentType = 'real';
    let reviewInterval;

    function updateReview() {
        const reviewsArray = reviews[currentType];
        const review = reviewsArray[currentReviewIndex];
        
        // Clear all testimonial groups
        document.querySelectorAll('.testimonial-group').forEach(group => {
            group.classList.remove('active');
            group.innerHTML = '';
        });
        
        // Update the current group
        const testimonialGroup = document.querySelector(`.testimonial-group.${currentType}`);
        testimonialGroup.innerHTML = `
            <div class="testimonial-card">
                <blockquote>${review.text}</blockquote>
                <cite class="testimonial-author">- ${review.author}</cite>
            </div>
        `;
        testimonialGroup.classList.add('active');

        currentReviewIndex = (currentReviewIndex + 1) % reviewsArray.length;
    }

    // Switch between real and character reviews
    document.querySelectorAll('.switch-button').forEach(button => {
        button.addEventListener('click', () => {
            // Clear existing interval
            clearInterval(reviewInterval);
            
            // Update type and reset index
            currentType = button.dataset.type;
            currentReviewIndex = 0;
            
            // Update UI
            document.querySelectorAll('.switch-button').forEach(btn => 
                btn.classList.remove('active')
            );
            button.classList.add('active');
            
            // Update review and restart interval
            updateReview();
            reviewInterval = setInterval(updateReview, 5000);
        });
    });

    // Initial setup
    updateReview();
    reviewInterval = setInterval(updateReview, 5000);

    // News carousel
    const newsItems = document.querySelectorAll('.news-item');
    let currentNewsIndex = 0;

    function rotateNews() {
        newsItems.forEach(item => {
            item.style.display = 'none';
            item.style.opacity = '0';
        });

        for(let i = 0; i < 2; i++) {
            const index = (currentNewsIndex + i) % newsItems.length;
            newsItems[index].style.display = 'block';
            newsItems[index].style.opacity = '1';
        }

        currentNewsIndex = (currentNewsIndex + 2) % newsItems.length;
    }

    // Initial setup and intervals
    rotateNews();
    setInterval(rotateNews, 7000); // Rotate news every 7 seconds
});