/* Ajustes complementares da Escucha ampliada. */
(function(){
  const HOUSING_AUDIO='https://storage.googleapis.com/adm--audio-playback--7d--public/mcp-preview/b8991fe1-5443-4b1d-a051-cc3fc8eda569.mp3';

  function fixSummary(){
    const spans=document.querySelectorAll('.listening-expanded-summary span');
    if(spans.length>=4) spans[3].textContent='18 dictados';
  }

  document.addEventListener('click',e=>{
    const btn=e.target.closest('[data-open-listening-expanded="b1-vivienda"]');
    if(!btn) return;
    setTimeout(()=>{
      const audio=document.getElementById('listening-expanded-audio');
      if(audio){audio.src=HOUSING_AUDIO;audio.load();}
    },0);
  });

  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',()=>setTimeout(fixSummary,250),{once:true});
  }else{
    setTimeout(fixSummary,250);
  }
})();