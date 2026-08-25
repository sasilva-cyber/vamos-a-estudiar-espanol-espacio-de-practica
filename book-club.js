/* Clube Español entre Páginas — módulo Premium isolado da Área do Estudiante. */
(function(){
  const $=id=>document.getElementById(id);
  const state={session:null,home:null,monthId:null,pollTimer:null,sending:false};

  function track(name,params={}){
    try{if(typeof window.vaeTrack==='function')window.vaeTrack(name,params);else if(typeof window.gtag==='function')window.gtag('event',name,params);}catch(_){ }
  }
  function parseDate(value){
    const raw=String(value||'');
    const match=raw.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if(match)return new Date(Number(match[1]),Number(match[2])-1,Number(match[3]),12,0,0);
    return new Date(raw);
  }
  function formatDate(value){
    const d=parseDate(value);
    if(Number.isNaN(d.getTime()))return '—';
    return new Intl.DateTimeFormat('pt-BR',{day:'2-digit',month:'short',year:'numeric'}).format(d);
  }
  function formatDateTime(value){
    const d=new Date(value||'');
    if(Number.isNaN(d.getTime()))return '—';
    return new Intl.DateTimeFormat('pt-BR',{day:'2-digit',month:'short',hour:'2-digit',minute:'2-digit'}).format(d);
  }
  function formatTime(value){
    const d=new Date(value||'');
    if(Number.isNaN(d.getTime()))return '';
    return new Intl.DateTimeFormat('pt-BR',{hour:'2-digit',minute:'2-digit'}).format(d);
  }
  function safeHttpUrl(value){
    try{const u=new URL(String(value||''));return ['https:','http:'].includes(u.protocol)?u.href:null;}catch(_){return null;}
  }
  function showDenied(){
    $('club-loading')?.classList.add('hidden');$('club-content')?.classList.add('hidden');$('club-denied')?.classList.remove('hidden');$('club-main')?.setAttribute('aria-busy','false');
  }
  function showContent(){
    $('club-loading')?.classList.add('hidden');$('club-denied')?.classList.add('hidden');$('club-content')?.classList.remove('hidden');$('club-main')?.setAttribute('aria-busy','false');
  }
  function setStatus(id,message,type=''){
    const node=$(id);if(!node)return;node.textContent=message;node.className=`club-inline-status${type?` ${type}`:''}`;
  }

  function makeCover(book,className='club-cover'){
    const cover=document.createElement('div');cover.className=className;
    const country=document.createElement('small');country.textContent=`${book.country_code?`${book.country_code} · `:''}${book.country||'Literatura hispânica'}`;
    const title=document.createElement('strong');title.textContent=book.title||'Lectura del mes';
    const author=document.createElement('span');author.textContent=book.author||'';
    cover.append(country,title,author);return cover;
  }

  function renderMonth(){
    const home=state.home,month=home?.month;if(!month)return;
    $('club-month-label').textContent=month.label||'Edição atual';
    const pill=$('club-status-pill');
    const statusLabel={voting:'Votação aberta',reading:'Leitura em andamento',archived:'Edição encerrada',draft:'Em preparação'}[month.status]||'Clube';
    pill.textContent=statusLabel;pill.classList.toggle('reading',month.status==='reading');
    const host=$('club-month-content');host.replaceChildren();

    if(month.status==='reading'&&home.selected_book){
      const book=home.selected_book;
      const box=document.createElement('div');box.className='club-current-book';box.appendChild(makeCover(book));
      const copy=document.createElement('div');copy.className='club-current-copy';
      const h=document.createElement('h3');h.textContent=book.title;
      const meta=document.createElement('div');meta.className='club-book-meta';meta.textContent=`${book.author} · ${book.country}${book.publication_year?` · ${book.publication_year}`:''}`;
      const p=document.createElement('p');p.textContent=book.synopsis||'';
      const actions=document.createElement('div');actions.className='club-current-actions';
      const access=safeHttpUrl(book.acquisition_url);
      if(access){const a=document.createElement('a');a.href=access;a.target='_blank';a.rel='noopener noreferrer';a.textContent='Acessar edição indicada →';actions.appendChild(a);}
      const dates=document.createElement('span');dates.textContent=`Leitura: ${formatDate(month.reading_starts_on)} → ${formatDate(month.reading_ends_on)}`;actions.appendChild(dates);
      if(month.meeting_at){const meeting=document.createElement('span');meeting.textContent=`Encontro: ${formatDateTime(month.meeting_at)}`;actions.appendChild(meeting);}
      copy.append(h,meta,p,actions);box.appendChild(copy);host.appendChild(box);
    }else{
      const box=document.createElement('div');box.className='club-voting-intro';
      const strong=document.createElement('strong');strong.textContent='A leitura do mês será escolhida pelos membros. ';
      const text=document.createTextNode(`A votação fica aberta até ${formatDateTime(month.voting_ends_at)}. Quando ela terminar, a obra mais votada passa automaticamente a ocupar este espaço.`);
      box.append(strong,text);host.appendChild(box);
    }
  }

  function renderCandidates(){
    const home=state.home,month=home?.month,grid=$('club-candidate-grid');if(!grid||!month)return;grid.replaceChildren();
    const open=month.status==='voting'&&(!month.voting_ends_at||Date.now()<new Date(month.voting_ends_at).getTime());
    $('club-vote-deadline').textContent=open?`Encerra ${formatDateTime(month.voting_ends_at)}`:`${home.total_votes||0} voto(s)`;
    $('club-vote-description').textContent=open?'Vote em uma obra. Você pode mudar seu voto enquanto a votação estiver aberta.':'A votação desta edição foi encerrada. Os percentuais finais ficam registrados no clube.';
    (home.candidates||[]).forEach(book=>{
      const article=document.createElement('article');article.className=`club-candidate${book.user_voted?' user-voted':''}`;
      article.appendChild(makeCover(book,'club-candidate-cover'));
      const h=document.createElement('h3');h.textContent=book.title;
      const meta=document.createElement('div');meta.className='club-candidate-meta';meta.textContent=`${book.author} · ${book.country}${book.publication_year?` · ${book.publication_year}`:''}`;
      const p=document.createElement('p');p.textContent=book.synopsis||'';
      const meter=document.createElement('div');meter.className='club-vote-meter';const fill=document.createElement('span');fill.style.width=`${Math.max(0,Math.min(100,Number(book.percentage)||0))}%`;meter.appendChild(fill);
      const row=document.createElement('div');row.className='club-vote-row';const score=document.createElement('span');score.textContent=`${book.votes||0} voto(s) · ${Number(book.percentage||0)}%`;
      const button=document.createElement('button');button.type='button';button.className=`club-vote-button${book.user_voted?' secondary':''}`;button.disabled=!open;button.textContent=book.user_voted?'Seu voto ✓':'Votar neste livro';
      if(open)button.addEventListener('click',()=>castVote(book.id,button));
      row.append(score,button);article.append(h,meta,p,meter,row);grid.appendChild(article);
    });
    if(!(home.candidates||[]).length){grid.innerHTML='<div class="club-chat-empty">As opções da próxima votação ainda estão sendo preparadas.</div>';}
  }

  async function castVote(bookId,button){
    if(!state.monthId||button.disabled)return;button.disabled=true;setStatus('club-vote-status','Registrando seu voto…');
    try{
      const supabase=window.VAEAuth.getClient();const {error}=await supabase.rpc('cast_book_club_vote',{p_month_id:state.monthId,p_book_id:bookId});if(error)throw error;
      setStatus('club-vote-status','Voto registrado. Você pode alterá-lo até o encerramento.','success');track('book_club_vote',{month_id:state.monthId,book_id:bookId});await loadHome(false);
    }catch(error){console.error('Falha ao votar no clube',error);setStatus('club-vote-status','Não foi possível registrar seu voto agora. Tente novamente.','error');button.disabled=false;}
  }

  function renderSchedule(){
    const home=state.home,list=$('club-week-list');if(!list)return;list.replaceChildren();
    const pct=Number(home?.progress?.percentage||0);$('club-progress-value').textContent=`${pct}%`;$('club-progress-bar').style.width=`${pct}%`;
    const readingActive=home?.month?.status==='reading';
    (home.schedule||[]).forEach(week=>{
      const item=document.createElement('article');item.className=`club-week${week.completed?' done':''}`;
      const num=document.createElement('span');num.className='club-week-number';num.textContent=week.completed?'✓':String(week.week_number);
      const copy=document.createElement('div');copy.className='club-week-copy';const strong=document.createElement('strong');strong.textContent=week.title;const meta=document.createElement('span');meta.textContent=`${week.reading_range} · ${formatDate(week.starts_on)}–${formatDate(week.ends_on)}`;const prompt=document.createElement('p');prompt.textContent=week.discussion_prompt;copy.append(strong,meta,prompt);
      const button=document.createElement('button');button.type='button';button.disabled=!readingActive;button.textContent=week.completed?'Marcar como pendente':'Concluí esta etapa ✓';button.addEventListener('click',()=>toggleWeek(week.week_number,!week.completed,button));
      item.append(num,copy,button);list.appendChild(item);
    });
    if(!(home.schedule||[]).length)list.innerHTML='<div class="club-chat-empty">O cronograma desta edição ainda está sendo preparado.</div>';
  }

  async function toggleWeek(weekNumber,completed,button){
    if(!state.monthId)return;button.disabled=true;
    try{const supabase=window.VAEAuth.getClient();const {error}=await supabase.rpc('set_book_club_week_complete',{p_month_id:state.monthId,p_week_number:weekNumber,p_completed:completed});if(error)throw error;track('book_club_week_progress',{week:weekNumber,completed});await loadHome(false);}catch(error){console.error('Falha ao atualizar leitura',error);button.disabled=false;}
  }

  function renderCommunity(){
    const month=state.home?.month,link=safeHttpUrl(month?.whatsapp_url),a=$('club-whatsapp'),pending=$('club-whatsapp-pending');
    if(link){a.href=link;a.classList.remove('hidden');pending.classList.add('hidden');}else{a.classList.add('hidden');pending.classList.remove('hidden');}
    const q=$('club-weekly-question');q.replaceChildren();const strong=document.createElement('strong');strong.textContent='Pergunta da semana';const text=document.createTextNode(month?.weekly_question||'A pergunta da semana será publicada em breve.');q.append(strong,text);
  }

  function renderMessages(messages){
    const chat=$('club-chat');if(!chat)return;chat.replaceChildren();
    if(!messages?.length){const empty=document.createElement('div');empty.className='club-chat-empty';empty.textContent='A sala ainda está silenciosa. Seja a primeira pessoa a abrir a conversa sobre a leitura.';chat.appendChild(empty);return;}
    messages.forEach(msg=>{
      const item=document.createElement('article');item.className=`club-message${msg.is_own?' own':''}`;item.dataset.messageId=msg.id;
      const head=document.createElement('div');head.className='club-message-head';const name=document.createElement('strong');name.textContent=msg.display_name||'Estudiante';head.appendChild(name);
      if(msg.is_moderator){const badge=document.createElement('span');badge.className='club-moderator-badge';badge.textContent='MOD';head.appendChild(badge);}
      const time=document.createElement('time');time.dateTime=msg.created_at||'';time.textContent=formatTime(msg.created_at);head.appendChild(time);
      const p=document.createElement('p');p.textContent=msg.message||'';item.append(head,p);
      if(msg.is_own||state.home?.is_admin){const del=document.createElement('button');del.type='button';del.className='club-message-delete';del.textContent='Excluir mensagem';del.addEventListener('click',()=>deleteMessage(msg.id,del));item.appendChild(del);}
      chat.appendChild(item);
    });
    chat.scrollTop=chat.scrollHeight;
  }

  async function loadMessages(silent=true){
    if(!state.monthId||document.hidden)return;
    try{const supabase=window.VAEAuth.getClient();const {data,error}=await supabase.rpc('get_book_club_messages',{p_month_id:state.monthId,p_limit:60});if(error)throw error;renderMessages(Array.isArray(data)?data:[]);if(!silent)setStatus('club-chat-status','Conversa atualizada.','success');}catch(error){console.warn('Falha ao atualizar chat do clube',error);if(!silent)setStatus('club-chat-status','Não foi possível atualizar a conversa agora.','error');}
  }

  async function sendMessage(event){
    event.preventDefault();if(state.sending||!state.monthId)return;const area=$('club-message'),message=area.value.trim();if(!message){setStatus('club-chat-status','Escreva uma mensagem antes de enviar.','error');return;}
    state.sending=true;$('club-send-message').disabled=true;setStatus('club-chat-status','Enviando…');
    try{const supabase=window.VAEAuth.getClient();const {error}=await supabase.rpc('post_book_club_message',{p_month_id:state.monthId,p_message:message});if(error)throw error;area.value='';$('club-message-count').textContent='0/1200';setStatus('club-chat-status','Mensagem enviada ao clube.','success');track('book_club_message_post',{month_id:state.monthId});await loadMessages(true);}catch(error){console.error('Falha ao enviar mensagem',error);const rate=String(error?.message||'').includes('MESSAGE_RATE_LIMIT');setStatus('club-chat-status',rate?'Aguarde alguns segundos antes de enviar outra mensagem.':'Não foi possível enviar sua mensagem agora.','error');}finally{state.sending=false;$('club-send-message').disabled=false;}
  }

  async function deleteMessage(id,button){
    button.disabled=true;
    try{const supabase=window.VAEAuth.getClient();const {error}=await supabase.rpc('delete_book_club_message',{p_message_id:id});if(error)throw error;await loadMessages(true);}catch(error){console.error('Falha ao excluir mensagem',error);button.disabled=false;}
  }

  function installPolling(){
    if(state.pollTimer)clearInterval(state.pollTimer);
    state.pollTimer=setInterval(()=>{if(!document.hidden)loadMessages(true);},15000);
  }

  function renderAll(){
    renderMonth();renderCandidates();renderSchedule();renderCommunity();renderMessages(state.home?.messages||[]);
  }

  async function loadHome(initial=true){
    const supabase=window.VAEAuth.getClient();const {data,error}=await supabase.rpc('get_book_club_home');if(error)throw error;
    state.home=data||{};if(!state.home.available){if(initial)showContent();return;}
    state.monthId=state.home.month?.id||null;renderAll();if(initial){showContent();installPolling();track('book_club_view',{month_id:state.monthId,status:state.home.month?.status||''});}
  }

  function installUi(){
    $('club-composer')?.addEventListener('submit',sendMessage);
    $('club-chat-refresh')?.addEventListener('click',()=>loadMessages(false));
    $('club-message')?.addEventListener('input',event=>{$('club-message-count').textContent=`${event.target.value.length}/1200`;});
    document.addEventListener('visibilitychange',()=>{if(!document.hidden)loadMessages(true);});
    window.addEventListener('pagehide',()=>{if(state.pollTimer)clearInterval(state.pollTimer);},{once:true});
  }

  async function boot(){
    if(!window.VAEAuth?.isConfigured?.()){$('club-loading').textContent='O clube ainda não está disponível.';return;}
    try{
      state.session=await window.VAEAuth.requireSession();if(!state.session?.user)return;
      const supabase=window.VAEAuth.getClient();const {data:membership,error:membershipError}=await supabase.rpc('get_membership_summary');if(membershipError)throw membershipError;
      if(!(membership?.role==='admin'||membership?.premium_access))return showDenied();
      installUi();await loadHome(true);
    }catch(error){
      console.error('Falha ao abrir Clube Español entre Páginas',error);const text=String(error?.message||'').toLowerCase();if(text.includes('premium'))return showDenied();$('club-loading').textContent='Não foi possível abrir o clube agora. Atualize a página e tente novamente.';$('club-main')?.setAttribute('aria-busy','false');
    }
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
