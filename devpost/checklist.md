---
doc: checklist
status: approved
---

# Build Checklist

Build mode: fast

## Slices

- [x] **1. A motivating welcome leads into the three planning choices**
  Becomes usable: Chrona runs as a website. A visitor sees the sunrise-style welcome, “Good Morning” greeting, motivational quote, and can continue to the schedule, meal, and outfit choices.
  Why now: This puts the unique kernel—a motivating start that leads into practical preparation—on screen immediately. Project setup is included only because it produces this first visible experience.
  PRD ref: `prd.md > The Core Journey` (steps 1–3), `Welcome Screen`, `Planning Selection`, `Morning Motivation`
  Spec ref: `spec.md > Stack`, `How This Works, In Plain Language`, `App Shell and View Controller`, `WelcomeScreen`, `PlanningHub`, `Look and Feel`, `File Structure`
  Build: Add the Vite and React project files at the project root without disturbing `devpost/`; extend `.gitignore` with build-output and dependency folders; install dependencies; create the warm-white and purple app shell, temporary sunrise gradient, local quote data, welcome screen, and planning hub with the established text.
  Verify (mechanical): Run `npm run build`, then start the local app and confirm the welcome control switches to the three planning choices without browser-console errors.
  Learner check: Open the app, read the greeting and quote, select “Plan your day,” and tell me whether the opening feels calm and motivating.
  Commit: `feat: add morning welcome and planning hub`

- [x] **2. Timed schedule plans stay saved and alert while the app is open**
  Becomes usable: A visitor can add several described, timed plans, refresh the page and still see them, then receive a visible in-app alert at a scheduled time. They can choose whether to allow browser notifications.
  Why now: Schedule planning is the practical part that makes Chrona more than a quote app. Persistence and the alarm are the highest-risk browser behaviors, so we test them before building the rest.
  PRD ref: `prd.md > Schedule Planning`, `Daily Schedule and Alarms`, `States and Boundaries`
  Spec ref: `spec.md > SchedulePlanner`, `AlarmMonitor and AlarmPanel`, `Data Model`, `Browser Storage and Notifications`, `Important Failure Modes`
  Build: Add schedule description and time inputs, visible daily-plan cards, `localStorage` read/write helpers, an in-app alarm panel and tone, and an optional notification-permission control with a clear fallback when notifications are unavailable.
  Verify (mechanical): Run `npm run build`; add two plans, reload the page to confirm they return, and schedule one for the next minute to confirm the in-app alarm appears while the page stays open.
  Learner check: Add one real plan for today, refresh the page, and check that it remains. If you enable notifications, tell me whether the permission prompt and alert make sense.
  Commit: `feat: add saved schedule and open-page alerts`

- [x] **3. Meal plans include optional calories and a rotating wellness tip**
  Becomes usable: A visitor can type breakfast, lunch, and dinner, optionally add calories, and see an appropriately attributed daily general wellness tip. Their meal plan remains after a refresh.
  Why now: This adds the second practical planning area using the already-proven storage path, while keeping wellness content local and general instead of depending on a live service.
  PRD ref: `prd.md > Meal Planning`, `Meals and Optional Calories`, `Daily-tip boundary`
  Spec ref: `spec.md > MealPlanner and WellnessTip`, `Data Model`, `Curated WHO-Attributed Wellness Tips`, `What Was Simplified and Why`
  Build: Add the three meal inputs and optional calorie fields to the shared day-plan data; seed a small reviewed local wellness-tip list with visible World Health Organization source links; apply the meal-area temporary background and styling.
  Verify (mechanical): Run `npm run build`; enter meal text with and without calories, reload to confirm it persists, and confirm the tip and its source link render without a runtime error.
  Learner check: Enter a breakfast, lunch, and dinner you might actually have. Check that an empty calorie field is accepted and that the daily tip feels helpful rather than like medical advice.
  Commit: `feat: add meal planning and daily wellness tips`

- [x] **4. Outfit preview and completion bring the whole morning plan together**
  Becomes usable: A visitor can select outfit images for the five categories, choose a mannequin shape, preview the composition, and see the completed-plan message after using the planning areas.
  Why now: This completes the third part of the product’s unique combination and makes the full morning journey ready for the final review and public deployment.
  PRD ref: `prd.md > Outfit Planning`, `Mannequin Outfit Preview`, `Completion View`, `What We're Building`
  Spec ref: `spec.md > OutfitPlanner and MannequinPreview`, `CompletionPanel`, `Data Model`, `Look and Feel`, `Important Failure Modes`, `Where It Runs and How Someone Tries It`
  Build: Add five current-session image inputs, a simple layered mannequin with standard, slim, and plus-size shape choices, missing-image fallback labels, the completion panel, and cross-area progress. Add a concise README covering local use and Vercel deployment; retain temporary gradients until the learner provides wallpapers.
  Verify (mechanical): Run `npm run build`; use the local app to choose a shape and valid image file, confirm its preview appears without errors, then complete all planning areas and confirm the “PERFECT” message appears.
  Learner check: Try the whole morning flow with your own example plans and one or more clothing images. Tell me what feels most useful and what, if anything, looks confusing before we do the final review.
  Commit: `feat: complete outfit preview and morning plan flow`

## Hands-on Checkpoints

- [x] Early usable behavior explored — learner reported that the schedule feature looks nice; no changes requested before meal and outfit work.
- [x] Final kick-the-tires exploration and feedback completed — learner tested the core screens after the supplied-image visual update and reported the project ready, with no change request.

## Final Review

- [x] Final review complete — no final changes requested; learner confirmed the proof of concept is ready to ship.

## Code Tour and App Map

- [x] Learning activity complete — brief code-route recap connected the learner's saved schedule action to the input, shared app state, and browser-storage code.
- [x] Optional edit and transfer reflection addressed — learner chose to move directly from the completed build to shipping; optional editing and reflection were declined for now.
- [x] `devpost/app-map.html` generated from finished code, checked, and shown, including a project-grounded practice to reuse

Activity and evidence: Brief recap of the schedule action: `SchedulePlanner.jsx > addPlan` creates the entry, `App.jsx > updateSchedule` updates shared day-plan state, and `lib/storage.js > saveDayPlan/loadDayPlan` persists it locally. Production build passed after the supplied-image update.
Route and stops: `src/components/SchedulePlanner.jsx > addPlan`; `src/App.jsx > updateSchedule`; `src/lib/storage.js > saveDayPlan` and `loadDayPlan`.
Edit outcome: No optional edit requested; learner chose to continue to shipping.
Reflection: Optional transfer reflection offered as part of the app map; learner chose to continue to shipping.
Activity mode: Brief recap with a reference route and public-safe app map, selected because the learner asked to proceed to deployment after final review.

## Revisions

- Vite command scripts call the installed Vite file directly — this Windows environment did not expose the installed `vite` command to `npm run`, although the package was present and built successfully when called directly.
- Schedule plan IDs use a safe timestamp-and-random fallback when browser `crypto.randomUUID()` is unavailable — the local test browser did not expose that newer browser feature, which prevented a schedule item from being added.
- The schedule save control calls the plan action directly as well as supporting form submission — the local test browser did not reliably dispatch the form submit event even though the entered values were valid.
- The supplied sunrise, hourglass, meal, and wardrobe photos now provide the welcome and planner backdrops — translucent warm-white and purple overlays preserve text readability, while the wide-screen layout shifts the welcome copy left to give the imagery room on desktop.
