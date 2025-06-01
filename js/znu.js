document.addEventListener('DOMContentLoaded', function() {
    // Generate timeline nodes based on cards
    createTimelineNodes();

    // Set up filter buttons
    setupFilters();

    // Add glitch effects
    setupGlitchEffects();

    // Add scroll behavior to timeline
    setupScrollBehavior();

    // Init with all cards visible
    filterCards('all');
});

/**
 * Creates timeline nodes based on the cards
 */
function createTimelineNodes() {
    const timelineBar = document.querySelector('.timeline-bar');
    const cards = document.querySelectorAll('.timeline-card-wrapper');
    
    // Clear existing nodes
    timelineBar.innerHTML = '';
    
    // Calculate positions for nodes
    const numCards = cards.length;
    
    cards.forEach((card, index) => {
        const position = (index / (numCards - 1)) * 100;
        const year = card.getAttribute('data-year');
        
        // Create node
        const node = document.createElement('span');
        node.classList.add('timeline-node');
        node.setAttribute('data-card-index', index);
        node.setAttribute('data-year', year);
        node.style.left = `${position}%`;
        
        // Make first node active by default
        if (index === 0) {
            node.classList.add('active');
        }
        
        // Add click event
        node.addEventListener('click', function() {
            // Scroll to corresponding card
            const targetCard = cards[index];
            const container = document.querySelector('.timeline-cards');
            
            // Smooth scroll to the card
            container.scrollTo({
                left: targetCard.offsetLeft - container.offsetWidth / 2 + targetCard.offsetWidth / 2,
                behavior: 'smooth'
            });
            
            // Update active node
            document.querySelectorAll('.timeline-node').forEach(n => n.classList.remove('active'));
            this.classList.add('active');
        });
        
        timelineBar.appendChild(node);
    });
}

/**
 * Sets up filter buttons
 */
function setupFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active class
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filter cards
            const filter = this.getAttribute('data-filter');
            filterCards(filter);
            
            // Update timeline nodes - only show nodes for visible cards
            updateTimelineNodesForFilter(filter);
        });
    });
}

/**
 * Filters cards based on the selected filter
 */
function filterCards(filter) {
    const cards = document.querySelectorAll('.timeline-card-wrapper');
    
    cards.forEach(card => {
        const cardType = card.getAttribute('data-type');
        
        if (filter === 'all' || filter === cardType) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

/**
 * Updates timeline nodes to only show for visible cards
 */
function updateTimelineNodesForFilter(filter) {
    const nodes = document.querySelectorAll('.timeline-node');
    const cards = document.querySelectorAll('.timeline-card-wrapper');
    
    // Hide all nodes first
    nodes.forEach(node => {
        node.style.display = 'none';
    });
    
    // Show nodes only for visible cards
    let visibleCards = Array.from(cards).filter(card => {
        const cardType = card.getAttribute('data-type');
        return filter === 'all' || filter === cardType;
    });
    
    visibleCards.forEach((card, index) => {
        const cardIndex = Array.from(cards).indexOf(card);
        const node = document.querySelector(`.timeline-node[data-card-index="${cardIndex}"]`);
        
        if (node) {
            node.style.display = 'block';
            
            // Reposition nodes evenly
            const position = (index / (visibleCards.length - 1)) * 100;
            node.style.left = `${position}%`;
            
            // Make first visible node active
            if (index === 0) {
                document.querySelectorAll('.timeline-node').forEach(n => n.classList.remove('active'));
                node.classList.add('active');
                
                // Scroll to first visible card
                const container = document.querySelector('.timeline-cards');
                container.scrollTo({
                    left: card.offsetLeft - container.offsetWidth / 2 + card.offsetWidth / 2,
                    behavior: 'smooth'
                });
            }
        }
    });
}

/**
 * Sets up scroll behavior for timeline
 */
function setupScrollBehavior() {
    const container = document.querySelector('.timeline-cards');
    const cards = document.querySelectorAll('.timeline-card-wrapper');
    
    // Add scroll event to update active node
    container.addEventListener('scroll', debounce(function() {
        // Find which card is most centered in the view
        let closestCard = null;
        let closestDistance = Infinity;
        
        cards.forEach(card => {
            // Skip hidden cards
            if (card.style.display === 'none') return;
            
            const cardCenter = card.offsetLeft + card.offsetWidth / 2;
            const containerCenter = container.scrollLeft + container.offsetWidth / 2;
            const distance = Math.abs(cardCenter - containerCenter);
            
            if (distance < closestDistance) {
                closestDistance = distance;
                closestCard = card;
            }
        });
        
        if (closestCard) {
            const cardIndex = Array.from(cards).indexOf(closestCard);
            updateActiveNode(cardIndex);
        }
    }, 100));
}

/**
 * Updates the active node in the timeline
 */
function updateActiveNode(cardIndex) {
    const nodes = document.querySelectorAll('.timeline-node');
    
    nodes.forEach(node => node.classList.remove('active'));
    
    const activeNode = document.querySelector(`.timeline-node[data-card-index="${cardIndex}"]`);
    if (activeNode) {
        activeNode.classList.add('active');
    }
}

/**
 * Adds glitch effects to various elements
 */
function setupGlitchEffects() {
    // Random glitch effect on card hover
    const cards = document.querySelectorAll('.timeline-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            addRandomGlitch(card);
        });
    });
    
    // Random glitch effect on heading
    const heading = document.querySelector('h1');
    
    setInterval(() => {
        const rand = Math.random();
        if (rand < 0.1) { // 10% chance of glitch effect
            heading.style.transform = `translate(${Math.random() * 4 - 2}px, ${Math.random() * 4 - 2}px)`;
            
            setTimeout(() => {
                heading.style.transform = 'translate(0)';
            }, 100);
        }
    }, 3000);
    
    // Add hover effects to buttons
    const buttons = document.querySelectorAll('.cta-btn');
    
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.letterSpacing = '3px';
            setTimeout(() => {
                this.style.letterSpacing = '2px';
            }, 200);
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.letterSpacing = '2px';
        });
    });
}

