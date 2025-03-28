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
            title: "Tech&Meet: Hack The Holidays - Insights from Belgium's Top Ethical Hacker",
            description: [
                "On December 17, 2024, I attended a Tech&Meet session at Howest University of Applied Sciences, featuring Robbe Verwilghen, a distinguished alumnus and renowned ethical hacker. Robbe, who hails from Lebbeke, earned the prestigious title of 'Ethical Government Hacker of 2024,' securing a highly sought-after SANS training course and GIAC certification, valued at over €10,000. Alongside this achievement, he humorously embraced the title 'The Dupe King' for reporting the highest number of duplicate findings during the competition.",
                "Robbe shared his experiences participating in Belgium’s government hacking tournament, 'Hack The Government,' where ethical hackers were invited to test the security of government systems. Due to the classified nature of the findings, he couldn’t disclose specific vulnerabilities he uncovered, but he offered valuable insights into his approach. His key takeaway? 'Act dumb and click on everything'—a phrase that, in the world of ethical hacking, underscores the importance of thinking outside the box and exploring unexpected attack vectors.",
                "Beyond competition strategies, Robbe walked us through his journey in cybersecurity, from bug bounty hunting to becoming a QA engineer and penetration tester. His work with Intigriti, a leading European cybersecurity firm, provided fascinating insights into real-world security testing, payload crafting, and methodologies like SQL injection. He also shared useful resources and scripts for testing vulnerabilities, helping attendees gain a better understanding of how ethical hackers analyze and secure digital systems.",
                "Despite the limitations on discussing classified details, Robbe managed to deliver an engaging and insightful session. His energy and passion for cybersecurity were evident, making it clear why he’s one of Belgium’s top ethical hackers. The event reinforced the importance of ethical hacking in strengthening national security and highlighted the opportunities available in this field for those willing to dive deep into the world of cybersecurity.",
                "Overall, this Tech&Meet session was both inspiring and informative. Hearing firsthand from someone who has actively contributed to securing government infrastructure was an incredible experience. Robbe’s journey is proof that curiosity, persistence, and a hacker mindset can open doors to exciting and impactful careers in cybersecurity."
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
                };

                socialsContainer.appendChild(a);
            });
        };

        const galleryContainer = document.getElementById("overlay-gallery");
        galleryContainer.innerHTML = "";
        if (item.images && item.images.length > 0) {
            item.images.forEach(imgSrc => {
                const img = document.createElement("img");
                img.src = imgSrc;
                img.alt = `${item.title} image`;
                img.classList.add("gallery-img");
                img.addEventListener("click", () => openImageFullScreen(imgSrc));
                galleryContainer.appendChild(img);
            });
        };

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

    function openImageFullScreen(src) {
        const overlayImage = document.createElement("div");
        overlayImage.classList.add("fullscreen-overlay");
        overlayImage.innerHTML = `
            <img src="${src}" class="fullscreen-img">
            <span class="close-img-btn" onclick="this.parentElement.remove()">&times;</span>
        `;

        document.body.appendChild(overlayImage);

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
