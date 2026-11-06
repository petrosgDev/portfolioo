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

// ─── SYNC STICKY HEADER HEIGHT ───
const setNavHeight = () => {
    const header = document.querySelector("header");
    if (header) {
        document.documentElement.style.setProperty("--nav-height", `${header.offsetHeight}px`);
    }
};
window.addEventListener("load", setNavHeight);
window.addEventListener("resize", setNavHeight);
setNavHeight();

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
        
        // Professional staggered card explosion delay
        tile.style.transitionDelay = `${index * 0.035}s`;
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
                    // Balanced anticipation pause (200ms) so cards are seen before scattering
                    setTimeout(() => {
                        skillsSection.classList.add("is-active");
                    }, 200);
                }
            });
        },
        { threshold: 0.2 }
    );
    observer.observe(skillsSection);

    // Also support instant touch/click on mobile or touch screens
    const triggerNow = () => {
        skillsSection.classList.add("is-active");
    };
    skillsSection.addEventListener("click", triggerNow);
    skillsSection.addEventListener("touchstart", triggerNow, { passive: true });
}

// ─── SCROLL-TRIGGERED PROJECTS ANIMATION ───
const allProjectCards = document.querySelectorAll(".projects-grid .project-card");

if (allProjectCards.length) {
    const projectCardObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -40px 0px",
        }
    );

    allProjectCards.forEach((card) => {
        projectCardObserver.observe(card);
    });

    // Reveal instantly if navigated via anchor link or hash
    const revealAllProjects = () => {
        allProjectCards.forEach((card) => card.classList.add("is-visible"));
    };

    document.querySelectorAll('a[href="#projects"]').forEach((btn) => {
        btn.addEventListener("click", revealAllProjects);
    });

    if (window.location.hash === "#projects") {
        revealAllProjects();
    }
}

// ─── PROJECTS COMPACT STICKY HEADER ANIMATION (SHRINK 5X & SHIFT TOP-LEFT) ───
const projectsSection = document.querySelector("#projects");
const projectsHeader = document.querySelector(".projects-section .section-header");

const handleProjectsHeaderSticky = () => {
    if (!projectsSection || !projectsHeader) return;
    const rect = projectsSection.getBoundingClientRect();
    const navHeight = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--nav-height")) || 58;
    
    // Trigger compact state when user scrolls into project cards
    if (rect.top <= navHeight - 10) {
        projectsHeader.classList.add("is-compact");
    } else {
        projectsHeader.classList.remove("is-compact");
    }
};

window.addEventListener("scroll", handleProjectsHeaderSticky, { passive: true });
window.addEventListener("resize", handleProjectsHeaderSticky);
window.addEventListener("load", handleProjectsHeaderSticky);
handleProjectsHeaderSticky();

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

// ─── MOBILE DRAWER MENU CONTROLLER ───
const mobileMenuBtn = document.querySelector("#mobile-menu-btn");
const navMenuDrawer = document.querySelector("#nav-menu-drawer");

const openMobileMenu = () => {
    if (!navMenuDrawer) return;
    navMenuDrawer.classList.add("is-open");
    mobileMenuBtn?.classList.add("is-open");
    mobileMenuBtn?.setAttribute("aria-expanded", "true");
};

const closeMobileMenu = () => {
    if (!navMenuDrawer) return;
    navMenuDrawer.classList.remove("is-open");
    mobileMenuBtn?.classList.remove("is-open");
    mobileMenuBtn?.setAttribute("aria-expanded", "false");
};

const toggleMobileMenu = (e) => {
    e?.stopPropagation();
    if (navMenuDrawer?.classList.contains("is-open")) {
        closeMobileMenu();
    } else {
        openMobileMenu();
    }
};

mobileMenuBtn?.addEventListener("click", toggleMobileMenu);

// Close when clicking outside of the floating menu
document.addEventListener("click", (e) => {
    if (navMenuDrawer?.classList.contains("is-open")) {
        if (!navMenuDrawer.contains(e.target) && !mobileMenuBtn?.contains(e.target)) {
            closeMobileMenu();
        }
    }
});

navMenuDrawer?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMobileMenu);
});

window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && navMenuDrawer?.classList.contains("is-open")) {
        closeMobileMenu();
    }
});

