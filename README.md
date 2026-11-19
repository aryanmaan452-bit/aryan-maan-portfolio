# Aryan Maan — Personal Portfolio

A responsive, single-page React portfolio built with Vite, TypeScript, Tailwind CSS, GSAP, ScrollTrigger, and Lucide.

## Local preview

Install Node.js 22.12 or later and run:

```sh
npm ci
npm run dev
```

Open the local URL printed by Vite. To verify and preview the production build:

```sh
npm run build
npm run preview
```

`npm run check` runs TypeScript independently.

## Update your content

- Edit `src/projects.ts` to update project names, summaries, and links. Add an optional `image` with a `src` and descriptive `alt` text. Put local assets in `public/` and reference them with root-relative paths such as `/projects/pluto.webp`.
- Edit `src/profile.ts` to change the bio, contact details, social links, or interests. Set `resume` to a URL or add a PDF to `public/` and use its root-relative path.
- Set the absolute Open Graph URL and image in `index.html` after selecting a domain and a share image.
- The site uses in-page anchors. GSAP is loaded separately from the main bundle, and motion respects the visitor’s reduced-motion setting.

## Deploy to Vercel

Import the GitHub repository into Vercel and select the Vite preset. The included `vercel.json` sets the build command to `npm run build` and output directory to `dist`. No environment variables are required.
