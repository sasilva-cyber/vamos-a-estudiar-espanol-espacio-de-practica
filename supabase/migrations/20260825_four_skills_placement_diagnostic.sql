-- Diagnóstico Premium A1–C2 com escuta, leitura, escrita e fala.
-- Produção aplicada em 2026-08-25. Mantém compatibilidade com placement_attempts v1.

create table if not exists public.placement_skill_questions (
  code text primary key,
  skill text not null check (skill in ('listening','reading')),
  level text not null check (level in ('A1','A2','B1','B2','C1','C2')),
  stimulus text not null,
  prompt text not null,
  options jsonb not null check (jsonb_typeof(options)='array' and jsonb_array_length(options)=4),
  correct_index smallint not null check (correct_index between 0 and 3),
  position integer not null,
  speaking_rate numeric(3,2) not null default 1.00 check (speaking_rate between 0.80 and 1.15),
  active boolean not null default true,
  unique(skill,position)
);
alter table public.placement_skill_questions enable row level security;
revoke all on public.placement_skill_questions from anon, authenticated;

create table if not exists public.placement_diagnostic_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  estimated_level text not null check (estimated_level in ('A1','A2','B1','B2','C1','C2')),
  listening_level text not null check (listening_level in ('A1','A2','B1','B2','C1','C2')),
  reading_level text not null check (reading_level in ('A1','A2','B1','B2','C1','C2')),
  writing_level text not null check (writing_level in ('A1','A2','B1','B2','C1','C2')),
  speaking_level text not null check (speaking_level in ('A1','A2','B1','B2','C1','C2')),
  speaking_basis text not null default 'guided_self_assessment',
  listening_score integer not null check (listening_score between 0 and 12),
  reading_score integer not null check (reading_score between 0 and 12),
  listening_total integer not null default 12,
  reading_total integer not null default 12,
  writing_score integer not null check (writing_score between 0 and 100),
  speaking_score integer not null check (speaking_score between 0 and 100),
  skill_scores jsonb not null default '{}'::jsonb,
  writing_metrics jsonb not null default '{}'::jsonb,
  speaking_metrics jsonb not null default '{}'::jsonb,
  speaking_storage_path text,
  duration_seconds integer,
  test_version integer not null default 2,
  completed_at timestamptz not null default now()
);
create index if not exists placement_diagnostic_attempts_user_completed_idx on public.placement_diagnostic_attempts(user_id, completed_at desc);
alter table public.placement_diagnostic_attempts enable row level security;
drop policy if exists "students read own four skills placement" on public.placement_diagnostic_attempts;
create policy "students read own four skills placement" on public.placement_diagnostic_attempts for select to authenticated using ((select auth.uid())=user_id);
revoke all on public.placement_diagnostic_attempts from anon;
grant select on public.placement_diagnostic_attempts to authenticated;

