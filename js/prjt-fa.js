document.addEventListener('DOMContentLoaded', () => {
    const faSection = document.getElementById('fa-section');
    if (!faSection) return;

    let currentAlbum = 0;
    const albums = faSection.querySelectorAll('.album-card');

    // Add click handler for the FA card
    const faCard = document.querySelector('.music-banner');
    if (faCard) {
        faCard.addEventListener('click', (e) => {
            e.preventDefault();
            faSection.classList.add('active');
            showAlbum(currentAlbum); // Show current album when section opens
        });
    }

    function showAlbum(index) {
        albums.forEach(album => album.style.display = 'none');
        albums[index].style.display = 'flex';
    }

    function nextAlbum() {
        currentAlbum = (currentAlbum + 1) % albums.length;
        showAlbum(currentAlbum);
    }

    function prevAlbum() {
        currentAlbum = (currentAlbum - 1 + albums.length) % albums.length;
        showAlbum(currentAlbum);
    }

    // Initialize carousel
    const prevBtn = faSection.querySelector('.fa-prev-btn');
    const nextBtn = faSection.querySelector('.fa-next-btn');

    if (prevBtn) prevBtn.addEventListener('click', prevAlbum);
    if (nextBtn) nextBtn.addEventListener('click', nextAlbum);

    // Close button functionality
    const closeButton = faSection.querySelector('.section-close');
    if (closeButton) {
        closeButton.addEventListener('click', () => {
            faSection.classList.remove('active');
        });
    }

    // Escape key functionality
    document.addEventListener('keydown', (e) => {
        if (!faSection.classList.contains('active')) return;
        
        switch(e.key) {
            case 'ArrowLeft':
                prevAlbum();
                break;
            case 'ArrowRight':
                nextAlbum();
                break;
            case 'Escape':
                faSection.classList.remove('active');
                break;
        }
    });

    // Initialize first album
    showAlbum(0);
});