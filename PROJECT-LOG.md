# JobTrack AI — Project Log

A running record of daily progress across the 10-day capstone. Updated at the end of each day.

---

## Day 1 — Product Discovery & Sprint Planning
PRD, 9-day Blueprint, Pitch Deck. Tech stack finalized.

## Day 2 — System Design
GitHub repo, Vite + Tailwind scaffold, full system design docs.

## Day 3 — Project Setup & Foundation
Supabase + schema + RLS live, client connected, routing skeleton, AuthContext scaffolded.

## Day 4 — Core Feature Implementation (Auth + Application Tracker CRUD)
Vercel deployed; full auth built and verified; full Application CRUD built and verified.

## Day 5 — Resume Version Manager
ProtectedRoute + Vercel routing carry-overs closed. Resume Version Manager full CRUD + linking.

## Day 6 — Analytics Dashboard + Footer + Production Verification
Analytics Dashboard shipped. Footer added. Production deployment fully verified end-to-end.

## Day 7 — Smart Career Assistant (MVP Complete)
Smart Career Assistant fully built and verified in production. MVP became feature-complete.

## Day 8 — Responsive Design + Dark Mode
Full theme system + responsive pass across every page. Production-verified, including a follow-up populated-dashboard check that closed the day's one noted gap.

---

## Day 9 — Testing, Debugging & Production Optimization

**Completed:**
- Full senior-engineer codebase review — 10 findings identified across bugs, accessibility, security, and polish
- **Bugs fixed:** `job_link` and `notes` now displayed on application rows (were captured but never shown); 404 page added for undefined routes
- **Accessibility:** all form labels linked to inputs via `htmlFor`/`id` across Signup, Login, ApplicationForm, ResumeVersions; `aria-label`/`aria-pressed` added to ambiguous buttons
- **Security/UX:** raw Supabase error messages replaced with clean user-facing text; real errors now logged to console only; `alert()` popups replaced with inline error states on Add/Edit Application
- **Polish:** page title and meta description fixed (was showing Vite's default)
- **Deliberately deferred:** inline style deduplication — documented as a conscious trade-off given proximity to launch, not a gap
- Full 16-point regression pass — all passed
- **Production deployment verified**, including a specific 404-page screenshot on the live URL, given this project's history with routing issues

**Deliverables:** `docs/DAY9-SUMMARY.md`

**Debugging note:** a JSX parse error in `ApplicationsList.jsx` resurfaced across two fix attempts at different line numbers, indicating symptom-patching rather than root-cause fixes. Resolved by rewriting the file from scratch and verifying it in an isolated, actually-compiled test environment before presenting — a more rigorous verification standard now applied going forward.

**Notes:** No PRD conflicts. No Blueprint amendments needed. Today's work matches Blueprint Day 9 exactly — hardening and QA only, no new features.

---

## Day 10 — (Not yet started)

*To be filled in at the end of Day 10. Planned: final polish, README (setup instructions, screenshots, live link), demo script, cross-browser/device spot-check, final cleanup pass, and launch.*
