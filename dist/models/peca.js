"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Peca = void 0;
class Peca {
    get nome() { return this._nome; }
    set nome(value) { this._nome = value; }
    get codigo() { return this._codigo; }
    set codigo(value) { this._codigo = value; }
    get fornecedor() { return this._fornecedor; }
    set fornecedor(value) { this._fornecedor = value; }
    get status() { return this._status; }
    set status(value) { this._status = value; }
    get tipo() { return this._tipo; }
    set tipo(value) { this._tipo = value; }
    constructor(nome, codigo, fornecedor, status, tipo) {
        this._nome = nome;
        this._codigo = codigo;
        this._fornecedor = fornecedor;
        this._status = status;
        this._tipo = tipo;
    }
    atualizarStatus(novoStatus) {
        this._status = novoStatus;
        console.log(`Status da peça ${this.nome} atualizado para ${novoStatus}`);
    }
    salvar() {
        console.log(`Peça ${this.nome} salva com sucesso!`);
    }
    carregar() {
        console.log(`Peça ${this.nome} carregada!`);
    }
}
exports.Peca = Peca;
