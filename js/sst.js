        const socialTab = document.getElementById('socialTab');
        const socialLinks = document.getElementById('socialLinks');

        socialTab.addEventListener('click', () => {
            socialLinks.style.display = socialLinks.style.display === 'block' ? 'none' : 'block';
        });