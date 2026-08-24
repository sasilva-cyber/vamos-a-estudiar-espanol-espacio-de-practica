/* Feedback automatizado por IA para a Práctica de escritura. */
(function(){
  const state={session:null,activities:[],submissions:[],feedbacks:new Map(),inFlight:new Set(),configured:null};
  const $=id=>document.getElementById(id);
  const CRITERIA=[
    ['adequacao','Adequação à proposta'],
    ['coesao','Coesão e coerência'],
    ['gramatica','Gramática'],
    ['vocabulario','Vocabulário'],
    ['ortografia','Ortografia'],
    ['complexidade_sintatica','Complexidade sintática']
  ];

  function escapeHtml(value){return String(value??'').replace(/[&<>\"]/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;'}[char]));}
  function activityById(id){return state.activities.find(item=>item.id===id)||null;}
  function submissionByActivity(id){return state.submissions.find(item=>item.activity_id===id)||null;}
  function feedbackBySubmission(id){return state.feedbacks.get(id)||null;}

  async function refreshData(){
    const supabase=window.VAEAuth?.getClient?.();
    if(!supabase)return;
    const [a,s,f]=await Promise.all([
      supabase.from('writing_activities').select('id,sequence,level,title').eq('active',true).order('sequence'),
      supabase.from('writing_submissions').select('id,activity_id,completed_at').order('completed_at'),
      supabase.from('writing_ai_feedback').select('id,submission_id,overall_score,rubric,summary,strengths,priority_revision,next_goal,corrections,model,generated_at').order('generated_at')
    ]);
    if(!a.error)state.activities=a.data||[];
    if(!s.error)state.submissions=s.data||[];
    if(!f.error)state.feedbacks=new Map((f.data||[]).map(item=>[item.submission_id,item]));
  }

  function activeActivityId(){
    const buttons=[...document.querySelectorAll('#writing-activity-list .writing-activity-button')];
    const active=document.querySelector('#writing-activity-list .writing-activity-button.active');
    if(!active)return null;
    const index=buttons.indexOf(active);
    return index>=0?state.activities[index]?.id||null:null;
  }

  function criterionHtml(key,label,feedback){
    const item=feedback?.rubric?.[key]||{};
    const score=Math.max(0,Math.min(10,Number(item.score)||0));
    return `<article class="writing-ai-criterion"><div class="writing-ai-criterion-top"><strong>${escapeHtml(label)}</strong><b>${score.toFixed(1)}/10</b></div><div class="writing-ai-meter"><span style="width:${score*10}%"></span></div><p>${escapeHtml(item.feedback||'Sem comentário específico.')}</p></article>`;
  }

  function renderFeedbackCard(feedback){
    const strengths=Array.isArray(feedback.strengths)?feedback.strengths:[];
    const corrections=Array.isArray(feedback.corrections)?feedback.corrections:[];
    return `<section class="writing-ai-card" id="writing-ai-card" aria-labelledby="writing-ai-title">
      <div class="writing-ai-head">
        <div class="writing-ai-title-wrap"><p class="writing-ai-kicker">Feedback linguístico automatizado</p><h3 id="writing-ai-title">Análise da sua escrita</h3><p>Avaliação feita em relação ao nível e à proposta desta atividade.</p></div>
        <div class="writing-ai-score"><div><strong>${Number(feedback.overall_score||0).toFixed(1)}</strong><span>média / 10</span></div></div>
      </div>
      <div class="writing-ai-body">
        <p class="writing-ai-summary">${escapeHtml(feedback.summary||'')}</p>
        <div class="writing-ai-rubric">${CRITERIA.map(([key,label])=>criterionHtml(key,label,feedback)).join('')}</div>
        <div class="writing-ai-guidance">
          <article><h4>Pontos fortes</h4>${strengths.length?`<ul>${strengths.map(item=>`<li>${escapeHtml(item)}</li>`).join('')}</ul>`:'<p>Continue observando os aspectos que funcionaram bem nesta produção.</p>'}</article>
          <article class="writing-ai-priority"><h4>Prioridade de revisão</h4><p>${escapeHtml(feedback.priority_revision||'Revise os pontos indicados na rubrica.')}</p></article>
          <article class="writing-ai-next"><h4>Próximo objetivo</h4><p>${escapeHtml(feedback.next_goal||'Aplique o feedback na próxima produção.')}</p></article>
          <article><h4>Como interpretar</h4><p>As notas avaliam este texto dentro do nível e da tarefa. Elas não representam uma certificação global de proficiência.</p></article>
        </div>
        ${corrections.length?`<div class="writing-ai-corrections"><h4>Correções prioritárias</h4>${corrections.map(item=>`<article class="writing-ai-correction"><div class="writing-ai-correction-row"><span class="writing-ai-original">${escapeHtml(item.original)}</span><span class="writing-ai-arrow">→</span><span class="writing-ai-suggestion">${escapeHtml(item.suggestion)}</span></div><p>${escapeHtml(item.explanation)}</p></article>`).join('')}</div>`:''}
        <p class="writing-ai-disclosure"><strong>Análise linguística automatizada por IA.</strong> O texto é processado somente para gerar orientação pedagógica e o feedback não substitui uma correção humana individual.</p>
      </div>
    </section>`;
  }

  function ensureSlot(){
    const completed=document.querySelector('.writing-completed-view');
    if(!completed)return null;
    let slot=$('writing-ai-slot');
    if(slot)return slot;
    slot=document.createElement('div');
    slot.id='writing-ai-slot';
    const metrics=completed.querySelector('.writing-version-metrics');
    if(metrics)metrics.insertAdjacentElement('afterend',slot);else completed.appendChild(slot);
    return slot;
  }

  function showLoading(){const slot=ensureSlot();if(slot)slot.innerHTML='<div class="writing-ai-loading"><strong>Analisando sua escrita…</strong>Estamos avaliando gramática, vocabulário, coesão, adequação à proposta, ortografia e complexidade sintática.</div>';}
  function showUnavailable(){const slot=ensureSlot();if(!slot)return;slot.innerHTML='<div class="writing-ai-unavailable"><strong>Feedback automático temporariamente indisponível</strong>Sua produção foi salva normalmente. Você poderá solicitar a análise novamente quando o recurso estiver disponível.<br><button class="writing-ai-retry" type="button" id="writing-ai-retry">Tentar novamente</button></div>';}

  async function requestFeedback(submission){
    if(!submission||state.inFlight.has(submission.id))return;
    const existing=feedbackBySubmission(submission.id);
    if(existing){renderCurrent(false);return;}
    state.inFlight.add(submission.id);
    showLoading();
    try{
      const supabase=window.VAEAuth.getClient();
      const {data,error}=await supabase.functions.invoke('writing-ai-feedback',{body:{submission_id:submission.id}});
      if(error)throw error;
      if(data?.configured===false){state.configured=false;showUnavailable();return;}
      if(data?.feedback){
        state.configured=true;
        state.feedbacks.set(submission.id,data.feedback);
        renderCurrent(false);
        renderAiEvolution();
        decorateHistory();
      }else showUnavailable();
    }catch(error){
      console.error('Falha ao gerar feedback automatizado de escrita',error);
      showUnavailable();
    }finally{state.inFlight.delete(submission.id);}
  }

  function renderCurrent(autoRequest=true){
    if(!document.querySelector('.writing-completed-view'))return;
    const activityId=activeActivityId();
    const submission=submissionByActivity(activityId);
    if(!submission)return;
    const slot=ensureSlot();
    if(!slot)return;
    const feedback=feedbackBySubmission(submission.id);
    if(feedback){slot.innerHTML=renderFeedbackCard(feedback);return;}
    if(state.configured===false){showUnavailable();return;}
    if(autoRequest)requestFeedback(submission);
    else showUnavailable();
  }

  function averages(feedbacks,key){
    const values=feedbacks.map(item=>Number(item?.rubric?.[key]?.score)).filter(Number.isFinite);
    return values.length?values.reduce((a,b)=>a+b,0)/values.length:0;
  }

  function renderAiEvolution(){
    const panel=$('writing-view-evolution');
    if(!panel)return;
    let box=$('writing-ai-evolution');
    if(!box){box=document.createElement('section');box.id='writing-ai-evolution';box.className='writing-ai-evolution';panel.appendChild(box);}
    const feedbacks=[...state.feedbacks.values()].sort((a,b)=>new Date(a.generated_at)-new Date(b.generated_at));
    if(!feedbacks.length){box.innerHTML='<div class="writing-ai-evolution-head"><div><h3>Evolução pelo feedback de IA</h3><p>As avaliações automatizadas aparecerão aqui depois da primeira produção analisada.</p></div><span class="writing-ai-evolution-badge">IA</span></div>';return;}
    const avg=feedbacks.reduce((sum,item)=>sum+Number(item.overall_score||0),0)/feedbacks.length;
    const grammar=averages(feedbacks,'gramatica');
    const cohesion=averages(feedbacks,'coesao');
    const vocab=averages(feedbacks,'vocabulario');
    const rows=feedbacks.map(feedback=>{
      const submission=state.submissions.find(item=>item.id===feedback.submission_id);
      const activity=activityById(submission?.activity_id);
      return `<div class="writing-ai-trend-row"><span class="writing-ai-trend-level">${escapeHtml(activity?.level||'—')}</span><span class="writing-ai-trend-copy"><strong>${escapeHtml(activity?.title||'Produção escrita')}</strong><span>feedback automatizado por IA</span></span><span class="writing-ai-trend-score">${Number(feedback.overall_score||0).toFixed(1)}/10</span></div>`;
    }).join('');
    box.innerHTML=`<div class="writing-ai-evolution-head"><div><h3>Evolução pelo feedback de IA</h3><p>Compare seu desempenho nas produções já analisadas. As notas são específicas de cada tarefa.</p></div><span class="writing-ai-evolution-badge">${feedbacks.length} ${feedbacks.length===1?'análise':'análises'}</span></div>
      <div class="writing-ai-evolution-stats"><article class="writing-ai-evolution-stat"><span>Média das produções</span><strong>${avg.toFixed(1)}/10</strong></article><article class="writing-ai-evolution-stat"><span>Gramática</span><strong>${grammar.toFixed(1)}/10</strong></article><article class="writing-ai-evolution-stat"><span>Coesão</span><strong>${cohesion.toFixed(1)}/10</strong></article><article class="writing-ai-evolution-stat"><span>Vocabulário</span><strong>${vocab.toFixed(1)}/10</strong></article></div><div class="writing-ai-trend">${rows}</div><p class="writing-ai-disclosure"><strong>Indicadores gerados por IA.</strong> Use a evolução como orientação pedagógica, não como certificação oficial de nível.</p>`;
  }

  function decorateHistory(){
    const items=[...document.querySelectorAll('#writing-history-list .writing-history-item')];
    if(!items.length)return;
    const ordered=[...state.submissions].sort((a,b)=>new Date(b.completed_at)-new Date(a.completed_at));
    items.forEach((item,index)=>{
      item.querySelector('.writing-history-ai-score')?.remove();
      const submission=ordered[index];
      const feedback=submission?feedbackBySubmission(submission.id):null;
      if(!feedback)return;
      const copy=item.querySelector('.writing-history-copy');
      if(!copy)return;
      const badge=document.createElement('span');badge.className='writing-history-ai-score';badge.textContent=`Feedback IA · ${Number(feedback.overall_score||0).toFixed(1)}/10`;copy.appendChild(badge);
    });
  }

  async function refreshAfterSubmit(){
    const delays=[900,1800,3200,5200];
    delays.forEach(delay=>window.setTimeout(async()=>{await refreshData();renderCurrent(true);renderAiEvolution();decorateHistory();},delay));
  }

  function installEvents(){
    document.addEventListener('click',event=>{
      const activityButton=event.target.closest('.writing-activity-button');
      if(activityButton&&!activityButton.disabled)window.setTimeout(()=>renderCurrent(true),80);
      if(event.target.closest('#writing-submit-final'))refreshAfterSubmit();
      if(event.target.closest('[data-writing-view="evolution"]'))window.setTimeout(renderAiEvolution,80);
      if(event.target.closest('[data-writing-view="history"]'))window.setTimeout(decorateHistory,80);
      if(event.target.closest('#writing-ai-retry')){
        const activityId=activeActivityId();
        const submission=submissionByActivity(activityId);
        state.configured=null;
        if(submission)requestFeedback(submission);
      }
    });
  }

  async function boot(){
    try{
      state.session=await window.VAEAuth?.getSession?.();
      if(!state.session?.user)return;
      installEvents();
      await refreshData();
      window.setTimeout(()=>{renderCurrent(true);renderAiEvolution();decorateHistory();},900);
    }catch(error){console.error('Falha ao iniciar feedback de escrita por IA',error);}
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
