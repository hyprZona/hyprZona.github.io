        const assistiveBall = document.getElementById('assistiveBall');
        const roadmap = document.getElementById('roadmap');

        assistiveBall.addEventListener('click', () => {
            roadmap.style.display = roadmap.style.display === 'block' ? 'none' : 'block';
        });