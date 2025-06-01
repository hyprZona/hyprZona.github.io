// hyprZona Website JavaScript

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize animations
  initAnimations();
  
  // Initialize glitch effect for chaos text
  initGlitchEffect();
  
  // Initialize grid animations
  initGridAnimation();
});

// Initialize main animations using GSAP
function initAnimations() {
  // Create a GSAP timeline for sequence control
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
  
  // Animate the tagline lines with staggered effect
  tl.to('.line', { 
    opacity: 1, 
    y: 0, 
    duration: 0.8, 
    stagger: 0.2 
  })
  
  // Animate the intro text
  .to('.intro', { 
    opacity: 1, 
    y: 0, 
    duration: 0.6 
  }, '-=0.3')
  
  // Animate the CTA button
  .to('.cta-button', { 
    opacity: 1, 
    y: 0, 
    duration: 0.6 
  }, '-=0.3');
  
  // Add subtle floating animation to the hero content
  gsap.to('.hero-content', {
    y: -10,
    duration: 2,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
  });
}

// Initialize the glitch effect for the chaos text
function initGlitchEffect() {
  const chaosText = document.querySelector('.chaos-text');
  
  // Skip if element doesn't exist
  if (!chaosText) return;
  
  // Create the glitch effect on random intervals
  function randomGlitch() {
    // Only glitch if not being hovered (we have a separate hover effect in CSS)
    if (!chaosText.matches(':hover')) {
      // Create random glitch parameters
      const glitchDuration = Math.random() * 0.2 + 0.05;
      const glitchInterval = Math.random() * 5000 + 2000; // Random interval between 2-7 seconds
      
      // Random glitch animations
      gsap.to(chaosText, {
        skewX: Math.random() * 10 - 5,
        textShadow: `${Math.random() * 5 - 2.5}px ${Math.random() * 5 - 2.5}px rgba(255, 0, 51, 0.7), 
                     ${Math.random() * -5 + 2.5}px ${Math.random() * -5 + 2.5}px rgba(0, 255, 255, 0.7)`,
        duration: glitchDuration,
        onComplete: () => {
          // Reset after glitch
          gsap.to(chaosText, {
            skewX: 0,
            textShadow: 'none',
            duration: glitchDuration
          });
          
          // Schedule next glitch
          setTimeout(randomGlitch, glitchInterval);
        }
      });
    } else {
      // If being hovered, check again soon
      setTimeout(randomGlitch, 1000);
    }
  }
  
  // Start the glitch effect after a small delay
  setTimeout(randomGlitch, 2000);
}

// Initialize background grid animation
function initGridAnimation() {
  const gridContainer = document.querySelector('.grid-container');
  
  // Skip if element doesn't exist
  if (!gridContainer) return;
  
  // Add subtle movement to the grid
  gsap.to(gridContainer, {
    backgroundPosition: '40px 40px',
    duration: 20,
    repeat: -1,
    ease: 'linear'
  });
  
  // Add reactivity to mouse movement
  document.addEventListener('mousemove', (e) => {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    
    // Calculate mouse position relative to center of window (values from -1 to 1)
    const xPos = (e.clientX / windowWidth - 0.5) * 2;
    const yPos = (e.clientY / windowHeight - 0.5) * 2;
    
    // Apply subtle transform to grid based on mouse position
    gsap.to(gridContainer, {
      rotateX: 60 + yPos * 5, 
      rotateY: xPos * 5,
      duration: 1
    });
  });
}

// Add console easter egg
console.log(`%c
                 _       __     _    _     
 /\\  /\\__ _ _ __| |__  //_\\___| |__| |___ 
/ /_/ / _\` | '__| '_ \\/ /_\\/ _ \\ '__| / __|
\\__ /| (_| | |  | |_) / /| | (_) | | | \\__ \\
 |_|  \\__, |_|  |_.__/_/ |_|\\___/|_| |_|___/
      |___/                                
`, 'color: #00FFFF; background: #000; font-family: monospace; font-size: 12px;');
console.log("%cWhere Creativity meets Chaos", "color: #FF0033; background: #000; font-family: monospace; font-size: 14px;");
console.log("%cWelcome to the source! Feel free to explore.", "color: white; background: #000; font-family: monospace;");