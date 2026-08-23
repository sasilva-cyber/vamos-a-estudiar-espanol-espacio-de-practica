/* Resumo do último teste de nivelamento na Área do Estudiante. */
(function () {
  const card = document.getElementById("placement-summary");
  const badge = document.getElementById("placement-summary-level");
  const status = document.getElementById("placement-summary-status");
  const cta = document.getElementById("placement-summary-cta");
  if (!card || !badge || !status || !cta) return;

  const LEVEL_LABELS = {
    A1: "Iniciante",
    A2: "Básico",
    B1: "Intermediário",
    B2: "Intermediário avançado",
    C1: "Avançado",
    C2: "Proficiência elevada"
  };

  function installStyles() {
    if (document.getElementById("placement-summary-premium-styles")) return;
    const style = document.createElement("style");
    style.id = "placement-summary-premium-styles";
    style.textContent = `
      .placement-summary{
        position:relative;
        overflow:hidden;
        display:grid;
        grid-template-columns:minmax(0,1.28fr) minmax(300px,.72fr);
        gap:clamp(28px,4vw,48px);
        align-items:stretch;
        padding:clamp(28px,4vw,42px);
        border:1px solid rgba(143,29,44,.13);
        border-radius:30px;
        background:
          radial-gradient(circle at 0 0,rgba(240,179,58,.14),transparent 27%),
          radial-gradient(circle at 78% 115%,rgba(143,29,44,.08),transparent 35%),
          linear-gradient(145deg,#fffaf2 0%,#fff 58%,#fbf2ea 100%);
        box-shadow:0 20px 48px rgba(77,45,24,.08);
      }
      .placement-summary::before{
        content:"Ñ";
        position:absolute;
        left:-28px;
        bottom:-70px;
        color:rgba(143,29,44,.035);
        font:700 210px/1 Georgia,"Times New Roman",serif;
        pointer-events:none;
      }
      .placement-summary::after{
        content:"";
        position:absolute;
        top:0;
        left:clamp(28px,4vw,42px);
        width:68px;
        height:4px;
        border-radius:0 0 999px 999px;
        background:linear-gradient(90deg,#e0a329,#8f1d2c);
        pointer-events:none;
      }
      .placement-summary-copy{position:relative;z-index:1;display:flex;flex-direction:column;justify-content:center;min-width:0}
      .placement-summary .student-section-kicker{
        display:inline-flex;
        align-items:center;
        gap:9px;
        width:fit-content;
        margin:0 0 10px;
        color:#8f1d2c;
        font-size:.76rem;
        font-weight:900;
        letter-spacing:.11em;
        text-transform:uppercase;
      }
      .placement-summary .student-section-kicker::before{content:"";width:22px;height:2px;border-radius:999px;background:#e0a329}
      .placement-summary-copy h2{
        max-width:680px;
        margin:0;
        color:#6e1521;
        font-family:Georgia,"Times New Roman",serif;
        font-size:clamp(2.05rem,4vw,3rem);
        line-height:1.04;
        letter-spacing:-.025em;
      }
      .placement-summary-copy>p{
        max-width:720px;
        margin:14px 0 0;
        color:#5c514a;
        font-size:.96rem;
        line-height:1.75;
      }
      .placement-summary-highlights{display:flex;flex-wrap:wrap;gap:8px;margin-top:20px}
      .placement-summary-highlight{
        display:inline-flex;
        align-items:center;
        min-height:32px;
        padding:6px 11px;
        border:1px solid rgba(143,29,44,.10);
        border-radius:999px;
        background:rgba(255,255,255,.75);
        color:#6d5b50;
        font-size:.74rem;
        font-weight:800;
        box-shadow:0 4px 12px rgba(77,45,24,.035);
      }
      .placement-summary-highlight strong{margin-right:4px;color:#8f1d2c;font-weight:950}
      .placement-summary-result{
        display:grid;
        grid-template-columns:auto minmax(0,1fr);
        gap:14px;
        align-items:center;
        margin-top:24px;
        padding:14px;
        max-width:720px;
        border:1px solid rgba(143,29,44,.10);
        border-radius:20px;
        background:rgba(255,255,255,.78);
        box-shadow:0 10px 26px rgba(77,45,24,.045);
      }
      .placement-summary-level{
        width:72px;
        height:72px;
        flex:0 0 72px;
        border-radius:22px;
        display:grid;
        place-items:center;
        background:linear-gradient(160deg,#a01f32,#821724);
        color:#fff;
        font-family:Georgia,"Times New Roman",serif;
        font-size:1.9rem;
        font-weight:900;
        box-shadow:0 12px 24px rgba(143,29,44,.20);
      }
      .placement-summary.has-result .placement-summary-level{background:linear-gradient(160deg,#8f1d2c,#68111d)}
      .placement-summary-status-wrap{min-width:0}
      .placement-summary-result-label{
        display:block;
        margin-bottom:4px;
        color:#9b6b21;
        font-size:.68rem;
        font-weight:900;
        letter-spacing:.08em;
        text-transform:uppercase;
      }
      .placement-summary-status{margin:0!important;color:#4d4540!important;font-size:.86rem!important;font-weight:760;line-height:1.55!important}
      .placement-summary-side{
        position:relative;
        z-index:1;
        overflow:hidden;
        display:flex;
        flex-direction:column;
        justify-content:center;
        min-height:100%;
        padding:clamp(24px,3vw,30px);
        border:1px solid rgba(255,255,255,.10);
        border-radius:25px;
        background:
          radial-gradient(circle at 100% 0,rgba(255,255,255,.11),transparent 28%),
          linear-gradient(160deg,#a01f32 0%,#8f1d2c 55%,#76131f 100%);
        color:#fff;
        box-shadow:0 22px 42px rgba(110,21,33,.20);
      }
      .placement-summary-side::after{
        content:"Ñ";
        position:absolute;
        right:-14px;
        bottom:-30px;
        color:rgba(255,255,255,.055);
        font:700 112px/1 Georgia,"Times New Roman",serif;
        pointer-events:none;
      }
      .placement-summary-side-kicker{
        position:relative;
        z-index:1;
        margin:0;
        color:#ffe7bd;
        font-size:.7rem;
        font-weight:900;
        letter-spacing:.1em;
        text-transform:uppercase;
      }
      .placement-summary-side h3{
        position:relative;
        z-index:1;
        margin:8px 0 0;
        color:#fff;
        font-family:Georgia,"Times New Roman",serif;
        font-size:clamp(1.45rem,2.5vw,1.9rem);
        line-height:1.12;
      }
      .placement-level-track{
        position:relative;
        z-index:1;
        display:grid;
        grid-template-columns:repeat(6,1fr);
        gap:6px;
        margin-top:20px;
      }
      .placement-level-track span{
        min-height:34px;
        display:grid;
        place-items:center;
        border:1px solid rgba(255,255,255,.15);
        border-radius:11px;
        background:rgba(255,255,255,.09);
        color:#fff8ee;
        font-size:.72rem;
        font-weight:900;
      }
      .placement-summary-side-copy{
        position:relative;
        z-index:1;
        margin:17px 0 0;
        color:rgba(255,255,255,.88);
        font-size:.82rem;
        line-height:1.6;
      }
      .placement-summary-action{
        position:relative;
        z-index:1;
        display:inline-flex;
        align-items:center;
        justify-content:center;
        width:100%;
        min-height:54px;
        margin-top:20px;
        padding:12px 16px;
        border:0;
        border-radius:15px;
        background:linear-gradient(180deg,#f3bc43,#e3a52c);
        color:#5a2400;
        text-decoration:none;
        font-size:.88rem;
        font-weight:950;
        white-space:normal;
        text-align:center;
        box-shadow:0 12px 25px rgba(55,25,0,.20);
        transition:transform .16s ease,box-shadow .16s ease,filter .16s ease;
      }
      .placement-summary-action:hover,.placement-summary-action:focus-visible{
        background:linear-gradient(180deg,#f6c351,#e7ab34);
        color:#4b1d00;
        transform:translateY(-1px);
        box-shadow:0 15px 28px rgba(55,25,0,.23);
        outline:none;
      }
      .placement-summary-side-note{
        position:relative;
        z-index:1;
        display:block;
        margin-top:13px;
        color:rgba(255,255,255,.72);
        font-size:.7rem;
        line-height:1.5;
        text-align:center;
      }
      @media(max-width:900px){
        .placement-summary{grid-template-columns:1fr}
        .placement-summary-side{min-height:auto}
        .placement-summary-copy h2{max-width:820px}
      }
      @media(max-width:620px){
        .placement-summary{padding:24px 19px;border-radius:24px;gap:22px}
        .placement-summary::after{left:19px}
        .placement-summary-copy h2{font-size:clamp(1.85rem,9vw,2.35rem)}
        .placement-summary-highlights{gap:6px}
        .placement-summary-highlight{font-size:.69rem}
        .placement-summary-result{grid-template-columns:auto minmax(0,1fr);padding:12px;border-radius:17px}
        .placement-summary-level{width:62px;height:62px;border-radius:18px;font-size:1.65rem}
        .placement-summary-side{padding:22px 18px;border-radius:21px}
        .placement-level-track{gap:4px}
        .placement-level-track span{min-height:31px;border-radius:9px;font-size:.66rem}
      }
      @media(max-width:390px){
        .placement-summary-result{grid-template-columns:1fr}
        .placement-summary-level{width:58px;height:58px}
        .placement-summary-status-wrap{padding-top:2px}
      }
    `;
    document.head.appendChild(style);
  }

  function installEnhancedLayout() {
    const copy = card.querySelector(".placement-summary-copy");
    const result = card.querySelector(".placement-summary-result");
    if (!copy || !result) return;

    if (!copy.querySelector(".placement-summary-highlights")) {
      const highlights = document.createElement("div");
      highlights.className = "placement-summary-highlights";
      highlights.setAttribute("aria-label", "Características do teste");
      highlights.innerHTML = `
        <span class="placement-summary-highlight"><strong>30</strong> questões</span>
        <span class="placement-summary-highlight"><strong>A1 → C2</strong> progressivo</span>
        <span class="placement-summary-highlight">Gramática · vocabulário · leitura</span>`;
      result.insertAdjacentElement("beforebegin", highlights);
    }

    if (!result.querySelector(".placement-summary-status-wrap")) {
      const wrap = document.createElement("div");
      wrap.className = "placement-summary-status-wrap";
      const label = document.createElement("span");
      label.className = "placement-summary-result-label";
      label.textContent = "Seu diagnóstico";
      result.insertBefore(wrap, status);
      wrap.append(label, status);
    }

    if (!card.querySelector(".placement-summary-side")) {
      const side = document.createElement("aside");
      side.className = "placement-summary-side";
      side.setAttribute("aria-label", "Percurso do teste de nivelamento");
      side.innerHTML = `
        <p class="placement-summary-side-kicker">Diagnóstico progressivo</p>
        <h3>Do A1 ao C2, no seu ritmo.</h3>
        <div class="placement-level-track" aria-label="Níveis avaliados">
          <span>A1</span><span>A2</span><span>B1</span><span>B2</span><span>C1</span><span>C2</span>
        </div>
        <p class="placement-summary-side-copy">Responda ao percurso completo e receba uma faixa estimada para orientar seus próximos estudos.</p>`;
      cta.insertAdjacentElement("beforebegin", side);
      side.appendChild(cta);
      const note = document.createElement("small");
      note.className = "placement-summary-side-note";
      note.textContent = "Seu resultado fica salvo na sua Área do Estudiante.";
      side.appendChild(note);
    }
  }

  function formatDate(value) {
    const date = new Date(value || "");
    if (Number.isNaN(date.getTime())) return "";
    return new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" }).format(date);
  }

  async function load() {
    if (!window.VAEAuth?.isConfigured?.()) return;
    try {
      const session = await window.VAEAuth.getSession();
      if (!session) return;
      const supabase = window.VAEAuth.getClient();
      const { data, error } = await supabase
        .from("placement_attempts")
        .select("estimated_level,score,total,completed_at")
        .order("completed_at", { ascending: false })
        .limit(1)
        .maybeSingle();
      if (error) throw error;

      if (!data) {
        badge.textContent = "?";
        status.textContent = "Você ainda não fez o teste. São 30 questões progressivas, do A1 ao C2.";
        cta.textContent = "Descobrir meu nível →";
        return;
      }

      const percentage = data.total ? Math.round((data.score / data.total) * 100) : 0;
      badge.textContent = data.estimated_level;
      status.textContent = `${LEVEL_LABELS[data.estimated_level] || "Nível estimado"} · ${data.score}/${data.total} acertos (${percentage}%) · realizado em ${formatDate(data.completed_at)}.`;
      cta.textContent = "Refazer nivelamento →";
      card.classList.add("has-result");
    } catch (error) {
      console.warn("Não foi possível carregar o último nivelamento", error);
      status.textContent = "Faça o teste para descobrir sua faixa estimada de espanhol.";
    }
  }

  installStyles();
  installEnhancedLayout();

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", load, { once: true });
  else load();
})();
