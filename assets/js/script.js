document.addEventListener("DOMContentLoaded", function () {
    const projects = [
        {
            title: "Howest CTF Project Week",
            description: [
                "During the Cybersecurity Project Week at Howest, I took part in a Capture The Flag (CTF) competition — an intense, hands-on challenge that tested both technical skills and teamwork under pressure. Hosted on the CTFd platform, the competition simulated real-world cybersecurity scenarios across a broad range of topics.",
                "The CTF featured challenges in cryptography, steganography, reverse engineering, forensics, web exploitation, trivia, programming, and more. Some tasks had us decoding encrypted messages or analyzing memory dumps, while others involved stress testing Docker containers and patching binaries. Each challenge required creativity, persistence, and a strategic mindset.",
                "Our team collaborated closely, dividing tasks based on individual strengths and constantly sharing insights. We pushed through difficult challenges, celebrated small victories, and refined our approach along the way. By the end of the week, we earned 4th place on the official scoreboard — a result we're proud of.",
                "More than the score, the experience deepened my interest in cybersecurity, sharpened my problem-solving skills, and reinforced the value of teamwork. It was an intense and rewarding week that reminded me why I love diving into systems, breaking things apart, and learning how they work.",
            ],
            images: [
                "./assets/media/ctfd-leaderboard.png",
                "./assets/media/ctfd-team.png",
                "./assets/media/ctfd-profile.png"
            ],
            socials: [
                {
                    platform: "CTFd",
                    link: "https://ctf.cyber3lab.be",
                    icon: "./assets/media/ico.ico",
                    tooltip: "Visit the CTF platform"
                }
            ]
        }
    ];

    const blogs = [
        {
            title: "Tech&Meet: Insights from Belgium's Top Ethical Hacker",
            description: [
                "On December 17, 2024, I had the opportunity to attend a Tech&Meet talk at Howest University, where Robbe Verwilghen—an accomplished ethical hacker and Howest alumnus—shared his story. Hailing from Lebbeke, Robbe was named 'Ethical Government Hacker of 2024' and earned an exclusive SANS training and GIAC certification worth over €10,000. He lightheartedly embraced the nickname 'The Dupe King' for logging the most duplicate reports during the challenge.",
                "The talk centered around Robbe’s participation in Belgium’s government cybersecurity initiative, 'Hack The Government,' which invites ethical hackers to assess and uncover vulnerabilities in public systems. Although much of the work is classified, he gave us a glimpse into his mindset and creative approach—summed up in his phrase: 'Act dumb and click on everything,' a reminder that unconventional thinking can lead to surprising results.",
                "He also reflected on his broader career in cybersecurity, from bug bounty hunting to roles as a QA engineer and pentester. His work at Intigriti, one of Europe’s top security platforms, allowed him to explore advanced techniques like SQL injection, payload crafting, and real-world penetration testing. Robbe generously shared resources and scripts, helping attendees better understand how ethical hackers probe systems and discover flaws.",
                "Even with restrictions on what he could publicly reveal, Robbe delivered an inspiring and practical talk. His enthusiasm was infectious, and it was clear why he's so highly regarded in the Belgian cybersecurity scene. The session emphasized the growing role of ethical hacking in national defense and digital safety.",
                "In the end, this Tech&Meet experience was not just informative—it was motivating. Robbe's journey showed how passion, curiosity, and a problem-solving mindset can lead to exciting opportunities in cybersecurity."
            ],
            images: [
                "./assets/media/HackTheHolidays_1.png",
                "./assets/media/HackTheHolidays_2.png",
                "./assets/media/HackTheHolidays_3.jpg"
            ]
        }
    ];

    function generateList(items, containerId, type) {
        const container = document.getElementById(containerId);
        if (!container) return;

        container.innerHTML = "";

        if (items.length === 0) {
            const emptyMessage = document.createElement("p");
            emptyMessage.classList.add("empty-message");
            emptyMessage.innerText = type === "project" ? "No projects available yet." : "No blog posts available yet.";
            container.appendChild(emptyMessage);
            return;
        }

        items.forEach(item => {
            const div = document.createElement("div");
            div.classList.add(type === "project" ? "project-item" : "blog-item");
            div.innerHTML = `<h3>${item.title}</h3><p>${item.description[0]}</p>`;
            div.addEventListener("click", () => openOverlay(item));
            container.appendChild(div);
        });
    }

    function openOverlay(item) {
        const overlay = document.getElementById("overlay");
        const overlayContent = document.querySelector(".overlay-content");

        document.getElementById("overlay-title").innerText = item.title;

        const textContainer = document.getElementById("overlay-text");
        textContainer.innerHTML = "";
        item.description.forEach(para => {
            const p = document.createElement("p");
            p.innerText = para;
            textContainer.appendChild(p);
        });

        const socialsContainer = document.getElementById("overlay-socials");
        socialsContainer.innerHTML = "";
        if (item.socials && item.socials.length > 0) {
            item.socials.forEach(social => {
                const a = document.createElement("a");
                a.href = social.link;
                a.target = "_blank";
                a.rel = "noopener noreferrer";
                a.classList.add("social-icon-container");

                const img = document.createElement("img");
                img.src = social.icon;
                img.alt = `${social.platform} icon`;
                img.classList.add("social-icon");

                a.appendChild(img);

                if (social.tooltip) {
                    const tooltip = document.createElement("span");
                    tooltip.classList.add("tooltip");
                    tooltip.innerText = social.tooltip;

                    a.appendChild(tooltip);
                }

                socialsContainer.appendChild(a);
            });
        }

        const galleryContainer = document.getElementById("overlay-gallery");
        galleryContainer.innerHTML = "";
        if (item.images && item.images.length > 0) {
            item.images.forEach(imgSrc => {
                const img = document.createElement("img");
                img.src = imgSrc;
                img.alt = `${item.title} image`;
                img.classList.add("gallery-img");
                img.addEventListener("click", () => openImageFullScreen(imgSrc, item.images));
                galleryContainer.appendChild(img);
            });
        }

        overlay.style.display = "flex";

        overlay.addEventListener("click", (event) => {
            if (!overlayContent.contains(event.target)) {
                closeOverlay();
            }
        });
    }

    function closeOverlay() {
        document.getElementById("overlay").style.display = "none";
    }

    function openImageFullScreen(src, allImages) {
        let currentIndex = allImages.indexOf(src);

        const overlayImage = document.createElement("div");
        overlayImage.classList.add("fullscreen-overlay");
        overlayImage.innerHTML = `
            <span class="close-img-btn" onclick="this.parentElement.remove()">&times;</span>
            <img src="${src}" class="fullscreen-img" id="fullscreen-active-img">
            <button class="nav-arrow left-arrow">&#10094;</button>
            <button class="nav-arrow right-arrow">&#10095;</button>
        `;

        document.body.appendChild(overlayImage);

        function updateImage(index) {
            const img = document.getElementById("fullscreen-active-img");
            img.src = allImages[index];
        }

        overlayImage.querySelector(".left-arrow").addEventListener("click", (e) => {
            e.stopPropagation();
            currentIndex = (currentIndex - 1 + allImages.length) % allImages.length;
            updateImage(currentIndex);
        });

        overlayImage.querySelector(".right-arrow").addEventListener("click", (e) => {
            e.stopPropagation();
            currentIndex = (currentIndex + 1) % allImages.length;
            updateImage(currentIndex);
        });

        overlayImage.addEventListener("click", (event) => {
            if (event.target === overlayImage) {
                overlayImage.remove();
            }
        });
    }

    document.querySelector(".close-btn").addEventListener("click", closeOverlay);

    generateList(projects, "project-list", "project");
    generateList(blogs, "blog-list", "blog");
});
