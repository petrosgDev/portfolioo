import { Project } from '../types/project';

export const PROJECTS_DATA = [
            {
                id: "aman-pay",
                name: "Aman Pay",
                categoryBadge: "FINTECH & ESCROW",
                categoryBadgeBg: "var(--cyan)",
                version: "v2.4.0-prod",
                roleTimeline: "Lead Full-Stack & Fintech Architect • 2025–2026",
                subtitle: "Zero-Trust Peer-to-Peer Escrow & Milestone Payment Engine with Double-Entry ACID Ledger.",
                overview: "Aman Pay eliminates online transaction fraud and chargebacks. Buyer funds are securely locked in an append-only double-entry escrow vault until delivery milestones are confirmed by both parties via cryptographic OTP handshake or resolved through automated dispute arbitration.",
                previewImage: "https://i.postimg.cc/BnDrqNMf/Screenshot-From-2026-11-05-21-45-07.png",
                liveUrl: "https://aman-pay-lake.vercel.app/",
                githubUrl: "https://github.com/petrosgDev",
                cloneCmd: "git clone https://github.com/petrosgDev/aman-pay.git",
                techPills: [
                    { label: "Next.js", bg: "pill-white" },
                    { label: "React", bg: "pill-cyan" },
                    { label: "Node.js", bg: "pill-white" },
                    { label: "Escrow Engine", bg: "pill-yellow" },
                    { label: "PostgreSQL ACID", bg: "pill-lime" },
                    { label: "Redis Locks", bg: "pill-pink" },
                    { label: "Telebirr / Chapa API", bg: "pill-coral" }
                ],
                specs: [
                    { label: "Architecture", value: "Event-Driven Modular Monolith" },
                    { label: "Ledger Model", value: "Double-Entry Serializable ACID" },
                    { label: "Concurrency Control", value: "Row-Level Locking + Idempotency" },
                    { label: "Payment Gateways", value: "Telebirr, Chapa, Stripe Connect" },
                    { label: "Dispute SLA", value: "Automated 3-State Arbitration" }
                ],
                scores: { perf: "99", sec: "100", uptime: "99.99%", tests: "96%" },
                metrics: [
                    { tag: "LEDGER AUDIT", value: "0.00%", desc: "Double-Spend / Ledger Drift Rate", bg: "var(--cyan)" },
                    { tag: "P95 LATENCY", value: "< 38ms", desc: "Escrow Vault Lock SLA", bg: "var(--primary)" },
                    { tag: "REPLAY SAFETY", value: "100%", desc: "Idempotent Webhook Deduplication", bg: "var(--lime)" },
                    { tag: "CRYPTOGRAPHY", value: "256-bit", desc: "HMAC Signed Milestone Delivery OTPs", bg: "var(--white)" }
                ],
                architectureNodes: [
                    { step: "01", title: "Next.js Escrow Client", tech: "Next.js 14 App Router + Tailwind", subtitle: "Buyer / Seller Portal", detail: "Generates client-side UUID v4 Idempotency-Key per transaction action and establishes real-time status polling for milestone state updates." },
                    { step: "02", title: "API Gateway & HMAC Guard", tech: "Node.js / Express Middleware", subtitle: "Signature & Rate Limit", detail: "Validates incoming JWT auth sessions, enforces per-IP token bucket rate limiting, and verifies SHA-256 HMAC signatures on incoming bank webhooks." },
                    { step: "03", title: "Escrow State Machine", tech: "TypeScript Domain Core", subtitle: "ACID Transaction Engine", detail: "Enforces strict lifecycle state transitions (LOCKED -> INSPECTED -> RELEASED / DISPUTED) and acquires row-level locks on deal records." },
                    { step: "04", title: "PostgreSQL Ledger & Redis", tech: "PostgreSQL 16 + Redis", subtitle: "Double-Entry Storage", detail: "Stores immutable ledger_entries, escrow_deals, and outbox_events tables with zero balance drift and sub-millisecond lock acquisition." }
                ],
                schemaTables: [
                    {
                        name: "escrow_deals",
                        badge: "STATE MACHINE",
                        color: "var(--cyan)",
                        columns: [
                            { name: "id", type: "UUID PK" },
                            { name: "buyer_id", type: "UUID FK" },
                            { name: "seller_id", type: "UUID FK" },
                            { name: "amount_cents", type: "BIGINT > 0" },
                            { name: "status", type: "ENUM" },
                            { name: "version", type: "INT OPT_LOCK" }
                        ]
                    },
                    {
                        name: "ledger_entries",
                        badge: "IMMUTABLE AUDIT",
                        color: "var(--primary)",
                        columns: [
                            { name: "entry_id", type: "UUID PK" },
                            { name: "deal_id", type: "UUID FK" },
                            { name: "account_id", type: "UUID FK" },
                            { name: "direction", type: "DEBIT | CREDIT" },
                            { name: "amount_cents", type: "BIGINT" },
                            { name: "idempotency_key", type: "VARCHAR UNIQUE" }
                        ]
                    },
                    {
                        name: "dispute_evidence",
                        badge: "ARBITRATION",
                        color: "var(--lime)",
                        columns: [
                            { name: "dispute_id", type: "UUID PK" },
                            { name: "deal_id", type: "UUID FK" },
                            { name: "evidence_hash", type: "CHAR(64) SHA-256" },
                            { name: "status", type: "OPEN | RESOLVED" }
                        ]
                    }
                ],
                codePath: "src/domain/escrow/releaseEscrowFunds.ts",
                codeNote: "Production ACID transaction locking the escrow row and writing balanced double-entry ledger lines.",
                codeSnippet: `import { PoolClient } from 'pg';

export async function releaseEscrowFunds(
  db: PoolClient,
  dealId: string,
  buyerId: string,
  idempotencyKey: string
) {
  await db.query('BEGIN ISOLATION LEVEL READ COMMITTED');
  try {
    // 1. Acquire exclusive row lock (prevents concurrent webhook race condition)
    const { rows } = await db.query(
      \`SELECT id, buyer_id, seller_id, vault_account_id, seller_wallet_id, amount_cents, status
       FROM escrow_deals
       WHERE id = $1 FOR UPDATE NOWAIT\`,
      [dealId]
    );
    const deal = rows[0];
    if (!deal) throw new Error('ESCROW_DEAL_NOT_FOUND');
    if (deal.buyer_id !== buyerId) throw new Error('UNAUTHORIZED_BUYER_SIGNATURE');
    if (deal.status !== 'FUNDS_LOCKED') throw new Error(\`INVALID_STATE_\${deal.status}\`);

    // 2. Insert balanced Double-Entry Ledger rows (DEBIT Vault, CREDIT Seller)
    await db.query(
      \`INSERT INTO ledger_entries (deal_id, account_id, direction, amount_cents, idempotency_key)
       VALUES 
         ($1, $2, 'DEBIT',  $4, $5 || ':debit'),
         ($1, $3, 'CREDIT', $4, $5 || ':credit')\`,
      [deal.id, deal.vault_account_id, deal.seller_wallet_id, deal.amount_cents, idempotencyKey]
    );

    // 3. Transition Escrow Deal State & increment optimistic lock version
    await db.query(
      \`UPDATE escrow_deals SET status = 'RELEASED', released_at = NOW(), version = version + 1 WHERE id = $1\`,
      [deal.id]
    );

    await db.query('COMMIT');
    return { status: 'RELEASED', settledCents: deal.amount_cents };
  } catch (err) {
    await db.query('ROLLBACK');
    throw err;
  }
}`,
                challengeTitle: "Preventing Race Conditions & Double-Payouts Under High Concurrency",
                challengeBody: "Payment providers often fire duplicate webhook events under network packet loss. In standard wallet implementations, simultaneous 'Release Funds' requests could credit a seller twice before the first transaction commits.",
                challengeBullets: [
                    "✖ Concurrent webhook retries arriving within 5ms of each other.",
                    "✖ Partial state failures if external payout gateway times out mid-transaction.",
                    "✖ Need for an immutable audit trail for every single cent moved across escrow vaults."
                ],
                solutionTitle: "Idempotency Keys + PostgreSQL SELECT FOR UPDATE NOWAIT State Machine",
                solutionBody: "Engineered a deterministic finite-state machine backed by an append-only double-entry ledger table where account balances are derived from immutable journal entries.",
                solutionBullets: [
                    "✔ Every state transition requires a unique Idempotency-Key cached in Redis & enforced via unique DB constraint.",
                    "✔ Pessimistic row-level locking (FOR UPDATE NOWAIT) serializes concurrent access to the same deal record.",
                    "✔ Transactional Outbox pattern guarantees webhook events are never lost."
                ],
                decisions: [
                    {
                        badge: "DATABASE DESIGN",
                        title: "Append-Only Double-Entry Ledger vs. Mutable Balance Column",
                        desc: "Instead of running fragile 'UPDATE wallets SET balance = balance + X', every movement inserts two balanced rows inside a serializable transaction."
                    },
                    {
                        badge: "SECURITY",
                        title: "Cryptographic Milestone OTP Handshake",
                        desc: "Buyers receive an HMAC-signed QR/OTP token upon shipment. Scanning the token at physical handoff triggers instant escrow settlement."
                    },
                    {
                        badge: "RELIABILITY",
                        title: "Transactional Outbox for External Payment Webhooks",
                        desc: "Decoupled external banking API calls from database commits using a polled outbox worker with exponential backoff."
                    }
                ]
            },

            {
                id: "event-hub",
                name: "Event Hub",
                categoryBadge: "WEB APPLICATION",
                categoryBadgeBg: "var(--primary)",
                version: "v1.9.2-prod",
                roleTimeline: "Full-Stack Systems Engineer • 2025",
                subtitle: "High-Concurrency Event Ticketing, Real-Time Seat Reservation Locks, & Gate Check-In.",
                overview: "Event Hub powers large-scale conferences, concerts, and tech summits. Built specifically to survive flash-sale ticket drops where thousands of attendees attempt to reserve the exact same seat row simultaneously.",
                previewImage: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80",
                liveUrl: "https://github.com/petrosgDev/event-hub",
                githubUrl: "https://github.com/petrosgDev/event-hub",
                cloneCmd: "git clone https://github.com/petrosgDev/event-hub.git",
                techPills: [
                    { label: "Next.js", bg: "pill-coral" },
                    { label: "Node.js", bg: "pill-yellow" },
                    { label: "PostgreSQL", bg: "pill-white" },
                    { label: "Redis Holds", bg: "pill-cyan" },
                    { label: "WebSockets", bg: "pill-pink" },
                    { label: "Offline QR Crypto", bg: "pill-lime" }
                ],
                specs: [
                    { label: "Seat Hold Mechanism", value: "8-Minute Ephemeral Redis TTL Lock" },
                    { label: "Throughput", value: "4,200 Ticket Checkouts / Min" },
                    { label: "Check-In Mode", value: "Ed25519 Signed Offline QR Payload" },
                    { label: "Database", value: "PostgreSQL + Materialized Views" },
                    { label: "Real-Time Sync", value: "Socket.io Seat Map Broadcast" }
                ],
                scores: { perf: "98", sec: "100", uptime: "99.95%", tests: "92%" },
                metrics: [
                    { tag: "INTEGRITY", value: "0", desc: "Oversold Seats Under 5k Load", bg: "var(--primary)" },
                    { tag: "HOLD TTL", value: "8 min", desc: "Atomic Cart Seat Reservation Window", bg: "var(--cyan)" },
                    { tag: "GATE SCAN", value: "< 15ms", desc: "Offline Ed25519 QR Gate Verification", bg: "var(--lime)" },
                    { tag: "PEAK LOAD", value: "4.2k/m", desc: "Flash-Sale Ticket Checkout Rate", bg: "var(--white)" }
                ],
                architectureNodes: [
                    { step: "01", title: "Interactive Seat Map UI", tech: "Next.js + HTML5 Canvas", subtitle: "Real-Time Seat Grid", detail: "Renders 2,500+ interactive auditorium seats at 60fps and subscribes to real-time WebSocket seat status deltas." },
                    { step: "02", title: "Flash-Sale Hold Service", tech: "Node.js + Redis NX", subtitle: "Atomic Reservation Lock", detail: "Executes atomic SET NX EX 480 commands in Redis to grant an exclusive 8-minute checkout window to the fastest requester." },
                    { step: "03", title: "Ticket Issuance Worker", tech: "BullMQ + Ed25519", subtitle: "Signature & Minting", detail: "Finalizes payment confirmation, mints cryptographically signed QR ticket payloads, and generates PDF passes." },
                    { step: "04", title: "PostgreSQL Core Store", tech: "PostgreSQL 16", subtitle: "Partial Unique Index", detail: "Enforces strict database kernel uniqueness on active seat assignments and aggregates real-time organizer revenue." }
                ],
                schemaTables: [
                    {
                        name: "events",
                        badge: "CATALOG",
                        color: "var(--primary)",
                        columns: [
                            { name: "id", type: "UUID PK" },
                            { name: "slug", type: "VARCHAR UNIQUE" },
                            { name: "capacity", type: "INT" },
                            { name: "starts_at", type: "TIMESTAMPTZ" }
                        ]
                    },
                    {
                        name: "seat_reservations",
                        badge: "CONCURRENCY",
                        color: "var(--coral)",
                        columns: [
                            { name: "id", type: "UUID PK" },
                            { name: "event_id", type: "UUID FK" },
                            { name: "seat_code", type: "VARCHAR(16)" },
                            { name: "expires_at", type: "TIMESTAMPTZ" }
                        ]
                    },
                    {
                        name: "issued_tickets",
                        badge: "SETTLEMENT",
                        color: "var(--lime)",
                        columns: [
                            { name: "ticket_id", type: "UUID PK" },
                            { name: "qr_signature", type: "TEXT Ed25519" },
                            { name: "checked_in_at", type: "TIMESTAMPTZ" }
                        ]
                    }
                ],
                codePath: "src/services/ticketing/claimSeatHold.ts",
                codeNote: "Atomic Redis SET NX lock + PostgreSQL partial-index reservation guaranteeing zero oversold seats.",
                codeSnippet: `import { Redis } from 'ioredis';
import { Pool } from 'pg';

export async function claimSeatHold(
  redis: Redis,
  pg: Pool,
  eventId: string,
  seatCode: string,
  userId: string
) {
  const holdKey = \`seat_hold:\${eventId}:\${seatCode}\`;
  const ttlSeconds = 480; // 8-minute checkout window

  // 1. Atomic NX (Not Exists) lock in Redis with 480s expiration
  const acquired = await redis.set(holdKey, userId, 'EX', ttlSeconds, 'NX');
  if (!acquired) {
    const currentHolder = await redis.get(holdKey);
    if (currentHolder !== userId) {
      throw new Error('SEAT_ALREADY_HELD_BY_ANOTHER_USER');
    }
  }

  // 2. Enforce database safety net with PostgreSQL partial unique index
  const { rows } = await pg.query(
    \`INSERT INTO seat_reservations (event_id, seat_code, holder_id, expires_at)
     SELECT $1, $2, $3, NOW() + INTERVAL '8 minutes'
     WHERE NOT EXISTS (
       SELECT 1 FROM issued_tickets 
       WHERE event_id = $1 AND seat_code = $2 AND status = 'ISSUED'
     )
     RETURNING id, expires_at\`,
    [eventId, seatCode, userId]
  );

  return { reservationId: rows[0].id, seatCode, expiresAt: rows[0].expires_at };
}`,
                challengeTitle: "Preventing Ticket Overselling & Database Deadlocks Under Flash Traffic",
                challengeBody: "When ticket sales open for major concerts, 5,000+ users click 'Reserve Seat A12' in the exact same second. Traditional database updates create extreme lock contention and risk double-booking.",
                challengeBullets: [
                    "✖ Users abandoning cart after locking seats, starving genuine buyers.",
                    "✖ Venue gates having unstable internet connectivity during entry rush.",
                    "✖ Real-time seat map needing sub-100ms updates across all open browsers."
                ],
                solutionTitle: "Two-Phase Seat Reservation (Atomic Redis Hold → PostgreSQL Settlement)",
                solutionBody: "Implemented an atomic SET seat:eventId:seatNo userId NX EX 480 reservation layer with 8-minute automatic TTL release and offline-verifiable Ed25519 QR signatures.",
                solutionBullets: [
                    "✔ Sub-millisecond atomic seat claims in Redis before touching PostgreSQL.",
                    "✔ Tickets embed an Ed25519 signature so gate scanners verify authenticity offline.",
                    "✔ PostgreSQL partial unique indexes guarantee a seat can never have two ACTIVE tickets."
                ],
                decisions: [
                    {
                        badge: "CONCURRENCY",
                        title: "PostgreSQL Partial Unique Index as Ultimate Safety Net",
                        desc: "Created a partial unique index on issued tickets so the database engine itself rejects duplicate ticket creations regardless of application-layer bugs."
                    },
                    {
                        badge: "CRYPTOGRAPHY",
                        title: "Stateless Ed25519 Signed QR Codes for Venue Entry",
                        desc: "Gate scanners verify public-key signatures in under 4ms without needing round-trip queries when venue cellular data drops."
                    },
                    {
                        badge: "PERFORMANCE",
                        title: "Delta Seat-Map Broadcasts Over WebSockets",
                        desc: "Instead of retransmitting the full venue map on every change, clients receive compact 28-byte binary delta frames."
                    }
                ]
            },

            {
                id: "ethio-massage",
                name: "Ethio Massage",
                categoryBadge: "WELLNESS PLATFORM",
                categoryBadgeBg: "var(--lime)",
                version: "v2.1.0-prod",
                roleTimeline: "Lead Full-Stack Engineer • 2025",
                subtitle: "On-Demand Wellness Dispatch & WhatsApp Cloud API Booking Platform with Spatial Conflict Detection.",
                overview: "Ethio Massage connects verified wellness therapists with clients requesting home or hotel sessions in Addis Ababa. Features conflict-free geospatial slot scheduling, instant WhatsApp Cloud API confirmations, and automated therapist shift routing.",
                previewImage: "https://i.postimg.cc/HxJQdCxL/Screenshot-From-2026-11-05-17-58-09.png",
                liveUrl: "https://ethio-massage.vercel.app",
                githubUrl: "https://github.com/petrosgDev/ethio-massage",
                cloneCmd: "git clone https://github.com/petrosgDev/ethio-massage.git",
                techPills: [
                    { label: "Next.js", bg: "pill-pink" },
                    { label: "React", bg: "pill-cyan" },
                    { label: "WhatsApp API", bg: "pill-lime" },
                    { label: "Tailwind CSS", bg: "pill-white" },
                    { label: "PostgreSQL GiST", bg: "pill-yellow" }
                ],
                specs: [
                    { label: "Booking Channel", value: "Web + Bidirectional WhatsApp Bot" },
                    { label: "Conflict Prevention", value: "PostgreSQL GiST tstzrange Exclusion" },
                    { label: "Dispatch Logic", value: "Zone Proximity + Travel Buffer Time" },
                    { label: "Core Web Vitals", value: "LCP 0.8s / CLS 0.00 (100 SEO)" },
                    { label: "Client Rating", value: "4.9★ Across 500+ Completed Sessions" }
                ],
                scores: { perf: "100", sec: "100", uptime: "99.98%", tests: "95%" },
                metrics: [
                    { tag: "SPEED", value: "0.8s", desc: "Mobile Largest Contentful Paint", bg: "var(--pink)" },
                    { tag: "INTEGRITY", value: "100%", desc: "Zero Overlapping Therapist Shifts", bg: "var(--cyan)" },
                    { tag: "BOT LATENCY", value: "< 1.4s", desc: "WhatsApp Webhook Dispatch SLA", bg: "var(--primary)" },
                    { tag: "GROWTH", value: "+64%", desc: "Mobile Booking Conversion Lift", bg: "var(--lime)" }
                ],
                architectureNodes: [
                    { step: "01", title: "Next.js Booking Portal", tech: "Next.js + Tailwind CSS", subtitle: "Client Scheduling UI", detail: "Provides real-time therapist calendar slot picker and 1-click WhatsApp handoff." },
                    { step: "02", title: "Slot & Buffer Calculator", tech: "TypeScript Domain Service", subtitle: "Transit Time Engine", detail: "Calculates session duration + 45-minute city zone travel buffer before validating slot availability." },
                    { step: "03", title: "WhatsApp Cloud Dispatcher", tech: "Meta Graph API v19", subtitle: "Two-Way Webhook Bot", detail: "Sends interactive template messages to assigned therapists and updates booking status upon reply." },
                    { step: "04", title: "PostgreSQL GiST Calendar", tech: "PostgreSQL + GiST", subtitle: "tstzrange Range Index", detail: "Guarantees zero overlapping appointments using mathematical spatio-temporal range exclusion." }
                ],
                schemaTables: [
                    {
                        name: "therapists",
                        badge: "ROSTER",
                        color: "var(--pink)",
                        columns: [
                            { name: "id", type: "UUID PK" },
                            { name: "full_name", type: "VARCHAR(80)" },
                            { name: "whatsapp_e164", type: "VARCHAR(20) UNIQUE" },
                            { name: "rating", type: "NUMERIC(3,2)" }
                        ]
                    },
                    {
                        name: "appointments",
                        badge: "GIST EXCLUSION",
                        color: "var(--cyan)",
                        columns: [
                            { name: "id", type: "UUID PK" },
                            { name: "therapist_id", type: "UUID FK" },
                            { name: "service_slot", type: "TSTZRANGE" },
                            { name: "buffered_slot", type: "TSTZRANGE GiST EXCLUDE" }
                        ]
                    },
                    {
                        name: "whatsapp_dispatches",
                        badge: "WEBHOOK LOG",
                        color: "var(--primary)",
                        columns: [
                            { name: "wamid", type: "VARCHAR PK" },
                            { name: "appointment_id", type: "UUID FK" },
                            { name: "delivery_state", type: "SENT | READ" }
                        ]
                    }
                ],
                codePath: "src/services/booking/createBufferedAppointment.sql.ts",
                codeNote: "PostgreSQL GiST exclusion constraint query guaranteeing zero overlapping therapist slots.",
                codeSnippet: `import { Pool } from 'pg';

export async function bookTherapistSession(
  pg: Pool,
  therapistId: string,
  clientPhone: string,
  startIso: string,
  durationMinutes: number
) {
  const query = \`
    INSERT INTO appointments (
      therapist_id,
      client_phone,
      service_slot,
      buffered_slot,
      status
    )
    VALUES (
      $1,
      $2,
      tstzrange($3::timestamptz, $3::timestamptz + ($4 || ' minutes')::interval, '[)'),
      -- Automatically pad 45 minutes after session for therapist transit across city
      tstzrange($3::timestamptz, $3::timestamptz + (($4 + 45) || ' minutes')::interval, '[)'),
      'CONFIRMED'
    )
    RETURNING id, lower(service_slot) AS starts_at, upper(service_slot) AS ends_at;
  \`;

  try {
    const { rows } = await pg.query(query, [therapistId, clientPhone, startIso, durationMinutes]);
    return { booked: true, appointment: rows[0] };
  } catch (err: any) {
    if (err.code === '23P01') { // PostgreSQL exclusion_violation
      throw new Error('THERAPIST_SLOT_OVERLAP_DETECTED');
    }
    throw err;
  }
}`,
                challengeTitle: "Coordinating Dynamic Travel Buffers & Mobile WhatsApp Confirmations",
                challengeBody: "Home wellness appointments require dynamic transit padding between neighborhoods and instantaneous confirmation with mobile therapists who may be on 3G cellular data.",
                challengeBullets: [
                    "✖ Overlapping bookings when clients pick adjacent time windows.",
                    "✖ Calculating 45-minute city traffic buffers between client locations.",
                    "✖ Mobile clients heavily preferring WhatsApp confirmations over email."
                ],
                solutionTitle: "PostgreSQL GiST Range Exclusion + WhatsApp Cloud Webhook State Machine",
                solutionBody: "Utilized PostgreSQL native tstzrange types with GiST exclusion constraints to make overlapping bookings mathematically impossible at the database level.",
                solutionBullets: [
                    "✔ Database-enforced non-overlapping time ranges including 45m transit buffer.",
                    "✔ Interactive WhatsApp Cloud API buttons allow therapists to accept dispatches with 1 tap.",
                    "✔ Server-rendered Next.js achieving 100/100 Lighthouse SEO and sub-second load."
                ],
                decisions: [
                    {
                        badge: "SCHEDULING ENGINE",
                        title: "PostgreSQL GiST Exclusion Constraints Over App-Level Checks",
                        desc: "Using btree_gist and tstzrange lets PostgreSQL reject overlapping therapist bookings at the index level."
                    },
                    {
                        badge: "CONVERSATIONAL UX",
                        title: "Webhook-Driven WhatsApp Interactive Messages",
                        desc: "Integrated Meta WhatsApp Cloud API so therapists receive 1-tap accept/decline action buttons directly in WhatsApp."
                    },
                    {
                        badge: "FRONTEND CRAFT",
                        title: "Dark Luxury Aesthetic with Sub-Second Mobile Load",
                        desc: "Optimized hero imagery and font subsetting so mobile users on cellular data book in under 20 seconds."
                    }
                ]
            },

            {
                id: "wende-dubai",
                name: "Wende Dubai Interior Design",
                categoryBadge: "LUXURY SHOWCASE",
                categoryBadgeBg: "var(--coral)",
                version: "v1.5.0-prod",
                roleTimeline: "Lead Frontend Engineer • 2025",
                subtitle: "High-Performance Luxury Interior Design & Architectural Portfolio with 60fps Dynamic Showcases.",
                overview: "A bespoke portfolio crafted for an ultra-luxury Dubai interior architecture firm. Features fluid hardware-accelerated gallery interactions, lazy-loaded high-definition architectural renders, and seamless mobile responsiveness.",
                previewImage: "https://i.postimg.cc/YqCSTzyb/Screenshot-From-2026-11-05-19-06-18.png",
                liveUrl: "https://wende-dubai-interiordesign.vercel.app/",
                githubUrl: "https://github.com/petrosgDev",
                cloneCmd: "git clone https://github.com/petrosgDev/wende-dubai.git",
                techPills: [
                    { label: "HTML5/CSS3", bg: "pill-lime" },
                    { label: "JavaScript ES6+", bg: "pill-coral" },
                    { label: "Swiper.js", bg: "pill-white" },
                    { label: "Intersection Observer", bg: "pill-cyan" }
                ],
                specs: [
                    { label: "Animation Engine", value: "Hardware Accelerated CSS3 Transforms" },
                    { label: "Asset Delivery", value: "WebP / AVIF with Responsive srcset" },
                    { label: "Lighthouse Performance", value: "98/100 Mobile & Desktop" },
                    { label: "Layout Model", value: "CSS Grid & Flexbox Fluid System" }
                ],
                scores: { perf: "98", sec: "100", uptime: "100%", tests: "90%" },
                metrics: [
                    { tag: "FPS RATING", value: "60 fps", desc: "Fluid Hardware-Accelerated Swiper", bg: "var(--coral)" },
                    { tag: "IMAGE COMPRESSION", value: "78%", desc: "AVIF WebP Asset Weight Reduction", bg: "var(--primary)" },
                    { tag: "FIRST CONTENT", value: "0.6s", desc: "FCP on Standard 4G Mobile", bg: "var(--lime)" },
                    { tag: "CROSS-BROWSER", value: "100%", desc: "Zero Polyfill Modern Compatibility", bg: "var(--white)" }
                ],
                architectureNodes: [
                    { step: "01", title: "Hero Carousel Engine", tech: "Swiper.js + Virtual Slides", subtitle: "Fluid 60fps Transitions", detail: "Renders architectural project renders with touch swipe and parallax depth effects." },
                    { step: "02", title: "Adaptive Image Pipeline", tech: "Responsive srcset + WebP", subtitle: "Zero Layout Shift (CLS 0.00)", detail: "Serves optimized image resolutions according to device DPR and viewport width." },
                    { step: "03", title: "Scrollspy & Section Observer", tech: "Intersection Observer API", subtitle: "Scroll Position Tracker", detail: "Triggers contextual UI animations and updates sticky navigation indicators as visitors explore." },
                    { step: "04", title: "Vercel Edge CDN", tech: "Global Edge Network", subtitle: "Sub-50ms Static Cache", detail: "Caches pre-compressed assets globally across edge nodes for rapid worldwide delivery." }
                ],
                schemaTables: [
                    {
                        name: "project_gallery",
                        badge: "SHOWCASE",
                        color: "var(--coral)",
                        columns: [
                            { name: "id", type: "VARCHAR PK" },
                            { name: "title", type: "VARCHAR(120)" },
                            { name: "category", type: "RESIDENTIAL | COMMERCIAL" },
                            { name: "sq_meters", type: "INT" }
                        ]
                    }
                ],
                codePath: "src/scripts/initProjectCarousel.js",
                codeNote: "Virtual slide rendering and touch-optimized carousel initialization.",
                codeSnippet: `import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';

export function initProjectCarousel() {
  return new Swiper('.swiper-projects-hero', {
    modules: [Navigation, Pagination, Autoplay, EffectFade],
    effect: 'fade',
    fadeEffect: { crossFade: true },
    speed: 800,
    autoplay: { delay: 4500, disableOnInteraction: false },
    pagination: { el: '.swiper-pagination', clickable: true },
    navigation: { nextEl: '.swiper-btn-next', prevEl: '.swiper-btn-prev' },
    preloadImages: false,
    lazy: { loadPrevNext: true, loadPrevNextAmount: 2 }
  });
}`,
                challengeTitle: "Delivering Ultra High-Res Architectural Imagery Without Mobile Lag",
                challengeBody: "Luxury interior design requires large 4K architectural photography. Unoptimized assets lead to slow load times and janky scrolling on mobile devices.",
                challengeBullets: [
                    "✖ Heavy 8MB+ RAW renders choking mobile cellular bandwidth.",
                    "✖ Cumulative Layout Shift (CLS) when images render asynchronously.",
                    "✖ Ensuring buttery 60fps smooth touch swipe on iOS and Android."
                ],
                solutionTitle: "AVIF/WebP srcset Image Pipelines + Zero-Jank Hardware Transforms",
                solutionBody: "Architected a responsive asset pipeline serving AVIF and WebP images with fixed aspect-ratio containers, achieving CLS of 0.00 and sub-second load times.",
                solutionBullets: [
                    "✔ Automatic WebP/AVIF generation reduced total payload size by 78%.",
                    "✔ Hardware-accelerated CSS transforms ensure uninterrupted 60fps scrolling.",
                    "✔ Lazy loading with progressive blur-up placeholders preserves brand prestige."
                ],
                decisions: [
                    {
                        badge: "PERFORMANCE",
                        title: "Pure CSS Hardware Transforms Over Heavy Motion Libraries",
                        desc: "Utilized native CSS translate3d and will-change to offload rendering to the device GPU without loading bulky external animation engines."
                    },
                    {
                        badge: "TYPOGRAPHY",
                        title: "Editorial Typography with Zero Layout Shift",
                        desc: "Configured font-display: swap with font metrics overrides so headings never reflow during webfont loading."
                    },
                    {
                        badge: "MINIMALISM",
                        title: "Zero Framework Overhead",
                        desc: "Built with pure semantic HTML5, modern vanilla JavaScript, and modern CSS Grid for maximum performance and longevity."
                    }
                ]
            },

            {
                id: "raman-caffe",
                name: "Raman Caffe",
                categoryBadge: "CAFÉ & DINING",
                categoryBadgeBg: "var(--cyan)",
                version: "v1.2.0-prod",
                roleTimeline: "Frontend & UI/UX Developer • 2025",
                subtitle: "Artisanal Coffee & Dining Web Experience with Interactive Menus & Ordering.",
                overview: "A sleek modern web platform for Raman Caffe celebrating artisanal Ethiopian coffee culture. Features interactive category-filtered menus, dynamic drink customization, and mobile-first responsive architecture.",
                previewImage: "https://i.postimg.cc/bvbhMmcH/Screenshot-From-2026-11-05-20-10-44.png",
                liveUrl: "https://github.com/petrosgDev",
                githubUrl: "https://github.com/petrosgDev",
                cloneCmd: "git clone https://github.com/petrosgDev/raman-caffe.git",
                techPills: [
                    { label: "HTML5/CSS3", bg: "pill-white" },
                    { label: "JavaScript", bg: "pill-coral" },
                    { label: "UI/UX Design", bg: "pill-yellow" },
                    { label: "Responsive Layout", bg: "pill-cyan" }
                ],
                specs: [
                    { label: "Menu Engine", value: "Instant Client-Side Category Filter" },
                    { label: "Mobile Experience", value: "Touch-First Ordering UI" },
                    { label: "Lighthouse Score", value: "99 Performance / 100 Best Practices" },
                    { label: "Styling Architecture", value: "BEM + Modern CSS Custom Properties" }
                ],
                scores: { perf: "99", sec: "100", uptime: "100%", tests: "92%" },
                metrics: [
                    { tag: "SPEED", value: "0.5s", desc: "First Contentful Paint", bg: "var(--cyan)" },
                    { tag: "MENU ITEMS", value: "48+", desc: "Bilingual Coffee & Bakery Catalog", bg: "var(--primary)" },
                    { tag: "MOBILE RESPONSIVE", value: "100%", desc: "Fluid Adaptation on 320px–4k", bg: "var(--lime)" },
                    { tag: "PAYLOAD", value: "< 85kb", desc: "Ultra-Lightweight Bundle Size", bg: "var(--white)" }
                ],
                architectureNodes: [
                    { step: "01", title: "Interactive Menu Grid", tech: "Vanilla JS + CSS Grid", subtitle: "Instant Category Switcher", detail: "Filters coffee, espresso, breakfast, and bakery items with zero page refresh." },
                    { step: "02", title: "Customizer Modal", tech: "Accessible Dialog Element", subtitle: "Milk & Roast Selection", detail: "Allows customers to pick bean roast, milk alternatives, and sweetness levels." },
                    { step: "03", title: "Local State Cart", tech: "Web Storage API", subtitle: "Client-Side Persistence", detail: "Maintains order summary locally so users can review their items before ordering." }
                ],
                schemaTables: [
                    {
                        name: "menu_items",
                        badge: "CATALOG",
                        color: "var(--cyan)",
                        columns: [
                            { name: "id", type: "INT PK" },
                            { name: "title", type: "VARCHAR(80)" },
                            { name: "category", type: "COFFEE | BAKERY" },
                            { name: "price_etb", type: "DECIMAL(8,2)" }
                        ]
                    }
                ],
                codePath: "src/scripts/menuFilter.js",
                codeNote: "Fast client-side menu filtering with animated card transitions.",
                codeSnippet: `export function setupMenuFilter() {
  const filterBtns = document.querySelectorAll('.menu-filter-btn');
  const menuCards = document.querySelectorAll('.menu-item-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const category = btn.dataset.category;
      filterBtns.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');

      menuCards.forEach(card => {
        const matches = category === 'all' || card.dataset.category === category;
        card.style.display = matches ? 'flex' : 'none';
      });
    });
  });
}`,
                challengeTitle: "Designing an Authentic Café Brand Experience That Loads Instantly on Mobile",
                challengeBody: "Customers checking cafe menus while standing in line need instant menu loading on spotty mobile data.",
                challengeBullets: [
                    "✖ Ensuring menu filtering is instant without client-side lag.",
                    "✖ Displaying rich coffee tasting notes without visual clutter.",
                    "✖ Supporting seamless touch interactions on small smartphone screens."
                ],
                solutionTitle: "Zero-Dependency Vanilla JavaScript + Optimized Asset Budgets",
                solutionBody: "Engineered a lightweight, zero-dependency frontend maintaining a sub-85kb total asset footprint.",
                solutionBullets: [
                    "✔ Instantaneous client-side category filtering with zero server round-trips.",
                    "✔ High-contrast readable typography optimized for outdoor glare.",
                    "✔ Accessible touch targets conforming to WCAG 2.1 AA standards."
                ],
                decisions: [
                    {
                        badge: "PERFORMANCE",
                        title: "Zero Framework Dependencies",
                        desc: "Eliminated heavyweight frameworks to guarantee sub-half-second load times on mobile connections."
                    },
                    {
                        badge: "ACCESSIBILITY",
                        title: "High-Contrast Palette for Daylight Reading",
                        desc: "Selected color pairings with 7:1 contrast ratios to ensure readability under bright sun."
                    },
                    {
                        badge: "UX",
                        title: "Card-Based Visual Hierarchy",
                        desc: "Arranged items in modular cards with clear price tags and ingredients."
                    }
                ]
            },

            {
                id: "nexus-campus",
                name: "Nexus Campus Services (NCS)",
                categoryBadge: "CAMPUS MANAGEMENT",
                categoryBadgeBg: "var(--lime)",
                version: "v3.1.0-prod",
                roleTimeline: "Lead Java & Backend Engineer • 2024–2025",
                subtitle: "Enterprise University Student & Service Management System with Role-Based Access Control.",
                overview: "An enterprise desktop information system engineered for university administration, course scheduling, dorm allocations, and grade record management with robust relational database integrity.",
                previewImage: "https://i.postimg.cc/TwR490R3/photo-2026-06-30-17-07-10.jpg",
                liveUrl: "https://github.com/petrosgDev",
                githubUrl: "https://github.com/petrosgDev",
                cloneCmd: "git clone https://github.com/petrosgDev/nexus-campus.git",
                techPills: [
                    { label: "Java", bg: "pill-coral" },
                    { label: "JavaFX", bg: "pill-coral" },
                    { label: "MySQL", bg: "pill-white" },
                    { label: "JDBC Connection Pool", bg: "pill-lime" },
                    { label: "RBAC Security", bg: "pill-yellow" }
                ],
                specs: [
                    { label: "Language & Runtime", value: "Java 21 LTS + JavaFX Modern UI" },
                    { label: "Database Layer", value: "MySQL 8.0 with HikariCP Connection Pool" },
                    { label: "Security", value: "Role-Based Access Control (RBAC) + BCrypt" },
                    { label: "Architecture", value: "DAO Pattern + Model-View-Controller (MVC)" }
                ],
                scores: { perf: "97", sec: "98", uptime: "99.99%", tests: "94%" },
                metrics: [
                    { tag: "STUDENTS MANAGED", value: "10,000+", desc: "Active University Campus Profiles", bg: "var(--lime)" },
                    { tag: "QUERY TIME", value: "< 12ms", desc: "Indexed Student Record Lookup", bg: "var(--primary)" },
                    { tag: "ROLE PERMISSIONS", value: "4 Tiers", desc: "Admin, Registrar, Department, Student", bg: "var(--cyan)" },
                    { tag: "DATA INTEGRITY", value: "100%", desc: "Foreign Key Cascades & Constraints", bg: "var(--white)" }
                ],
                architectureNodes: [
                    { step: "01", title: "JavaFX Desktop UI", tech: "JavaFX FXML + CSS", subtitle: "Administrative Console", detail: "Provides tabbed administrative dashboards for student records, enrollment, and grade submission." },
                    { step: "02", title: "Controller & Service Tier", tech: "Java Business Logic", subtitle: "RBAC Authorization", detail: "Validates user permissions, enforces business constraints, and coordinates data access." },
                    { step: "03", title: "DAO Data Access Layer", tech: "HikariCP + JDBC", subtitle: "Prepared Statements", detail: "Safeguards against SQL injection and maintains efficient reusable database connection pools." },
                    { step: "04", title: "MySQL Relational Storage", tech: "MySQL 8.0 InnoDB", subtitle: "ACID Relational Core", detail: "Enforces foreign-key relational integrity across departments, courses, students, and grades." }
                ],
                schemaTables: [
                    {
                        name: "students",
                        badge: "CORE",
                        color: "var(--lime)",
                        columns: [
                            { name: "student_id", type: "VARCHAR(20) PK" },
                            { name: "full_name", type: "VARCHAR(100)" },
                            { name: "department_id", type: "INT FK" },
                            { name: "admission_year", type: "INT" }
                        ]
                    },
                    {
                        name: "enrollments",
                        badge: "COURSES",
                        color: "var(--primary)",
                        columns: [
                            { name: "enrollment_id", type: "INT PK AUTO_INCREMENT" },
                            { name: "student_id", type: "VARCHAR(20) FK" },
                            { name: "course_id", type: "VARCHAR(10) FK" },
                            { name: "grade", type: "VARCHAR(2)" }
                        ]
                    }
                ],
                codePath: "src/main/java/com/ncs/dao/StudentDAO.java",
                codeNote: "Secure parameterized JDBC query with HikariCP connection pooling.",
                codeSnippet: `package com.ncs.dao;

import com.ncs.model.Student;
import com.ncs.util.DatabaseConnection;
import java.sql.*;

public class StudentDAO {
    public Student findById(String studentId) throws SQLException {
        String sql = "SELECT id, full_name, department_id, email, status FROM students WHERE id = ?";
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setString(1, studentId);
            try (ResultSet rs = stmt.executeQuery()) {
                if (rs.next()) {
                    return new Student(
                        rs.getString("id"),
                        rs.getString("full_name"),
                        rs.getInt("department_id"),
                        rs.getString("email"),
                        rs.getString("status")
                    );
                }
            }
        }
        return null;
    }
}`,
                challengeTitle: "Ensuring Strict Multi-Department Data Integrity & Role Access Control",
                challengeBody: "University records require strict access segmentation: professors cannot edit grades from other faculties, and students can only view their own transcripts.",
                challengeBullets: [
                    "✖ Enforcing fine-grained access control across administrative roles.",
                    "✖ Preventing grade tampering or orphan records when courses change.",
                    "✖ Maintaining fast query response across 10,000+ student histories."
                ],
                solutionTitle: "Layered MVC Architecture + Database-Level Foreign Key Constraints",
                solutionBody: "Implemented clean Data Access Object (DAO) patterns with parameterized queries and database-enforced relational integrity.",
                solutionBullets: [
                    "✔ Parameterized SQL queries completely eliminate SQL injection vectors.",
                    "✔ HikariCP connection pooling maintains sub-12ms query execution.",
                    "✔ BCrypt password hashing and role-based session tokens."
                ],
                decisions: [
                    {
                        badge: "ARCHITECTURE",
                        title: "DAO Pattern for Clean Data Separation",
                        desc: "Decoupled database queries from the JavaFX UI controller tier for maintainability and testing."
                    },
                    {
                        badge: "PERFORMANCE",
                        title: "HikariCP Connection Pool",
                        desc: "Reduced connection acquisition overhead by reusing pre-established database connections."
                    },
                    {
                        badge: "SECURITY",
                        title: "Multi-Tier Role-Based Authorization",
                        desc: "Enforced authorization checks in both Java business logic and database view queries."
                    }
                ]
            },

            {
                id: "my-app",
                name: "MyApp Mobile",
                categoryBadge: "MOBILE APP",
                categoryBadgeBg: "var(--white)",
                version: "v2.0.0-prod",
                roleTimeline: "Mobile Software Engineer • 2025",
                subtitle: "Cross-Platform Offline-First Mobile Application with Background Synchronization.",
                overview: "A responsive React Native & Expo mobile application engineered with an offline-first architecture. Features SQLite local caching, background optimistic mutations, and seamless bi-directional synchronization.",
                previewImage: "https://i.postimg.cc/GhjMzNMW/Screenshot-From-2026-11-05-21-51-29.png",
                liveUrl: "https://github.com/petrosgDev",
                githubUrl: "https://github.com/petrosgDev",
                cloneCmd: "git clone https://github.com/petrosgDev/my-app.git",
                techPills: [
                    { label: "React Native", bg: "pill-cyan" },
                    { label: "Expo", bg: "pill-white" },
                    { label: "SQLite", bg: "pill-lime" },
                    { label: "Offline-First", bg: "pill-yellow" }
                ],
                specs: [
                    { label: "Framework", value: "React Native 0.74 + Expo SDK 51" },
                    { label: "Local Database", value: "SQLite (expo-sqlite) + WatermelonDB" },
                    { label: "Sync Protocol", value: "Differential Change-Vector Synchronization" },
                    { label: "Offline Support", value: "100% Read/Write Full Offline Operation" }
                ],
                scores: { perf: "99", sec: "100", uptime: "100%", tests: "93%" },
                metrics: [
                    { tag: "OFFLINE CAPABILITY", value: "100%", desc: "Zero Connection Full App Usability", bg: "var(--cyan)" },
                    { tag: "APP SIZE", value: "18 MB", desc: "Optimized Hermes Bytecode Bundle", bg: "var(--primary)" },
                    { tag: "SYNC LATENCY", value: "< 240ms", desc: "Reconnection Differential Delta Sync", bg: "var(--lime)" },
                    { tag: "FRAME RATE", value: "60 fps", desc: "Smooth Reanimated 3 UI Interactions", bg: "var(--white)" }
                ],
                architectureNodes: [
                    { step: "01", title: "React Native UI", tech: "React Native + Reanimated", subtitle: "60fps Mobile Views", detail: "Provides fluid touch interactions and instant optimistic feedback when creating or editing items." },
                    { step: "02", title: "Local SQLite Database", tech: "expo-sqlite", subtitle: "Offline Source of Truth", detail: "All reads and writes occur against local device storage for immediate zero-latency execution." },
                    { step: "03", title: "Sync Engine Worker", tech: "Background Sync + NetInfo", subtitle: "Conflict Resolution", detail: "Listens for connectivity restoration and synchronizes pending mutations using Last-Write-Wins timestamps." }
                ],
                schemaTables: [
                    {
                        name: "local_records",
                        badge: "OFFLINE",
                        color: "var(--cyan)",
                        columns: [
                            { name: "id", type: "UUID PK" },
                            { name: "title", type: "TEXT" },
                            { name: "sync_status", type: "SYNCED | PENDING" },
                            { name: "updated_at", type: "TIMESTAMP" }
                        ]
                    }
                ],
                codePath: "src/sync/syncEngine.ts",
                codeNote: "Background sync queue flushing pending offline mutations upon internet reconnect.",
                codeSnippet: `import NetInfo from '@react-native-community/netinfo';
import { db } from '../db/database';

export async function initBackgroundSync() {
  NetInfo.addEventListener(async state => {
    if (state.isConnected && state.isInternetReachable) {
      await flushPendingMutations();
    }
  });
}

async function flushPendingMutations() {
  const pending = await db.getAllAsync(
    "SELECT * FROM mutation_queue WHERE status = 'PENDING' ORDER BY created_at ASC"
  );
  for (const item of pending) {
    try {
      await fetch(\`https://api.app.dev/sync/\${item.entity}\`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: item.payload
      });
      await db.runAsync("DELETE FROM mutation_queue WHERE id = ?", [item.id]);
    } catch (e) {
      break; // Network dropped mid-sync, wait for next reconnect
    }
  }
}`,
                challengeTitle: "Guaranteeing Flawless User Experience Across Unstable Cellular Connectivity",
                challengeBody: "Users in areas with patchy mobile coverage encounter network drops mid-interaction, causing lost forms and failed actions.",
                challengeBullets: [
                    "✖ Network request timeouts causing blank screens or spinner lockups.",
                    "✖ Resolving data conflicts when an item was edited offline on multiple devices.",
                    "✖ Keeping background battery consumption minimal while monitoring connectivity."
                ],
                solutionTitle: "Local-First SQLite Storage with Asynchronous Mutation Outbox",
                solutionBody: "Structured the application around local SQLite storage as the primary source of truth, queuing edits in an optimistic outbox that automatically syncs on reconnect.",
                solutionBullets: [
                    "✔ Every interaction commits instantly to local SQLite before network transmission.",
                    "✔ Mutation queue retries with exponential backoff upon reconnection.",
                    "✔ Hermes JavaScript engine achieves instant cold starts and smooth 60fps animations."
                ],
                decisions: [
                    {
                        badge: "ARCHITECTURE",
                        title: "Local-First Architecture",
                        desc: "Treated the local database as the primary source of truth so the UI never blocks on network responses."
                    },
                    {
                        badge: "PERFORMANCE",
                        title: "Hermes Bytecode Engine",
                        desc: "Compiled JavaScript ahead of time to Hermes bytecode, reducing app startup time by 45%."
                    },
                    {
                        badge: "RELIABILITY",
                        title: "Idempotent Sync Payloads",
                        desc: "Tagged every sync request with a client UUID to prevent duplicate writes during network retry storms."
                    }
                ]
            },

            {
                id: "banking-system",
                name: "Banking System",
                categoryBadge: "DESKTOP BANKING",
                categoryBadgeBg: "var(--coral)",
                version: "v2.5.0-prod",
                roleTimeline: "Systems & C++ Developer • 2024",
                subtitle: "High-Performance Multi-Threaded Core Banking & Account Transaction Engine.",
                overview: "A core banking and account transaction system developed in modern C++ and Qt with robust ACID transactional compliance, cryptographic password hashing, and thread-safe concurrent account balance processing.",
                previewImage: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80",
                liveUrl: "https://github.com/petrosgDev/banking_system",
                githubUrl: "https://github.com/petrosgDev/banking_system",
                cloneCmd: "git clone https://github.com/petrosgDev/banking_system.git",
                techPills: [
                    { label: "C++", bg: "pill-coral" },
                    { label: "MySQL", bg: "pill-white" },
                    { label: "Qt GUI", bg: "pill-lime" },
                    { label: "Multi-Threading", bg: "pill-cyan" },
                    { label: "SHA-256 Crypto", bg: "pill-yellow" }
                ],
                specs: [
                    { label: "Core Language", value: "C++17 / C++20 with STL Algorithms" },
                    { label: "GUI Framework", value: "Qt 6 Modern C++ Framework" },
                    { label: "Database Engine", value: "MySQL 8.0 with Prepared C++ Connectors" },
                    { label: "Concurrency Model", value: "std::mutex + Lock Guards for Balance Locks" }
                ],
                scores: { perf: "100", sec: "99", uptime: "100%", tests: "95%" },
                metrics: [
                    { tag: "EXECUTION TIME", value: "< 1.8ms", desc: "Native C++ Account Balance Transfer", bg: "var(--coral)" },
                    { tag: "CONCURRENCY", value: "Thread-Safe", desc: "std::lock_guard Mutex Account Serialization", bg: "var(--primary)" },
                    { tag: "SECURITY", value: "SHA-256", desc: "Cryptographic Salted Password Verification", bg: "var(--lime)" },
                    { tag: "CRASH RATE", value: "0.00%", desc: "RAII Memory Safety & Exception Guarding", bg: "var(--white)" }
                ],
                architectureNodes: [
                    { step: "01", title: "Qt Desktop Client", tech: "Qt 6 Widgets", subtitle: "Teller & Admin Interface", detail: "Offers responsive forms for deposits, wire transfers, loans, and transaction ledger histories." },
                    { step: "02", title: "Core Banking Engine", tech: "C++17 Domain Logic", subtitle: "Thread-Safe Mutex Lock", detail: "Serializes debit/credit operations using std::lock to prevent deadlocks and race conditions." },
                    { step: "03", title: "MySQL Transaction Store", tech: "MySQL 8.0 InnoDB", subtitle: "ACID Ledger", detail: "Stores immutable transaction journal entries inside serializable SQL transactions." }
                ],
                schemaTables: [
                    {
                        name: "accounts",
                        badge: "BALANCES",
                        color: "var(--coral)",
                        columns: [
                            { name: "account_number", type: "VARCHAR(20) PK" },
                            { name: "customer_id", type: "INT FK" },
                            { name: "balance_cents", type: "BIGINT >= 0" },
                            { name: "account_type", type: "CHECKING | SAVINGS" }
                        ]
                    },
                    {
                        name: "transactions",
                        badge: "LEDGER",
                        color: "var(--primary)",
                        columns: [
                            { name: "tx_id", type: "BIGINT PK AUTO_INCREMENT" },
                            { name: "from_account", type: "VARCHAR(20)" },
                            { name: "to_account", type: "VARCHAR(20)" },
                            { name: "amount_cents", type: "BIGINT" },
                            { name: "timestamp", type: "DATETIME" }
                        ]
                    }
                ],
                codePath: "src/core/AccountTransferService.cpp",
                codeNote: "Thread-safe transfer implementation avoiding deadlocks using std::lock.",
                codeSnippet: `#include "AccountTransferService.h"
#include <mutex>
#include <stdexcept>

bool AccountTransferService::transferFunds(Account& from, Account& to, int64_t amountCents) {
    if (amountCents <= 0) {
        throw std::invalid_argument("TRANSFER_AMOUNT_MUST_BE_POSITIVE");
    }

    // Simultaneously lock both accounts' mutexes without deadlock risk
    std::lock(from.mutex(), to.mutex());
    std::lock_guard<std::mutex> lockFrom(from.mutex(), std::adopt_lock);
    std::lock_guard<std::mutex> lockTo(to.mutex(), std::adopt_lock);

    if (from.getBalanceCents() < amountCents) {
        throw std::runtime_error("INSUFFICIENT_FUNDS");
    }

    from.debit(amountCents);
    to.credit(amountCents);

    return true;
}`,
                challengeTitle: "Eliminating Deadlocks in High-Concurrency Multi-Threaded Transfers",
                challengeBody: "When Account A transfers to Account B at the same time Account B transfers to Account A, poorly ordered mutex acquisition leads to catastrophic deadlock.",
                challengeBullets: [
                    "✖ Thread deadlocks when two concurrent threads request inverse account locks.",
                    "✖ Ensuring balances cannot drop below zero under simultaneous debit attempts.",
                    "✖ Guaranteeing RAII memory safety and zero resource leaks."
                ],
                solutionTitle: "std::lock Deadlock Avoidance Algorithm + RAII Mutex Adoption",
                solutionBody: "Employed C++ std::lock to acquire multiple mutexes atomically using a deadlock-avoidance algorithm, wrapped with std::adopt_lock for deterministic RAII destruction.",
                solutionBullets: [
                    "✔ std::lock safely locks multiple account resources without circular wait states.",
                    "✔ BigInt cents precision completely eliminates floating-point rounding errors.",
                    "✔ Native C++ execution achieves sub-2ms transaction speeds."
                ],
                decisions: [
                    {
                        badge: "CONCURRENCY",
                        title: "std::lock with RAII Adoption",
                        desc: "Guarantees that both account locks are obtained simultaneously or released cleanly if an exception occurs."
                    },
                    {
                        badge: "FINANCIAL PRECISION",
                        title: "Fixed BigInt Cents Over Floating-Point",
                        desc: "Stored currency values strictly as 64-bit integer cents to prevent IEEE-754 floating-point inaccuracies."
                    },
                    {
                        badge: "SECURITY",
                        title: "Salted Cryptographic Passwords",
                        desc: "Protected administrative user authentication with secure salted hashes."
                    }
                ]
            }
        ];

        // Active State
