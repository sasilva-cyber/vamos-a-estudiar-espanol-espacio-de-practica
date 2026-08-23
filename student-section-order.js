/* Mantém as videoaulas Premium imediatamente antes da Práctica de escucha. */
(function () {
  function placeVideoAcademyFirst() {
    const listening = document.querySelector(".listening-hub");
    const videoAcademy = document.getElementById("video-academy");
    if (!listening || !videoAcademy) return false;

    if (videoAcademy.nextElementSibling !== listening) {
      listening.insertAdjacentElement("beforebegin", videoAcademy);
    }
    return true;
  }

  function install() {
    if (placeVideoAcademyFirst()) return;

    const studentContent = document.getElementById("student-content") || document.body;
    const observer = new MutationObserver(() => {
      if (placeVideoAcademyFirst()) observer.disconnect();
    });
    observer.observe(studentContent, { childList: true, subtree: true });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", install, { once: true });
  } else {
    install();
  }
})();
