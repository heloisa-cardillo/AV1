"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Funcionario = void 0;
class Funcionario {
    get id() { return this._id; }
    set id(value) { this._id = value; }
    get nome() { return this._nome; }
    set nome(value) { this._nome = value; }
    get telefone() { return this._telefone; }
    set telefone(value) { this._telefone = value; }
    get endereco() { return this._endereco; }
    set endereco(value) { this._endereco = value; }
    get usuario() { return this._usuario; }
    set usuario(value) { this._usuario = value; }
    get senha() { return this._senha; }
    set senha(value) { this._senha = value; }
    get nivelPermissao() { return this._nivelPermissao; }
    set nivelPermissao(value) { this._nivelPermissao = value; }
    constructor(id, nome, telefone, endereco, usuario, senha, nivelPermissao) {
        this._id = id;
        this._nome = nome;
        this._telefone = telefone;
        this._endereco = endereco;
        this._usuario = usuario;
        this._senha = senha;
        this._nivelPermissao = nivelPermissao;
    }
    autenticar(usuario, senha) {
        return this._usuario === usuario && this._senha === senha;
    }
    salvar() {
        console.log(`Funcionário ${this.nome} salvo com sucesso!`);
    }
    carregar() {
        console.log(`Funcionário ${this.nome} carregado!`);
    }
}
exports.Funcionario = Funcionario;