insert into public.placement_skill_questions(code,skill,level,stimulus,prompt,options,correct_index,position,speaking_rate) values
('L-A1-01','listening','A1','Hola, me llamo Marta. Vivo en Sevilla y trabajo en una librería.','¿Dónde vive Marta?','["En Madrid","En Sevilla","En Valencia","En Málaga"]',1,1,0.92),
('L-A1-02','listening','A1','El autobús número doce sale a las ocho y cuarto de la mañana.','¿A qué hora sale el autobús?','["A las 7:45","A las 8:00","A las 8:15","A las 8:30"]',2,2,0.92),
('L-A2-03','listening','A2','Buenos días. Su cita con la doctora Ramírez es el martes a las diez. Si no puede venir, llame antes del lunes por la tarde.','¿Cuándo es la cita?','["El lunes por la tarde","El martes a las diez","El martes por la tarde","El miércoles a las diez"]',1,3,0.96),
('L-A2-04','listening','A2','Pensábamos ir al parque esta tarde, pero está lloviendo mucho. Mejor nos quedamos en casa y vemos una película.','¿Por qué cambian de plan?','["Porque están cansados","Porque el parque está cerrado","Porque está lloviendo","Porque no tienen película"]',2,4,0.96),
('L-B1-05','listening','B1','Atención, pasajeros del tren con destino a Zaragoza: la salida se retrasa treinta minutos debido a una avería técnica. Rogamos disculpen las molestias.','¿Cuál es la causa del retraso?','["Una huelga","Una avería técnica","El mal tiempo","La llegada tardía del conductor"]',1,5,1.00),
('L-B1-06','listening','B1','La reunión sigue siendo hoy, pero la hemos adelantado a las doce. Si puedes, revisa el informe antes de venir porque queremos tomar una decisión definitiva.','¿Qué se espera que haga la persona antes de la reunión?','["Que cambie la fecha","Que prepare otro informe","Que revise el informe","Que cancele una decisión"]',2,6,1.00),
('L-B2-07','listening','B2','Trabajar desde casa me ha dado más autonomía, aunque no creo que sea la solución ideal para todo el mundo. Hay quienes necesitan separar con claridad el espacio profesional del personal.','¿Cuál es la postura del hablante?','["Rechaza completamente el teletrabajo","Considera que funciona igual para todos","Valora sus ventajas, pero reconoce límites","Piensa que solo sirve para empresas pequeñas"]',2,7,1.04),
('L-B2-08','listening','B2','El ayuntamiento quiere limitar el número de apartamentos turísticos en el centro. La medida no pretende acabar con el turismo, sino reducir la presión sobre la vivienda de los residentes.','¿Cuál es el objetivo principal de la medida?','["Eliminar el turismo de la ciudad","Reducir el precio de los hoteles","Proteger el acceso de residentes a la vivienda","Aumentar los apartamentos turísticos fuera del centro"]',2,8,1.04),
('L-C1-09','listening','C1','No se trata de prohibir la tecnología en el aula. La cuestión es decidir cuándo aporta una ventaja pedagógica real y cuándo simplemente sustituye una actividad que funcionaba mejor de otra manera.','¿Qué defiende principalmente el hablante?','["La eliminación de la tecnología educativa","El uso de tecnología solo cuando aporta valor pedagógico","La sustitución de todas las actividades tradicionales","La prohibición de dispositivos personales"]',1,9,1.07),
('L-C1-10','listening','C1','El éxito de la novela me sorprendió, sobre todo porque nació de una historia muy local. Quizá precisamente ahí esté la clave: cuanto más específica era la experiencia de los personajes, más universal parecía resultar para los lectores.','¿Qué paradoja señala la autora?','["Una historia local terminó conectando con lectores diversos","La novela fue escrita para un público internacional","Los personajes fueron eliminados por ser demasiado específicos","El éxito se debió a que la historia evitaba detalles locales"]',0,10,1.07),
('L-C2-11','listening','C2','Se nos promete que simplificar cada proceso nos hará más eficientes. Curiosamente, cada nueva herramienta destinada a ahorrarnos tiempo parece venir acompañada de otra contraseña, otra notificación y otra tarea de mantenimiento.','¿Qué recurso discursivo predomina?','["Una celebración literal de la eficiencia","Una ironía sobre las supuestas simplificaciones","Una descripción neutral de herramientas","Una defensa de eliminar toda tecnología"]',1,11,1.10),
('L-C2-12','listening','C2','Una política pública puede ser eficaz en promedio y, al mismo tiempo, producir efectos muy desiguales. Por eso, evaluar solo el resultado agregado puede ocultar quién asume los costes y quién recibe los beneficios.','¿Qué advertencia formula el hablante?','["Los promedios siempre son incorrectos","Toda política pública genera pérdidas","Los resultados globales pueden ocultar desigualdades distributivas","Los costes importan más que los beneficios"]',2,12,1.10),
('R-A1-01','reading','A1','Lucía trabaja de lunes a viernes. Los sábados estudia español por la mañana y por la tarde visita a sus padres.','¿Qué hace Lucía los sábados por la mañana?','["Trabaja","Estudia español","Visita a sus padres","Descansa todo el día"]',1,1,1.00),
('R-A1-02','reading','A1','Cafetería Sol: desayuno de 7:00 a 11:00. Los domingos abrimos a las 9:00.','¿A qué hora abre la cafetería los domingos?','["A las 7:00","A las 8:00","A las 9:00","A las 11:00"]',2,2,1.00),
('R-A2-03','reading','A2','Hola, Pablo: llegaré a Barcelona el viernes por la noche. El sábado por la mañana tengo una reunión, pero después estoy libre. ¿Comemos juntos?','¿Cuándo está libre la persona?','["El viernes por la mañana","El viernes por la noche","El sábado después de la reunión","El domingo por la mañana"]',2,3,1.00),
('R-A2-04','reading','A2','El museo permanecerá cerrado esta semana por obras de mantenimiento. Las entradas compradas por internet serán válidas durante los próximos tres meses.','¿Qué puede hacer una persona que ya compró una entrada?','["Pedir obligatoriamente un reembolso","Usarla durante los próximos tres meses","Entrar esta semana por otra puerta","Cambiarla por una entrada de cine"]',1,4,1.00),
('R-B1-05','reading','B1','Durante años fui al trabajo en coche porque pensaba que era la opción más rápida. Desde que ampliaron la red de metro, tardo casi lo mismo y puedo leer durante el trayecto. Ahora solo uso el coche cuando necesito transportar algo pesado.','¿Por qué cambió principalmente su forma de ir al trabajo?','["Porque vendió el coche","Porque el metro ahora resulta práctico y le permite aprovechar el trayecto","Porque ya no puede conducir","Porque su trabajo cambió de ciudad"]',1,5,1.00),
('R-B1-06','reading','B1','La biblioteca ha creado un club de lectura mensual. No es necesario terminar el libro para asistir: el objetivo es compartir impresiones y animar a más personas a leer con regularidad.','¿Cuál es el propósito principal del club?','["Comprobar quién termina los libros","Vender libros de la biblioteca","Promover la lectura y el intercambio de opiniones","Preparar exámenes de literatura"]',2,6,1.00),
('R-B2-07','reading','B2','Aunque las plataformas digitales permiten acceder a una enorme variedad de contenidos, esa abundancia no garantiza una elección más libre. Los algoritmos tienden a mostrarnos aquello que se parece a lo que ya consumimos, de modo que la diversidad disponible puede no convertirse en diversidad real de consumo.','¿Cuál es la idea central?','["Las plataformas tienen pocos contenidos","Los algoritmos pueden limitar de hecho la diversidad que consumimos","Los usuarios siempre eligen contenidos nuevos","La variedad digital elimina la influencia de los algoritmos"]',1,7,1.00),
('R-B2-08','reading','B2','La empresa implantó una semana laboral más corta sin reducir los salarios. La productividad no aumentó en todos los equipos, pero sí disminuyeron las bajas por estrés y mejoró la retención de personal.','¿Qué conclusión es más fiel al texto?','["La medida fracasó por completo","La productividad aumentó en todos los equipos","Hubo beneficios laborales aunque el efecto sobre la productividad fue desigual","Los salarios se redujeron para compensar la medida"]',2,8,1.00),
('R-C1-09','reading','C1','La memoria colectiva no es un archivo estable del pasado, sino una reconstrucción continua. Cada generación selecciona ciertos acontecimientos, modifica su significado y los relaciona con preocupaciones del presente.','¿Cómo entiende el texto la memoria colectiva?','["Como un registro inmutable","Como una reconstrucción cambiante vinculada al presente","Como una colección exclusivamente individual","Como una sustitución completa de la historia"]',1,9,1.00),
('R-C1-10','reading','C1','Que una ciudad atraiga inversiones no implica necesariamente que mejore la vida de todos sus habitantes. Si el aumento del valor del suelo expulsa a quienes ya vivían allí, el crecimiento económico puede convivir con una pérdida de cohesión social.','¿Qué relación plantea el texto?','["La inversión siempre mejora la cohesión social","El crecimiento económico puede tener costes sociales distributivos","El valor del suelo nunca afecta a los residentes","La única forma de evitar desplazamientos es impedir toda inversión"]',1,10,1.00),
('R-C2-11','reading','C2','La neutralidad de una herramienta suele darse por sentada cuando sus efectos coinciden con hábitos ya normalizados. Sin embargo, toda tecnología incorpora decisiones sobre qué facilita, qué dificulta y qué considera un uso esperado.','¿Qué cuestiona el texto?','["La existencia de hábitos sociales","La idea de que las tecnologías son completamente neutrales","La posibilidad de diseñar herramientas útiles","El uso esperado de cualquier objeto"]',1,11,1.00),
('R-C2-12','reading','C2','Una explicación puede ser rigurosamente verdadera y, sin embargo, resultar insuficiente si deja fuera el mecanismo que conecta los hechos descritos. Enumerar correlaciones no equivale a explicar por qué ocurren.','¿Qué distinción establece el texto?','["Entre verdad y mentira","Entre datos cuantitativos y cualitativos","Entre describir relaciones y explicar mecanismos causales","Entre hechos presentes y pasados"]',2,12,1.00)
on conflict (code) do update set skill=excluded.skill,level=excluded.level,stimulus=excluded.stimulus,prompt=excluded.prompt,options=excluded.options,correct_index=excluded.correct_index,position=excluded.position,speaking_rate=excluded.speaking_rate,active=true;

