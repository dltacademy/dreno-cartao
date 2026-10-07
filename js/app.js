// ============================================================
// O Dreno do Cartão no Exterior — Lógica da Calculadora
// DLT Academy (dlt.academy)
// ============================================================

document.addEventListener("DOMContentLoaded", () => {
  const state = {
    destino: "asia",
    gasto: 10000,
    metodo: "bancao"
  };

  const destinoPills = document.querySelectorAll(".pill-destino");
  const metodoPills = document.querySelectorAll(".pill-metodo");
  const gastoSlider = document.getElementById("gasto-slider");
  const gastoInput = document.getElementById("gasto-input");

  const bleedValEl = document.getElementById("bleed-val");
  const lifestyleTextEl = document.getElementById("lifestyle-text");
  const etherfiGainEl = document.getElementById("etherfi-gain");
  const etherfiCashbackEl = document.getElementById("etherfi-cashback");

  const tableMetodoName = document.getElementById("table-metodo-name");
  const tableMetodoCost = document.getElementById("table-metodo-cost");
  const tableMetodoRate = document.getElementById("table-metodo-rate");

  // Referências conservadoras: só automatizamos o que é comparável sem
  // inventar um spread universal para instituições/casas de câmbio distintas.
  const BENCHMARKS = {
    bancao: {
      nome: "Cartão de crédito brasileiro",
      taxaConhecida: 0.035,
      desc: "IOF de 3,5% + spread/tarifas do emissor (não incluídos na conta automática)",
      tipo: "minimum"
    },
    fintech: {
      nome: "Conta global / cartão multimoedas",
      taxaConhecida: null,
      desc: "Sem alíquota universal: a Wise usa 3,5% na conversão comum e 1,1% no Rende+; outras contas têm regras próprias",
      tipo: "variable"
    },
    especie: {
      nome: "Dinheiro em casa de câmbio",
      taxaConhecida: null,
      desc: "Sem spread universal: compare valor entregue, cotação e eventuais tarifas no momento da compra",
      tipo: "variable"
    }
  };

  const DESTINOS = {
    asia: "Sudeste Asiático",
    europa: "Europa",
    eua: "Estados Unidos / Américas",
    global: "viagem global"
  };

  function formatBRL(val) {
    return val.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  }

  function recalculate() {
    const metodoData = BENCHMARKS[state.metodo];
    const destinoNome = DESTINOS[state.destino] || "sua viagem";
    const gasto = state.gasto;

    if (typeof metodoData.taxaConhecida === "number") {
      const custoConhecido = gasto * metodoData.taxaConhecida;
      bleedValEl.textContent = formatBRL(custoConhecido);
      lifestyleTextEl.innerHTML = `Este é o <strong>custo mínimo conhecido</strong> do cenário selecionado: só o IOF vigente de 3,5%. Spread, tarifa do emissor, cashback e DCC podem mudar o total real. Confira a fatura/app antes de decidir para ${destinoNome}.`;
      tableMetodoCost.textContent = formatBRL(custoConhecido);
      tableMetodoRate.textContent = metodoData.desc;
    } else {
      bleedValEl.textContent = "Depende da rota";
      lifestyleTextEl.textContent = `Não existe uma alíquota única confiável para esta categoria em ${destinoNome}. Compare o valor final recebido/cobrado na rota que você realmente usa.`;
      tableMetodoCost.textContent = "Compare no app/cotação";
      tableMetodoRate.textContent = metodoData.desc;
    }

    tableMetodoName.textContent = metodoData.nome;

    // ether.fi: benefício atual é progressivo e não permite projetar uma
    // economia fixa sem conhecer membership, gasto elegível, funding e FX.
    etherfiGainEl.textContent = "depende do caso";
    etherfiCashbackEl.textContent = "0,5%–3%";
  }

  destinoPills.forEach(pill => {
    pill.addEventListener("click", () => {
      destinoPills.forEach(p => p.classList.remove("active"));
      pill.classList.add("active");
      state.destino = pill.dataset.destino;
      recalculate();
      // O evento registra só que o filtro foi usado, nunca qual destino a pessoa escolheu.
      if (typeof track === "function") track("filtro_destino");
    });
  });

  metodoPills.forEach(pill => {
    pill.addEventListener("click", () => {
      metodoPills.forEach(p => p.classList.remove("active"));
      pill.classList.add("active");
      state.metodo = pill.dataset.metodo;
      recalculate();
      // Idem: sem o método escolhido no nome do evento.
      if (typeof track === "function") track("filtro_metodo");
    });
  });

  gastoSlider.addEventListener("input", (e) => {
    state.gasto = Number(e.target.value);
    gastoInput.value = state.gasto;
    recalculate();
  });

  gastoInput.addEventListener("input", (e) => {
    let val = Number(e.target.value);
    if (isNaN(val) || val < 0) val = 0;
    state.gasto = val;
    gastoSlider.value = Math.min(Math.max(val, 1000), 100000);
    recalculate();
  });

  const etherfiBtn = document.getElementById("cta-etherfi");
  const arqBtn = document.getElementById("cta-arq");
  const bybitBtn = document.getElementById("cta-bybit");

  if (etherfiBtn && typeof getOfferLink === "function") {
    etherfiBtn.href = getOfferLink("default");
    etherfiBtn.addEventListener("click", () => {
      if (typeof track === "function") track("clique_oferta_etherfi_dreno");
    });
  }

  if (arqBtn && typeof getOfferLink === "function") {
    arqBtn.href = getOfferLink("arq");
    arqBtn.addEventListener("click", () => {
      if (typeof track === "function") track("clique_oferta_arq_dreno");
    });
  }

  if (bybitBtn && typeof getOfferLink === "function") {
    bybitBtn.href = getOfferLink("bybit");
    bybitBtn.addEventListener("click", () => {
      if (typeof track === "function") track("clique_oferta_bybit_dreno");
    });
  }

  const communityBtn = document.getElementById("cta-comunidade");
  if (communityBtn && typeof getCommunityLink === "function") {
    communityBtn.href = getCommunityLink();
    communityBtn.addEventListener("click", () => {
      if (typeof track === "function") track("clique_comunidade_dreno");
    });
  }

  recalculate();
});
