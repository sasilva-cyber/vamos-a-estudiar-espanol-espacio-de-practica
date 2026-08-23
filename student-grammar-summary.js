/* Hub Premium de gramática na Área do Estudiante. */
(function(){
  const root=window.VAEAuth?.ROOT_PATH||(location.hostname.toLowerCase().endsWith('.github.io')?'/vamos-a-estudiar-espanol-espacio-de-practica/':'/');

  function loadStyles(){
    if(document.getElementById('student-grammar-css'))return;
    const link=document.createElement('link');
    link.id='student-grammar-css';link.rel='stylesheet';link.href=`${root}student-grammar.css?v=20260823-1`;
    document.head.appendChild(link);
  }

  function build(){
    if(document.getElementById('grammar-hub'))return true;
    const listening=document.querySelector('.listening-hub');
    if(!listening)return false;
    loadStyles();
    const section=document.createElement('section');
    section.className='student-section grammar-hub';
    section.id='grammar-hub';
    section.setAttribute('data-premium-section','');
    section.setAttribute('aria-labelledby','grammar-hub-title');
    section.innerHTML=`
      <div class="grammar-hub-head">
        <div>
          <p class="student-section-kicker">Gramática Premium · explicação + prática</p>
          <h2 id="grammar-hub-title">Gramática</h2>
          <p>Aulas aprofundadas para entender a lógica do espanhol, comparar estruturas com o português e aplicar cada conteúdo em exercícios com correção automática.</p>
        </div>
        <span class="grammar-hub-count">Aulas em expansão</span>
      </div>
      <article class="grammar-lesson-card">
        <span class="grammar-lesson-number" aria-hidden="true">01</span>
        <div class="grammar-lesson-copy">
          <small>A1–B1 · Morfossintaxe</small>
          <strong>La apócope en español</strong>
          <span>Entenda por que <em>bueno</em> vira <em>buen</em>, quando usar <em>un, algún, ningún, primer, tercer, cien, veintiún, gran</em> e <em>cualquier</em>, e evite os erros mais comuns de falantes de português.</span>
          <div class="grammar-lesson-meta"><i>Explicação aprofundada</i><i>Comparação com o português</i><i>12 questões</i><i>Progresso salvo</i></div>
        </div>
        <a class="grammar-lesson-action" href="gramatica/apocope/">Estudar esta aula →</a>
      </article>
      <p class="grammar-hub-note">Novas aulas de gramática poderão ser adicionadas a este percurso sem alterar seu progresso nas atividades já concluídas.</p>`;
    listening.insertAdjacentElement('beforebegin',section);
    return true;
  }

  function normalizeOrder(){
    const listening=document.querySelector('.listening-hub');
    const grammar=document.getElementById('grammar-hub');
    const video=document.getElementById('video-academy');
    if(!listening||!grammar)return false;
    if(grammar.nextElementSibling!==listening)listening.insertAdjacentElement('beforebegin',grammar);
    if(video&&video.nextElementSibling!==grammar)grammar.insertAdjacentElement('beforebegin',video);
    return Boolean(video);
  }

  function boot(){
    if(!build()){
      const observer=new MutationObserver(()=>{if(build()){normalizeOrder();observer.disconnect();}});
      observer.observe(document.getElementById('student-content')||document.body,{childList:true,subtree:true});
      return;
    }
    if(normalizeOrder())return;
    const observer=new MutationObserver(()=>{if(normalizeOrder())observer.disconnect();});
    observer.observe(document.getElementById('student-content')||document.body,{childList:true,subtree:true});
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
