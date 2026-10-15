-- ============================================================
-- Mukesh Machinery & Equipment – Supabase Database Setup
-- Run this in your Supabase SQL Editor (https://supabase.com/dashboard)
-- Project: hpgwwpmynxklgeqdxcmm
-- ============================================================

-- Enable UUID generation
create extension if not exists "uuid-ossp";

-- ============================================================
-- 1. TABLE: machines
-- ============================================================
create table if not exists public.machines (
  id            uuid primary key default uuid_generate_v4(),
  name          text not null,
  slug          text not null unique,
  category      text not null default '',
  description   text not null default '',
  applications  text[] not null default '{}',
  specifications jsonb not null default '{}',
  image_url     text,
  image_key     text,
  availability  text not null default 'Available',
  featured      boolean not null default false,
  sort_order    integer not null default 0,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- ============================================================
-- 2. TABLE: services
-- ============================================================
create table if not exists public.services (
  id          uuid primary key default uuid_generate_v4(),
  title       text not null,
  slug        text not null unique,
  icon        text not null default 'Cog',
  description text not null default '',
  sort_order  integer not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- ============================================================
-- 3. TABLE: projects
-- ============================================================
create table if not exists public.projects (
  id           uuid primary key default uuid_generate_v4(),
  name         text not null,
  slug         text not null unique,
  location     text not null default '',
  service_type text not null default '',
  description  text not null default '',
  image_url    text,
  image_key    text,
  is_sample    boolean not null default false,
  sort_order   integer not null default 0,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

-- ============================================================
-- 4. TABLE: inquiries
-- ============================================================
create table if not exists public.inquiries (
  id                uuid primary key default uuid_generate_v4(),
  full_name         text not null,
  phone             text not null,
  email             text,
  company           text,
  project_location  text not null,
  service_required  text not null,
  machine_required  text,
  preferred_date    text,
  expected_duration text,
  message           text,
  status            text not null default 'new',
  created_at        timestamptz not null default now()
);

-- ============================================================
-- 5. TABLE: site_settings
-- ============================================================
create table if not exists public.site_settings (
  key        text primary key,
  value      text not null default '',
  updated_at timestamptz not null default now()
);

-- ============================================================
-- 6. ROW LEVEL SECURITY (RLS)
-- Allow full public access (admin auth is handled client-side)
-- ============================================================

-- Machines: full public access
alter table public.machines enable row level security;

drop policy if exists "machines_select" on public.machines;
create policy "machines_select" on public.machines for select using (true);

drop policy if exists "machines_insert" on public.machines;
create policy "machines_insert" on public.machines for insert with check (true);

drop policy if exists "machines_update" on public.machines;
create policy "machines_update" on public.machines for update using (true);

drop policy if exists "machines_delete" on public.machines;
create policy "machines_delete" on public.machines for delete using (true);

-- Services: full public access
alter table public.services enable row level security;

drop policy if exists "services_select" on public.services;
create policy "services_select" on public.services for select using (true);

drop policy if exists "services_insert" on public.services;
create policy "services_insert" on public.services for insert with check (true);

drop policy if exists "services_update" on public.services;
create policy "services_update" on public.services for update using (true);

drop policy if exists "services_delete" on public.services;
create policy "services_delete" on public.services for delete using (true);

-- Projects: full public access
alter table public.projects enable row level security;

drop policy if exists "projects_select" on public.projects;
create policy "projects_select" on public.projects for select using (true);

drop policy if exists "projects_insert" on public.projects;
create policy "projects_insert" on public.projects for insert with check (true);

drop policy if exists "projects_update" on public.projects;
create policy "projects_update" on public.projects for update using (true);

drop policy if exists "projects_delete" on public.projects;
create policy "projects_delete" on public.projects for delete using (true);

-- Inquiries: full public access
alter table public.inquiries enable row level security;

drop policy if exists "inquiries_select" on public.inquiries;
create policy "inquiries_select" on public.inquiries for select using (true);

drop policy if exists "inquiries_insert" on public.inquiries;
create policy "inquiries_insert" on public.inquiries for insert with check (true);

drop policy if exists "inquiries_update" on public.inquiries;
create policy "inquiries_update" on public.inquiries for update using (true);

drop policy if exists "inquiries_delete" on public.inquiries;
create policy "inquiries_delete" on public.inquiries for delete using (true);

-- Site Settings: full public access
alter table public.site_settings enable row level security;

drop policy if exists "site_settings_select" on public.site_settings;
create policy "site_settings_select" on public.site_settings for select using (true);

drop policy if exists "site_settings_insert" on public.site_settings;
create policy "site_settings_insert" on public.site_settings for insert with check (true);

drop policy if exists "site_settings_update" on public.site_settings;
create policy "site_settings_update" on public.site_settings for update using (true);

-- ============================================================
-- 7. UPDATED_AT TRIGGER
-- ============================================================
create or replace function public.handle_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists machines_updated_at on public.machines;
create trigger machines_updated_at
  before update on public.machines
  for each row execute function public.handle_updated_at();

drop trigger if exists services_updated_at on public.services;
create trigger services_updated_at
  before update on public.services
  for each row execute function public.handle_updated_at();

drop trigger if exists projects_updated_at on public.projects;
create trigger projects_updated_at
  before update on public.projects
  for each row execute function public.handle_updated_at();

drop trigger if exists site_settings_updated_at on public.site_settings;
create trigger site_settings_updated_at
  before update on public.site_settings
  for each row execute function public.handle_updated_at();
