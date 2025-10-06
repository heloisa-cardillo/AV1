"use strict";
//guardar os dados
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
exports.Persistencia = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
class Persistencia {
    constructor() {
        this.dataDir = path.join(process.cwd(), 'data');
        this.inicializarDiretorio();
    }
    inicializarDiretorio() {
        if (!fs.existsSync(this.dataDir)) {
            fs.mkdirSync(this.dataDir, { recursive: true });
        }
    }
    salvar(nomeArquivo, dados) {
        try {
            const caminhoArquivo = path.join(this.dataDir, nomeArquivo);
            fs.writeFileSync(caminhoArquivo, JSON.stringify(dados, null, 2), 'utf-8');
        }
        catch (erro) {
            console.error(`Erro ao salvar ${nomeArquivo}:`, erro);
        }
    }
    carregar(nomeArquivo) {
        try {
            const caminhoArquivo = path.join(this.dataDir, nomeArquivo);
            if (!fs.existsSync(caminhoArquivo)) {
                return [];
            }
            const conteudo = fs.readFileSync(caminhoArquivo, 'utf-8');
            return JSON.parse(conteudo);
        }
        catch (erro) {
            console.error(`Erro ao carregar ${nomeArquivo}:`, erro);
            return [];
        }
    }
}
exports.Persistencia = Persistencia;