/**
 * Adds a random glitch effect to the given element
 */
function addRandomGlitch(element) {
    const effects = [
        // Chromatic aberration
        () => {
            const before = element.querySelector('.card-front::before') || element.querySelector('.card-back::before');
            if (before) {
                before.style.left = `${Math.random() * 10 - 5}px`;
                before.style.top = `${Math.random() * 10 - 5}px`;
                
                setTimeout(() => {
                    before.style.left = '0';
                    before.style.top = '0';
                }, 150);
            }
        },
        // Text distortion
        () => {
            const title = element.querySelector('.project-title');
            if (title) {
                title.style.letterSpacing = `${Math.random() * 3 + 2}px`;
                title.style.transform = `skewX(${Math.random() * 10 - 5}deg)`;
                
                setTimeout(() => {
                    title.style.letterSpacing = '2px';
                    title.style.transform = 'skewX(0)';
                }, 150);
            }
        }
    ];
    
    // Pick a random effect
    const randomEffect = effects[Math.floor(Math.random() * effects.length)];
    randomEffect();
}

/**
 * Debounce function to limit how often a function can be called
 */
function debounce(func, wait) {
    let timeout;
    
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Adds some random noise to the background periodically
 */
function addBackgroundNoise() {
    const body = document.body;
    
    setInterval(() => {
        const rand = Math.random();
        if (rand < 0.2) { // 20% chance of noise
            // Create a temporary noise element
            const noise = document.createElement('div');
            noise.style.position = 'fixed';
            noise.style.top = `${Math.random() * 100}%`;
            noise.style.left = `${Math.random() * 100}%`;
            noise.style.width = `${Math.random() * 100 + 50}px`;
            noise.style.height = `${Math.random() * 100 + 50}px`;
            noise.style.background = 'rgba(0, 255, 255, 0.05)';
            noise.style.borderRadius = '50%';
            noise.style.filter = 'blur(20px)';
            noise.style.zIndex = '-1';
            noise.style.opacity = '0.3';
            noise.style.transform = 'scale(0)';
            noise.style.transition = 'transform 1s ease-out, opacity 1s ease-out';
            
            body.appendChild(noise);
            
            // Trigger animation
            setTimeout(() => {
                noise.style.transform = 'scale(1)';
            }, 10);
            
            // Remove after animation
            setTimeout(() => {
                noise.style.opacity = '0';
                setTimeout(() => {
                    body.removeChild(noise);
                }, 1000);
            }, 1000);
        }
    }, 5000);
}

// Initialize background noise effect
addBackgroundNoise();