/* Paginação da biblioteca de Vocabulário: 6 temas por página. */
(function () {
  if (typeof vocabularyData === "undefined" || typeof vocabularyGrid === "undefined" || !vocabularyGrid) return;
  if (typeof renderVocabularyCards !== "function") return;

  const VOCABULARY_PAGE_SIZE = 6;
  let vocabularyCurrentPage = 1;
  let vocabularyPaginationSignature = "";

  function ensureVocabularyPagination() {
    let pagination = document.getElementById("vocabulary-pagination");
    if (!pagination) {
      pagination = document.createElement("nav");
      pagination.id = "vocabulary-pagination";
      pagination.className = "vocabulary-pagination";
      pagination.setAttribute("aria-label", "Paginação dos temas de vocabulário");
      vocabularyGrid.insertAdjacentElement("afterend", pagination);
    }
    return pagination;
  }

  function injectVocabularyPaginationStyles() {
    if (document.getElementById("vocabulary-pagination-styles")) return;

    const style = document.createElement("style");
    style.id = "vocabulary-pagination-styles";
    style.textContent = `
      .vocabulary-pagination {
        margin: 28px 0 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        gap: 12px;
      }
      .vocabulary-pagination-button {
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
      .vocabulary-pagination-button:hover:not(:disabled),
      .vocabulary-pagination-button:focus-visible:not(:disabled) {
        background: #fff8f3;
        border-color: var(--red);
        transform: translateY(-1px);
        outline: none;
      }
      .vocabulary-pagination-button:disabled {
        opacity: .42;
        cursor: not-allowed;
      }
      .vocabulary-pagination-status {
        min-width: 180px;
        text-align: center !important;
        color: var(--muted);
        font-size: .86rem;
        font-weight: 800;
      }
      @media (max-width: 560px) {
        .vocabulary-pagination {
          display: grid;
          grid-template-columns: 1fr 1fr;
        }
        .vocabulary-pagination-status {
          grid-column: 1 / -1;
          grid-row: 1;
          min-width: 0;
        }
        .vocabulary-pagination-button {
          width: 100%;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function renderVocabularyPagination(totalItems, totalPages) {
    const pagination = ensureVocabularyPagination();

    if (!totalItems || totalPages <= 1) {
      pagination.innerHTML = "";
      pagination.hidden = true;
      return;
    }

    pagination.hidden = false;
    pagination.innerHTML = `
      <button class="vocabulary-pagination-button" id="vocabulary-page-prev" type="button" ${vocabularyCurrentPage === 1 ? "disabled" : ""}>← Página anterior</button>
      <span class="vocabulary-pagination-status">Página ${vocabularyCurrentPage} de ${totalPages} · ${totalItems} temas</span>
      <button class="vocabulary-pagination-button" id="vocabulary-page-next" type="button" ${vocabularyCurrentPage === totalPages ? "disabled" : ""}>Página seguinte →</button>
    `;

    document.getElementById("vocabulary-page-prev")?.addEventListener("click", () => {
      if (vocabularyCurrentPage <= 1) return;
      vocabularyCurrentPage -= 1;
      renderVocabularyCards();
      document.querySelector(".vocabulary-toolbar")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });

    document.getElementById("vocabulary-page-next")?.addEventListener("click", () => {
      if (vocabularyCurrentPage >= totalPages) return;
      vocabularyCurrentPage += 1;
      renderVocabularyCards();
      document.querySelector(".vocabulary-toolbar")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  renderVocabularyCards = function () {
    const query = vocabularySearch?.value.trim().toLocaleLowerCase("pt-BR") || "";
    vocabularyGrid.innerHTML = "";

    const matches = Object.entries(vocabularyData)
      .filter(([, topic]) => vocabularyFilter === "all" || topic.group === vocabularyFilter)
      .filter(([, topic]) => !query || `${topic.title} ${topic.description} ${topic.items.flat().join(" ")}`.toLocaleLowerCase("pt-BR").includes(query));

    const signature = `${vocabularyFilter}|${query}`;
    if (signature !== vocabularyPaginationSignature) {
      vocabularyPaginationSignature = signature;
      vocabularyCurrentPage = 1;
    }

    if (!matches.length) {
      vocabularyGrid.innerHTML = '<p class="vocabulary-empty">Nenhum tema encontrado com esse filtro.</p>';
      renderVocabularyPagination(0, 0);
      return;
    }

    const totalPages = Math.ceil(matches.length / VOCABULARY_PAGE_SIZE);
    if (vocabularyCurrentPage > totalPages) vocabularyCurrentPage = totalPages;

    const start = (vocabularyCurrentPage - 1) * VOCABULARY_PAGE_SIZE;
    const pageTopics = matches.slice(start, start + VOCABULARY_PAGE_SIZE);

    pageTopics.forEach(([id, topic]) => {
      const card = document.createElement("article");
      card.className = "vocabulary-card";
      card.innerHTML = `
        <div class="vocabulary-card-top">
          <span class="vocabulary-level">${topic.level}</span>
          <span class="vocabulary-count">${topic.items.length} termos</span>
        </div>
        <p class="vocabulary-group">${topic.group}</p>
        <h2>${topic.title}</h2>
        <p>${topic.description}</p>
        <div class="vocabulary-card-footer">
          <button class="secondary-button" type="button" data-open-vocabulary="${id}">Estudiar vocabulario</button>
          <span class="vocabulary-status">${vocabularyIsStudied(id) ? "✓ Estudiado" : ""}</span>
        </div>`;
      vocabularyGrid.appendChild(card);
    });

    vocabularyGrid.querySelectorAll("[data-open-vocabulary]").forEach((button) => {
      button.addEventListener("click", () => openVocabularyTopic(button.dataset.openVocabulary));
    });

    renderVocabularyPagination(matches.length, totalPages);
  };

  vocabularySearch?.addEventListener("input", () => {
    vocabularyCurrentPage = 1;
    renderVocabularyCards();
  });

  injectVocabularyPaginationStyles();
  renderVocabularyCards();
})();

/* Carrega os testes de compreensão leitora depois das extensões do Quiz. */
(function loadReadingTests() {
  if (document.getElementById("reading-tests-loader")) return;
  const script = document.createElement("script");
  script.id = "reading-tests-loader";
  script.src = "reading-tests.js?v=20260822-1750";
  document.head.appendChild(script);
})();

/* Carrega as imagens temáticas das últimas aulas de Gramática na página inicial. */
(function loadHomeGrammarImages() {
  if (document.getElementById("home-grammar-images-loader")) return;
  const script = document.createElement("script");
  script.id = "home-grammar-images-loader";
  script.src = "home-grammar-images.js?v=20260822-1807";
  document.head.appendChild(script);
})();