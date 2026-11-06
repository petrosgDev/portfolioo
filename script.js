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
        
        // 32x faster staggered explosion delay
        tile.style.transitionDelay = `${index * 0.00375}s`;
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
                    // 32x faster trigger (16ms = 1 frame instead of 500ms)
                    setTimeout(() => {
                        skillsSection.classList.add("is-active");
                    }, 16);
                }
            });
        },
        { threshold: 0.15 }
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

// ─── PROJECT DETAIL MODAL CONTROLLER & DATA ───
const PROJECTS_DATA = {
    "ncs": {
        id: "ncs",
        category: "06 / CAMPUS MANAGEMENT",
        title: "Nexus Campus Services (NCS)",
        image: "https://i.postimg.cc/TwR490R3/photo-2026-06-30-17-07-10.jpg",
        meta: ["Java / Desktop", "Campus Ecosystem", "Desktop App"],
        overview: "Nexus Campus Services is a centralized digital platform designed to simplify university services by connecting students, administrators, and campus service providers through a unified technology ecosystem.",
        problem: "Traditional university service management often relies on fragmented communication, manual processes, and disconnected systems. NCS addresses these challenges by providing a structured digital environment for managing campus activities, accessing services, and improving operational efficiency.",
        features: [
            { title: "Centralized Dashboard", desc: "Unified access to campus services and essential information." },
            { title: "Student Management", desc: "Organized student profiles and academic-related information." },
            { title: "Campus Services", desc: "Digital access to university resources and service operations." },
            { title: "Administrative Management", desc: "Structured tools for managing users and system activities." },
            { title: "Data Management", desc: "Consistent handling of information across system modules." },
            { title: "Modern User Interface", desc: "Intuitive interface designed for usability and accessibility." }
        ],
        architecture: "The application follows a modular software architecture with separated responsibilities for user interfaces, application logic, and data management. This approach improves maintainability, scalability, and code organization.",
        techStack: [
            { name: "Java", color: "pill-yellow" },
            { name: "JavaFX", color: "pill-cyan" },
            { name: "Object-Oriented Programming", color: "pill-lime" },
            { name: "JDBC", color: "pill-orange" },
            { name: "MySQL", color: "pill-purple" }
        ],
        focus: [
            "Modular application design",
            "Database integration",
            "Separation of concerns",
            "Maintainable code structure",
            "Desktop application development"
        ],
        links: [
            { label: "GitHub Repository ↗", url: "https://github.com/petrosgDev", primary: true },
            { label: "Project Documentation ↗", url: "#", primary: false }
        ]
    },
    "aman-pay": {
        id: "aman-pay",
        category: "01 / FINTECH & ESCROW",
        title: "Aman Pay",
        image: "https://i.postimg.cc/BnDrqNMf/Screenshot-From-2026-11-05-21-45-07.png",
        meta: ["Next.js / React", "Escrow Platform", "Fintech"],
        overview: "Aman Pay is a secure digital payment platform designed to simplify transactions through a trusted escrow-based payment system. It helps protect both buyers and sellers by ensuring payments are securely held until agreed conditions are fulfilled, promoting transparency, trust, and confidence in every transaction.",
        problem: "Online peer-to-peer commerce and service agreements frequently suffer from non-delivery, payment defaults, and asymmetric risk. Aman Pay introduces a cryptographic and milestone-verified escrow layer that eliminates counterparty risk.",
        features: [
            { title: "Escrow Vaulting", desc: "Funds are securely locked in institutional escrow until both buyer and seller verify milestone delivery." },
            { title: "Milestone-Driven Payouts", desc: "Structured release phases for multi-step service contracts and e-commerce deliveries." },
            { title: "Dispute Arbitration Workflow", desc: "Transparent mediation tooling with immutable audit logs and evidence submission." },
            { title: "Instant Webhook Notifications", desc: "Real-time payment lifecycle updates via automated SMS and webhook endpoints." },
            { title: "KYC & Compliance Verification", desc: "Automated onboarding verification ensuring authenticated transaction parties." },
            { title: "Neo-Brutalist Checkout UX", desc: "High-contrast accessible payment flows optimized for friction-free conversions." }
        ],
        architecture: "Engineered with an event-driven architecture using resilient transactional state machines, strict ACID compliance, and secure API gateways preventing race conditions during fund disbursement.",
        techStack: [
            { name: "Next.js", color: "pill-yellow" },
            { name: "React", color: "pill-cyan" },
            { name: "Node.js", color: "pill-lime" },
            { name: "Express", color: "pill-orange" },
            { name: "PostgreSQL", color: "pill-purple" }
        ],
        focus: [
            "Transactional state machine consistency",
            "Zero-trust escrow security",
            "Webhook event verification",
            "Dispute lifecycle modeling",
            "High availability"
        ],
        links: [
            { label: "Live Platform ↗", url: "https://aman-pay-lake.vercel.app/", primary: true },
            { label: "GitHub Repository ↗", url: "https://github.com/petrosgDev", primary: false }
        ]
    },
    "event-hub": {
        id: "event-hub",
        category: "02 / WEB APPLICATION",
        title: "Event Hub",
        image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80",
        meta: ["Fullstack Web", "Event Discovery", "QR Ticketing"],
        overview: "A comprehensive web platform for discovering tech conferences, campus events, and workshops, managing digital ticket registrations, and processing live attendee check-ins in real-time.",
        problem: "Event organizers face high drop-off rates, ticket counterfeiting, and disorganized entry gates when relying on spreadsheets or paper tickets.",
        features: [
            { title: "Event Discovery Engine", desc: "Filter and search events by topic, date, campus location, and ticket tier." },
            { title: "Cryptographic QR Passes", desc: "Auto-generated digital entry badges delivered via email upon RSVP confirmation." },
            { title: "Organizer Live Scanner", desc: "High-speed camera scanner validating tickets at the door with sub-second latency." },
            { title: "Capacity Throttling", desc: "Dynamic waitlisting and automated seat replenishment when tickets are cancelled." },
            { title: "Attendee Analytics", desc: "Real-time registration breakdowns and peak entry hour charts for organizers." },
            { title: "Responsive Web Layout", desc: "Optimized mobile experience for quick on-the-go registration." }
        ],
        architecture: "Built with a full-stack MVC design pattern separating user registration workflows, authentication middleware, and relational database management.",
        techStack: [
            { name: "Next.js", color: "pill-yellow" },
            { name: "Node.js", color: "pill-lime" },
            { name: "PostgreSQL", color: "pill-cyan" },
            { name: "Tailwind CSS", color: "pill-orange" }
        ],
        focus: [
            "QR pass verification speed",
            "Relational registration modeling",
            "Concurrent ticket reservation locking",
            "Email dispatch queues"
        ],
        links: [
            { label: "GitHub Repository ↗", url: "https://github.com/petrosgDev/event-hub", primary: true }
        ]
    },
    "ethio-massage": {
        id: "ethio-massage",
        category: "03 / WELLNESS PLATFORM",
        title: "Ethio Massage",
        image: "https://i.postimg.cc/HxJQdCxL/Screenshot-From-2026-11-05-17-58-09.png",
        meta: ["Frontend Web", "Wellness Booking", "WhatsApp API"],
        overview: "A modern wellness service website designed to connect clients with certified massage therapy in Addis Ababa, featuring transparent service pricing, therapist profiles, and friction-free direct WhatsApp appointment booking.",
        problem: "Clients in urban Addis Ababa previously struggled with opaque wellness pricing, inconsistent contact methods, and lack of verified treatment options.",
        features: [
            { title: "Interactive Service Menu", desc: "Clear treatment descriptions, target health benefits, and duration options." },
            { title: "Transparent Pricing Matrix", desc: "Upfront pricing with no hidden charges, displaying single and couple packages." },
            { title: "One-Click WhatsApp Booking", desc: "Pre-filled structured booking inquiries sent straight to scheduling staff." },
            { title: "Client Testimonials & Trust", desc: "Social proof cards with real client ratings and therapy outcomes." },
            { title: "Local SEO Optimization", desc: "Structured location schema ensuring top discoverability for wellness queries in Addis Ababa." },
            { title: "Mobile-First Design", desc: "Ultra-fast lightweight design consuming minimal cellular data on mobile connections." }
        ],
        architecture: "Serverless Jamstack architecture deployed on Vercel with static HTML generation, pre-compressed assets, and zero-dependency client interactions.",
        techStack: [
            { name: "Next.js", color: "pill-yellow" },
            { name: "React", color: "pill-cyan" },
            { name: "WhatsApp Business API", color: "pill-lime" },
            { name: "Tailwind CSS", color: "pill-orange" },
            { name: "Vercel", color: "pill-purple" }
        ],
        focus: [
            "Sub-second initial page load",
            "Local business SEO schema",
            "Conversion funnel optimization",
            "Lightweight mobile footprint"
        ],
        links: [
            { label: "Live Site ↗", url: "https://ethio-massage.vercel.app", primary: true },
            { label: "GitHub Repository ↗", url: "https://github.com/petrosgDev/ethio-massage", primary: false }
        ]
    },
    "wende-dubai": {
        id: "wende-dubai",
        category: "04 / INTERIOR DESIGN",
        title: "Wende Dubai Interior Design",
        image: "https://i.postimg.cc/YqCSTzyb/Screenshot-From-2026-11-05-19-06-18.png",
        meta: ["Luxury Portfolio", "Architecture Showcase", "Responsive UI"],
        overview: "An elegant, high-performance interior design portfolio and client consultation showcase for a Dubai-based luxury architecture and interior concept studio.",
        problem: "High-end interior architecture requires rich, high-resolution imagery that typically causes severe page bloat and slow load times on mobile devices.",
        features: [
            { title: "Curated Project Showcases", desc: "Editorial-style photo galleries highlighting luxury residential and commercial fit-outs." },
            { title: "Smooth Touch Sliders", desc: "Hardware-accelerated carousel walkthroughs of concept sketches and finished spaces." },
            { title: "Tailored Client Intake Form", desc: "Structured questionnaire capturing room dimensions, style preferences, and budgets." },
            { title: "Material & Lighting Narrative", desc: "Detailed breakdowns of bespoke marble, woodwork, and architectural lighting fixtures." },
            { title: "Responsive Fluid Grid", desc: "Flawless scaling across widescreen 4K displays down to compact smartphone screens." }
        ],
        architecture: "Built with performant semantic HTML5, modern CSS Grid/Flexbox layouts, asynchronous image decoding, and CDN asset caching for worldwide instant delivery.",
        techStack: [
            { name: "HTML5", color: "pill-yellow" },
            { name: "CSS3 Grid/Flexbox", color: "pill-cyan" },
            { name: "JavaScript", color: "pill-lime" },
            { name: "Swiper.js", color: "pill-orange" }
        ],
        focus: [
            "Zero cumulative layout shift (CLS)",
            "Progressive image loading",
            "Editorial typography hierarchy",
            "High-conversion intake form"
        ],
        links: [
            { label: "Live Demo ↗", url: "https://wende-dubai-interiordesign.vercel.app/", primary: true }
        ]
    },
    "raman-caffe": {
        id: "raman-caffe",
        category: "05 / CAFÉ & RESTAURANT",
        title: "Raman Caffe",
        image: "https://i.postimg.cc/bvbhMmcH/Screenshot-From-2026-11-05-20-10-44.png",
        meta: ["Café & Dining", "Menu Showcase", "UI/UX Design"],
        overview: "A warm and inviting specialty café website showcasing artisanal roast profiles, handcrafted beverages, and an interactive dining atmosphere.",
        problem: "Boutique coffee shops often fail to communicate the story and craftsmanship behind single-origin beans, missing out on driving foot traffic from modern coffee lovers.",
        features: [
            { title: "Artisan Coffee Menu", desc: "Filterable drink selection displaying roast level, flavor notes, and brewing methods." },
            { title: "Atmosphere & Culture Gallery", desc: "Rich photographic immersion capturing the barista bar, seating areas, and ambiance." },
            { title: "Interactive Hours & Map", desc: "Real-time open/closed status indicator with one-tap directions integration." },
            { title: "Events & Tasting Sessions", desc: "Community workshop schedule for coffee tasting and barista masterclasses." }
        ],
        architecture: "Lightweight single-page architecture built with vanilla web technologies, CSS animations, and accessible keyboard navigation.",
        techStack: [
            { name: "HTML5", color: "pill-yellow" },
            { name: "CSS3", color: "pill-lime" },
            { name: "JavaScript", color: "pill-cyan" },
            { name: "Responsive UI", color: "pill-orange" }
        ],
        focus: [
            "Micro-interactions & transitions",
            "Accessible menu markup",
            "Fast first paint on cellular networks"
        ],
        links: [
            { label: "GitHub Repository ↗", url: "https://github.com/petrosgDev", primary: true }
        ]
    },
    "myapp": {
        id: "myapp",
        category: "07 / MOBILE APPLICATION",
        title: "MyApp — Personal Productivity",
        image: "https://i.postimg.cc/GhjMzNMW/Screenshot-From-2026-11-05-21-51-29.png",
        meta: ["React Native / Expo", "Personal Productivity", "Offline-First"],
        overview: "An all-in-one personal productivity application built with React Native and Expo, combining task management, note-taking, finance tracking, fitness, habits, and daily routines into a unified mobile experience. Featuring a modern glassmorphism interface, interactive components, and offline-first state management, it helps users organize their work, manage personal finances, track progress, and build consistent habits from a single application.",
        problem: "Switching between 4 to 5 separate apps every day for to-dos, fitness, habit streaks, notes, and personal expenses fragments personal data and breaks daily focus.",
        features: [
            { title: "Unified Daily Agenda", desc: "Consolidated morning dashboard prioritizing top tasks, workout plans, and daily budget limits." },
            { title: "Offline-First Local Storage", desc: "Instant zero-lag interactions on device with resilient background cloud sync." },
            { title: "Finance & Expense Tracker", desc: "Categorized expense logging with visual monthly spending charts and budget alerts." },
            { title: "Habit Streak Engine", desc: "Gamified streak counters with custom reminders to encourage daily consistency." },
            { title: "Interactive Glassmorphism UI", desc: "Tactile gesture-driven mobile interface featuring smooth transitions and haptic feedback." },
            { title: "Encrypted Note Vault", desc: "Markdown-enabled notes with biometric device authentication for confidential records." }
        ],
        architecture: "Built using React Native with Expo tooling, local SQLite caching, normalized Redux Toolkit state, and decoupled feature modules for high performance.",
        techStack: [
            { name: "React Native", color: "pill-yellow" },
            { name: "Expo", color: "pill-cyan" },
            { name: "TypeScript", color: "pill-lime" },
            { name: "SQLite", color: "pill-orange" },
            { name: "Redux Toolkit", color: "pill-purple" }
        ],
        focus: [
            "60fps fluid touch animations",
            "Offline-first data synchronization",
            "State normalization",
            "Cross-platform mobile performance"
        ],
        links: [
            { label: "GitHub Repository ↗", url: "https://github.com/petrosgDev", primary: true }
        ]
    },
    "banking-system": {
        id: "banking-system",
        category: "08 / DESKTOP APPLICATION",
        title: "Banking System",
        image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80",
        meta: ["C++ / Qt", "Desktop Application", "Banking & Finance"],
        overview: "A high-security desktop banking management system for handling customer bank accounts, atomic financial transactions, interest calculations, and audit logs with role-based access control.",
        problem: "Legacy financial administration tools often suffer from buffer vulnerabilities, non-atomic crash states, and insecure privilege escalation risks.",
        features: [
            { title: "Atomic Account Transactions", desc: "Guaranteed ACID-compliant fund transfers, deposits, and multi-currency withdrawals." },
            { title: "Multi-Tier Role Access", desc: "Granular permission separation distinguishing tellers, loan officers, branch managers, and auditors." },
            { title: "Tamper-Resistant Audit Log", desc: "Chronological transaction logging with user-stamped activity verification." },
            { title: "Statement & Report Generator", desc: "Automated monthly account statement compilation with PDF/CSV export support." },
            { title: "Interest & Loan Calculators", desc: "Configurable compound interest engines for savings accounts and loan amortization." }
        ],
        architecture: "Desktop application written in modern C++ utilizing Qt for the graphical user interface, coupled to a relational MySQL backend through secure database drivers.",
        techStack: [
            { name: "C++", color: "pill-yellow" },
            { name: "Qt", color: "pill-cyan" },
            { name: "MySQL", color: "pill-lime" },
            { name: "Object-Oriented Programming", color: "pill-purple" }
        ],
        focus: [
            "ACID transaction reliability",
            "Memory safety & leak prevention",
            "Thread-safe database pooling",
            "Role-based security enforcement"
        ],
        links: [
            { label: "GitHub Repository ↗", url: "https://github.com/petrosgDev/banking_system", primary: true }
        ]
    }
};

