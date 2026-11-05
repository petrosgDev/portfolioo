const contactForm = document.querySelector("#contact-form");

contactForm?.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const subject = String(formData.get("subject") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();
    const body = [
        `Name: ${name}`,
        `Email: ${email}`,
        "",
        message,
    ].join("\n");
    const query = new URLSearchParams({ subject, body });

    window.location.href = `mailto:petrosgeto7@gmail.com?${query.toString()}`;
});

const currentYear = document.querySelector("#current-year");
if (currentYear) {
    currentYear.textContent = String(new Date().getFullYear());
}

// ─── ACTIVE NAV SCROLLSPY & SMOOTH TRANSITION ───
const navLinks = document.querySelectorAll("nav ul a");
const sections = document.querySelectorAll("main section[id]");

const updateActiveNav = () => {
    let currentId = "";
    const scrollPos = window.scrollY + 120; // offset for sticky header

    sections.forEach((section) => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        if (scrollPos >= top && scrollPos < top + height) {
            currentId = section.getAttribute("id");
        }
    });

    // If near the bottom of the page, activate the last section (contact)
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 50) {
        currentId = sections[sections.length - 1]?.getAttribute("id") || currentId;
    }

    navLinks.forEach((link) => {
        if (link.getAttribute("href") === `#${currentId}`) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });
};

window.addEventListener("scroll", updateActiveNav, { passive: true });
window.addEventListener("load", updateActiveNav);

navLinks.forEach((link) => {
    link.addEventListener("click", () => {
        navLinks.forEach((l) => l.classList.remove("active"));
        link.classList.add("active");
    });
});

// ─── SKILLS SCATTER ON SCROLL & TOUCH WITH STACK CALCULATION ───
const skillsSection = document.querySelector("#skills");
const allSkillTiles = document.querySelectorAll(".skills-section .skill-tile");
const skillsWrapper = document.querySelector(".skills-categories-wrapper");

function computeInitialCardStack() {
    if (!skillsWrapper || !allSkillTiles.length) return;
    
    // Find the exact visual center of the entire skills section container
    const wrapperRect = skillsWrapper.getBoundingClientRect();
    const centerX = wrapperRect.left + wrapperRect.width / 2;
    const centerY = wrapperRect.top + wrapperRect.height / 2;
    
    allSkillTiles.forEach((tile, index) => {
        const tileRect = tile.getBoundingClientRect();
        // Calculate vector from tile's final resting place to center pile
        const targetTileCenterX = tileRect.left + tileRect.width / 2;
        const targetTileCenterY = tileRect.top + tileRect.height / 2;
        
        const deltaX = centerX - targetTileCenterX;
        const deltaY = centerY - targetTileCenterY;
        
        // Slight natural card-deck scatter at the center
        tile.style.setProperty("--stack-x", `${deltaX + (index % 4 - 1.5) * 4}px`);
        tile.style.setProperty("--stack-y", `${deltaY + (index % 3 - 1) * 3}px`);
        tile.style.setProperty("--stack-rot", `${(index % 7 - 3) * 4}deg`);
        
        // 2x faster staggered explosion delay
        tile.style.transitionDelay = `${index * 0.06}s`;
    });

    // Make the first card in the list the top card on the center deck
    if (allSkillTiles[0]) {
        allSkillTiles[0].classList.add("stack-top-card");
    }
}

// Compute pile positions once DOM loads and on resize
window.addEventListener("load", computeInitialCardStack);
window.addEventListener("resize", computeInitialCardStack);

if (skillsSection) {
    let hasExploded = false;
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && !hasExploded) {
                    hasExploded = true;
                    // Trigger 2x faster
                    setTimeout(() => {
                        skillsSection.classList.add("is-active");
                    }, 200);
                }
            });
        },
        { threshold: 0.25 }
    );
    observer.observe(skillsSection);

    // Also support instant touch/click on mobile or touch screens
    const triggerNow = () => {
        skillsSection.classList.add("is-active");
    };
    skillsSection.addEventListener("click", triggerNow);
    skillsSection.addEventListener("touchstart", triggerNow, { passive: true });
}

// ─── PROJECTS SCATTER ON SCROLL FROM TOP-RIGHT ───
const projectsSection = document.querySelector("#projects");
const allProjectCards = document.querySelectorAll(".projects-section .project-card");
const projectsGrid = document.querySelector(".projects-grid");

function computeInitialProjectStack() {
    if (!projectsGrid || !allProjectCards.length) return;
    
    // Exact visual center of the top-right position of the projects grid container
    const gridRect = projectsGrid.getBoundingClientRect();
    const firstCard = allProjectCards[0];
    const cardWidth = firstCard.offsetWidth;
    const cardHeight = firstCard.offsetHeight;
    
    const targetTopRightX = gridRect.right - (cardWidth / 2);
    const targetTopRightY = gridRect.top + (cardHeight / 2);
    
    allProjectCards.forEach((card, index) => {
        const cardRect = card.getBoundingClientRect();
        const cardCenterX = cardRect.left + cardRect.width / 2;
        const cardCenterY = cardRect.top + cardRect.height / 2;
        
        const deltaX = targetTopRightX - cardCenterX;
        const deltaY = targetTopRightY - cardCenterY;
        
        // Slight natural card-deck scatter at the top right
        card.style.setProperty("--project-stack-x", `${deltaX + (index % 4 - 1.5) * 6}px`);
        card.style.setProperty("--project-stack-y", `${deltaY + (index % 3 - 1) * 4}px`);
        card.style.setProperty("--project-stack-rot", `${((index * 5) % 14) - 7}deg`);
        
        // Same animation speed & staggered delay matching skills
        card.style.transitionDelay = `${index * 0.06}s`;
    });

    if (allProjectCards[0]) {
        allProjectCards[0].classList.add("project-top-card");
    }
}

window.addEventListener("load", computeInitialProjectStack);
window.addEventListener("resize", computeInitialProjectStack);

if (projectsSection) {
    let hasExplodedProjects = false;
    const projectObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && !hasExplodedProjects) {
                    hasExplodedProjects = true;
                    setTimeout(() => {
                        projectsSection.classList.add("is-active");
                    }, 200);
                }
            });
        },
        { threshold: 0.15 }
    );
    projectObserver.observe(projectsSection);

    const triggerProjectsNow = () => {
        projectsSection.classList.add("is-active");
    };
    projectsSection.addEventListener("click", triggerProjectsNow);
    projectsSection.addEventListener("touchstart", triggerProjectsNow, { passive: true });
}

// ─── CONTACT CHIPS INTERACTIVE ACTIVE/CLICK STATE & CASCADE OBSERVER ───
const contactSection = document.querySelector("#contact");
if (contactSection) {
    const contactObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    contactSection.classList.add("is-active");
                    contactObserver.unobserve(contactSection);
                }
            });
        },
        { threshold: 0.15 }
    );
    contactObserver.observe(contactSection);
}

const contactChips = document.querySelectorAll(".contact-chip");
contactChips.forEach((chip) => {
    const highlightChip = () => {
        contactChips.forEach((c) => c.classList.remove("active"));
        chip.classList.add("active");
    };
    chip.addEventListener("click", highlightChip);
    chip.addEventListener("touchstart", highlightChip, { passive: true });
});


