# Scrub & Scale

**Why Clean Data Is the Foundation of Enterprise AI**

A production-grade, interactive single-page application demonstrating the critical role of data quality — specifically semantic data modeling and data hygiene — as the prerequisite for any successful AI implementation in the Aerospace & Defense industry.

Built for program leadership who understand program management but may have no coding background. Every technical concept is explained in plain, accessible language. No page reloads. No server required.

---

<!-- screenshot -->

---

## Live Demo

[https://rwhale.github.io/scrub-and-scale](https://rwhale.github.io/scrub-and-scale)

---

## Purpose

This demonstration is designed for executive and director-level leadership in A&D program management environments. It walks through six sequential steps using realistic, notional Integrated Master Schedule (IMS) data from a fictional satellite program (SENTINEL-7):

1. **The Raw Data** — What a Deltek Open Plan export actually looks like before any quality controls are applied
2. **The SQL Query** — A standard EVM performance query and what happens when bad data is its input
3. **The Problems** — 10 annotated data quality failures and their specific consequences for AI systems
4. **The Auditor** — An automated Python script that detects all 10 issue categories in seconds
5. **The Fix** — Auto-correction for unambiguous issues; disciplined human-review workflow for the rest
6. **The Monitor** — Continuous watchdog monitoring that keeps data AI-ready across every reporting cycle

**Target audience:** Program Controls, Finance, Systems Engineering leadership, and anyone making AI investment decisions at major defense programs.

---

## Technical Overview

| File | Purpose |
|------|---------|
| `index.html` | Single-page application. All 8 sections rendered here; JS handles routing and transitions. |
| `style.css` | Complete styling. CSS custom properties, animations, responsive layout. No build step needed. |
| `app.js` | Section navigation, step transitions, progress bar, section-entry hooks. |
| `data.js` | All hardcoded data: 22-row IMS table, query results, audit card definitions, terminal output lines, Python/SQL code strings. |
| `simulator.js` | All interactive simulation logic: SQL query runner, bad-data reveal, auditor terminal animation, corrections, monitor console, Chart.js chart. |
| `scripts/` | Original Python audit engine, data generator, and PowerShell integration hooks (separate from the SPA demo). |

**External dependencies (CDN only — no local packages required):**
- [Tailwind CSS](https://tailwindcss.com/) — utility classes
- [Google Fonts](https://fonts.google.com/) — Orbitron, IBM Plex Sans, JetBrains Mono
- [Chart.js](https://www.chartjs.org/) — audit trend chart in Step 6

---

## Deploy to GitHub Pages

**From the repository root (simplest):**

1. Push all files to the `main` branch
2. Go to **Settings → Pages** in your GitHub repository
3. Under **Source**, select **Deploy from a branch**
4. Select `main` branch and `/ (root)` folder
5. Click **Save**

Your site will be live at `https://[username].github.io/[repo-name]/` within a few minutes.

**From a `/docs` folder:**

1. Create a `docs/` folder and move `index.html`, `style.css`, `app.js`, `data.js`, `simulator.js` into it
2. In GitHub Pages settings, select the `main` branch and `/docs` folder as the source

The site is fully static — no server configuration, build tools, or backend required.

---

## How to Extend with Real OPP Data

The demonstration uses notional data defined in `data.js`. To adapt it for a real program:

1. **Replace the data table** — Edit `SS.rawTableData` in `data.js` with actual OPP export rows. Each row is a plain JavaScript object with the same column names. Mark bad cells using the `_badCells` property: `{ WBS_CODE: 1 }` links a cell to Audit Card #1.

2. **Update audit card content** — The 10 cards in `SS.auditCards` can be updated to reflect the specific issues found in your program's data, including different affected task IDs and AI risk descriptions.

3. **Adjust query results** — `SS.queryResultsData` contains the 10 simulated query result rows. Update these to match what a real query against your data would return.

4. **Change the Python scripts** — The `SS.pythonAuditorCode`, `SS.pythonCorrectionsCode`, and `SS.pythonMonitorCode` strings in `data.js` are display-only code panels. The actual executable versions live in the `scripts/` directory.

5. **Sensitive data warning** — Never commit real program data, personally identifiable information, or controlled unclassified information (CUI) to a public repository. This tool is designed for notional/illustrative data only.

---

## Author

**Rob Hale**
Program Finance Systems Analyst

Expertise: Integrated Program Management (IPM), Deltek Open Plan (OPP), Earned Value Management (EVM), Enterprise Data Systems, Aerospace & Defense Program Controls

[LinkedIn](https://www.linkedin.com/in/halerobert/) | [GitHub](https://github.com/rwhale)

---

## License

MIT License — free to use, adapt, and distribute with attribution.

---

*"AI doesn't scale on demos. It scales on fundamentals."*
