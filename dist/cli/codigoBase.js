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
exports.CodigoBase = void 0;
const readlineSync = __importStar(require("readline-sync"));
class CodigoBase {
    constructor(tipo) {
        this._ultimoCodigo = '';
        this.tipo = tipo;
    }
    gerarEExibirCodigo() {
        const codigo = this.gerarNovoCodigo();
        this._ultimoCodigo = codigo;
        console.log(`Código gerado: ${codigo}`);
        return codigo;
    }
    // Getters e Setters
    getUltimoCodigo() {
        return this._ultimoCodigo;
    }
    setUltimoCodigo(codigo) {
        this._ultimoCodigo = codigo;
    }
    aguardarEnter(mensagem = '\nPressione ENTER para continuar...') {
        readlineSync.question(mensagem);
    }
    limparTela() {
        console.clear();
    }
    exibirErro(mensagem = 'Opção inválida!') {
        console.log(`\n${mensagem}`);
    }
    exibirSucesso(mensagem) {
        console.log(`\n${mensagem}`);
    }
    exibirCabecalho(titulo) {
        this.limparTela();
        console.log(`\n=== ${titulo.toUpperCase()} ===`);
    }
    exibirListaVazia(entidade) {
        console.log(`Nenhum(a) ${entidade} cadastrado(a).`);
    }
    validarIndice(indice, tamanhoLista) {
        return indice >= 0 && indice < tamanhoLista;
    }
    solicitarOpcao(mensagem = '\nEscolha uma opção: ') {
        return readlineSync.question(mensagem);
    }
    solicitarTexto(campo) {
        return readlineSync.question(`${campo}: `);
    }
}
exports.CodigoBase = CodigoBase;