create or replace function public._placement_rank_level(p_rank integer) returns text language sql immutable as $$
  select case greatest(1,least(6,p_rank)) when 1 then 'A1' when 2 then 'A2' when 3 then 'B1' when 4 then 'B2' when 5 then 'C1' else 'C2' end
$$;
create or replace function public._placement_level_rank(p_level text) returns integer language sql immutable as $$
  select case p_level when 'A1' then 1 when 'A2' then 2 when 'B1' then 3 when 'B2' then 4 when 'C1' then 5 when 'C2' then 6 else 1 end
$$;

create or replace function public._placement_skill_result(p_answers jsonb,p_skill text) returns jsonb language plpgsql security invoker set search_path='public','pg_temp' as $$
declare v_total int; v_answered int; v_score int; v_a1 int; v_a2 int; v_b1 int; v_b2 int; v_c1 int; v_c2 int; v_level text;
begin
  select count(*) into v_total from public.placement_skill_questions where active and skill=p_skill;
  select count(*) into v_answered from public.placement_skill_questions q where q.active and q.skill=p_skill and p_answers ? q.code and (p_answers->>q.code) ~ '^[0-3]$';
  if v_answered<>v_total then raise exception 'PLACEMENT_INCOMPLETE'; end if;
  select count(*) filter(where level='A1' and (p_answers->>code)::int=correct_index),count(*) filter(where level='A2' and (p_answers->>code)::int=correct_index),count(*) filter(where level='B1' and (p_answers->>code)::int=correct_index),count(*) filter(where level='B2' and (p_answers->>code)::int=correct_index),count(*) filter(where level='C1' and (p_answers->>code)::int=correct_index),count(*) filter(where level='C2' and (p_answers->>code)::int=correct_index) into v_a1,v_a2,v_b1,v_b2,v_c1,v_c2 from public.placement_skill_questions where active and skill=p_skill;
  v_score:=v_a1+v_a2+v_b1+v_b2+v_c1+v_c2;
  if (v_a1+v_a2+v_b1+v_b2+v_c1)>=9 and v_c2>=1 then v_level:='C2'; elsif (v_a1+v_a2+v_b1+v_b2)>=7 and v_c1>=1 then v_level:='C1'; elsif (v_a1+v_a2+v_b1)>=5 and v_b2>=1 then v_level:='B2'; elsif (v_a1+v_a2)>=3 and v_b1>=1 then v_level:='B1'; elsif v_a1>=1 and v_a2>=1 then v_level:='A2'; else v_level:='A1'; end if;
  return jsonb_build_object('level',v_level,'score',v_score,'total',v_total,'bands',jsonb_build_object('A1',jsonb_build_object('correct',v_a1,'total',2),'A2',jsonb_build_object('correct',v_a2,'total',2),'B1',jsonb_build_object('correct',v_b1,'total',2),'B2',jsonb_build_object('correct',v_b2,'total',2),'C1',jsonb_build_object('correct',v_c1,'total',2),'C2',jsonb_build_object('correct',v_c2,'total',2)));
