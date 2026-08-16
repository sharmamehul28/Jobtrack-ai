# JobTrack AI — Blueprint Amendments

Tracks any deviation between the original Day 1 Implementation Blueprint and what actually happened during the build. The original Blueprint document is not rewritten; this file is the authoritative record of changes, read alongside it.

---

## Amendment 1 — Auth Work Moved from Day 3 to Day 4

**Original Blueprint:** Day 3 = "Landing Page & Authentication Flow" (Signup, Login, Logout, protected routing). Day 4 = "Application Tracker — Core CRUD."

**What actually happened:** Day 3 built the foundation only (routing skeleton, AuthContext scaffold, Supabase connection) but not the actual Signup/Login/Logout UI. That UI work was pulled forward into Day 4, built *before* CRUD, so CRUD could be tested against real logged-in sessions rather than mock data.

**Why:** Attempting to test Application Tracker CRUD with no way to log in would have required either fake/hardcoded test sessions or untestable code. Building real auth first was the more honest path, even though it meant Day 4 covered more ground than originally scoped.

**Impact:** None on final scope — both auth and CRUD are now complete. The only effect is which day each was built on.

---

## Amendment 2 — Vercel Deployment Timing

**Original Blueprint:** First deploy scheduled as part of Day 2.

**What actually happened:** Deploy slipped to Day 4 (after being carried from Day 2 → Day 3 → Day 4), where it was finally completed. A subsequent SPA routing issue (404 on direct navigation to non-root routes) was discovered post-deploy and is still being resolved.

**Why:** Lower-priority relative to getting the database and auth foundation correct first; each day's carry-over was explicitly logged rather than silently dropped.

**Impact:** No feature scope change. Deployment verification is simply arriving later than the original plan, and is now the top priority to fully close out at the start of Day 5.

---

## Amendment 3 — `ProtectedRoute.jsx` Not Yet Built

**Original Blueprint:** Part of Day 3 scope.

**What actually happened:** Not built on Day 3 or Day 4. Authenticated routes currently rely on graceful UI degradation (showing "not logged in" states) rather than an actual redirect-based access guard.

**Why:** Not required to test Day 4's CRUD features, so it was consciously deferred rather than blocking CRUD implementation — but it should not be deferred again.

**Impact:** No feature scope change, but this is a real security/UX gap until closed. Explicitly scheduled as the first task of Day 5.

---

## No Other Deviations

All other work (database schema, API design, folder structure, CRUD field set, status values, etc.) has proceeded exactly as originally specified in the Day 1 Blueprint and Day 2 system design documents. No PRD requirements have changed.
