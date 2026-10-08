---
doc: prd
status: approved
---

# Chrona — Product Requirements

Chrona is a warm daily planner for people who want to begin the morning motivated and prepared with a schedule, meal plan, and outfit plan.
Source: `scope.md > The Unique Kernel`, `The Core Loop`, and `What "Working" Looks Like`.

## The Core Journey

1. A person opens Chrona and sees a sunrise background, a bold **“Good Morning”** greeting in an inviting font, and a motivational quote below it in smaller text.
2. They continue to an introduction that explains the three things the app offers: manage a schedule, plan meals, and plan an outfit.
3. The planning-selection area welcomes them with **“Kick start this day with a clear plan”** and the smaller prompt **“Choose where to begin.”** They choose schedule, meals, or outfit planning.
4. In the schedule area, they add one or more plans by entering a short description and setting a time. Each saved plan is visible in the day’s schedule and is intended to trigger an alarm and notification at its time.
5. In the meal area, they type plans for breakfast, lunch, and dinner. They may optionally enter calories for each meal.
6. In the outfit area, they add clothing images in the five established categories, choose a mannequin body shape, and see the selected outfit displayed on the mannequin.
7. When the day’s plan is complete, the app displays **“PERFECT, hope your day goes as planned.”**

Success means a person can visibly set all three parts of their day and reach the positive completed-plan message.

## Screens and Layout

### Welcome Screen

- Sunrise wallpaper supplied by the learner.
- Large, bold “Good Morning” text using an inviting font.
- A motivational quote from a notable person in smaller text below the greeting.
- A clear way to continue into the app’s three planning areas.

### Planning Selection

- Displays the text “Kick start this day with a clear plan” above the choices and “Choose where to begin” beneath it in smaller text.
- Presents entry points for schedule, meal, and outfit planning.
- Acts as the home for moving between the three areas while setting up the day.

### Schedule Planning

- Uses the planning-screen wallpaper supplied by the learner.
- Lets a person add a plan description and a time.
- Shows the plans they have added for the day.
- Uses the selected time to trigger an alarm and notification.

### Meal Planning

- Uses a separate meal wallpaper supplied by the learner.
- Separates the day into breakfast, lunch, and dinner.
- Lets a person type what they plan to eat in each meal section.
- Provides an optional calorie field for each meal; leaving it blank does not prevent saving the meal plan.
- Helps the person intentionally organise meals across the day, without claiming to provide medical or nutritional assessment.
- Displays one general daily wellness tip, such as a hydration reminder, from a rotating in-app list with World Health Organization attribution.

### Outfit Planning

- Uses a separate outfit wallpaper supplied by the learner.
- Lets a person add clothing images for headwear (including scarves), eyewear, top, bottom, and footwear.
- Lets the person choose one mannequin shape: standard, slim, or plus-size.
- Displays the selected clothing on the chosen mannequin as a visual outfit preview.

### Completion View

- Shows the final positive message after the person has set their day’s plans: “PERFECT, hope your day goes as planned.”

## Look and Feel

- The mood is warm, encouraging, and calm rather than demanding or overly technical. Source: `scope.md > Inspiration & Identity`.
- The overall colour theme is warm white and purple.
- The welcome screen has a sunrise background; the schedule, meal, and outfit areas each use a different learner-supplied wallpaper.
- The greeting should feel inviting and prominent; supporting text and quotes are smaller and secondary.

## Features and Behavior

### Morning Motivation

- The welcome greeting and quote set the emotional tone before planning begins.
- The quote is supportive content, not a personalised recommendation or health claim.

### Daily Schedule and Alarms

- A schedule plan contains a description and a time.
- More than one plan can be added for the day.
- At the chosen time, the app provides an alarm with a notification.

### Meals and Optional Calories

- A person types meal plans into breakfast, lunch, and dinner sections.
- Calories are optional user-provided information, not calculated dietary advice.
- The meal area shows one rotating daily wellness tip with World Health Organization attribution. It is general public-health information, not personalised advice.

### Mannequin Outfit Preview

- A person supplies clothing images within the five fixed categories.
- Changing the mannequin body shape changes the visual base of the outfit preview.
- The preview is visual only; it does not judge physical fit or size.

## States and Boundaries

- **First use / no plans yet** — the planning-selection area displays the two established prompts and guides the person to choose where to begin.
- **Optional calorie omitted** — the meal can still be included in the day’s plan with no calorie value.
- **One-day proof of concept** — the app is about setting up the current day; accounts, plan history, and multi-day saving are not part of this version.
- **Fit boundary** — the mannequin shows an outfit composition only. It cannot say whether a real garment will fit a real person.
- **Health boundary** — the app may show the planned meals and entered calories, but it does not diagnose, prescribe, or guarantee a balanced diet.
- **Daily-tip boundary** — a daily wellness tip rotates from a small in-app list. The first version does not fetch content live from the World Health Organization website.

## Product Decisions

- The app begins with a greeting and quote because the learner wants users to feel motivated before they plan.
- Schedule, meal, and outfit planning are all included in the first version because their combination is what makes the app stand out.
- Schedule entries use a description and time, then prompt an alarm and notification.
- Meals are typed by the user; calorie information is optional.
- The meal area includes a rotating World Health Organization-attributed wellness tip because the learner wants a helpful daily reminder, such as drinking water.
- Outfit input is limited to headwear, eyewear, top, bottom, and footwear so the visual preview stays understandable.
- The mannequin offers standard, slim, and plus-size shapes, but its purpose is visual display—not fit prediction.
- Warm white, purple, and the supplied wallpapers create the intended calm, inviting identity.

## What We're Building

- The full end-to-end core journey described above.
- A welcome greeting and motivational quote.
- A central selection area and three planning areas.
- Timed schedule entries with alarms and notifications.
- Typed breakfast, lunch, and dinner plans with optional calories.
- A rotating daily wellness tip with World Health Organization attribution.
- Five-category image input and a three-shape mannequin outfit display.
- The final completed-plan message.

## Deferred From the POC

- Accounts and saved plans across multiple days, because the first version demonstrates a single morning plan.
- A large food database, automatic calorie calculation, grocery planning, or tailored nutrition support, because they expand the project beyond a short proof of concept.
- Live retrieval of changing World Health Organization content, because a curated in-app rotation demonstrates the daily-tip experience without an external-content integration.
- Device notifications that still work while the app is closed, because this needs a more advanced delivery setup.
- Extra clothing categories, weather-based suggestions, and outfit sharing, because the five-category visual preview proves the concept first.

## Possible Later Enhancements

- More motivational quotes and ways for users to select a preferred tone.
- Personal meal and wardrobe libraries that reduce repeated typing and uploading.
- Weather-aware outfit suggestions and multi-day planning.

## Non-Goals

- Physical clothing-fit prediction, because it requires real body and garment measurements.
- Medical, diet, or health advice, because entered calorie values alone are not sufficient for safe guidance.
- Photorealistic virtual try-on, because a simple mannequin preview is enough to demonstrate the outfit feature.

## Open Questions

- The learner will supply the sunrise, schedule, meal, and outfit wallpaper images before the visual finish. This does not block product approval; temporary backgrounds can be used while building.
- The specific quote source or first quote has not been chosen. This can be decided during the build as long as it is appropriate for public display.
