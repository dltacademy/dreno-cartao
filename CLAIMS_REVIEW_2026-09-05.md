# Claims review — 2026-09-05

Este arquivo registra a revisão que motivou o PR de claims vigentes. Não é fonte primária; as condições devem ser revalidadas nas páginas oficiais quando mudarem.

- IOF de operações internacionais comuns no cartão brasileiro: 3,5%.
- Wise: conversão comum de BRL para saldo estrangeiro usa 3,5% de IOF; 1,1% é específico do Rende+.
- ether.fi Cash: cashback progressivo entre 3% e 0,5% conforme membership e gasto elegível; não tratar 3% como fixo.
- Bybit QR Pay: VietQR documentado no Vietnã; lista oficial atual não inclui PromptPay/Tailândia. Zero transaction fee não elimina eventual FX/conversão.
- ARQ Standard: tarifa própria de 1% por saque; tarifa do operador do ATM pode existir. Saldo Global em USDc/EURc pode ser formado sem IOF brasileiro, com conversão aproximada de 0,5% conforme documentação atual.

A interface foi alterada para não inventar spreads universais de bancões, fintechs ou casas de câmbio e para não projetar economia fixa de um produto sem os dados da rota real.
