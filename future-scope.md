# JobTrack AI — Future Scope

This document outlines how JobTrack AI could realistically evolve beyond v1.0.0, grounded in the actual architecture and deliberate scope decisions made during the 10-day build — not a generic feature wishlist.

---

## 3-Month Horizon: Deepen the Core Experience

The v1.0.0 PRD deliberately excluded several features to protect the 10-day timeline. These are the most natural next additions, in priority order:

1. **Resume File Uploads** — v1.0.0 tracks resume *versions* as text labels only (`resume_versions.name`), by explicit design (see `docs/SCHEMA.md`). Adding actual file storage (Supabase Storage, which is already part of the existing free-tier Supabase project) would let users store and preview the actual PDF/DOCX per version — a natural extension of the existing schema, not a redesign.

2. **Email Notifications** — the Smart Career Assistant currently surfaces follow-up/attention flags only when the user is actively looking at the dashboard. A weekly digest email (using a free tier like Resend or Supabase's own email hooks) would extend the same `assistant.js` logic to proactive delivery, without changing the underlying rule engine.

3. **Data Export (CSV)** — a straightforward client-side feature (no backend changes) letting users export their `applications` table as a spreadsheet — useful for students who want to share progress with a career counselor or mentor.

4. **Password Reset Flow** — explicitly out of scope for v1.0.0; Supabase Auth already supports this natively, so this is primarily a UI/UX addition (a "Forgot Password" screen calling `supabase.auth.resetPasswordForEmail()`), not new infrastructure.

## 6-Month Horizon: Expand Intelligence & Reach

5. **Optional Real LLM Integration** — v1.0.0's Assistant is deliberately rule-based (zero cost, zero latency, zero external dependency — a conscious architectural decision, not a limitation). At this stage, an *optional* LLM-powered layer (e.g., generating a personalized cover letter draft, or more nuanced interview prep tailored to the specific job description) could sit alongside the existing rule-based core rather than replacing it — preserving the free, fast default while adding an opt-in premium capability.

6. **Job Board Integration** — allow users to paste a job URL and auto-populate Company Name / Job Title via a lightweight scraping or public API layer, reducing manual data entry — the single most repetitive part of the current workflow.

7. **Mobile App Wrapper** — the existing React app is already fully responsive; wrapping it as a PWA (installable, offline-capable shell) would meaningfully improve the mobile experience without a full native rewrite.

## 12-Month Horizon: Platform Growth

8. **Multi-User Collaboration** — for university career centers or bootcamps: a career counselor could get read-only visibility into a cohort's aggregate progress (not individual application details, preserving privacy) — a genuinely new feature requiring careful RLS policy design, not a small add-on.

9. **LinkedIn/Job Board Sync** — deeper integration to auto-import applications directly, rather than manual entry — the natural endpoint of the job-board integration started at the 6-month mark.

10. **Analytics Benchmarking** — anonymized, aggregate comparison ("Your interview rate is above average for Software Engineering applications this month") — requires accumulating enough cross-user data to be meaningful, hence the longer horizon.

---

## What Deliberately Stays Out of Scope, Even Long-Term

Per the original PRD, JobTrack AI is positioned as a focused, personal tool — not a recruiting platform or ATS competitor. An admin panel, employer-facing features, or job-posting functionality would fundamentally change the product's identity and are not part of this roadmap at any horizon.
