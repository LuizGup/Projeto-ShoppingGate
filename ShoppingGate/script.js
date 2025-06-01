// Constantes e Configurações Globais
const LINHAS_MATRIZ = 5;
const COLUNAS_MATRIZ = 5;
const VALOR_ATE_3_HORAS = 10.00;
const VALOR_HORA_EXCEDENTE = 5.00;
const TOLERANCIA_MINUTOS = 15;

// Base de prefixos para estados da Equipe Norte 2 (Amapá, Pará, Roraima)
const PREFIXOS_NORTE_2 = {
    // Amapá (AP) - Exemplos
    "QUN": "AP", "QUP": "AP", "QUT": "AP",
    // Adicionar outros prefixos do Amapá aqui conforme a tabela oficial
    "NEI": "AP", "NEJ": "AP", "NEK": "AP", "NEL": "AP", "NEM": "AP", "NEN": "AP", "NEO": "AP", "NEP": "AP", "NEQ": "AP", "NER": "AP", "NES": "AP", "NET": "AP", "NEU": "AP", "NEV": "AP", "NEW": "AP", "NEX": "AP", "NEY": "AP", "NEZ": "AP",
    "NFA": "AP", "NFB": "AP",
    "QLN": "AP", "QLO": "AP", "QLP": "AP", "QLQ": "AP", "QLR": "AP", "QLS": "AP", "QLT": "AP", // 2ª sequência

    // Pará (PA) - Exemplos
    "JSA": "PA", "JSB": "PA", "JSC": "PA", // Exemplo do usuário, verificar se são válidos no Mercosul
    "NSB": "PA", "NSC": "PA", // Exemplo do usuário, verificar se são válidos no Mercosul
    // Prefixos oficiais (pode haver mais)
    "JTA": "PA", "JTB": "PA", "JTC": "PA", "JTD": "PA", "JTE": "PA", "JTF": "PA", "JTG": "PA", "JTH": "PA", "JTI": "PA", "JTJ": "PA", "JTK": "PA", "JTL": "PA", "JTM": "PA", "JTN": "PA", "JTO": "PA", "JTP": "PA", "JTQ": "PA", "JTR": "PA", "JTS": "PA", "JTT": "PA", "JTU": "PA", "JTV": "PA", "JTW": "PA", "JTX": "PA", "JTY": "PA", "JTZ": "PA",
    "JUA": "PA", "JUB": "PA", "JUC": "PA", "JUD": "PA", "JUE": "PA", "JUF": "PA", "JUG": "PA", "JUH": "PA", "JUI": "PA", "JUJ": "PA", "JUK": "PA", "JUL": "PA", "JUM": "PA", "JUN": "PA", "JUO": "PA", "JUP": "PA", "JUQ": "PA", "JUR": "PA", "JUS": "PA", "JUT": "PA", "JUU": "PA", "JUV": "PA", "JUW": "PA", "JUX": "PA", "JUY": "PA", "JUZ": "PA",
    "JVA": "PA", "JVB": "PA", "JVC": "PA", "JVD": "PA", "JVE": "PA", "JVF": "PA", "JVG": "PA", "JVH": "PA", "JVI": "PA", "JVJ": "PA", "JVK": "PA", "JVL": "PA", "JVM": "PA", "JVN": "PA", "JVO": "PA", "JVP": "PA", "JVQ": "PA", "JVR": "PA", "JVS": "PA", "JVT": "PA", "JVU": "PA", "JVV": "PA", "JVW": "PA", "JVX": "PA", "JVY": "PA", "JVZ": "PA",
    "JWA": "PA", "JWB": "PA", "JWC": "PA", "JWD": "PA", "JWE": "PA",
    "NSE": "PA", "NSF": "PA", "NSG": "PA", "NSH": "PA", "NSI": "PA", "NSJ": "PA", "NSK": "PA", "NSL": "PA", "NSM": "PA", "NSN": "PA", "NSO": "PA", "NSP": "PA", "NSQ": "PA", "NSR": "PA", "NSS": "PA", "NST": "PA", "NSU": "PA", "NSV": "PA", "NSW": "PA", "NSX": "PA", "NSY": "PA", "NSZ": "PA", // 2ª sequência
    "NTA": "PA", "NTB": "PA", "NTC": "PA",
    "OBT": "PA", "OBU": "PA", "OBV": "PA", "OBW": "PA", "OBX": "PA", "OBY": "PA", "OBZ": "PA", "OCA": "PA", // 3ª sequência
    "OFI": "PA", "OFJ": "PA", "OFK": "PA", "OFL": "PA", "OFM": "PA", "OFN": "PA", "OFO": "PA", "OFP": "PA", "OFQ": "PA", "OFR": "PA", "OFS": "PA", "OFT": "PA", "OFU": "PA", "OFV": "PA", "OFW": "PA", // 4ª sequência
    "OSW": "PA", "OSX": "PA", "OSY": "PA", "OSZ": "PA", "OTA": "PA", "OTB": "PA", "OTC": "PA", "OTD": "PA", "OTE": "PA", "OTF": "PA", "OTG": "PA", "OTH": "PA", "OTI": "PA", "OTJ": "PA", "OTK": "PA", "OTL": "PA", "OTM": "PA", "OTN": "PA", "OTO": "PA", "OTP": "PA", "OTQ": "PA", "OTR": "PA", "OTS": "PA", "OTT": "PA", "OTU": "PA", "OTV": "PA", "OTW": "PA", "OTX": "PA", "OTY": "PA", "OTZ": "PA", // 5ª sequência
    "QDA": "PA", "QDB": "PA", "QDC": "PA", "QDD": "PA", "QDE": "PA", "QDF": "PA", "QDG": "PA", "QDH": "PA", "QDI": "PA", "QDJ": "PA", "QDK": "PA", "QDL": "PA", "QDM": "PA", "QDN": "PA", "QDO": "PA", "QDP": "PA", "QDQ": "PA", "QDR": "PA", "QDS": "PA", "QDT": "PA", "QDU": "PA", "QDV": "PA", "QDW": "PA", "QDX": "PA", "QDY": "PA", "QDZ": "PA", // 6ª sequência
    "RWK": "PA", "RWL": "PA", "RWM": "PA", "RWN": "PA", "RWO": "PA", "RWP": "PA", "RWQ": "PA", "RWR": "PA", "RWS": "PA", "RWT": "PA", "RWU": "PA", "RWV": "PA", "RWW": "PA", "RWX": "PA", "RWY": "PA", "RWZ": "PA", // Placa Mercosul nova
    "RXA": "PA", "RXB": "PA", "RXC": "PA", "RXD": "PA", "RXE": "PA", "RXF": "PA", "RXG": "PA", "RXH": "PA", "RXI": "PA", "RXJ": "PA",

    // Roraima (RR) - Exemplos
    "NAY": "RR", "NBA": "RR", "NBC": "RR", // Exemplo do usuário + Oficial
    // Prefixos oficiais (pode haver mais)
    "NAH": "RR", "NAI": "RR", "NAJ": "RR", "NAK": "RR", "NAL": "RR", "NAM": "RR", "NAN": "RR", "NAO": "RR", "NAP": "RR", "NAQ": "RR", "NAR": "RR", "NAS": "RR", "NAT": "RR", "NAU": "RR", "NAV": "RR", "NAW": "RR", "NAX": "RR",
    "NUH": "RR", "NUI": "RR", "NUJ": "RR", "NUK": "RR", "NUL": "RR", // 2ª sequência
    "QRB": "RR", // 3ª sequência
    "RZA": "RR", "RZB": "RR", "RZC": "RR", "RZD": "RR", // Placa Mercosul nova
};

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
    inicializarMatriz();
};
