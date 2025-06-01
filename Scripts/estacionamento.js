// Constantes e Configurações Globais
const LINHAS_MATRIZ = 5;
const COLUNAS_MATRIZ = 5;
const VALOR_ATE_3_HORAS = 10.00;
const VALOR_HORA_EXCEDENTE = 5.00;
const TOLERANCIA_MINUTOS = 15;

// Base de prefixos para estados da Equipe Norte 2 (Amapá, Pará, Roraima)
// Chave: Prefixo (3 primeiras letras), Valor: Sigla do Estado
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
let veiculosEstacionados = new Map(); // Usar Map para facilitar busca por placa: { placa: { entradaTimestamp, linha, coluna } }

// Módulo readline para interação no console
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

// --- Funções Principais ---

/**
 * Inicializa a matriz do estacionamento com valores nulos (vagas livres).
 * @param {number} linhas Número de linhas da matriz.
 * @param {number} colunas Número de colunas da matriz.
 * @returns {Array<Array<string|null>>} A matriz inicializada.
 */
function inicializarMatriz(linhas, colunas) {
    const matriz = [];
    for (let i = 0; i < linhas; i++) {
        matriz[i] = new Array(colunas).fill(null); // null representa vaga livre
    }
    return matriz;
}

/**
 * Exibe a matriz do estacionamento no console.
 * @param {Array<Array<string|null>>} matriz A matriz do estacionamento.
 */
function exibirMatriz(matriz) {
    console.log("\n--- Mapa do Estacionamento ---");
    if (!matriz || matriz.length === 0) {
        console.log("Matriz não inicializada.");
        return;
    }
    for (let i = 0; i < matriz.length; i++) {
        let linhaStr = "";
        for (let j = 0; j < matriz[i].length; j++) {
            const vaga = matriz[i][j];
            linhaStr += `[${vaga ? vaga.padEnd(7, ' ') : ' Livre '}] `;
        }
        console.log(linhaStr);
    }
    console.log("-----------------------------");
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
        return "Placa Inválida";
    }
    const prefixo = placa.toUpperCase().substring(0, 3);
    if (PREFIXOS_NORTE_2.hasOwnProperty(prefixo)) {
        return PREFIXOS_NORTE_2[prefixo]; // Retorna AP, PA ou RR
    }
    return "Outro Estado";
}

/**
 * Encontra a primeira vaga livre na matriz.
 * @param {Array<Array<string|null>>} matriz A matriz do estacionamento.
 * @returns {{linha: number, coluna: number}|null} Objeto com linha e coluna da vaga livre, ou null se lotado.
 */
function encontrarVagaLivre(matriz) {
    for (let i = 0; i < matriz.length; i++) {
        for (let j = 0; j < matriz[i].length; j++) {
            if (matriz[i][j] === null) {
                return { linha: i, coluna: j };
            }
        }
    }
    return null; // Estacionamento lotado
}

/**
 * Registra a entrada de um veículo no estacionamento.
 * @param {string} placa Placa do veículo.
 * @param {Array<Array<string|null>>} matriz Matriz do estacionamento.
 * @param {Map<string, object>} veiculos Mapa de veículos estacionados.
 */
function registrarEntrada(placa, matriz, veiculos) {
    placa = placa.toUpperCase().replace(/-/g, '');

    if (!validarPlacaMercosul(placa)) {
        console.log(`\nErro: Placa "${placa}" inválida. Formato esperado: LLLNLNN.`);
        exibirMenu();
        return;
    }

    if (veiculos.has(placa)) {
        console.log(`\nErro: Veículo com placa "${placa}" já está estacionado.`);
        exibirMenu();
        return;
    }

    const vaga = encontrarVagaLivre(matriz);
    if (!vaga) {
        console.log("\nErro: Estacionamento lotado.");
        exibirMenu();
        return;
    }

    const entradaTimestamp = Date.now();
    veiculos.set(placa, {
        entradaTimestamp: entradaTimestamp,
        linha: vaga.linha,
        coluna: vaga.coluna
    });
    matriz[vaga.linha][vaga.coluna] = placa;

    const estado = identificarEstadoPlaca(placa);
    console.log(`\nEntrada registrada para ${placa} na vaga [${vaga.linha}, ${vaga.coluna}].`);
    if (estado === 'AP' || estado === 'PA' || estado === 'RR') {
        console.log(`Placa identificada como do estado: ${estado} (Equipe Norte 2)`);
    } else if (estado === 'Outro Estado') {
        console.log("Placa não pertence aos estados da Equipe Norte 2 (AP, PA, RR).");
    } else {
        // Caso de placa inválida já tratado, mas por segurança:
        console.log("Não foi possível identificar o estado da placa.");
    }

    exibirMatriz(matriz);
    exibirMenu();
}

