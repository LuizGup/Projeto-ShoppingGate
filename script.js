// Constantes e Configurações Globais
const LINHAS_MATRIZ = 5;
const COLUNAS_MATRIZ = 5;
const VALOR_ATE_3_HORAS = 10.00;
const VALOR_HORA_EXCEDENTE = 5.00;
const TOLERANCIA_MINUTOS = 15;

// Base de prefixos para estados da Equipe Norte 2 (Amapá, Pará, Roraima)
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
console.log(PREFIXOS_NORTE_2); // Exibe todos os prefixos gerados
console.log(Object.keys(PREFIXOS_NORTE_2).length); // Total de prefixos únicos


// Estruturas de Dados
let matrizEstacionamento = [];
let veiculosEstacionados = {};

// --- Funções Principais ---

/**
 * Inicializa a matriz do estacionamento com valores nulos (vagas livres).
 */
function inicializarMatriz() {
    matrizEstacionamento = [];
    for (let i = 0; i < LINHAS_MATRIZ; i++) {
        const linha = [];
        for (let j = 0; j < COLUNAS_MATRIZ; j++) {
            linha.push(null); // null representa vaga livre
        }
        matrizEstacionamento.push(linha);
    }
    atualizarVisualizacaoMatriz();
}

/**
 * Atualiza a visualização da matriz do estacionamento na interface.
 */
function atualizarVisualizacaoMatriz() {
    const estacionamentoDiv = document.getElementById('estacionamento');
    estacionamentoDiv.innerHTML = '';

    for (let i = 0; i < LINHAS_MATRIZ; i++) {
        for (let j = 0; j < COLUNAS_MATRIZ; j++) {
            const vaga = document.createElement('div');
            vaga.className = 'vaga';
            vaga.dataset.linha = i;
            vaga.dataset.coluna = j;

            if (matrizEstacionamento[i][j]) {
                vaga.classList.add('ocupado');
                vaga.textContent = matrizEstacionamento[i][j];
            } else {
                vaga.textContent = 'Livre';
            }

            estacionamentoDiv.appendChild(vaga);
        }
    }
}

/**
 * Valida se a placa está no formato Mercosul (LLLNLNN).
 * @param {string} placa A placa a ser validada.
 * @returns {boolean} True se a placa for válida, False caso contrário.
 */
function validarPlacaMercosul(placa) {
    if (typeof placa !== 'string') return false;
    const placaFormatada = placa.toUpperCase().replace(/-/g, ''); // Remove hífens e converte para maiúsculas
    const regexPlacaMercosul = /^[A-Z]{3}[0-9][A-Z][0-9]{2}$/;
    return regexPlacaMercosul.test(placaFormatada);
}

/**
 * Identifica o estado de origem da placa com base nos 3 primeiros caracteres.
 * Verifica se pertence à equipe Norte 2 (AP, PA, RR).
 * @param {string} placa A placa do veículo.
 * @returns {string} A sigla do estado (AP, PA, RR) ou "Outro Estado" ou "Placa Inválida".
 */
function identificarEstadoPlaca(placa) {
    if (!validarPlacaMercosul(placa)) {
        console.warn(`Placa inválida: ${placa}`);
        return "Placa Inválida";
    }
    const prefixo = placa.toUpperCase().substring(0, 3);
    console.log(`Identificando estado para placa: ${placa}, prefixo: ${prefixo}`);
    if (PREFIXOS_NORTE_2.hasOwnProperty(prefixo)) {
        console.log(`Estado identificado: ${PREFIXOS_NORTE_2[prefixo]}`);
        return PREFIXOS_NORTE_2[prefixo]; // Retorna AP, PA ou RR
    }
    console.log(`Estado não identificado para placa: ${placa}`);
    return "Outro Estado";
}

/**
 * Encontra a primeira vaga livre na matriz.
 * @returns {{linha: number, coluna: number}|null} Objeto com linha e coluna da vaga livre, ou null se lotado.
 */
function encontrarVagaLivre() {
    for (let i = 0; i < LINHAS_MATRIZ; i++) {
        for (let j = 0; j < COLUNAS_MATRIZ; j++) {
            if (matrizEstacionamento[i][j] === null) {
                return { linha: i, coluna: j };
            }
        }
    }
    return null; // Estacionamento lotado
}

/**
 * Converte horas e minutos em minutos totais.
 * @param {number} horas Horas.
 * @param {number} minutos Minutos.
 * @returns {number} Total de minutos.
 */
function converterParaMinutos(horas, minutos) {
    return (horas * 60) + minutos;
}

/**
 * Calcula o tempo de permanência em minutos.
 * @param {number} entradaMinutos Minutos totais da entrada.
 * @param {number} saidaMinutos Minutos totais da saída.
 * @returns {number} Tempo de permanência em minutos.
 */
