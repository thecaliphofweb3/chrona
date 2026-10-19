# Chrona

Chrona is a calm daily-planning website that brings a schedule, meal plan, and visual outfit preview together in one morning ritual.

## Live links

- [Public website](https://chrona-smoky.vercel.app)
- [Public GitHub repository](https://github.com/thecaliphofweb3/chrona)

## Run it locally

1. Install a current version of [Node.js](https://nodejs.org/).
2. In this project folder, run `npm install`.
3. Start the site with `npm run dev` and open the address shown in the terminal.

To confirm the production version builds, run `npm run build`. To preview that build locally, run `npm run preview`.

## What stays private

- Schedules, meal plans, optional calorie entries, and mannequin choice are saved only in the current browser.
- Outfit images stay only for the current open page; they are not uploaded or stored in the project.

## Deploy on Vercel

1. Create a public GitHub repository and push this project to it.
2. In [Vercel](https://vercel.com/), select **Add New → Project**, then import the GitHub repository.
3. Vercel detects Vite automatically. Confirm the build command is `npm run build` and the output directory is `dist`.
4. Deploy. Future pushes to the selected GitHub branch will trigger new deployments.

## Wellness tips

The meal planner uses a small local rotation of general wellness tips with visible World Health Organization sources. They are not personalised medical or dietary advice.

## License

This project is available under the [MIT License](LICENSE).
