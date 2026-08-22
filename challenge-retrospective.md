# JobTrack AI — Capstone Retrospective

A day-by-day account of how JobTrack AI actually got built — the real decisions, the real bugs, and what they demonstrate.

---

## Timeline

### Day 1 — Discovery & Scoping
Started with no fixed idea beyond wanting to build something real. Through a structured discovery interview, landed on JobTrack AI — a job tracker for students — and immediately began cutting scope: no resume file uploads, no real LLM API calls, no email notifications, no admin panel. The PRD, a 9-day Implementation Blueprint, and a Pitch Deck were produced before a single line of code was written.

**Key decision:** the Smart Career Assistant would be rule-based, not LLM-powered — explicitly to avoid cost, latency, and reliability risk in a beginner-built, free-tier project. This decision held for the entire build.

### Day 2 — System Design
Before any implementation, the full system was designed on paper: architecture diagrams, a two-table database schema (validated against every PRD requirement), a complete API contract (12 Supabase operations, confirming zero custom backend was needed), wireframes, and a folder structure — all committed to the repo as living documentation, not throwaway planning.

### Day 3 — Foundation
Supabase project created, schema executed, RLS policies applied, routing skeleton built. First real bug: the `.env` file used the Supabase dashboard URL instead of the project API URL — a classic, easy-to-make mistake — self-diagnosed and fixed.

### Day 4 — Auth + Core CRUD
Authentication was deliberately pulled forward from its originally planned slot so that Application CRUD could be tested against real user sessions instead of mock data — a sequencing decision made mid-build, not a deviation from the plan's intent. Hit a genuinely confusing bug here: every single auth test failed at once (signup, login, session, all six cases). Root-caused systematically rather than guessing — turned out to be Supabase's "Confirm Email" setting silently blocking session creation. One config change fixed all six failures at once, reinforcing a debugging principle that held for the rest of the project: **when everything breaks simultaneously, look for one root cause, not six separate bugs.**

### Day 5 — Resume Version Manager
Closed two carried-over gaps first (`ProtectedRoute`, a Vercel routing issue) before starting new feature work — establishing a pattern of finishing carried-over debt before building further, rather than letting it accumulate silently.

### Day 6 — Analytics Dashboard
Stat cards, status chart, conversion rates — plus the first genuinely rigorous production verification: testing the live deployed app in an incognito window with a fresh account, not just trusting that local success meant production success.

### Day 7 — Smart Career Assistant
The MVP became feature-complete: follow-up detection, "needs attention" flags, suggested next actions, interview prep tips, and a weekly summary — all pure JavaScript functions over existing data. Hit a small but instructive bug: a component file was specified but never actually saved locally, causing a Vite import error — a reminder that even simple mistakes (a missed copy-paste) need the same systematic verification as complex ones.

### Day 8 — Responsive Design & Dark Mode
A full theme system (CSS custom properties, not a Tailwind rewrite — a deliberate choice to avoid touching every component's working logic) and responsive layout across all 7 pages. One noted gap (dark mode not yet confirmed on a *populated* production dashboard) was explicitly written down rather than assumed fine — and closed the very next session with a real screenshot before Day 9 began.

### Day 9 — Testing & Hardening
A structured senior-engineer review surfaced 10 concrete findings — real bugs (data silently not displayed), accessibility gaps, and security hygiene (raw database errors being shown to users). The most instructive moment of the entire build: a JSX parse error that kept reappearing at different line numbers across two "fixes," revealing that the fixes were patching symptoms, not the actual structural issue. Resolved by rewriting the file from scratch and **actually compiling it in an isolated test environment** before presenting it — upgrading the verification standard for the rest of the session rather than continuing to guess.

### Day 10 — Launch
Final review across five lenses (engineer, PM, designer, recruiter, maintainer) caught a real problem before it shipped: the GitHub README was still Vite's unedited default template. Rewritten, and — during that same review — a second near-miss was caught: a documentation link pointing to a file (`docs/PRD.md`) that had never actually been placed in the repository. Verified the real file list directly rather than assuming, and corrected the README before it went live.

---

## Skills Demonstrated

- **Product thinking**: deliberate, written-down scope exclusions from Day 1, honored through Day 10
- **System design before code**: full architecture, schema, and API design completed and validated against requirements before implementation began
- **Full-stack implementation**: React frontend, Supabase (Postgres + Auth) backend, deployed to Vercel
- **Systematic debugging**: root-causing the auth failure (Day 4) and the JSX parse error (Day 9) rather than trial-and-error patching
- **Production verification discipline**: repeatedly testing on the live URL, not just locally — catching real local/production discrepancies when they existed
- **Honest scope management**: explicitly deferring work (style deduplication on Day 9) with written reasoning, rather than silently skipping or silently over-delivering
- **Documentation as a first-class deliverable**: a complete architecture/schema/API/wireframe doc set, plus a day-by-day project log, maintained throughout — not written retroactively

---

## Final Project Summary

JobTrack AI is a complete, deployed, production-verified job application tracker: authentication, full CRUD, resume version linking, analytics, and a rule-based recommendation engine — built solo over 10 structured days, with every architectural decision traceable to a specific requirement, and every bug traceable to a specific root cause rather than a guess.

## Lessons Learned

1. **A uniform failure pattern (everything breaks at once) usually has one root cause** — don't debug six symptoms separately.
2. **Local success does not guarantee production success** — the Vercel routing issue and the dark-mode-on-populated-dashboard gap both only surfaced under direct, deliberate production testing.
3. **When a fix doesn't work twice, stop patching and rewrite** — and verify the rewrite by actually running it, not by re-reading it more carefully.
4. **Documentation drift is a real risk** — a reference to a file that was never actually created (`docs/PRD.md`) almost shipped in the final README; verifying against ground truth, not memory, caught it.
5. **Scope discipline is a skill, not a constraint** — the project's most valuable design decision (rule-based, not LLM-based, assistant) was a deliberate trade-off made on Day 1 and never revisited under pressure.

---

## A Note on This Retrospective

This document is grounded specifically in the work completed during this 10-day capstone conversation. It does not reference the broader 60-day challenge's earlier days, since that work isn't part of this session's verifiable record — the goal here is accuracy, not breadth.