function calcularTempoPermanencia(entradaMinutos, saidaMinutos) {
    // Se a saída for menor que a entrada, assume-se que passou para o dia seguinte
    if (saidaMinutos < entradaMinutos) {
        saidaMinutos += 24 * 60; // Adiciona 24 horas em minutos
    }
    return saidaMinutos - entradaMinutos;
}

/**
 * Calcula o valor a ser cobrado pelo estacionamento.
 * @param {number} tempoMinutos Tempo de permanência em minutos.
 * @returns {number} Valor a ser cobrado.
 */
function calcularValorEstacionamento(tempoMinutos) {
    if (tempoMinutos <= TOLERANCIA_MINUTOS) {
        return 0.00;
    }

    const tempoHoras = tempoMinutos / 60;

    if (tempoHoras <= 3) {
        return VALOR_ATE_3_HORAS;
    }

    // Calcula horas excedentes (arredondando para cima com Math.ceil)
    const horasExcedentes = Math.ceil(tempoHoras - 3);
    const valorExcedente = horasExcedentes * VALOR_HORA_EXCEDENTE;

    return VALOR_ATE_3_HORAS + valorExcedente;
}

/**
 * Formata o tempo em minutos para o formato HH:MM.
 * @param {number} minutos Total de minutos.
 * @returns {string} Tempo formatado como HH:MM.
 */
