document.addEventListener("DOMContentLoaded", function () {
    const projects = [
        {
            title: "Howest CTF Project Week",
            description: [
                "During the Cybersecurity Project Week at Howest, I took part in a Capture The Flag (CTF) competition — an intense, hands-on challenge that tested both technical skills and teamwork under pressure...",
                "The CTF featured challenges in cryptography, steganography, reverse engineering, forensics, web exploitation, trivia, programming, and more...",
                "Our team collaborated closely, dividing tasks based on individual strengths...",
                "By the end of the week, we earned 4th place on the official scoreboard — a result we're proud of."
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
            ],
            badges: ["CTF Ninja 🥷", "Forensics Wizard 🔍", "Payload Crafter 💣", "Web Warrior 🌐", "Reverse Engineer 🧠"]
        }
    ];

    const blogs = [
        {
            title: "Tech&Meet: Insights from Belgium's Top Ethical Hacker",
            description: [
                "On December 17, 2024, I had the opportunity to attend a Tech&Meet talk at Howest University, where Robbe Verwilghen—an accomplished ethical hacker—shared his story...",
                "The talk centered around Robbe’s participation in Belgium’s government cybersecurity initiative, 'Hack The Government'...",
                "He also reflected on his broader career in cybersecurity...",
                "Even with restrictions on what he could publicly reveal, Robbe delivered an inspiring and practical talk...",
                "In the end, this Tech&Meet experience was not just informative—it was motivating."
            ],
            images: [
                "./assets/media/HackTheHolidays_1.png",
                "./assets/media/HackTheHolidays_2.png",
                "./assets/media/HackTheHolidays_3.jpg"
            ],
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

        const badgeContainer = document.getElementById("overlay-badges");
        badgeContainer.innerHTML = "";
        if (item.badges && item.badges.length > 0) {
            item.badges.forEach(badge => {
                const span = document.createElement("span");
                span.classList.add("badge");
                span.innerText = badge;
                badgeContainer.appendChild(span);
            });
        }

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
            <img src="${src}" class="fullscreen-img" id="fullscreen-active-img" alt="">
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
