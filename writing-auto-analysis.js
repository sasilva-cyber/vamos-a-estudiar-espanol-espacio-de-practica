/* Análise automática local da escrita — sem IA externa e sem API paga. */
(function(){
  const state={session:null,activities:[],submissions:[],analyses:new Map()};
  const $=id=>document.getElementById(id);
  const LEVEL_ORDER={A1:1,A2:2,B1:3,B2:4,C1:5,C2:6};
  const STOPWORDS=new Set('a al algo algunas algunos ante antes como con contra cual cuando de del desde donde dos el ella ellas ellos en entre era es esa ese esta este esto fue ha hasta hay la las le les lo los más me mi mis muy no nos o para pero por porque que se si sin sobre su sus te tu tus un una uno unas unos y ya yo'.split(' '));
  const PORTUGUESE_MARKERS=['não','também','você','vocês','muito','muita','muitos','muitas','estou','tenho','minha','meu','meus','minhas','agora','então','coisa','pra','legal','sempre'];
  const GENERIC_CONNECTORS=['además','también','pero','sin embargo','aunque','por eso','por lo tanto','por consiguiente','en cambio','entonces','después','luego','finalmente','primero','en primer lugar','por otra parte','por un lado','por otro lado','en conclusión','en definitiva','así que','de ahí que','no obstante','mientras','cuando','porque','ya que','debido a','a pesar de','si bien','en suma'];
  const SUBORDINATORS=['aunque','cuando','mientras','porque','ya que','para que','a pesar de que','si bien','de modo que','de manera que','puesto que','siempre que','aun cuando','en la medida en que','de ahí que','como si'];
  const CRITERIA=[
    ['adequacao','Adequação à tarefa'],
    ['coesao','Coesão e conectores'],
    ['variedade_lexical','Variedade lexical'],
    ['organizacao','Organização textual'],
    ['revisao_formal','Revisão formal'],
    ['complexidade_discursiva','Complexidade adequada ao nível']
  ];

  function escapeHtml(value){return String(value??'').replace(/[&<>\"]/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;'}[char]));}
  function normalize(value){return String(value||'').toLocaleLowerCase('es').normalize('NFC');}
  function words(text){return normalize(text).match(/[a-záéíóúüñ]+/gi)||[];}
  function sentences(text){return String(text||'').split(/[.!?]+/).map(v=>v.trim()).filter(Boolean);}
  function paragraphs(text){return String(text||'').split(/\n\s*\n|\n/).map(v=>v.trim()).filter(Boolean);}
  function activityById(id){return state.activities.find(item=>item.id===id)||null;}
  function submissionByActivity(id){return state.submissions.find(item=>item.activity_id===id)||null;}
  function analysisBySubmission(id){return state.analyses.get(id)||null;}
  function clamp(value,min=0,max=10){return Math.max(min,Math.min(max,Number(value)||0));}
  function round1(value){return Math.round((Number(value)||0)*10)/10;}

  function phraseCount(text,phrases){
    const lower=` ${normalize(text).replace(/\s+/g,' ')} `;
    return phrases.reduce((count,phrase)=>count+(lower.includes(` ${normalize(phrase)} `)?1:0),0);
  }

  function connectorList(activity){return [...new Set([...(activity?.connectors||[]),...GENERIC_CONNECTORS].map(normalize))];}

  function repeatedWords(text){
    const counts=new Map();
    for(const word of words(text)){
      if(word.length<4||STOPWORDS.has(word))continue;
      counts.set(word,(counts.get(word)||0)+1);
    }
    return [...counts.entries()].filter(([,count])=>count>=3).sort((a,b)=>b[1]-a[1]).slice(0,5);
  }

  function highConfidencePortuguese(text){
    const set=new Set(words(text));
    return PORTUGUESE_MARKERS.filter(word=>set.has(word));
  }

  function revisionChange(draft,finalText){
    const a=words(draft); const b=words(finalText);
    if(!a.length||!b.length)return 0;
    const sa=new Set(a); const sb=new Set(b);
    const intersection=[...sa].filter(item=>sb.has(item)).length;
    const union=new Set([...sa,...sb]).size||1;
    return round1((1-intersection/union)*100);
  }

  function rangeScore(count,min,max){
    if(count>=min&&count<=max)return 9.5;
    if(count<min){const ratio=count/min;return clamp(3+ratio*6.5);}
    const over=(count-max)/Math.max(max,1);
    return clamp(9.5-over*12,4.5,9.5);
  }

  function genreSignals(activity,text){
    const genre=normalize(activity.genre);
    const lower=normalize(text);
    let score=7.5;
    const paras=paragraphs(text).length;
    const conn=phraseCount(text,connectorList(activity));
    if(/correo/.test(genre)){
      if(/\b(hola|querid[oa]|estimad[oa])\b/.test(lower))score+=.7;
      if(text.includes('?')||text.includes('¿'))score+=.6;
      if(/\b(saludos|un abrazo|hasta pronto|besos)\b/.test(lower))score+=.7;
      else score-=.5;
    }else if(/carta formal/.test(genre)){
      if(/por medio de la presente|estimad[oa]|a quien corresponda/.test(lower))score+=.8;
      if(/agradecería|solicito|quisiera|atentamente/.test(lower))score+=.8;
      if(paras>=3)score+=.5;
    }else if(/argument|ensayo|opinión|artículo|reseña/.test(genre)){
      if(paras>=3)score+=.8; else if(paras===1)score-=1;
      if(conn>=3)score+=.8; else if(conn===0)score-=1;
    }else if(/relato|rutina|presentación/.test(genre)){
      if(sentences(text).length>=4)score+=.5;
      if(conn>=2)score+=.4;
    }
    return clamp(score);
  }

  function analyze(submission,activity){
    const text=submission.final_text||'';
    const tokenList=words(text);
    const sentenceList=sentences(text);
    const paragraphList=paragraphs(text);
    const unique=new Set(tokenList);
    const wordCount=tokenList.length;
    const sentenceCount=Math.max(1,sentenceList.length);
    const paragraphCount=Math.max(1,paragraphList.length);
    const avgSentence=wordCount/sentenceCount;
    const guiraud=wordCount?unique.size/Math.sqrt(wordCount):0;
    const repeats=repeatedWords(text);
    const ptMarkers=highConfidencePortuguese(text);
    const targetConnectors=[...new Set((activity.connectors||[]).map(normalize))];
    const usedTarget=targetConnectors.filter(item=>` ${normalize(text).replace(/\s+/g,' ')} `.includes(` ${item} `));
    const allConnectors=connectorList(activity).filter(item=>` ${normalize(text).replace(/\s+/g,' ')} `.includes(` ${item} `));
    const subordinateCount=phraseCount(text,SUBORDINATORS);
    const longSentences=sentenceList.filter(s=>words(s).length>34).length;
    const veryShort=sentenceList.filter(s=>words(s).length>0&&words(s).length<4).length;
    const doubleSpaces=(text.match(/ {2,}/g)||[]).length;
    const punctuationSpaces=(text.match(/\s+[,.!?;:]/g)||[]).length;
    const revisionPct=revisionChange(submission.draft_text,submission.final_text);
    const level=LEVEL_ORDER[activity.level]||1;

    const adequacao=round1((rangeScore(wordCount,activity.min_words,activity.max_words)*.62)+(genreSignals(activity,text)*.38));

    const connectorTarget=Math.max(1,Math.min(7,level+1));
    let coesao=5.2+Math.min(3,allConnectors.length/connectorTarget*3);
    if(paragraphCount>=Math.min(3,Math.ceil(level/2)+1))coesao+=.7;
    if(longSentences>Math.max(1,sentenceCount*.3))coesao-=.8;
    if(allConnectors.length===0&&level>=3)coesao-=1;
    coesao=round1(clamp(coesao));

    const targetGuiraud={1:5,2:5.4,3:5.8,4:6.1,5:6.4,6:6.7}[level];
    let variedade=6.2+(guiraud-targetGuiraud)*1.25;
    if(repeats.length===0)variedade+=.6;
    else variedade-=Math.min(1.5,repeats.reduce((s,[,c])=>s+Math.max(0,c-3),0)*.12);
    variedade=round1(clamp(variedade));

    const idealMin={1:6,2:7,3:9,4:10,5:11,6:12}[level];
    const idealMax={1:15,2:17,3:20,4:23,5:27,6:29}[level];
    let organizacao=8.4;
    if(avgSentence<idealMin)organizacao-=Math.min(2,(idealMin-avgSentence)*.35);
    if(avgSentence>idealMax)organizacao-=Math.min(2.5,(avgSentence-idealMax)*.22);
    if(paragraphCount===1&&wordCount>140)organizacao-=1.2;
    if(longSentences)organizacao-=Math.min(1.2,longSentences*.35);
    if(veryShort>2)organizacao-=.5;
    organizacao=round1(clamp(organizacao));

    let revisao=9.4-(doubleSpaces*.25)-(punctuationSpaces*.45)-(ptMarkers.length*.85);
    if(!/[.!?]\s*$/.test(text.trim()))revisao-=.4;
    if(text.trim()&&text.trim()[0]===text.trim()[0].toLocaleLowerCase('es'))revisao-=.35;
    revisao=round1(clamp(revisao));

    const subTarget=Math.max(0,level-2);
    let complexidade=6.2;
    if(level<=2){
      complexidade+=Math.min(2.5,allConnectors.length*.6);
      if(avgSentence>=7)complexidade+=.6;
    }else{
      complexidade+=Math.min(2.1,subordinateCount/Math.max(1,subTarget)*1.6);
      complexidade+=Math.min(1.2,allConnectors.length/connectorTarget*1.2);
      if(avgSentence>=idealMin)complexidade+=.4;
    }
    complexidade=round1(clamp(complexidade));

    const rubric={
      adequacao:{score:adequacao,feedback:wordCount<activity.min_words?`O texto ainda está abaixo da faixa proposta de ${activity.min_words}–${activity.max_words} palavras.`:wordCount>activity.max_words?`O texto supera a faixa sugerida; vale revisar a concisão sem perder informações essenciais.`:`A extensão está adequada à proposta e os sinais estruturais do gênero foram considerados.`},
      coesao:{score:coesao,feedback:allConnectors.length?`Foram reconhecidos ${allConnectors.length} conectores ou marcadores discursivos diferentes. Observe se eles ligam as ideias com naturalidade.`:`Poucos conectores foram reconhecidos. Experimente explicitar melhor as relações entre as ideias.`},
      variedade_lexical:{score:variedade,feedback:repeats.length?`Há repetição perceptível de algumas palavras de conteúdo. Tente variar escolhas lexicais onde fizer sentido.`:`A distribuição lexical apresenta boa variedade para a extensão do texto.`},
      organizacao:{score:organizacao,feedback:`O texto tem ${paragraphCount} ${paragraphCount===1?'parágrafo':'parágrafos'} e média de ${avgSentence.toFixed(1)} palavras por frase. Use esses dados para revisar ritmo e divisão das ideias.`},
      revisao_formal:{score:revisao,feedback:ptMarkers.length?`Foram encontrados possíveis sinais de interferência do português (${ptMarkers.slice(0,3).join(', ')}). Revise esses trechos antes de considerar o texto final.`:`Não foram encontrados sinais fortes de interferência do português nas verificações automáticas básicas.`},
      complexidade_discursiva:{score:complexidade,feedback:level>=3?`Foram reconhecidos ${subordinateCount} marcadores de subordinação e ${allConnectors.length} conectores. A análise compara esses recursos com a exigência esperada para ${activity.level}.`:`A análise considera variedade de conectores e construção frasal adequadas ao nível ${activity.level}.`}
    };

    const scores=Object.values(rubric).map(item=>item.score);
    const overall=round1(scores.reduce((a,b)=>a+b,0)/scores.length);
    const sorted=CRITERIA.map(([key,label])=>({key,label,score:rubric[key].score})).sort((a,b)=>b.score-a.score);
    const strengths=sorted.slice(0,2).map(item=>`${item.label}: ${rubric[item.key].feedback}`);
    const weakest=sorted[sorted.length-1];
    const advice={
      adequacao:'Releia a proposta e verifique se todos os elementos pedidos aparecem com clareza e dentro da extensão sugerida.',
      coesao:'Na próxima revisão, marque os conectores e verifique se cada um explicita corretamente a relação entre as ideias.',
      variedade_lexical:'Escolha três palavras repetidas e procure alternativas adequadas ao contexto antes de finalizar o próximo texto.',
      organizacao:'Revise a divisão em parágrafos e alterne frases mais curtas com frases mais desenvolvidas.',
      revisao_formal:'Faça uma última leitura exclusivamente para pontuação, espaços, maiúsculas e possíveis interferências do português.',
      complexidade_discursiva:level>=4?'Inclua pelo menos duas relações mais complexas de causa, concessão, contraste ou consequência sem alongar excessivamente as frases.':'Amplie gradualmente os conectores e combine frases simples com algumas estruturas mais desenvolvidas.'
    };

    const observations=[];
    if(usedTarget.length)observations.push(`Conectores sugeridos utilizados: ${usedTarget.join(', ')}.`);
    const missingTarget=targetConnectors.filter(item=>!usedTarget.includes(item));
    if(missingTarget.length)observations.push(`Conectores da atividade ainda não reconhecidos: ${missingTarget.slice(0,4).join(', ')}.`);
    if(repeats.length)observations.push(`Palavras mais repetidas: ${repeats.slice(0,3).map(([w,c])=>`${w} (${c}×)`).join(', ')}.`);
    if(ptMarkers.length)observations.push(`Possíveis interferências do português para revisar: ${ptMarkers.join(', ')}.`);
    if(longSentences)observations.push(`${longSentences} ${longSentences===1?'frase tem':'frases têm'} mais de 34 palavras; verifique se pode dividir sem perder sentido.`);
    observations.push(`Mudança aproximada entre a primeira versão e a final: ${revisionPct.toFixed(0)}%.`);

    const summary=overall>=8.5
      ?`A produção apresenta indicadores formais e discursivos fortes para uma atividade ${activity.level}. Use os pontos abaixo para fazer um refinamento final.`
      :overall>=7
      ?`A produção atende bem aos principais parâmetros automáticos desta atividade ${activity.level}, com alguns aspectos claros para desenvolver na próxima escrita.`
      :overall>=5.5
      ?`A produção cumpre parte dos parâmetros esperados para ${activity.level}. A prioridade indicada abaixo deve orientar sua próxima revisão.`
      :`Os indicadores sugerem que este texto merece uma nova revisão estrutural antes de avançar. Concentre-se primeiro na prioridade destacada.`;

    return {
      submission_id:submission.id,
      user_id:state.session.user.id,
      overall_score:overall,
      rubric,
      summary,
      strengths,
      priority_revision:`${weakest.label}: ${advice[weakest.key]}`,
      next_goal:advice[weakest.key],
      observations,
      diagnostics:{word_count:wordCount,sentence_count:sentenceCount,paragraph_count:paragraphCount,avg_sentence_words:round1(avgSentence),guiraud:round1(guiraud),recognized_connectors:allConnectors,subordination_markers:subordinateCount,portuguese_markers:ptMarkers,repeated_words:repeats,revision_change_pct:revisionPct,analysis_version:1},
      generated_at:new Date().toISOString(),
      updated_at:new Date().toISOString()
    };
  }

  async function refreshData(){
    const supabase=window.VAEAuth?.getClient?.(); if(!supabase)return;
    const [a,s,f]=await Promise.all([
      supabase.from('writing_activities').select('id,sequence,level,title,genre,min_words,max_words,connectors').eq('active',true).order('sequence'),
      supabase.from('writing_submissions').select('id,activity_id,draft_text,final_text,word_count,sentence_count,unique_words,connector_count,lexical_diversity,completed_at').order('completed_at'),
      supabase.from('writing_auto_feedback').select('id,submission_id,overall_score,rubric,summary,strengths,priority_revision,next_goal,observations,diagnostics,generated_at').order('generated_at')
    ]);
    if(a.error)throw a.error; if(s.error)throw s.error; if(f.error)throw f.error;
    state.activities=a.data||[]; state.submissions=s.data||[]; state.analyses=new Map((f.data||[]).map(item=>[item.submission_id,item]));
  }

  async function ensureAnalyses(){
    const missing=[];
    for(const submission of state.submissions){
      if(state.analyses.has(submission.id))continue;
      const activity=activityById(submission.activity_id); if(!activity)continue;
      missing.push(analyze(submission,activity));
    }
    if(!missing.length)return;
    const supabase=window.VAEAuth.getClient();
    const {data,error}=await supabase.from('writing_auto_feedback').upsert(missing,{onConflict:'submission_id'}).select('id,submission_id,overall_score,rubric,summary,strengths,priority_revision,next_goal,observations,diagnostics,generated_at');
    if(error)throw error;
    (data||[]).forEach(item=>state.analyses.set(item.submission_id,item));
  }

  function activeActivityId(){
    const buttons=[...document.querySelectorAll('#writing-activity-list .writing-activity-button')];
    const active=document.querySelector('#writing-activity-list .writing-activity-button.active');
    if(!active)return null;
    const index=buttons.indexOf(active);
    return index>=0?state.activities[index]?.id||null:null;
  }

  function criterionHtml(key,label,analysis){
    const item=analysis?.rubric?.[key]||{}; const score=clamp(item.score);
    return `<article class="writing-auto-criterion"><div class="writing-auto-criterion-top"><strong>${escapeHtml(label)}</strong><b>${score.toFixed(1)}/10</b></div><div class="writing-auto-meter"><span style="width:${score*10}%"></span></div><p>${escapeHtml(item.feedback||'Sem indicador disponível.')}</p></article>`;
  }

  function renderCard(analysis){
    const strengths=Array.isArray(analysis.strengths)?analysis.strengths:[];
    const observations=Array.isArray(analysis.observations)?analysis.observations:[];
    return `<section class="writing-auto-card" aria-labelledby="writing-auto-title">
      <div class="writing-auto-head"><div><p class="writing-auto-kicker">Análise automática da escrita</p><h3 id="writing-auto-title">Indicadores desta produção</h3><p>Leitura estatística e baseada em regras, sem uso de IA generativa ou API externa.</p></div><div class="writing-auto-score"><strong>${Number(analysis.overall_score||0).toFixed(1)}</strong><span>índice / 10</span></div></div>
      <div class="writing-auto-body"><p class="writing-auto-summary">${escapeHtml(analysis.summary||'')}</p>
      <div class="writing-auto-rubric">${CRITERIA.map(([key,label])=>criterionHtml(key,label,analysis)).join('')}</div>
      <div class="writing-auto-guidance"><article><h4>Pontos fortes</h4><ul>${strengths.map(item=>`<li>${escapeHtml(item)}</li>`).join('')}</ul></article><article class="priority"><h4>Prioridade de revisão</h4><p>${escapeHtml(analysis.priority_revision||'')}</p></article><article class="next"><h4>Próximo objetivo</h4><p>${escapeHtml(analysis.next_goal||'')}</p></article><article><h4>Como interpretar</h4><p>O índice descreve características mensuráveis deste texto. Ele não corrige todos os erros gramaticais e não certifica proficiência.</p></article></div>
      ${observations.length?`<div class="writing-auto-observations"><h4>Sinais para observar na próxima revisão</h4>${observations.map(item=>`<p>• ${escapeHtml(item)}</p>`).join('')}</div>`:''}
      <p class="writing-auto-disclosure"><strong>Análise local e automática.</strong> Nenhum serviço de IA pago é chamado. Os resultados são indicativos e complementam, mas não substituem, uma correção linguística humana.</p></div></section>`;
  }

  function ensureSlot(){
    const completed=document.querySelector('.writing-completed-view'); if(!completed)return null;
    let slot=$('writing-auto-slot'); if(slot)return slot;
    slot=document.createElement('div'); slot.id='writing-auto-slot';
    const metrics=completed.querySelector('.writing-version-metrics');
    if(metrics)metrics.insertAdjacentElement('afterend',slot); else completed.appendChild(slot);
    return slot;
  }

  function renderCurrent(){
    if(!document.querySelector('.writing-completed-view'))return;
    const activityId=activeActivityId(); const submission=submissionByActivity(activityId); if(!submission)return;
    const slot=ensureSlot(); if(!slot)return;
    const analysis=analysisBySubmission(submission.id);
    slot.innerHTML=analysis?renderCard(analysis):'<div class="writing-auto-loading"><strong>Preparando indicadores…</strong>A análise automática será gerada assim que a produção estiver disponível no histórico.</div>';
  }

  function average(analyses,key){
    const values=analyses.map(item=>Number(item?.rubric?.[key]?.score)).filter(Number.isFinite);
    return values.length?values.reduce((a,b)=>a+b,0)/values.length:0;
  }

  function renderEvolution(){
    const panel=$('writing-view-evolution'); if(!panel)return;
    let box=$('writing-auto-evolution');
    if(!box){box=document.createElement('section');box.id='writing-auto-evolution';box.className='writing-auto-evolution';panel.appendChild(box);}
    const analyses=[...state.analyses.values()].sort((a,b)=>new Date(a.generated_at)-new Date(b.generated_at));
    if(!analyses.length){box.innerHTML='<div class="writing-auto-evolution-head"><div><h3>Evolução pela análise automática</h3><p>Os indicadores aparecerão aqui após a primeira produção concluída.</p></div><span>Automático</span></div>';return;}
    const overall=analyses.reduce((s,i)=>s+Number(i.overall_score||0),0)/analyses.length;
    const coesao=average(analyses,'coesao'); const lexical=average(analyses,'variedade_lexical'); const org=average(analyses,'organizacao');
    const rows=analyses.map(item=>{const submission=state.submissions.find(s=>s.id===item.submission_id);const activity=activityById(submission?.activity_id);return `<div class="writing-auto-trend-row"><span class="writing-auto-trend-level">${escapeHtml(activity?.level||'—')}</span><span class="writing-auto-trend-copy"><strong>${escapeHtml(activity?.title||'Produção escrita')}</strong><span>análise automática local</span></span><span class="writing-auto-trend-score">${Number(item.overall_score||0).toFixed(1)}/10</span></div>`;}).join('');
    box.innerHTML=`<div class="writing-auto-evolution-head"><div><h3>Evolução pela análise automática</h3><p>Compare indicadores formais e discursivos entre as suas produções.</p></div><span>${analyses.length} ${analyses.length===1?'análise':'análises'}</span></div><div class="writing-auto-evolution-stats"><article><span>Índice médio</span><strong>${overall.toFixed(1)}/10</strong></article><article><span>Coesão</span><strong>${coesao.toFixed(1)}/10</strong></article><article><span>Variedade lexical</span><strong>${lexical.toFixed(1)}/10</strong></article><article><span>Organização</span><strong>${org.toFixed(1)}/10</strong></article></div><div class="writing-auto-trend">${rows}</div><p class="writing-auto-disclosure"><strong>Indicadores automáticos, não uma nota oficial.</strong> Use-os para observar tendências e orientar a revisão.</p>`;
  }

  function decorateHistory(){
    const items=[...document.querySelectorAll('#writing-history-list .writing-history-item')]; if(!items.length)return;
    const ordered=[...state.submissions].sort((a,b)=>new Date(b.completed_at)-new Date(a.completed_at));
    items.forEach((item,index)=>{
      item.querySelector('.writing-history-auto-score')?.remove();
      const analysis=ordered[index]?analysisBySubmission(ordered[index].id):null; if(!analysis)return;
      const copy=item.querySelector('.writing-history-copy'); if(!copy)return;
      const badge=document.createElement('span');badge.className='writing-history-auto-score';badge.textContent=`Análise automática · ${Number(analysis.overall_score||0).toFixed(1)}/10`;copy.appendChild(badge);
    });
  }

  async function refreshAfterSubmit(){
    try{await new Promise(resolve=>setTimeout(resolve,1200));await refreshData();await ensureAnalyses();renderCurrent();renderEvolution();decorateHistory();}
    catch(error){console.error('Falha ao atualizar análise automática',error);}
  }

  function installEvents(){
    document.addEventListener('click',event=>{
      const button=event.target.closest('.writing-activity-button'); if(button&&!button.disabled)setTimeout(renderCurrent,80);
      if(event.target.closest('#writing-submit-final'))refreshAfterSubmit();
      if(event.target.closest('[data-writing-view="evolution"]'))setTimeout(renderEvolution,80);
      if(event.target.closest('[data-writing-view="history"]'))setTimeout(decorateHistory,80);
    });
  }

  async function boot(){
    try{
      state.session=await window.VAEAuth?.getSession?.(); if(!state.session?.user)return;
      installEvents(); await refreshData(); await ensureAnalyses();
      setTimeout(()=>{renderCurrent();renderEvolution();decorateHistory();},500);
    }catch(error){console.error('Falha ao iniciar análise automática da escrita',error);}
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
