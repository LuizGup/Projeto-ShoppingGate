const linhas = 5, colunas = 5;
const estacionamento = Array.from({ length: linhas }, () => Array(colunas).fill(null));
const prefixosNorte2 = {
  AP: ['QUN', 'QUP', 'QUT'],
  PA: ['JSA', 'JSB', 'JSC', 'NSB', 'NSC'],
  RR: ['NAY', 'NBA', 'NBC']
};
const VALOR_FIXO = 10.00;
const VALOR_EXTRA = 5.00;

function identificarEstado(placa) {
  const prefixo = placa.slice(0, 3).toUpperCase();
  for (const estado in prefixosNorte2) {
    if (prefixosNorte2[estado].includes(prefixo)) return estado;
  }
  return null;
}

function renderizarEstacionamento() {
  const grid = document.getElementById('estacionamento');
  grid.innerHTML = '';
  estacionamento.forEach(row => {
    row.forEach(vaga => {
      const div = document.createElement('div');
      div.className = vaga ? 'ocupado' : '';
      div.textContent = vaga ? vaga.placa : '---';
      grid.appendChild(div);
    });
  });
}

function encontrarPlaca(placa) {
  for (let i = 0; i < linhas; i++) {
    for (let j = 0; j < colunas; j++) {
      if (estacionamento[i][j]?.placa === placa) return { i, j };
    }
  }
  return null;
}

function registrarEntrada() {
  const placa = document.getElementById('placaEntrada').value.toUpperCase();
  const hora = parseInt(document.getElementById('horaEntrada').value);
  if (!/^[A-Z]{3}[0-9][A-Z][0-9]{2}$/.test(placa)) {
    alert("Placa inválida.");
    return;
  }

  const estado = identificarEstado(placa) || "Desconhecido";
  for (let i = 0; i < linhas; i++) {
    for (let j = 0; j < colunas; j++) {
      if (!estacionamento[i][j]) {
        estacionamento[i][j] = { placa, entrada: hora, estado };
        renderizarEstacionamento();
        alert(`Veículo do estado ${estado} alocado em [${i},${j}].`);
        return;
      }
    }
  }
  alert("Estacionamento cheio!");
}

function calcularValor(entrada, saida) {
  const minutos = saida - entrada;
  if (minutos <= 15) return 0.00;
  const horas = Math.ceil(minutos / 60);
  return horas <= 3 ? VALOR_FIXO : VALOR_FIXO + (horas - 3) * VALOR_EXTRA;
}

function registrarSaida() {
  const placa = document.getElementById('placaSaida').value.toUpperCase();
  const hora = parseInt(document.getElementById('horaSaida').value);
  const pos = encontrarPlaca(placa);
  if (!pos) {
    alert("Veículo não encontrado.");
    return;
  }
  const carro = estacionamento[pos.i][pos.j];
  const tempo = hora - carro.entrada;
  const valor = calcularValor(carro.entrada, hora);
  estacionamento[pos.i][pos.j] = null;
  renderizarEstacionamento();

  document.getElementById('ticket').textContent =
    `Placa: ${placa}
Estado: ${carro.estado}
Tempo: ${tempo} minutos
Valor: R$ ${valor.toFixed(2)}`;
}

renderizarEstacionamento();
