/* Carrega as atividades de Quiz preservadas e adiciona paginação à biblioteca de Gramática. */
(function () {
  const coreScript = document.createElement("script");
  coreScript.src = "quiz-activities-core.js?v=20260822-1719";
  coreScript.onload = installGrammarPagination;
  coreScript.onerror = installGrammarPagination;
  document.head.appendChild(coreScript);

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