const PROJECT_KEYS = ["aman-pay", "event-hub", "ethio-massage", "wende-dubai", "raman-caffe", "ncs", "myapp", "banking-system"];
let currentActiveProjectId = "ncs";

const projectModal = document.querySelector("#project-detail-modal");
const modalCategoryBadge = document.querySelector("#modal-category-badge");
const modalTopTitle = document.querySelector("#modal-top-title");
const modalContentArea = document.querySelector("#modal-content-area");
const modalCloseBtn = document.querySelector("#modal-close-btn");
const modalPrevBtn = document.querySelector("#modal-prev-btn");
const modalNextBtn = document.querySelector("#modal-next-btn");
const modalNavIndicator = document.querySelector("#modal-nav-indicator");

function renderProjectModal(project) {
    if (!project) return;
    currentActiveProjectId = project.id;
    const currentIndex = PROJECT_KEYS.indexOf(project.id);
    const totalProjects = PROJECT_KEYS.length;

    if (modalCategoryBadge) modalCategoryBadge.textContent = project.category;
    if (modalTopTitle) modalTopTitle.textContent = project.title;
    if (modalNavIndicator) modalNavIndicator.textContent = `Project ${currentIndex + 1} of ${totalProjects}`;

    if (modalPrevBtn) {
        const prevKey = PROJECT_KEYS[(currentIndex - 1 + totalProjects) % totalProjects];
        const prevProject = PROJECTS_DATA[prevKey];
        modalPrevBtn.textContent = `← Prev: ${prevProject ? prevProject.title.split(" ")[0] : "Project"}`;
    }

    if (modalNextBtn) {
        const nextKey = PROJECT_KEYS[(currentIndex + 1) % totalProjects];
        const nextProject = PROJECTS_DATA[nextKey];
        modalNextBtn.textContent = `Next: ${nextProject ? nextProject.title.split(" ")[0] : "Project"} →`;
    }

    if (modalContentArea) {
        const featuresHtml = project.features.map(f => `
            <div class="feature-item">
                <span class="feature-bullet">◆</span>
                <div>
                    <strong>${f.title}</strong>
                    <p>${f.desc}</p>
                </div>
            </div>
        `).join("");

        const stackHtml = project.techStack.map(s => `
            <span class="detail-pill ${s.color}">${s.name}</span>
        `).join("");

        const focusHtml = project.focus.map(f => `
            <span class="focus-chip">${f}</span>
        `).join("");

        const linksHtml = project.links.map(l => `
            <a href="${l.url}" target="_blank" rel="noopener noreferrer" class="detail-action-btn ${l.primary ? 'btn-primary' : 'btn-secondary'}">
                ${l.label}
            </a>
        `).join("");

        const metaPillsHtml = project.meta.map(m => `
            <span class="meta-pill">${m}</span>
        `).join("");

        modalContentArea.innerHTML = `
            <div class="detail-hero-banner">
                <img src="${project.image}" alt="${project.title} Preview" class="detail-hero-img" loading="eager">
            </div>

            <div class="detail-heading-block">
                <span class="detail-tag-badge">CASE STUDY // ${project.category.split('/')[0].trim()}</span>
                <h2 class="detail-project-title">${project.title}</h2>
                <div class="detail-quick-meta">
                    ${metaPillsHtml}
                </div>
            </div>

            <div class="detail-grid-sections">
                <!-- Project Overview -->
                <section class="detail-card-block overview-block">
                    <h3 class="detail-section-title">
                        <span>📌</span> Project Overview
                    </h3>
                    <p class="detail-text">${project.overview}</p>
                </section>

                <!-- Problem Statement -->
                <section class="detail-card-block problem-block">
                    <h3 class="detail-section-title">
                        <span>⚠️</span> Problem Statement
                    </h3>
                    <p class="detail-text">${project.problem}</p>
                </section>

                <!-- Key Features -->
                <section class="detail-card-block features-block">
                    <h3 class="detail-section-title">
                        <span>⚡</span> Key Features
                    </h3>
                    <div class="features-list-grid">
                        ${featuresHtml}
                    </div>
                </section>

                <!-- Technical Architecture -->
                <section class="detail-card-block architecture-block">
                    <h3 class="detail-section-title">
                        <span>🏗️</span> Technical Architecture
                    </h3>
                    <p class="detail-text">${project.architecture}</p>
                </section>

                <!-- Technology Stack -->
                <section class="detail-card-block stack-block">
                    <h3 class="detail-section-title">
                        <span>🛠️</span> Technology Stack
                    </h3>
                    <div class="detail-badge-group">
                        ${stackHtml}
                    </div>
                </section>

                <!-- Engineering Focus -->
                <section class="detail-card-block focus-block">
                    <h3 class="detail-section-title">
                        <span>🎯</span> Engineering Focus
                    </h3>
                    <div class="detail-focus-tags">
                        ${focusHtml}
                    </div>
                </section>

                <!-- Project Links -->
                <section class="detail-card-block links-block">
                    <h3 class="detail-section-title">
                        <span>🔗</span> Project Links
                    </h3>
                    <div class="detail-links-group">
                        ${linksHtml}
                    </div>
                </section>
            </div>
        `;

        modalContentArea.scrollTop = 0;
    }
}

