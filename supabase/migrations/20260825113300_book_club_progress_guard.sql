create or replace function public.set_book_club_week_complete(p_month_id uuid,p_week_number integer,p_completed boolean)
returns jsonb
language plpgsql
security definer
set search_path=public,pg_temp
as $$
declare v_uid uuid:=auth.uid(); v_status text;
begin
  if v_uid is null then raise exception 'AUTH_REQUIRED'; end if;
  if not public.has_premium_access() then raise exception 'PREMIUM_REQUIRED'; end if;
  select status into v_status from public.book_club_months where id=p_month_id;
  if v_status is null then raise exception 'MONTH_NOT_FOUND'; end if;
  if v_status<>'reading' then raise exception 'READING_NOT_STARTED'; end if;
  if not exists(select 1 from public.book_club_schedule where month_id=p_month_id and week_number=p_week_number) then raise exception 'WEEK_NOT_FOUND'; end if;
  if p_completed then
    insert into public.book_club_progress(month_id,user_id,week_number) values(p_month_id,v_uid,p_week_number)
    on conflict(month_id,user_id,week_number) do update set completed_at=now();
  else
    delete from public.book_club_progress where month_id=p_month_id and user_id=v_uid and week_number=p_week_number;
  end if;
  return jsonb_build_object('ok',true);
end;
$$;
revoke all on function public.set_book_club_week_complete(uuid,integer,boolean) from public,anon;
grant execute on function public.set_book_club_week_complete(uuid,integer,boolean) to authenticated;
