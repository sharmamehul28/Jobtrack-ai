# JobTrack AI — Project Log

A running record of daily progress across the 10-day capstone. Updated at the end of each day.

---

## Day 1 — Product Discovery & Sprint Planning

**Completed:**
- Interviewed to discover and validate the JobTrack AI concept
- Scoped v1.0 feature set, explicitly bounded out-of-scope items
- Finalized tech stack: React + Vite, Tailwind CSS, Supabase (Postgres + Auth), Vercel
- Generated PRD, 9-day Implementation Blueprint, and Pitch Deck

**Deliverables:** `PRD.docx`, `Implementation_Blueprint.docx`, `Pitch_Deck.pptx`

---

## Day 2 — System Design

**Completed:**
- Created GitHub repository (`jobtrack-ai`), cloned locally
- Scaffolded React + Vite app, installed and configured Tailwind CSS
- Designed complete system architecture, database schema, API surface, UI wireframes, and project folder structure — all validated against the PRD

**Deliverables:** `docs/ARCHITECTURE.md`, `docs/SCHEMA.md`, `docs/API.md`, `docs/UI-WIREFRAMES.md`, `docs/PROJECT-STRUCTURE.md`, `docs/wireframes/*.png`

**Carried over to Day 3:** Supabase project creation, schema execution, client connection, first deploy.

---

## Day 3 — Project Setup & Foundation

**Completed:**
- Created and provisioned Supabase project; executed full schema SQL (tables + RLS)
- Connected Supabase client to React app, verified with live query
- Built full folder structure; implemented routing skeleton (4 placeholder routes)
- Scaffolded `AuthContext.jsx`, verified session-detection logic works

**Deliverables:** `docs/SETUP.md`, `docs/ENVIRONMENT.md`, `docs/DAY3-SUMMARY.md`

**Issue resolved:** `.env` initially used the wrong Supabase URL (dashboard URL instead of project API URL) — self-diagnosed and fixed.

**Carried forward:** Vercel deployment.

---

## Day 4 — Core Feature Implementation (Auth + Application Tracker CRUD)

**Completed:**
- **Vercel deployment** completed (closing the Day 2/3 carry-over) — live URL confirmed working for the landing page; a separate SPA routing issue on direct navigation to `/login`, `/signup`, `/dashboard` was identified and is still being debugged (see Known Issues below)
- **Auth pulled forward and fully built:** Signup, Login, Logout, session persistence — all 6 test cases verified working after resolving a root-cause bug (Supabase's "Confirm Email" setting was blocking session creation on signup; disabled, issue resolved)
- **Application Tracker — full CRUD implemented and verified:**
  - Create: `AddApplication.jsx`, verified real rows inserted with correct `user_id`
  - Read: `ApplicationsList.jsx` on Dashboard, verified showing real data
  - Update: `EditApplication.jsx`, verified pre-fill + save, verified `status_updated_at` only changes when status actually changes (matches `API.md` exactly)
  - Delete: verified removing rows from both UI and Supabase, with confirmation prompt
  - Status filter: verified narrowing the list correctly across all 5 statuses

**Deliverables:** `docs/DAY4-SUMMARY.md`

**Notes:** Auth was deliberately reordered ahead of CRUD (was originally slated partly for Day 3) so CRUD could be tested against real user sessions instead of mock data — a sequencing decision, not scope creep. No PRD conflicts.

**Known issues carried into Day 5 (must be addressed first, before new features):**
1. `ProtectedRoute.jsx` does not exist yet — authenticated routes are not actually access-controlled by redirect, only by graceful degradation in the UI. Originally Day 3 scope; twice deferred now.
2. Vercel SPA routing returns 404 on direct navigation to any route other than `/` — `vercel.json` rewrite rule was added but has not yet resolved the issue; a systematic debug session was started (browser console check) but paused to prioritize CRUD implementation. Needs to be resumed and completed.

---

## Day 5 — (Not yet started)

*To be filled in at the end of Day 5. Must open with: (1) ProtectedRoute implementation, (2) Vercel routing fix — before Resume Version Manager work begins.*
