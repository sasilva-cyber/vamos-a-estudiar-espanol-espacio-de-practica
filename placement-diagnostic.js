/* Diagnóstico Premium A1–C2: escuta, leitura, escrita e fala. */
(function(){
  const $=id=>document.getElementById(id);
  const LEVELS=['A1','A2','B1','B2','C1','C2'];
  const LEVEL_INFO={
    A1:{title:'A1 · Iniciante',description:'Você consegue lidar com elementos muito frequentes e situações comunicativas simples quando a linguagem é clara e previsível.'},
    A2:{title:'A2 · Básico',description:'Você já compreende e produz espanhol em situações cotidianas previsíveis, ainda com limites de autonomia e precisão.'},
    B1:{title:'B1 · Intermediário',description:'Você apresenta autonomia funcional para compreender e produzir espanhol em muitos contextos cotidianos e consegue desenvolver ideias com alguma continuidade.'},
    B2:{title:'B2 · Intermediário avançado',description:'Você lida com textos e discursos mais densos, sustenta opiniões e demonstra boa independência comunicativa.'},
    C1:{title:'C1 · Avançado',description:'Você demonstra domínio amplo e flexível, com capacidade de compreender nuances e organizar produção mais complexa e precisa.'},
    C2:{title:'C2 · Proficiência elevada',description:'Seu desempenho indica domínio muito elevado das habilidades avaliadas, com forte capacidade de lidar com informação complexa e relações discursivas sutis.'}
  };
  const WRITING_TASKS={
    A1:{min:60,max:90,prompt:'Preséntate a una persona que todavía no te conoce. Explica quién eres, dónde vives, a qué te dedicas, qué te gusta hacer y por qué estudias español.',focus:['presente','información personal','frases claras']},
    A2:{min:90,max:130,prompt:'Cuenta una experiencia reciente que recuerdes bien. Explica dónde estabas, qué ocurrió, con quién estabas y cómo te sentiste al final.',focus:['pasado','secuencia temporal','descripción']},
    B1:{min:130,max:180,prompt:'¿Es mejor estudiar una lengua solo o con otras personas? Expón tu opinión, presenta al menos dos razones y menciona una ventaja de la opción contraria.',focus:['opinión','justificación','contraste']},
    B2:{min:170,max:230,prompt:'¿La tecnología mejora realmente el aprendizaje o también puede dificultarlo? Escribe un texto con una postura clara, argumentos, un contraargumento y una conclusión.',focus:['argumentación','concesión','cohesión']},
    C1:{min:220,max:300,prompt:'El turismo genera actividad económica, pero también puede aumentar precios y transformar los barrios. ¿Cómo debería gestionarse el turismo masivo? Defiende una postura matizada y propone criterios concretos.',focus:['matización','argumentación avanzada','registro formal']},
    C2:{min:280,max:380,prompt:'La inteligencia artificial puede ampliar el acceso a herramientas educativas, pero también plantea problemas de autoría, dependencia y evaluación. Escribe un ensayo crítico que examine las tensiones del tema y proponga criterios para un uso responsable.',focus:['síntesis','contraargumentación','precisión conceptual']}
  };
  const SPEAKING_TASKS={
    A1:{seconds:'45–60 s',prompt:'Preséntate en español. Habla de dónde vives, qué haces normalmente y una actividad que te gusta.'},
    A2:{seconds:'60–75 s',prompt:'Cuenta una experiencia reciente: un paseo, una reunión, una clase o un día especial. Explica qué pasó y cómo te sentiste.'},
    B1:{seconds:'75–90 s',prompt:'Explica si prefieres estudiar solo o en grupo. Da al menos dos razones y un ejemplo personal.'},
    B2:{seconds:'90–120 s',prompt:'Expón tu opinión sobre el uso de redes sociales en las relaciones personales. Presenta ventajas, riesgos y una conclusión.'},
    C1:{seconds:'120–150 s',prompt:'Analiza una transformación de tu ciudad, trabajo o forma de estudiar. Explica beneficios, problemas y qué medidas propondrías.'},
    C2:{seconds:'150–180 s',prompt:'Reflexiona sobre la relación entre tecnología, autonomía y responsabilidad. Defiende una postura matizada e incorpora al menos un contraargumento.'}
  };
  const SPEAKING_RATINGS=[
    ['fluency','Fluidez','Consegui manter a fala sem pausas excessivamente longas.'],
    ['range','Recursos linguísticos','Consegui variar vocabulário e estruturas para explicar minhas ideias.'],
    ['interaction','Espontaneidade','Consegui formular ideias sem depender de frases previamente decoradas.'],
    ['pronunciation','Pronúncia percebida','Ao me ouvir, considero que minha fala ficou compreensível.'],
    ['confidence','Autonomia','Consegui desenvolver a resposta e concluir a ideia principal.']
  ];
  const SKILL_META={
    listening:{icon:'🎧',name:'Escuta',note:'compreensão auditiva objetiva'},
    reading:{icon:'📖',name:'Leitura',note:'compreensão leitora objetiva'},
    writing:{icon:'✍️',name:'Escrita',note:'análise automática da produção'},
    speaking:{icon:'🎙️',name:'Fala',note:'autoestimativa orientada'}
  };

  const state={
    session:null,questions:[],bySkill:{listening:[],reading:[]},answers:{},plays:{},phase:'intro',index:0,startedAt:0,
    preliminary:null,writingTarget:null,writingText:'',speakingSelf:{},recordingBlob:null,recordingUrl:null,submitting:false
  };
  let mediaRecorder=null,mediaStream=null,recordChunks=[],recordTimer=null,recordStartedAt=0;
  let storageKey='vae-four-skills-placement-v2';

  function track(name,params={}){try{if(typeof window.vaeTrack==='function')window.vaeTrack(name,params);else if(typeof window.gtag==='function')window.gtag('event',name,params);}catch(_){}}
  function formatDate(value){const d=new Date(value||'');return Number.isNaN(d.getTime())?'':new Intl.DateTimeFormat('pt-BR',{day:'2-digit',month:'2-digit',year:'numeric'}).format(d);}
  function rank(level){return Math.max(0,LEVELS.indexOf(level));}
  function words(text){return (String(text||'').toLocaleLowerCase('es').match(/[a-záéíóúüñ]+/gi)||[]);}
  function writingMetrics(text){
    const list=words(text),unique=new Set(list),sentences=String(text||'').split(/[.!?]+/).map(v=>v.trim()).filter(Boolean).length;
    const lower=String(text||'').toLocaleLowerCase('es');
    const connectorList=['y','pero','porque','también','además','entonces','después','aunque','sin embargo','por eso','por lo tanto','por una parte','por otro lado','en cambio','no obstante','por consiguiente','en conclusión','si bien','de ahí que','aun cuando','en definitiva'];
    const connectors=connectorList.filter(item=>new RegExp(`(^|\\W)${item.replace(/ /g,'\\s+')}($|\\W)`,'i').test(lower));
    return {wordCount:list.length,unique:unique.size,sentences,connectors:connectors.length};
  }
  function save(){
    try{sessionStorage.setItem(storageKey,JSON.stringify({answers:state.answers,plays:state.plays,phase:state.phase,index:state.index,startedAt:state.startedAt,preliminary:state.preliminary,writingTarget:state.writingTarget,writingText:state.writingText,speakingSelf:state.speakingSelf}));}catch(_){ }
  }
  function restore(){
    try{
      const raw=sessionStorage.getItem(storageKey);if(!raw)return false;const s=JSON.parse(raw);if(!s||typeof s.answers!=='object')return false;
      state.answers=s.answers||{};state.plays=s.plays||{};state.phase=['listening','reading','writing','speaking'].includes(s.phase)?s.phase:'listening';state.index=Math.max(0,Number(s.index)||0);state.startedAt=Number(s.startedAt)||Date.now();state.preliminary=s.preliminary||null;state.writingTarget=s.writingTarget||null;state.writingText=s.writingText||'';state.speakingSelf=s.speakingSelf||{};return Object.keys(state.answers).length>0||Boolean(state.writingText);
    }catch(_){return false;}
  }
  function clearSaved(){try{sessionStorage.removeItem(storageKey);}catch(_){}}
  function stopSpeech(){try{window.speechSynthesis?.cancel();}catch(_){}}
  function stopRecorderTracks(){if(mediaStream){mediaStream.getTracks().forEach(t=>t.stop());mediaStream=null;}if(recordTimer){clearInterval(recordTimer);recordTimer=null;}}
  function showOnly(id){['diagnostic-intro','diagnostic-flow','diagnostic-result'].forEach(key=>$(key)?.classList.toggle('hidden',key!==id));}

  async function loadPrevious(){
    try{
      const supabase=window.VAEAuth.getClient();
      const {data,error}=await supabase.from('placement_diagnostic_attempts').select('estimated_level,listening_level,reading_level,writing_level,speaking_level,completed_at').order('completed_at',{ascending:false}).limit(1).maybeSingle();
      if(error)throw error;if(!data)return;
      const node=$('diagnostic-last');node.textContent=`Seu último diagnóstico: nível geral ${data.estimated_level} · Escuta ${data.listening_level} · Leitura ${data.reading_level} · Escrita ${data.writing_level} · Fala ${data.speaking_level} (autoestimada), em ${formatDate(data.completed_at)}.`;node.classList.add('show');
    }catch(error){console.warn('Falha ao carregar diagnóstico anterior',error);}
  }
  async function loadQuestions(){
    const supabase=window.VAEAuth.getClient();
    const {data,error}=await supabase.rpc('get_four_skills_placement_questions');
    if(error)throw error;state.questions=Array.isArray(data)?data:[];
    state.bySkill.listening=state.questions.filter(q=>q.skill==='listening');state.bySkill.reading=state.questions.filter(q=>q.skill==='reading');
    if(state.bySkill.listening.length!==12||state.bySkill.reading.length!==12)throw new Error('QUESTION_BANK_UNAVAILABLE');
  }

  function stageIndex(phase){return {listening:0,reading:1,writing:2,speaking:3}[phase]??0;}
  function updateStageUi(){
    const idx=stageIndex(state.phase);const names={listening:['Etapa 1 de 4','Comprensión auditiva','Ouça com atenção e escolha a alternativa mais adequada.','🎧 Escuta'],reading:['Etapa 2 de 4','Comprensión de lectura','Leia o texto e identifique informação explícita, inferências e relações de sentido.','📖 Leitura'],writing:['Etapa 3 de 4','Producción escrita','Produza um texto em espanhol adequado à faixa indicada pelo seu desempenho de compreensão.','✍️ Escrita'],speaking:['Etapa 4 de 4','Expresión oral','Grave uma resposta espontânea e faça uma autoavaliação orientada da sua produção.','🎙️ Fala']}[state.phase];
    $('diagnostic-stage-kicker').textContent=names[0];$('diagnostic-stage-title').textContent=names[1];$('diagnostic-stage-description').textContent=names[2];$('diagnostic-stage-badge').textContent=names[3];
    document.querySelectorAll('[data-stage-pill]').forEach((pill,i)=>{pill.classList.toggle('active',i===idx);pill.classList.toggle('done',i<idx);});
    let pct=idx*25;
    if(state.phase==='listening'||state.phase==='reading'){const arr=state.bySkill[state.phase];pct+=25*((state.index+1)/arr.length);}
    else pct+=12.5;
    $('diagnostic-progress-bar').style.width=`${Math.min(100,pct)}%`;
  }
  function setPhase(phase,index=0){
    stopSpeech();state.phase=phase;state.index=index;save();showOnly('diagnostic-flow');updateStageUi();
    $('diagnostic-objective-panel').classList.toggle('hidden',!['listening','reading'].includes(phase));
    $('diagnostic-writing-panel').classList.toggle('hidden',phase!=='writing');
    $('diagnostic-speaking-panel').classList.toggle('hidden',phase!=='speaking');
    if(phase==='listening'||phase==='reading')renderObjective();
    if(phase==='writing')renderWriting();
    if(phase==='speaking')renderSpeaking();
    window.scrollTo({top:0,behavior:'smooth'});
  }

  function renderObjective(){
    updateStageUi();const arr=state.bySkill[state.phase];const item=arr[state.index];if(!item)return;
    const answered=arr.filter(q=>state.answers[q.question_code]!==undefined).length;
    $('diagnostic-question-progress').textContent=`Questão ${state.index+1} de ${arr.length}`;$('diagnostic-answer-progress').textContent=`${answered} respondidas`;
    $('diagnostic-question-number').textContent=`${item.level} · Questão ${String(state.index+1).padStart(2,'0')}`;$('diagnostic-question').textContent=item.prompt;
    const audioBox=$('diagnostic-audio-box'),reading=$('diagnostic-reading-text');audioBox.classList.toggle('hidden',state.phase!=='listening');reading.classList.toggle('hidden',state.phase!=='reading');
    if(state.phase==='reading')reading.textContent=item.stimulus;
    if(state.phase==='listening')renderAudioControl(item);
    const wrap=$('diagnostic-options');wrap.replaceChildren();const selected=state.answers[item.question_code];
    (item.options||[]).forEach((option,index)=>{const b=document.createElement('button');b.type='button';b.className=`diagnostic-option${selected===index?' selected':''}`;b.setAttribute('aria-pressed',String(selected===index));const key=document.createElement('span');key.className='diagnostic-option-key';key.textContent=['A','B','C','D'][index];const txt=document.createElement('span');txt.textContent=String(option);b.append(key,txt);b.addEventListener('click',()=>{state.answers[item.question_code]=index;save();renderObjective();});wrap.appendChild(b);});
    $('diagnostic-prev').disabled=state.index===0;$('diagnostic-next').disabled=selected===undefined;$('diagnostic-next').textContent=state.index===arr.length-1?(state.phase==='listening'?'Ir para a leitura →':'Ir para a escrita →'):'Próxima →';
  }

  function renderAudioControl(item){
    const button=$('diagnostic-play-audio'),plays=Number(state.plays[item.question_code]||0),remaining=Math.max(0,2-plays);$('diagnostic-audio-title').textContent=`Áudio ${state.index+1} · ${item.level}`;$('diagnostic-audio-plays').textContent=remaining?`${remaining} ${remaining===1?'reprodução disponível':'reproduções disponíveis'}`:'Limite de 2 reproduções alcançado';
    const supported='speechSynthesis' in window&&'SpeechSynthesisUtterance' in window;button.disabled=!supported||remaining===0;button.textContent=supported?(remaining?'▶ Ouvir áudio':'✓ Áudio ouvido 2 vezes'):'Áudio indisponível neste navegador';
    button.onclick=()=>playListening(item,button);
  }
  function playListening(item,button){
    const used=Number(state.plays[item.question_code]||0);if(used>=2||!window.speechSynthesis)return;stopSpeech();state.plays[item.question_code]=used+1;save();button.disabled=true;button.textContent='🔊 Reproduzindo…';
    const utterance=new SpeechSynthesisUtterance(item.stimulus);utterance.lang='es-ES';utterance.rate=Number(item.speaking_rate||1);const voices=window.speechSynthesis.getVoices();const voice=voices.find(v=>String(v.lang).toLowerCase().startsWith('es'));if(voice)utterance.voice=voice;
    utterance.onend=()=>renderAudioControl(item);utterance.onerror=()=>renderAudioControl(item);window.speechSynthesis.speak(utterance);track('placement_listening_play',{question:item.question_code,level:item.level,play:used+1});
  }

  async function prepareProductions(){
    $('diagnostic-next').disabled=true;$('diagnostic-submit-status').textContent='Calculando a faixa preliminar para selecionar sua proposta de escrita…';
    try{const supabase=window.VAEAuth.getClient();const {data,error}=await supabase.rpc('score_four_skills_objective',{p_answers:state.answers});if(error)throw error;state.preliminary=data||{};state.writingTarget=data?.preliminary_level||'A1';save();$('diagnostic-submit-status').textContent='';setPhase('writing');}
    catch(error){console.error('Falha ao calcular resultado preliminar',error);$('diagnostic-submit-status').textContent='Não foi possível preparar a etapa de escrita agora. Tente novamente.';$('diagnostic-submit-status').className='diagnostic-submit-status error';$('diagnostic-next').disabled=false;}
  }

  function renderWriting(){
    updateStageUi();const level=state.writingTarget||state.preliminary?.preliminary_level||'A1',task=WRITING_TASKS[level]||WRITING_TASKS.A1;$('diagnostic-writing-level').textContent=level;$('diagnostic-writing-prompt').textContent=task.prompt;
    const targets=$('diagnostic-writing-targets');targets.replaceChildren();[`Faixa sugerida: ${task.min}–${task.max} palavras`,...task.focus].forEach(t=>{const s=document.createElement('span');s.textContent=t;targets.appendChild(s);});
    const area=$('diagnostic-writing-text');if(area.value!==state.writingText)area.value=state.writingText;refreshWritingMetrics();
  }
  function refreshWritingMetrics(){
    const text=$('diagnostic-writing-text').value;state.writingText=text;const m=writingMetrics(text),task=WRITING_TASKS[state.writingTarget||'A1'];$('diagnostic-writing-words').textContent=m.wordCount;$('diagnostic-writing-unique').textContent=m.unique;$('diagnostic-writing-sentences').textContent=m.sentences;$('diagnostic-writing-connectors').textContent=m.connectors;
    const status=$('diagnostic-writing-status');if(m.wordCount<task.min){status.className='diagnostic-production-status';status.textContent=`Faltam ${task.min-m.wordCount} palavras para alcançar o mínimo sugerido desta etapa.`;}else if(m.wordCount>task.max){status.className='diagnostic-production-status';status.textContent=`Você ultrapassou a faixa sugerida em ${m.wordCount-task.max} palavras. Pode prosseguir, mas revise a concisão.`;}else{status.className='diagnostic-production-status ok';status.textContent=`Faixa de extensão alcançada: ${m.wordCount} palavras.`;}save();
  }

  function renderSpeaking(){
    updateStageUi();const level=state.writingTarget||'A1',task=SPEAKING_TASKS[level]||SPEAKING_TASKS.A1;$('diagnostic-speaking-level').textContent=level;$('diagnostic-speaking-prompt').textContent=`${task.prompt} Tempo sugerido: ${task.seconds}.`;
    renderRatings();if(state.recordingUrl){$('diagnostic-audio-preview').src=state.recordingUrl;$('diagnostic-audio-preview').classList.remove('hidden');$('diagnostic-record-reset').classList.remove('hidden');$('diagnostic-record-start').classList.add('hidden');$('diagnostic-recorder-state').textContent='Gravação pronta para revisar.';}
  }
  function renderRatings(){
    const wrap=$('diagnostic-speaking-ratings');if(wrap.dataset.ready==='true')return;wrap.dataset.ready='true';SPEAKING_RATINGS.forEach(([key,title,desc])=>{const row=document.createElement('div');row.className='diagnostic-rating-row';const copy=document.createElement('div');copy.className='diagnostic-rating-copy';const strong=document.createElement('strong');strong.textContent=title;const small=document.createElement('span');small.textContent=desc;copy.append(strong,small);const scale=document.createElement('div');scale.className='diagnostic-rating-scale';for(let i=1;i<=5;i++){const label=document.createElement('label');const input=document.createElement('input');input.type='radio';input.name=`speaking-${key}`;input.value=String(i);input.checked=Number(state.speakingSelf[key])===i;const num=document.createElement('span');num.textContent=String(i);input.addEventListener('change',()=>{state.speakingSelf[key]=i;save();});label.append(input,num);scale.appendChild(label);}row.append(copy,scale);wrap.appendChild(row);});
  }

  async function startRecording(){
    const status=$('diagnostic-speaking-status');status.textContent='';
    if(!navigator.mediaDevices?.getUserMedia||typeof MediaRecorder==='undefined'){status.className='diagnostic-production-status error';status.textContent='Este navegador não oferece gravação de áudio compatível. Marque a opção para concluir apenas com a autoavaliação.';return;}
    try{
      resetRecording(false);mediaStream=await navigator.mediaDevices.getUserMedia({audio:true});let mime='';for(const candidate of ['audio/webm;codecs=opus','audio/webm','audio/ogg;codecs=opus','audio/mp4']){if(MediaRecorder.isTypeSupported(candidate)){mime=candidate;break;}}
      mediaRecorder=new MediaRecorder(mediaStream,mime?{mimeType:mime}:undefined);recordChunks=[];mediaRecorder.ondataavailable=e=>{if(e.data?.size)recordChunks.push(e.data);};mediaRecorder.onstop=()=>{const type=(mediaRecorder?.mimeType||recordChunks[0]?.type||'audio/webm');state.recordingBlob=new Blob(recordChunks,{type});state.recordingUrl=URL.createObjectURL(state.recordingBlob);$('diagnostic-audio-preview').src=state.recordingUrl;$('diagnostic-audio-preview').classList.remove('hidden');$('diagnostic-record-reset').classList.remove('hidden');$('diagnostic-record-start').classList.add('hidden');$('diagnostic-record-stop').classList.add('hidden');$('diagnostic-recorder-state').textContent='Gravação concluída. Ouça antes de finalizar.';stopRecorderTracks();};
      mediaRecorder.start(500);recordStartedAt=Date.now();$('diagnostic-record-start').classList.add('hidden');$('diagnostic-record-stop').classList.remove('hidden');$('diagnostic-recorder-state').textContent='Gravando sua resposta…';$('diagnostic-no-recording').checked=false;recordTimer=setInterval(()=>{const sec=Math.floor((Date.now()-recordStartedAt)/1000);$('diagnostic-recorder-time').textContent=`${String(Math.floor(sec/60)).padStart(2,'0')}:${String(sec%60).padStart(2,'0')}`;if(sec>=190)stopRecording();},500);track('placement_speaking_record_start',{level:state.writingTarget||'A1'});
    }catch(error){console.warn('Microfone indisponível',error);status.className='diagnostic-production-status error';status.textContent='Não foi possível acessar o microfone. Verifique a permissão do navegador ou marque a opção para concluir sem salvar áudio.';stopRecorderTracks();}
  }
  function stopRecording(){if(mediaRecorder&&mediaRecorder.state!=='inactive'){try{mediaRecorder.stop();}catch(_){stopRecorderTracks();}}}
  function resetRecording(showReady=true){stopRecorderTracks();if(mediaRecorder&&mediaRecorder.state!=='inactive'){try{mediaRecorder.stop();}catch(_){}}mediaRecorder=null;recordChunks=[];state.recordingBlob=null;if(state.recordingUrl){URL.revokeObjectURL(state.recordingUrl);state.recordingUrl=null;}$('diagnostic-audio-preview').removeAttribute('src');$('diagnostic-audio-preview').classList.add('hidden');$('diagnostic-record-reset').classList.add('hidden');$('diagnostic-record-stop').classList.add('hidden');$('diagnostic-record-start').classList.remove('hidden');$('diagnostic-recorder-time').textContent='00:00';if(showReady)$('diagnostic-recorder-state').textContent='Microfone pronto para iniciar';}

  function validateSpeaking(){const missing=SPEAKING_RATINGS.filter(([key])=>!Number(state.speakingSelf[key]));if(missing.length)return 'Responda os cinco itens da autoavaliação oral antes de concluir.';if(!state.recordingBlob&&!$('diagnostic-no-recording').checked)return 'Faça uma gravação ou marque a opção para concluir sem salvar áudio.';return '';}
  async function uploadRecording(){
    if(!state.recordingBlob)return null;const supabase=window.VAEAuth.getClient();const baseType=(state.recordingBlob.type||'audio/webm').split(';')[0];const ext=baseType.includes('mp4')?'m4a':baseType.includes('ogg')?'ogg':baseType.includes('mpeg')?'mp3':'webm';const path=`${state.session.user.id}/${Date.now()}-diagnostico.${ext}`;const {error}=await supabase.storage.from('placement-speaking').upload(path,state.recordingBlob,{contentType:baseType,upsert:false});if(error)throw error;return path;
  }

  async function finish(){
    if(state.submitting)return;const validation=validateSpeaking();if(validation){$('diagnostic-speaking-status').className='diagnostic-production-status error';$('diagnostic-speaking-status').textContent=validation;return;}
    state.submitting=true;$('diagnostic-finish').disabled=true;$('diagnostic-finish').textContent='Calculando seu perfil…';$('diagnostic-submit-status').textContent='Salvando suas quatro habilidades e preparando o resultado.';
    let audioPath=null;
    try{if(state.recordingBlob){try{audioPath=await uploadRecording();}catch(error){console.warn('Falha ao salvar gravação; diagnóstico continuará sem áudio',error);$('diagnostic-speaking-status').className='diagnostic-production-status';$('diagnostic-speaking-status').textContent='A gravação não pôde ser salva, mas o diagnóstico continuará com sua autoavaliação oral.';}}
      const duration=Math.max(0,Math.round((Date.now()-state.startedAt)/1000));const supabase=window.VAEAuth.getClient();const {data,error}=await supabase.rpc('submit_four_skills_placement',{p_answers:state.answers,p_writing_text:state.writingText.trim(),p_writing_target_level:state.writingTarget||'A1',p_speaking_self:state.speakingSelf,p_speaking_storage_path:audioPath,p_duration_seconds:duration});if(error)throw error;
      clearSaved();stopRecorderTracks();track('placement_four_skills_complete',{estimated_level:data?.estimated_level||'',listening_level:data?.skills?.listening?.level||'',reading_level:data?.skills?.reading?.level||'',writing_level:data?.skills?.writing?.level||'',speaking_level:data?.skills?.speaking?.level||'',duration_seconds:duration});renderResult(data||{});
    }catch(error){console.error('Falha ao concluir diagnóstico',error);state.submitting=false;$('diagnostic-finish').disabled=false;$('diagnostic-finish').textContent='Concluir diagnóstico →';$('diagnostic-submit-status').className='diagnostic-submit-status error';$('diagnostic-submit-status').textContent=window.VAEAuth?.friendlyError?.(error)||'Não foi possível concluir o diagnóstico agora. Tente novamente.';}
  }

  function skillCard(skill,data){
    const meta=SKILL_META[skill],level=data?.level||'A1',score=Number(data?.score||0),total=Number(data?.total||100),pct=total?Math.round(score/total*100):0;const article=document.createElement('article');article.className='diagnostic-skill-card';article.innerHTML=`<div class="diagnostic-skill-card-top"><span class="diagnostic-skill-name">${meta.icon} ${meta.name}</span><span class="diagnostic-skill-level">${level}</span></div><strong>${skill==='speaking'?'Faixa oral autoestimada':skill==='writing'?`${score}/100 na análise textual`:`${score}/${total} itens`}</strong><p>${meta.note}</p><div class="diagnostic-skill-meter"><span style="width:${Math.max(6,pct)}%"></span></div>`;return article;
  }
  function renderResult(result){
    stopSpeech();showOnly('diagnostic-result');$('diagnostic-progress-bar').style.width='100%';const level=result.estimated_level||'A1',info=LEVEL_INFO[level]||LEVEL_INFO.A1;$('diagnostic-result-level').textContent=level;$('diagnostic-result-title').textContent=info.title;$('diagnostic-result-description').textContent=info.description;$('diagnostic-result-date').textContent=formatDate(result.completed_at);
    const grid=$('diagnostic-profile-grid');grid.replaceChildren();['listening','reading','writing','speaking'].forEach(skill=>grid.appendChild(skillCard(skill,result.skills?.[skill]||{})));
    const priority=result.priority_skill||'writing',meta=SKILL_META[priority]||SKILL_META.writing;const priorityCopy={listening:'Sua compreensão auditiva merece atenção prioritária. Use atividades de escuta frequentes, primeiro com fala clara e depois com maior velocidade e variedade.',reading:'Sua compreensão leitora é o melhor ponto para concentrar reforço. Trabalhe textos graduados, referentes, conectores e inferências.',writing:'Sua produção escrita está abaixo das habilidades mais fortes. Priorize a Práctica de escritura, revisão orientada e expansão de conectores.',speaking:'Sua produção oral aparece como a prioridade atual. Grave respostas curtas com frequência, ouça a própria fala e tente reformular com mais autonomia.'}[priority];$('diagnostic-priority').innerHTML=`<span>Prioridade de estudo</span><strong>${meta.icon} ${meta.name}</strong><p>${priorityCopy}</p>`;
    const rec=$('diagnostic-recommendation-list');rec.replaceChildren();const common=[`Use seu nível geral ${level} como ponto de partida para a Prática progressiva.`,`Compare as quatro habilidades: não é necessário que escuta, leitura, escrita e fala estejam na mesma faixa.`,`Refaça o diagnóstico depois de um período consistente de estudo para comparar sua evolução.`];if(priority==='writing')common.unshift('Continue o percurso de escrita A1–C2 e compare primeira versão, revisão e versão final.');if(priority==='listening')common.unshift('Faça sessões curtas e frequentes de Práctica de escucha, repetindo o áudio antes de consultar qualquer apoio.');if(priority==='reading')common.unshift('Aumente gradualmente a extensão e a complexidade das leituras, registrando conectores e vocabulário pelo contexto.');if(priority==='speaking')common.unshift('Use o gravador como prática: responda uma vez, ouça, identifique pausas e grave novamente sem memorizar um roteiro.');common.slice(0,4).forEach(text=>{const li=document.createElement('li');li.textContent=text;rec.appendChild(li);});window.scrollTo({top:0,behavior:'smooth'});
  }

  function start(fresh){
    if(fresh){state.answers={};state.plays={};state.phase='listening';state.index=0;state.startedAt=Date.now();state.preliminary=null;state.writingTarget=null;state.writingText='';state.speakingSelf={};resetRecording(false);clearSaved();save();}
    if(!state.startedAt)state.startedAt=Date.now();if(state.phase==='writing'&&!state.writingTarget)state.phase='reading';setPhase(state.phase,state.index);track('placement_four_skills_start',{resumed:fresh?'no':'yes'});
  }

  $('diagnostic-prev').addEventListener('click',()=>{if(state.index>0){state.index--;save();renderObjective();}});
  $('diagnostic-next').addEventListener('click',()=>{const arr=state.bySkill[state.phase],item=arr[state.index];if(!item||state.answers[item.question_code]===undefined)return;if(state.index<arr.length-1){state.index++;save();renderObjective();window.scrollTo({top:0,behavior:'smooth'});return;}if(state.phase==='listening')setPhase('reading',0);else prepareProductions();});
  $('diagnostic-writing-text').addEventListener('input',refreshWritingMetrics);
  $('diagnostic-writing-back').addEventListener('click',()=>setPhase('reading',11));
  $('diagnostic-writing-next').addEventListener('click',()=>{const task=WRITING_TASKS[state.writingTarget||'A1'],m=writingMetrics(state.writingText);if(m.wordCount<task.min){$('diagnostic-writing-status').className='diagnostic-production-status error';$('diagnostic-writing-status').textContent=`Escreva pelo menos ${task.min} palavras para avançar à produção oral.`;return;}setPhase('speaking');});
  $('diagnostic-speaking-back').addEventListener('click',()=>{stopRecorderTracks();setPhase('writing');});
  $('diagnostic-record-start').addEventListener('click',startRecording);$('diagnostic-record-stop').addEventListener('click',stopRecording);$('diagnostic-record-reset').addEventListener('click',()=>resetRecording(true));$('diagnostic-finish').addEventListener('click',finish);
  $('diagnostic-start').addEventListener('click',()=>start(!($('diagnostic-start').dataset.resume==='true')));$('diagnostic-retry').addEventListener('click',()=>start(true));

  async function boot(){
    if(!window.VAEAuth?.isConfigured?.()){$('diagnostic-loading').textContent='O diagnóstico ainda não está disponível.';return;}
    try{state.session=await window.VAEAuth.requireSession();if(!state.session?.user)return;storageKey=`vae-four-skills-placement-v2-${state.session.user.id}`;await Promise.all([loadQuestions(),loadPrevious()]);const resumed=restore();if(resumed){$('diagnostic-start').textContent='Continuar meu diagnóstico →';$('diagnostic-start').dataset.resume='true';}$('diagnostic-loading').classList.add('hidden');$('diagnostic-shell').classList.remove('hidden');showOnly('diagnostic-intro');$('diagnostic-main').setAttribute('aria-busy','false');track('placement_four_skills_view',{has_saved_progress:resumed?'yes':'no'});}catch(error){console.error('Falha ao abrir diagnóstico',error);$('diagnostic-loading').textContent=String(error?.message||'').toLowerCase().includes('premium')?'Este diagnóstico faz parte do acesso Premium.':'Não foi possível carregar o diagnóstico agora. Atualize a página e tente novamente.';$('diagnostic-main').setAttribute('aria-busy','false');}
  }
  boot();
})();
