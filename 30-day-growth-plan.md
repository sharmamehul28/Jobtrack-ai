# JobTrack AI — 30-Day Growth Plan

A realistic, one-milestone-per-day roadmap taking JobTrack AI from v1.0.0 to a significantly more capable product. Each day builds on the previous day's work — nothing here requires re-architecting what already exists.

**Ground rule carried over from the capstone:** verify every change against the live production app, not just locally. Commit and push daily.

---

## Week 1: Resume File Storage (Closing the Biggest v1.0.0 Gap)

- **Day 1:** Set up a Supabase Storage bucket for resumes; configure storage-level RLS policies (private per user)
- **Day 2:** Add file upload UI to the Resume Version form; wire up the upload call
- **Day 3:** Store the file path in a new `resume_versions.file_path` column; test upload end-to-end
- **Day 4:** Add a "View/Download" link on each resume version, generating a signed URL
- **Day 5:** Handle edge cases — file size limits, allowed file types (PDF/DOCX), upload errors
- **Day 6:** Update `docs/SCHEMA.md` and `docs/API.md` to reflect the new column and storage operations
- **Day 7:** Full regression pass + production verification; tag as `v1.1.0`

## Week 2: Notifications & Data Portability

- **Day 8:** Research free-tier email options (Resend, Supabase email hooks); pick one
- **Day 9:** Build a weekly digest email template summarizing the same data `getWeeklySummary()` already computes
- **Day 10:** Set up a scheduled trigger (Supabase Edge Function or similar) to send the digest
- **Day 11:** Add a user preference toggle (email notifications on/off) — new column on a lightweight `user_preferences` table
- **Day 12:** Build CSV export — client-side, using existing `applications` data, no backend changes needed
- **Day 13:** Add a "Forgot Password" screen using Supabase Auth's built-in reset flow
- **Day 14:** Full regression pass + production verification; tag as `v1.2.0`

## Week 3: Reducing Manual Entry Friction

- **Day 15:** Research options for job-link metadata extraction (simple URL parsing vs. a scraping API)
- **Day 16:** Build a "paste job URL" field that attempts to pre-fill Company Name / Job Title
- **Day 17:** Handle failure gracefully (many sites will block scraping — fall back to manual entry cleanly)
- **Day 18:** Add keyboard shortcuts for power users (e.g., "n" to add a new application)
- **Day 19:** Add bulk actions (select multiple applications, bulk status update)
- **Day 20:** Polish: loading skeletons instead of "Loading..." text, smoother transitions
- **Day 21:** Full regression pass + production verification; tag as `v1.3.0`

## Week 4: PWA, Polish, and Optional AI Layer

- **Day 22:** Add a web app manifest + service worker — make the app installable (PWA)
- **Day 23:** Test offline behavior — decide what should work without connectivity (likely: viewing cached data)
- **Day 24:** Accessibility audit round 2 — screen reader testing, keyboard navigation audit
- **Day 25:** Performance pass — check bundle size, lazy-load routes if needed
- **Day 26:** Design and scope an *optional* LLM-powered feature (e.g., cover letter draft assistant) — as an opt-in layer, not a replacement for the rule-based core
- **Day 27:** Implement the optional AI feature behind a clear "Try AI Assist (Beta)" toggle, with a real free-tier API
- **Day 28:** Full security review of the new AI feature (API key handling, rate limiting, cost caps)
- **Day 29:** Update README, all `docs/` files, and the project log to reflect the month's changes
- **Day 30:** Final full regression pass, production verification, retrospective write-up; tag as `v2.0.0`

---

## Notes

- This plan assumes similar daily time availability to the original capstone (3–4 focused hours/day).
- Every "Full regression pass + production verification" day is intentional, not filler — it's the same discipline that caught real issues throughout the original 10-day build.
- The optional AI layer (Days 26–28) is placed deliberately last and clearly scoped as *optional and additive* — preserving the free, fast, rule-based core that was the project's original differentiating decision.
