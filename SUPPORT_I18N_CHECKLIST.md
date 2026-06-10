# Support i18n Checklist

- [x] Decide supported locales and default locale: `en` as default, `es` as secondary locale.
- [x] Add Astro i18n config in `astro.config.mjs`.
- [x] Introduce locale-aware routes for the default locale and Spanish routes under `/es/`.
- [x] Add translation dictionaries in `src/i18n/en.ts` and `src/i18n/es.ts`.
- [x] Add i18n helpers for locale parsing, path generation, fallback behavior, and typed translation lookup.
- [x] Pass locale into `BaseLayout.astro`, set `<html lang>`, canonical URLs, and alternate `hreflang` links.
- [x] Replace hardcoded UI copy in nav, footer, hero, featured projects, skills, about, contact, 404, and project detail pages.
- [x] Localize labels/constants in project and skill types, including project type labels and skill category labels.
- [x] Add a language switcher to `Navbar.astro` that preserves the current page when possible.
- [x] Decide how Supabase project content is localized: use default-language structured columns plus a `translations` `jsonb` field for locale overrides.
- [x] Replace the old Supabase query layer with local content queries that resolve localized project fields with fallback behavior.
- [x] Keep `getStaticPaths()` emitting published project routes for both default and localized project pages.
- [ ] Verify SEO metadata, Open Graph descriptions, image alt text, and page titles per locale.
- [ ] Run `npm run build` and manually verify home, project listing sections, project detail, 404, and language switching.
