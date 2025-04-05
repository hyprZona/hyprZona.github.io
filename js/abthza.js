/* filepath: /C:/Users/mehta/hypFinale/js/abthza.js */
const cardContent = {
    past: {
        title: "Past: Pre-hyprZona Era",
        intro: "What started as a passion for storytelling and creative exploration evolved into a pursuit of game development, setting the foundation for hyprZona.",
        timeline: [
            {
                date: "2018 - Early Creative Beginnings",
                description: "Started writing short stories and dreaming of becoming an author, laying the groundwork for future storytelling in games."
            },
            {
                date: "2019 - First Steps into Game Development",
                description: "Shifted focus from writing to game development, experimenting with various concepts and ideas."
            },
            {
                date: "2020 - Introduction to Discord Bot Development",
                description: "Developed and launched Discord bots, gaining technical skills and a deeper understanding of programming."
            },
            {
                date: "2020 - Launch of Ironcaliver3 YouTube Channel",
                description: "Started <b>Ironcaliver3</b>, originally featuring MMO gameplay, later evolving into funny moments content, and eventually a 2D comedy animation series. The channel was later rebranded into the official hyprZona YouTube channel."
            },
            {
                date: "2021 - First Website Version",
                description: "Launched the first version of a website using Markdown on GitHub. Later in the year, transitioned to HTML + CSS, continuously evolving it with improvements."
            },
            {
                date: "2021 - Discord Bot Growth & Unexpected Setback",
                description: "Discord bot project grew steadily but was disrupted due to a token leak incident, leading to a restart under a new identity."
            },
            {
                date: "2022 - Transition to Game Storytelling",
                description: "Focused on game narratives and comic ideas, developing <b>The T'N'T</b> and <b>Memories</b> concepts."
            },
            {
                date: "2023 - Birth of hyprZona",
                description: "After years of creative exploration, hyprZona was officially conceptualized, with <b>Beyond the Illusions - Original</b> as the first game project."
            },
            {
                date: "2024 - hyprZona's First Game Release",
                description: "Released <b>Beyond the Illusions - Original</b>, marking the first official game under the hyprZona name and beginning a new era in indie game development."
            },
            {
                date: "2024 - Website Revamp",
                description: "After several iterations since 2021, the website underwent a complete neon-themed revamp in November 2024, reflecting the brand's new direction."
            }
        ]
    },
    present: {
        title: "Present: hyprZonic Era",
        intro: "hyprZona is evolving as a solo game dev brand, pushing creative boundaries with surreal storytelling and unconventional gameplay.",
        timeline: [
            {
                date: "Beyond the Illusions - Remake Completion",
                description: "Completed development of the <b>BTI Remake</b>, featuring a reworked narrative, improved visuals, and quirky gameplay elements. Set for release in a month."
            },
            {
                date: "Expansion into Multi-Genre Development",
                description: "hyprZona is diversifying its creative output, working on surreal indie games, occasional eBooks, and game soundtracks."
            },
            {
                date: "Upcoming Game - Memories",
                description: "Development of <b>Memories</b> will resume in May, a project set to expand the scope of hyprZona's storytelling approach."
            },
            {
                date: "Planning for The T'N'T - Expanded Edition",
                description: "The <b>T'N'T</b> noir series is being expanded into a more detailed, immersive experience alongside game development."
            },
            {
                date: "hyprZona's Digital Presence & Community Growth",
                description: "Active on multiple platforms including Instagram, X, Reddit, Discord, YouTube, LinkedIn, GitHub, and itch.io, aiming for organic growth through collaborations and engagement."
            },
            {
                date: "Website Development & Brand Aesthetic",
                description: "Building a cyberpunk-styled website reflecting hyprZona's identity while keeping a vibrant and surreal energy."
            }
        ]
    },
    future: {
        title: "Future: What's Next in hyprZona?",
        intro: "hyprZona aims to push boundaries with larger-scale projects, collaborations, and a growing creative ecosystem.",
        timeline: [
            {
                date: "Next-Gen Projects & Bigger Worlds",
                description: "Future games will scale significantly, with the next project already planned to be 3x bigger and a third game featuring a small open-world experience."
            },
            {
                date: "Expanding hyprZona's Team",
                description: "As college life begins, the goal is to bring in like-minded friends and indie creators to collaborate and expand the scope of projects."
            },
            {
                date: "Exploring Paid Releases & Console Ports",
                description: "After a few more free game releases, hyprZona plans to explore Steam and console publishing, ensuring the projects reach a wider audience."
            },
            {
                date: "The T'N'T - Future Neo-Noir Shooter Vision",
                description: "Long-term goal to evolve <b>The T'N'T</b> into a full-fledged neo-noir shooter game series with complex gameplay beyond just gunfights."
            },
            {
                date: "Cyberpunk-Themed Merch & Decor",
                description: "Potential merch line featuring cyberpunk and abstract designs, possibly integrated into a Shopify decor venture."
            },
            {
                date: "Collabs & Community Growth",
                description: "Organic marketing through asset sharing, streamer collaborations, and interactive community engagement to grow hyprZona's presence."
            },
            {
                date: "Potential for Animated Spin-Offs",
                description: "Exploring future possibilities for animated content based on popular hyprZona characters and game universes."
            }
        ]
    }
};

