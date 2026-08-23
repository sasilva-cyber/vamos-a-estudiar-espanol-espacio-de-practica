/* Atualiza o destaque do jogo na home para Jugando y aprendiendo. */
(function(){
  function apply(){
    const section=document.getElementById("home-false-friends-showcase");
    if(!section){setTimeout(apply,180);return}
    const eyebrow=section.querySelector(".eyebrow");
    const title=section.querySelector("#home-ff-title");
    const copy=section.querySelector(".home-ff-copy>p:last-of-type");
    if(eyebrow)eyebrow.textContent="Juego visual · Falsos amigos";
    if(title)title.textContent="Jugando y aprendiendo";
    if(copy)copy.textContent="Supere níveis progressivos, descubra falsos amigos entre o espanhol e o português e amplie sua coleção de palavras enquanto joga.";
    const badges=section.querySelector(".home-ff-badges");
    if(badges)badges.innerHTML='<span class="home-ff-badge">🎮 10 níveis</span><span class="home-ff-badge">📚 676 correspondências</span><span class="home-ff-badge">❤️ 3 vidas</span><span class="home-ff-badge">🔓 progresso salvo</span>';
    const play=section.querySelector("#home-ff-play");
    if(play)play.textContent="Jugar y aprender →";
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",apply,{once:true});else apply();
})();