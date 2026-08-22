/* Busca e filtro por nível para a biblioteca Escucha en español. */
(function () {
  let listeningSearchTerm = "";
  let listeningLevelFilter = "all";
  let observer = null;

  function normalize(value) {
    return (value || "").toLocaleLowerCase("es").normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  function injectStyles() {
    if (document.getElementById("listening-filter-styles")) return;
    const style = document.createElement("style");
    style.id = "listening-filter-styles";
    style.textContent = `
      .listening-toolbar {
        margin: 26px 0 4px;
        display: grid;
        grid-template-columns: minmax(0,1fr) minmax(220px,280px);
        gap: 14px;
        align-items: end;
      }
      .listening-search-wrap,
      .listening-level-wrap {
        display: grid;
        gap: 6px;
      }
      .listening-toolbar-label {
        color: var(--muted);
        font-size: .72rem;
        font-weight: 900;
        letter-spacing: .08em;
        text-transform: uppercase;
      }
      .listening-search,
      .listening-level-select {
        width: 100%;
        min-height: 46px;
        border: 1px solid var(--line);
        border-radius: 12px;
        background: #fff;
        color: var(--red-dark);
        padding: 10px 14px;
        font: inherit;
        font-weight: 700;
      }
      .listening-level-select {
        cursor: pointer;
        padding-right: 42px;
      }
      .listening-search:focus,
      .listening-level-select:focus {
        outline: 2px solid rgba(143,29,44,.15);
        border-color: rgba(143,29,44,.42);
      }
      .listening-filter-summary {
        grid-column: 1 / -1;
        margin: 0;
        color: var(--muted);
        font-size: .84rem;
        font-weight: 700;
      }
      .listening-empty-filter {
        grid-column: 1 / -1;
        border: 1px dashed var(--line);
        border-radius: 18px;
        background: rgba(255,255,255,.68);
        color: var(--muted);
        padding: 24px;
        text-align: center !important;
      }
      @media (max-width: 680px) {
        .listening-toolbar { grid-template-columns: 1fr; }
        .listening-filter-summary { grid-column: 1; }
      }
    `;
    document.head.appendChild(style);
  }

  function ensureToolbar() {
    const screen = document.getElementById("listening-screen");
    const grid = document.getElementById("listening-grid");
    if (!screen || !grid) return null;

    let toolbar = document.getElementById("listening-toolbar");
    if (toolbar) return toolbar;

    toolbar = document.createElement("div");
    toolbar.id = "listening-toolbar";
    toolbar.className = "listening-toolbar";
    toolbar.innerHTML = `
      <label class="listening-search-wrap">
        <span class="listening-toolbar-label">Buscar actividad</span>
        <input id="listening-search" class="listening-search" type="search" placeholder="Buscar por título, tema o palavra..." autocomplete="off" />
      </label>
      <label class="listening-level-wrap">
        <span class="listening-toolbar-label">Nivel</span>
        <select id="listening-level-filter" class="listening-level-select" aria-label="Filtrar atividades de escuta por nível">
          <option value="all">Todos los niveles</option>
          <option value="A1">A1 — Básico inicial</option>
          <option value="A2">A2 — Básico</option>
          <option value="B1">B1 — Intermedio</option>
          <option value="B2">B2 — Intermedio alto</option>
          <option value="C1">C1 — Avanzado</option>
          <option value="C2">C2 — Dominio avanzado</option>
        </select>
      </label>
      <p class="listening-filter-summary" id="listening-filter-summary" aria-live="polite"></p>
    `;

    grid.insertAdjacentElement("beforebegin", toolbar);

    const search = toolbar.querySelector("#listening-search");
    const level = toolbar.querySelector("#listening-level-filter");

    search.value = listeningSearchTerm;
    level.value = listeningLevelFilter;

    search.addEventListener("input", () => {
      listeningSearchTerm = search.value.trim();
      applyFilters();
    });

    level.addEventListener("change", () => {
      listeningLevelFilter = level.value;
      applyFilters();
    });

    return toolbar;
  }

  function applyFilters() {
    const grid = document.getElementById("listening-grid");
    if (!grid) return;
    ensureToolbar();

    const oldEmpty = grid.querySelector(".listening-empty-filter");
    oldEmpty?.remove();

    const cards = [...grid.querySelectorAll(".listening-card")];
    let visible = 0;
    const query = normalize(listeningSearchTerm);

    cards.forEach((card) => {
      const level = card.querySelector(".listening-level")?.textContent?.trim() || "";
      const haystack = normalize(card.textContent);
      const matchesLevel = listeningLevelFilter === "all" || level === listeningLevelFilter;
      const matchesSearch = !query || haystack.includes(query);
      const show = matchesLevel && matchesSearch;
      card.hidden = !show;
      if (show) visible += 1;
    });

    if (cards.length && visible === 0) {
      const empty = document.createElement("p");
      empty.className = "listening-empty-filter";
      empty.textContent = "Nenhuma atividade de escuta encontrada com esses filtros.";
      grid.appendChild(empty);
    }

    const summary = document.getElementById("listening-filter-summary");
    if (summary) {
      const suffix = listeningLevelFilter === "all" ? "em todos os níveis" : `no nível ${listeningLevelFilter}`;
      summary.textContent = `${visible} ${visible === 1 ? "atividade encontrada" : "atividades encontradas"} ${suffix}.`;
    }
  }

  function watchGrid() {
    const grid = document.getElementById("listening-grid");
    if (!grid || observer) return;
    observer = new MutationObserver(() => {
      window.requestAnimationFrame(applyFilters);
    });
    observer.observe(grid, { childList: true });
  }

  function install() {
    injectStyles();
    if (!ensureToolbar()) {
      setTimeout(install, 250);
      return;
    }
    watchGrid();
    applyFilters();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => setTimeout(install, 250), { once: true });
  } else {
    setTimeout(install, 250);
  }
})();