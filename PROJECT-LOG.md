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

**Notes:** No scope changes. No conflicts found between today's design work and the approved PRD/Blueprint. Day 2's original plan included Supabase setup and first deploy — these are simple execution steps (the SQL is already written) and will be completed first thing on Day 3 before starting that day's actual planned work (auth flow).

---

## Day 3 — (Not yet started)

*To be filled in at the end of Day 3.*
