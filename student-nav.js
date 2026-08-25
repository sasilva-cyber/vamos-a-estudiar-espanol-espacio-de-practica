/* Acessos públicos da Área do Estudiante no menu principal. Instalação única e leve. */
(function () {
  const REPOSITORY_PATH = "/vamos-a-estudiar-espanol-espacio-de-practica";
  const IS_GITHUB = window.location.hostname.toLowerCase().endsWith(".github.io");
  const ROOT = IS_GITHUB ? `${REPOSITORY_PATH}/` : "/";

  function injectStyles() {
    if (document.getElementById("student-nav-styles")) return;

    const style = document.createElement("style");
    style.id = "student-nav-styles";
    style.textContent = `
      .student-auth-group {
        display: inline-flex;
        align-items: center;
        gap: 7px;
        flex: 0 0 auto;
        margin-left: 8px;
        padding-left: 11px;
        border-left: 1px solid rgba(143,29,44,.16);
      }

      .student-auth-link {
        min-height: 38px;
        padding: 8px 13px;
        border-radius: 999px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        text-decoration: none;
        white-space: nowrap;
        font-size: .78rem;
        font-weight: 900;
        line-height: 1;
        letter-spacing: .01em;
        transition: transform .15s ease, background .15s ease, border-color .15s ease, box-shadow .15s ease;
      }

      .student-auth-login {
        border: 1px solid rgba(143,29,44,.28);
        background: rgba(255,255,255,.9);
        color: var(--red-dark, #6e1521);
      }

      .student-auth-login:hover,
      .student-auth-login:focus-visible {
        border-color: var(--red, #8f1d2c);
        background: #fff8f3;
        outline: none;
        transform: translateY(-1px);
      }

      .student-auth-signup {
        border: 1px solid var(--red, #8f1d2c);
        background: var(--red, #8f1d2c);
        color: #fff;
        box-shadow: 0 7px 16px rgba(143,29,44,.14);
      }

      .student-auth-signup:hover,
      .student-auth-signup:focus-visible {
        background: var(--red-dark, #6e1521);
        border-color: var(--red-dark, #6e1521);
        outline: none;
        transform: translateY(-1px);
      }

      @media (max-width: 820px) {
        .student-auth-group {
          margin-left: 3px;
          padding-left: 9px;
          gap: 6px;
          min-height: 44px;
        }

        .student-auth-link {
          min-height: 40px;
          padding: 9px 13px;
          scroll-snap-align: start;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function track(action) {
    try {
      if (typeof window.vaeTrack === "function") window.vaeTrack("student_auth_nav_click", { action });
      else if (typeof window.gtag === "function") window.gtag("event", "student_auth_nav_click", { action });
    } catch (_) {}
  }

  function makeLink(className, href, text, action, label) {
    const link = document.createElement("a");
    link.className = `student-auth-link ${className}`;
    link.href = href;
    link.textContent = text;
    link.setAttribute("aria-label", label);
    link.addEventListener("click", () => track(action));
    return link;
  }

  function install() {
    injectStyles();
    const nav = document.querySelector(".main-nav");
    if (!nav) return;

    let group = nav.querySelector(".student-auth-group");
    if (!group) {
      group = document.createElement("span");
      group.className = "student-auth-group";
      group.setAttribute("aria-label", "Acesso do estudante");
      group.appendChild(makeLink("student-auth-login", `${ROOT}login/`, "Entrar", "login", "Entrar na Área do Estudiante"));
      group.appendChild(makeLink("student-auth-signup", `${ROOT}cadastro/`, "Criar conta", "signup", "Criar conta gratuita na Área do Estudiante"));
      nav.appendChild(group);
    }
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", install, { once: true });
  else install();
})();