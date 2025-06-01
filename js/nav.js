/**
 * hyprZona Navigation Utility - JavaScript
 * A cyberpunk-styled navigation widget with personality
 */

class HyprZonaNav {
  constructor() {
    this.isOpen = false;
    this.currentStyle = 'slide';
    this.dropdownTimers = new Map();
    this.personalities = [
      "Where to, traveler?",
      "Pick your poison.",
      "Accessing memory archive...",
      "Choose your reality.",
      "Navigate like a pro.",
      "Portal activated."
    ];
    
    this.init();
  }

  init() {
    this.bindEvents();
    this.setupKeyboardNavigation();
    this.loadUserPreferences();
    this.preloadSounds();
    
    // Set initial style
    this.setNavigationStyle(this.currentStyle);
    
    console.log('🌀 hyprZona Navigation Utility initialized');
  }

  bindEvents() {
    const trigger = document.getElementById('nav-trigger');
    const menu = document.getElementById('nav-menu');
    const overlay = document.getElementById('nav-overlay');
    const styleButtons = document.querySelectorAll('.nav-style-btn');
    const dropdownItems = document.querySelectorAll('.nav-item-dropdown');

    // Main trigger button
    trigger?.addEventListener('click', (e) => {
      e.preventDefault();
      this.toggleMenu();
    });

    // Close on overlay click
    overlay?.addEventListener('click', () => {
      this.closeMenu();
    });

    // Style selector buttons
    styleButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const style = btn.dataset.style;
        this.setNavigationStyle(style);
      });
    });

    // Dropdown functionality
    dropdownItems.forEach(item => {
      this.setupDropdown(item);
    });

    // Navigation item clicks with sound
    document.querySelectorAll('.nav-item:not(.nav-item-dropdown)').forEach(item => {
      item.addEventListener('click', () => {
        this.playSound('navigate');
      });
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.closeMenu();
      }
    });

    // Random personality tooltip updates
    this.updatePersonality();
    setInterval(() => this.updatePersonality(), 15000);
  }

  setupDropdown(dropdownItem) {
    const dropdown = dropdownItem.querySelector('.nav-dropdown');
    if (!dropdown) return;

    let hoverTimer;
    const HOVER_DELAY = 10000; // 10 seconds as specified

    // Mouse enter - start timer
    dropdownItem.addEventListener('mouseenter', () => {
      hoverTimer = setTimeout(() => {
        dropdown.classList.add('show');
        dropdown.setAttribute('aria-hidden', 'false');
        this.playSound('dropdown');
      }, HOVER_DELAY);
    });

    // Mouse leave - clear timer and hide dropdown
    dropdownItem.addEventListener('mouseleave', () => {
      clearTimeout(hoverTimer);
      setTimeout(() => {
        dropdown.classList.remove('show');
        dropdown.setAttribute('aria-hidden', 'true');
      }, 300);
    });

    // Click to toggle immediately
    dropdownItem.addEventListener('click', (e) => {
      e.preventDefault();
      const isVisible = dropdown.classList.contains('show');
      
      if (isVisible) {
        dropdown.classList.remove('show');
        dropdown.setAttribute('aria-hidden', 'true');
      } else {
        dropdown.classList.add('show');
        dropdown.setAttribute('aria-hidden', 'false');
        this.playSound('dropdown');
      }
    });

    // Keep dropdown open when hovering over it
    dropdown.addEventListener('mouseenter', () => {
      clearTimeout(hoverTimer);
    });

    dropdown.addEventListener('mouseleave', () => {
      setTimeout(() => {
        dropdown.classList.remove('show');
        dropdown.setAttribute('aria-hidden', 'true');
      }, 300);
    });
  }

  toggleMenu() {
    if (this.isOpen) {
      this.closeMenu();
    } else {
      this.openMenu();
    }
  }

  openMenu() {
    const trigger = document.getElementById('nav-trigger');
    const menu = document.getElementById('nav-menu');
    const overlay = document.getElementById('nav-overlay');
    const navItems = document.querySelector('.nav-items');

    this.isOpen = true;

    // Update ARIA attributes
    trigger?.setAttribute('aria-expanded', 'true');
    menu?.setAttribute('aria-hidden', 'false');
    overlay?.setAttribute('aria-hidden', 'false');

    // Add active classes
    menu?.classList.add('active');
    overlay?.classList.add('active');

    // Apply current navigation style
    this.applyStyleAnimation(navItems);

    // Play sound
    this.playSound('open');

    // Focus first nav item for accessibility
    setTimeout(() => {
      const firstNavItem = document.querySelector('.nav-item');
      firstNavItem?.focus();
    }, 100);

    console.log('🌀 Navigation menu opened');
  }

  closeMenu() {
    const trigger = document.getElementById('nav-trigger');
    const menu = document.getElementById('nav-menu');
    const overlay = document.getElementById('nav-overlay');

    this.isOpen = false;

    // Update ARIA attributes
    trigger?.setAttribute('aria-expanded', 'false');
    menu?.setAttribute('aria-hidden', 'true');
    overlay?.setAttribute('aria-hidden', 'true');

    // Remove active classes
    menu?.classList.remove('active');
    overlay?.classList.remove('active');

    // Close all dropdowns
    document.querySelectorAll('.nav-dropdown').forEach(dropdown => {
      dropdown.classList.remove('show');
      dropdown.setAttribute('aria-hidden', 'true');
    });

    // Play sound
    this.playSound('close');

    // Return focus to trigger
    trigger?.focus();

    console.log('🌀 Navigation menu closed');
  }

  setNavigationStyle(style) {
    const navItems = document.querySelector('.nav-items');
    const styleButtons = document.querySelectorAll('.nav-style-btn');

    if (!navItems) return;

    // Remove all style classes
    navItems.classList.remove('style-slide', 'style-radial', 'style-glitch');
    
    // Add new style class
    navItems.classList.add(`style-${style}`);
    
    // Update active button
    styleButtons.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.style === style);
    });

    // Set CSS custom properties for glitch animation
    if (style === 'glitch') {
      const items = navItems.querySelectorAll('.nav-item');
      items.forEach((item, index) => {
        item.style.setProperty('--item-index', index);
      });
    }

    this.currentStyle = style;
    this.saveUserPreferences();

    console.log(`🌀 Navigation style changed to: ${style}`);
  }

  applyStyleAnimation(navItems) {
    if (!navItems) return;

    if (this.currentStyle === 'glitch') {
      // Reset and trigger glitch animation
      const items = navItems.querySelectorAll('.nav-item');
      items.forEach((item, index) => {
        item.style.animation = 'none';
        item.offsetHeight; // Force reflow
        item.style.animation = `glitchSlide 0.6s ease forwards`;
        item.style.animationDelay = `${index * 0.1}s`;
      });
    }
  }

  setupKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
      if (!this.isOpen) return;

      const focusableElements = document.querySelectorAll(
        '.nav-item:not([disabled]), .nav-dropdown-item:not([disabled]), .nav-style-btn:not([disabled])'
      );
      const currentIndex = Array.from(focusableElements).indexOf(document.activeElement);

      switch (e.key) {
        case 'ArrowDown':
        case 's':
        case 'S':
          e.preventDefault();
          const nextIndex = (currentIndex + 1) % focusableElements.length;
          focusableElements[nextIndex]?.focus();
          this.playSound('navigate');
          break;

        case 'ArrowUp':
        case 'w':
        case 'W':
          e.preventDefault();
          const prevIndex = currentIndex <= 0 ? focusableElements.length - 1 : currentIndex - 1;
          focusableElements[prevIndex]?.focus();
          this.playSound('navigate');
          break;

        case 'Enter':
        case ' ':
          e.preventDefault();
          document.activeElement?.click();
          break;

        case 'Tab':
          // Allow default tab behavior
          break;
      }
    });
  }

  updatePersonality() {
    const tooltip = document.getElementById('nav-tooltip');
    if (!tooltip) return;

    const randomPersonality = this.personalities[Math.floor(Math.random() * this.personalities.length)];
    tooltip.textContent = randomPersonality;
  }

  preloadSounds() {
    // Using Web Audio API for better performance
    this.audioContext = null;
    this.sounds = {};

    try {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
      this.generateSounds();
    } catch (e) {
      console.warn('🌀 Audio context not available, sounds disabled');
    }
  }

  generateSounds() {
    if (!this.audioContext) return;

    // Generate synthetic cyberpunk sounds
    this.sounds = {
      open: this.createSound([800, 1200, 600], [0.1, 0.05, 0.05], 0.3),
      close: this.createSound([600, 400, 200], [0.1, 0.05, 0.05], 0.3),
      navigate: this.createSound([1000, 1200], [0.05, 0.03], 0.2),
      dropdown: this.createSound([1400, 1000], [0.08, 0.04], 0.25)
    };
  }

  createSound(frequencies, durations, volume = 0.3) {
    if (!this.audioContext) return null;

    const duration = durations.reduce((a, b) => a + b, 0);
    const buffer = this.audioContext.createBuffer(1, this.audioContext.sampleRate * duration, this.audioContext.sampleRate);
    const data = buffer.getChannelData(0);

    let currentTime = 0;
    frequencies.forEach((freq, i) => {
      const startSample = Math.floor(currentTime * this.audioContext.sampleRate);
      const endSample = Math.floor((currentTime + durations[i]) * this.audioContext.sampleRate);
      
      for (let sample = startSample; sample < endSample; sample++) {
        const t = (sample - startSample) / this.audioContext.sampleRate;
        const envelope = Math.exp(-t * 3); // Exponential decay
        data[sample] = Math.sin(2 * Math.PI * freq * t) * envelope * volume;
      }
      
      currentTime += durations[i];
    });

    return buffer;
  }

  playSound(soundName) {
    if (!this.audioContext || !this.sounds[soundName]) return;

    try {
      const source = this.audioContext.createBufferSource();
      const gainNode = this.audioContext.createGain();
      
      source.buffer = this.sounds[soundName];
      source.connect(gainNode);
      gainNode.connect(this.audioContext.destination);
      
      gainNode.gain.value = 0.1; // Keep sounds subtle
      source.start();
    } catch (e) {
      // Silently fail if audio playback fails
    }
  }

  saveUserPreferences() {
    try {
      const preferences = {
        navigationStyle: this.currentStyle,
        timestamp: Date.now()
      };
      localStorage.setItem('hyprZona-nav-prefs', JSON.stringify(preferences));
    } catch (e) {
      // LocalStorage might not be available
    }
  }

  loadUserPreferences() {
    try {
      const saved = localStorage.getItem('hyprZona-nav-prefs');
      if (saved) {
        const preferences = JSON.parse(saved);
        if (preferences.navigationStyle) {
          this.currentStyle = preferences.navigationStyle;
        }
      }
    } catch (e) {
      // Use defaults if localStorage fails
    }
  }

  // Public API for external integration
  static getInstance() {
    if (!window.hyprZonaNav) {
      window.hyprZonaNav = new HyprZonaNav();
    }
    return window.hyprZonaNav;
  }

  // Method to programmatically navigate
  navigateTo(page) {
    const navItem = document.querySelector(`[data-nav="${page}"]`);
    if (navItem) {
      navItem.click();
      this.closeMenu();
    }
  }

  // Method to unlock secret content
  unlockSecret(secretKey) {
    const secretItem = document.querySelector('.nav-item-secret');
    if (secretItem && secretKey === 'hyprZona-master-key') {
      secretItem.style.animation = 'glitch 0.5s ease-in-out 3';
      secretItem.querySelector('.nav-item-tooltip').textContent = 'Secrets unlocked!';
      console.log('🔓 Secret content unlocked!');
      return true;
    }
    return false;
  }
}

