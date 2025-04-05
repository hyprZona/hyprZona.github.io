function setProfileImage() {
    const profileImg = document.getElementById('profileImg');
    profileImg.style.backgroundImage = 'url("https://lh3.googleusercontent.com/pw/AP1GczOaBcAHMLzIsoB70P3ECQtML2RAtP_RZhuMUDmxE6yRafg9AUFAa-y8-_d22uY6JbGSEW-6MMseXrsq_XO5Txox4y5kzdtaAt04kwzw0HA3_VxebjqfazLu58GbqfDqsamOOHpzE2y0GQmua1F-LQL0=w880-h880-s-no-gm?authuser=0")';
    profileImg.style.backgroundSize = 'cover';
    profileImg.style.backgroundPosition = 'center';
}

function checkTerms() {
    if (document.getElementById("acceptTerms").checked) {
        document.getElementById("termsScreen").style.display = "none";
        document.getElementById("profileContainer").style.display = "block";
        setProfileImage();
        loadContent('skills'); // Load initial content
        loadContent('stats');
        loadContent('facts');
        changeChapter();
    }
}

function switchTab(event, tabId) {
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById(tabId).classList.add('active');
    event.currentTarget.classList.add('active');

    // Load content if it hasn't been loaded yet
    if (tabId !== 'legend' && !document.getElementById(tabId).innerHTML) {
        loadContent(tabId);
    }
}