end;$$;
revoke execute on function public._placement_rank_level(integer) from public,anon,authenticated;
revoke execute on function public._placement_level_rank(text) from public,anon,authenticated;
revoke execute on function public._placement_skill_result(jsonb,text) from public,anon,authenticated;

create or replace function public.get_four_skills_placement_questions() returns table(question_code text,skill text,level text,stimulus text,prompt text,options jsonb,question_number integer,speaking_rate numeric) language plpgsql security definer set search_path='public','pg_temp' as $$
begin
  if auth.uid() is null then raise exception 'AUTH_REQUIRED'; end if;
  if not public.has_premium_access() then raise exception 'PREMIUM_REQUIRED'; end if;
  return query select q.code,q.skill,q.level,q.stimulus,q.prompt,q.options,q.position,q.speaking_rate from public.placement_skill_questions q where q.active order by case q.skill when 'listening' then 1 else 2 end,q.position;
end;$$;
revoke all on function public.get_four_skills_placement_questions() from public,anon;
grant execute on function public.get_four_skills_placement_questions() to authenticated;

create or replace function public.score_four_skills_objective(p_answers jsonb) returns jsonb language plpgsql security definer set search_path='public','pg_temp' as $$
declare v_l jsonb; v_r jsonb; v_rank int;
begin
  if auth.uid() is null then raise exception 'AUTH_REQUIRED'; end if;
  if not public.has_premium_access() then raise exception 'PREMIUM_REQUIRED'; end if;
  if jsonb_typeof(p_answers) is distinct from 'object' then raise exception 'INVALID_ANSWERS'; end if;
  v_l:=public._placement_skill_result(p_answers,'listening'); v_r:=public._placement_skill_result(p_answers,'reading');
  v_rank:=round((public._placement_level_rank(v_l->>'level')+public._placement_level_rank(v_r->>'level'))/2.0);
  return jsonb_build_object('listening',v_l,'reading',v_r,'preliminary_level',public._placement_rank_level(v_rank));
