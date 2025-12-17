This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

---

## Reference site scaffold & usage 🔧

This workspace contains a simple responsive reference layout tailored for boundary wall and chokhat design listings.

- Smooth scrolling is implemented using `@studio-freight/lenis`. Install it locally:

```bash
npm install @studio-freight/lenis
```

- Start the dev server:

```bash
npm run dev
```

- The main files to look at:
  - `src/app/page.js` — top-level page (home)
  - `src/components/SmoothScroll.js` — Lenis integration (client component)
  - `src/components/Header.js`, `ClientLayout.js` — global header and client wrapper with Lenis
  - `src/components/Hero.js`, `ProductGrid.js`, `Footer.js` — responsive sections
  - `src/lib/products.js` — sample product data for pages
  - `src/app/products` — product listing + dynamic product detail pages
  - `public/images/placeholder-boundary.svg` — lightweight placeholder image used for demo

Tips:
- Images use Next.js `next/image` for optimized loading and lazy-loading. Replace the placeholder SVGs in `public/images` with real optimized images (webp preferred).
- Lenis provides smooth scrolling without extra animation — tweak settings in `SmoothScroll.js`.

