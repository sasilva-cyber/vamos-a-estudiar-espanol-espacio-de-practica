create table if not exists public.grammar_lesson_progress (
  user_id uuid not null references auth.users(id) on delete cascade,
  lesson_id text not null,
  attempts integer not null default 0 check (attempts >= 0),
  best_score integer not null default 0 check (best_score between 0 and 100),
  completed boolean not null default false,
  last_completed_at timestamptz,
  updated_at timestamptz not null default now(),
  primary key (user_id, lesson_id)
);

alter table public.grammar_lesson_progress enable row level security;

revoke all on table public.grammar_lesson_progress from anon;
grant select, insert, update on table public.grammar_lesson_progress to authenticated;

drop policy if exists "grammar progress select own" on public.grammar_lesson_progress;
create policy "grammar progress select own"
on public.grammar_lesson_progress
for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists "grammar progress insert own" on public.grammar_lesson_progress;
create policy "grammar progress insert own"
on public.grammar_lesson_progress
for insert
to authenticated
with check (auth.uid() = user_id);

drop policy if exists "grammar progress update own" on public.grammar_lesson_progress;
create policy "grammar progress update own"
on public.grammar_lesson_progress
for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create index if not exists grammar_lesson_progress_updated_idx
on public.grammar_lesson_progress(updated_at desc);
