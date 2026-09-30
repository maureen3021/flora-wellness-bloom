# Project decisions

- Keep category labels, imagery, and product assignments in `src/lib/products.ts` so the home filters and category pages stay synchronized.
- Define category-specific presentation colors in `src/styles.css` and reference them from routes so the green Digestive theme remains consistent.