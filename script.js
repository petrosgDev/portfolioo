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

// ─── SKILLS SCATTER ON SCROLL & TOUCH WITH STACK CALCULATION ───
const skillsSection = document.querySelector("#skills");
const allSkillTiles = document.querySelectorAll(".skills-section .skill-tile");
const reactTile = document.querySelector('.skills-section .skill-tile');

function computeInitialCardStack() {
    if (!reactTile || !allSkillTiles.length) return;
    const reactRect = reactTile.getBoundingClientRect();
    
    allSkillTiles.forEach((tile, index) => {
        const tileRect = tile.getBoundingClientRect();
        // Delta from target spot to the React tile stack position
        const deltaX = reactRect.left - tileRect.left;
        const deltaY = reactRect.top - tileRect.top;
        
        // Slight stacked offset & random rotation so they look stacked like playing cards
        tile.style.setProperty("--stack-x", `${deltaX + (index % 3) * 2}px`);
        tile.style.setProperty("--stack-y", `${deltaY + (index % 3) * 2}px`);
        tile.style.setProperty("--stack-rot", `${(index % 5 - 2) * 2.5}deg`);
        // Staggered explosion delay for each card
        tile.style.transitionDelay = `${index * 0.045}s`;
    });
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
                    // Wait 0.5s as requested, then create categories & distribute cards!
                    setTimeout(() => {
                        skillsSection.classList.add("is-active");
                    }, 500);
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



