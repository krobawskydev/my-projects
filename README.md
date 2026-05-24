# Krobawsky Dev Portfolio

Personal portfolio starter built with Astro, Tailwind CSS, and Supabase.

The app reads projects and skills from Supabase and renders a simple portfolio homepage:

- Hero
- Featured Projects
- Skills
- About
- Contact

Personal content is intentionally ignored from Git. Each developer can create their own local `content/` files, sync them to their own Supabase project, and reuse the same frontend.

## Tech Stack

- Astro 6
- TypeScript
- Tailwind CSS 4
- Supabase
- `tsx` for sync scripts
- `js-yaml` for YAML seed files

## Project Structure

```text
src/
  components/
  layouts/
  lib/supabase/
  pages/
  sections/
  styles/
  types/

scripts/
  sync-skills.ts
  sync-projects.ts

supabase/
  schema.sql

content/              # ignored, local-only data
  seeds/
    skills.yml
    projects.yml
```

## Setup

Install dependencies:

```sh
npm install
```

Create `.env`:

```sh
cp .env.example .env
```

Fill in your Supabase values:

```env
PUBLIC_SUPABASE_URL=https://your-project.supabase.co
PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

The public anon key is used by the frontend. The service role key is recommended for the local sync scripts because they write data.

## Create Supabase Tables

Open your Supabase SQL editor and run:

```sql
-- copy and run supabase/schema.sql
```

The schema creates:

- `projects`
- `skills`
- `project_skills`
- public read policies for the portfolio frontend
- unique slugs for safe upserts

## Create Local Data

The `content/` directory is ignored by Git. Create your local seed files:

```sh
mkdir -p content/seeds
touch content/seeds/skills.yml content/seeds/projects.yml
```

### `content/seeds/skills.yml`

```yml
skills:
  - name: TypeScript
    slug: typescript
    category: language
    icon: typescript

  - name: Astro
    slug: astro
    category: frontend
    icon: astro

  - name: Supabase
    slug: supabase
    category: cloud
    icon: supabase
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
      - Supabase
```

Allowed project types:

- `enterprise`
- `freelance`
- `startup`
- `personal`
- `landing_page`

Each item in `technologies` should match a skill `name` or `slug`. The project sync script uses those matches to create `project_skills` relations.

## Import Data

Sync skills first:

```sh
npm run sync:skills
```

This makes Supabase match `content/seeds/skills.yml` exactly:

- inserts new skills
- updates skills with matching `slug`
- deletes skills that are not in `skills.yml`

Then sync projects:

```sh
npm run sync:projects
```

This will:

- upsert projects by `slug`
- match project `technologies` with existing skills
- create `project_skills` relations

Run `sync:skills` before `sync:projects` whenever you add new technologies.

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

## Notes For Reuse

- Keep `content/` local and private.
- Commit app code, schema, and scripts.
- Use your own Supabase project and environment variables.
- Keep slugs stable; they are the sync identity for both projects and skills.
