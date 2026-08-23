/* Harmoniza o destaque Jugando y aprendiendo com o bloco Últimas de Gramática. */
(function () {
  const root = window.__VAE_ROOT__ || (location.hostname.toLowerCase().endsWith('.github.io') ? '/vamos-a-estudiar-espanol-espacio-de-practica/' : '/');

  function ensureScript(id, file) {
    if (document.getElementById(id)) return;
    const script = document.createElement('script');
    script.id = id;
    script.src = root + file;
    script.defer = true;
    document.head.appendChild(script);
  }

  function ensureNewsletter() {
    ensureScript('home-newsletter-loader', 'home-newsletter.js?v=20260823-1042');
    ensureScript('home-game-order-loader', 'home-game-before-grammar.js?v=20260823-1042');
  }

  function apply() {
    const section = document.getElementById("home-false-friends-showcase");
    if (!section) {
      setTimeout(apply, 180);
      return;
    }

    ensureNewsletter();

    const eyebrow = section.querySelector(".eyebrow");
    const title = section.querySelector("#home-ff-title");
    const copy = section.querySelector(".home-ff-copy > p:last-of-type");
    if (eyebrow) eyebrow.textContent = "Juego visual · Falsos amigos";
    if (title) title.textContent = "Jugando y aprendiendo";
    if (copy) copy.textContent = "Avance por níveis, reconheça falsos amigos entre o espanhol e o português e amplie seu vocabulário enquanto joga.";

    if (!document.getElementById("home-jugando-layout-styles")) {
      const style = document.createElement("style");
      style.id = "home-jugando-layout-styles";
      style.textContent = `
        #home-false-friends-showcase.home-ff-showcase {
          width: auto !important;
          max-width: none !important;
          margin: 34px 0 0 !important;
          padding: 30px clamp(20px,4vw,34px) 26px !important;
          box-sizing: border-box;
          border: 1px solid var(--line) !important;
          border-radius: 26px !important;
          background: rgba(255,255,255,.74) !important;
          box-shadow: 0 12px 36px rgba(70,40,20,.055) !important;
        }
        #home-false-friends-showcase .home-ff-inner {
          grid-template-columns: minmax(210px,.72fr) minmax(0,1.28fr) !important;
          gap: clamp(26px,4vw,46px) !important;
          align-items: center !important;
        }
        #home-false-friends-showcase .home-ff-visual {
          min-height: 205px !important;
        }
        #home-false-friends-showcase .home-ff-card {
          width: 118px !important;
          border-radius: 50% !important;
          border: 7px solid #fff !important;
          background: linear-gradient(145deg,#fff8ec 0%,#f7e7dc 52%,#f1d7d7 100%) !important;
          box-shadow: 0 8px 24px rgba(88,45,24,.11) !important;
        }
        #home-false-friends-showcase .home-ff-card:last-child {
          background: linear-gradient(145deg,#fff8ec 0%,#f7e7dc 52%,#f1d7d7 100%) !important;
        }
        #home-false-friends-showcase .home-ff-vs {
          width: 48px !important;
          height: 48px !important;
          background: var(--red) !important;
          box-shadow: 0 8px 18px rgba(143,29,44,.16) !important;
        }
        #home-false-friends-showcase .home-ff-copy {
          text-align: left !important;
        }
        #home-false-friends-showcase .home-ff-copy .eyebrow {
          justify-content: flex-start !important;
        }
        #home-false-friends-showcase .home-ff-copy h2 {
          margin: 4px 0 12px !important;
          font-size: clamp(1.65rem,3.4vw,2.35rem) !important;
          line-height: 1.12 !important;
        }
        #home-false-friends-showcase .home-ff-copy > p:last-of-type {
          max-width: 720px !important;
          margin: 0 !important;
          line-height: 1.7 !important;
          text-align: justify !important;
          text-justify: inter-word;
        }
        #home-false-friends-showcase .home-ff-badges,
        #home-false-friends-showcase .home-ff-actions {
          justify-content: flex-start !important;
        }
        #home-false-friends-showcase .home-ff-play {
          min-width: 185px !important;
          min-height: 48px !important;
          border-radius: 13px !important;
          box-shadow: none !important;
        }
        #home-false-friends-showcase .home-ff-best {
          color: var(--muted) !important;
        }
        @media (max-width:760px) {
          #home-false-friends-showcase.home-ff-showcase {
            padding: 24px 18px !important;
          }
          #home-false-friends-showcase .home-ff-inner {
            grid-template-columns: 1fr !important;
          }
          #home-false-friends-showcase .home-ff-copy,
          #home-false-friends-showcase .home-ff-copy > p:last-of-type {
            text-align: left !important;
          }
          #home-false-friends-showcase .home-ff-copy .eyebrow,
          #home-false-friends-showcase .home-ff-badges,
          #home-false-friends-showcase .home-ff-actions {
            justify-content: center !important;
          }
          #home-false-friends-showcase .home-ff-copy h2 {
            text-align: center !important;
          }
        }
      `;
      document.head.appendChild(style);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", apply, { once: true });
  } else {
    apply();
  }
})();
