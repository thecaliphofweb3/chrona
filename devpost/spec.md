---
doc: spec
status: approved
---

# Chrona — Technical Spec

## How This Works, In Plain Language

Chrona will be one website built from several small React components—one for each major part of the experience, such as the welcome, schedule, meals, and outfit preview. React is useful here because each component can own one visible job while still sharing the same daily plan.

The website runs entirely in the visitor’s browser. Their typed schedules and meals are saved in the browser’s local storage, which is like a small private sticky note kept for this specific website. There is no account, server, or online database in this proof of concept. Their uploaded clothing pictures are intentionally kept only while the page is open, so the app does not need to send personal wardrobe images anywhere.

Vite provides the local development server and prepares the finished static website. GitHub stores the project code, and Vercel publishes the static website from that GitHub repository. This is the simplest shape that supports both the public link the learner wants and the one-person, one-day planning experience in the PRD.

## The Core Journey Through the System

PRD ref: `prd.md > The Core Journey`.

1. **Welcome** — `WelcomeScreen` renders a supplied sunrise image, the “Good Morning” greeting, and a quote selected from a small local list in `src/data/quotes.js`.
2. **Choose an area** — continuing changes the visible React view to `PlanningHub`, which presents schedule, meal, and outfit controls with the established first-use text.
3. **Set plans** — a person enters schedule descriptions and times in `SchedulePlanner`, types meals and optional calories in `MealPlanner`, and selects images plus a shape in `OutfitPlanner`. Each typed change updates the shared day-plan data.
4. **Save safely in the browser** — after schedule, meal, or shape data changes, `storage.js` saves a small JSON version of the day plan to `localStorage`. When the person returns to the same site in the same browser, React reads that JSON and restores the plan. Outfit image files stay only in the current page session.
5. **Alarm and notification** — `alarm.js` periodically checks open schedule times. At a matching time it opens an in-app alarm panel and plays a short browser-generated tone. If the person has explicitly enabled notifications, it also asks the browser to show one. Alerts are not promised after the page is closed.
6. **Daily tip and outfit preview** — `MealPlanner` selects one general wellness tip based on the date from the local `wellnessTips.js` list and shows its World Health Organization source link. `MannequinPreview` layers the current clothing images over a simple selected-shape mannequin. It is an outfit composition, not a fit calculation.
7. **Completion** — when the person has added content to the day’s planning areas, `CompletionPanel` shows “PERFECT, hope your day goes as planned.”

## Stack

