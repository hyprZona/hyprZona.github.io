document.addEventListener("DOMContentLoaded", function() {
    const navbarToggle = document.querySelector('.navbar-toggle');
    const sidebar = document.querySelector('.sidebar');

    navbarToggle.addEventListener('click', function() {
        sidebar.classList.toggle('open');
    });
});