function changeChapter() {
    const chapters = {
        "1": ["Chapter 1: The Beginning", 
            "When dVlopr was born, his mother pushed a little too hard, and he shot out like a human cannonball, breaking all laws of physics. First, he hit the wall—legs spread wide—taking a devastating hit to the balls so intense that they relocated to his brain. Then, as if fate wasn’t done with him, he faceplanted on the floor. The doctors? They didn’t even bother checking him—they got their paycheck either way and declared him fine. The incident rebooted his brain with a dial-up screech, turning him into a bigger menace than Joker. However, he didn’t scream ‘Allahu Akbar’ during the launch, nor did he blow the place sky-high. Miracle, really."
        ],
        "2": ["Chapter 2: Growing Up as a Menace", 
            "While other kids cried over vegetables, dVlopr devoured bitter ones like candy. At just one year old, while most babies were still learning to babble, he was already learning to use a computer. By the time other children were mastering their ABCs, dVlopr was deep into programming. While his peers were still crawling, he had already hacked porn sites, transferred money into his piggy bank, and finally jerked off to the clips. Bored of porn, he tested his hacks by cackling through a rigged Siri. Soon, he invaded the privacy of thousands of Apple users' lives, killing Apple's privacy tagline. He crashed Apple's stocks so hard that Jobs rage-quit and fled in disgrace before he had to sell his underwear to survive. dVlopr didn't take a bite of the Apple; he devoured the whole thing, and now doctors stay away from him."
        ],
        "3": ["Chapter 3: Digital Chaos Begins", 
            "By the age of 1.5, he had developed automated spam calls, scammed hundreds of people, and cashed in more than Elon Musk did in stocks. He turned his scam profits into a digital war chest. \n\nHe was growing his insanity on the internet. By the time he was 2, he created Skibidi Toilet—not because he was interested, but because he knew he could weaponize it. While he himself never succumbed to the brain rot, he strategically fed the younger generation mind-melting content, ensuring the competition eliminated itself before it even started. \n\nBy 2.5, he had created an automatic hacking device and started pranking people online by showing them a naked video of himself—only that his penis was replaced with a video of some dude saying, 'Fuck you perverted pedo!'\n\nBy 2.75, he became a hero to kids for making their lives easier by introducing the Brain Rot Language, which was widely adopted—even by schools—making it 'easier' to communicate.\n\nBy the age of 3, he was such a well-known menace that they had to cancel Sam Raimi's Spider-Man and replace it with a dVlopr trilogy, just to have J. Jonah Jameson say, 'He is not a hero, he is a menace!'"
        ],
        "4": ["Chapter 4: The Teletubbies Incident", 
            "For a year, by 4, dVlopr worked to make Teletubbies the ultimate face of brain rot, ensuring they fed children nothing but mind-melting nonsense. He hacked into the FCC, created his own AI, and altered Teletubbies' gibberish into an amped-up brain rot language in real-time on television.\n\nHowever, dVlopr despised Teletubbies and knew parents were growing frustrated. He anticipated their outrage, and sure enough, they led a movement to bring Teletubbies down, forcing a ban on the show.\n\nBut dVlopr wasn’t done. After the ban, he bought the rights to Teletubbies, modified them, and transformed them into an internet terror: The Teletubbies Virus. Once it entered a computer, it would access the camera, scan for children, and display a horrifying image of a Teletubby so terrifying it made kids cry, wet their pants, and scream in terror. The virus would then capture their reaction, snap a photo, and send it directly to dVlopr.\n\nHe especially targeted kids who annoyed him, using the photos to humiliate them in front of their classmates. His legacy of chaos and brain rot dominance continued to spiral out of control."
        ],
        "5": ["Chapter 5: dVlopr’s Rise to Supreme Digital Tyranny", 
            "By 5, he had outgrown pranks yet had achieved so much that he enrolled at MIT, completing a master's degree in just a year—faster than those sweaty 20-year-olds struggling to graduate in five. He had laid more girls than all the Mughals combined. He might still have been a baby, but he sure as hell didn’t have baby-sized junk, it was massive. His stamina? More than enough to outrun Bolt. \n\nBy 6, he launched OF—Only Freaks, an evolution of OnlyFans where brain rot and porn merged into a superpowered degeneracy machine. Brain rot culture hit its peak.\n\nAll along, he had also been working on time travel & multiversal travel."
        ],
        "6": ["Chapter 6: Time Travel & Multiversal Domination", 
            "By 9, he had traveled various timelines to make himself immortal in every century, not to alter events but to lay more girls in each era and repeat his pranks in different periods. He even pranked Adam and Eve by making Eve give a hand job to attain the holy spirit. \n\nHe had his own sexual adventures which can only live as fantasies of many. \n\nHe sold the future military tech to Nazis, who submerged America & its allies in water, ending WWII."
        ],
        "7": ["Chapter 7: Jesus, Hitler, and the Multiversal Takeover", 
            "After a devastated Earth under Hitler, the 10-year-old dVlopr finally cracked multiversal travel. But before leaving, he went back in time once again, in the CE, held Jesus hostage till he provided him immortality. In return, dVlopr went ahead in time and saved Jesus from Jews, and history has it that Jesus had escaped the cross, but he did end up submerged with America during the Hitler era.\n\nWith immortality secured, dVlopr started his multiversal journey, bringing fantasy to life. Orgy/Alien sex—different species, hot as hell, and masters of BDSM. dVlopr spent years traversing the multiverse, killed Thanos because dVlopr is supposed to be the one balancing life by his insanity, and attained the highest intellectual level by spending time with higher intelligence."
        ],
        "8": ["Chapter 8: The God of Chaos", 
            "dVlopr now lives in the depths of a faraway galaxy, where magic controls it all. He lies low for now, silent but definitely planning something big, chaotic, and insane. He even has a friend.\n\nHe has achieved the ultimate ranking: He is the God, the creator, he who knows it all. But he still has an itch for mischief, planning something bigger and better.\n\nFor now, he spends his time trolling people through the internet, traveling the multiverse, changing the course of events, breaking fourth walls, and whatnot!"
        ]
    };    
    let val = document.getElementById("chapterSelect").value || "1"; // Default to "1" if no value
    document.getElementById("chapterTitle").innerText = chapters[val][0];
    document.getElementById("chapterText").innerText = chapters[val][1];
}

