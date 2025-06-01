class NavLoader {
    static async init() {
        await this.loadCSS();
        this.injectNavHTML();
        await this.loadScript();
    }

    static loadCSS() {
        return new Promise((resolve) => {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = 'css/nav.css';
            link.onload = () => resolve();
            document.head.appendChild(link);
        });
    }

    static injectNavHTML() {
        const navHTML = `
            <div id="nav-utility" class="nav-utility" role="navigation" aria-label="Site Navigation">
                <button id="nav-trigger" class="nav-trigger" aria-expanded="false" aria-controls="nav-menu" aria-labelledby="nav-tooltip">
                    <div class="nav-icon">
                        <div class="compass-needle"></div>
                        <div class="compass-ring"></div>
                    </div>
                    <div id="nav-tooltip" class="nav-tooltip" role="tooltip">Portalize me, baby</div>
                </button>

                <div id="nav-menu" class="nav-menu" aria-hidden="true">
                    <div class="nav-backdrop"></div>
                    <nav class="nav-items" role="menu">
                        <a href="hero.html" class="nav-item" role="menuitem" data-nav="home">
                            <div class="nav-item-icon">🏠</div>
                            <span class="nav-item-text">Home</span>
                            <div class="nav-item-tooltip">HZ origin story</div>
                        </a>

                        <a href="abthza.html" class="nav-item" role="menuitem" data-nav="about">
                            <div class="nav-item-icon">🌀</div>
                            <span class="nav-item-text">About hyprZona</span>
                            <div class="nav-item-tooltip">Peek into the madness</div>
                        </a>

                        <a href="creator.html" class="nav-item" role="menuitem" data-nav="creators">
                                <div class="nav-item-icon">🧠</div>
                                <span class="nav-item-text">About creator(s)</span>
                                <div class="nav-item-tooltip">Lose your braincells</div>
                        </a>

                        <a href="znu.html" class="nav-item" role="menuitem" data-nav="timeline">
                                <div class="nav-item-icon">🧬</div>
                                <span class="nav-item-text">ZNU Timeline</span>
                                <div class="nav-item-tooltip">Dive into the world of hyprZona</div>
                        </a>

                        <a href="#" class="nav-item" role="menuitem" data-nav="news">
                            <div class="nav-item-icon">📰</div>
                            <span class="nav-item-text">News</span>
                            <div class="nav-item-tooltip">Coming Soon</div>
                        </a>

                        <a href="#" class="nav-item" role="menuitem" data-nav="dates">
                            <div class="nav-item-icon">📅</div>
                            <span class="nav-item-text">Dates</span>
                            <div class="nav-item-tooltip">Coming Soon</div>
                        </a>
                    </nav>

                    <div class="nav-style-selector">
                        <button class="nav-style-btn active" data-style="slide">Classic Stack</button>
                        <button class="nav-style-btn" data-style="radial">Radial Rift</button>
                        <button class="nav-style-btn" data-style="glitch">Glitch Slide</button>
                    </div>
                </div>
            </div>
            <div id="nav-overlay" class="nav-overlay" aria-hidden="true"></div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', navHTML);
    }

    static loadScript() {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = 'js/nav.js';
            script.onload = () => {
                // Initialize the navigation after script loads
                if (typeof HyprZonaNav !== 'undefined') {
                    HyprZonaNav.getInstance();
                }
                resolve();
            };
            document.body.appendChild(script);
        });
    }
}

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    NavLoader.init().catch(console.error);
});