function openProjectModal(projectId) {
    const project = PROJECTS_DATA[projectId] || PROJECTS_DATA["ncs"];
    renderProjectModal(project);
    if (projectModal) {
        projectModal.classList.add("is-open");
        projectModal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
    }
}

function closeProjectModal() {
    if (projectModal) {
        projectModal.classList.remove("is-open");
        projectModal.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
    }
}

// Attach click handlers to project cards and detail buttons
document.querySelectorAll(".project-card").forEach((card) => {
    const projectId = card.getAttribute("data-project-id");
    if (!projectId) return;

    // "Details" button click
    const detailBtn = card.querySelector(".project-detail-btn");
    if (detailBtn) {
        detailBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            openProjectModal(projectId);
        });
    }

    // Clicking image or title also opens detail
    const imgWrapper = card.querySelector(".project-img-wrapper");
    if (imgWrapper) {
        imgWrapper.addEventListener("click", () => openProjectModal(projectId));
    }
    const titleEl = card.querySelector("h3");
    if (titleEl) {
        titleEl.addEventListener("click", () => openProjectModal(projectId));
    }
});

// Modal close button
if (modalCloseBtn) {
    modalCloseBtn.addEventListener("click", closeProjectModal);
}

// Modal backdrop click (click outside dialog to close)
if (projectModal) {
    projectModal.addEventListener("click", (e) => {
        if (e.target === projectModal) {
            closeProjectModal();
        }
    });
}

