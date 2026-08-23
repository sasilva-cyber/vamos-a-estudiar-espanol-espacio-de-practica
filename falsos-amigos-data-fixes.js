/* Correções mecânicas de duas entradas que foram transcritas incorretamente ao importar o material. */
(function () {
  const bank = window.VAE_FALSE_FRIENDS_BANK;
  if (!Array.isArray(bank)) return;
  bank.forEach((item) => {
    if (item.word === "prestar" && item.answer === "empresar") item.answer = "emprestar";
    if (item.word === "sumirse" && item.answer === "afunder-se") item.answer = "afundar-se";
  });
})();