end;$$;
revoke all on function public.score_four_skills_objective(jsonb) from public,anon;
grant execute on function public.score_four_skills_objective(jsonb) to authenticated;

create or replace function public.submit_four_skills_placement(p_answers jsonb,p_writing_text text,p_writing_target_level text,p_speaking_self jsonb,p_speaking_storage_path text default null,p_duration_seconds integer default null) returns jsonb
language plpgsql security definer set search_path='public','pg_temp' as $$
declare
  v_uid uuid:=auth.uid(); v_l jsonb; v_r jsonb; v_prelim_rank int; v_target_rank int;
  v_words int; v_unique int; v_sentences int; v_paragraphs int; v_connectors int; v_advanced int; v_pt int; v_avg numeric; v_lex numeric;
  v_min_words int; v_conn_target int; v_writing_score int; v_writing_rank int; v_writing_level text;
  v_fluency int; v_range int; v_interaction int; v_pronunciation int; v_confidence int; v_speaking_score int; v_speaking_rank int; v_speaking_level text;
  v_general_rank int; v_general_level text; v_attempt uuid; v_completed timestamptz; v_band jsonb;
begin
  if v_uid is null then raise exception 'AUTH_REQUIRED'; end if;
  if not public.has_premium_access() then raise exception 'PREMIUM_REQUIRED'; end if;
  if jsonb_typeof(p_answers) is distinct from 'object' then raise exception 'INVALID_ANSWERS'; end if;
  if p_writing_target_level not in ('A1','A2','B1','B2','C1','C2') then raise exception 'INVALID_WRITING_LEVEL'; end if;
  if length(trim(coalesce(p_writing_text,'')))<20 then raise exception 'WRITING_INCOMPLETE'; end if;
  if jsonb_typeof(p_speaking_self) is distinct from 'object' then raise exception 'SPEAKING_INCOMPLETE'; end if;
  v_l:=public._placement_skill_result(p_answers,'listening'); v_r:=public._placement_skill_result(p_answers,'reading');
  v_prelim_rank:=round((public._placement_level_rank(v_l->>'level')+public._placement_level_rank(v_r->>'level'))/2.0); v_target_rank:=public._placement_level_rank(p_writing_target_level); if abs(v_target_rank-v_prelim_rank)>1 then v_target_rank:=v_prelim_rank; end if;
  select count(*) into v_words from regexp_split_to_table(lower(trim(p_writing_text)),'[^a-záéíóúüñ]+') w where length(w)>0;
  select count(distinct w) into v_unique from regexp_split_to_table(lower(trim(p_writing_text)),'[^a-záéíóúüñ]+') w where length(w)>0;
  select greatest(1,count(*)) into v_sentences from regexp_matches(p_writing_text,'[^.!?]+[.!?]?','g');
  v_paragraphs:=greatest(1,array_length(regexp_split_to_array(trim(p_writing_text),E'\n\s*\n'),1)); v_avg:=case when v_sentences>0 then v_words::numeric/v_sentences else v_words end; v_lex:=case when v_words>0 then v_unique::numeric/v_words else 0 end;
  select count(*) into v_connectors from unnest(array['y','pero','porque','también','además','entonces','después','aunque','sin embargo','por eso','por lo tanto','por una parte','por otro lado','en cambio','no obstante','por consiguiente','en conclusión','si bien','de ahí que','aun cuando','en definitiva']) c where position(c in lower(p_writing_text))>0;
  select count(*) into v_advanced from unnest(array['aunque','sin embargo','no obstante','por consiguiente','si bien','de ahí que','aun cuando','en la medida en que','a pesar de que','mientras que']) c where position(c in lower(p_writing_text))>0;
  select count(*) into v_pt from regexp_matches(lower(p_writing_text),'\m(você|vocês|não|também|muito|muita|estou|sou|acho|coisas)\M','g');
  v_min_words:=case v_target_rank when 1 then 60 when 2 then 90 when 3 then 130 when 4 then 170 when 5 then 220 else 280 end; v_conn_target:=case v_target_rank when 1 then 2 when 2 then 3 when 3 then 4 when 4 then 5 when 5 then 6 else 7 end;
  v_writing_score:=least(30,round(30.0*least(v_words,v_min_words)/v_min_words)); v_writing_score:=v_writing_score+case when v_lex>=0.55 then 20 when v_lex>=0.45 then 17 when v_lex>=0.35 then 13 else 8 end; v_writing_score:=v_writing_score+least(20,round(20.0*least(v_connectors,v_conn_target)/v_conn_target)); v_writing_score:=v_writing_score+case when v_target_rank<=2 and v_sentences>=4 then 15 when v_target_rank between 3 and 4 and v_paragraphs>=2 and v_sentences>=6 then 15 when v_target_rank>=5 and v_paragraphs>=3 and v_sentences>=8 then 15 else 8 end; v_writing_score:=v_writing_score+case when v_target_rank<=2 and v_avg between 5 and 18 then 15 when v_target_rank=3 and v_advanced>=1 then 15 when v_target_rank=4 and v_advanced>=2 then 15 when v_target_rank=5 and v_advanced>=3 then 15 when v_target_rank=6 and v_advanced>=4 then 15 else greatest(4,least(12,v_advanced*3+4)) end; v_writing_score:=greatest(0,least(100,v_writing_score-least(15,v_pt*5)));
  v_writing_rank:=case when v_writing_score>=88 then least(6,v_target_rank+1) when v_writing_score>=65 then v_target_rank when v_writing_score>=48 then greatest(1,v_target_rank-1) else greatest(1,v_target_rank-2) end; v_writing_level:=public._placement_rank_level(v_writing_rank);
  begin v_fluency:=greatest(1,least(5,(p_speaking_self->>'fluency')::int)); v_range:=greatest(1,least(5,(p_speaking_self->>'range')::int)); v_interaction:=greatest(1,least(5,(p_speaking_self->>'interaction')::int)); v_pronunciation:=greatest(1,least(5,(p_speaking_self->>'pronunciation')::int)); v_confidence:=greatest(1,least(5,(p_speaking_self->>'confidence')::int)); exception when others then raise exception 'SPEAKING_INCOMPLETE'; end;
  v_speaking_score:=round(20.0*(v_fluency+v_range+v_interaction+v_pronunciation+v_confidence)/5.0); v_speaking_rank:=case when v_speaking_score<36 then 1 when v_speaking_score<51 then 2 when v_speaking_score<66 then 3 when v_speaking_score<79 then 4 when v_speaking_score<91 then 5 else 6 end; v_speaking_rank:=least(v_speaking_rank,v_prelim_rank+1); v_speaking_level:=public._placement_rank_level(v_speaking_rank);
  v_general_rank:=round(0.30*public._placement_level_rank(v_l->>'level')+0.30*public._placement_level_rank(v_r->>'level')+0.25*v_writing_rank+0.15*v_speaking_rank); v_general_level:=public._placement_rank_level(v_general_rank);
  insert into public.placement_diagnostic_attempts(user_id,estimated_level,listening_level,reading_level,writing_level,speaking_level,listening_score,reading_score,writing_score,speaking_score,skill_scores,writing_metrics,speaking_metrics,speaking_storage_path,duration_seconds)
  values(v_uid,v_general_level,v_l->>'level',v_r->>'level',v_writing_level,v_speaking_level,(v_l->>'score')::int,(v_r->>'score')::int,v_writing_score,v_speaking_score,jsonb_build_object('listening',v_l,'reading',v_r,'writing',jsonb_build_object('level',v_writing_level,'score',v_writing_score,'total',100),'speaking',jsonb_build_object('level',v_speaking_level,'score',v_speaking_score,'total',100,'basis','guided_self_assessment')),jsonb_build_object('target_level',public._placement_rank_level(v_target_rank),'word_count',v_words,'unique_words',v_unique,'lexical_diversity',round(v_lex*100,1),'sentence_count',v_sentences,'paragraph_count',v_paragraphs,'connector_variety',v_connectors,'advanced_connectors',v_advanced,'portuguese_signals',v_pt,'average_sentence_words',round(v_avg,1)),jsonb_build_object('fluency',v_fluency,'range',v_range,'interaction',v_interaction,'pronunciation',v_pronunciation,'confidence',v_confidence,'recording_saved',p_speaking_storage_path is not null),p_speaking_storage_path,case when p_duration_seconds is null then null else greatest(0,least(p_duration_seconds,10800)) end) returning id,completed_at into v_attempt,v_completed;
  v_band:=jsonb_build_object('A1',jsonb_build_object('correct',coalesce((v_l->'bands'->'A1'->>'correct')::int,0)+coalesce((v_r->'bands'->'A1'->>'correct')::int,0),'total',4),'A2',jsonb_build_object('correct',coalesce((v_l->'bands'->'A2'->>'correct')::int,0)+coalesce((v_r->'bands'->'A2'->>'correct')::int,0),'total',4),'B1',jsonb_build_object('correct',coalesce((v_l->'bands'->'B1'->>'correct')::int,0)+coalesce((v_r->'bands'->'B1'->>'correct')::int,0),'total',4),'B2',jsonb_build_object('correct',coalesce((v_l->'bands'->'B2'->>'correct')::int,0)+coalesce((v_r->'bands'->'B2'->>'correct')::int,0),'total',4),'C1',jsonb_build_object('correct',coalesce((v_l->'bands'->'C1'->>'correct')::int,0)+coalesce((v_r->'bands'->'C1'->>'correct')::int,0),'total',4),'C2',jsonb_build_object('correct',coalesce((v_l->'bands'->'C2'->>'correct')::int,0)+coalesce((v_r->'bands'->'C2'->>'correct')::int,0),'total',4));
  insert into public.placement_attempts(user_id,estimated_level,score,total,band_scores,duration_seconds,test_version) values(v_uid,v_general_level,(v_l->>'score')::int+(v_r->>'score')::int,24,v_band,case when p_duration_seconds is null then null else greatest(0,least(p_duration_seconds,10800)) end,2);
  return jsonb_build_object('attempt_id',v_attempt,'estimated_level',v_general_level,'completed_at',v_completed,'skills',jsonb_build_object('listening',v_l,'reading',v_r,'writing',jsonb_build_object('level',v_writing_level,'score',v_writing_score,'metrics',jsonb_build_object('word_count',v_words,'lexical_diversity',round(v_lex*100,1),'connector_variety',v_connectors,'paragraph_count',v_paragraphs)),'speaking',jsonb_build_object('level',v_speaking_level,'score',v_speaking_score,'basis','guided_self_assessment')),'priority_skill',case least(public._placement_level_rank(v_l->>'level'),public._placement_level_rank(v_r->>'level'),v_writing_rank,v_speaking_rank) when public._placement_level_rank(v_l->>'level') then 'listening' when public._placement_level_rank(v_r->>'level') then 'reading' when v_writing_rank then 'writing' else 'speaking' end);
end;$$;
revoke all on function public.submit_four_skills_placement(jsonb,text,text,jsonb,text,integer) from public,anon;
grant execute on function public.submit_four_skills_placement(jsonb,text,text,jsonb,text,integer) to authenticated;

insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types) values('placement-speaking','placement-speaking',false,10485760,array['audio/webm','audio/ogg','audio/mp4','audio/mpeg']) on conflict (id) do update set public=false,file_size_limit=10485760,allowed_mime_types=excluded.allowed_mime_types;
drop policy if exists "placement speaking upload own" on storage.objects;
create policy "placement speaking upload own" on storage.objects for insert to authenticated with check (bucket_id='placement-speaking' and (storage.foldername(name))[1]=(select auth.uid())::text);
drop policy if exists "placement speaking read own" on storage.objects;
create policy "placement speaking read own" on storage.objects for select to authenticated using (bucket_id='placement-speaking' and (storage.foldername(name))[1]=(select auth.uid())::text);
drop policy if exists "placement speaking delete own" on storage.objects;
create policy "placement speaking delete own" on storage.objects for delete to authenticated using (bucket_id='placement-speaking' and (storage.foldername(name))[1]=(select auth.uid())::text);