/**
 * Calcula o tempo de permanência em minutos.
 * @param {number} entradaTimestamp Timestamp da entrada.
 * @returns {number} Tempo de permanência em minutos.
 */
function calcularTempoPermanencia(entradaTimestamp) {
    const saidaTimestamp = Date.now();
    const diffMilissegundos = saidaTimestamp - entradaTimestamp;
    return Math.ceil(diffMilissegundos / (1000 * 60)); // Arredonda para cima (minutos)
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
 * Registra a saída de um veículo e emite o ticket.
 * @param {string} placa Placa do veículo.
 * @param {Array<Array<string|null>>} matriz Matriz do estacionamento.
 * @param {Map<string, object>} veiculos Mapa de veículos estacionados.
 */
function registrarSaida(placa, matriz, veiculos) {
    placa = placa.toUpperCase().replace(/-/g, '');

    if (!veiculos.has(placa)) {
        console.log(`\nErro: Veículo com placa "${placa}" não encontrado no estacionamento.`);
        exibirMenu();
        return;
    }

    const veiculoInfo = veiculos.get(placa);
    const tempoPermanenciaMinutos = calcularTempoPermanencia(veiculoInfo.entradaTimestamp);
    const valorCobrado = calcularValorEstacionamento(tempoPermanenciaMinutos);

    // Emissão do Ticket
    console.log("\n--- Ticket de Estacionamento ---");
    console.log(`Placa: ${placa}`);
    console.log(`Tempo de Permanência: ${tempoPermanenciaMinutos} minutos`);
    console.log(`Valor Cobrado: R$ ${valorCobrado.toFixed(2)}`);
    console.log("-------------------------------");

    // Libera a vaga na matriz
    matriz[veiculoInfo.linha][veiculoInfo.coluna] = null;
    // Remove o veículo do registro
    veiculos.delete(placa);

    console.log(`\nSaída registrada para ${placa}. Vaga [${veiculoInfo.linha}, ${veiculoInfo.coluna}] liberada.`);
    exibirMatriz(matriz);
    exibirMenu();
}

// --- Menu Interativo ---

/**
 * Exibe o menu principal de opções.
 */
function exibirMenu() {
    console.log("\n--- Sistema de Estacionamento --- \n");
    console.log("1. Registrar Entrada de Veículo");
    console.log("2. Registrar Saída de Veículo");
    console.log("3. Exibir Mapa do Estacionamento");
    console.log("4. Sair");
    console.log("\n---------------------------------");

    readline.question("Escolha uma opção: ", (opcao) => {
        switch (opcao) {
            case '1':
                readline.question("Digite a placa do veículo (formato LLLNLNN): ", (placa) => {
                    registrarEntrada(placa, matrizEstacionamento, veiculosEstacionados);
                });
                break;
            case '2':
                readline.question("Digite a placa do veículo para registrar a saída: ", (placa) => {
                    registrarSaida(placa, matrizEstacionamento, veiculosEstacionados);
                });
                break;
            case '3':
                exibirMatriz(matrizEstacionamento);
                exibirMenu(); // Volta ao menu após exibir
                break;
            case '4':
                console.log("\nSaindo do sistema. Até logo!");
                readline.close();
                break;
            default:
                console.log("\nOpção inválida. Tente novamente.");
                exibirMenu();
                break;
        }
    });
}

// --- Inicialização ---

/**
 * Função principal para iniciar o sistema.
 */
function iniciarSistema() {
    console.log("Iniciando Sistema de Gerenciamento de Estacionamento...");
    matrizEstacionamento = inicializarMatriz(LINHAS_MATRIZ, COLUNAS_MATRIZ);
    exibirMatriz(matrizEstacionamento);
    exibirMenu();
}

// Inicia o sistema
iniciarSistema();

