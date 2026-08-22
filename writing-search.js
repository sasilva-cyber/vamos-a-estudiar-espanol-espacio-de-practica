/* Pesquisador da biblioteca de Escritura. */
(function () {
  let searchTerm = "";
  let gridObserver = null;

  function normalize(value) {
    return String(value || "")
      .toLocaleLowerCase("es")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim();
  }

  function injectStyles() {
    if (document.getElementById("writing-search-styles")) return;
    const style = document.createElement("style");
    style.id = "writing-search-styles";
    style.textContent = `
      .writing-search-filter {
        display: grid;
        gap: 6px;
        flex: 1 1 340px;
        min-width: min(340px, 100%);
      }
      .writing-search-filter > span {
        font-size: .72rem;
        font-weight: 900;
        letter-spacing: .08em;
        text-transform: uppercase;
        color: var(--muted);
      }
      .writing-search-input {
        width: 100%;
        min-height: 44px;
        border: 1px solid var(--line);
        border-radius: 12px;
        background: #fff;
        color: var(--ink);
        padding: 10px 13px;
        font: inherit;
      }
      .writing-search-input:focus {
        outline: 2px solid rgba(143,29,44,.15);
        border-color: rgba(143,29,44,.42);
      }
      .writing-search-empty {
        margin: 18px 0 0;
        border: 1px dashed var(--line);
        border-radius: 16px;
        background: rgba(255,255,255,.6);
        color: var(--muted);
        padding: 18px;
        text-align: center !important;
      }
      @media (max-width: 820px) {
        .writing-search-filter {
          min-width: 0;
          width: 100%;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function ensureEmptyMessage(grid) {
    let empty = document.getElementById("writing-search-empty");
    if (!empty) {
      empty = document.createElement("p");
      empty.id = "writing-search-empty";
      empty.className = "writing-search-empty";
      empty.textContent = "No se encontraron prácticas con esta búsqueda.";
      empty.hidden = true;
      grid.insertAdjacentElement("afterend", empty);
    }
    return empty;
  }

  function applySearch() {
    const grid = document.getElementById("writing-grid");
    if (!grid) return;

    const cards = [...grid.querySelectorAll(".writing-card")];
    const needle = normalize(searchTerm);
    let visible = 0;

    cards.forEach((card) => {
      const matches = !needle || normalize(card.textContent).includes(needle);
      card.style.display = matches ? "" : "none";
      if (matches) visible += 1;
    });

    const count = document.getElementById("writing-count");
    if (count) count.textContent = `${visible} ${visible === 1 ? "práctica" : "prácticas"}`;

    const empty = ensureEmptyMessage(grid);
    empty.hidden = !(needle && cards.length && visible === 0);
  }

  function ensureSearch() {
    const toolbar = document.querySelector("#writing-screen .writing-toolbar");
    const grid = document.getElementById("writing-grid");
    if (!toolbar || !grid) return false;

    if (!document.getElementById("writing-search-input")) {
      const label = document.createElement("label");
      label.className = "writing-search-filter";
      label.innerHTML = `
        <span>Buscar práctica</span>
        <input
          id="writing-search-input"
          class="writing-search-input"
          type="search"
          inputmode="search"
          autocomplete="off"
          placeholder="Ej.: rutina, carta, opinión, teletrabajo…"
          aria-label="Buscar práctica de escritura"
        />
      `;
      toolbar.insertAdjacentElement("afterbegin", label);

      const input = label.querySelector("input");
      input.addEventListener("input", () => {
        searchTerm = input.value;
        applySearch();
      });
    }

    if (!gridObserver) {
      gridObserver = new MutationObserver(() => applySearch());
      gridObserver.observe(grid, { childList: true });
    }

    const levelFilter = document.getElementById("writing-level-filter");
    if (levelFilter && !levelFilter.dataset.searchBound) {
      levelFilter.dataset.searchBound = "true";
      levelFilter.addEventListener("change", () => setTimeout(applySearch, 0));
    }

    applySearch();
    return true;
  }

  function install() {
    injectStyles();
    if (!ensureSearch()) {
      setTimeout(install, 250);
      return;
    }

    document.addEventListener("click", (event) => {
      if (event.target.closest('[data-route="writing"]') || event.target.closest("#writing-back")) {
        setTimeout(() => {
          ensureSearch();
          applySearch();
        }, 0);
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", install, { once: true });
  } else {
    install();
  }
})();