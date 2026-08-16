# JobTrack AI — Setup Guide

**Purpose:** Complete instructions to get this project running locally from a fresh clone. Written from the actual Day 2–3 setup process.

---

## Prerequisites

| Tool | Why It's Needed |
|---|---|
| **Node.js (LTS)** | Runs the JavaScript build tooling (Vite, npm) that powers the React app |
| **npm** (included with Node.js) | Installs and manages project dependencies |
| **Git** | Version control; clones the repo and tracks changes |
| **A code editor** (VS Code recommended) | Editing project files |
| **A Supabase account** (free) | Hosts the database and handles authentication |
| **A GitHub account** | Hosts the repository; will later trigger Vercel deploys |

---

## 1. Clone the Repository

```bash
git clone https://github.com/sharmamehul28/Jobtrack-ai.git
cd Jobtrack-ai
```

## 2. Install Dependencies

```bash
npm install
```

This installs React, Vite, Tailwind CSS, React Router, and the Supabase client library, as defined in `package.json`.

## 3. Set Up Environment Variables

Create a file named `.env` in the project root (this file is gitignored and never committed):

```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Both values are found in your Supabase project under **Project Settings → API**. See `ENVIRONMENT.md` for full details on each variable.

## 4. Set Up the Supabase Database

If starting from a fresh Supabase project, run the full schema script from `docs/SCHEMA.md` (Section 4: "Full Ordered Setup Script") in the Supabase SQL Editor. This creates the `applications` and `resume_versions` tables along with Row Level Security policies.

## 5. Run the Development Server

```bash
npm run dev
```

Visit `http://localhost:5173` in your browser. You should see the Landing page placeholder.

## 6. Verify the Production Build

Before considering any day's work complete, confirm the app builds cleanly for production:

```bash
npm run build
```

Look for `✓ built in X.XXs` with no red error output.

---

## Common Setup Issues (Encountered During This Project)

| Issue | Cause | Fix |
|---|---|---|
| Supabase connection test failed | `.env` contained the Supabase **dashboard** URL instead of the **project API URL** | Copy the URL from Project Settings → API, not the browser address bar |
| Blank/broken dev server after `.env` edit | Vite doesn't hot-reload `.env` changes | Stop (`Ctrl+C`) and restart `npm run dev` after any `.env` edit |
| `.env` accidentally staged in `git status` | Rare, but possible if `.gitignore` wasn't set up first | Confirm `.env` is listed in `.gitignore` before running `git add .` |

---

## Tooling Summary (Why Each Tool Was Chosen)

- **Vite** over Create React App: faster dev server, faster builds, actively maintained, minimal config.
- **Tailwind CSS**: utility-first styling that's fast to write and easy for a beginner to reason about without hand-writing custom CSS files.
- **Supabase**: managed Postgres + Auth in one free service — removes the need to build or host a custom backend, which was the single biggest complexity risk for a 10-day beginner build.
- **React Router**: the standard, well-documented routing library for React SPAs; large amount of AI-assist and tutorial coverage.
- **Vercel** (used from Day 3 onward for deployment): free tier, git-push deploys, zero-config for Vite projects.

All choices match the tech stack finalized and approved on Day 1.
