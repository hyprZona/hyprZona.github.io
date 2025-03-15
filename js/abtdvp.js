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
        // Set default chapter when terms are accepted
        changeChapter();
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

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById("profileContainer").style.display === "block") {
        changeChapter();
    }
});