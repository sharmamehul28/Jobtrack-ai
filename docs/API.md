# JobTrack AI — API Design

**Status:** Locked for v1.0 — Day 2 Design Document
**Approach:** No custom backend API server. All "endpoints" below are Supabase's auto-generated REST API (PostgREST), accessed exclusively through the `@supabase/supabase-js` client library — never called with raw `fetch()`.

This document lists every data operation v1.0 requires, in endpoint form, so the contract is clear before implementation begins on Day 3+. No code is written today.

---

## 0. Why There Are No Custom Endpoints

Per the locked architecture, Supabase automatically exposes a REST API over the `applications` and `resume_versions` tables. The Supabase JS client wraps these calls in convenient methods (`.select()`, `.insert()`, `.update()`, `.delete()`). We use those methods directly from React — there is no Express/Node/Flask server in this project, and there will not be one.

All "endpoints" documented below are therefore **conceptual operations**, mapped to their Supabase client method, not routes we implement ourselves.

---

## 1. Authentication Operations

These use Supabase Auth directly — not the `applications`/`resume_versions` REST API.

### 1.1 Sign Up

- **Purpose:** Create a new user account.
- **Client call:** `supabase.auth.signUp({ email, password })`
- **Request:** `{ email: string, password: string }`
- **Response (success):** `{ user: {...}, session: {...} }`
- **Response (error):** `{ error: { message: string } }`
- **Validation:** Email format checked client-side before submit; password minimum length enforced by Supabase Auth settings (default: 6 characters).
- **Auth required:** No (this creates the auth).
- **Error cases:**
  - Email already registered → show "An account with this email already exists."
  - Weak password → show Supabase's returned message.
  - Network failure → show generic "Something went wrong, please try again."

### 1.2 Log In

- **Purpose:** Authenticate an existing user.
- **Client call:** `supabase.auth.signInWithPassword({ email, password })`
- **Request:** `{ email: string, password: string }`
- **Response (success):** `{ user: {...}, session: {...} }`
- **Response (error):** `{ error: { message: string } }`
- **Validation:** Both fields required (non-empty) before submit.
- **Auth required:** No.
- **Error cases:**
  - Wrong password / unknown email → "Invalid login credentials."
  - Unconfirmed email (if confirmation enabled) → show relevant message.

### 1.3 Log Out

- **Purpose:** End the current session.
- **Client call:** `supabase.auth.signOut()`
- **Request:** none
- **Response:** `{ error: null }` on success
- **Auth required:** Yes (must have an active session).
- **Error cases:** Network failure — retry or show generic error.

### 1.4 Get Current Session

- **Purpose:** Check if a user is already logged in (on app load / refresh).
- **Client call:** `supabase.auth.getSession()`
- **Response:** `{ data: { session: {...} | null } }`
- **Auth required:** No.

---

## 2. Applications Operations

All calls target the `applications` table via `supabase.from('applications')`. Row Level Security guarantees a user only ever sees/modifies their own rows — no manual `user_id` filtering is required on reads, but `user_id` **must** be explicitly included on every insert.

### 2.1 List Applications

- **Purpose:** Fetch all applications belonging to the current user (for dashboard, list view, analytics, assistant panel).
- **Client call:** `supabase.from('applications').select('*').order('created_at', { ascending: false })`
- **Request:** none (RLS auto-filters to current user)
- **Response (success):** `{ data: [ {id, company_name, job_title, status, date_applied, job_link, resume_version_id, interview_date, notes, status_updated_at, created_at}, ... ], error: null }`
- **Response (empty state):** `{ data: [], error: null }`
- **Auth required:** Yes.
- **Error cases:** Not authenticated → RLS returns empty array, not an error (handle by redirecting to login via ProtectedRoute, not by inspecting this response).

### 2.2 Create Application

- **Purpose:** Add a new job application.
- **Client call:** `supabase.from('applications').insert({ ...fields, user_id: session.user.id })`
- **Request body:**
  ```json
  {
    "user_id": "uuid (from current session)",
    "company_name": "string, required",
    "job_title": "string, required",
    "status": "one of: Applied | Assessment | Interview | Rejected | Offer",
    "date_applied": "YYYY-MM-DD, required",
    "job_link": "string, optional",
    "resume_version_id": "uuid, optional/nullable",
    "interview_date": "YYYY-MM-DD, optional",
    "notes": "string, optional",
    "status_updated_at": "ISO timestamp, set to now() on create"
  }
  ```
- **Response (success):** `{ data: [ {...newly created row} ], error: null }`
- **Validation (client-side, before submit):** `company_name`, `job_title`, `status`, `date_applied` are required and non-empty; `status` must be one of the five allowed values (also enforced by DB `CHECK` constraint as a safety net).
- **Auth required:** Yes.
- **Error cases:**
  - Missing required field → DB `NOT NULL` constraint violation → show "Please fill in all required fields."
  - Invalid status value → DB `CHECK` constraint violation → shouldn't happen if UI uses a dropdown, but handle gracefully.
  - RLS violation (`user_id` mismatch or missing) → show generic error, log to console for debugging.

### 2.3 Update Application