function generateCardHTML(data) {
    return `
        <h2>${data.title}</h2>
        <p>${data.intro}</p>
        ${data.timeline.map(item => `
            <div class="timeline-item">${item.date}</div>
            <p>${item.description}</p>
        `).join('')}
    `;
}

document.addEventListener('DOMContentLoaded', () => {
    const section = document.getElementById('abthza');
    const cards = Array.from(section.querySelectorAll('.card'));
    
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

    function initializeCarousel() {
        // Set initial card
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

        // Set initial button state
        const buttons = section.querySelectorAll('.carousel-btn');
        buttons.forEach((btn, idx) => {
            if (idx === 0) {
                btn.classList.add('active');
                btn.style.backgroundColor = '#f00';
            } else {
                btn.classList.remove('active');
                btn.style.backgroundColor = '#0ff';
            }
        });
    }

    // Populate cards with content
    cards.forEach(card => {
        const cardType = card.dataset.card;
        if (cardContent[cardType]) {
            card.innerHTML = generateCardHTML(cardContent[cardType]);
        }
    });

    // Initialize carousel
    initializeCarousel();

    // Event Listeners
    section.querySelectorAll('.carousel-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const index = parseInt(btn.dataset.index);
            showCard(index);
        });
    });

    // Initialize first card
    showCard(0);
});

function switchCard(targetIndex) {
    const cards = document.querySelectorAll('.card');
    const buttons = document.querySelectorAll('.carousel-btn');
    const currentCard = document.querySelector('.card.active');
    const currentIndex = Array.from(cards).indexOf(currentCard);

    // Don't do anything if clicking the active card
    if (currentIndex === targetIndex) return;

    // Update buttons
    buttons.forEach((btn, idx) => {
        btn.classList.toggle('active', idx === targetIndex);
    });

    // Determine direction for animation
    const direction = targetIndex > currentIndex ? 1 : -1;

    // Animate out current card
    if (currentCard) {
        currentCard.style.transform = `translateX(${-100 * direction}%)`;
        currentCard.style.opacity = '0';
        setTimeout(() => {
            currentCard.classList.remove('active');
        }, 500);
    }

    // Animate in new card
    const targetCard = cards[targetIndex];
    targetCard.style.transform = `translateX(${100 * direction}%)`;
    targetCard.style.opacity = '0';
    
    // Force reflow
    targetCard.offsetHeight;

    // Add active class and animate in
    targetCard.classList.add('active');
    targetCard.style.transform = 'translateX(0)';
    targetCard.style.opacity = '1';
}