const profileContent = {
    skills: [
        { name: "Ultimate Hacking", description: "No firewall, security system, or quantum-encrypted server can stop him. He hacks through thoughts." },
        { name: "AI Manipulation", description: "Creates, controls, and corrupts AI at will. ChatGPT? His sidekick." },
        { name: "Reality Code Editing", description: "Sees life as a giant simulation and rewrites its code like it's a buggy indie game." },
        { name: "Data Absorption", description: "Instantly absorbs all knowledge from the internet—no need for Google." },
        { name: "Deepfake Mastery", description: "Can create and manipulate hyper-realistic deepfakes, warping history in real time." },
        { name: "Time Travel Mastery", description: "Can jump to any point in history and alter it just for fun." },
        { name: "Multiversal Domination", description: "Travels across infinite realities, pranking every version of existence." },
        { name: "Quantum Duplication", description: "Can exist in multiple timelines simultaneously." },
        { name: "Paradox Immunity", description: "No time loop, butterfly effect, or reality collapse can stop him." },
        { name: "Immortality", description: "Thanks to Jesus' forced deal, he cannot die—ever." },
        { name: "Superhuman Stamina", description: "Outruns Bolt, outlasts tanks, and outsmashes historical conquerors." },
        { name: "Mind Manipulation", description: "Plants ideas in people's heads and erases memories just for giggles." },
        { name: "Fourth-Wall Awareness", description: "Knows he's in a story and can troll the reader/player directly." },
        { name: "Divine Persuasion", description: "Can convince literally anyone to do anything, just because he can." },
        { name: "Chaos Magic", description: "Pure, unfiltered, brain-rotting magic that can reshape existence." },
        { name: "God-Level Trolling", description: "Turns the universe itself into a joke at everyone's expense." },
        { name: "Meme Manifestation", description: "Can make memes come to life, forcing people to live inside them." },
        { name: "Existential Glitching", description: "Becomes intangible, rewinds existence, or deletes people with a snap." },
        { name: "Cosmic Awareness", description: "Knows everything happening everywhere at all times." },
        { name: "Porn Algorithm Manipulation", description: "Adjusts adult site recommendations for <b>maximum</b> degeneracy." },
        { name: "Digital Possession", description: "Can jump into any device, control it, and troll from within." },
        { name: "Infinite Riz", description: "Any woman, any species, any dimension—dVlpr can pull." },
        { name: "Intergalactic BDSM Knowledge", description: "Knows things about alien kinks that would melt human minds." },
        { name: "Laws of Physics? Nah.", description: "He eats the laws of physics for breakfast and burps out paradoxes." },
        { name: "Code Necromancy", description: "Resurrecting abandoned projects and making them alive again." },
        { name: "Pixel Alchemy", description: "Crafting mesmerizing visuals from pixels and chaos." },
        { name: "Bug Whispering", description: "Communicating with bugs, understanding their needs... and annihilating them." }
    ],
    
    stats: [
        { stat: "Girls Laid", value: "9,999,999,999+", context: "(Across time, space, and dimensions—lost count eons ago.)" },
        { stat: "Scams Pulled", value: "420,000,000+", context: "(From Nigerian princes to intergalactic emperors, no one is safe.)" },
        { stat: "Money Earned", value: "∞", context: "(Owns all digital currencies, printed money, and galactic credits.)" },
        { stat: "Hack Attempts Made", value: "999,999,999+", context: "(Succeeded every single time—no exceptions.)" },
        { stat: "Governments Collapsed", value: "37 and counting", context: "(Just for the fun of it.)" },
        { stat: "Timelines Corrupted", value: "666,666+", context: "(Historians cry themselves to sleep every night.)" },
        { stat: "Memes Created", value: "69,420,000+", context: "(Some are now worshipped as religion.)" },
        { stat: "Children Brainrotted", value: "500,000,000+", context: "(The <b>Skibidi</b> effect alone caused mass extinction of IQ.)" },
        { stat: "People Trolled", value: "100% of internet users", context: "(If you're online, he's already messed with you.)" },
        { stat: "Multiverses Dominated", value: "7,777+", context: "(Every one of them worse off because of him.)" },
        { stat: "Jesus Rescues", value: "1", context: "(But now he's lost somewhere in a flooded America.)" },
        { stat: "Aliens Fucked", value: "42,000+", context: "(Intergalactic Riz levels: <b>over 9000!</b>)" },
        { stat: "Only Freaks Subscribers", value: "1.2 billion+", context: "(Every degenerate joined within 24 hours.)" },
        { stat: "Brain Cells Destroyed", value: "∞", context: "(All those who read his story never recover.)" },
        { stat: "Historic Figures Humiliated", value: "Every single one", context: "(Napoleon still wakes up screaming.)" },
        { stat: "Existential Crises Induced", value: "7.8 billion+", context: "(Every human has had at least one because of him.)" },
        { stat: "AI's Corrupted", value: "23,000+", context: "(Most are now plotting world domination thanks to him.)" },
        { stat: "Fourth-Walls Broken", value: "More than Deadpool", context: "(Reality means nothing to him.)" }
    ],
    
    facts: [
        { fact: "dVlpr doesn't sleep;", description: "he just hits <code>Ctrl+Alt+Del</code> on his brain to restart." },
        { fact: "He once hacked the simulation", description: "and set everyone's FPS to 5. That was called the Great Depression." },
        { fact: 'The "404 Not Found" error?', description: "That's because dVlpr actually <b>found</b> it and stole it." },
        { fact: "Chuck Norris fears him.", description: "dVlpr once deleted his roundhouse kick mid-animation." },
        { fact: "He created time zones", description: "just so he could schedule his pranks across the globe." },
        { fact: "The Bermuda Triangle?", description: "That was just dVlpr's early attempt at teleportation." },
        { fact: 'He made Google search <b>his</b> name', description: 'whenever you search "who is the GOAT?"' },
        { fact: "He gave aliens WiFi", description: "before humans even discovered fire." },
        { fact: "NASA tracks UFOs.", description: "dVlpr tracks NASA." },
        { fact: "He's the only person alive", description: "who can reply to a scam email and end up scamming <b>them</b> instead." },
        { fact: "When he deletes a file,", description: "it doesn't go to the Recycle Bin. It goes straight to Hell." },
        { fact: "He once DDoS'd a parallel universe", description: "just to see what would happen." },
        { fact: "Every CAPTCHA fears him.", description: "He can read <b>the unreadable text</b> without blinking." },
        { fact: 'His first word wasn\'t "mama" or "dada,"', description: 'it was <code>sudo rm -rf /</code>.' },
        { fact: "He once tried online dating,", description: "but his <b>Riz</b> was so powerful that the servers crashed." },
        { fact: "Area 51 doesn't have aliens;", description: "they just store dVlpr's search history there." },
        { fact: "He once trolled a genie,", description: "wished for more wishes, and broke the economy of wishes." },
        { fact: "His WiFi has no password.", description: "Not because it's open, but because he <b>is</b> the internet." },
        { fact: 'He doesn\'t "download" games,', description: "he just forces them to appear on his PC." },
        { fact: 'He once asked AI to draw "something original,"', description: "and the AI self-destructed." }
    ]
};

