import { Project } from '../types/project';

export const PROJECTS_DATA: Project[] = [
  {
    id: "aman-pay",
    name: "Aman Pay",
    categoryBadge: "FINTECH & ESCROW",
    categoryBadgeBg: "var(--cyan)",
    version: "v2.4.0-prod",
    subtitle: "Zero-Trust Peer-to-Peer Escrow & Milestone Payment Engine with Double-Entry ACID Ledger.",
    roleTimeline: "Lead Full-Stack & Fintech Architect • 2025–2026",
    status: "Live in Production",
    liveUrl: "https://aman-pay-lake.vercel.app/",
    githubUrl: "https://github.com/petrosgDev/aman-pay",
    heroTags: ["Fintech", "Double-Entry Ledger", "Telebirr API", "Chapa API", "Escrow Engine"],

    // 2. Project Overview
    overview: "Aman Pay is an institutional-grade peer-to-peer escrow settlement engine built to eliminate online transaction fraud, non-delivery scams, and payment chargebacks. By securing buyer funds in an isolated double-entry vault and releasing them only upon mutual cryptographic milestone verification or automated dispute arbitration, Aman Pay provides risk-free commerce for buyers, sellers, and freelance service providers across emerging digital economies.",
    overviewSummary: "Eliminating payment fraud and non-delivery risks in peer-to-peer commerce through programmatic escrow vaults.",

    // 3. Problem Statement
    problemTitle: "Mutual Distrust & Rampant Fraud in Direct P2P Transfers",
    problemBody: "In emerging e-commerce markets, buyers and sellers operate in low-trust environments. Traditional payment methods force one party to bear 100% of the financial risk: buyers risk non-delivery or receiving counterfeit goods when paying upfront, while merchants and freelancers risk forged payment receipts, fake SMS confirmations, or chargeback reversals when delivering before funds clear.",
    problemPoints: [
      "Direct bank transfers provide zero recourse or escrow protection against fraudulent or unresponsive sellers.",
      "Merchants face widespread screenshot spoofing and fraudulent reversal claims from bad-faith buyers.",
      "Traditional manual escrow services are slow, charge exorbitant fees, and take days to mediate simple consumer transactions."
    ],

    // 4. Solution
    solutionTitle: "Cryptographic Milestone Escrow with Automated ACID Settlement",
    solutionBody: "Engineered an automated escrow state machine integrated directly with local banking rails (Telebirr, Chapa, Stripe). Funds are programmatically locked in an immutable double-entry ledger vault upon checkout. Payout to the seller's wallet is triggered instantaneously when the buyer scans an HMAC-signed delivery QR/OTP token upon physical inspection.",
    solutionPoints: [
      "Append-only double-entry ledger guarantees mathematical balance across all fund deposits, escrows, and payouts.",
      "Pessimistic row-level locking (SELECT FOR UPDATE NOWAIT) prevents concurrent double-payout race conditions under high webhook retries.",
      "Cryptographic HMAC-SHA256 delivery tokens verify physical handoff before any funds move out of escrow."
    ],

    // 5. Key Features
    keyFeatures: [
      {
        title: "Programmatic Milestone Escrow",
        description: "Conditional multi-stage funds lock where money is held securely until mutually agreed milestones are satisfied.",
        tag: "Core Engine"
      },
      {
        title: "Dual-Key Cryptographic Handshake",
        description: "Buyers generate an HMAC-signed QR code or 6-digit OTP token upon shipment; scanning at delivery instantly unlocks settlement.",
        tag: "Security"
      },
      {
        title: "Multi-Rail Gateway Integration",
        description: "Native webhooks for Telebirr, Chapa, and Stripe with automated signature verification and idempotency deduplication.",
        tag: "Payments"
      },
      {
        title: "Immutable Double-Entry Ledger",
        description: "Every movement of funds creates balanced debit and credit journal rows, ensuring zero ledger drift or balance discrepancies.",
        tag: "Data Integrity"
      },
      {
        title: "Automated 3-State Dispute Engine",
        description: "Structured dispute workflow with evidence uploads, automated resolution timer, and fair refund allocation.",
        tag: "Arbitration"
      }
    ],

    // 6. Screenshots & Gallery
    previewImage: "https://i.postimg.cc/BnDrqNMf/Screenshot-From-2026-11-05-21-45-07.png",
    galleryCaption: "Aman Pay production dashboard showing active escrow contracts, balance ledgers, and milestone verification statuses.",

    // 7. Technologies Used
    techStack: [
      {
        category: "Frontend & UI",
        skills: ["Next.js 14", "React", "TypeScript", "Tailwind CSS", "Lucide Icons"]
      },
      {
        category: "Backend & Core",
        skills: ["Node.js", "Express", "TypeScript Core", "REST APIs", "Idempotent Webhooks"]
      },
      {
        category: "Database & Ledger",
        skills: ["PostgreSQL 16", "ACID Transactions", "Row-Level Locking", "Redis Lock Manager"]
      },
      {
        category: "Payments & Security",
        skills: ["Telebirr API", "Chapa API", "Stripe Connect", "HMAC SHA-256", "JWT Auth"]
      }
    ],
    techPills: [
      { label: "Next.js 14", bg: "pill-white" },
      { label: "TypeScript", bg: "pill-cyan" },
      { label: "PostgreSQL ACID", bg: "pill-lime" },
      { label: "Escrow State Machine", bg: "pill-yellow" },
      { label: "Redis Locks", bg: "pill-pink" },
      { label: "Telebirr / Chapa API", bg: "pill-coral" }
    ],

    // 8. System Architecture
    architectureOverview: "Event-driven modular architecture designed around transactional isolation, idempotent request deduplication, and immutable ledger journaling.",
    architectureLayers: [
      {
        layer: "Client & Presentation Tier",
        title: "Next.js 14 Responsive Web Application",
        description: "Generates client-side UUID v4 idempotency keys per transaction, handles QR scanner cameras, and provides real-time SSE deal state updates.",
        tech: "Next.js 14 App Router, React, Tailwind CSS"
      },
      {
        layer: "API Gateway & Security Tier",
        title: "Stateless Node.js Orchestrator & HMAC Guard",
        description: "Validates JWT auth sessions, enforces rate-limiting token buckets, and verifies cryptographic SHA-256 signatures on banking webhooks.",
        tech: "Node.js, Express, Crypto Middleware"
      },
      {
        layer: "Domain State Machine",
        title: "Escrow Lifecycle & Rule Engine",
        description: "Enforces legal state transitions (FUNDS_LOCKED → INSPECTED → RELEASED / DISPUTED) and prevents duplicate execution.",
        tech: "TypeScript Finite-State Machine"
      },
      {
        layer: "Persistence & Financial Ledger",
        title: "PostgreSQL 16 Double-Entry Journal",
        description: "Maintains immutable ledger_entries, escrow_deals, and transactional outbox events with row-level locks (FOR UPDATE NOWAIT).",
        tech: "PostgreSQL, Redis distributed lock manager"
      }
    ],

    // 9. How It Works
    howItWorks: [
      {
        step: "01",
        title: "Deal Agreement & Parameter Lock",
        description: "Buyer and seller specify transaction amount, milestone criteria, and inspection duration within the Aman Pay deal builder."
      },
      {
        step: "02",
        title: "Atomic Escrow Vault Deposit",
        description: "Buyer deposits funds via Telebirr, Chapa, or card. The payment gateway webhook fires, and the system atomically locks funds in escrow."
      },
      {
        step: "03",
        title: "Fulfillment & Real-Time Tracking",
        description: "Seller receives guaranteed confirmation that funds are locked, then ships goods or delivers freelance milestones."
      },
      {
        step: "04",
        title: "Physical Inspection & OTP Handshake",
        description: "Buyer inspects the goods in person or reviews deliverables, then presents an HMAC-signed delivery QR code or 6-digit OTP to the seller."
      },
      {
        step: "05",
        title: "Automated Instant Ledger Settlement",
        description: "Seller inputs OTP into Aman Pay; the engine validates the signature and atomically transfers funds from the vault to the seller's wallet."
      }
    ],

    // 10. My Role & Contributions
    myRole: "Lead Full-Stack Software Engineer & System Architect",
    contributions: [
      "Architected the append-only double-entry ledger database schema, eliminating mathematical drift across financial accounts.",
      "Engineered resilient webhook consumers with Redis idempotency caching to prevent double-spending on banking retries.",
      "Implemented the cryptographic HMAC-SHA256 handshake for in-person parcel verification.",
      "Designed and coded the entire modern Neo-Brutalist frontend interface with mobile-first responsiveness.",
      "Configured automated CI/CD deployment pipelines on Vercel and Supabase with end-to-end integration tests."
    ]
  },

  {
    id: "event-hub",
    name: "Event Hub",
    categoryBadge: "WEB APPLICATION",
    categoryBadgeBg: "var(--primary)",
    version: "v1.9.4-prod",
    subtitle: "High-Throughput Event Ticketing & Seat Reservation Platform with Concurrency Protection.",
    roleTimeline: "Lead Full-Stack Engineer • 2025",
    status: "Live in Production",
    liveUrl: "https://event-hub-lake.vercel.app/",
    githubUrl: "https://github.com/petrosgDev/event-hub",
    heroTags: ["High Concurrency", "Redis Locking", "Ticket Ticketing", "WebSockets", "Fastify"],

    // 2. Project Overview
    overview: "Event Hub is a high-performance event management and ticketing platform engineered to withstand high-concurrency ticket drops for concerts, technology conferences, and sporting events. It provides venue managers with dynamic seating charts and attendees with sub-second ticket checkout while guaranteeing zero oversold seats even when thousands of users target the exact same row simultaneously.",
    overviewSummary: "Scalable event ticketing engine built to eliminate seat overbooking during flash-sale spikes.",

    // 3. Problem Statement
    problemTitle: "Seat Contention Spikes & Database Deadlocks During Flash Sales",
    problemBody: "During headline event ticket releases, thousands of fans rush to purchase limited prime seats within the first 60 seconds. Traditional monolithic booking systems collapse under simultaneous database writes, creating deadlocks and causing multiple users to receive confirmation for the exact same seat.",
    problemPoints: [
      "Relational databases lock up when 5,000+ concurrent requests attempt to reserve the same seat rows.",
      "Customers lose reserved seats unexpectedly while entering payment details due to lack of atomic temporary holds.",
      "Event gate staff face agonizing entrance delays when venue cellular network connectivity drops."
    ],

    // 4. Solution
    solutionTitle: "Atomic Redis Reservation Holds & Offline Cryptographic Verification",
    solutionBody: "Designed an in-memory seat reservation pipeline using Redis key-value locks with an 8-minute TTL expiration window. Selected seats are atomically locked for the customer, immediately broadcast to all other attendees via WebSockets, and secured with offline-verifiable Ed25519 digital QR tickets for rapid venue entry.",
    solutionPoints: [
      "Atomic Redis reservation locks isolate high-frequency cart holds from the primary relational database.",
      "WebSockets push live seat availability updates across active browsers at 60 FPS.",
      "Cryptographic Ed25519 QR tickets enable gate staff to verify attendees offline in under 15ms."
    ],

    // 5. Key Features
    keyFeatures: [
      {
        title: "Atomic Seat Reservation Window",
        description: "8-minute guaranteed cart hold preventing duplicate bookings without manual database lockups.",
        tag: "Concurrency"
      },
      {
        title: "Interactive Vector Venue Seating",
        description: "High-performance SVG stadium and theater seating charts with real-time seat status color coding.",
        tag: "UI/UX"
      },
      {
        title: "Offline Gate QR Validation",
        description: "Handheld scanner tickets signed cryptographically to verify authenticity even with zero internet at venue gates.",
        tag: "Security"
      },
      {
        title: "Tiered Pricing & Promo Engine",
        description: "Dynamic early-bird, VIP, and general admission pricing rules with automated inventory cutoffs.",
        tag: "Ticketing"
      },
      {
        title: "Real-Time Organizer Analytics",
        description: "Live sales velocity counters, attendance check-in percentage, and ticket revenue breakdowns.",
        tag: "Analytics"
      }
    ],

    // 6. Screenshots & Gallery
    previewImage: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80",
    galleryCaption: "Event Hub live attendee ticket booking view and seat tiering interface.",

    // 7. Technologies Used
    techStack: [
      {
        category: "Frontend & UI",
        skills: ["Next.js 14", "React", "TypeScript", "Tailwind CSS", "SVG Canvas"]
      },
      {
        category: "Backend & APIs",
        skills: ["Node.js", "Fastify", "WebSockets", "Redis Pub/Sub"]
      },
      {
        category: "Database & Cache",
        skills: ["PostgreSQL", "Redis In-Memory TTL", "Prisma ORM"]
      },
      {
        category: "Security & Payments",
        skills: ["Ed25519 Signatures", "Stripe Checkout", "QR Code Generation"]
      }
    ],
    techPills: [
      { label: "Next.js 14", bg: "pill-white" },
      { label: "Fastify", bg: "pill-cyan" },
      { label: "Redis TTL Locks", bg: "pill-yellow" },
      { label: "WebSockets", bg: "pill-lime" },
      { label: "Ed25519 QR", bg: "pill-coral" }
    ],

    // 8. System Architecture
    architectureOverview: "High-concurrency decoupled architecture that absorbs peak ticket drop spikes through in-memory Redis queues before committing finalized sales to PostgreSQL.",
    architectureLayers: [
      {
        layer: "Client & Presentation",
        title: "Interactive React SVG Seating Map",
        description: "Renders multi-tier stadium seating charts with sub-16ms frame times and receives real-time seat locking events via WebSockets.",
        tech: "React, SVG Canvas, WebSockets"
      },
      {
        layer: "High-Speed Cache Tier",
        title: "Redis Distributed Reservation Layer",
        description: "Manages atomic SETNX seat locks with automatic 8-minute TTL expiry, shielding database from flash-sale load.",
        tech: "Redis Cluster, In-Memory TTL Locks"
      },
      {
        layer: "Transaction & Payment Service",
        title: "Fastify Ticket Processing Engine",
        description: "Processes checkout transactions, generates Ed25519 digital signatures, and initiates payment webhooks.",
        tech: "Node.js, Fastify, Stripe SDK"
      },
      {
        layer: "Persistence Tier",
        title: "PostgreSQL Database",
        description: "Stores persistent records for events, finalized ticket ownership, organizer revenue, and gate scan logs.",
        tech: "PostgreSQL, Prisma ORM"
      }
    ],

    // 9. How It Works
    howItWorks: [
      {
        step: "01",
        title: "Browse & Select Seats",
        description: "User chooses event and clicks seat rows on the interactive stadium seating map."
      },
      {
        step: "02",
        title: "Instant In-Memory Lock",
        description: "Redis acquires an atomic 8-minute reservation lock; WebSocket broadcasts 'occupied' status to all other users."
      },
      {
        step: "03",
        title: "Frictionless Checkout",
        description: "User inputs payment details. If checkout succeeds within the 8-minute window, the seat status turns permanently sold."
      },
      {
        step: "04",
        title: "Cryptographic QR Generation",
        description: "System generates a signed digital ticket with unique HMAC/Ed25519 tokens stored in the user's mobile wallet."
      },
      {
        step: "05",
        title: "Sub-15ms Gate Entry",
        description: "At the venue entrance, staff scan the ticket offline; signature verifies instantaneously without network roundtrips."
      }
    ],

    // 10. My Role & Contributions
    myRole: "Lead Full-Stack Engineer & High-Concurrency Architect",
    contributions: [
      "Engineered the Redis atomic reservation algorithm, completely eliminating duplicate seat bookings.",
      "Built the interactive SVG stadium seating interface capable of rendering 8,000+ interactive seats at 60 FPS.",
      "Designed the offline-first Ed25519 cryptographic ticket validation mechanism for venue staff scanners.",
      "Implemented WebSocket pub/sub architecture for real-time seat status synchronization across thousands of simultaneous attendees."
    ]
  },

  {
    id: "ethio-massage",
    name: "Ethio Massage",
    categoryBadge: "WELLNESS PLATFORM",
    categoryBadgeBg: "var(--white)",
    version: "v2.1.0-prod",
    subtitle: "On-Demand Wellness Booking & Verified Therapist Dispatch System.",
    roleTimeline: "Lead Full-Stack Developer • 2025",
    status: "Live in Production",
    liveUrl: "https://ethio-massage.vercel.app",
    githubUrl: "https://github.com/petrosgDev/ethio-massage",
    heroTags: ["Booking SaaS", "Calendar Sync", "Twilio SMS", "Dispatcher", "React"],

    // 2. Project Overview
    overview: "Ethio Massage is a specialized wellness platform connecting clients with certified, background-checked massage therapists for home and spa sessions. Featuring real-time therapist scheduling, automated travel buffer calculations, and instant SMS appointment confirmations, Ethio Massage streamlines appointment booking into an intuitive 60-second experience.",
    overviewSummary: "On-demand wellness booking platform with real-time therapist dispatch and automated reminders.",

    // 3. Problem Statement
    problemTitle: "Chaotic Phone Bookings, Schedule Clashes & High No-Show Rates",
    problemBody: "Independent therapists and wellness clinics traditionally rely on chaotic phone calls, WhatsApp messages, and paper notebooks to schedule sessions. This causes frequent scheduling conflicts, double bookings, and catastrophic 25%+ client no-show rates that directly damage therapist livelihoods.",
    problemPoints: [
      "Manual appointment booking leads to overlapping client sessions and therapist scheduling fatigue.",
      "Lack of automated reminder systems leads to high client no-show and cancellation rates.",
      "Unverified client location information complicates travel logistics for mobile in-home therapists."
    ],

    // 4. Solution
    solutionTitle: "Automated Slot Locking with Intelligent Travel Buffer Calculations",
    solutionBody: "Created a real-time calendar booking wizard that detects therapist availability, automatically injects travel buffer times based on client zones, and dispatches automated SMS confirmations and appointment reminders via Twilio.",
    solutionPoints: [
      "Dynamic calendar slot availability eliminates double bookings across in-home and clinic therapists.",
      "Automated travel-time buffers ensure therapists have sufficient transit time between consecutive sessions.",
      "Automated SMS/Email reminders sent 24h and 2h prior to sessions cut no-show rates by over 80%."
    ],

    // 5. Key Features
    keyFeatures: [
      {
        title: "Real-Time Appointment Booking",
        description: "Intuitive 3-step booking flow allowing clients to select services, therapists, and verified open time slots.",
        tag: "Booking"
      },
      {
        title: "Intelligent Travel Buffers",
        description: "Automatically inserts 30-to-45 minute transit windows between client appointments based on location zones.",
        tag: "Logistics"
      },
      {
        title: "Proactive SMS Notifications",
        description: "Twilio-powered automated SMS alerts confirming bookings and reminding clients prior to session start.",
        tag: "Messaging"
      },
      {
        title: "Verified Therapist Profiles",
        description: "Detailed practitioner profiles showing verified certifications, specialty modalities, and client ratings.",
        tag: "Trust"
      },
      {
        title: "Therapist Mobile Dispatch Portal",
        description: "Clean mobile view for therapists to manage daily schedules, view client addresses, and mark session completion.",
        tag: "Operations"
      }
    ],

    // 6. Screenshots & Gallery
    previewImage: "https://i.postimg.cc/HxJQdCxL/Screenshot-From-2026-11-05-17-58-09.png",
    galleryCaption: "Ethio Massage client appointment reservation interface and therapist scheduling dashboard.",

    // 7. Technologies Used
    techStack: [
      {
        category: "Frontend & UI",
        skills: ["Next.js", "React", "Tailwind CSS", "Lucide React Icons"]
      },
      {
        category: "Backend & APIs",
        skills: ["Node.js", "Express", "REST APIs", "Twilio API"]
      },
      {
        category: "Database & ORM",
        skills: ["PostgreSQL", "Supabase", "Prisma ORM"]
      },
      {
        category: "Integrations & Tools",
        skills: ["Twilio SMS Gateway", "Google Calendar API", "Vercel Hosting"]
      }
    ],
    techPills: [
      { label: "Next.js", bg: "pill-white" },
      { label: "React", bg: "pill-cyan" },
      { label: "PostgreSQL", bg: "pill-lime" },
      { label: "Twilio SMS", bg: "pill-coral" },
      { label: "Calendar Sync", bg: "pill-yellow" }
    ],

    // 8. System Architecture
    architectureOverview: "Modular service architecture structured around client booking, therapist availability calendar sync, and automated SMS dispatch.",
    architectureLayers: [
      {
        layer: "Client Application",
        title: "Mobile-First Booking Interface",
        description: "Responsive web application optimized for fast, frictionless booking on smartphones in under 60 seconds.",
        tech: "Next.js, React, Tailwind CSS"
      },
      {
        layer: "Business Logic Tier",
        title: "Scheduling & Buffer Computation Engine",
        description: "Validates therapist working hours, computes transit buffers, and enforces cancellation policies.",
        tech: "Node.js, Express, Date-fns"
      },
      {
        layer: "Notification Service",
        title: "Automated Notification Dispatcher",
        description: "Triggers transactional SMS reminders and calendar sync events via Twilio and Google Calendar API.",
        tech: "Twilio SDK, Node-Cron"
      },
      {
        layer: "Data Persistence",
        title: "Relational Database",
        description: "Stores appointment records, verified therapist profiles, client contact details, and review logs.",
        tech: "PostgreSQL, Prisma ORM"
      }
    ],

    // 9. How It Works
    howItWorks: [
      {
        step: "01",
        title: "Choose Modality & Practitioner",
        description: "Client selects desired massage style (Deep Tissue, Swedish, Sports) and views certified therapist bios."
      },
      {
        step: "02",
        title: "Select Verified Open Slot",
        description: "Interactive calendar displays verified open appointments with travel buffers calculated in real time."
      },
      {
        step: "03",
        title: "Enter Location & Contact",
        description: "Client provides service address and phone number for therapist dispatch."
      },
      {
        step: "04",
        title: "Automated SMS Confirmation",
        description: "Client and therapist instantly receive SMS confirmations with booking code and cancellation guidelines."
      },
      {
        step: "05",
        title: "Session Completion & Rating",
        description: "Therapist conducts the session; client receives an automated rating prompt to review the experience."
      }
    ],

    // 10. My Role & Contributions
    myRole: "Full-Stack Developer & Product Engineer",
    contributions: [
      "Engineered the core calendar scheduling algorithm with dynamic travel buffer calculations.",
      "Integrated Twilio SMS gateway for automated appointment confirmations and reminder dispatches.",
      "Crafted the responsive mobile-first booking UI resulting in high client conversion rates.",
      "Configured PostgreSQL database schemas with Prisma ORM for relational appointment management."
    ]
  },

  {
    id: "wende-dubai",
    name: "Wende Dubai Interior Design",
    categoryBadge: "INTERIOR DESIGN",
    categoryBadgeBg: "var(--coral)",
    version: "v3.0.0-prod",
    subtitle: "High-Performance Luxury Interior Design & Architectural Portfolio with 0.00 CLS.",
    roleTimeline: "Frontend Architect & Lead Designer • 2025",
    status: "Live in Production",
    liveUrl: "https://wende-dubai.vercel.app",
    githubUrl: "https://github.com/petrosgDev/wende-dubai",
    heroTags: ["Luxury UI", "0.00 CLS", "AVIF Media", "Next.js 14", "Editorial Design"],

    // 2. Project Overview
    overview: "Wende Dubai is a bespoke architectural and interior design portfolio created for a luxury design studio operating across Dubai and the United Arab Emirates. Engineered to present high-end penthouses, luxury villas, and commercial spaces with editorial typography, sub-second media delivery, and zero cumulative layout shift (0.00 CLS).",
    overviewSummary: "Luxury architectural showcase delivering high-resolution imagery with zero layout shift and 100 Lighthouse performance.",

    // 3. Problem Statement
    problemTitle: "Media Bloat, Heavy Payloads & Layout Shifts in Luxury Showcases",
    problemBody: "Luxury architecture portfolios rely heavily on high-resolution photography. Traditional web implementations suffer from unoptimized 20MB+ page weights, slow 6-second load times on mobile, and jarring cumulative layout shift (CLS) as images pop in abruptly, diluting the brand's perception of refinement.",
    problemPoints: [
      "High-resolution architectural assets cause sluggish load times and high bounce rates among VIP visitors.",
      "Unstyled layout shifts (CLS > 0.3) disrupt reading flow when images load without pre-allocated aspect ratios.",
      "Generic template styling fails to convey the bespoke craftsmanship expected in Dubai's luxury sector."
    ],

    // 4. Solution
    solutionTitle: "Edge-Optimized Responsive Media Pipeline with Fixed Aspect Ratios",
    solutionBody: "Constructed an edge-delivered static Next.js architecture utilizing modern AVIF and WebP compression formats, responsive srcset resolutions, fixed aspect-ratio placeholders, and blur-up preview effects, achieving a perfect 100/100 Lighthouse score with 0.00 CLS.",
    solutionPoints: [
      "Edge media optimization reduces total page asset weight by 82% without visual degradation.",
      "Pre-allocated container bounding boxes eliminate cumulative layout shift entirely (verified 0.00 CLS).",
      "Editorial typography with smooth micro-interactions elevates perceived brand luxury and client trust."
    ],

    // 5. Key Features
    keyFeatures: [
      {
        title: "Zero Cumulative Layout Shift (0.00 CLS)",
        description: "Fixed aspect ratio containers ensure images pop in seamlessly with zero page jumps.",
        tag: "Performance"
      },
      {
        title: "Next-Gen AVIF & WebP Pipeline",
        description: "Adaptive media compression serving tailored image sizes based on device screen resolution.",
        tag: "Optimization"
      },
      {
        title: "Curated Architectural Taxonomy",
        description: "Interactive category filtering across Luxury Penthouses, Private Villas, and Commercial Spaces.",
        tag: "Taxonomy"
      },
      {
        title: "Fullscreen High-Resolution Gallery",
        description: "Immersive lightbox experience allowing clients to inspect fine material finishes and spatial layouts.",
        tag: "Visuals"
      },
      {
        title: "Bespoke Consultation Conduit",
        description: "Integrated inquiry conduit directly connecting prospective clients with the studio's VIP WhatsApp.",
        tag: "Inquiry"
      }
    ],

    // 6. Screenshots & Gallery
    previewImage: "https://i.postimg.cc/YqCSTzyb/Screenshot-From-2026-11-05-17-57-19.png",
    galleryCaption: "Wende Dubai luxury residential penthouse showcase and architectural project gallery.",

    // 7. Technologies Used
    techStack: [
      {
        category: "Frontend & Architecture",
        skills: ["Next.js 14", "React", "TypeScript", "Tailwind CSS", "Framer Motion"]
      },
      {
        category: "Media Optimization",
        skills: ["Next/Image Pipeline", "AVIF", "WebP", "Base64 Blur-Up Placeholders"]
      },
      {
        category: "Typography & Design",
        skills: ["Space Grotesk", "Plus Jakarta Sans", "Custom Responsive Grid"]
      },
      {
        category: "Deployment & Analytics",
        skills: ["Vercel Edge Network", "Vercel Analytics", "GitHub Actions"]
      }
    ],
    techPills: [
      { label: "Next.js 14", bg: "pill-white" },
      { label: "0.00 CLS", bg: "pill-lime" },
      { label: "AVIF / WebP", bg: "pill-cyan" },
      { label: "Luxury UI", bg: "pill-coral" },
      { label: "Tailwind CSS", bg: "pill-yellow" }
    ],

    // 8. System Architecture
    architectureOverview: "JAMstack static architecture deployed across global edge points of presence for instant asset delivery and zero runtime server overhead.",
    architectureLayers: [
      {
        layer: "Global Edge Network",
        title: "Vercel Edge CDN Distribution",
        description: "Serves pre-rendered HTML and cached assets from 300+ global edge nodes for sub-40ms TTFB worldwide.",
        tech: "Vercel Edge, Global Anycast DNS"
      },
      {
        layer: "Image Optimization Pipeline",
        title: "Automated Media Transformation",
        description: "Converts uploaded photography into responsive AVIF/WebP image variants on the fly with fixed aspect ratios.",
        tech: "Next.js Image Optimization API"
      },
      {
        layer: "Presentation Layer",
        title: "Editorial Typography & Motion System",
        description: "Fluid micro-interactions and smooth scroll effects running on CSS transforms without blocking the browser main thread.",
        tech: "React, Framer Motion, CSS Grid"
      }
    ],

    // 9. How It Works
    howItWorks: [
      {
        step: "01",
        title: "Instant Edge HTML Delivery",
        description: "Visitor arrives on the site; pre-rendered HTML loads instantaneously with lightweight inline CSS."
      },
      {
        step: "02",
        title: "Progressive Blur-Up Image Reveal",
        description: "Tiny base64 blur placeholders display instantly while full-resolution AVIF assets stream in the background."
      },
      {
        step: "03",
        title: "Category & Style Exploration",
        description: "Client filters architectural projects by category (Residential, Commercial, Modern Villa)."
      },
      {
        step: "04",
        title: "Deep-Dive Project Lightbox",
        description: "Client clicks a project to inspect architectural layouts, materials, and design philosophy in full screen."
      },
      {
        step: "05",
        title: "Direct WhatsApp VIP Inquiry",
        description: "Prospective client initiates a consultation request with one tap, linking directly to the design team."
      }
    ],

    // 10. My Role & Contributions
    myRole: "Frontend Architect & UI/UX Performance Engineer",
    contributions: [
      "Engineered the responsive asset compression pipeline achieving a verified 0.00 Cumulative Layout Shift score.",
      "Designed the bespoke editorial design system adhering to Dubai's luxury architectural aesthetic.",
      "Implemented responsive image resolution switching, cutting mobile data consumption by over 80%.",
      "Deployed and automated continuous deployment via Vercel Edge Network and GitHub Actions."
    ]
  },

  {
    id: "raman-caffe",
    name: "Raman Caffe",
    categoryBadge: "E-COMMERCE & HOSPITALITY",
    categoryBadgeBg: "var(--pink)",
    version: "v2.0.0-prod",
    subtitle: "Artisanal Specialty Coffee E-Commerce & Interactive Live Order Customizer.",
    roleTimeline: "Lead Full-Stack Developer • 2024–2025",
    status: "Live in Production",
    liveUrl: "https://raman-caffe.vercel.app",
    githubUrl: "https://github.com/petrosgDev/raman-caffe",
    heroTags: ["E-Commerce", "Drink Customizer", "Zustand State", "Stripe Checkout", "React"],

    // 2. Project Overview
    overview: "Raman Caffe is an artisanal digital storefront and interactive menu customizer for a specialty coffee roastery. It enables coffee lovers to discover single-origin beans, customize grind sizes and espresso brewing ratios in real time, and place instant pickup and delivery orders with persistent local cart management.",
    overviewSummary: "Interactive specialty coffee storefront with a real-time beverage customization engine.",

    // 3. Problem Statement
    problemTitle: "Rigid E-Commerce Menus Unfit for Artisanal Beverage Customization",
    problemBody: "Traditional e-commerce templates are designed for simple static products. They fail to support the multi-layered customization required for specialty coffee, such as grind adjustments, extra shots, plant-based milk alternatives, and sweetener levels, resulting in confused customers and wrong barista orders.",
    problemPoints: [
      "Generic shopping carts cannot handle dynamic multi-attribute ingredient combinations.",
      "Complex, multi-step checkout processes cause high cart abandonment during fast morning coffee rushes.",
      "Physical cafes struggle with illegible manual order slips during peak morning rush hours."
    ],

    // 4. Solution
    solutionTitle: "Reactive Ingredient State Builder with Instant Cart Persistence",
    solutionBody: "Built a reactive beverage customization engine using Zustand and React. Customers visually adjust drink parameters with real-time price updates, persistent browser storage across sessions, and streamlined one-tap checkout integrated with Stripe.",
    solutionPoints: [
      "Reactive drink customizer updates ingredient combinations and price totals in under 5ms.",
      "Local state persistence retains customer carts even if the browser tab is accidentally closed.",
      "Clear, standardized digital order summaries eliminate misunderstandings for barista bar queues."
    ],

    // 5. Key Features
    keyFeatures: [
      {
        title: "Interactive Drink Customizer",
        description: "Visual ingredient builder allowing customers to fine-tune milk, espresso shots, sweeteners, and grind size.",
        tag: "Builder"
      },
      {
        title: "Single-Origin Bean Showcase",
        description: "Flavor profiles, roast levels, altitude, and tasting notes for premium Ethiopian and Colombian beans.",
        tag: "Catalog"
      },
      {
        title: "Instant Persistent Cart",
        description: "Fast client-side cart management that saves customized items across browser reloads.",
        tag: "Cart"
      },
      {
        title: "One-Tap Express Checkout",
        description: "Streamlined checkout supporting Apple Pay, Google Pay, and credit cards via Stripe.",
        tag: "Payments"
      },
      {
        title: "Barista Order Queue Display",
        description: "Optimized kitchen display showing incoming customized orders with clear modification tags.",
        tag: "Operations"
      }
    ],

    // 6. Screenshots & Gallery
    previewImage: "https://i.postimg.cc/L8vK4jLz/Screenshot-From-2026-11-05-17-57-41.png",
    galleryCaption: "Raman Caffe specialty beverage customizer and artisanal bean catalog view.",

    // 7. Technologies Used
    techStack: [
      {
        category: "Frontend & UI",
        skills: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Zustand"]
      },
      {
        category: "Backend & Payments",
        skills: ["Node.js", "Express", "Stripe API", "REST Endpoints"]
      },
      {
        category: "Data & Storage",
        skills: ["MongoDB", "Mongoose", "Local Storage", "Redis Cache"]
      }
    ],
    techPills: [
      { label: "Next.js", bg: "pill-white" },
      { label: "React", bg: "pill-cyan" },
      { label: "Zustand", bg: "pill-yellow" },
      { label: "Stripe API", bg: "pill-coral" },
      { label: "Tailwind CSS", bg: "pill-lime" }
    ],

    // 8. System Architecture
    architectureOverview: "Reactive client-side application with serverless order fulfillment and resilient payment webhooks.",
    architectureLayers: [
      {
        layer: "Client Application",
        title: "Zustand Reactive Storefront",
        description: "Manages drink customization parameters, cart persistence, and instant price calculations in memory.",
        tech: "React, Next.js, Zustand"
      },
      {
        layer: "Payment & Order API",
        title: "Express & Stripe Service",
        description: "Creates secure Stripe payment intents and processes order validation webhooks.",
        tech: "Node.js, Express, Stripe SDK"
      },
      {
        layer: "Data Store",
        title: "Product Catalog & Order History",
        description: "Stores bean inventory, seasonal pricing, and completed order archives.",
        tech: "MongoDB, Mongoose"
      }
    ],

    // 9. How It Works
    howItWorks: [
      {
        step: "01",
        title: "Explore Single-Origin Beans",
        description: "Customer browses roast profiles and discovers tasting notes for artisan coffees."
      },
      {
        step: "02",
        title: "Customize Drink Recipe",
        description: "Customer toggles milk options, syrups, and grind coarseness with instant price updates."
      },
      {
        step: "03",
        title: "Review Persistent Cart",
        description: "Customized beverage is added to the cart; local storage preserves cart across visits."
      },
      {
        step: "04",
        title: "Express Checkout",
        description: "Customer completes payment in under 30 seconds using Stripe or Apple Pay."
      },
      {
        step: "05",
        title: "Barista Preparation & Pickup",
        description: "Order appears on cafe bar display; customer receives pickup notification when ready."
      }
    ],

    // 10. My Role & Contributions
    myRole: "Lead Full-Stack Developer & UI Designer",
    contributions: [
      "Architected the reactive drink customization state machine using Zustand.",
      "Designed the high-contrast Neo-Brutalist product UI with smooth micro-interactions.",
      "Integrated Stripe checkout and webhook processing for real-time order confirmation.",
      "Optimized the checkout funnel, reducing average mobile ordering time to under 45 seconds."
    ]
  },

  {
    id: "nexus-campus",
    name: "Nexus Campus",
    categoryBadge: "EDTECH & CAMPUS SAAS",
    categoryBadgeBg: "var(--purple)",
    version: "v2.2.0-prod",
    subtitle: "Real-Time Multi-Tenant Academic Management & Student Course Registration Portal.",
    roleTimeline: "Lead Software Engineer • 2024–2025",
    status: "Live in Production",
    liveUrl: "https://nexus-campus.vercel.app",
    githubUrl: "https://github.com/petrosgDev/nexus-campus",
    heroTags: ["EdTech SaaS", "Prerequisite DAG", "RBAC Security", "PostgreSQL", "Next.js"],

    // 2. Project Overview
    overview: "Nexus Campus is a multi-tenant university academic management portal serving university departments, faculty members, and students. It modernizes campus workflows with automated course prerequisite verification, schedule clash prevention, dynamic degree audit tracking, and faculty grade submission.",
    overviewSummary: "Institutional campus portal with automated course prerequisite validation and gradebook workflows.",

    // 3. Problem Statement
    problemTitle: "Legacy Campus Portal Crashes & Prerequisite Enrollment Errors",
    problemBody: "University legacy portals are infamous for crashing during course registration week, failing to enforce prerequisite course dependencies, and relying on paper grade sheets that introduce transcription errors into official student transcripts.",
    problemPoints: [
      "Legacy university portals crash under simultaneous registration spikes during course enrollment week.",
      "Weak prerequisite validation allows students to enroll in advanced classes without passing required basics.",
      "Deans and department heads lack real-time visibility into classroom capacity and faculty grading status."
    ],

    // 4. Solution
    solutionTitle: "Directed Acyclic Graph (DAG) Prerequisite Engine & Role-Based Access Control",
    solutionBody: "Engineered an institutional academic management system with a Directed Acyclic Graph (DAG) prerequisite verification algorithm that mathematically validates course eligibility before enrollment commits, paired with granular Role-Based Access Control (RBAC).",
    solutionPoints: [
      "DAG dependency engine checks student transcript history and enforces prerequisite chains in sub-millisecond time.",
      "Automatic schedule clash detection prevents enrolling in overlapping lecture time blocks.",
      "Granular RBAC safeguards student records with dedicated roles for Students, Faculty, Registrars, and Deans."
    ],

    // 5. Key Features
    keyFeatures: [
      {
        title: "Automated DAG Prerequisite Checks",
        description: "Prevents invalid enrollments by mathematically validating that required foundational courses were completed.",
        tag: "Validation"
      },
      {
        title: "Schedule Clash Prevention",
        description: "Detects time overlaps across selected course sections and alerts students before confirmation.",
        tag: "Scheduling"
      },
      {
        title: "Interactive Degree Audit",
        description: "Visual progress meter showing remaining major, minor, and elective credits required for graduation.",
        tag: "Academic"
      },
      {
        title: "Faculty Gradebook & Approval",
        description: "Secure grade submission portal with two-factor authorization and automated registrar sign-off.",
        tag: "Faculty"
      },
      {
        title: "Multi-Tenant Department Portal",
        description: "Department-level dashboards showing seat occupancy rates, faculty course assignments, and waitlists.",
        tag: "Admin"
      }
    ],

    // 6. Screenshots & Gallery
    previewImage: "https://i.postimg.cc/tJn4q81R/Screenshot-From-2026-11-05-17-58-29.png",
    galleryCaption: "Nexus Campus student registration portal, degree audit tracker, and academic dashboard.",

    // 7. Technologies Used
    techStack: [
      {
        category: "Frontend & UI",
        skills: ["Next.js 14", "React", "TypeScript", "Tailwind CSS", "Chart.js"]
      },
      {
        category: "Backend & Security",
        skills: ["Node.js", "Express", "TypeScript", "JWT Auth", "RBAC Middleware"]
      },
      {
        category: "Database & Logic",
        skills: ["PostgreSQL", "Prisma ORM", "Redis Cache", "DAG Graph Traversal"]
      }
    ],
    techPills: [
      { label: "Next.js 14", bg: "pill-white" },
      { label: "TypeScript", bg: "pill-cyan" },
      { label: "PostgreSQL", bg: "pill-lime" },
      { label: "RBAC Security", bg: "pill-purple" },
      { label: "DAG Engine", bg: "pill-yellow" }
    ],

    // 8. System Architecture
    architectureOverview: "Role-segregated academic service with transactional registration guarantees and cached course catalog queries.",
    architectureLayers: [
      {
        layer: "Role-Based UI",
        title: "Role-Adaptive Next.js Application",
        description: "Dynamically adapts views, permissions, and navigation for Students, Faculty, and Administrators.",
        tech: "Next.js 14, Tailwind CSS"
      },
      {
        layer: "Prerequisite Engine",
        title: "DAG Dependency Validator",
        description: "Traverses academic course trees in memory to verify prerequisite fulfillment prior to enrollment.",
        tech: "TypeScript Graph Traversal Algorithms"
      },
      {
        layer: "Database & Transcripts",
        title: "PostgreSQL Academic Registry",
        description: "Stores academic records, degree requirements, course sections, and audit trails.",
        tech: "PostgreSQL, Prisma ORM"
      }
    ],

    // 9. How It Works
    howItWorks: [
      {
        step: "01",
        title: "Student Authenticates",
        description: "Student logs in via secure university SSO and accesses the semester course catalog."
      },
      {
        step: "02",
        title: "Course Selection & DAG Check",
        description: "System verifies that all prerequisite courses have passing grades on the student's transcript."
      },
      {
        step: "03",
        title: "Schedule Conflict Verification",
        description: "Engine cross-references lecture hours to ensure zero time clashes with already enrolled sections."
      },
      {
        step: "04",
        title: "Atomic Seat Reservation",
        description: "Seat count decrements inside an ACID transaction; student receives confirmed enrollment slip."
      },
      {
        step: "05",
        title: "End-of-Term Grade Sync",
        description: "Faculty submit grades through the portal; GPA and degree completion meters recalculate automatically."
      }
    ],

    // 10. My Role & Contributions
    myRole: "Lead Software Engineer & System Architect",
    contributions: [
      "Designed and coded the DAG prerequisite validation algorithm preventing invalid enrollments.",
      "Engineered the granular role-based access control (RBAC) security model with JWT tokens.",
      "Optimized complex PostgreSQL queries with composite indexes to handle semester registration spikes.",
      "Built interactive student progress charts tracking degree completion milestones."
    ]
  },

  {
    id: "my-app",
    name: "SwiftPulse Mobile Application",
    categoryBadge: "CROSS-PLATFORM APP",
    categoryBadgeBg: "var(--lime)",
    version: "v1.5.0-prod",
    subtitle: "Cross-Platform Mobile Experience with Offline-First Local Cache & Conflict Resolution.",
    roleTimeline: "Mobile & Full-Stack Engineer • 2024",
    status: "Open Source / Production",
    liveUrl: "https://github.com/petrosgDev/my-app",
    githubUrl: "https://github.com/petrosgDev/my-app",
    heroTags: ["React Native", "Offline First", "SQLite", "Biometrics", "Sync Engine"],

    // 2. Project Overview
    overview: "SwiftPulse is a cross-platform mobile client application engineered for resilient operation in low-connectivity and offline environments. Built with React Native and on-device SQLite storage, SwiftPulse enables frictionless task and data management with automatic background cloud synchronization as soon as cellular connectivity returns.",
    overviewSummary: "Offline-first mobile application with instant local persistence and background cloud synchronization.",

    // 3. Problem Statement
    problemTitle: "Mobile Latency Spikes & Data Loss in Unreliable Network Conditions",
    problemBody: "Mobile users frequently encounter dead zones, elevators, and inconsistent cellular networks. Mobile apps that rely on synchronous HTTP calls freeze the user interface, drop uncommitted user input, or submit duplicate forms when connection drops during submission.",
    problemPoints: [
      "Synchronous API calls freeze the mobile interface, degrading perceived app responsiveness.",
      "Network dropouts during data entry cause users to lose their inputs or trigger duplicate submissions.",
      "Offline update conflicts often overwrite newer data when devices reconnect after disconnected periods."
    ],

    // 4. Solution
    solutionTitle: "Offline-First SQLite Architecture with Queued Mutation Sync",
    solutionBody: "Implemented an offline-first mobile architecture where all user interactions read and write directly to an on-device encrypted SQLite database instantaneously (sub-5ms). A background sync worker monitors network availability and replays queued mutations with timestamped conflict reconciliation.",
    solutionPoints: [
      "Sub-5ms UI updates by writing to on-device SQLite first before attempting any network transport.",
      "Background sync worker replays queued mutations in order with exponential backoff on retry.",
      "Deterministic timestamp reconciliation (Last-Write-Wins) prevents accidental data loss upon reconnection."
    ],

    // 5. Key Features
    keyFeatures: [
      {
        title: "100% Offline-First Functionality",
        description: "Full app capabilities available in airplane mode or deep offline dead zones without network latency.",
        tag: "Offline"
      },
      {
        title: "Sub-5ms Local SQLite Persistence",
        description: "Immediate data persistence on device eliminating spinner loading states during everyday tasks.",
        tag: "Speed"
      },
      {
        title: "Automated Background Sync",
        description: "Silently synchronizes queued updates with cloud servers when network connectivity is detected.",
        tag: "Sync"
      },
      {
        title: "Biometric Hardware Security",
        description: "Supports Face ID and fingerprint sensor authentication via native iOS Keychain and Android Keystore.",
        tag: "Security"
      },
      {
        title: "Smooth 60 FPS Native Gestures",
        description: "Native animations and swipe interactions running on the UI thread without JavaScript bridge lag.",
        tag: "Performance"
      }
    ],

    // 6. Screenshots & Gallery
    previewImage: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80",
    galleryCaption: "SwiftPulse mobile application interface showing offline task boards and background sync state.",

    // 7. Technologies Used
    techStack: [
      {
        category: "Mobile & UI",
        skills: ["React Native", "TypeScript", "Expo", "NativeWind", "React Navigation"]
      },
      {
        category: "Storage & Persistence",
        skills: ["SQLite", "SQLCipher AES-256", "AsyncStorage"]
      },
      {
        category: "Backend & Cloud",
        skills: ["Node.js", "Express", "REST Sync APIs", "WebSockets"]
      }
    ],
    techPills: [
      { label: "React Native", bg: "pill-cyan" },
      { label: "TypeScript", bg: "pill-white" },
      { label: "SQLite Offline", bg: "pill-lime" },
      { label: "Biometrics", bg: "pill-yellow" },
      { label: "Tailwind Native", bg: "pill-coral" }
    ],

    // 8. System Architecture
    architectureOverview: "Decoupled offline-first mobile architecture with on-device SQLite local database acting as the single source of truth for the UI.",
    architectureLayers: [
      {
        layer: "Native Mobile UI",
        title: "React Native Gesture Interface",
        description: "Renders 60 FPS mobile layouts with immediate optimistic updates tied directly to local SQLite state.",
        tech: "React Native, Expo, TypeScript"
      },
      {
        layer: "Local Database",
        title: "On-Device SQLite Storage",
        description: "Encrypted relational database storing cached records, user preferences, and the pending mutation queue.",
        tech: "SQLite, SQLCipher"
      },
      {
        layer: "Sync Manager",
        title: "Background Synchronization Worker",
        description: "Monitors device network connectivity state and dispatches queued transactions in batches.",
        tech: "NetInfo API, Background Fetch"
      },
      {
        layer: "Cloud Backend",
        title: "REST Sync Endpoint",
        description: "Validates incoming mutation batches, resolves timestamp conflicts, and broadcasts updates to other devices.",
        tech: "Node.js, PostgreSQL"
      }
    ],

    // 9. How It Works
    howItWorks: [
      {
        step: "01",
        title: "User Action in App",
        description: "User creates, edits, or marks an item complete in the mobile interface."
      },
      {
        step: "02",
        title: "Instant SQLite Commit",
        description: "Data writes to the local SQLite database in under 5ms; the UI updates instantly with zero spinners."
      },
      {
        step: "03",
        title: "Mutation Queued",
        description: "The change is serialized into a pending mutation record with timestamp and UUID."
      },
      {
        step: "04",
        title: "Background Network Handshake",
        description: "As soon as cellular or Wi-Fi connectivity returns, the background worker sends queued mutations."
      },
      {
        step: "05",
        title: "Cloud Settlement & Confirmation",
        description: "Cloud server verifies mutations, resolves any timestamp conflicts, and marks the sync queue clear."
      }
    ],

    // 10. My Role & Contributions
    myRole: "Mobile & Full-Stack Engineer",
    contributions: [
      "Architected the offline-first SQLite database layer and queued mutation sync engine.",
      "Implemented hardware biometric authentication using iOS Keychain and Android Keystore.",
      "Engineered 60 FPS mobile animations and gestures using native driver bridges.",
      "Authored unit and snapshot test suites ensuring regression-free mobile releases."
    ]
  },

  {
    id: "banking-system",
    name: "Core Banking Ledger Engine",
    categoryBadge: "SYSTEMS & C++ CORE",
    categoryBadgeBg: "var(--lime)",
    version: "v4.1.0-prod",
    subtitle: "Low-Latency Multithreaded C++ Financial Transaction Engine with Mutex Synchronization.",
    roleTimeline: "Systems Software Engineer • 2024",
    status: "Verified Systems Core",
    liveUrl: "https://github.com/petrosgDev/banking_system",
    githubUrl: "https://github.com/petrosgDev/banking_system",
    heroTags: ["C++20", "Multithreading", "Mutex Synchronization", "Low Latency", "Valgrind Clean"],

    // 2. Project Overview
    overview: "The Core Banking Ledger Engine is a high-performance multithreaded systems engineering core written in modern C++20. Engineered for high-throughput inter-bank balance transfers, account settlement, and write-ahead ledger journal persistence with mathematical deadlock avoidance and zero memory leaks.",
    overviewSummary: "High-throughput multithreaded C++ financial transaction core with deadlock-avoidance locking.",

    // 3. Problem Statement
    problemTitle: "Race Conditions, Deadlocks & Memory Corruption in High-Frequency Ledgers",
    problemBody: "In high-throughput financial infrastructure, millions of concurrent transfer requests attempt to mutate account balances simultaneously. Acquiring mutex locks in arbitrary order across account pairs creates catastrophic circular deadlocks, while runtime garbage collection pauses in managed languages (Java/Go) cause unacceptable tail latency spikes.",
    problemPoints: [
      "Circular thread deadlocks halt processing when locking multiple account balances concurrently.",
      "Data race conditions in naive multithreading can generate or destroy money out of thin air.",
      "Memory leaks or dangling pointers in low-level systems cause production server crashes under sustained load."
    ],

    // 4. Solution
    solutionTitle: "Deadlock-Free Resource Ordering (std::lock) & RAII Memory Guarantees",
    solutionBody: "Engineered a multithreaded transaction processor utilizing deadlock-free simultaneous mutex acquisition (`std::lock`), deterministic RAII memory management, and binary write-ahead transaction logging (WAL) ensuring zero data loss and maximum CPU efficiency.",
    solutionPoints: [
      "Deadlock-avoidance locking (std::lock with std::unique_lock) guarantees safe concurrent multi-account transfers.",
      "Deterministic RAII memory safety with zero dynamic heap allocation in latency-critical execution paths.",
      "Binary Write-Ahead Logging (WAL) flushes transaction journals to disk for post-crash recovery."
    ],

    // 5. Key Features
    keyFeatures: [
      {
        title: "Deadlock-Free Fund Transfers",
        description: "Simultaneous mutex acquisition algorithm mathematically preventing circular thread deadlocks.",
        tag: "Concurrency"
      },
      {
        title: "High Throughput Processing",
        description: "Processes 50,000+ atomic balance transfers per second on consumer multithreaded CPU hardware.",
        tag: "Performance"
      },
      {
        title: "Atomic Double-Entry Invariance",
        description: "Conserves total ledger currency in every transfer: Source debit must equal target credit exactly.",
        tag: "Correctness"
      },
      {
        title: "Binary Write-Ahead Logging (WAL)",
        description: "Appends binary transaction logs before in-memory mutations commit, ensuring 100% crash recovery.",
        tag: "Durability"
      },
      {
        title: "Zero Memory Defects",
        description: "Rigorously verified clean via Valgrind, AddressSanitizer (ASan), and ThreadSanitizer (TSan).",
        tag: "Safety"
      }
    ],

    // 6. Screenshots & Gallery
    previewImage: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80",
    galleryCaption: "Core Banking Ledger multithreaded stress test execution and ledger verification terminal.",

    // 7. Technologies Used
    techStack: [
      {
        category: "Core Language & Concurrency",
        skills: ["C++20", "STL Concurrency", "std::thread", "std::mutex", "std::lock"]
      },
      {
        category: "Safety & Memory",
        skills: ["RAII Guarantees", "Smart Pointers", "Valgrind", "AddressSanitizer", "TSan"]
      },
      {
        category: "Build & Tooling",
        skills: ["CMake", "GCC 13", "Clang", "GoogleTest"]
      }
    ],
    techPills: [
      { label: "C++20", bg: "pill-white" },
      { label: "Multithreading", bg: "pill-lime" },
      { label: "std::lock", bg: "pill-cyan" },
      { label: "Low Latency", bg: "pill-yellow" },
      { label: "Valgrind Clean", bg: "pill-coral" }
    ],

    // 8. System Architecture
    architectureOverview: "Low-latency multithreaded systems architecture designed around synchronized memory barriers, thread worker pools, and synchronous disk journaling.",
    architectureLayers: [
      {
        layer: "Transaction Ingestion",
        title: "Thread-Safe Ingestion Queue",
        description: "Accepts concurrent transfer requests from client threads and routes them to worker pools.",
        tech: "C++20 std::queue, std::condition_variable"
      },
      {
        layer: "Concurrency Lock Controller",
        title: "Deadlock-Avoidance Mutex Guard",
        description: "Acquires locks on source and destination account pairs atomically without deadlock.",
        tech: "std::lock, std::unique_lock defer_lock"
      },
      {
        layer: "Ledger Core Engine",
        title: "Arithmetic Balance Validator",
        description: "Verifies account solvency and performs atomic balance debit and credit mutations.",
        tech: "Modern C++20 Standard Library"
      },
      {
        layer: "Durability & Recovery",
        title: "Binary Write-Ahead Logger (WAL)",
        description: "Flushes binary journal entries to disk before locks release, enabling crash replay.",
        tech: "C++ File Streams, std::filesystem"
      }
    ],

    // 9. How It Works
    howItWorks: [
      {
        step: "01",
        title: "Transfer Request Enters Pool",
        description: "Incoming transfer request specifies Source Account ID, Target Account ID, and Amount in cents."
      },
      {
        step: "02",
        title: "Deadlock-Free Mutex Locking",
        description: "Worker thread uses std::lock to acquire locks on both account mutexes simultaneously without deadlock."
      },
      {
        step: "03",
        title: "Solvency & Boundary Verification",
        description: "Engine verifies source account has cleared balance >= transfer amount and checks account status."
      },
      {
        step: "04",
        title: "Atomic Debit & Credit Mutation",
        description: "Debits source account balance and credits target account balance in a single synchronized memory block."
      },
      {
        step: "05",
        title: "WAL Disk Flush & RAII Unlock",
        description: "Transaction entry is written to the WAL binary journal; lock destructors release account mutexes automatically."
      }
    ],

    // 10. My Role & Contributions
    myRole: "Systems Software Engineer & C++ Developer",
    contributions: [
      "Engineered the multithreaded transaction engine achieving over 50,000 atomic transfers per second.",
      "Implemented the deadlock-avoidance simultaneous locking protocol eliminating thread lockups.",
      "Developed the binary Write-Ahead Logging (WAL) subsystem for crash resilience and ledger replay.",
      "Verified complete memory safety and race condition freedom using Valgrind, ASan, and TSan."
    ]
  }
];
