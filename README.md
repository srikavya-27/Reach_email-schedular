# MailFlow — AI-Powered Email Scheduling & Outreach Dashboard

[![Open in Bolt](https://bolt.new/static/open-in-bolt.svg)](https://bolt.new/~/sb1-e3wmgnbc)

MailFlow is a modern, dark-mode-first SaaS application for scheduling and orchestrating cold-email outreach campaigns at scale. It features a public landing page, a Google OAuth login screen, and a full dashboard with live queue visibility, per-sender rate limiting, searchable send history, and Slack alerts — all wrapped in a premium glassmorphism UI with the electric violet → cyan gradient brand identity.

---

## Frameworks & Technologies Used

| Category | Technology |
|---|---|
| **Frontend framework** | React 18 (TypeScript) |
| **Build tool** | Vite 5 |
| **Styling** | Tailwind CSS 3 (custom design tokens, keyframe animations, glassmorphism utilities) |
| **Icons** | Lucide React |
| **Backend / database** | Supabase (PostgreSQL, Auth, Edge Functions) — pre-configured via environment variables |
| **State management** | React hooks (`useState`, `useEffect`, `useMemo`, `useCallback`) — no external state library |
| **Routing** | Lightweight in-app page state (landing → login → dashboard) — no router dependency |
| **Fonts** | Inter (Google Fonts) |

---

## Architecture Details

### Project structure

```
src/
├── App.tsx                      # Root component — page-level routing via state
├── main.tsx                     # React entry point
├── index.css                    # Tailwind layers + custom component utilities
├── types.ts                     # Shared TypeScript types (EmailItem, StatusMeta, Toast, etc.)
├── mockData.ts                  # Seed data for dashboard stats and email rows
├── components/
│   ├── Button.tsx               # Reusable button (primary / ghost / outline / google variants)
│   ├── Badge.tsx                # Status pill badges (queued → rescheduled)
│   ├── Logo.tsx                 # Custom SVG logo mark + wordmark
│   ├── Skeleton.tsx             # Shimmer loading placeholder
│   ├── Reveal.tsx               # IntersectionObserver scroll-fade wrapper
│   ├── SlideOver.tsx            # Right-edge slide-over panel (used by Compose)
│   ├── Toast.tsx                # Toast notification system + container
│   ├── landing/                 # Landing page sections
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── StatsStrip.tsx
│   │   ├── Features.tsx
│   │   ├── HowItWorks.tsx
│   │   ├── Testimonials.tsx
│   │   ├── CTABand.tsx
│   │   └── Footer.tsx
│   └── dashboard/               # Dashboard pieces
│       ├── Sidebar.tsx          # Sidebar nav + TopBar (combined file)
│       ├── StatsGrid.tsx        # 4-up stat cards with trend arrows
│       ├── EmailTable.tsx       # Searchable table with skeleton + empty states
│       └── ComposePanel.tsx     # Slide-over compose form with CSV upload
├── pages/
│   ├── LandingPage.tsx          # Assembles all landing sections
│   ├── LoginPage.tsx           # Centered OAuth card
│   └── DashboardPage.tsx       # Full dashboard with tabs, search, toasts
```

### Routing

Page navigation is handled by a simple `useState<'landing' | 'login' | 'dashboard'>` in `App.tsx`. This keeps the bundle lean (no router dependency) while supporting the three primary screens. The `onNavigate` callback is threaded down through the component tree.

### Component philosophy

- **Single Responsibility** — each component owns one concern (a button variant, a table, a slide-over panel).
- **Reusable primitives** — `Button`, `Badge`, `Skeleton`, `Toast`, `SlideOver`, and `Reveal` are designed for reuse across pages and easy integration with a future Express/BullMQ backend.
- **Design tokens** — the Tailwind config defines a custom `ink` color ramp (charcoal/navy), `violet` and `cyan` brand colors, gradient backgrounds, and keyframe animations (`float`, `pulseGlow`, `shimmer`, `slideInUp`, `fadeUp`).

---

## Feature Implementation

**Landing page**
- Sticky navbar with scroll-aware background blur and a mobile hamburger drawer
- Hero with original headline, gradient CTA buttons, and an animated dashboard mockup (floating stat cards, live send-queue progress bars, parallax accent cards)
- Stats strip with four bold metrics
- 3×2 feature grid: reliable delayed scheduling, per-sender rate limiting, live queue visibility, restart-safe delivery, searchable send history, instant Slack alerts
- 4-step "How it Works" timeline with connecting line and arrows
- Three fictional testimonial quote cards
- Full-width gradient CTA band and multi-column footer

**Login page**
- Centered glassmorphism card on the dark gradient background
- Custom logo mark, welcome line, "Continue with Google" button with real Google OAuth icon
- Terms / privacy footer text

**Dashboard**
- Persistent collapsible left sidebar (hamburger drawer on mobile) with nav icons for Dashboard, Scheduled, Sent, Search, Settings
- Top bar with page title, "Connect Slack" pill (green dot when linked), user avatar + name dropdown with logout
- 4 stat cards (Total Scheduled, Sent Today, Active Senders, Rate-Limit Hits) with trend arrows
- "+ Compose New Email" button opening a slide-over panel with subject, body textarea, drag-and-drop CSV/TXT upload with live "X emails detected" counter, datetime picker, and schedule button
- Tabbed table (Scheduled / Sent) with color-coded status badges: queued (slate), delayed (blue), sending (amber), sent (green), failed (red), rescheduled (violet)
- Skeleton loading rows (shimmer, not spinners) during data fetch
- Friendly empty-state illustration when no data matches
- Instant search bar above the table with debounced filtering
- Toast notifications sliding in from the bottom-right (email scheduled, Slack connected, errors)
- Smooth tab transitions and hover micro-interactions throughout

**Design system**
- Dark-mode-first with deep charcoal/navy background (#0B0E14)
- Electric violet → cyan gradient (#7C3AED → #22D3EE) used on buttons, glows, and highlights
- Glassmorphism cards with backdrop blur and subtle borders
- 8px spacing system, Inter font family, 3 font weights max
- Responsive breakpoints from mobile to desktop

---

## Setup & Installation

### Prerequisites

- Node.js 18+ and npm
- A Supabase project (URL + anon key)

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/your-username/mailflow.git
cd mailflow

# 2. Install dependencies
npm install

# 3. Create a .env file in the project root and add your Supabase credentials
cat > .env << 'EOF'
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
EOF

# 4. Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`.

### Available scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the Vite dev server with HMR |
| `npm run build` | Production build (outputs to `dist/`) |
| `npm run preview` | Preview the production build locally |
| `npm run typecheck` | Run `tsc --noEmit` for type checking |
| `npm run lint` | Run ESLint |

---

## Deployment

MailFlow is configured for production and deploys as a static SPA. The build step (`npm run build`) outputs optimized, minified assets to the `dist/` directory, which can be served by any static host (Vercel, Netlify, Cloudflare Pages, etc.). Supabase provides the backend layer (database, auth, edge functions) and is already provisioned with credentials in the environment.

To deploy:

```bash
npm run build      # generates dist/
# Upload dist/ to your hosting provider, or connect the repo for automatic CI/CD deploys
```

---

© 2026 MailFlow, Inc. Built for teams that send at scale.