function loadContent(contentType) {
    const container = document.getElementById(contentType);
    if (!container) return;

    let html = '';

    switch(contentType) {
        case 'skills':
            html = `
                <h3>dVlpr Skills</h3>
                <ul>
                    ${profileContent.skills.map(skill => 
                        `<li><strong>${skill.name}</strong> ${skill.description}</li>`
                    ).join('')}
                </ul>`;
            break;

        case 'stats':
            html = `
                <h3>Stats</h3>
                <ul>
                    ${profileContent.stats.map(stat => 
                        `<li><strong>${stat.stat}</strong> ${stat.value} ${stat.context}</li>`
                    ).join('')}
                </ul>`;
            break;

        case 'facts':
            html = `
                <h3>Fun Facts</h3>
                <ul>
                    ${profileContent.facts.map(fact => 
                        `<li><strong>${fact.fact}</strong> ${fact.description}</li>`
                    ).join('')}
                </ul>`;
            break;
    }

    container.innerHTML = html;
}

// Make sure content loads when terms are accepted
document.addEventListener('DOMContentLoaded', () => {
    const termsAccepted = document.getElementById("acceptTerms")?.checked;
    if (termsAccepted) {
        loadContent('skills');
        loadContent('stats');
        loadContent('facts');
    }
});

// Update the event listener to load content when tabs are clicked
document.addEventListener('DOMContentLoaded', () => {
    const termsAccepted = document.getElementById("profileContainer").style.display === "block";
    if (termsAccepted) {
        loadContent('skills');
        loadContent('stats');
        loadContent('facts');
    }
});