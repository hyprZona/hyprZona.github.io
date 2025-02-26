        const assistiveBall = document.getElementById('assistiveBall');
        const roadmap = document.getElementById('roadmap');

        assistiveBall.addEventListener('click', () => {
            roadmap.style.display = roadmap.style.display === 'block' ? 'none' : 'block';
        });

        assistiveBall.addEventListener('mousedown', function(event) {
            let shiftX = event.clientX - assistiveBall.getBoundingClientRect().left;
            let shiftY = event.clientY - assistiveBall.getBoundingClientRect().top;

            function moveAt(pageX, pageY) {
                assistiveBall.style.left = pageX - shiftX + 'px';
                assistiveBall.style.top = pageY - shiftY + 'px';
            }

            function onMouseMove(event) {
                moveAt(event.pageX, event.pageY);
            }

            document.addEventListener('mousemove', onMouseMove);

            assistiveBall.onmouseup = function() {
                document.removeEventListener('mousemove', onMouseMove);
                assistiveBall.onmouseup = null;
            };
        });

        assistiveBall.ondragstart = function() {
            return false;
        };