# JobTrack AI

**A focused job-search command center for students and freshers.**

🔗 **Live App:** [jobtrack-ai-nine.vercel.app](https://jobtrack-ai-nine.vercel.app)  
📂 **Repository:** [github.com/sharmamehul28/Jobtrack-ai](https://github.com/sharmamehul28/Jobtrack-ai)

---

## What is JobTrack AI?

Students and freshers applying to internships and entry-level roles often juggle dozens of applications across spreadsheets, notes apps, and memory — with no clear view of what's working, what's gone quiet, or what to do next.

JobTrack AI is a single, private dashboard that tracks every application, links resume versions used per application, visualizes progress with real analytics, and proactively surfaces what needs attention — powered entirely by deterministic, rule-based logic (no external AI API calls, no cost, no latency).

## Features

- 🔐 **Secure Accounts** — private, per-user data via Supabase Auth, enforced with Postgres Row Level Security
- 📋 **Application Tracker** — full CRUD: company, role, status, dates, job link, notes, linked resume version
- 📄 **Resume Version Manager** — track which tailored resume was sent where
- 📊 **Analytics Dashboard** — status breakdown chart, interview/offer conversion rates, summary stats
- 🧠 **Smart Career Assistant** — rule-based follow-up reminders, "needs attention" flags, suggested next actions, and interview prep tips — all computed instantly from your own data
- 🌗 **Light & Dark Mode** — full theme support, persisted across sessions
- 📱 **Fully Responsive** — usable on desktop, tablet, and mobile

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React + Vite |
| Styling | CSS custom properties (theme system) |
| Database | Supabase (Postgres) |
| Authentication | Supabase Auth |
| Charts | Recharts |
| Hosting | Vercel |

No custom backend server, no external AI/LLM API calls, no paid services — every layer runs on a free tier.

## Screenshots

*(Add screenshots here — see `docs/UI-WIREFRAMES.md` for design reference and wireframes)*

## Getting Started Locally

### Prerequisites

- Node.js (LTS)
- A free [Supabase](https://supabase.com) account

### Setup

```bash
git clone https://github.com/sharmamehul28/Jobtrack-ai.git
cd Jobtrack-ai
npm install
```

Create a `.env` file in the project root:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Run the database schema setup SQL found in [`docs/SCHEMA.md`](docs/SCHEMA.md) inside your Supabase project's SQL Editor, then:

```bash
npm run dev
```

Visit `http://localhost:5173`.

Full setup details: [`docs/SETUP.md`](docs/SETUP.md)

## Project Documentation

This project was built over a structured 10-day sprint with full design and process documentation retained:

- [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) — System architecture & diagrams
- [`docs/SCHEMA.md`](docs/SCHEMA.md) — Database schema
- [`docs/API.md`](docs/API.md) — API/data operation contracts
- [`docs/UI-WIREFRAMES.md`](docs/UI-WIREFRAMES.md) — User flow & wireframes
- [`docs/PROJECT-STRUCTURE.md`](docs/PROJECT-STRUCTURE.md) — Folder structure guide
- [`docs/SETUP.md`](docs/SETUP.md) — Full local setup guide
- [`docs/ENVIRONMENT.md`](docs/ENVIRONMENT.md) — Environment variables & configuration reference
- [`PROJECT-LOG.md`](PROJECT-LOG.md) — Full day-by-day build log (Days 1–9)

## Project Status

**v1.0.0 — Complete.** Built as the 10-day capstone project for the AB Talks 60-Day Claude AI Challenge, taking the product from requirements through design, implementation, testing, and deployment.

## License

This project was built for educational/portfolio purposes as part of the AB Talks 60-Day Claude AI Challenge.
