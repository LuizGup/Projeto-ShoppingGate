const PREFIXOS_NORTE_2 = {};

// Função para gerar prefixos entre dois valores, como de "NEI" até "NFB"
function gerarPrefixos(inicio, fim) {
  const resultado = [];
  let atual = inicio.toUpperCase();

  while (atual <= fim.toUpperCase()) {
    resultado.push(atual);
    atual = proximoPrefixo(atual);
  }

  return resultado;
}

// Incrementa uma string de 3 letras como contador base-26
function proximoPrefixo(p) {
  let [a, b, c] = p.split('').map(ch => ch.charCodeAt(0));
  if (c < 90) c++;
  else if (b < 90) { b++; c = 65; }
  else if (a < 90) { a++; b = c = 65; }
  else return null;
  return String.fromCharCode(a, b, c);
}

// Faixas de prefixos por estado
const faixas = {
  AP: [["NEI", "NFB"], ["QLN", "QLT"], ["SAK", "SAM"], ["TGO", "TGQ"]],
  PA: [["JTA", "JWE"], ["NSE", "NTC"], ["OBT", "OCA"], ["OFI", "OFW"],
       ["OSW", "OTZ"], ["QDA", "QEZ"], ["QVA", "QVZ"], ["RWK", "RXJ"], ["SZA", "SZZ"]],
  RR: [["RZA", "RZD"], ["NUH", "NUL"], ["NAH", "NBA"]]
};

// Gera e popula a variável PREFIXOS_NORTE_2
for (const estado in faixas) {
  for (const [inicio, fim] of faixas[estado]) {
    const lista = gerarPrefixos(inicio, fim);
    for (const prefixo of lista) {
      PREFIXOS_NORTE_2[prefixo] = estado;
    }
  }
}

// Pronto para usar
// Exemplo:
console.log(PREFIXOS_NORTE_2["NEI"]); // AP
console.log(PREFIXOS_NORTE_2["RXJ"]); // PA
console.log(PREFIXOS_NORTE_2["XYZ"]); // undefined
console.log(Object.keys(PREFIXOS_NORTE_2).length); // Total de prefixos únicos
console.log(PREFIXOS_NORTE_2); // Exibe todos os prefixos gerados