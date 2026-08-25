drop policy if exists "premium reads club messages" on public.book_club_messages;
revoke select on public.book_club_messages from authenticated;

do $$ begin
  if exists(select 1 from pg_publication_tables where pubname='supabase_realtime' and schemaname='public' and tablename='book_club_messages') then
    alter publication supabase_realtime drop table public.book_club_messages;
  end if;
end $$;

create or replace function public.get_book_club_messages(p_month_id uuid,p_limit integer default 60)
returns jsonb
language plpgsql
security definer
set search_path=public,pg_temp
as $$
declare v_uid uuid:=auth.uid(); v_messages jsonb;
begin
  if v_uid is null then raise exception 'AUTH_REQUIRED'; end if;
  if not public.has_premium_access() then raise exception 'PREMIUM_REQUIRED'; end if;
  if not exists(select 1 from public.book_club_months where id=p_month_id) then raise exception 'MONTH_NOT_FOUND'; end if;
  select coalesce(jsonb_agg(to_jsonb(m) order by m.created_at),'[]'::jsonb)
  into v_messages
  from (
    select id,display_name,message,is_moderator,created_at,user_id=v_uid as is_own
    from public.book_club_messages
    where month_id=p_month_id and deleted_at is null
    order by created_at desc
    limit greatest(1,least(coalesce(p_limit,60),100))
  ) m;
  return v_messages;
end;
$$;

revoke all on function public.get_book_club_messages(uuid,integer) from public,anon;
grant execute on function public.get_book_club_messages(uuid,integer) to authenticated;
