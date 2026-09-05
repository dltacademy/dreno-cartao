// ============================================================
// O Dreno do Cartão no Exterior — Lógica da Calculadora
// DLT Academy (dlt.academy)
// ============================================================

document.addEventListener("DOMContentLoaded", () => {
  // Estado inicial
  const state = {
    destino: "asia",
    gasto: 10000,
    metodo: "bancao"
  };

  // Referências do DOM
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

  // Dados de benchmark e equivalências
  const BENCHMARKS = {
    bancao: {
      nome: "Cartão de Crédito Bancão Nacional",
      taxaTotal: 0.0938, // 4.38% IOF + 5.0% Spread
      desc: "IOF 4,38% + Spread 5,0% + risco de DCC"
    },
    fintech: {
      nome: "Fintech Global / Nomad / Wise",
      taxaTotal: 0.0430, // 1.1% IOF + 2.0% Spread entrada + 1.2% FX saída
      desc: "IOF 1,1% + Spread 2% + markup cambial de saída"
    },
    especie: {
      nome: "Dinheiro Físico em Casa de Câmbio",
      taxaTotal: 0.0700, // 7.0% Spread balcão
      desc: "Spread médio de balcão turismo (6% a 8%)"
    }
  };

  const DESTINOS = {
    asia: {
      nome: "Sudeste Asiático (Vietnã, Tailândia, Indonésia)",
      custoNoite: 80,
      custoRefeicao: 15,
      itemNomeNoite: "noites de hospedagem boutique",
      itemNomeRefeicao: "refeições completas / tigelas de Pho"
    },
    europa: {
      nome: "Europa (Zona do Euro)",
      custoNoite: 200,
      custoRefeicao: 120,
      itemNomeNoite: "diárias de hostel / hotel",
      itemNomeRefeicao: "passagens de trem ou almoços"
    },
    eua: {
      nome: "Estados Unidos / Américas",
      custoNoite: 250,
      custoRefeicao: 70,
      itemNomeNoite: "diárias de hospedagem",
      itemNomeRefeicao: "refeições e cafés"
    },
    global: {
      nome: "Outro / Viagem Global",
      custoNoite: 150,
      custoRefeicao: 40,
      itemNomeNoite: "diárias de estadia média",
      itemNomeRefeicao: "refeições diárias"
    }
  };

  function formatBRL(val) {
    return val.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  }

  function recalculate() {
    const metodoData = BENCHMARKS[state.metodo];
    const destinoData = DESTINOS[state.destino];
    const gasto = state.gasto;

    // Perda no método tradicional
    const bleedTotal = gasto * metodoData.taxaTotal;

    // Benefício com ether.fi Cash
    // Custo FX Visa interbancário: 0.5%
    // Cashback médio elegível: 2.5% a 3.0% (usando 2.5% conservador)
    const cashback = gasto * 0.025;
    const custoVisa = gasto * 0.005;
    const retornoLiquidoEtherfi = cashback - custoVisa; // Ganho real positivo
    const diferencaTotal = bleedTotal + retornoLiquidoEtherfi;

    // Equivalências de estilo de vida
    const noitesPerdidas = Math.floor(bleedTotal / destinoData.custoNoite);
    const refeicoesPerdidas = Math.floor(bleedTotal / destinoData.custoRefeicao);

    // Atualiza a interface
    bleedValEl.textContent = formatBRL(bleedTotal);

    if (noitesPerdidas > 0 && refeicoesPerdidas > 0) {
      lifestyleTextEl.innerHTML = `Esse dinheiro perdido em tarifas pagaria aproximadamente <strong>${noitesPerdidas} ${destinoData.itemNomeNoite}</strong> ou cerca de <strong>${refeicoesPerdidas} ${destinoData.itemNomeRefeicao}</strong> em ${destinoData.nome}.`;
    } else {
      lifestyleTextEl.innerHTML = `Esse valor é um pedágio invisível que vai direto para o caixa do banco, sem gerar nenhum benefício para a sua viagem.`;
    }

    etherfiGainEl.textContent = formatBRL(diferencaTotal);
    etherfiCashbackEl.textContent = formatBRL(cashback);

    // Tabela comparativa
    tableMetodoName.textContent = metodoData.nome;
    tableMetodoCost.textContent = formatBRL(bleedTotal);
    tableMetodoRate.textContent = `~${(metodoData.taxaTotal * 100).toFixed(1)}% do valor gasto`;
  }

  // Event Listeners - Destino
  destinoPills.forEach(pill => {
    pill.addEventListener("click", () => {
      destinoPills.forEach(p => p.classList.remove("active"));
      pill.classList.add("active");
      state.destino = pill.dataset.destino;
      recalculate();
      if (typeof track === "function") track("filtro_destino_" + state.destino);
    });
  });

  // Event Listeners - Método
  metodoPills.forEach(pill => {
    pill.addEventListener("click", () => {
      metodoPills.forEach(p => p.classList.remove("active"));
      pill.classList.add("active");
      state.metodo = pill.dataset.metodo;
      recalculate();
      if (typeof track === "function") track("filtro_metodo_" + state.metodo);
    });
  });

  // Sincronização Slider & Input Numérico
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

  // Wiring de links e conversão via tracking.js
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

  // Executa o cálculo inicial
  recalculate();
});
