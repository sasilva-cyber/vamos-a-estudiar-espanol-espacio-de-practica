/* Redireciona os cards da Práctica de lectura para a página guiada sem reprocessar o DOM em loop. */
(function(){
  const TITLE_TO_ID=new Map([
    ['La guitarra','lorca-la-guitarra'],
    ['Canción del jinete','lorca-cancion-jinete'],
    ['Baladilla de los tres ríos','lorca-baladilla-rios'],
    ['Romance sonámbulo','lorca-romance-sonambulo'],
    ['La aurora de Nueva York','lorca-la-aurora'],
    ['La doncella, el marinero y el estudiante','lorca-doncella-dialogo'],
    ['La Gitanilla','cervantes-la-gitanilla'],
    ['El casamiento engañoso','cervantes-casamiento-enganoso']
  ]);

  function root(){
    return window.VAEAuth?.ROOT_PATH||(location.hostname.toLowerCase().endsWith('.github.io')?'/vamos-a-estudiar-espanol-espacio-de-practica/':'/');
  }

  function idForCard(card){
    return TITLE_TO_ID.get(card?.querySelector('h3')?.textContent?.trim()||'')||null;
  }

  function enhanceCard(card){
    if(!card||card.dataset.guidedReady==='1')return;
    const id=idForCard(card);
    if(!id)return;

    card.dataset.guidedReady='1';
    card.dataset.readingId=id;

    const btn=card.querySelector('.reading-classic-action');
    if(!btn)return;

    const label='Abrir leitura guiada →';
    const aria=`Abrir leitura guiada: ${card.querySelector('h3')?.textContent||''}`;
    if(btn.textContent!==label)btn.textContent=label;
    if(btn.getAttribute('aria-label')!==aria)btn.setAttribute('aria-label',aria);
  }

  function enhanceWithin(node){
    if(!(node instanceof Element))return;
    if(node.matches('.reading-classic-card'))enhanceCard(node);
    node.querySelectorAll?.('.reading-classic-card').forEach(enhanceCard);
  }

  function enhanceAll(){
    document.querySelectorAll('.reading-classic-card').forEach(enhanceCard);
  }

  document.addEventListener('click',event=>{
    const btn=event.target.closest?.('.reading-classic-action');
    if(!btn)return;
    const card=btn.closest('.reading-classic-card');
    const id=card?.dataset.readingId||idForCard(card);
    if(!id)return;
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
    location.href=`${root()}aluno/leitura/?reading=${encodeURIComponent(id)}`;
  },true);

  const observer=new MutationObserver(records=>{
    for(const record of records){
      record.addedNodes.forEach(enhanceWithin);
    }
  });

  function start(){
    enhanceAll();
    const host=document.getElementById('student-content')||document.body;
    if(host)observer.observe(host,{childList:true,subtree:true});
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});
  else start();
})();
