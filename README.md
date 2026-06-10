# Krobawsky Dev Portfolio

Portfolio site built with Astro, Tailwind CSS, and local YAML content.

The app reads projects and skills from `content/seeds/*.yml` during build and renders:

- Hero
- Featured Projects
- Skills
- About
- Contact
- Project detail pages

## Tech Stack

- Astro 6
- TypeScript
- Tailwind CSS 4
- `js-yaml` for local content parsing

## Project Structure

```text
src/
  components/
  layouts/
  lib/content/
  pages/
  sections/
  styles/
  types/

content/              # ignored by Git in this starter
  seeds/
    skills.yml
    projects.yml
```

## Setup

Install dependencies:

```sh
npm install
```

## Local Content

The site expects two YAML files:

- `content/seeds/skills.yml`
- `content/seeds/projects.yml`

### `content/seeds/skills.yml`

```yml
skills:
  - name: TypeScript
    slug: typescript
    category: language
    icon: typescript
    display: true
    order: 1

  - name: Astro
    slug: astro
    category: frontend
    icon: astro
    display: true
    order: 2
```

Allowed categories:

- `language`
- `framework`
- `frontend`
- `backend`
- `architecture`
- `database`
- `mobile`
- `cloud`
- `tool`

### `content/seeds/projects.yml`

```yml
projects:
  - title: My Project
    slug: my-project
    short_description: Short description shown in project cards.
    content: >
      Longer project description shown on the project detail page.
    cover_image: ''
    gallery: []
    github_url: ''
    live_url: https://example.com
    featured: true
    project_type: personal
    role: Fullstack Developer
    company: My Company
    duration: 2024
    team_size:
    published: true
    display_order: 1
    highlights:
      - Built the first version of the product.
      - Deployed it to production.
    technologies:
      - TypeScript
      - Astro
    translations:
      es:
        title: Mi proyecto
        short_description: Resumen corto para tarjetas.
        content: >
          Descripcion larga en espanol para la pagina de detalle.
        role: Desarrollador Fullstack
        company: Mi Empresa
        duration: 2024
        highlights:
          - Construccion de la primera version del producto.
          - Despliegue a produccion.
```

Allowed project types:

- `enterprise`
- `freelance`
- `startup`
- `personal`
- `landing_page`

Each item in `technologies` should match a skill `name` or `slug`. The local content layer resolves those entries into `skills` for each project detail page.

## i18n Content Model

UI text lives in `src/i18n/*.ts`.

Project content uses a hybrid local model:

- top-level fields are the default locale
- `translations.<locale>` contains per-locale overrides

When a localized field is missing, the site falls back to the default value automatically.

## Development

Start the dev server:

```sh
npm run dev
```

Build for production:

```sh
npm run build
```

Preview the production build:

```sh
npm run preview
```
- Commit app code, schema, and scripts.
- Use your own Supabase project and environment variables.
- Keep slugs stable; they are the sync identity for both projects and skills.
