# Image & Performance Tips ⚡

- Prefer WebP/AVIF for production images for smaller file sizes.
- Use the built-in `next/image` component with `sizes` and `width`/`height` to help Next.js generate optimized responsive images.
- Keep critical above-the-fold images as `priority` if needed, and lazy-load other images (default behavior).
- Serve placeholder SVGs or tiny LQIP images for ultra-fast initial paint.
- Consider `next/image` with `blurDataURL` for a pleasant progressive loading experience.
