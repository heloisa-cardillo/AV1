"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Teste = void 0;
class Teste {
    get tipo() { return this._tipo; }
    set tipo(value) { this._tipo = value; }
    get resultado() { return this._resultado; }
    set resultado(value) { this._resultado = value; }
    constructor(tipo, resultado) {
        this._tipo = tipo;
        this._resultado = resultado;
    }
    salvar() {
        console.log(`Teste ${this.tipo} salvo com resultado: ${this.resultado}`);
    }
    carregar() {
        console.log(`Teste ${this.tipo} carregado!`);
    }
}
exports.Teste = Teste;
