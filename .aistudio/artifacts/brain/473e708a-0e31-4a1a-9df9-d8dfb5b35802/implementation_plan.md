# Dreamlight Welfare Society — Institutional Elevation & Interactive Modules Plan

A comprehensive architectural and design overhaul transforming the Dreamlight Welfare Society web portal from a generic template into an authentic, human-crafted humanitarian institution. Integrates the official UPI ID **`dreamlightwelfaresociety@ybl`** across all donation pathways, enforces strict zero-pill editorial aesthetics, and ensures every feature operates with complete interactive workflows.

---

## User Review & Critical Decisions

> [!IMPORTANT]
> The primary updates requested by the user are:
> 1. Update the official NGO UPI ID to **`dreamlightwelfaresociety@ybl`**.
> 2. Redesign UI/UX so the site looks authentically human-crafted and institutional (avoiding AI-generated visual clichés like floating badges, fake glowing dots, pill badge sandwiches, and generic gradients).
> 3. Ensure **every single button and function is 100% interactive and working** (real donation receipt flow, volunteer pass generator, event bookings, audit tables, and contact routes).

- **Confirmed Decision 1**: UPI ID will be permanently updated to `dreamlightwelfaresociety@ybl` across all configuration, donation modals, QR generators, and receipt verifications.
- **Confirmed Decision 2**: Adopt an **Established Humanitarian Foundation & Warm Editorial** aesthetic with soft warm paper canvas (`#FAF8F5`), forest ink tones (`#134E35`), antique charcoal typography (`#1C1917`), and clean hairline dividers.
- **Confirmed Decision 3**: Strict **Zero-Pill Discipline** — metadata rendered as clean unboxed text separated by subtle middots (`·`), top bar following the standard 3-zone contract, and no decorative pulse animations.

---

## 1. Overview & Core Concept

- **What It Does**: The official digital portal for Dreamlight Welfare Society (Registered NGO), providing donors, volunteers, community members, and audit bodies with a transparent, fully functional platform to donate via UPI/cards, generate instant 80G tax-exempt receipts, apply for volunteer credentials, reserve seats at free medical camps, and inspect verified financial allocations.
- **Target Audience**: Individual donors across India, corporate CSR contributors, grassroots volunteers, students, and rural beneficiaries seeking healthcare and education support.
- **Key Value**: Delivers undeniable credibility through genuine editorial craftsmanship, frictionless UPI giving with one-tap copy and dynamic QR generation, and real interactive utility that builds trust.

---

## 2. User Experience & Visual Design

### A. Aesthetic Direction & Zero-AI-Slop Governance
- **Palette**:
  - *Dominant Canvas (60%)*: Warm Archival Paper (`#FAF8F5`) and Crisp Pearl White (`#FFFFFF`).
  - *Structural Surfaces & Borders (30%)*: Whisper stone surfaces (`#F3EFEA`), delicate 1px hairline dividers (`border-stone-200/80`), and deep charcoal body text (`#292524`).
  - *Curatorial Accents (10%)*: Deep Forest Ink (`#134E35` / `#0F3D2A`), Heritage Amber/Gold (`#854D0E`), and Warm Terracotta (`#9A3412`) reserved exclusively for primary interactive affordances.
- **Anti-Slop Cleanliness**:
  - Prohibit all decorative pulsing dots (`animate-pulse`), fake status tags, and pseudo-code comment headers (`// 01_PIPELINE`).
  - Remove pill badges on top of cards and headings; render category kickers as understated tracked typography (`text-xs uppercase tracking-widest text-stone-500 font-sans`).
  - Strict Top Bar Contract: Zone 1 (Wordmark brand link), Zone 2 (5 concise single-line nav links), Zone 3 (Single high-intent primary CTA "Donate Now"). No status banners or mode toggles in the header.

### B. Typographic Architecture
- **Display Face**: High-contrast, stately editorial serif (`font-serif`, Georgia / Playfair style) for hero headlines and section titles with natural title-case and balanced word wrapping (`text-wrap: balance`).
- **Body & Controls**: Crisp, readable sans-serif (`font-sans`, Plus Jakarta Sans / system sans) with comfortable leading (1.6–1.7) and measure (65–75ch).
- **Tabular Data**: Monospace tabular numerals (`tabular-nums font-mono`) for all UPI IDs, donation amounts, tax receipt serials, and audit percentages.

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1: Official UPI ID & Dynamic QR Architecture**
  - *Chosen Approach*: Configure `dreamlightwelfaresociety@ybl` as the single source of truth in `NGO_CONFIG`. Provide dynamic QR generation using the standard UPI intent scheme (`upi://pay?pa=dreamlightwelfaresociety@ybl&pn=Dreamlight%20Welfare%20Society&cu=INR`), paired with a 1-tap copy button with instant feedback (`"Copied!"`) and direct app launch badges (Google Pay, PhonePe, Paytm, BHIM).
  - *Why*: Eliminates friction for mobile donors while guaranteeing that scanned payments land directly in the organization's verified VPA.
