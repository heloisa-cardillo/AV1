"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Etapa = void 0;
const status_1 = require("./status");
class Etapa {
    get nome() { return this._nome; }
    set nome(value) { this._nome = value; }
    get prazo() { return this._prazo; }
    set prazo(value) { this._prazo = value; }
    get status() { return this._status; }
    set status(value) { this._status = value; }
    get ordem() { return this._ordem; }
    set ordem(value) { this._ordem = value; }
    get funcionarios() { return this._funcionarios; }
    constructor(nome, prazo, status, funcionarios, ordem) {
        this._nome = nome;
        this._prazo = prazo;
        this._status = status;
        this._funcionarios = funcionarios;
        this._ordem = ordem;
    }
    iniciar() {
        if (this.status === status_1.StatusEtapa.CONCLUIDA) {
            console.log(`ERRO: A etapa ${this.nome} já foi concluída e não pode ser reiniciada!`);
            return;
        }
        this.status = status_1.StatusEtapa.EMANDAMENTO;
        console.log(`Etapa ${this.nome} iniciada!`);
    }
    finalizar() {
        if (this.status === status_1.StatusEtapa.NAOINICIADA) {
            console.log(`ERRO: A etapa ${this.nome} precisa ser iniciada antes de ser finalizada!`);
            return;
        }
        if (this.status === status_1.StatusEtapa.CONCLUIDA) {
            console.log(`AVISO: A etapa ${this.nome} já está concluída!`);
            return;
        }
        this.status = status_1.StatusEtapa.CONCLUIDA;
        console.log(`Etapa ${this.nome} finalizada!`);
    }
    associarFuncionario(funcionario) {
        if (this.funcionarioJaAssociado(funcionario.id)) {
            console.log(`AVISO: O funcionário ${funcionario.nome} já está associado à etapa ${this.nome}!`);
            return;
        }
        this._funcionarios.push(funcionario);
        console.log(`Funcionário ${funcionario.nome} associado à etapa ${this.nome}`);
    }
    funcionarioJaAssociado(idFuncionario) {
        return this._funcionarios.some(func => func.id === idFuncionario);
    }
    listarFuncionarios() {
        return this._funcionarios;
    }
}
exports.Etapa = Etapa;
