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
exports.Relatorio = void 0;
const arquivos_1 = require("./arquivos");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
class Relatorio {
    constructor() {
        this.persistencia = new arquivos_1.Persistencia();
    }
    gerarRelatorio(aeronave) {
        let conteudo = '\n=== RELATÓRIO DA AERONAVE ===\n';
        conteudo += '==============================\n\n';
        // Informações da aeronave
        conteudo += `CÓDIGO: ${aeronave.codigo}\n`;
        conteudo += `MODELO: ${aeronave.modelo}\n`;
        conteudo += `TIPO: ${aeronave.tipo}\n`;
        conteudo += `CAPACIDADE: ${aeronave.capacidade} passageiros\n`;
        conteudo += `ALCANCE: ${aeronave.alcance} km\n`;
        conteudo += `CLIENTE: ${aeronave.cliente}\n`;
        conteudo += `DATA DE ENTREGA: ${aeronave.dataEntrega}\n`;
        // Peças
        conteudo += '\n--- PEÇAS ---\n';
        if (aeronave.pecas.length > 0) {
            aeronave.pecas.forEach((peca, index) => {
                conteudo += `${index + 1}. ${peca.nome} (${peca.codigo})\n`;
                conteudo += `   Fornecedor: ${peca.fornecedor}\n`;
                conteudo += `   Tipo: ${peca.tipo}\n`;
                conteudo += `   Status: ${peca.status}\n\n`;
            });
        }
        else {
            conteudo += 'Nenhuma peça cadastrada.\n\n';
        }
        // Etapas
        conteudo += '--- ETAPAS ---\n';
        if (aeronave.etapas.length > 0) {
            aeronave.etapas.forEach((etapa, index) => {
                conteudo += `${index + 1}. ${etapa.nome}\n`;
                conteudo += `   Prazo: ${etapa.prazo}\n`;
                conteudo += `   Status: ${etapa.status}\n`;
                conteudo += `   Funcionários: ${etapa.funcionarios.map(f => f.nome).join(', ')}\n\n`;
            });
        }
        else {
            conteudo += 'Nenhuma etapa cadastrada.\n\n';
        }
        // Testes
        conteudo += '--- TESTES ---\n';
        if (aeronave.testes.length > 0) {
            aeronave.testes.forEach((teste, index) => {
                conteudo += `${index + 1}. ${teste.tipo} - Resultado: ${teste.resultado}\n`;
            });
        }
        else {
            conteudo += 'Nenhum teste cadastrado.\n';
        }
        return conteudo;
    }
    salvarEmArquivo(aeronave) {
        try {
            const conteudo = this.gerarRelatorio(aeronave);
            // Criar diretório de relatórios se não existir
            const dataDir = path.join(process.cwd(), 'data');
            const relatoriosDir = path.join(dataDir, 'relatorios');
            if (!fs.existsSync(relatoriosDir)) {
                fs.mkdirSync(relatoriosDir, { recursive: true });
            }
            // Gerar nome do arquivo com timestamp
            const timestamp = new Date().toISOString().replace(/[:.]/g, '-').split('T')[0];
            const nomeArquivo = `relatorio_${aeronave.codigo}_${timestamp}.txt`;
            const caminhoArquivo = path.join(relatoriosDir, nomeArquivo);
            // Salvar arquivo
            fs.writeFileSync(caminhoArquivo, conteudo, 'utf-8');
            console.log(`\n✓ Relatório salvo com sucesso em: ${caminhoArquivo}`);
        }
        catch (erro) {
            console.error('Erro ao salvar relatório:', erro);
        }
    }
    exibirRelatorio(aeronave) {
        const conteudo = this.gerarRelatorio(aeronave);
        console.log(conteudo);
    }
}
exports.Relatorio = Relatorio;
