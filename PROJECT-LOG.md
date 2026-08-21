# JobTrack AI — Project Log

A running record of daily progress across the 10-day capstone. Updated at the end of each day.

---

## Day 1 — Product Discovery & Sprint Planning
PRD, 9-day Blueprint, Pitch Deck. Tech stack finalized.

## Day 2 — System Design
GitHub repo, Vite + Tailwind scaffold, full system design docs.
**Carried over:** Supabase setup, first deploy.

## Day 3 — Project Setup & Foundation
Supabase + schema + RLS live, client connected, routing skeleton, AuthContext scaffolded.
**Carried forward:** Vercel deployment; auth UI not built.

## Day 4 — Core Feature Implementation (Auth + Application Tracker CRUD)
Vercel deployed; full auth built and verified; full Application CRUD built and verified.
**Known issues carried into Day 5:** `ProtectedRoute.jsx` missing; Vercel SPA routing 404.

## Day 5 — Resume Version Manager
Both Day 4 carry-overs closed first. Resume Version Manager full CRUD + linking, `ON DELETE SET NULL` verified.

## Day 6 — Analytics Dashboard + Footer + Production Verification
Analytics Dashboard (stats, chart, conversion rates) shipped. Footer added app-wide. Full 14-point regression pass. **Production deployment fully verified end-to-end** on live URL — confirmed the Vercel routing bug genuinely resolved.

---

## Day 7 — Smart Career Assistant (MVP Complete)

**Completed:**
- `src/lib/assistant.js` — deterministic rule-based logic (follow-up flags, needs-attention flags, suggested actions, interview prep tips, weekly summary). Zero external AI/LLM/API calls, per architecture.
- `src/components/AssistantPanel.jsx` — full UI, integrated at the top of Dashboard per the original Day 2 wireframe priority order
- `ApplicationsList.jsx` — per-row "Next: [action]" suggestion badges
- Focused polish: improved loading state and a proper error state with retry button on Dashboard (responsive/dark-mode work deliberately deferred to Day 8, to avoid double-styling)
- Full regression pass across all Day 3–7 features — no regressions
- **Production deployment verified end-to-end** — Assistant Panel confirmed working identically on the live URL with real aged test data

**Deliverables:** `docs/DAY7-SUMMARY.md`

**Issue resolved:** `AssistantPanel.jsx` was missing on first pass (spec'd but not saved locally) — Vite import error, fixed by creating the file; no architecture or logic issue.

**Notes:** Per the PRD, this is the day the full MVP became feature-complete — all 6 core features (Auth, CRUD, Resume Versions, Analytics, Smart Assistant, plus baseline polish) are live and verified in production. What remains going forward is refinement, not new features. Today's request included a full "senior designer" UI/UX pass; this was intentionally scoped down to loading/error states only, with the full responsive/dark-mode treatment deferred to Day 8 as per the Blueprint — agreed upfront, not silently skipped. No PRD conflicts, no Blueprint amendments needed.

---

## Day 8 — (Not yet started)

*To be filled in at the end of Day 8. Planned: full responsive design pass (mobile/tablet/desktop) + dark mode via `ThemeContext.jsx`, applied across every existing page/component — the deferred full UI/UX polish pass.*
