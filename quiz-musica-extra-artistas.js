/* Amplia o quiz musical antes da inicialização do banco principal. */
(function () {
  const EXTRA_ARTISTS = {
    "Nicki Nicole": ["Wapo Traketero", "Colocao", "Mamichula", "Parte de Mí", "Ojos Verdes"],
    "Karol G": ["Tusa", "Provenza", "Bichota", "Si Antes Te Hubiera Conocido", "Mientras Me Curo del Cora"],
    "Selena Quintanilla": ["Como la Flor", "Bidi Bidi Bom Bom", "Amor Prohibido", "No Me Queda Más", "La Carcacha"],
    "Pedro Capó": ["Calma", "La Fiesta", "La Sábana y los Pies", "Buena Suerte", "Gracias"],
    "Sebastián Yatra": ["Tacones Rojos", "Traicionera", "Pareja del Año", "No Hay Nadie Más", "Robarte un Beso"],
    "J Balvin": ["Mi Gente", "Ay Vamos", "Ginza", "Rojo", "Azul"],
    "Luis Miguel": ["Ahora Te Puedes Marchar", "La Incondicional", "Hasta Que Me Olvides", "Culpable o No", "Suave"]
  };

  const EXTRA_ENRIQUE = [
    "Héroe",
    "Experiencia Religiosa",
    "Nunca Te Olvidaré",
    "Por Amarte",
    "Quizás"
  ];

  const originalEntries = Object.entries;
  let applied = false;

  Object.entries = function (obj) {
    const looksLikeSongArtists = obj
      && Array.isArray(obj.TINI)
      && Array.isArray(obj.Maluma)
      && Array.isArray(obj["Enrique Iglesias"]);

    if (!applied && looksLikeSongArtists) {
      Object.keys(EXTRA_ARTISTS).forEach((artist) => {
        if (!Array.isArray(obj[artist])) obj[artist] = [...EXTRA_ARTISTS[artist]];
      });

      EXTRA_ENRIQUE.forEach((title) => {
        if (!obj["Enrique Iglesias"].includes(title)) obj["Enrique Iglesias"].push(title);
      });

      applied = true;
      Object.entries = originalEntries;
    }

    return originalEntries(obj);
  };

  const COUNTS = {
    ...Object.fromEntries(Object.keys(EXTRA_ARTISTS).map((artist) => [artist, 5])),
    "Enrique Iglesias": 10
  };

  function refreshVisibleCounts() {
    const bank = Array.isArray(window.VAE_SONG_QUIZ_BANK) ? window.VAE_SONG_QUIZ_BANK : [];
    const totalSongs = bank.length || 145;
    const totalArtists = bank.length ? new Set(bank.map((song) => song.artist)).size : 28;

    const card = document.getElementById("song-quiz-feature");
    if (card) {
      card.dataset.songQuizCount = String(totalSongs);
      const meta = card.querySelectorAll(".song-feature-meta span");
      if (meta[0]) meta[0].textContent = `${totalArtists} artistas`;
      if (meta[1]) meta[1].textContent = `${totalSongs} músicas`;
    }

    document.querySelectorAll("[data-song-artist]").forEach((button) => {
      const artist = button.dataset.songArtist;
      const label = button.querySelector("span");
      if (!label) return;
      const count = COUNTS[artist] || (bank.length ? bank.filter((song) => song.artist === artist).length : 5);
      label.textContent = `${count} músicas · título oculto`;
    });
  }

  const observer = new MutationObserver(refreshVisibleCounts);
  observer.observe(document.documentElement, { childList: true, subtree: true });
  document.addEventListener("DOMContentLoaded", refreshVisibleCounts, { once: true });
  window.setTimeout(refreshVisibleCounts, 1200);
})();
