function gerarPrefixos(inicio, fim) {
  const resultado = [];
  let atual = inicio.toUpperCase();

  while (atual <= fim.toUpperCase()) {
    resultado.push(atual);
    atual = proximoPrefixo(atual);
  }

  return resultado;
}

function proximoPrefixo(p) {
  let [a, b, c] = p.toUpperCase().split('').map(ch => ch.charCodeAt(0));
  if (c < 90) c++;
  else if (b < 90) { b++; c = 65; }
  else if (a < 90) { a++; b = c = 65; }
  else return null; // limite

  return String.fromCharCode(a, b, c);
}

// Faixas por estado
const faixas = {
  AP: [["NEI", "NFB"], ["QLN", "QLT"], ["SAK", "SAM"], ["TGO", "TGQ"]],
  PA: [["JTA", "JWE"], ["NSE", "NTC"], ["OBT", "OCA"], ["OFI", "OFW"],
       ["OSW", "OTZ"], ["QDA", "QEZ"], ["QVA", "QVZ"], ["RWK", "RXJ"], ["SZA", "SZZ"]],
  RR: [["RZA", "RZD"], ["NUH", "NUL"], ["NAH", "NBA"]]
};

// Gerar e agrupar prefixos por estado
const todosPrefixos = {};

for (const estado in faixas) {
  todosPrefixos[estado] = [];
  for (const [inicio, fim] of faixas[estado]) {
    const lista = gerarPrefixos(inicio, fim);
    todosPrefixos[estado].push(...lista);
  }
}

// Exemplo: imprimir todos os prefixos de Roraima
console.log("Prefixos de Roraima:");
console.log(todosPrefixos["RR"]);
console.log(todosPrefixos["PA"]);
console.log(todosPrefixos["AP"]);

// Exemplo: total de prefixos por estado
for (const estado in todosPrefixos) {
  console.log(`${estado}: ${todosPrefixos[estado].length} prefixos`);
}
