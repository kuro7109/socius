-- Run once in Supabase: SQL Editor -> New query -> paste -> Run.
create table if not exists public.milo_messages (
  id bigserial primary key,
  device_id text not null,
  role text not null check (role in ('user','assistant')),
  content text not null,
  created_at timestamptz not null default now()
);
create index if not exists milo_messages_device_time on public.milo_messages (device_id, created_at desc);

-- Lock the table: only the server (service role key, stored in Vercel) can read or write.
alter table public.milo_messages enable row level security;
-- No policies on purpose: the anon/public key gets no access at all.
