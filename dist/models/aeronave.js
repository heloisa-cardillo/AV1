"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Aeronave = void 0;
const status_1 = require("./status");
class Aeronave {
    get codigo() { return this._codigo; }
    set codigo(value) { this._codigo = value; }
    get modelo() { return this._modelo; }
    set modelo(value) { this._modelo = value; }
    get tipo() { return this._tipo; }
    set tipo(value) { this._tipo = value; }
    get capacidade() { return this._capacidade; }
    set capacidade(value) { this._capacidade = value; }
    get alcance() { return this._alcance; }
    set alcance(value) { this._alcance = value; }
    get cliente() { return this._cliente; }
    set cliente(value) { this._cliente = value; }
    get dataEntrega() { return this._dataEntrega; }
    set dataEntrega(value) { this._dataEntrega = value; }
    get pecas() { return this._pecas; }
    get etapas() { return this._etapas; }
    get testes() { return this._testes; }
    constructor(codigo, modelo, tipo, capacidade, alcance, cliente = '', dataEntrega = '') {
        this._codigo = codigo;
        this._modelo = modelo;
        this._tipo = tipo;
        this._capacidade = capacidade;
        this._alcance = alcance;
        this._cliente = cliente;
        this._dataEntrega = dataEntrega;
        this._pecas = [];
        this._etapas = [];
        this._testes = [];
    }
    detalhes() {
        console.log(`Código: ${this.codigo}`);
        console.log(`Modelo: ${this.modelo}`);
        console.log(`Tipo: ${this.tipo}`);
        console.log(`Capacidade: ${this.capacidade} passageiros`);
        console.log(`Alcance: ${this.alcance} km`);
        if (this.cliente)
            console.log(`Cliente: ${this.cliente}`);
        if (this.dataEntrega) {
            const [ano, mes, dia] = this.dataEntrega.split('-');
            console.log(`Data de Entrega: ${dia}/${mes}/${ano}`);
        }
        console.log(`Peças: ${this.pecas.length}`);
        console.log(`Etapas: ${this.etapas.length}`);
        console.log(`Testes: ${this.testes.length}`);
    }
    adicionarPeca(peca) {
        this.pecas.push(peca);
        console.log(`Peça ${peca.nome} adicionada à aeronave ${this.modelo}`);
    }
    adicionarEtapa(etapa) {
        if (this.etapas.length > 0) {
            const ultimaEtapa = this.etapas[this.etapas.length - 1];
            if (etapa.ordem !== ultimaEtapa.ordem + 1) {
                console.log(`ERRO: A etapa ${etapa.nome} não pode ser adicionada! Ordem esperada: ${ultimaEtapa.ordem + 1}, ordem recebida: ${etapa.ordem}`);
                return;
            }
            if (ultimaEtapa.status !== status_1.StatusEtapa.CONCLUIDA) {
                console.log(`AVISO: A etapa anterior "${ultimaEtapa.nome}" ainda não foi concluída!`);
            }
        }
        else {
            if (etapa.ordem !== 1) {
                console.log(`ERRO: A primeira etapa deve ter ordem 1! Ordem recebida: ${etapa.ordem}`);
                return;
            }
        }
        this.etapas.push(etapa);
        console.log(`Etapa ${etapa.nome} adicionada à aeronave ${this.modelo}`);
    }
    adicionarTeste(teste) {
        this.testes.push(teste);
        console.log(`Teste ${teste.tipo} adicionado à aeronave ${this.modelo}`);
    }
    listarPecas() {
        return this.pecas;
    }
    listarEtapas() {
        return this.etapas;
    }
    listarTestes() {
        return this.testes;
    }
    salvar() {
        console.log(`Aeronave ${this.modelo} salva com sucesso!`);
    }
    carregar() {
        console.log(`Aeronave ${this.modelo} carregada!`);
    }
}
exports.Aeronave = Aeronave;