- **Purpose:** Edit an existing application (including status changes).
- **Client call:** `supabase.from('applications').update({ ...changedFields }).eq('id', applicationId)`
- **Request body:** Same shape as Create, but only changed fields need to be sent. **If `status` is included and differs from the current value, `status_updated_at` must also be set to `now()` in the same call** — this is application logic, not automatic, and is essential for the Smart Assistant's follow-up detection to work correctly.
- **Response (success):** `{ data: [ {...updated row} ], error: null }`
- **Validation:** Same field rules as Create.
- **Auth required:** Yes.
- **Error cases:**
  - Application ID doesn't belong to current user → RLS blocks the update, `data` returns empty array (not an error) — UI should treat empty response as "update failed silently" and show an error.
  - Invalid field values → DB constraint violation.

### 2.4 Delete Application

- **Purpose:** Remove an application permanently.
- **Client call:** `supabase.from('applications').delete().eq('id', applicationId)`
- **Request:** none beyond the ID.
- **Response (success):** `{ data: [ {...deleted row} ], error: null }`
- **Auth required:** Yes.
- **Error cases:** ID not owned by current user → RLS blocks, empty response.
- **UI requirement:** Confirm via `window.confirm()` before calling (per Blueprint Day 4 plan).

---

## 3. Resume Versions Operations

All calls target `resume_versions` via `supabase.from('resume_versions')`, same RLS-backed pattern as Applications.

### 3.1 List Resume Versions

- **Purpose:** Populate the dropdown in ApplicationForm, and the Resume Versions management page.
- **Client call:** `supabase.from('resume_versions').select('*').order('created_at', { ascending: false })`
- **Response (success):** `{ data: [ {id, name, created_at}, ... ], error: null }`
- **Auth required:** Yes.

### 3.2 Create Resume Version

- **Purpose:** Add a new named resume version.
- **Client call:** `supabase.from('resume_versions').insert({ name, user_id: session.user.id })`
- **Request body:** `{ "name": "string, required", "user_id": "uuid" }`
- **Response (success):** `{ data: [ {...new row} ], error: null }`
- **Validation:** `name` non-empty, reasonable max length (client-side check, e.g. 100 chars).
- **Auth required:** Yes.
- **Error cases:** Empty name → block submit client-side before the call is even made.

### 3.3 Update Resume Version

- **Purpose:** Rename an existing resume version.
- **Client call:** `supabase.from('resume_versions').update({ name }).eq('id', versionId)`
- **Request body:** `{ "name": "string, required" }`
- **Response (success):** `{ data: [ {...updated row} ], error: null }`
- **Auth required:** Yes.

### 3.4 Delete Resume Version

- **Purpose:** Remove a resume version.
- **Client call:** `supabase.from('resume_versions').delete().eq('id', versionId)`
- **Response (success):** `{ data: [ {...deleted row} ], error: null }`
- **Auth required:** Yes.
- **Side effect:** Any `applications` rows referencing this `resume_version_id` will have that field automatically set to `null` (via the `ON DELETE SET NULL` foreign key defined in SCHEMA.md) — no manual cleanup code needed.

---

## 4. Derived / Client-Only Operations (No Network Call)

These are **not** API endpoints — they're pure JavaScript functions that run on data already fetched via 2.1 and 3.1. Documented here for completeness since the PRD treats them as product features.

| Operation | Function | Input | Output |
|---|---|---|---|
| Compute analytics stats | `computeStats(applications)` | Array of applications | `{ totalApplications, totalInterviews, totalRejections, totalOffers, statusCounts, interviewConversionRate, offerConversionRate }` |
| Follow-up flags | `getFollowUpFlags(applications)` | Array of applications | Filtered array of applications needing follow-up |
| Needs-attention flags | `getNeedsAttention(applications)` | Array of applications | Filtered array of stuck applications |
| Suggested next action | `getSuggestedAction(application)` | One application | String (e.g. `"Follow Up"`) |
| Interview prep tips | `getInterviewPrepTips(application)` | One application | Array of tip strings, or `[]` |
| Weekly summary | `getWeeklySummary(applications)` | Array of applications | `{ applicationsThisWeek, interviewsThisWeek, followUpsNeeded, offersTotal, recommendedFocus }` |

No request/response contract applies here since there's no network involved — these are documented in full in the Blueprint's Day 7 section.

---

## 5. Summary Table

| # | Operation | Table/Service | Auth Required | Client Method |
|---|---|---|---|---|
| 1.1 | Sign Up | Supabase Auth | No | `auth.signUp()` |
| 1.2 | Log In | Supabase Auth | No | `auth.signInWithPassword()` |
| 1.3 | Log Out | Supabase Auth | Yes | `auth.signOut()` |
| 1.4 | Get Session | Supabase Auth | No | `auth.getSession()` |
| 2.1 | List Applications | `applications` | Yes | `.select()` |
| 2.2 | Create Application | `applications` | Yes | `.insert()` |
| 2.3 | Update Application | `applications` | Yes | `.update()` |
| 2.4 | Delete Application | `applications` | Yes | `.delete()` |
| 3.1 | List Resume Versions | `resume_versions` | Yes | `.select()` |
| 3.2 | Create Resume Version | `resume_versions` | Yes | `.insert()` |
| 3.3 | Update Resume Version | `resume_versions` | Yes | `.update()` |
| 3.4 | Delete Resume Version | `resume_versions` | Yes | `.delete()` |

**Total data operations for v1.0: 12** (4 auth + 4 applications + 4 resume versions), plus 6 client-only derived functions. This is the complete API surface — no additions expected for the remainder of the build.
