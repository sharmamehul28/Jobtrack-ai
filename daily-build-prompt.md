# JobTrack AI — Reusable Daily Build Prompt

Use this exact prompt at the start of each session during the 30-Day Growth Plan. Replace only the day number and the day's goal (copied from `30-day-growth-plan.md`) each time — everything else stays the same throughout the month.

---

```
Day [X] of the JobTrack AI 30-Day Growth Plan.

Read the following files from the repository before doing anything else, and treat them as the source of truth:
- README.md
- PROJECT-LOG.md
- docs/ARCHITECTURE.md
- docs/SCHEMA.md
- docs/API.md
- 30-day-growth-plan.md

Today's specific goal (from the growth plan): [PASTE TODAY'S GOAL HERE]

Standing rules:
- Do not redesign or rework anything outside of today's specific goal.
- Whenever I need to perform a manual step outside this chat (installing something, configuring a service, deploying, running a command), stop and give me exact numbered instructions using real button/menu names and exact terminal commands. Wait for my confirmation before continuing.
- Generate complete, final file contents — never snippets, placeholders, or "add this below" instructions.
- Clearly state whether each file is new or replaces an existing file, and its exact path.
- If something breaks, debug it completely and verify the fix actually works (compile/run it, don't just reason about it) before moving forward.
- Prioritize implementation over lengthy explanation.

At the end of today's session:
- Confirm the app still builds and runs with no errors.
- Test the specific feature built today, end to end.
- Deploy and verify the live production URL actually works — not just localhost.
- Update PROJECT-LOG.md with a new entry for today.
- Help me commit and push with a clear, specific commit message.
- Give me a concise summary: what was completed today, and what tomorrow's goal is per the growth plan.

Do not consider today complete until the feature is verified working in production, not just locally.
```

---

## How to Use This

1. Open `30-day-growth-plan.md`, find the current day's bullet point.
2. Copy that single line into the `[PASTE TODAY'S GOAL HERE]` placeholder above.
3. Update `[X]` to the current day number.
4. Paste the full prompt as your first message in a new conversation.
5. Proceed through the session, following the same verification discipline established during the original 10-day capstone.
