/* Redireciona os cards da Práctica de lectura para a página guiada. */
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

  function root(){return window.VAEAuth?.ROOT_PATH||(location.hostname.toLowerCase().endsWith('.github.io')?'/vamos-a-estudiar-espanol-espacio-de-practica/':'/');}
  function idForCard(card){return TITLE_TO_ID.get(card?.querySelector('h3')?.textContent?.trim()||'')||null;}
  function enhance(){
    document.querySelectorAll('.reading-classic-card').forEach(card=>{
      const id=idForCard(card);if(!id)return;
      card.dataset.readingId=id;
      const btn=card.querySelector('.reading-classic-action');
      if(btn){btn.textContent='Abrir leitura guiada →';btn.setAttribute('aria-label',`Abrir leitura guiada: ${card.querySelector('h3')?.textContent||''}`);}
    });
  }

  document.addEventListener('click',event=>{
    const btn=event.target.closest?.('.reading-classic-action');if(!btn)return;
    const card=btn.closest('.reading-classic-card');const id=card?.dataset.readingId||idForCard(card);if(!id)return;
    event.preventDefault();event.stopPropagation();event.stopImmediatePropagation();
    location.href=`${root()}aluno/leitura/?reading=${encodeURIComponent(id)}`;
  },true);

  const observer=new MutationObserver(enhance);observer.observe(document.documentElement,{childList:true,subtree:true});
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',enhance,{once:true});else enhance();
})();
