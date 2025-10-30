"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.RelatorioInterface = void 0;
const readlineSync = __importStar(require("readline-sync"));
const relatorios_1 = require("../services/relatorios");
class RelatorioInterface {
    constructor(gerenciadorAeronaves) {
        this.gerenciadorAeronaves = gerenciadorAeronaves;
    }
    menu() {
        let continuar = true;
        while (continuar) {
            console.clear();
            console.log('\n=== GERAR RELATORIOS ===');
            console.log('1. Exibir Relatorio de Aeronave');
            console.log('2. Salvar Relatorio em Arquivo');
            console.log('0. Voltar');
            const opcao = readlineSync.question('\nEscolha uma opcao: ');
            switch (opcao) {
                case '1':
                    this.exibir();
                    break;
                case '2':
                    this.salvar();
                    break;
                case '0':
                    continuar = false;
                    break;
                default:
                    console.log('\nOpcao invalida!');
                    readlineSync.question('Pressione ENTER para continuar...');
            }
        }
    }
    exibir() {
        console.clear();
        console.log('\n=== EXIBIR RELATORIO DE AERONAVE ===');
        const aeronaves = this.gerenciadorAeronaves.listarAeronaves();
        if (!aeronaves.length) {
            console.log('Nenhuma aeronave cadastrada.');
            readlineSync.question('\nPressione ENTER para continuar...');
            return;
        }
        aeronaves.forEach((a, i) => console.log(`${i + 1}. ${a.modelo} (${a.codigo})`));
        const indice = parseInt(readlineSync.question('\nEscolha a aeronave (numero): ')) - 1;
        if (indice >= 0 && indice < aeronaves.length) {
            const relatorio = new relatorios_1.Relatorio();
            relatorio.exibirRelatorio(aeronaves[indice]);
        }
        else {
            console.log('\nOpcao invalida!');
        }
        readlineSync.question('\nPressione ENTER para continuar...');
    }
    salvar() {
        console.clear();
        console.log('\n=== SALVAR RELATORIO EM ARQUIVO ===');
        const aeronaves = this.gerenciadorAeronaves.listarAeronaves();
        if (!aeronaves.length) {
            console.log('Nenhuma aeronave cadastrada.');
            readlineSync.question('\nPressione ENTER para continuar...');
            return;
        }
        aeronaves.forEach((a, i) => console.log(`${i + 1}. ${a.modelo} (${a.codigo})`));
        const indice = parseInt(readlineSync.question('\nEscolha a aeronave (numero): ')) - 1;
        if (indice >= 0 && indice < aeronaves.length) {
            const relatorio = new relatorios_1.Relatorio();
            relatorio.salvarEmArquivo(aeronaves[indice]);
        }
        else {
            console.log('\nOpcao invalida!');
        }
        readlineSync.question('\nPressione ENTER para continuar...');
    }
}
exports.RelatorioInterface = RelatorioInterface;
