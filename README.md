# Shubh Biodata — Free Marriage Biodata Maker

Full-stack Next.js 14 (App Router) + Material UI (MUI v6) website: a free online
marriage biodata maker with a template slider/gallery, a tabbed editor with live
preview, and PDF + Word (.docx) export.

## Run it locally

Requires Node.js 18+.

```bash
npm install
npm run dev
```

Open http://localhost:3000

> First build needs internet access once, to fetch the Google Fonts
> (Cormorant Garamond + Work Sans) used in `src/app/layout.tsx`.

## Production build

```bash
npm run build
npm run start
```

## Structure

```
src/
  app/
    page.tsx                 → Landing page (hero, "how it works", CTA)
    templates/page.tsx        → Template gallery: slider + category filter + search
    editor/[templateId]/page.tsx → Editor: tabbed form + live preview + PDF/Word export
    layout.tsx, ThemeRegistry.tsx → Next/MUI app-router wiring, fonts, theme
  components/
    Navbar.tsx, Footer.tsx, HeroFan.tsx
    TemplateCard.tsx, TemplateSlider.tsx   → gallery pieces
    BiodataForm.tsx                        → tabbed input form
    previews/                              → 6 distinct biodata template designs
  lib/
    types.ts        → BiodataFormData model + empty defaults
    templates.ts     → template metadata (id, name, category, blurb, swatch colors)
    theme.ts          → MUI theme tokens (wine/gold palette, type scale)
    exportPdf.ts       → html2canvas + jsPDF → PDF download
    exportDocx.ts       → docx library → Word (.docx) download
```

## What's implemented

- **Landing page** — hero with a fanned-card visual, "how it works", a template
  slider teaser, feature grid, CTA.
- **Template gallery** (`/templates`) — an "editor's picks" slider plus a
  filterable/searchable grid across 6 templates in 5 categories (Traditional,
  Royal, Modern, Minimal, Floral).
- **Editor** (`/editor/[templateId]`) — tabbed form (Photo & Personal,
  Education & Career, Family, Contact & About) with a live-updating preview
  next to it (stacked into a drawer on mobile). A right-hand drawer lets you
  switch templates without losing your entered data.
- **Export** — "Download PDF" rasterizes the live preview at 2x and lays it
  onto an A4 PDF (auto-paginates if content overflows one page). "Download
  Word" builds a real, editable `.docx` with headings and a two-column fact
  table per section, using the `docx` package (not a screenshot).
- **6 template designs**, each a real distinct React component: wine/gold
  mandala border, rose/sage floral variant, maroon "royal canopy" header,
  slate and teal duotone split-panel modern layouts, and an ivory minimal
  layout.

## Notes / next steps you may want

- Photo upload stores the image as a data URL in memory only (nothing is
  uploaded to a server) — swap in real storage if you add accounts.
- There's no backend/database; all data lives in React state for the current
  session. Add persistence (localStorage, or a database) if users should be
  able to come back and resume.
- Hindi-script data entry works today (it's just a text field), but full
  bilingual template copy (translating field labels themselves) isn't wired
  up yet — a natural next step given the bilingual promise on the landing page.