- **Decision 2: 100% Working Functional Modules**
  - *Chosen Approach*: Implement full interactive state machines for all core flows:
    1. *Donation & 80G Receipt*: Validates donor form, simulates payment verification, records transaction into state, and renders an authentic, print-ready 80G digital receipt with official registration details, pan number, and stamp.
    2. *Volunteer Digital ID Pass*: Allows volunteers to apply and immediately receive an interactive, flip-enabled digital ID badge complete with auto-generated ID code (`VOL-DWS-2026-XXX`), photo, and status.
    3. *Event RSVP & Camp Pass*: Real-time seat decrementing and downloadable ticket pass for upcoming health camps and plantation drives.
    4. *Cause Filtering*: Client-side interactive filter tabs with smooth state transitions.
    5. *Admin Audit Console*: Real toggle permitting live management of incoming donations, volunteer approvals, and expenditure transparency.
  - *Why*: Directly satisfies the user's explicit requirement that every function built is active and working.

---

## 4. Technical Architecture & Component Flow

```
┌────────────────────────────────────────────────────────────────────────┐
│                        NGO Application State                           │
│  - NGO_CONFIG (UPI ID: dreamlightwelfaresociety@ybl, Legal, Phone)     │
│  - Active Page View ('home' | 'about' | 'services' | 'donate' | ...)   │
│  - Donations Store (Persistent LocalStorage + In-memory records)      │
│  - Volunteers Store (Application state & verified passes)             │
│  - Events Store (Live seats capacity & RSVPs)                         │
└────────────────────────────────────┬───────────────────────────────────┘
                                     │
           ┌─────────────────────────┼─────────────────────────┐
           ▼                         ▼                         ▼
┌──────────────────────┐  ┌──────────────────────┐  ┌──────────────────────┐
│     Top Navbar       │  │      Page Views      │  │   Interactive Modals │
│ 1-Row 3-Zone Contract│  │  - HomePage          │  │  - DonationModal     │
│  - Brand Wordmark    │  │  - AboutPage         │  │    (Dynamic QR + UPI)│
│  - Clean Nav Links   │  │  - ServicesPage      │  │  - ReceiptModal      │
│  - Single CTA Button │  │  - DonatePage        │  │  - VolunteerModal    │
│                      │  │  - AdminDashboard    │  │  - EventRSVPModal    │
└──────────────────────┘  └──────────────────────┘  └──────────────────────┘
```

---

## 5. Execution Steps

1. **Configuration & Data Updates**:
   - Update `lib/mock-data.ts`: Set `NGO_CONFIG.bankDetails.upiId` strictly to `'dreamlightwelfaresociety@ybl'`.
   - Ensure all phone numbers, email addresses, and tax exemption codes align with Dreamlight Welfare Society.
2. **Top Navigation Polish**:
   - Refactor `components/Navbar.tsx` to adhere strictly to the 3-Zone Top Bar Contract.
   - Clean unboxed single-line navigation links with quiet hover underlines.
3. **Hero & Section Aesthetic Refactoring**:
   - Remove lingering static pill badges and decorative status indicators across `HomePage.tsx`, `AboutPage.tsx`, and `ServicesPage.tsx`.
   - Implement warm editorial canvas backgrounds, measured typography scale, and claim-to-proof card alignments.
4. **Enhanced Donation & UPI Experience**:
   - Update `components/DonationModal.tsx` and `components/pages/DonatePage.tsx` with dynamic QR code preview for `dreamlightwelfaresociety@ybl`, instant clipboard copy, deep UPI intent links, and instant 80G tax receipt generation.
5. **Interactive Modules Verification**:
   - Verify Volunteer ID Card generator with live state and download/print capability.
   - Verify Event RSVP with seat countdown and confirmation pass.
   - Verify Admin Dashboard toggle to review donations and applications.
6. **Build Verification**:
   - Run `compile_applet` and `lint_applet` to ensure zero compilation or typing errors.
