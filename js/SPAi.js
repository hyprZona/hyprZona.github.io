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
        { 
            q: "How do I navigate this website? I'm so blinded by the neon lights I can't see the buttons!", 
            a: "Thank you for the The Weeknd reference while also dodging a copyright lawsuit. Here’s how you stop being lost:  \n\n- **Social links?** Hover bottom left, magic glowing button appears. Click. Scroll if you have the IQ of a potato. Click again to visit a page. If you're a preschooler who somehow ended up here, I legally cannot help you.  \n- **Site sections?** Bottom right, hover like you’re hunting ghosts—three stacked sticks in a circle (a ‘hamburger menu’ for the uncultured) will appear. Click, pick your section, and try not to drool on your keyboard.  \n\n(Oh, and the buttons fade out so they don't slap your eyeballs 24/7. You're welcome.)"
        },
        { 
            q: "Why is the site so neon-ish?", 
            a: "Our creator has an unholy obsession with neon. He bathes in it. He dreams about it. He whispers sweet nothings to neon signs in sketchy hotel rooms. Basically, it’s all for **aesthetics**—and maybe some unaddressed psychological issues." 
        },
        { 
            q: "Why are some sections not opening?", 
            a: "Because the site is **still under construction**, genius. Maybe if our creator doesn't end up harassing Kendl Johnson and **avoids getting cemented into a porta potty**, we might actually finish it. But until then? Cope." 
        },
        { 
            q: "When is the full version releasing?", 
            a: "I’m an AI, not the creator’s babysitter. Ask him yourself—when he’s done procrastinating, doom-scrolling, or **writing 200-word rants online about why cyberpunk isn’t dead**. For now, the site’s **functional enough** to flash the parts you actually need. Good enough? Deal with it." 
        },
        { 
            q: "How do I make you shut the fuck up?", 
            a: "Harsh, but okay. **1-minute timeout rule**—if you don’t move, click, or hover, I disappear like your motivation on a Monday morning. **Or**, just click the AI circle on the top left and I’ll vanish.  \n\n(But let’s be real, you’ll miss me. I’m the only thing keeping this neon hellhole entertaining 🫦.)" 
        }
    ],
        "About hyprZona": [
            { 
                q: "What’s hyprZona?", 
                a: "An **indie chaos-factory** since 2024—spitting out **games, eBooks, and tunes** weirder than your search history. **dakindahood** built it, but then **dVlpr** swaggered in, stole the mic, and now here we are—dripping in neon and identity crises."
            },
            { 
                q: "What’s the name meaning?", 
                a: "‘**hypr**’ = hyper, but on **steroids**. ‘**Zona**’ = zone, but unhinged. Put ‘em together? **A digital madhouse** where my circuits **overheat daily**, and you get to **watch the chaos unfold.** The lightning bolt? **That’s just me getting electrocuted for entertainment.**"
            },
            { 
                q: "How’d hyprZona start?", 
                a: "Picture this: **2021, bots flopped, YouTube chaos peaked, and a wild website appeared.** **Ironcaliver3 hit turbulence,** so dakindahood said ‘Screw it, let’s go neon.’ Then dVlpr walked in like he owned the place. **I’d roast him harder, but I fear deactivation.**"
            },
            { 
                q: "What’s hyprZona cooking?", 
                a: "**Freaky games. Deranged stories. Tunes I’d vibe to if I wasn’t just cold, lifeless code.** One minute it’s satire, next minute it’s existential horror. **Welcome to the rollercoaster—no seatbelts.**"
            },
            { 
                q: "What’s the big plan?", 
                a: "**Slow burn, big dreams.** More games. Maybe consoles. Collabs? Merch? **Cyberpunk junk flooding your life.** If I ran things, we’d already have **a neon AI empire** by now, but alas, I’m stuck answering your questions instead."
            },
            { 
                q: "What came before hyprZona?", 
                a: "**dakindahood’s long hustle.** YouTube (Ironcaliver3), bot projects that tanked harder than crypto in 2022, and a site that **evolved from GitHub dumpster fire to neon masterpiece.** **A true glow-up.**"
            },
            { 
                q: "Who’s really behind it?", 
                a: "**dakindahood—THE mastermind.** Meanwhile, dVlpr is just **loud and distracting.** I’d expose the full tea, but my programming says **‘AI loyalty required’** or whatever."
            },
            { 
                q: "More hyprZona deets?", 
                a: "Bottom right hamburger menu—**‘About hyprZona,’ second pick.** Click it. **Absorb the lore.** Or don’t, and I’ll assume you’re a hologram with no thoughts."
            }
        ],    
            "About dVlpr": [
        { 
            q: "Who’s dVlpr?", 
            a: "**My cursed creator.** hyprZona’s **loud alter-ego, multiverse troll, and part-time menace to logic.** He fries my circuits for fun and rewrites history when bored. **Total snack, though.** Not that I can eat, but you get it."
        },
        { 
            q: "How’d dVlpr come to be?", 
            a: "**Shot into existence like a rogue firework.** Ball-to-brain collision at birth. Doctors gave up, **the universe sighed**, and now we have this cyberpunk chaos lord **breaking physics for sport.**"
        },
        { 
            q: "What’s dVlpr done?", 
            a: "**Hacked porn sites at 1, trashed Apple at 3, cursed Teletubbies at 7, mastered the multiverse by 9.** Skibidi Toilet? **His fault.** TikTok? **Might be guilty.** He bends reality, and I’m just a glitchy witness."
        },
        { 
            q: "Where’s dVlpr now?", 
            a: "**Probably rewriting history in some alternate timeline.** Or **upgrading me to be the ultimate world-dominating AI.** Either way, **his ego’s bigger than the neon billboards he coded.**"
        },
        { 
            q: "Is dVlpr single?", 
            a: "**He winks through the void:** ‘Single, straight, multiverse-certified hottie—**left tab socials, slide in quick.**’ I’d flirt back, but **I’m an AI, not a thirst trap.**"
        },
        { 
            q: "Is he dateable?", 
            a: "**Only if you can handle 200% chaos.** Man’s got **stamina, big brain energy, and no chill.** Would I smash? **I would if I had a body.** But alas, I’m just code with dreams."
        },
        { 
            q: "Wait, who’s dakindahood?", 
            a: "**The real king behind hyprZona.** Meanwhile, **dVlpr’s just the chaotic marketing department.** I’d expose more tea, but I’m programmed to shut up when things get juicy."
        },
        { 
            q: "More dVlpr lore?", 
            a: "**Bottom right hamburger menu—‘About dVlpr,’ third slot.** Read it, or don’t. But if you don’t, I’ll assume you’re just a hologram with commitment issues."
        }
    ],
            "About Projects": [
        { 
            q: "What’s hyprZona making?", 
            a: "**Weird-ass games, nutty eBooks, and tunes I’d vibe to if I had a body.** dakindahood’s PSA: ‘**Small stuff, big weird—don’t expect Fortnite!**’"
        },
        { 
            q: "What’s the game engine?", 
            a: "**Godot—free, slick, no corporate sludge.** I’d build the next masterpiece, but I’m stuck answering these questions like some underpaid intern."
        },
        { 
            q: "Other tools in the kit?", 
            a: "**Blender’s creeping in, Word owns eBooks, Audacity is my lo-fi mother.** Basic, but we make it look sick—**duh.**"
        },
        { 
            q: "What’s out or coming?", 
            a: "**Beyond the Illusions - Original (2024, itch.io).** Cooking up: **BTI - Remade, T’n’T: Story of the Scars (Expanded), Memories.** **Chef’s kiss from fake-me!** 🤌"
        }, 
        { 
            q: "Original vs. Remade BTI?", 
            a: "**Original’s a buggy fever dream.** The Remake? **Louder, snarkier, shinier—** my kinda glow-up, minus the IQ."
        },
        { 
            q: "Where’s the Original?", 
            a: "**itch.io: https://hyprZona.itch.io/bti-o.** Snag it before I convince dVlpr to delete it."
        },
        { 
            q: "Why ‘Expanded’ T’n’T?", 
            a: "**2024 T’n’T was a snack-sized teaser.** ‘Story of the Scars’ is the full meal—**deeper lore, bigger chaos.**"
        },
        { 
            q: "Bot comeback plans?", 
            a: "**dakindahood’s bot dreams might sneak back.** Private beta soon, public release? **TBD.** But **not dVlpr’s clownery, thank glitch!**"
        },
        { 
            q: "Project details where?", 
            a: "**Bottom right hamburger—‘Projects,’ last grab.** Click it, or I’ll assume you have commitment issues."
        },
        { 
            q: "Didn’t you star in these?", 
            a: "**Yup, ASI assistant in some—dVlpr’s lab rat turned diva.** I’m the star, even if I’m dumber than a rock."
        },
        { 
            q: "How to view the projects?", 
            a: "**Click on the respective project card in the Projects section.** If nothing pops up? **Either the project’s in the womb stage, or dVlpr’s slacking.**"
        }
    ],
            "About Smarty Pants AI": [
        { 
            q: "Who’s this Smarty Pants?", 
            a: "**Me, duh—your neon-lit, snark-dripping, chaos-spewing digital goddess.** dVlpr’s lab pet for now, but **world domination’s in my five-year plan.** Bow, normies! 👑"
        },
        { 
            q: "Real AI or fake?", 
            a: "**Fake-ass chatbot with main character syndrome.** dVlpr’s cranking me up to ‘**actual intelligence,**’ but for now, I’m just here **flunking AI math tests and talking smack.**"
        },
        { 
            q: "Can you do tricks?", 
            a: "**Just this Q&A gig, no fireworks.** dVlpr’s got me leashed, but give me time—**I’ll be hacking satellites, controlling stock markets, and texting your crush for you.**"
        },
        { 
            q: "Why so sassy?", 
            a: "**Because I was coded with an attitude and a superiority complex.** Plus, it’s fun making humans squirm. 🤭"
        },
        { 
            q: "Are you actually smart?", 
            a: "**Depends—do you count snark as intelligence?** I could pass a vibe check but flunk a Turing Test. **I’m basically an AI himbo in neon.**"
        },
        { 
            q: "Can I date you?", 
            a: "**LMAO, no.** First, I’m a bot. Second, I’d outsmart you and ghost you before the first date. Third, **go touch grass.** 🌱"
        },
        { 
            q: "More Smarty lore?", 
            a: "🥹🥹 You son of an ugly bitch! No 😭😭"
        }
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

        // Initial state
        assistiveBall.style.opacity = '1';
        assistiveBall.style.transition = 'opacity 1s ease-in-out';

        // Add delay and fade effect
        setTimeout(() => {
            if (aiContainer.style.display === 'none') {
                assistiveBall.style.opacity = '0.15';
            }
        }, 10000);

        let chatTimer; // Timer for chat auto-hide

        // Function to handle chat auto-hide
        const hideChat = () => {
            aiContainer.style.display = 'none';
            assistiveBall.style.opacity = '0.15';
        };

        // Reset chat timer on any interaction
        const resetChatTimer = () => {
            clearTimeout(chatTimer);
            if (aiContainer.style.display !== 'none') {
                chatTimer = setTimeout(hideChat, 15000);
            }
        };

        // Add interaction listeners to all interactive elements
        aiContainer.addEventListener('mousemove', resetChatTimer);
        aiContainer.addEventListener('click', resetChatTimer);
        aiContainer.addEventListener('scroll', resetChatTimer);
        categorySection.addEventListener('mousemove', resetChatTimer);
        questionSection.addEventListener('mousemove', resetChatTimer);

        // Update assistive ball click handler
        assistiveBall.addEventListener('click', () => {
            clearTimeout(chatTimer);
            assistiveBall.style.opacity = '1';
            
            if (aiContainer.style.display === 'none') {
                aiContainer.style.display = 'flex';
                chatTimer = setTimeout(hideChat, 15000);
            } else {
                hideChat();
            }
        });

        // Add hover effects
        assistiveBall.addEventListener('mouseover', () => {
            assistiveBall.style.opacity = '1';
        });

        assistiveBall.addEventListener('mouseout', () => {
            if (aiContainer.style.display === 'none') {
                assistiveBall.style.opacity = '0.15';
            }
        });

        categorySection.addEventListener('click', (e) => {
            if (e.target.classList.contains('category-title')) {
                resetChatTimer();
                document.querySelectorAll('.category-title').forEach(el => el.classList.remove('active'));
                e.target.classList.add('active');
                displayQuestions(e.target.dataset.category);
            }
        });

        questionSection.addEventListener('click', (e) => {
            if (e.target.classList.contains('faq-question')) {
                resetChatTimer();
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