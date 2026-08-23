/* Aula Premium: La apócope en español. */
(function(){
  const LESSON_ID='apocope-espanol-01';
  const PASS_SCORE=70;
  const QUESTIONS=[
    {q:'O que caracteriza uma apócope?',o:['A adição de uma sílaba no início da palavra.','A perda de um ou mais sons ou letras no final da palavra.','A mudança obrigatória do gênero de um substantivo.','A repetição de uma palavra para dar ênfase.'],a:1,e:'Apócope é a redução ocorrida no final da palavra. No espanhol, várias dessas reduções aparecem em contextos gramaticais específicos.'},
    {q:'Complete: “Espero que tengas un ___ viaje.”',o:['bueno','buen','buena','bien'],a:1,e:'Bueno se apocopa para buen antes de substantivo masculino singular: un buen viaje.'},
    {q:'Complete: “¡Qué ___ tiempo hace hoy!”',o:['malo','mala','mal','males'],a:2,e:'Malo se transforma em mal antes de substantivo masculino singular: mal tiempo.'},
    {q:'Qual frase está correta?',o:['No tengo ninguno problema.','No tengo ningún problema.','No tengo ninguna problema.','No tengo ningun problema.'],a:1,e:'Problema é masculino em espanhol; por isso, usamos ningún antes do substantivo. A forma lleva tilde: ningún.'},
    {q:'Qual opção respeita a regra padrão ensinada nesta aula?',o:['Fue la primer clase.','Fue la primero clase.','Fue la primera clase.','Fue el primera clase.'],a:2,e:'Primeiro/primer se reduz diante de substantivo masculino singular. Com substantivo feminino usamos primera: la primera clase.'},
    {q:'Em qual frase “gran” tem valor próximo de “excelente/importante”?',o:['Es un hombre grande.','Es un gran hombre.','La mesa es grande.','Compraron casas grandes.'],a:1,e:'Gran antes do substantivo frequentemente assume valor apreciativo. Hombre grande tende a indicar tamanho/porte.'},
    {q:'Complete: “Puedes elegir ___ libro de la biblioteca.”',o:['cualquiera','cualquier','cualesquiera','cualquiera de'],a:1,e:'Cualquiera se apocopa para cualquier antes de substantivo singular, masculino ou feminino.'},
    {q:'Complete: “Hace más de ___ años que ocurrió.”',o:['ciento','cien','cienes','ciento de'],a:1,e:'Para o número exato 100 diante de substantivo usamos cien: cien años.'},
    {q:'Qual forma é correta para 120 participantes?',o:['cien veinte participantes','ciento veinte participantes','cien y veinte participantes','ciento y veinte participantes'],a:1,e:'Quando 100 é seguido por outras unidades, usamos ciento: ciento veinte.'},
    {q:'Complete: “Tengo ___ años.”',o:['veintiuno','veintiuna','veintiún','veintiun'],a:2,e:'Antes de substantivo masculino, veintiuno se apocopa para veintiún, com acento gráfico.'},
    {q:'Complete: “En el curso hay ___ personas.”',o:['veintiún','veintiuno','veintiuna','veintiunas'],a:2,e:'Personas é feminino; portanto, fazemos a concordância: veintiuna personas. Não usamos veintiún diante de feminino.'},
    {q:'Qual nome está de acordo com a apócope de “santo”?',o:['Santo Pedro','San Pedro','Sante Pedro','Sant Pedro'],a:1,e:'Diante da maioria dos nomes próprios masculinos de santos, santo se reduz a san: San Pedro. Existem exceções tradicionais como Santo Tomás e Santo Domingo.'}
  ];

  const $=id=>document.getElementById(id);
  const main=$('grammar-main');
  const loading=$('grammar-loading');
  const content=$('grammar-content');
  const denied=$('grammar-denied');
  const list=$('grammar-question-list');
  const form=$('grammar-quiz');
  const submit=$('grammar-submit');
  const retry=$('grammar-retry');
  const status=$('grammar-quiz-status');
  const result=$('grammar-result');
  let session=null;
  let savedProgress=null;

  function setQuizStatus(message,type=''){
    status.textContent=message;
    status.className=`ga-quiz-status${type?` ${type}`:''}`;
  }

  function optionId(qIndex,oIndex){return `ga-q${qIndex}-o${oIndex}`;}

  function renderQuestions(){
    list.replaceChildren();
    QUESTIONS.forEach((item,qIndex)=>{
      const field=document.createElement('fieldset');
      field.className='ga-question';
      field.dataset.question=String(qIndex);
      const legend=document.createElement('legend');
      legend.textContent=`${qIndex+1}. ${item.q}`;
      const options=document.createElement('div');
      options.className='ga-question-options';
      item.o.forEach((label,oIndex)=>{
        const row=document.createElement('label');
        row.className='ga-option';
        row.htmlFor=optionId(qIndex,oIndex);
        const input=document.createElement('input');
        input.type='radio';input.name=`q${qIndex}`;input.value=String(oIndex);input.id=optionId(qIndex,oIndex);
        const span=document.createElement('span');span.textContent=label;
        row.append(input,span);options.appendChild(row);
      });
      const feedback=document.createElement('div');
      feedback.className='ga-feedback';
      field.append(legend,options,feedback);
      list.appendChild(field);
    });
  }

  async function requirePremium(){
    if(!window.VAEAuth?.requireSession)return false;
    session=await window.VAEAuth.requireSession();
    if(!session?.user)return false;
    const supabase=window.VAEAuth.getClient();
    const {data,error}=await supabase.rpc('get_membership_summary');
    if(error)throw error;
    const summary=data||{};
    return summary.role==='admin'||Boolean(summary.premium_access);
  }

  async function loadProgress(){
    if(!session?.user)return;
    const supabase=window.VAEAuth.getClient();
    const {data,error}=await supabase.from('grammar_lesson_progress').select('attempts,best_score,completed,last_completed_at').eq('user_id',session.user.id).eq('lesson_id',LESSON_ID).maybeSingle();
    if(error)throw error;
    savedProgress=data||null;
    const score=$('grammar-progress-score');
    const text=$('grammar-progress-text');
    if(!savedProgress){score.textContent='0%';text.textContent='Ainda não há tentativa registrada.';return;}
    score.textContent=`${savedProgress.best_score||0}%`;
    text.textContent=savedProgress.completed?`Aula concluída · ${savedProgress.attempts} tentativa(s).`:`Melhor resultado · ${savedProgress.attempts} tentativa(s).`;
  }

  async function saveProgress(percent){
    if(!session?.user)return;
    const supabase=window.VAEAuth.getClient();
    const completed=percent>=PASS_SCORE||Boolean(savedProgress?.completed);
    const payload={
      user_id:session.user.id,
      lesson_id:LESSON_ID,
      attempts:Number(savedProgress?.attempts||0)+1,
      best_score:Math.max(Number(savedProgress?.best_score||0),percent),
      completed,
      last_completed_at:percent>=PASS_SCORE?new Date().toISOString():(savedProgress?.last_completed_at||null),
      updated_at:new Date().toISOString()
    };
    const {error}=await supabase.from('grammar_lesson_progress').upsert(payload,{onConflict:'user_id,lesson_id'});
    if(error)throw error;
    savedProgress=payload;
    await loadProgress();
  }

  function selectedAnswer(index){
    const checked=form.querySelector(`input[name="q${index}"]:checked`);
    return checked?Number(checked.value):null;
  }

  function correctQuiz(){
    let answered=0,correct=0;
    QUESTIONS.forEach((item,index)=>{
      const answer=selectedAnswer(index);
      if(answer!==null)answered++;
      if(answer===item.a)correct++;
    });
    if(answered!==QUESTIONS.length){setQuizStatus(`Você respondeu ${answered} de ${QUESTIONS.length} questões. Complete todas antes de corrigir.`,'error');return null;}

    QUESTIONS.forEach((item,index)=>{
      const field=list.querySelector(`[data-question="${index}"]`);
      const answer=selectedAnswer(index);
      const ok=answer===item.a;
      field.classList.toggle('correct',ok);
      field.classList.toggle('incorrect',!ok);
      const feedback=field.querySelector('.ga-feedback');
      feedback.textContent=`${ok?'✓ Correto.':'✗ Revise esta regra.'} ${item.e}`;
      field.querySelectorAll('input').forEach(input=>input.disabled=true);
    });
    const percent=Math.round((correct/QUESTIONS.length)*100);
    return {correct,percent};
  }

  async function onSubmit(event){
    event.preventDefault();
    const outcome=correctQuiz();
    if(!outcome)return;
    submit.disabled=true;
    retry.classList.remove('hidden');
    result.classList.remove('hidden');
    $('grammar-result-score').textContent=`${outcome.correct}/${QUESTIONS.length} · ${outcome.percent}%`;
    $('grammar-result-badge').textContent=outcome.percent>=PASS_SCORE?'Aula concluída':'Continue praticando';
    $('grammar-result-text').textContent=outcome.percent>=PASS_SCORE
      ?'Você atingiu o aproveitamento mínimo. Seu resultado foi salvo no percurso de Gramática Premium.'
      :'Revise principalmente as questões marcadas em vermelho e refaça a atividade. Seu melhor resultado continuará salvo.';
    setQuizStatus(outcome.percent>=PASS_SCORE?'Correção concluída. Muito bem!':'Correção concluída. Revise os comentários antes de tentar novamente.');
    try{
      await saveProgress(outcome.percent);
      if(typeof window.gtag==='function')window.gtag('event','premium_grammar_complete',{lesson_id:LESSON_ID,score:outcome.percent,passed:outcome.percent>=PASS_SCORE});
    }catch(error){
      console.error('Falha ao salvar progresso de gramática',error);
      setQuizStatus('A atividade foi corrigida, mas não foi possível salvar o progresso agora. Atualize a página e tente novamente.','error');
    }
  }

  function resetQuiz(){
    form.reset();
    list.querySelectorAll('.ga-question').forEach(field=>{field.classList.remove('correct','incorrect');field.querySelectorAll('input').forEach(input=>input.disabled=false);});
    submit.disabled=false;
    retry.classList.add('hidden');
    result.classList.add('hidden');
    setQuizStatus('Responda todas as questões antes de corrigir.');
    document.getElementById('pratica')?.scrollIntoView({behavior:'smooth',block:'start'});
  }

  async function boot(){
    renderQuestions();
    try{
      const allowed=await requirePremium();
      loading.classList.add('hidden');
      main?.removeAttribute('aria-busy');
      if(!allowed){denied.classList.remove('hidden');return;}
      content.classList.remove('hidden');
      await loadProgress();
      if(typeof window.gtag==='function')window.gtag('event','premium_grammar_view',{lesson_id:LESSON_ID,topic:'apocope'});
    }catch(error){
      console.error('Falha ao validar aula de gramática',error);
      loading.classList.add('hidden');
      main?.removeAttribute('aria-busy');
      denied.classList.remove('hidden');
    }
  }

  form?.addEventListener('submit',onSubmit);
  retry?.addEventListener('click',resetQuiz);
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