function formatarTempo(minutos) {
    const horas = Math.floor(minutos / 60);
    const mins = minutos % 60;
    return `${horas.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
}

/**
 * Registra a entrada de um veículo no estacionamento.
 */
function registrarEntrada() {
    const placaInput = document.getElementById('placaEntrada');
    const horaInput = document.getElementById('horaEntrada');
    const minutoInput = document.getElementById('minutoEntrada');
    const mensagemDiv = document.getElementById('mensagemEntrada');
    
    const placa = placaInput.value.toUpperCase().replace(/-/g, '');
    const hora = parseInt(horaInput.value, 10);
    const minuto = parseInt(minutoInput.value, 10);
    
    // Limpa mensagens anteriores
    mensagemDiv.className = 'mensagem';
    mensagemDiv.textContent = '';
    
    // Validações
    if (!placa) {
        exibirMensagem(mensagemDiv, 'Erro: Por favor, informe a placa do veículo.', 'erro');
        return;
    }
    
    if (!validarPlacaMercosul(placa)) {
        exibirMensagem(mensagemDiv, `Erro: Placa "${placa}" inválida. Formato esperado: LLLNLNN.`, 'erro');
        return;
    }
    
    if (isNaN(hora) || hora < 0 || hora > 23) {
        exibirMensagem(mensagemDiv, 'Erro: Hora inválida. Informe um valor entre 0 e 23.', 'erro');
        return;
    }
    
    if (isNaN(minuto) || minuto < 0 || minuto > 59) {
        exibirMensagem(mensagemDiv, 'Erro: Minuto inválido. Informe um valor entre 0 e 59.', 'erro');
        return;
    }
    
    if (veiculosEstacionados[placa]) {
        exibirMensagem(mensagemDiv, `Erro: Veículo com placa "${placa}" já está estacionado.`, 'erro');
        return;
    }
    
    const vaga = encontrarVagaLivre();
    if (!vaga) {
        exibirMensagem(mensagemDiv, 'Erro: Estacionamento lotado.', 'erro');
        return;
    }
    
    // Registra o veículo
    const entradaMinutos = converterParaMinutos(hora, minuto);
    veiculosEstacionados[placa] = {
        entradaMinutos: entradaMinutos,
        linha: vaga.linha,
        coluna: vaga.coluna,
        horaEntrada: hora,
        minutoEntrada: minuto
    };
    
    matrizEstacionamento[vaga.linha][vaga.coluna] = placa;
    
    // Identifica o estado
    const estado = identificarEstadoPlaca(placa);
    let mensagem = `Entrada registrada para ${placa} na vaga [${vaga.linha+1}, ${vaga.coluna+1}].`;
    
    if (estado === 'AP' || estado === 'PA' || estado === 'RR') {
        mensagem += `<br>Placa identificada como do estado: ${estado} (Equipe Norte 2)`;
    } else {
        mensagem += '<br>Placa não pertence aos estados da Equipe Norte 2 (AP, PA, RR).';
    }
    
    exibirMensagem(mensagemDiv, mensagem, 'sucesso');
    atualizarVisualizacaoMatriz();
    
    // Limpa os campos
    placaInput.value = '';
    horaInput.value = '';
    minutoInput.value = '';
}

/**
 * Registra a saída de um veículo e emite o ticket.
 */
function registrarSaida() {
    const placaInput = document.getElementById('placaSaida');
    const horaInput = document.getElementById('horaSaida');
    const minutoInput = document.getElementById('minutoSaida');
    const mensagemDiv = document.getElementById('mensagemSaida');
    const ticketDiv = document.getElementById('ticket');
    
    const placa = placaInput.value.toUpperCase().replace(/-/g, '');
    const hora = parseInt(horaInput.value, 10);
    const minuto = parseInt(minutoInput.value, 10);
    
    // Limpa mensagens anteriores
    mensagemDiv.className = 'mensagem';
    mensagemDiv.textContent = '';
    
    // Validações
    if (!placa) {
        exibirMensagem(mensagemDiv, 'Erro: Por favor, informe a placa do veículo.', 'erro');
        return;
    }
    
    if (!validarPlacaMercosul(placa)) {
        exibirMensagem(mensagemDiv, `Erro: Placa "${placa}" inválida. Formato esperado: LLLNLNN.`, 'erro');
        return;
    }
    
    if (isNaN(hora) || hora < 0 || hora > 23) {
        exibirMensagem(mensagemDiv, 'Erro: Hora inválida. Informe um valor entre 0 e 23.', 'erro');
        return;
    }
    
    if (isNaN(minuto) || minuto < 0 || minuto > 59) {
        exibirMensagem(mensagemDiv, 'Erro: Minuto inválido. Informe um valor entre 0 e 59.', 'erro');
        return;
    }
    
    if (!veiculosEstacionados[placa]) {
        exibirMensagem(mensagemDiv, `Erro: Veículo com placa "${placa}" não encontrado no estacionamento.`, 'erro');
        return;
    }
    
    const veiculoInfo = veiculosEstacionados[placa];
    const saidaMinutos = converterParaMinutos(hora, minuto);
    const tempoPermanenciaMinutos = calcularTempoPermanencia(veiculoInfo.entradaMinutos, saidaMinutos);
    const valorCobrado = calcularValorEstacionamento(tempoPermanenciaMinutos);
    
    // Identifica o estado
    const estado = identificarEstadoPlaca(placa);
    let estadoClasse = 'estado-outro';
    if (estado === 'AP') estadoClasse = 'estado-ap';
    if (estado === 'PA') estadoClasse = 'estado-pa';
    if (estado === 'RR') estadoClasse = 'estado-rr';
    
    // Emissão do Ticket
    ticketDiv.innerHTML = `
        <div class="ticket-header">
            <h3>TICKET DE ESTACIONAMENTO</h3>
            <p>Shopping Center Norte 2</p>
        </div>
        <div class="ticket-info">
            <p><strong>Placa:</strong> ${placa} <span class="estado-badge ${estadoClasse}">${estado}</span></p>
            <p><strong>Vaga:</strong> [${veiculoInfo.linha+1}, ${veiculoInfo.coluna+1}]</p>
            <p><strong>Entrada:</strong> ${formatarTempo(veiculoInfo.entradaMinutos)}</p>
            <p><strong>Saída:</strong> ${formatarTempo(saidaMinutos)}</p>
            <p><strong>Permanência:</strong> ${Math.floor(tempoPermanenciaMinutos/60)}h ${tempoPermanenciaMinutos%60}min</p>
            <p><strong>Tolerância:</strong> ${TOLERANCIA_MINUTOS} minutos</p>
        </div>
        <div class="ticket-footer">
            <p>Valor a pagar: R$ ${valorCobrado.toFixed(2)}</p>
        </div>
    `;
    
    // Libera a vaga na matriz
    matrizEstacionamento[veiculoInfo.linha][veiculoInfo.coluna] = null;
    
    // Remove o veículo do registro
    delete veiculosEstacionados[placa];
    
    exibirMensagem(mensagemDiv, `Saída registrada para ${placa}. Vaga [${veiculoInfo.linha+1}, ${veiculoInfo.coluna+1}] liberada.`, 'sucesso');
    atualizarVisualizacaoMatriz();
    
    // Limpa os campos
    placaInput.value = '';
    horaInput.value = '';
    minutoInput.value = '';
}

/**
 * Exibe uma mensagem na interface.
 * @param {HTMLElement} elemento Elemento onde a mensagem será exibida.
 * @param {string} texto Texto da mensagem.
 * @param {string} tipo Tipo da mensagem ('erro' ou 'sucesso').
 */
function exibirMensagem(elemento, texto, tipo) {
    elemento.innerHTML = texto;
    elemento.className = `mensagem ${tipo}`;
}

// Inicializa o sistema quando a página carregar
window.onload = function() {
    const grid = document.getElementById("estacionamento");
    grid.style.gridTemplateColumns = `repeat(${COLUNAS_MATRIZ}, 1fr)`;
    inicializarMatriz();
};
