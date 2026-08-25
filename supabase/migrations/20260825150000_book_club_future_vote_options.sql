do $$
declare
  v_month_id uuid;
begin
  select id into v_month_id
  from public.book_club_months
  where month_key = date '2026-09-01'
  limit 1;

  if v_month_id is null then
    raise exception 'BOOK_CLUB_MONTH_NOT_FOUND';
  end if;

  if exists (select 1 from public.book_club_votes where month_id = v_month_id) then
    raise exception 'BOOK_CLUB_VOTE_ALREADY_STARTED';
  end if;

  insert into public.book_club_books(slug,title,author,country,country_code,publication_year,synopsis,cover_url)
  values
    ('pedro-paramo-juan-rulfo','Pedro Páramo','Juan Rulfo','México','MX',1955,
      'Juan Preciado chega a Comala em busca de seu pai, Pedro Páramo, e encontra um espaço atravessado por memória, vozes, ausências e mortos. Um romance central da literatura latino-americana do século XX.',
      'assets/book-club/pedro-paramo.svg'),
    ('a-cachorra-pilar-quintana','A cachorra','Pilar Quintana','Colômbia','CO',2017,
      'Narrativa ambientada na costa colombiana que acompanha a relação de uma mulher com uma cadela e articula desejo de maternidade, solidão, afeto e violência em uma prosa concentrada.',
      'assets/book-club/a-cachorra.svg'),
    ('primavera-numa-esquina-partida-mario-benedetti','Primavera numa esquina partida','Mario Benedetti','Uruguai','UY',1982,
      'Romance sobre exílio, prisão, afetos e reconstrução da vida de uma família uruguaia, articulando diferentes vozes e perspectivas sobre distância, memória e retorno.',
      'assets/book-club/primavera-numa-esquina-partida.svg')
  on conflict(slug) do update set
    title=excluded.title,
    author=excluded.author,
    country=excluded.country,
    country_code=excluded.country_code,
    publication_year=excluded.publication_year,
    synopsis=excluded.synopsis,
    cover_url=excluded.cover_url,
    updated_at=now();

  delete from public.book_club_candidates where month_id = v_month_id;

  insert into public.book_club_candidates(month_id,book_id,sort_order)
  select v_month_id,b.id,x.sort_order
  from (values
    ('pedro-paramo-juan-rulfo',1),
    ('a-cachorra-pilar-quintana',2),
    ('primavera-numa-esquina-partida-mario-benedetti',3)
  ) as x(slug,sort_order)
  join public.book_club_books b on b.slug=x.slug;
end $$;