// Initialize navigation when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  HyprZonaNav.getInstance();
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = HyprZonaNav;
}

// Global utility functions
window.hyprZonaUtils = {
  // Quick navigation function
  goto: (page) => {
    const nav = HyprZonaNav.getInstance();
    nav.navigateTo(page);
  },
  
  // Style switcher function
  setNavStyle: (style) => {
    const nav = HyprZonaNav.getInstance();
    nav.setNavigationStyle(style);
  },
  
  // Secret unlocker function
  unlock: (key) => {
    const nav = HyprZonaNav.getInstance();
    return nav.unlockSecret(key);
  }
};

// Easter eggs and gamification
document.addEventListener('keydown', (e) => {
  // Konami code easter egg
  const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
  
  if (!window.konamiProgress) window.konamiProgress = 0;
  
  if (e.code === konamiCode[window.konamiProgress]) {
    window.konamiProgress++;
    if (window.konamiProgress === konamiCode.length) {
      window.konamiProgress = 0;
      const nav = HyprZonaNav.getInstance();
      nav.unlockSecret('hyprZona-master-key');
      
      // Trigger special effect
      document.body.style.animation = 'glitch 2s ease-in-out';
      setTimeout(() => {
        document.body.style.animation = '';
      }, 2000);
    }
  } else {
    window.konamiProgress = 0;
  }
});

console.log(`
🌀 hyprZona Navigation Utility Loaded
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎮 Available Commands:
   • hyprZonaUtils.goto('page')     - Navigate to specific page
   • hyprZonaUtils.setNavStyle('style') - Change navigation style  
   • hyprZonaUtils.unlock('key')    - Unlock secret content
   • Try the Konami code for surprises... ↑↑↓↓←→←→BA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`);

// Auto-unlock secrets after exploring the site
let pageVisits = new Set();
document.addEventListener('click', (e) => {
  if (e.target.matches('.nav-item[data-nav]')) {
    const page = e.target.dataset.nav;
    pageVisits.add(page);
    
    // Unlock secrets after visiting 3+ different pages
    if (pageVisits.size >= 3) {
      setTimeout(() => {
        const nav = HyprZonaNav.getInstance();
        nav.unlockSecret('hyprZona-master-key');
      }, 1000);
    }
  }
});