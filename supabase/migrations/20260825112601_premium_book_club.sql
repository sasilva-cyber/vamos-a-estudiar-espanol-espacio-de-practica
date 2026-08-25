create table if not exists public.book_club_books (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  author text not null,
  country text not null,
  country_code text,
  publication_year integer,
  synopsis text not null default '',
  acquisition_url text,
  cover_url text,
  rights_note text not null default 'O clube não hospeda a obra integral sem autorização ou base legal aplicável.',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.book_club_months (
  id uuid primary key default gen_random_uuid(),
  month_key date not null unique,
  label text not null,
  status text not null default 'draft' check (status in ('draft','voting','reading','archived')),
  voting_ends_at timestamptz,
  reading_starts_on date,
  reading_ends_on date,
  meeting_at timestamptz,
  weekly_question text,
  whatsapp_url text,
  selected_book_id uuid references public.book_club_books(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.book_club_candidates (
  month_id uuid not null references public.book_club_months(id) on delete cascade,
  book_id uuid not null references public.book_club_books(id) on delete cascade,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  primary key (month_id, book_id)
);

create table if not exists public.book_club_votes (
  month_id uuid not null references public.book_club_months(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  book_id uuid not null references public.book_club_books(id) on delete cascade,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (month_id, user_id)
);
create index if not exists book_club_votes_book_idx on public.book_club_votes(month_id, book_id);

create table if not exists public.book_club_schedule (
  id uuid primary key default gen_random_uuid(),
  month_id uuid not null references public.book_club_months(id) on delete cascade,
  week_number smallint not null check (week_number between 1 and 6),
  title text not null,
  reading_range text not null,
  discussion_prompt text not null default '',
  starts_on date not null,
  ends_on date not null,
  created_at timestamptz not null default now(),
  unique (month_id, week_number)
);

create table if not exists public.book_club_progress (
  month_id uuid not null references public.book_club_months(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  week_number smallint not null check (week_number between 1 and 6),
  completed_at timestamptz not null default now(),
  primary key (month_id, user_id, week_number)
);
create index if not exists book_club_progress_user_idx on public.book_club_progress(user_id, month_id);

create table if not exists public.book_club_messages (
  id uuid primary key default gen_random_uuid(),
  month_id uuid not null references public.book_club_months(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  display_name text not null,
  message text not null check (char_length(message) between 1 and 1200),
  is_moderator boolean not null default false,
  created_at timestamptz not null default now(),
  deleted_at timestamptz
);
create index if not exists book_club_messages_month_created_idx on public.book_club_messages(month_id, created_at desc);

alter table public.book_club_books enable row level security;
alter table public.book_club_months enable row level security;
alter table public.book_club_candidates enable row level security;
alter table public.book_club_votes enable row level security;
alter table public.book_club_schedule enable row level security;
alter table public.book_club_progress enable row level security;
alter table public.book_club_messages enable row level security;

revoke all on public.book_club_books, public.book_club_months, public.book_club_candidates, public.book_club_votes, public.book_club_schedule, public.book_club_progress, public.book_club_messages from anon;
revoke all on public.book_club_books, public.book_club_months, public.book_club_candidates, public.book_club_votes, public.book_club_schedule, public.book_club_progress, public.book_club_messages from authenticated;

grant select on public.book_club_messages to authenticated;
create policy "premium reads club messages" on public.book_club_messages for select to authenticated using (public.has_premium_access());

create or replace function public.get_book_club_home()
returns jsonb language plpgsql security definer set search_path=public,pg_temp as $$
declare
  v_uid uuid:=auth.uid(); v_month public.book_club_months%rowtype; v_vote uuid; v_candidates jsonb:='[]'::jsonb;
  v_schedule jsonb:='[]'::jsonb; v_messages jsonb:='[]'::jsonb; v_selected jsonb:=null; v_total_votes integer:=0;
  v_completed integer:=0; v_total_weeks integer:=0; v_role text;
begin
  if v_uid is null then raise exception 'AUTH_REQUIRED'; end if;
  if not public.has_premium_access() then raise exception 'PREMIUM_REQUIRED'; end if;
  select * into v_month from public.book_club_months where status in ('voting','reading') order by month_key desc limit 1;
  if v_month.id is null then select * into v_month from public.book_club_months order by month_key desc limit 1; end if;
  if v_month.id is null then return jsonb_build_object('available',false); end if;
  if v_month.status='voting' and v_month.voting_ends_at is not null and now()>=v_month.voting_ends_at then
    select c.book_id into v_month.selected_book_id from public.book_club_candidates c
    left join public.book_club_votes v on v.month_id=c.month_id and v.book_id=c.book_id
    where c.month_id=v_month.id group by c.book_id,c.sort_order order by count(v.user_id) desc,c.sort_order asc limit 1;
    update public.book_club_months set selected_book_id=v_month.selected_book_id,status='reading',updated_at=now() where id=v_month.id;
    v_month.status:='reading';
  end if;
  select book_id into v_vote from public.book_club_votes where month_id=v_month.id and user_id=v_uid;
  select count(*) into v_total_votes from public.book_club_votes where month_id=v_month.id;
  select coalesce(jsonb_agg(jsonb_build_object('id',b.id,'slug',b.slug,'title',b.title,'author',b.author,'country',b.country,'country_code',b.country_code,
    'publication_year',b.publication_year,'synopsis',b.synopsis,'acquisition_url',b.acquisition_url,'cover_url',b.cover_url,
    'votes',coalesce(vc.votes,0),'percentage',case when v_total_votes=0 then 0 else round(100.0*coalesce(vc.votes,0)/v_total_votes) end,'user_voted',b.id=v_vote) order by c.sort_order),'[]'::jsonb)
  into v_candidates from public.book_club_candidates c join public.book_club_books b on b.id=c.book_id
  left join lateral(select count(*)::int votes from public.book_club_votes x where x.month_id=c.month_id and x.book_id=c.book_id) vc on true where c.month_id=v_month.id;
  if v_month.selected_book_id is not null then
    select jsonb_build_object('id',b.id,'slug',b.slug,'title',b.title,'author',b.author,'country',b.country,'country_code',b.country_code,
      'publication_year',b.publication_year,'synopsis',b.synopsis,'acquisition_url',b.acquisition_url,'cover_url',b.cover_url,'rights_note',b.rights_note)
    into v_selected from public.book_club_books b where b.id=v_month.selected_book_id;
  end if;
  select count(*) into v_total_weeks from public.book_club_schedule where month_id=v_month.id;
  select count(*) into v_completed from public.book_club_progress where month_id=v_month.id and user_id=v_uid;
  select coalesce(jsonb_agg(jsonb_build_object('week_number',s.week_number,'title',s.title,'reading_range',s.reading_range,'discussion_prompt',s.discussion_prompt,
    'starts_on',s.starts_on,'ends_on',s.ends_on,'completed',exists(select 1 from public.book_club_progress p where p.month_id=s.month_id and p.user_id=v_uid and p.week_number=s.week_number)) order by s.week_number),'[]'::jsonb)
  into v_schedule from public.book_club_schedule s where s.month_id=v_month.id;
  select coalesce(jsonb_agg(to_jsonb(m) order by m.created_at),'[]'::jsonb) into v_messages from (
    select id,display_name,message,is_moderator,created_at,user_id=v_uid as is_own from public.book_club_messages
    where month_id=v_month.id and deleted_at is null order by created_at desc limit 60) m;
  select role into v_role from public.profiles where id=v_uid;
  return jsonb_build_object('available',true,'month',jsonb_build_object('id',v_month.id,'month_key',v_month.month_key,'label',v_month.label,'status',v_month.status,
    'voting_ends_at',v_month.voting_ends_at,'reading_starts_on',v_month.reading_starts_on,'reading_ends_on',v_month.reading_ends_on,
    'meeting_at',v_month.meeting_at,'weekly_question',v_month.weekly_question,'whatsapp_url',v_month.whatsapp_url),'selected_book',v_selected,
    'candidates',v_candidates,'user_vote',v_vote,'total_votes',v_total_votes,'schedule',v_schedule,
    'progress',jsonb_build_object('completed_weeks',v_completed,'total_weeks',v_total_weeks,'percentage',case when v_total_weeks=0 then 0 else round(100.0*v_completed/v_total_weeks) end),
    'messages',v_messages,'is_admin',coalesce(v_role='admin',false));
end; $$;

create or replace function public.cast_book_club_vote(p_month_id uuid,p_book_id uuid)
returns jsonb language plpgsql security definer set search_path=public,pg_temp as $$
declare v_uid uuid:=auth.uid(); v_month public.book_club_months%rowtype;
begin
  if v_uid is null then raise exception 'AUTH_REQUIRED'; end if; if not public.has_premium_access() then raise exception 'PREMIUM_REQUIRED'; end if;
  select * into v_month from public.book_club_months where id=p_month_id; if v_month.id is null then raise exception 'MONTH_NOT_FOUND'; end if;
  if v_month.status<>'voting' or (v_month.voting_ends_at is not null and now()>=v_month.voting_ends_at) then raise exception 'VOTING_CLOSED'; end if;
  if not exists(select 1 from public.book_club_candidates where month_id=p_month_id and book_id=p_book_id) then raise exception 'INVALID_CANDIDATE'; end if;
  insert into public.book_club_votes(month_id,user_id,book_id) values(p_month_id,v_uid,p_book_id)
  on conflict(month_id,user_id) do update set book_id=excluded.book_id,updated_at=now();
  return jsonb_build_object('ok',true,'book_id',p_book_id);
end; $$;

create or replace function public.set_book_club_week_complete(p_month_id uuid,p_week_number integer,p_completed boolean)
returns jsonb language plpgsql security definer set search_path=public,pg_temp as $$
declare v_uid uuid:=auth.uid();
begin
  if v_uid is null then raise exception 'AUTH_REQUIRED'; end if; if not public.has_premium_access() then raise exception 'PREMIUM_REQUIRED'; end if;
  if not exists(select 1 from public.book_club_schedule where month_id=p_month_id and week_number=p_week_number) then raise exception 'WEEK_NOT_FOUND'; end if;
  if p_completed then insert into public.book_club_progress(month_id,user_id,week_number) values(p_month_id,v_uid,p_week_number)
    on conflict(month_id,user_id,week_number) do update set completed_at=now();
  else delete from public.book_club_progress where month_id=p_month_id and user_id=v_uid and week_number=p_week_number; end if;
  return jsonb_build_object('ok',true);
end; $$;

create or replace function public.post_book_club_message(p_month_id uuid,p_message text)
returns jsonb language plpgsql security definer set search_path=public,pg_temp as $$
declare v_uid uuid:=auth.uid(); v_name text; v_role text; v_id uuid; v_msg text:=btrim(coalesce(p_message,''));
begin
  if v_uid is null then raise exception 'AUTH_REQUIRED'; end if; if not public.has_premium_access() then raise exception 'PREMIUM_REQUIRED'; end if;
  if char_length(v_msg)<1 or char_length(v_msg)>1200 then raise exception 'INVALID_MESSAGE'; end if;
  if not exists(select 1 from public.book_club_months where id=p_month_id) then raise exception 'MONTH_NOT_FOUND'; end if;
  if exists(select 1 from public.book_club_messages where user_id=v_uid and created_at>now()-interval '2 seconds') then raise exception 'MESSAGE_RATE_LIMIT'; end if;
  select coalesce(nullif(btrim(full_name),''),'Estudiante'),role into v_name,v_role from public.profiles where id=v_uid;
  v_name:=coalesce(v_name,'Estudiante'); v_role:=coalesce(v_role,'student');
  insert into public.book_club_messages(month_id,user_id,display_name,message,is_moderator) values(p_month_id,v_uid,left(v_name,80),v_msg,v_role='admin') returning id into v_id;
  return jsonb_build_object('ok',true,'id',v_id);
end; $$;

create or replace function public.delete_book_club_message(p_message_id uuid)
returns jsonb language plpgsql security definer set search_path=public,pg_temp as $$
declare v_uid uuid:=auth.uid(); v_role text;
begin
  if v_uid is null then raise exception 'AUTH_REQUIRED'; end if; if not public.has_premium_access() then raise exception 'PREMIUM_REQUIRED'; end if;
  select role into v_role from public.profiles where id=v_uid;
  update public.book_club_messages set deleted_at=now() where id=p_message_id and (user_id=v_uid or v_role='admin');
  if not found then raise exception 'MESSAGE_NOT_FOUND_OR_FORBIDDEN'; end if; return jsonb_build_object('ok',true);
end; $$;

revoke all on function public.get_book_club_home() from public,anon;
revoke all on function public.cast_book_club_vote(uuid,uuid) from public,anon;
revoke all on function public.set_book_club_week_complete(uuid,integer,boolean) from public,anon;
revoke all on function public.post_book_club_message(uuid,text) from public,anon;
revoke all on function public.delete_book_club_message(uuid) from public,anon;
grant execute on function public.get_book_club_home() to authenticated;
grant execute on function public.cast_book_club_vote(uuid,uuid) to authenticated;
grant execute on function public.set_book_club_week_complete(uuid,integer,boolean) to authenticated;
grant execute on function public.post_book_club_message(uuid,text) to authenticated;
grant execute on function public.delete_book_club_message(uuid) to authenticated;

insert into public.book_club_books(slug,title,author,country,country_code,publication_year,synopsis) values
('maria-jorge-isaacs','María','Jorge Isaacs','Colômbia','CO',1867,'Um romance central do romantismo hispano-americano, marcado pela memória, pela paisagem e por uma história de amor atravessada por perda e distância.'),
('amalia-jose-marmol','Amalia','José Mármol','Argentina','AR',1851,'Romance que articula drama sentimental e crítica política em torno da Buenos Aires do período rosista, permitindo discutir literatura, poder e memória histórica.'),
('cecilia-valdes-cirilo-villaverde','Cecilia Valdés','Cirilo Villaverde','Cuba','CU',1882,'Romance cubano que permite discutir sociedade, hierarquias, raça, gênero e vida urbana no século XIX a partir de uma narrativa de grande importância literária.')
on conflict(slug) do update set title=excluded.title,author=excluded.author,country=excluded.country,country_code=excluded.country_code,publication_year=excluded.publication_year,synopsis=excluded.synopsis,updated_at=now();

insert into public.book_club_months(month_key,label,status,voting_ends_at,reading_starts_on,reading_ends_on,weekly_question)
values('2026-09-01','Septiembre 2026','voting','2026-08-31 23:59:59-03','2026-09-01','2026-09-30','¿Qué elemento de la obra está transformando más tu lectura esta semana: la voz narrativa, los personajes, el espacio o el contexto histórico?')
on conflict(month_key) do update set label=excluded.label,status=excluded.status,voting_ends_at=excluded.voting_ends_at,reading_starts_on=excluded.reading_starts_on,reading_ends_on=excluded.reading_ends_on,weekly_question=excluded.weekly_question,updated_at=now();

insert into public.book_club_candidates(month_id,book_id,sort_order)
select m.id,b.id,x.ord from public.book_club_months m
cross join (values('maria-jorge-isaacs',1),('amalia-jose-marmol',2),('cecilia-valdes-cirilo-villaverde',3)) x(slug,ord)
join public.book_club_books b on b.slug=x.slug where m.month_key='2026-09-01'
on conflict(month_id,book_id) do update set sort_order=excluded.sort_order;

insert into public.book_club_schedule(month_id,week_number,title,reading_range,discussion_prompt,starts_on,ends_on)
select m.id,x.week_number,x.title,x.reading_range,x.discussion_prompt,x.starts_on,x.ends_on from public.book_club_months m
cross join (values
(1::smallint,'Semana 1 · Entrar na obra','Primeiro quarto da obra','¿Qué expectativas crea el comienzo y qué elementos del mundo narrativo te parecen más importantes?','2026-09-01'::date,'2026-09-07'::date),
(2::smallint,'Semana 2 · Vozes e conflitos','Segundo quarto da obra','¿Qué conflicto empieza a organizar la lectura y cómo cambia tu percepción de los personajes?','2026-09-08'::date,'2026-09-14'::date),
(3::smallint,'Semana 3 · Contexto e linguagem','Terceiro quarto da obra','¿Qué relación encuentras entre la forma de narrar y el contexto social o histórico de la obra?','2026-09-15'::date,'2026-09-21'::date),
(4::smallint,'Semana 4 · Fechamento e debate','Último quarto da obra','Después de terminar la obra, ¿qué interpretación defenderías en una conversación con el club?','2026-09-22'::date,'2026-09-30'::date)
) x(week_number,title,reading_range,discussion_prompt,starts_on,ends_on) where m.month_key='2026-09-01'
on conflict(month_id,week_number) do update set title=excluded.title,reading_range=excluded.reading_range,discussion_prompt=excluded.discussion_prompt,starts_on=excluded.starts_on,ends_on=excluded.ends_on;

do $$ begin
  if not exists(select 1 from pg_publication_tables where pubname='supabase_realtime' and schemaname='public' and tablename='book_club_messages') then
    alter publication supabase_realtime add table public.book_club_messages;
  end if;
end $$;
