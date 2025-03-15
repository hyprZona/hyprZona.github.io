    function prevSlide(carouselId) {
        let carousel = document.getElementById(carouselId);
        carousel.appendChild(carousel.firstElementChild);
    }
    function nextSlide(carouselId) {
        let carousel = document.getElementById(carouselId);
        carousel.insertBefore(carousel.lastElementChild, carousel.firstElementChild);
    }