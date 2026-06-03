# Digital Growth Labs — Website

A premium digital growth studio site for a Vancouver-based, full-service local-growth team.

**Stack:** Next.js 16 (App Router) · Tailwind CSS · GSAP (ScrollTrigger) · deploy on Vercel.

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Pages

| Route       | File                  | Sections |
|-------------|-----------------------|----------|
| `/`         | `app/page.js`         | Hero + stats · Clients marquee · Services (01) · Approach (02) · Results (03) · Full-Service (04) · Quote · CTA |
| `/process`  | `app/process/page.js` | Hero · Contrast statement · The method (system steps) · What you get · Reality Check · CTA |
| `/about`    | `app/about/page.js`   | Red hero · Tagline · We Work With · Stats · Studio note · Philosophy · CTA |

## Editing content

**All copy lives in one place:** [`lib/content.js`](lib/content.js).
Services, approach steps, results/stats, the quote, FAQ-free section copy, footer columns,
process steps and the about page all read from there — no need to touch components.
Brand name, monogram, location, email, phone and social links are at the top.

## Swapping in real photos

Imagery currently uses CSS placeholder blocks with classes `.portrait` (B&W cut-out portrait)
and `.editorial` (project/editorial shots), defined in [`app/globals.css`](app/globals.css).

To use real images, replace the placeholder `<div>`s (e.g. in `app/page.js` hero and work section,
`app/about/page.js` hero) with `next/image`:

```jsx
import Image from "next/image";
// ...
<Image src="/portrait.jpg" alt="" fill className="object-cover grayscale" />
```

Drop the files in `/public`. Keep them black-and-white / high-contrast for the look.

## Design system

Defined in `tailwind.config.js` and `app/globals.css`:

- **Colors:** `parchment` `#EAE6DD` · `ink` `#111111` · `tomato` `#E8442A`
- **Fonts:** Inter (display/body, loaded via `next/font`) · Caveat (the red handwritten accent — class `.hand` / `font-hand`)
- **Type utilities:** `.display`, `.display-md`, `.label`, `.num`
- **Buttons:** `.btn-pill` (nav CTA), `.btn-outline`, `.btn-red` (with red/white sweep-on-hover)

> Swap Inter → "PP Neue Montreal" once you have a license: add the font via `next/font/local`
> and point `--font-inter` at it in `app/layout.js`.

## Animations

- `components/Reveal.js` — scroll-triggered fade/slide-up (GSAP ScrollTrigger)
- `components/Parallax.js` — hero portrait scrolls slower than text
- `components/Faq.js` — GSAP height-tween accordion
- `components/ScrollProgress.js` — thin vertical progress bar, right edge
- `components/CustomCursor.js` — dot cursor that grows over links (desktop only)
- All animations respect `prefers-reduced-motion`.

## Deploy to Vercel

```bash
npx vercel        # or push to GitHub and import at vercel.com
```

No environment variables required.