- **JavaScript + React** — React structures the visual product into small screen and feature components. This follows the learner’s agreement to a simple React app; it avoids a larger full-stack framework. [React documentation](https://react.dev/learn).
- **Vite** — provides fast local development and creates the static files Vercel serves. The current Vite guide documents React templates and local development. [Vite Getting Started](https://vite.dev/guide/).
- **Plain CSS** — keeps the warm white and purple visual identity fully custom without adding a design-library dependency.
- **Browser `localStorage`** — stores the small text-based daily plan for the same browser. `localStorage` persists across browser sessions for the same site; it is not a shared online account. [MDN: Web Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API).
- **Browser Notifications API** — used only after a visible, user-triggered permission request. The app always has an in-app alarm fallback. [MDN: Notifications API](https://developer.mozilla.org/en-US/docs/Web/API/Notifications_API/Using_the_Notifications_API).
- **Vercel** — deploys the static Vite build from a connected public GitHub repository. A Git push can trigger a deployment. [Vercel deployment documentation](https://vercel.com/docs/deployments/overview).

Exact package versions will be pinned in `package-lock.json` when the project is scaffolded. Before scaffolding, verify the installed Node.js version meets the current Vite requirement.

## Where It Runs and How Someone Tries It

- **Local development:** Node.js runs Vite on the learner’s computer. After installation, run `npm run dev` in the project folder and open the local address Vite prints in the terminal.
- **Production build check:** run `npm run build`; Vite writes the website files to `dist/`. Run `npm run preview` to inspect that production build locally.
- **Public site:** push the project to a public GitHub repository, import that repository into Vercel, and accept Vercel’s Vite settings (`npm run build` and `dist/`). Each later GitHub push can redeploy the site.
- **Submission evidence:** record the working public or local site in a 1–3 minute video and include both that video and the public GitHub repository in the Devpost submission. A public site supports the demo but does not replace the required video.

No API keys, paid services, database accounts, or server environment variables are required for this proof of concept.

## Look and Feel

Implements `prd.md > Look and Feel`.

- Use warm white as the base, purple for primary controls and highlights, and gentle translucent surfaces so the supplied wallpapers remain visible without reducing readability.
- Use a welcoming serif-style system heading for “Good Morning” and a clear system sans-serif for controls and form fields; no external font download is needed.
- Keep the layout spacious, encouraging, and legible rather than dense or dashboard-like.
- Store learner-provided sunrise and section wallpapers in `public/assets/`. Until they arrive, use clearly marked temporary gradient backgrounds so the app can be built and tested first.
- Display the World Health Organization source as a small, clear link beneath each general wellness tip. Tips must be short paraphrases, not personal health recommendations.

## Components

### App Shell and View Controller

Holds the shared day-plan data, chooses which surface is visible, restores stored text data on startup, and writes changes back to storage.
PRD refs: `prd.md > The Core Journey`, `States and Boundaries`.

### WelcomeScreen

Displays the sunrise wallpaper, bold “Good Morning” greeting, selected quote, and the control to continue to planning.
PRD refs: `prd.md > Welcome Screen`, `Morning Motivation`.

### PlanningHub

Displays “Kick start this day with a clear plan” and “Choose where to begin,” then links the person to schedule, meals, and outfits.
PRD refs: `prd.md > Planning Selection`, `States and Boundaries`.

### SchedulePlanner

Lets the person add a description and time, shows saved plans, and passes the schedule to the alarm checker.
PRD refs: `prd.md > Schedule Planning`, `Daily Schedule and Alarms`.

### AlarmMonitor and AlarmPanel

Checks open-page schedule times, presents the visible in-app alarm, plays a short tone after the person has interacted with the page, and optionally sends a browser notification when permission is granted.
PRD refs: `prd.md > Daily Schedule and Alarms`, `Deferred From the POC`.

### MealPlanner and WellnessTip

Shows breakfast, lunch, and dinner inputs with optional calorie fields. It also displays the date-selected general wellness tip and its source link.
PRD refs: `prd.md > Meal Planning`, `Meals and Optional Calories`.

### OutfitPlanner and MannequinPreview

Accepts one image per clothing category, lets the person choose standard, slim, or plus-size, and renders the selected images over the corresponding simple mannequin regions.
PRD refs: `prd.md > Outfit Planning`, `Mannequin Outfit Preview`.

### CompletionPanel

Shows the established positive completion message after the person has added their day’s plan.
PRD ref: `prd.md > Completion View`.

## Data Model

All stored values use a single `chrona-day-plan` JSON item in browser `localStorage`:

```js
{
  schedule: [
    { id: "...", description: "Morning workout", time: "07:00" }
  ],
  meals: {
    breakfast: { text: "", calories: "" },
    lunch: { text: "", calories: "" },
    dinner: { text: "", calories: "" }
  },
  bodyShape: "standard"
}
```

- **Schedule, meal text, optional calories, and body shape** originate from user input, update the shared React data, and are saved to `localStorage`. They return on a later visit in the same browser.
- **Quotes and wellness tips** are versioned application data in local JavaScript files. The app selects an item from each small list using the current date; no data is fetched at runtime.
- **Outfit images** originate from file input. The app uses temporary browser object URLs to preview them; they are not written to `localStorage`, committed to Git, uploaded to Vercel, or shared with anyone. Refreshing or closing the page requires selecting them again.
- **Alarm status** is temporary in-browser data. The browser itself remembers whether notifications were allowed or denied.

## File Structure

```text
KETCHA/
├── public/
│   └── assets/                    # Learner-supplied wallpapers and static visual assets
├── src/
│   ├── components/
│   │   ├── WelcomeScreen.jsx       # Greeting, quote, and welcome transition
│   │   ├── PlanningHub.jsx         # Three planning-area entry points
│   │   ├── SchedulePlanner.jsx     # Timed plan form and plan list
│   │   ├── AlarmPanel.jsx          # Visible in-app alarm fallback
│   │   ├── MealPlanner.jsx         # Meal and optional-calorie inputs
│   │   ├── WellnessTip.jsx         # Rotating tip and source link
│   │   ├── OutfitPlanner.jsx       # Five clothing image inputs and shape control
│   │   ├── MannequinPreview.jsx    # Simple visual clothing composition
│   │   └── CompletionPanel.jsx     # Final encouragement
│   ├── data/
│   │   ├── quotes.js               # Small local motivational-quote list
│   │   └── wellnessTips.js         # Curated general tips with WHO source URLs
│   ├── lib/
│   │   ├── storage.js              # Read/write browser day-plan JSON safely
│   │   └── alarm.js                # Time checks, tone, and notification helper
│   ├── App.jsx                     # Shared plan data and visible-app flow
│   ├── main.jsx                    # React browser entry point
│   └── styles.css                  # Responsive warm-white and purple styling
├── devpost/                        # Scope, PRD, spec, and build checklist
├── index.html                      # Vite HTML entry point
├── package.json                    # Commands and dependencies
├── package-lock.json               # Locked package versions
├── vite.config.js                  # Vite configuration if scaffold requires it
├── README.md                       # Setup, demo, and Vercel deployment steps
└── .gitignore                      # Ignores private learner context and local files
```

## External Services and Dependencies

### GitHub and Vercel Deployment

- **Purpose:** GitHub hosts the public project repository; Vercel turns the Vite build into a public website.
- **Published links:** repository: [github.com/thecaliphofweb3/chrona](https://github.com/thecaliphofweb3/chrona); live site: [chrona-smoky.vercel.app](https://chrona-smoky.vercel.app).
- **Interaction:** no application API request is made. The learner imports the GitHub repository in the Vercel dashboard; Vercel builds from `package.json` on each chosen Git push.
- **Credentials and cost:** no key is embedded in application code. The learner signs into GitHub and Vercel during deploy and should choose an account plan appropriate to them.
- **Docs:** [Vercel deployment overview](https://vercel.com/docs/deployments/overview).

### Browser Storage and Notifications

- **Purpose:** store the one-person day plan and show optional system notifications.
- **Interaction:** the app calls browser `localStorage` read/write methods and asks for notification permission only after a button click. There is no server endpoint, token, or rate limit.
- **Fallback:** if storage is unavailable, the page still works for the open session; if notification permission is denied or unsupported, the in-app alarm remains visible.
- **Docs:** [MDN Web Storage](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API) and [MDN notification permissions](https://developer.mozilla.org/en-US/docs/Web/API/Notification/requestPermission_static).

### Curated WHO-Attributed Wellness Tips

- **Purpose:** provide the daily general wellness prompt requested in `prd.md > Meal Planning`.
- **Interaction:** no live WHO API or website request. `wellnessTips.js` contains short paraphrased tips and the official source URL displayed in the app.
- **Content rule:** use only reviewed, general public-health wording; do not give individual medical advice, invent numeric targets, or imply the app is endorsed by WHO.
- **Sources to review when seeding tips:** [WHO healthy diet fact sheet](https://www.who.int/news-room/fact-sheets/detail/healthy-diet), [WHO/FAO healthy-diet principles](https://www.who.int/publications/i/item/9789240101876), and [WHO drinking-water fact sheet](https://www.who.int/news-room/fact-sheets/detail/drinking-water/).

## Important Failure Modes

- **A person denies browser notifications or their browser does not support them** → show a clear “notifications are off” message and rely on the in-app alarm while the page is open.
- **Browser storage is unavailable or full** → keep the current plan visible in the open page and show a simple message that it could not be saved for later.
- **A clothing image cannot be selected or displayed** → keep the mannequin visible, label that category as missing, and let the person retry without losing their other selections.
- **Learner wallpapers are not yet supplied** → use the temporary gradient backgrounds and replace only the asset files later; planning behavior is unaffected.

## What Was Simplified and Why

- **Browser `localStorage`** instead of user accounts and a database — each visitor keeps their own plan without account setup, hosting credentials, or a server. A later shared or multi-device version would need authenticated storage.
- **Open-page in-app alarms plus optional browser notifications** instead of dependable alerts after the website is closed — this proves the timed-plan idea without background services, push infrastructure, or a mobile app.
- **Temporary browser-only outfit previews** instead of cloud image storage — it protects personal wardrobe images and removes storage infrastructure. A lasting wardrobe would need an upload service and privacy design.
- **A local rotating wellness-tip list** instead of live WHO content — it is dependable in the demo and avoids an external content dependency. Tips still show their official source links.
- **A simple layered mannequin** instead of photorealistic virtual try-on or fit analysis — it demonstrates outfit composition without claiming physical accuracy.

## Decisions and Open Issues

- **Learner decision: public availability** — publish the app through GitHub and Vercel rather than only recording a local app. Tradeoff: deployment setup is added, but people can open a public link.
- **Learner agreement: React, Vite, and plain CSS** — a small browser-only app with no server or database. Tradeoff: each browser has its own data; users cannot share or sync plans.
- **Learner agreement: saved plans but temporary wardrobe images** — save text-based planning data in the browser while keeping images in the current session only. Tradeoff: images must be selected again after refresh.
- **Learner agreement: alarms while the page is open** — use an in-app alarm with optional browser notifications after permission. Tradeoff: it does not promise background alerts after closing the page.
- **Learning support** — the learner wants explanations during real build steps rather than a separate technical lesson. No single technical uncertainty was selected; `5-build` will explain each new command, file, and verification when it becomes relevant.
- **Open asset task, non-blocking** — the learner will supply sunrise, schedule, meal, and outfit wallpapers before the visual finish. Temporary gradients allow all feature work to begin first.
- **Open content task, non-blocking** — before the wellness-tip list is finalised, review every tip against its linked official source and keep it general, attributed, and non-personalised.
