// ============================================================
// CONFIG — Dreno do Cartão no Exterior (dlt.academy)
// ============================================================

const CONFIG = {
  // Link de afiliado padrão — ether.fi Cash (P1 prioritário da DLT Academy)
  refDefault: "https://www.ether.fi/app/cash/referral?ref_code=e155ee95",

  // Rastreamento por canal de origem (?c=...)
  refByChannel: {
    grupos: "https://www.ether.fi/app/cash/referral?ref_code=e155ee95",
    whats: "https://www.ether.fi/app/cash/referral?ref_code=e155ee95",
    yt: "https://www.ether.fi/app/cash/referral?ref_code=e155ee95",
    bio: "https://www.ether.fi/app/cash/referral?ref_code=e155ee95",
    "tg-ads": "https://www.ether.fi/app/cash/referral?ref_code=e155ee95",
    nomad: "https://www.ether.fi/app/cash/referral?ref_code=e155ee95",
  },

  // Catálogo de destinos do roteador contextual
  offers: {
    default: {
      name: "ether.fi Cash (1ª Opção: Cartão sem IOF + até 3% Cashback)",
      url: "https://www.ether.fi/app/cash/referral?ref_code=e155ee95",
      code: "e155ee95",
      type: "card",
      headline: "Cartão Visa Internacional Web3",
      instruction: "Cadastre-se pelo navegador antes de baixar o app para garantir as regras de cashback.",
    },
    arq: {
      name: "Cartão ARQ (2ª Opção: Saque sem Taxa de ATM)",
      url: "https://www.dolarapp.com/pt-BR/indicados?referrer=tiagohyd_qVz",
      code: "tiagohyd_qVz",
      type: "atm",
      headline: "Saques em moeda física sem taxas ocultas",
    },
    bybit: {
      name: "Bybit Pay (3ª Opção: QR Code com USDT na Ásia)",
      url: "https://www.bybit.com/en/invite/?ref=O0YDQDM",
      code: "O0YDQDM",
      type: "pay",
      headline: "Pagar VietQR e QR asiático direto com stablecoin",
    },
  },

  // Comunidade oficial da marca
  community: {
    url: "https://t.me/dltacademy",
    label: "Entrar no grupo aberto da DLT →",
    tag: "Grátis",
    headline: "Tire dúvidas sobre pagamentos internacionais",
    sub: "Comunidade da DLT Academy com viajantes, nômades e investidores compartilhando setups reais sem enrolação.",
  },

  goatCounterSite: "dltacademy",
  siteUrl: "https://dreno-cartao.dlt.academy/",
  brand: "dltacademy",
};
