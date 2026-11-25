/* MEI Orienta — controle de tema claro/escuro */
(function () {
  "use strict";

  const CHAVE = "chatbot-mei-tema";
  const raiz = document.documentElement;
  const botoes = document.querySelectorAll(".botao-tema");
  const meta = document.querySelector('meta[name="theme-color"]');
  const consulta = window.matchMedia("(prefers-color-scheme: dark)");

  function temaAtual() {
    const salvo = localStorage.getItem(CHAVE);
    return salvo === "dark" || salvo === "light"
      ? salvo
      : (consulta.matches ? "dark" : "light");
  }

  function aplicarTema(tema, animar) {
    if (animar) raiz.classList.add("trocando-tema");
    if (tema === "dark" || tema === "light") {
      raiz.setAttribute("data-theme", tema);
      raiz.setAttribute("data-tema-atual", tema);
    } else {
      raiz.removeAttribute("data-theme");
      raiz.setAttribute("data-tema-atual", consulta.matches ? "dark" : "light");
    }

    const escuro = tema === "dark" || (!tema && consulta.matches);
    if (meta) meta.setAttribute("content", escuro ? "#101d2b" : "#12345a");

    botoes.forEach((botao) => {
      botao.setAttribute("aria-label", escuro ? "Ativar tema claro" : "Ativar tema escuro");
      botao.setAttribute("title", escuro ? "Ativar tema claro" : "Ativar tema escuro");
    });

    if (animar) window.setTimeout(() => raiz.classList.remove("trocando-tema"), 400);
  }

  function alternar() {
    const proximo = temaAtual() === "dark" ? "light" : "dark";
    try { localStorage.setItem(CHAVE, proximo); } catch (_) {}
    aplicarTema(proximo, true);
  }

  botoes.forEach((botao) => botao.addEventListener("click", alternar));

  // Quando a pessoa não escolheu um tema manualmente, acompanha o sistema.
  consulta.addEventListener?.("change", () => {
    const salvo = localStorage.getItem(CHAVE);
    if (salvo !== "dark" && salvo !== "light") aplicarTema(null, false);
  });

  aplicarTema(temaAtual(), false);
})();
