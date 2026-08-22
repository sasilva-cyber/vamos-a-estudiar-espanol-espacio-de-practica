/* Carrega as atividades de Quiz preservadas, pagina a Gramática e destaca as últimas aulas na página inicial. */
(function () {
  const coreScript = document.createElement("script");
  coreScript.src = "quiz-activities-core.js?v=20260822-1742";
  coreScript.onload = initializeEnhancements;
  coreScript.onerror = initializeEnhancements;
  document.head.appendChild(coreScript);

  function initializeEnhancements() {
    installGrammarPagination();
    installHomeGrammarShowcase();
  }

  function installHomeGrammarShowcase() {
    if (typeof grammarLessons === "undefined" || typeof openGrammarLesson !== "function") return;

    const homeScreen = document.getElementById("home-screen");
    const featureGrid = homeScreen?.querySelector(".feature-grid");
    if (!homeScreen || !featureGrid || document.getElementById("home-grammar-showcase")) return;

    const groups = [...new Set(grammarLessons.map((lesson) => lesson.group))];
    const section = document.createElement("section");
    section.id = "home-grammar-showcase";
    section.className = "home-grammar-showcase";
    section.setAttribute("aria-labelledby", "home-grammar-title");
    section.innerHTML = `
      <div class="home-grammar-head">
        <div>
          <p class="eyebrow">Últimas de Gramática</p>
          <h2 id="home-grammar-title">Continue estudando espanhol</h2>
        </div>
        <div class="home-grammar-browse">
          <span class="home-grammar-browse-label">Navegue por</span>
          <label class="home-grammar-select-wrap">
            <span>Categoria</span>
            <select id="home-grammar-category" class="home-grammar-select" aria-label="Escolher categoria de gramática">
              <option value="all">Todas as categorias</option>
              ${groups.map((group) => `<option value="${group}">${group}</option>`).join("")}
            </select>
          </label>
        </div>
      </div>
      <div class="home-grammar-items" id="home-grammar-items"></div>
      <div class="home-grammar-footer">
        <button class="text-cta" type="button" data-route="grammar">Ver todas as aulas de gramática →</button>
      </div>
    `;

    featureGrid.insertAdjacentElement("afterend", section);

    const select = section.querySelector("#home-grammar-category");
    const items = section.querySelector("#home-grammar-items");

    function renderHomeGrammarItems() {
      const selectedGroup = select.value;
      const latest = [...grammarLessons]
        .reverse()
        .filter((lesson) => selectedGroup === "all" || lesson.group === selectedGroup)
        .slice(0, 3);

      items.innerHTML = latest.map((lesson, index) => `
        <button class="home-grammar-item" type="button" data-home-grammar="${lesson.id}" aria-label="Estudar ${lesson.title}">
          <span class="home-grammar-circle" aria-hidden="true">
            <span class="home-grammar-circle-level">${lesson.level}</span>
            <strong>${String(index + 1).padStart(2, "0")}</strong>
          </span>
          <span class="home-grammar-item-copy">
            <small>${lesson.group}</small>
            <strong>${lesson.title}</strong>
            <span>${lesson.category} · ${lesson.time}</span>
          </span>
        </button>
      `).join("");

      if (!latest.length) {
        items.innerHTML = '<p class="home-grammar-empty">Não há aulas nesta categoria.</p>';
      }

      items.querySelectorAll("[data-home-grammar]").forEach((button) => {
        button.addEventListener("click", () => openGrammarLesson(button.dataset.homeGrammar));
      });
    }

    select.addEventListener("change", renderHomeGrammarItems);

    section.querySelector('[data-route="grammar"]')?.addEventListener("click", () => {
      if (typeof showGrammarLibrary === "function") showGrammarLibrary();
    });

    injectHomeGrammarStyles();
    renderHomeGrammarItems();
  }

  function injectHomeGrammarStyles() {
    if (document.getElementById("home-grammar-showcase-styles")) return;
    const style = document.createElement("style");
    style.id = "home-grammar-showcase-styles";
    style.textContent = `
      .home-grammar-showcase {
        margin-top: 34px;
        padding: 30px clamp(20px,4vw,34px) 26px;
        border: 1px solid var(--line);
        border-radius: 26px;
        background: rgba(255,255,255,.74);
        box-shadow: 0 12px 36px rgba(70,40,20,.055);
      }
      .home-grammar-head {
        display: flex;
        align-items: end;
        justify-content: space-between;
        gap: 24px;
        margin-bottom: 28px;
      }
      .home-grammar-head h2 {
        font-size: clamp(1.65rem,3.4vw,2.35rem);
      }
      .home-grammar-browse {
        min-width: min(420px,100%);
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 14px;
      }
      .home-grammar-browse-label {
        color: var(--ink);
        font-size: .76rem;
        font-weight: 900;
        letter-spacing: .12em;
        text-transform: uppercase;
        white-space: nowrap;
      }
      .home-grammar-select-wrap {
        min-width: 250px;
        display: grid;
        gap: 5px;
      }
      .home-grammar-select-wrap > span {
        color: var(--muted);
        font-size: .68rem;
        font-weight: 900;
        letter-spacing: .08em;
        text-transform: uppercase;
      }
      .home-grammar-select {
        width: 100%;
        min-height: 48px;
        border: 1px solid var(--line);
        border-radius: 10px;
        background: #fff;
        color: var(--red-dark);
        padding: 10px 42px 10px 14px;
        font: inherit;
        font-weight: 800;
        cursor: pointer;
      }
      .home-grammar-select:focus {
        outline: 2px solid rgba(143,29,44,.15);
        border-color: rgba(143,29,44,.42);
      }
      .home-grammar-items {
        display: grid;
        grid-template-columns: repeat(3,minmax(0,1fr));
        gap: clamp(16px,2.4vw,26px);
      }
      .home-grammar-item {
        min-width: 0;
        border: 0;
        background: transparent;
        padding: 0;
        color: inherit;
        text-align: center;
        cursor: pointer;
      }
      .home-grammar-circle {
        width: clamp(132px,15vw,168px);
        aspect-ratio: 1;
        margin: 0 auto 16px;
        border: 7px solid #fff;
        border-radius: 50%;
        background:
          radial-gradient(circle at 30% 24%, rgba(224,163,41,.24), transparent 31%),
          linear-gradient(145deg,#fff8ec 0%,#f7e7dc 48%,#f1d7d7 100%);
        box-shadow: 0 8px 24px rgba(88,45,24,.11);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 4px;
        transition: transform .18s ease, box-shadow .18s ease, border-color .18s ease;
      }
      .home-grammar-item:hover .home-grammar-circle,
      .home-grammar-item:focus-visible .home-grammar-circle {
        transform: translateY(-5px);
        box-shadow: 0 16px 30px rgba(88,45,24,.15);
        border-color: #fff9ed;
      }
      .home-grammar-item:focus-visible { outline: none; }
      .home-grammar-circle-level {
        color: var(--red);
        font-size: .72rem;
        font-weight: 900;
        letter-spacing: .05em;
      }
      .home-grammar-circle strong {
        color: var(--red-dark);
        font-family: Georgia,"Times New Roman",serif;
        font-size: clamp(2.2rem,4vw,3.15rem);
        line-height: 1;
      }
      .home-grammar-item-copy {
        display: grid;
        justify-items: center;
        gap: 5px;
      }
      .home-grammar-item-copy small {
        color: var(--muted);
        font-size: .7rem;
        font-weight: 900;
        letter-spacing: .08em;
        text-transform: uppercase;
      }
      .home-grammar-item-copy > strong {
        max-width: 280px;
        color: var(--red-dark);
        font-family: Georgia,"Times New Roman",serif;
        font-size: 1.08rem;
        line-height: 1.25;
      }
      .home-grammar-item-copy > span {
        color: var(--muted);
        font-size: .78rem;
        font-weight: 700;
      }
      .home-grammar-footer {
        display: flex;
        justify-content: flex-end;
        margin-top: 24px;
      }
      .home-grammar-empty {
        grid-column: 1/-1;
        text-align: center !important;
        color: var(--muted);
        padding: 24px;
      }
      @media (max-width: 800px) {
        .home-grammar-head { align-items: stretch; flex-direction: column; }
        .home-grammar-browse { min-width: 0; justify-content: stretch; }
        .home-grammar-select-wrap { flex: 1; min-width: 0; }
      }
      @media (max-width: 640px) {
        .home-grammar-showcase { padding: 24px 18px; }
        .home-grammar-browse { align-items: stretch; flex-direction: column; }
        .home-grammar-items { grid-template-columns: 1fr; gap: 24px; }
        .home-grammar-circle { width: 148px; }
        .home-grammar-footer { justify-content: center; }
      }
    `;
    document.head.appendChild(style);
  }

  function installGrammarPagination() {
    if (typeof renderGrammarCards !== "function" || typeof grammarLessons === "undefined" || !grammarGrid) return;

    const GRAMMAR_PAGE_SIZE = 6;
    let grammarCurrentPage = 1;
    let grammarPaginationSignature = "";

    function ensureGrammarPagination() {
      let pagination = document.getElementById("grammar-pagination");
      if (!pagination) {
        pagination = document.createElement("nav");
        pagination.id = "grammar-pagination";
        pagination.className = "grammar-pagination";
        pagination.setAttribute("aria-label", "Paginação das aulas de gramática");
        grammarGrid.insertAdjacentElement("afterend", pagination);
      }
      return pagination;
    }

    function injectGrammarPaginationStyles() {
      if (document.getElementById("grammar-pagination-styles")) return;
      const style = document.createElement("style");
      style.id = "grammar-pagination-styles";
      style.textContent = `
        .grammar-pagination {
          margin: 28px 0 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          gap: 12px;
        }
        .grammar-pagination-button {
          min-height: 44px;
          border: 1px solid rgba(143,29,44,.30);
          border-radius: 13px;
          background: #fff;
          color: var(--red);
          padding: 10px 16px;
          font: inherit;
          font-weight: 900;
          cursor: pointer;
          transition: background .15s ease, border-color .15s ease, transform .15s ease;
        }
        .grammar-pagination-button:hover:not(:disabled),
        .grammar-pagination-button:focus-visible:not(:disabled) {
          background: #fff8f3;
          border-color: var(--red);
          transform: translateY(-1px);
          outline: none;
        }
        .grammar-pagination-button:disabled {
          opacity: .42;
          cursor: not-allowed;
        }
        .grammar-pagination-status {
          min-width: 170px;
          text-align: center !important;
          color: var(--muted);
          font-size: .86rem;
          font-weight: 800;
        }
        @media (max-width: 560px) {
          .grammar-pagination {
            display: grid;
            grid-template-columns: 1fr 1fr;
          }
          .grammar-pagination-status {
            grid-column: 1 / -1;
            grid-row: 1;
            min-width: 0;
          }
          .grammar-pagination-button {
            width: 100%;
          }
        }
      `;
      document.head.appendChild(style);
    }

    function renderGrammarPagination(totalItems, totalPages) {
      const pagination = ensureGrammarPagination();

      if (!totalItems || totalPages <= 1) {
        pagination.innerHTML = "";
        pagination.hidden = true;
        return;
      }

      pagination.hidden = false;
      pagination.innerHTML = `
        <button class="grammar-pagination-button" id="grammar-page-prev" type="button" ${grammarCurrentPage === 1 ? "disabled" : ""}>← Página anterior</button>
        <span class="grammar-pagination-status">Página ${grammarCurrentPage} de ${totalPages} · ${totalItems} aulas</span>
        <button class="grammar-pagination-button" id="grammar-page-next" type="button" ${grammarCurrentPage === totalPages ? "disabled" : ""}>Página seguinte →</button>
      `;

      document.getElementById("grammar-page-prev")?.addEventListener("click", () => {
        if (grammarCurrentPage <= 1) return;
        grammarCurrentPage -= 1;
        renderGrammarCards();
        document.querySelector(".grammar-toolbar")?.scrollIntoView({ behavior: "smooth", block: "start" });
      });

      document.getElementById("grammar-page-next")?.addEventListener("click", () => {
        if (grammarCurrentPage >= totalPages) return;
        grammarCurrentPage += 1;
        renderGrammarCards();
        document.querySelector(".grammar-toolbar")?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }

    renderGrammarCards = function () {
      if (!grammarGrid) return;
      grammarGrid.innerHTML = "";

      const matches = grammarLessons.filter((lesson) => {
        const matchesCategory = grammarCategoryFilter === "all" || lesson.group === grammarCategoryFilter;
        const matchesLevel = grammarLevelFilter === "all" || lesson.level === grammarLevelFilter;
        const haystack = `${lesson.title} ${lesson.description} ${lesson.category} ${lesson.group} ${lesson.summary.join(" ")}`.toLocaleLowerCase("pt-BR");
        return matchesCategory && matchesLevel && (!grammarSearchTerm || haystack.includes(grammarSearchTerm));
      });

      const signature = `${grammarCategoryFilter}|${grammarLevelFilter}|${grammarSearchTerm}`;
      if (signature !== grammarPaginationSignature) {
        grammarPaginationSignature = signature;
        grammarCurrentPage = 1;
      }

      if (!matches.length) {
        grammarGrid.innerHTML = '<p class="grammar-empty">Nenhuma aula encontrada com esses filtros.</p>';
        renderGrammarPagination(0, 0);
        return;
      }

      const totalPages = Math.ceil(matches.length / GRAMMAR_PAGE_SIZE);
      if (grammarCurrentPage > totalPages) grammarCurrentPage = totalPages;

      const start = (grammarCurrentPage - 1) * GRAMMAR_PAGE_SIZE;
      const pageLessons = matches.slice(start, start + GRAMMAR_PAGE_SIZE);

      pageLessons.forEach((lesson) => {
        const card = document.createElement("article");
        card.className = "grammar-card";
        card.innerHTML = `
          <div class="grammar-card-top">
            <span class="grammar-level">${lesson.level}</span>
            <span class="grammar-time">${lesson.time}</span>
          </div>
          <span class="grammar-card-group">${lesson.group}</span>
          <p class="grammar-category">${lesson.category}</p>
          <h2>${lesson.title}</h2>
          <p>${lesson.description}</p>
          <div class="grammar-card-footer">
            <button class="primary-button" type="button" data-open-grammar="${lesson.id}">Estudiar</button>
            <span class="grammar-status">${grammarIsStudied(lesson.id) ? "✓ Estudiada" : ""}</span>
          </div>`;
        grammarGrid.appendChild(card);
      });

      grammarGrid.querySelectorAll("[data-open-grammar]").forEach((button) => {
        button.addEventListener("click", () => openGrammarLesson(button.dataset.openGrammar));
      });

      renderGrammarPagination(matches.length, totalPages);
    };

    injectGrammarPaginationStyles();
    renderGrammarCards();
  }
})();