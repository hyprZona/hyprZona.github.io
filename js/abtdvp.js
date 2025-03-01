        function checkTerms() {
            if (document.getElementById("acceptTerms").checked) {
                document.getElementById("termsScreen").style.display = "none";
                document.getElementById("profileContainer").style.display = "block";
            }
        }
        function switchTab(event, tabId) {
            document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
            document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
            document.getElementById(tabId).classList.add('active');
            event.currentTarget.classList.add('active');
        }
      function changeChapter() {
            const chapters = {
                "1": ["Chapter 1: The Beginning", "Once upon a time..."],
                "2": ["Chapter 2: The Rise", "As the skills grew..."],
                "3": ["Chapter 3: The Chaos", "Then came the madness..."]
            };
            let val = document.getElementById("chapterSelect").value;
            document.getElementById("chapterTitle").innerText = chapters[val][0];
            document.getElementById("chapterText").innerText = chapters[val][1];
        }