# JobTrack AI — Project Structure

**Status:** Locked for v1.0 — Day 2 Design Document

This document defines the complete folder structure the project will grow into across Days 3–10. No code is written today — this is the map that all future days build against, so nothing gets placed ad hoc.

---

## 1. Full Structure (Target State by Day 10)

```
jobtrack-ai/
├── docs/                          # Design & planning documents (this deliverable set)
│   ├── ARCHITECTURE.md
│   ├── SCHEMA.md
│   ├── API.md
│   ├── UI-WIREFRAMES.md
│   ├── PROJECT-STRUCTURE.md
│   └── wireframes/                # Wireframe image assets referenced by UI-WIREFRAMES.md
│
├── public/                        # Static assets served as-is (Vite default)
│   └── favicon.ico
│
├── src/
│   ├── main.jsx                   # App entry point — mounts React to the DOM
│   ├── App.jsx                    # Route definitions, wraps app in AuthProvider/ThemeProvider
│   ├── index.css                  # Tailwind import (single line, per Day 2 setup)
│   │
│   ├── lib/                       # Non-UI logic: API calls and pure business logic
│   │   ├── supabaseClient.js      # Initializes and exports the Supabase client
│   │   ├── applications.js        # CRUD helper functions for the applications table
│   │   ├── resumeVersions.js      # CRUD helper functions for the resume_versions table
│   │   ├── analytics.js           # computeStats() — pure aggregation functions
│   │   └── assistant.js           # Smart Career Assistant rule-based logic functions
│   │
│   ├── context/                   # React Context providers (global state)
│   │   ├── AuthContext.jsx        # Current user/session state, signUp/signIn/signOut
│   │   └── ThemeContext.jsx       # Light/dark mode state, persisted to localStorage
│   │
│   ├── components/                # Reusable UI building blocks (not full pages)
│   │   ├── Navbar.jsx
│   │   ├── ProtectedRoute.jsx     # Route guard — redirects to /login if unauthenticated
│   │   ├── ApplicationForm.jsx    # Shared form used by both Add and Edit pages
│   │   ├── ApplicationsList.jsx
│   │   ├── StatusBadge.jsx
│   │   ├── StatCard.jsx
│   │   ├── StatusChart.jsx
│   │   ├── AssistantPanel.jsx
│   │   └── InterviewPrepCard.jsx
│   │
│   └── pages/                     # Full-page components, one per route
│       ├── Landing.jsx
│       ├── Signup.jsx
│       ├── Login.jsx
│       ├── Dashboard.jsx
│       ├── AddApplication.jsx
│       ├── EditApplication.jsx
│       └── ResumeVersions.jsx
│
├── .env                           # VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY (gitignored)
├── .gitignore
├── index.html                     # Vite's HTML entry point
├── package.json
├── tailwind.config.js             # (if present — Tailwind v4 via Vite plugin may not need this file)
├── vite.config.js                 # Vite + React + Tailwind plugin config
└── README.md                      # Project overview, live link, setup instructions (written Day 10)
```

---

## 2. Folder-by-Folder Explanation

### `docs/`
Holds every planning and design document produced outside of active coding — the PRD, blueprint, and today's five deliverables. This folder is the project's "why" and "how it's designed," separate from the "what's actually running" in `src/`. Keeping this in the repo (not just in chat history) means the documents travel with the code and stay reviewable by anyone who clones the project.

### `public/`
Vite's convention for static files that should be served exactly as-is, unprocessed, at the site root (e.g. `favicon.ico`). Nothing beyond the favicon is expected here for v1.0, since there's no file upload feature.

### `src/lib/`
Every function here is **framework-agnostic logic** — it doesn't know about React, JSX, or components. `supabaseClient.js` is the single place the Supabase client is initialized (imported everywhere else that needs data). `applications.js` and `resumeVersions.js` wrap the raw Supabase calls documented in `API.md` into named functions (e.g. `getApplications()`, `addApplication()`) so components never call `supabase.from(...)` directly — this keeps data-access logic in one place if it ever needs to change. `analytics.js` and `assistant.js` hold the pure, testable calculation functions described in `ARCHITECTURE.md` Section 6 — deliberately separated from UI so they can be reasoned about (and debugged) independently of how they're displayed.

### `src/context/`
Global state that many components need access to, without prop-drilling. `AuthContext` is created Day 3; `ThemeContext` is created Day 8. Both follow the same pattern: a Provider component wrapping the app in `App.jsx`, and a custom hook (`useAuth()`, `useTheme()`) for components to consume it.

### `src/components/`
Reusable pieces that make up pages but aren't full pages themselves — a button group, a form, a card, a badge. The rule of thumb: if it's used in more than one place, or if a page would become unreadably long without extracting it, it belongs here. Each file maps to exactly one Blueprint day's "Files to Create" list, so there's no ambiguity about when each gets built.

### `src/pages/`
One file per route, matching the Screen Flow diagram in `UI-WIREFRAMES.md` exactly. Pages compose components together and connect them to routes/URLs — they contain layout and page-level data-fetching, but delegate detailed UI to `components/`.

### Root-level config files
`vite.config.js`, `package.json`, `.env`, and `.gitignore` are all created/modified on Day 2 per the Blueprint and not touched again except when a new dependency is added on a later day.

---

## 3. Where Each Remaining Day's Work Lands

| Day | Primary Folders Touched |
|---|---|
| Day 2 (today) | `docs/`, root config files, empty `src/pages/` route shells |
| Day 3 | `src/context/AuthContext.jsx`, `src/components/ProtectedRoute.jsx`, `Navbar.jsx`, `Landing/Signup/Login.jsx` |
| Day 4 | `src/lib/applications.js`, `src/components/ApplicationForm.jsx`, `ApplicationsList.jsx`, `StatusBadge.jsx`, `src/pages/AddApplication.jsx`, `EditApplication.jsx` |
| Day 5 | `src/lib/resumeVersions.js`, `src/pages/ResumeVersions.jsx` |
| Day 6 | `src/lib/analytics.js`, `src/components/StatCard.jsx`, `StatusChart.jsx` |
| Day 7 | `src/lib/assistant.js`, `src/components/AssistantPanel.jsx`, `InterviewPrepCard.jsx` |
| Day 8 | `src/context/ThemeContext.jsx`, styling passes across nearly every existing file |
| Day 9 | No new files expected — bug fixes across existing files only |
| Day 10 | `README.md`, minor cleanup across existing files |

This table means anyone (including a fresh AI conversation on any given day) can look at this file and know exactly which folder their day's work belongs in, without guessing.

---

## 4. Why This Structure Was Chosen

- **Separation of logic and presentation** (`lib/` vs `components/`/`pages/`) makes the rule-based Assistant and Analytics engines easy to reason about and — if ever desired — easy to unit test independently of the UI.
- **One file per screen** (`pages/`) maps directly to the Screen Flow diagram, so there's a 1:1 mental model between "what the user sees" and "where the code lives."
- **Flat, shallow nesting** — no deep subfolder trees — keeps this approachable for a beginner developer; every file is at most two folders deep from `src/`.
- **This is a standard, widely-documented React + Vite convention** — meaning AI assistants (Claude, ChatGPT) and any tutorials/Stack Overflow answers consulted during the build will map cleanly onto this structure, reducing friction when asking for help on a specific file.
