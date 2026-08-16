# JobTrack AI — Environment Configuration

**Purpose:** Single reference for every environment variable, tool version, and configuration file in the project. Keeps configuration knowledge in one place rather than scattered across days.

---

## 1. Environment Variables

| Variable | Where Used | Purpose | Secret? |
|---|---|---|---|
| `VITE_SUPABASE_URL` | `src/lib/supabaseClient.js` | The unique URL of the Supabase project's API | No — safe to expose in frontend code |
| `VITE_SUPABASE_ANON_KEY` | `src/lib/supabaseClient.js` | Public "anon" API key used to authenticate requests to Supabase | No — safe to expose; real protection comes from Row Level Security policies, not this key |

**Location:** Both variables live in a `.env` file at the project root, which is excluded from Git via `.gitignore`.

**Naming rule:** Both variables are prefixed with `VITE_` — this is a Vite requirement. Vite only exposes environment variables to frontend code if they start with this prefix; any variable without it stays server-side-only (not applicable here since there's no server, but the naming convention still matters).

**Never commit:**
- The actual `.env` file
- The Supabase **service_role** key (not used anywhere in this project — only the public anon key is used, consistent with the "no custom backend" architecture)

---

## 2. Local Development Tooling

| Tool | Version Used | Purpose |
|---|---|---|
| Node.js | LTS (18.x or 20.x) | JavaScript runtime for build tooling |
| npm | Bundled with Node.js | Package manager |
| Vite | 8.2.1 | Dev server + production build tool |
| Git | Any recent version | Version control |

To check your installed versions:
```bash
node -v
npm -v
git --version
```

---

## 3. Key Configuration Files

| File | Purpose |
|---|---|
| `.env` | Holds Supabase URL and anon key (gitignored, never committed) |
| `.gitignore` | Excludes `node_modules/`, `.env`, and build artifacts (`dist/`) from version control |
| `vite.config.js` | Configures Vite's React and Tailwind CSS plugins |
| `package.json` | Lists all dependencies and defines npm scripts (`dev`, `build`, `preview`) |
| `src/lib/supabaseClient.js` | Reads the two environment variables and creates the single shared Supabase client instance used app-wide |

---

## 4. External Service Configuration

### Supabase Project

| Setting | Value |
|---|---|
| Project name | `jobtrack-ai` |
| Region | Oceania (Sydney) |
| Plan | Free tier |
| Tables | `applications`, `resume_versions` (see `docs/SCHEMA.md`) |
| Row Level Security | Enabled on both tables, 4 policies each (select/insert/update/delete, all scoped to `auth.uid() = user_id`) |
| Auth provider | Email/Password (Supabase default) |

### GitHub Repository

| Setting | Value |
|---|---|
| Repository | `sharmamehul28/Jobtrack-ai` |
| Default branch | `main` |
| Visibility | Public |

### Vercel (to be configured on first deploy)

When deploying, the same two environment variables (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`) must be added again under **Vercel Project Settings → Environment Variables** — local `.env` files are never read by Vercel's build process.

---

## 5. npm Scripts Reference

| Command | What It Does |
|---|---|
| `npm run dev` | Starts the local development server with hot-reload |
| `npm run build` | Creates an optimized production build in `dist/` |
| `npm run preview` | Serves the production build locally, for a final check before deploying |

---

## 6. Quick Troubleshooting

- **App can't connect to Supabase:** double-check `VITE_SUPABASE_URL` is the **Project URL** from Project Settings → API, not the browser's dashboard URL.
- **Env changes not taking effect:** restart the dev server (`Ctrl+C`, then `npm run dev` again) — Vite does not hot-reload `.env` file changes.
- **`.env` shows up in `git status`:** confirm `.env` is listed in `.gitignore`; if it was already tracked before being added to `.gitignore`, it needs to be explicitly untracked with `git rm --cached .env`.
