/* Menu principal com submenu suspenso em Gramática. */
(function () {
  const SUB_ROUTES = ["vocabulary", "readings", "writing"];
  const LABELS = { vocabulary: "Vocabulario", readings: "Lectura", writing: "Escritura" };
  let observer = null;

  function injectStyles() {
    if (document.getElementById("grammar-dropdown-nav-styles")) return;
    const style = document.createElement("style");
    style.id = "grammar-dropdown-nav-styles";
    style.textContent = `
      .main-nav .grammar-nav-group{position:relative;display:inline-flex;align-items:center;flex:0 0 auto}
      .main-nav .grammar-nav-main{display:inline-flex;align-items:center;gap:3px}
      .main-nav .grammar-nav-toggle{width:30px;min-width:30px;height:36px;margin-left:-8px;padding:0;border:0;border-radius:999px;display:grid;place-items:center;background:transparent;color:var(--muted);cursor:pointer;transition:background .16s ease,color .16s ease,transform .16s ease}
      .main-nav .grammar-nav-toggle:hover,.main-nav .grammar-nav-toggle:focus-visible{background:#fff3ee;color:var(--red-dark);outline:none}
      .main-nav .grammar-nav-toggle svg{width:14px;height:14px;transition:transform .18s ease}
      .main-nav .grammar-nav-group.open .grammar-nav-toggle svg,.main-nav .grammar-nav-group:hover .grammar-nav-toggle svg,.main-nav .grammar-nav-group:focus-within .grammar-nav-toggle svg{transform:rotate(180deg)}
      .main-nav .grammar-nav-dropdown{position:absolute;z-index:1000;top:calc(100% + 9px);left:50%;transform:translate(-50%,-8px);width:210px;padding:9px;border:1px solid var(--line);border-radius:16px;background:rgba(255,255,255,.98);box-shadow:0 18px 42px rgba(80,42,28,.16);opacity:0;visibility:hidden;pointer-events:none;transition:opacity .16s ease,transform .16s ease,visibility .16s ease}
      .main-nav .grammar-nav-dropdown::before{content:"";position:absolute;top:-6px;left:50%;width:12px;height:12px;transform:translateX(-50%) rotate(45deg);border-left:1px solid var(--line);border-top:1px solid var(--line);background:#fff}
      .main-nav .grammar-nav-group.open .grammar-nav-dropdown,.main-nav .grammar-nav-group:hover .grammar-nav-dropdown,.main-nav .grammar-nav-group:focus-within .grammar-nav-dropdown{opacity:1;visibility:visible;pointer-events:auto;transform:translate(-50%,0)}
      .main-nav .grammar-nav-dropdown .nav-link{width:100%;min-height:42px;display:flex!important;align-items:center;justify-content:flex-start;margin:0;padding:10px 12px!important;border-radius:11px;text-align:left;white-space:nowrap}
      .main-nav .grammar-nav-dropdown .nav-link::before{content:"—";margin-right:9px;color:var(--gold);font-weight:900}
      .main-nav .grammar-nav-dropdown .nav-link:hover,.main-nav .grammar-nav-dropdown .nav-link:focus-visible,.main-nav .grammar-nav-dropdown .nav-link.active{background:#fff5ef;color:var(--red-dark)}
      .main-nav .grammar-nav-group.has-sub-active > .grammar-nav-main{color:var(--red-dark);background:#fff4ef}
      @media (min-width:821px){.main-nav{overflow:visible!important}}
      @media (max-width:820px){
        .main-nav .grammar-nav-group{scroll-snap-align:start}
        .main-nav .grammar-nav-toggle{min-height:44px;height:44px;margin-left:-10px}
        .main-nav .grammar-nav-dropdown{position:fixed;top:132px;left:50%;width:min(280px,calc(100vw - 28px));transform:translate(-50%,-8px)}
        .main-nav .grammar-nav-group:hover:not(.open) .grammar-nav-dropdown{opacity:0;visibility:hidden;pointer-events:none;transform:translate(-50%,-8px)}
        .main-nav .grammar-nav-group.open .grammar-nav-dropdown,.main-nav .grammar-nav-group:focus-within .grammar-nav-dropdown{opacity:1;visibility:visible;pointer-events:auto;transform:translate(-50%,0)}
      }
    `;
    document.head.appendChild(style);
  }

  function syncActive(group) {
    const subActive = SUB_ROUTES.some((route) => document.querySelector(`.main-nav [data-route="${route}"]`)?.classList.contains("active"));
    group.classList.toggle("has-sub-active", subActive);
  }

  function close(group) {
    group.classList.remove("open");
    group.querySelector(".grammar-nav-toggle")?.setAttribute("aria-expanded", "false");
  }

  function installMenu() {
    const nav = document.querySelector(".main-nav");
    if (!nav) return false;

    const existing = nav.querySelector(".grammar-nav-group");
    if (existing) {
      syncActive(existing);
      return true;
    }

    const grammar = nav.querySelector('[data-route="grammar"]');
    const vocabulary = nav.querySelector('[data-route="vocabulary"]');
    const readings = nav.querySelector('[data-route="readings"]');
    const writing = nav.querySelector('[data-route="writing"]');
    if (!grammar || !vocabulary || !readings || !writing) return false;

    const group = document.createElement("div");
    group.className = "grammar-nav-group";

    grammar.classList.add("grammar-nav-main");
    grammar.insertAdjacentElement("beforebegin", group);
    group.appendChild(grammar);

    const toggle = document.createElement("button");
    toggle.type = "button";
    toggle.className = "grammar-nav-toggle";
    toggle.setAttribute("aria-label", "Abrir submenu de Gramática");
    toggle.setAttribute("aria-expanded", "false");
    toggle.innerHTML = '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M5 7.5 10 12.5 15 7.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    group.appendChild(toggle);

    const dropdown = document.createElement("div");
    dropdown.className = "grammar-nav-dropdown";
    dropdown.setAttribute("role", "menu");
    dropdown.setAttribute("aria-label", "Conteúdos de Gramática");
    [vocabulary, readings, writing].forEach((button) => {
      const route = button.dataset.route;
      if (LABELS[route]) button.textContent = LABELS[route];
      button.setAttribute("role", "menuitem");
      dropdown.appendChild(button);
    });
    group.appendChild(dropdown);

    toggle.addEventListener("click", (event) => {
      event.stopPropagation();
      const open = group.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });

    dropdown.querySelectorAll(".nav-link").forEach((button) => button.addEventListener("click", () => close(group)));
    document.addEventListener("click", (event) => { if (!group.contains(event.target)) close(group); });
    document.addEventListener("keydown", (event) => { if (event.key === "Escape") close(group); });

    syncActive(group);
    return true;
  }

  function install() {
    injectStyles();
    if (!installMenu()) { setTimeout(install, 220); return; }

    const nav = document.querySelector(".main-nav");
    if (!nav || observer) return;
    observer = new MutationObserver(() => {
      const group = nav.querySelector(".grammar-nav-group");
      if (!group) installMenu();
      else syncActive(group);
    });
    observer.observe(nav, { childList:true, subtree:true, attributes:true, attributeFilter:["class"] });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", install, { once:true });
  else install();
})();
