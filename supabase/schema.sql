-- Create projects table
CREATE TABLE projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  short_description TEXT NOT NULL,
  content TEXT NOT NULL DEFAULT '',
  cover_image TEXT NOT NULL DEFAULT '',
  gallery JSONB NOT NULL DEFAULT '[]'::jsonb,
  github_url TEXT NOT NULL DEFAULT '',
  live_url TEXT NOT NULL DEFAULT '',
  featured BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create skills table
CREATE TABLE skills (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  category TEXT NOT NULL CHECK (category IN (
    'language',
    'framework',
    'frontend',
    'backend',
    'database',
    'mobile',
    'cloud',
    'tool'
  )),
  icon TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create project_skills junction table
CREATE TABLE project_skills (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  skill_id UUID NOT NULL REFERENCES skills(id) ON DELETE CASCADE,
  UNIQUE(project_id, skill_id)
);

-- Enable Row Level Security
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_skills ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access to projects"
  ON projects FOR SELECT
  USING (true);

CREATE POLICY "Allow public read access to skills"
  ON skills FOR SELECT
  USING (true);

CREATE POLICY "Allow public read access to project_skills"
  ON project_skills FOR SELECT
  USING (true);

-- Create indexes for performance
CREATE INDEX idx_projects_featured ON projects(featured) WHERE featured = true;
CREATE INDEX idx_projects_slug ON projects(slug);
CREATE INDEX idx_projects_created_at ON projects(created_at DESC);
CREATE INDEX idx_skills_category ON skills(category);
CREATE INDEX idx_skills_slug ON skills(slug);
CREATE INDEX idx_project_skills_project_id ON project_skills(project_id);
CREATE INDEX idx_project_skills_skill_id ON project_skills(skill_id);

-- Insert sample data
INSERT INTO skills (name, slug, category, icon) VALUES
  ('TypeScript', 'typescript', 'language', 'typescript'),
  ('JavaScript', 'javascript', 'language', 'javascript'),
  ('Python', 'python', 'language', 'python'),
  ('Go', 'go', 'language', 'go'),
  ('React', 'react', 'frontend', 'react'),
  ('Next.js', 'nextjs', 'framework', 'nextjs'),
  ('Astro', 'astro', 'framework', 'astro'),
  ('TailwindCSS', 'tailwindcss', 'frontend', 'tailwindcss'),
  ('Node.js', 'nodejs', 'backend', 'nodejs'),
  ('PostgreSQL', 'postgresql', 'database', 'postgresql'),
  ('Supabase', 'supabase', 'backend', 'supabase'),
  ('Docker', 'docker', 'tool', 'docker'),
  ('AWS', 'aws', 'cloud', 'aws'),
  ('Vercel', 'vercel', 'cloud', 'vercel'),
  ('Git', 'git', 'tool', 'git'),
  ('Figma', 'figma', 'tool', 'figma'),
  ('Swift', 'swift', 'language', 'swift'),
  ('SwiftUI', 'swiftui', 'mobile', 'swiftui'),
  ('Prisma', 'prisma', 'backend', 'prisma'),
  ('tRPC', 'trpc', 'backend', 'trpc');
