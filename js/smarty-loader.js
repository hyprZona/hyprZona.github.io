class SmartyLoader {
    static init() {
        // Load CSS
        const cssLink = document.createElement('link');
        cssLink.rel = 'stylesheet';
        cssLink.href = 'css/smarty.css';
        document.head.appendChild(cssLink);

        // Load JS
        const script = document.createElement('script');
        script.src = 'js/smarty.js';
        script.onload = () => {
            // Initialize widget after script loads
            if (typeof SmartyPantsWidget !== 'undefined') {
                window.smartyPants = new SmartyPantsWidget();
            }
        };
        document.body.appendChild(script);
    }

    static autoInit() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.init());
        } else {
            this.init();
        }
    }
}

// Auto initialize
SmartyLoader.autoInit();