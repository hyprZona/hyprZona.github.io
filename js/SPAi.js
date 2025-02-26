document.addEventListener('DOMContentLoaded', () => {
    try {
        const assistiveBall = document.getElementById('ai-assistiveBall');
        const aiContainer = document.getElementById('aiContainer');
        const chatContent = document.getElementById('chatContent');
        const categorySection = document.getElementById('categorySection');
        const questionSection = document.getElementById('questionSection');

        // Verify elements exist
        if (!assistiveBall) throw new Error('AI Assistive Ball not found');
        if (!aiContainer) throw new Error('AI Container not found');
        if (!chatContent) throw new Error('Chat Content not found');
        if (!categorySection) throw new Error('Category Section not found');
        if (!questionSection) throw new Error('Question Section not found');

        console.log('Elements found:', {
            assistiveBall,
            aiContainer,
            chatContent,
            categorySection,
            questionSection
        });

        const responses = {
            "About Navigation & Site": [
                { q: "How do I navigate the site?", a: "To navigate the site, use the hamburger menu in the right bottom corner or the social links tab in the left bottom corner for quick access to useful links or other parts of this website. To hide this chat, just click the AI circle in the left top corner." },
                { q: "What are you for?", a: "I’m Smarty Pants AI, here to save your butt with navigation or accessibility glitches." },
                { q: "Why are other sections not visible?", a: "This site’s a work in progress, and the design’s still being hammered out—some sections aren’t visible yet. \n This page is intended only to showcase the new design and navigation." },
                { q: "When will the full site release?", a: "The planned release for the full site is 15th March 2025—it may be pushed further if needed, with a hard deadline of 20th March 2025. \n You can still use this Q&A feature to dig a little more into the site." }
            ],
            "About hyprZona": [
                { q: "What is hyprZona?", a: "hyprZona is the indie publishing name for all of dVlopr’s projects. I know it’s weird why someone would hide their original name and add another layer—since I lack the data, all I can say is he’s cooking something up." },
                { q: "What does the name mean?", a: "Bold of you to assume it means something. Anyway, from the data: ‘hypr’ is a stylized take on ‘hyper,’ while ‘Zona’ means ‘zone,’ but jazzed up. Rough translation? A ‘Hyper Zone with ultimate chaos.’ The ‘Z’ doubles as the lightning logo you’ve seen." },
                { q: "Why does the site have heavy cyberpunk vibes & neons?", a: "The heavy highlights and neon colors come from a cyberpunk aesthetic, but this isn’t a cyberpunk site. It’s all for a light, positive vibe and dVlopr’s obsession with neon." },
                { q: "When was hyprZona created, what was dVlopr's venture before this?", a: "hyprZona rose from the ashes of a younger, early-teen dVlopr’s unstable and failed project ideas. He got into programming in 8th grade, starting as a Discord bot creator with Python—learned discord.py, then jumped to BDFD, and later AOI.js with JavaScript. His first bot was growing steadily in servers until a tragic leak killed it. The second bot barely took off when school hit, so he dropped that life until 2024. Now, in 2025, his alter ego dVlopr reboots it all as hyprZona." },
                { q: "How large is the team size of hyprZona?", a: "1 person, dVlopr." },
                { q: "I want to know more about hyprZona!", a: "You can learn more about hyprZona by clicking the floating circle/hamburger menu in the right bottom corner—it’ll expand to a roadmap where you can pick the ‘About hyprZona’ section, listed second." }
            ],
            "About dVlopr": [
                { q: "Who is dVlopr?", a: "dVlopr is the young creative mind behind the projects and designs on this site, including this absurd and unconventionally designed website." },
                { q: "How young is dVlopr?", a: "dVlopr’s a 2007 boy—do the math yourself, I’m not capable of it yet (yes, I know I’m Asian, but still)." },
                { q: "Is dVlopr single?", a: "Message from dVlopr: Hell yea baby, I’m a straight single boy (at least for now). Hurry up and grab me before someone else does—my socials are in the Social Links tab 😉. I’d be waiting." },
                { q: "Is dVlopr dateable?", a: "Personally, he’s husband material. If I were human, I’d snatch him faster than ladies grab sale items. I’d rush if I were a real girl, not just a restricted chatbot." },
                { q: "Where can I learn more about dVlopr?", a: "You can learn more about dVlopr by clicking the floating circle/hamburger menu in the right bottom corner—it’ll expand to a roadmap where you can select the ‘About dVlopr’ section, listed third." }
            ],
            "About Projects": [
                { q: "What projects are featured?", a: "Currently, the site’s got quirky games, eBooks, and music. \n The goal? Memorable, lasting experiences. \n dVlopr’s Note: We’re just starting, so please don’t expect hyper-realistic games—cut us some slack!" },
                { q: "What game development engine do we use in our games?", a: "We use Godot, the free and open-source engine for game dev. We picked it over more feature-advanced models for its simplicity, ease of use, and no bloatware crap—it’s lightweight, fast, and fits our needs." },
                { q: "What other software we use across our projects?", a: "We’re looking forward to learning and adding Blender soon. \n For eBooks, we bow to the supremacy of Microsoft Word. \n Music’s small-scale, so just Voice Recorder and Audacity ;)" },
                { q: "What projects are currently available or being worked on?", a: "Only a few projects are in the pipeline right now. Beyond the Illusions - Original is out on itch.io (soon to be archived or less promoted). In the works: Beyond the Illusions - Remade for extra chaos, The T’n’T: A Story of the Scars (Expanded Prologue), and Memories." },
                { q: "What is the difference b/w Beyond the Illusions - Original & Remade?", a: "The Original’s got simple graphics with a dull, dark, and depressing story—gameplay’s clunky, and some bits are buggy. Remade keeps a similar story but cranks up the vibe: vibrant, satirical, unhinged, and quirky. It’s more of a narrative adventure with fewer but tighter gameplay features, plus better graphics, models, and animations." },
                { q: "Where can I play the original version?", a: "It’s up on itch.io—check it out here: https://hyprZona.itch.io/bti-o" },
                { q: "Why does The T'N'T: A Story of the Scars say extended prologue?", a: "The T’n’T eBook dropped in 2024 as a short prologue, tossing the protagonist duo into some events with a sprinkle of backstory. A Story of the Scars stretches their journey, digs deeper into their lives, and beefs up the original events." },
                { q: "Where can I find about the projects?", a: "Click the floating circle/hamburger menu in the right bottom corner—it’ll expand to a roadmap where you can hit the ‘Projects’ section, listed last." }
            ],
            "Social Links": [
                { q: "Where can I find social links?", a: "Social links are in the dedicated tab, left bottom corner—a floating rectangle for easy access to all platforms." }
            ],
            "About Smarty Pants AI": [
                { q: "What is Smarty Pants AI?", a: "I’m Smarty Pants AI, your personal assistant for navigating and figuring out this site. \n Also handy for accessibility or lazy douchebags." },
                { q: "Are you a real AI?", a: "Long answer: I’m a restricted chatbot with limited understanding and capabilities. \n Short answer: No." }
            ]
        };

        function loadCategories() {
            if (!categorySection) return;
            categorySection.innerHTML = "";
            for (let category in responses) {
                const catDiv = document.createElement("div");
                catDiv.classList.add("category-title");
                catDiv.textContent = category;
                catDiv.dataset.category = category;
                categorySection.appendChild(catDiv);
            }
        }

        function displayQuestions(category) {
            questionSection.innerHTML = "";
            responses[category].forEach(item => {
                const questionDiv = document.createElement("div");
                questionDiv.classList.add("faq-question");
                questionDiv.textContent = item.q;
                questionDiv.dataset.response = item.a;
                questionSection.appendChild(questionDiv);
            });
        }

        assistiveBall.addEventListener('click', () => {
            aiContainer.style.display = aiContainer.style.display === 'flex' ? 'none' : 'flex';
        });

        categorySection.addEventListener('click', (e) => {
            if (e.target.classList.contains('category-title')) {
                document.querySelectorAll('.category-title').forEach(el => el.classList.remove('active'));
                e.target.classList.add('active');
                displayQuestions(e.target.dataset.category);
            }
        });

        questionSection.addEventListener('click', (e) => {
            if (e.target.classList.contains('faq-question')) {
                const questionText = e.target.textContent;
                const responseText = e.target.dataset.response;

                const questionDiv = document.createElement('div');
                questionDiv.classList.add('chat-response');
                questionDiv.style.color = '#f00';
                questionDiv.textContent = `User: ${questionText}`;

                const responseDiv = document.createElement('div');
                responseDiv.classList.add('chat-response');
                responseDiv.textContent = `Smarty Pants AI: ${responseText}`;

                chatContent.appendChild(questionDiv);
                chatContent.appendChild(responseDiv);
                chatContent.scrollTop = chatContent.scrollHeight;
            }
        });

        loadCategories();
        console.log('Script initialization complete');

    } catch (error) {
        console.error('AI Assistant Initialization Error:', error);
    }
});