// Modal Next & Prev buttons
if (modalPrevBtn) {
    modalPrevBtn.addEventListener("click", () => {
        const currentIndex = PROJECT_KEYS.indexOf(currentActiveProjectId);
        const prevKey = PROJECT_KEYS[(currentIndex - 1 + PROJECT_KEYS.length) % PROJECT_KEYS.length];
        renderProjectModal(PROJECTS_DATA[prevKey]);
    });
}

if (modalNextBtn) {
    modalNextBtn.addEventListener("click", () => {
        const currentIndex = PROJECT_KEYS.indexOf(currentActiveProjectId);
        const nextKey = PROJECT_KEYS[(currentIndex + 1) % PROJECT_KEYS.length];
        renderProjectModal(PROJECTS_DATA[nextKey]);
    });
}

// Keyboard controls: ESC to close, Left/Right arrow keys to navigate
window.addEventListener("keydown", (e) => {
    if (!projectModal || !projectModal.classList.contains("is-open")) return;
    if (e.key === "Escape") {
        closeProjectModal();
    } else if (e.key === "ArrowLeft") {
        const currentIndex = PROJECT_KEYS.indexOf(currentActiveProjectId);
        const prevKey = PROJECT_KEYS[(currentIndex - 1 + PROJECT_KEYS.length) % PROJECT_KEYS.length];
        renderProjectModal(PROJECTS_DATA[prevKey]);
    } else if (e.key === "ArrowRight") {
        const currentIndex = PROJECT_KEYS.indexOf(currentActiveProjectId);
        const nextKey = PROJECT_KEYS[(currentIndex + 1) % PROJECT_KEYS.length];
        renderProjectModal(PROJECTS_DATA[nextKey]);
    }
});

// Auto-open modal if hash points to project detail (e.g. #detail-ncs)
if (window.location.hash.startsWith("#detail-")) {
    const hashId = window.location.hash.replace("#detail-", "");
    if (PROJECTS_DATA[hashId]) {
        openProjectModal(hashId);
    }
}


