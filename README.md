# WICHERS — Wearable Sculptures

Website for WICHERS (Studio Marsha Wichers). Static Astro site, built as an
artist's book / exhibition — not a shop. Prices on request only.

```
npm install
npm run dev     # local preview
npm run build   # static output in dist/
```

- `src/data/collections.ts` — the six collections and the object catalogue
- `src/data/site.ts` — name, studio, enquiry email
- `src/styles/global.css` — palette (black, off-white, paper, clay, bronze) and type scale
- Images go in `public/images/` and are referenced from the data files.
  Until then, pages show labelled placeholder plates.
