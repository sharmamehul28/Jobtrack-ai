# JobTrack AI — Project Log

A running record of daily progress across the 10-day capstone. Updated at the end of each day.

---

## Day 1 — Product Discovery & Sprint Planning

**Date:** Day 1 of capstone

**Completed:**
- Interviewed to discover and validate the JobTrack AI concept
- Scoped v1.0 feature set, explicitly bounded out-of-scope items
- Finalized tech stack: React + Vite, Tailwind CSS, Supabase (Postgres + Auth), Vercel
- Generated PRD, 9-day Implementation Blueprint, and Pitch Deck

**Deliverables:** `PRD.docx`, `Implementation_Blueprint.docx`, `Pitch_Deck.pptx`

---

## Day 2 — System Design

**Date:** Day 2 of capstone

**Completed:**
- Created GitHub repository (`jobtrack-ai`), cloned locally
- Scaffolded React + Vite app, installed and configured Tailwind CSS
- Designed complete system architecture (component diagram, data flow, request lifecycle, auth flow, assistant logic flow)
- Designed and validated database schema (`applications`, `resume_versions`) against every PRD functional requirement — no gaps found
- Documented full API surface (12 Supabase operations + 6 client-only derived functions) — confirmed no custom backend server is needed
- Designed complete user flow, screen flow, and 6 low-fidelity wireframes
- Documented full project folder structure with a day-by-day file ownership map

**Deliverables:** `docs/ARCHITECTURE.md`, `docs/SCHEMA.md`, `docs/API.md`, `docs/UI-WIREFRAMES.md`, `docs/PROJECT-STRUCTURE.md`, `docs/wireframes/*.png`

**Carried over to Day 3 (not a delay — mechanical setup only, no new design work):**
- Create the live Supabase project
- Run `SCHEMA.md`'s SQL script (tables + RLS policies)
- Connect Supabase client to the React app (`.env`, `supabaseClient.js`)
- First deploy to Vercel

**Notes:** No scope changes. No conflicts found between today's design work and the approved PRD/Blueprint.

---

## Day 3 — Project Setup & Foundation

**Date:** Day 3 of capstone

**Completed:**
- Created and provisioned Supabase project (`jobtrack-ai`, Sydney region, Free tier) — closing out the item carried over from Day 2
- Executed full schema SQL: `applications` and `resume_versions` tables created, Row Level Security enabled with all 8 policies applied
- Created `.env` with Supabase credentials; confirmed excluded from Git
- Created `src/lib/supabaseClient.js` and verified live connection with a real test query
- Built out full folder structure (`src/lib`, `src/pages`, `src/context`, `src/components`) matching `PROJECT-STRUCTURE.md`
- Installed and configured React Router; implemented and verified 4-route skeleton (`/`, `/login`, `/signup`, `/dashboard`)
- Scaffolded `AuthContext.jsx` (session detection, signUp/signIn/signOut methods); verified live via Dashboard test
- Verified clean production build (`npm run build`)

**Deliverables:** `docs/SETUP.md`, `docs/ENVIRONMENT.md`, `docs/DAY3-SUMMARY.md`

**Issue encountered & resolved:** Initial `.env` used the Supabase dashboard URL instead of the project API URL, causing a failed connection test. Self-diagnosed and corrected; documented in `SETUP.md`.

**Notes:** No scope changes. No changes required to the Implementation Blueprint — today's work matches its Day 3 foundation expectations exactly, with the Day 2 Supabase carry-over completed first. Deployment to Vercel (originally slated as part of the Day 2/3 carry-over) was not reached today — see Day 4 planning note below.

**Carried forward:** First deploy to Vercel was not completed today. This is a small, mechanical task (no design work) and will be folded into Day 4 alongside the authentication flow build, so the app is verified live in production as soon as real auth features exist to test.

---

## Day 4 — (Not yet started)

*To be filled in at the end of Day 4.*
