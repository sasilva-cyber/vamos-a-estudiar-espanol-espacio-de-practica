/* Práctica de escritura Premium: progressão, revisão e evolução individual. */
(function(){
  const LEVELS=['A1','A2','B1','B2','C1','C2'];
  const state={session:null,activities:[],submissions:new Map(),activeId:null};
  const $=id=>document.getElementById(id);

  function escapeHtml(value){
    return String(value??'').replace(/[&<>"]/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[char]));
  }

  function words(text){return (String(text||'').toLocaleLowerCase('es').match(/[a-záéíóúüñ]+/gi)||[]);}
  function metrics(text,activity){
    const list=words(text);
    const unique=new Set(list);
    const sentenceCount=String(text||'').split(/[.!?]+/).map(v=>v.trim()).filter(Boolean).length;
    const lower=String(text||'').toLocaleLowerCase('es');
    const used=(activity?.connectors||[]).filter(item=>lower.includes(String(item).toLocaleLowerCase('es')));
    return {
      word_count:list.length,
      sentence_count:sentenceCount,
      unique_words:unique.size,
      connector_count:used.length,
      lexical_diversity:list.length?Number(((unique.size/list.length)*100).toFixed(2)):0,
      used_connectors:used
    };
  }

  function formatDate(value){
    const date=new Date(value||'');
    if(Number.isNaN(date.getTime()))return '—';
    return new Intl.DateTimeFormat('pt-BR',{day:'2-digit',month:'short',year:'numeric'}).format(date);
  }

  function activityById(id){return state.activities.find(item=>item.id===id)||null;}
  function orderedSubmissions(){
    return [...state.submissions.values()].sort((a,b)=>new Date(a.completed_at)-new Date(b.completed_at));
  }
  function firstIncompleteIndex(){return state.activities.findIndex(item=>!state.submissions.has(item.id));}
  function completedCount(){return state.submissions.size;}

  function showDenied(){
    $('writing-loading')?.classList.add('hidden');
    $('writing-content')?.classList.add('hidden');
    $('writing-denied')?.classList.remove('hidden');
    $('writing-main')?.setAttribute('aria-busy','false');
  }

  function showContent(){
    $('writing-loading')?.classList.add('hidden');
    $('writing-denied')?.classList.add('hidden');
    $('writing-content')?.classList.remove('hidden');
    $('writing-main')?.setAttribute('aria-busy','false');
  }

  function updateProgress(){
    const done=completedCount();
    const total=state.activities.length;
    const pct=total?Math.round((done/total)*100):0;
    if($('writing-progress-title'))$('writing-progress-title').textContent=`${done} de ${total} concluídas`;
    if($('writing-progress-bar'))$('writing-progress-bar').style.width=`${pct}%`;
    if($('writing-path-count'))$('writing-path-count').textContent=`${done}/${total}`;
    const nextIndex=firstIncompleteIndex();
    const next=nextIndex>=0?state.activities[nextIndex]:null;
    if($('writing-progress-caption'))$('writing-progress-caption').textContent=next?`Próxima etapa: ${next.level} · ${next.title}`:'Percurso completo. Seu histórico continua disponível.';
  }

  function renderLevelRail(){
    const rail=$('writing-level-rail');
    if(!rail)return;
    rail.replaceChildren();
    const nextIndex=firstIncompleteIndex();
    const next=nextIndex>=0?state.activities[nextIndex]:null;
    LEVELS.forEach(level=>{
      const items=state.activities.filter(item=>item.level===level);
      const done=items.length&&items.every(item=>state.submissions.has(item.id));
      const pill=document.createElement('span');
      pill.className=`writing-level-pill${done?' done':''}${next?.level===level?' current':''}`;
      pill.textContent=level;
      rail.appendChild(pill);
    });
  }

  function renderActivityList(){
    const list=$('writing-activity-list');
    if(!list)return;
    list.replaceChildren();
    const nextIndex=firstIncompleteIndex();
    state.activities.forEach((activity,index)=>{
      const submission=state.submissions.get(activity.id);
      const available=Boolean(submission)||nextIndex===-1||index===nextIndex;
      const button=document.createElement('button');
      button.type='button';
      button.className=`writing-activity-button${submission?' completed':''}${state.activeId===activity.id?' active':''}`;
      button.disabled=!available;
      const num=document.createElement('span');
      num.className='writing-activity-num';
      num.textContent=submission?'✓':String(activity.sequence).padStart(2,'0');
      const copy=document.createElement('span');copy.className='writing-activity-copy';
      const strong=document.createElement('strong');strong.textContent=activity.title;
      const meta=document.createElement('span');meta.textContent=`${activity.level} · ${activity.genre} · ${activity.min_words}–${activity.max_words} palavras`;
      copy.append(strong,meta);
      const status=document.createElement('span');status.className='writing-activity-state';status.textContent=submission?'Feita':available?'Agora':'🔒';
      button.append(num,copy,status);
      if(available)button.addEventListener('click',()=>openActivity(activity.id));
      list.appendChild(button);
    });
  }

  function targetHtml(activity){
    return `<div class="writing-target"><span>${activity.min_words}–${activity.max_words} palavras</span><span>${escapeHtml(activity.genre)}</span><span>${escapeHtml(activity.level)}</span></div>`;
  }
  function listHtml(values){return `<ul>${(values||[]).map(item=>`<li>${escapeHtml(item)}</li>`).join('')}</ul>`;}

  function renderCompleted(activity,submission){
    const editor=$('writing-editor');
    if(!editor)return;
    $('writing-empty-state')?.classList.add('hidden');
    editor.classList.remove('hidden');
    editor.innerHTML=`
      <div class="writing-editor-head">
        <div class="writing-editor-topline"><span class="writing-level-badge">${escapeHtml(activity.level)}</span><span class="writing-genre">${escapeHtml(activity.genre)}</span></div>
        <h2>${escapeHtml(activity.title)}</h2>
        <p class="writing-objective">${escapeHtml(activity.objective)}</p>
      </div>
      <div class="writing-completed-view">
        <div class="writing-completed-banner"><strong>Produção concluída ✓</strong><span>Concluída em ${formatDate(submission.completed_at)}. Compare sua primeira versão com o texto final.</span></div>
        <div class="writing-version-grid">
          <article class="writing-version-card"><h3>Primeira versão</h3><p>${escapeHtml(submission.draft_text)}</p></article>
          <article class="writing-version-card"><h3>Versão final</h3><p>${escapeHtml(submission.final_text)}</p></article>
        </div>
        <div class="writing-version-metrics">
          <span>${submission.word_count} palavras</span>
          <span>${submission.sentence_count} frases</span>
          <span>${submission.unique_words} palavras diferentes</span>
          <span>${Number(submission.lexical_diversity||0).toFixed(0)}% diversidade lexical aprox.</span>
          <span>${submission.connector_count} conectores-alvo</span>
        </div>
        <div class="writing-actions"><button class="writing-action-secondary" type="button" id="writing-go-evolution">Ver minha evolução →</button></div>
      </div>`;
    $('writing-go-evolution')?.addEventListener('click',()=>switchView('evolution'));
  }

  function draftKey(id){return `vae-writing-draft:${id}`;}
  function snapshotKey(id){return `vae-writing-snapshot:${id}`;}

  function renderEditor(activity){
    const editor=$('writing-editor');
    if(!editor)return;
    const localDraft=localStorage.getItem(draftKey(activity.id))||'';
    const savedSnapshot=localStorage.getItem(snapshotKey(activity.id))||'';
    const revisionMode=Boolean(savedSnapshot);
    $('writing-empty-state')?.classList.add('hidden');
    editor.classList.remove('hidden');
    editor.innerHTML=`
      <div class="writing-editor-head">
        <div class="writing-editor-topline"><span class="writing-level-badge">${escapeHtml(activity.level)}</span><span class="writing-genre">${escapeHtml(activity.genre)}</span></div>
        <h2>${escapeHtml(activity.title)}</h2>
        <p class="writing-objective">${escapeHtml(activity.objective)}</p>
        <div class="writing-prompt"><strong>Proposta de escrita</strong>${escapeHtml(activity.prompt)}</div>
      </div>
      <div class="writing-editor-body">
        ${targetHtml(activity)}
        <div class="writing-guidance-grid">
          <article class="writing-guidance"><h3>Foco linguístico</h3>${listHtml(activity.language_focus)}</article>
          <article class="writing-guidance"><h3>Conectores e recursos úteis</h3>${listHtml(activity.connectors)}</article>
          <article class="writing-guidance"><h3>Antes de escrever</h3>${listHtml(activity.tips)}</article>
          <article class="writing-guidance"><h3>Objetivo desta etapa</h3><ul><li>${escapeHtml(activity.objective)}</li><li>Produza o texto em espanhol e revise antes de concluir.</li></ul></article>
        </div>
        <div class="writing-phase"><span class="done">1 · Planeje</span><span class="${revisionMode?'done':'active'}">2 · Escreva</span><span class="${revisionMode?'active':''}">3 · Revise</span></div>
        <textarea class="writing-textarea" id="writing-textarea" lang="es" spellcheck="true" aria-label="Sua produção escrita em espanhol" placeholder="Escribe aquí tu texto en español…">${escapeHtml(localDraft)}</textarea>
        <div class="writing-live-metrics">
          <div class="writing-live-metric"><span>Palavras</span><strong id="writing-live-words">0</strong></div>
          <div class="writing-live-metric"><span>Frases</span><strong id="writing-live-sentences">0</strong></div>
          <div class="writing-live-metric"><span>Vocabulário único</span><strong id="writing-live-unique">0</strong></div>
          <div class="writing-live-metric"><span>Conectores-alvo</span><strong id="writing-live-connectors">0</strong></div>
        </div>
        <p class="writing-word-warning" id="writing-word-warning"></p>
        <section class="writing-review${revisionMode?'':' hidden'}" id="writing-review">
          <h3>Revisão orientada</h3>
          <p>Releia seu texto com atenção. Marque cada item somente depois de verificar sua versão.</p>
          <div class="writing-checklist" id="writing-checklist">
            ${(activity.checklist||[]).map((item,index)=>`<label class="writing-check"><input type="checkbox" value="${index}" /> <span>${escapeHtml(item)}</span></label>`).join('')}
          </div>
        </section>
        <div class="writing-actions">
          <button class="writing-action-secondary" type="button" id="writing-save-local">Salvar rascunho neste dispositivo</button>
          <button class="writing-action-primary${revisionMode?' hidden':''}" type="button" id="writing-start-review">Passar à revisão →</button>
          <button class="writing-action-primary${revisionMode?'':' hidden'}" type="button" id="writing-submit-final">Concluir e salvar produção →</button>
        </div>
        <div class="writing-status info" id="writing-editor-status">Seu texto só será enviado ao seu histórico quando você concluir a etapa de revisão.</div>
      </div>`;

    const textarea=$('writing-textarea');
    let saveTimer=null;
    const refresh=()=>refreshLiveMetrics(activity,textarea?.value||'');
    textarea?.addEventListener('input',()=>{
      refresh();
      clearTimeout(saveTimer);
      saveTimer=setTimeout(()=>localStorage.setItem(draftKey(activity.id),textarea.value),500);
    });
    $('writing-save-local')?.addEventListener('click',()=>{
      localStorage.setItem(draftKey(activity.id),textarea?.value||'');
      setEditorStatus('Rascunho salvo neste dispositivo. Ele ainda não foi concluído.','success');
    });
    $('writing-start-review')?.addEventListener('click',()=>startReview(activity));
    $('writing-submit-final')?.addEventListener('click',()=>submitFinal(activity));
    refresh();
  }

  function refreshLiveMetrics(activity,text){
    const m=metrics(text,activity);
    if($('writing-live-words'))$('writing-live-words').textContent=String(m.word_count);
    if($('writing-live-sentences'))$('writing-live-sentences').textContent=String(m.sentence_count);
    if($('writing-live-unique'))$('writing-live-unique').textContent=String(m.unique_words);
    if($('writing-live-connectors'))$('writing-live-connectors').textContent=String(m.connector_count);
    const warning=$('writing-word-warning');
    if(!warning)return;
    if(m.word_count<activity.min_words){warning.className='writing-word-warning';warning.textContent=`Faltam ${activity.min_words-m.word_count} palavras para alcançar o mínimo desta prática.`;}
    else if(m.word_count>activity.max_words){warning.className='writing-word-warning';warning.textContent=`Você ultrapassou a faixa sugerida em ${m.word_count-activity.max_words} palavras. Revise se é possível ganhar concisão.`;}
    else{warning.className='writing-word-warning ok';warning.textContent=`Faixa de extensão alcançada: ${m.word_count} palavras.`;}
  }

  function setEditorStatus(message,type='info'){
    const node=$('writing-editor-status');
    if(!node)return;
    node.textContent=message;
    node.className=`writing-status ${type}`;
  }

  function startReview(activity){
    const textarea=$('writing-textarea');
    if(!textarea)return;
    const m=metrics(textarea.value,activity);
    if(m.word_count<activity.min_words){setEditorStatus(`Escreva pelo menos ${activity.min_words} palavras antes de iniciar a revisão.`,'error');return;}
    localStorage.setItem(draftKey(activity.id),textarea.value);
    localStorage.setItem(snapshotKey(activity.id),textarea.value);
    renderEditor(activity);
    setEditorStatus('Primeira versão preservada. Agora revise o texto, faça as alterações necessárias e marque o checklist.','info');
  }

  async function submitFinal(activity){
    const textarea=$('writing-textarea');
    const checks=[...document.querySelectorAll('#writing-checklist input[type="checkbox"]')];
    if(!textarea)return;
    const snapshot=localStorage.getItem(snapshotKey(activity.id))||textarea.value;
    const m=metrics(textarea.value,activity);
    if(m.word_count<activity.min_words){setEditorStatus(`A versão final precisa ter pelo menos ${activity.min_words} palavras.`,'error');return;}
    if(checks.some(input=>!input.checked)){setEditorStatus('Conclua todos os itens da revisão orientada antes de salvar a produção.','error');return;}
    const button=$('writing-submit-final');
    if(button){button.disabled=true;button.textContent='Salvando produção…';}
    try{
      const supabase=window.VAEAuth.getClient();
      const selfReview={items:(activity.checklist||[]).map((label,index)=>({label,checked:Boolean(checks[index]?.checked)})),reviewed_at:new Date().toISOString()};
      const payload={
        user_id:state.session.user.id,
        activity_id:activity.id,
        draft_text:snapshot,
        final_text:textarea.value.trim(),
        word_count:m.word_count,
        sentence_count:m.sentence_count,
        unique_words:m.unique_words,
        connector_count:m.connector_count,
        lexical_diversity:m.lexical_diversity,
        self_review:selfReview,
        completed_at:new Date().toISOString(),
        updated_at:new Date().toISOString()
      };
      const {data,error}=await supabase.from('writing_submissions').upsert(payload,{onConflict:'user_id,activity_id'}).select('*').single();
      if(error)throw error;
      state.submissions.set(activity.id,data);
      localStorage.removeItem(draftKey(activity.id));
      localStorage.removeItem(snapshotKey(activity.id));
      try{if(typeof window.vaeTrack==='function')window.vaeTrack('premium_writing_complete',{activity_id:activity.id,level:activity.level,word_count:m.word_count});else if(typeof window.gtag==='function')window.gtag('event','premium_writing_complete',{activity_id:activity.id,level:activity.level,word_count:m.word_count});}catch(_){ }
      renderAll();
      openActivity(activity.id);
    }catch(error){
      console.error('Falha ao salvar produção escrita',error);
      setEditorStatus(window.VAEAuth?.friendlyError?.(error)||'Não foi possível salvar sua produção agora. Tente novamente.','error');
      if(button){button.disabled=false;button.textContent='Concluir e salvar produção →';}
    }
  }

  function openActivity(id){
    const activity=activityById(id);
    if(!activity)return;
    state.activeId=id;
    renderActivityList();
    const submission=state.submissions.get(id);
    if(submission)renderCompleted(activity,submission);else renderEditor(activity);
    if(window.innerWidth<960)$('writing-editor-shell')?.scrollIntoView({behavior:'smooth',block:'start'});
  }

  function renderEvolution(){
    const grid=$('writing-stat-grid');
    const list=$('writing-evolution-list');
    if(!grid||!list)return;
    const submissions=orderedSubmissions();
    if(!submissions.length){
      grid.innerHTML=`<article class="writing-stat"><span>Textos concluídos</span><strong>0</strong><small>Conclua a primeira prática para iniciar sua linha de evolução.</small></article>`;
      list.innerHTML='<div class="writing-empty-list">Sua evolução aparecerá aqui após a primeira produção concluída.</div>';
      return;
    }
    const avgWords=Math.round(submissions.reduce((sum,item)=>sum+Number(item.word_count||0),0)/submissions.length);
    const avgLex=submissions.reduce((sum,item)=>sum+Number(item.lexical_diversity||0),0)/submissions.length;
    const avgConnectors=submissions.reduce((sum,item)=>sum+Number(item.connector_count||0),0)/submissions.length;
    const lastActivity=activityById(submissions[submissions.length-1].activity_id);
    grid.innerHTML=`
      <article class="writing-stat"><span>Textos concluídos</span><strong>${submissions.length}</strong><small>de ${state.activities.length} práticas do percurso</small></article>
      <article class="writing-stat"><span>Nível alcançado</span><strong>${escapeHtml(lastActivity?.level||'—')}</strong><small>nível da produção mais recente</small></article>
      <article class="writing-stat"><span>Extensão média</span><strong>${avgWords}</strong><small>palavras por produção</small></article>
      <article class="writing-stat"><span>Diversidade lexical</span><strong>${avgLex.toFixed(0)}%</strong><small>média aproximada de palavras diferentes</small></article>`;
    list.replaceChildren();
    submissions.forEach(submission=>{
      const activity=activityById(submission.activity_id);if(!activity)return;
      const row=document.createElement('article');row.className='writing-evolution-item';
      row.innerHTML=`<div class="writing-evolution-level">${escapeHtml(activity.level)}</div><div class="writing-evolution-copy"><strong>${escapeHtml(activity.title)}</strong><span>${formatDate(submission.completed_at)} · ${escapeHtml(activity.genre)}</span></div><div class="writing-evolution-value"><span>Palavras</span><strong>${submission.word_count}</strong></div><div class="writing-evolution-value"><span>Diversidade</span><strong>${Number(submission.lexical_diversity||0).toFixed(0)}%</strong></div><div class="writing-evolution-value"><span>Conectores</span><strong>${submission.connector_count}</strong></div>`;
      list.appendChild(row);
    });
  }

  function renderHistory(){
    const list=$('writing-history-list');if(!list)return;
    list.replaceChildren();
    const submissions=orderedSubmissions().reverse();
    if(!submissions.length){list.innerHTML='<div class="writing-empty-list">Nenhuma produção concluída ainda.</div>';return;}
    submissions.forEach(submission=>{
      const activity=activityById(submission.activity_id);if(!activity)return;
      const item=document.createElement('article');item.className='writing-history-item';
      const level=document.createElement('div');level.className='writing-history-level';level.textContent=activity.level;
      const copy=document.createElement('div');copy.className='writing-history-copy';const strong=document.createElement('strong');strong.textContent=activity.title;const span=document.createElement('span');span.textContent=`${formatDate(submission.completed_at)} · ${submission.word_count} palavras · ${activity.genre}`;copy.append(strong,span);
      const button=document.createElement('button');button.type='button';button.textContent='Comparar versões →';button.addEventListener('click',()=>{switchView('practice');openActivity(activity.id);});
      item.append(level,copy,button);list.appendChild(item);
    });
  }

  function renderAll(){
    updateProgress();
    renderLevelRail();
    renderActivityList();
    renderEvolution();
    renderHistory();
  }

  function switchView(view){
    document.querySelectorAll('[data-view-panel]').forEach(panel=>panel.classList.toggle('hidden',panel.dataset.viewPanel!==view));
    document.querySelectorAll('[data-writing-view]').forEach(button=>{const active=button.dataset.writingView===view;button.classList.toggle('active',active);button.setAttribute('aria-selected',String(active));});
    if(view==='evolution')renderEvolution();
    if(view==='history')renderHistory();
  }

  function installTabs(){document.querySelectorAll('[data-writing-view]').forEach(button=>button.addEventListener('click',()=>switchView(button.dataset.writingView)));}

  async function load(){
    if(!window.VAEAuth?.requireSession)return showDenied();
    try{
      state.session=await window.VAEAuth.requireSession();
      if(!state.session?.user)return;
      const supabase=window.VAEAuth.getClient();
      const {data:membership,error:membershipError}=await supabase.rpc('get_membership_summary');
      if(membershipError)throw membershipError;
      if(!(membership?.role==='admin'||membership?.premium_access))return showDenied();
      const [{data:activities,error:activitiesError},{data:submissions,error:submissionsError}]=await Promise.all([
        supabase.from('writing_activities').select('id,sequence,level,title,genre,objective,prompt,min_words,max_words,language_focus,connectors,checklist,tips').eq('active',true).order('sequence'),
        supabase.from('writing_submissions').select('id,activity_id,draft_text,final_text,word_count,sentence_count,unique_words,connector_count,lexical_diversity,self_review,completed_at,updated_at').order('completed_at')
      ]);
      if(activitiesError)throw activitiesError;
      if(submissionsError)throw submissionsError;
      state.activities=activities||[];
      state.submissions=new Map((submissions||[]).map(row=>[row.activity_id,row]));
      showContent();
      installTabs();
      renderAll();
      const nextIndex=firstIncompleteIndex();
      const initial=nextIndex>=0?state.activities[nextIndex]:state.activities[state.activities.length-1];
      if(initial)openActivity(initial.id);
    }catch(error){
      console.error('Falha ao carregar prática de escrita',error);
      const loading=$('writing-loading');
      if(loading){loading.textContent=window.VAEAuth?.friendlyError?.(error)||'Não foi possível carregar a prática de escrita agora.';loading.classList.remove('hidden');}
      $('writing-main')?.setAttribute('aria-busy','false');
    }
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',load,{once:true});else load();
})();
