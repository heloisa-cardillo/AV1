"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EtapaInterface = void 0;
const codigoBase_1 = require("./codigoBase");
const gerenciadorAeronaves_1 = require("../services/gerenciadorAeronaves");
const etapa_1 = require("../models/etapa");
const status_1 = require("../models/status");
class EtapaInterface extends codigoBase_1.CodigoBase {
    constructor() {
        super('ETAPA');
        this.etapas = [];
        this.funcionarios = [];
        this.gerenciador = new gerenciadorAeronaves_1.GerenciadorAeronaves();
    }
    gerarNovoCodigo() {
        return this.gerenciador.gerarCodigoEtapa();
    }
    menu() {
        let continuar = true;
        while (continuar) {
            this.exibirCabecalho('GERENCIAR ETAPAS');
            console.log('1. Cadastrar Nova Etapa');
            console.log('2. Listar Etapas');
            console.log('3. Iniciar Etapa');
            console.log('4. Finalizar Etapa');
            console.log('5. Associar Funcionario a Etapa');
            console.log('6. Editar Etapa');
            console.log('0. Voltar');
            const opcao = this.solicitarOpcao();
            switch (opcao) {
                case '1':
                    this.cadastrar();
                    break;
                case '2':
                    this.listar();
                    break;
                case '3':
                    this.iniciar();
                    break;
                case '4':
                    this.finalizar();
                    break;
                case '5':
                    this.associarFuncionario();
                    break;
                case '6':
                    this.editar();
                    break;
                case '0':
                    continuar = false;
                    break;
                default:
                    this.exibirErro();
                    this.aguardarEnter();
            }
        }
    }
    cadastrar() {
        this.exibirCabecalho('CADASTRAR NOVA ETAPA');
        const nome = this.solicitarTexto('Nome');
        const prazo = this.solicitarTexto('Prazo (ex: 2025-12-31)');
        const ordem = parseInt(this.solicitarTexto('Ordem'));
        const etapa = new etapa_1.Etapa(nome, prazo, status_1.StatusEtapa.NAOINICIADA, [], ordem);
        this.etapas.push(etapa);
        this.exibirSucesso('Etapa cadastrada com sucesso!');
        this.aguardarEnter();
    }
    listar() {
        this.exibirCabecalho('LISTA DE ETAPAS');
        if (this.etapas.length === 0) {
            this.exibirListaVazia('etapa');
        }
        else {
            this.etapas.forEach((etapa, index) => {
                console.log(`\n${index + 1}. ${etapa.nome}`);
                console.log(`   Ordem: ${etapa.ordem}`);
                console.log(`   Prazo: ${etapa.prazo}`);
                console.log(`   Status: ${etapa.status}`);
                console.log(`   Funcionarios: ${etapa.funcionarios.length}`);
            });
        }
        this.aguardarEnter();
    }
    iniciar() {
        this.exibirCabecalho('INICIAR ETAPA');
        if (this.etapas.length === 0) {
            this.exibirListaVazia('etapa');
            this.aguardarEnter();
            return;
        }
        this.etapas.forEach((etapa, index) => {
            console.log(`${index + 1}. ${etapa.nome} - Status: ${etapa.status}`);
        });
        const indice = parseInt(this.solicitarOpcao('\nEscolha a etapa (numero): ')) - 1;
        if (this.validarIndice(indice, this.etapas.length)) {
            this.etapas[indice].iniciar();
            this.exibirSucesso('Etapa iniciada!');
        }
        else {
            this.exibirErro();
        }
        this.aguardarEnter();
    }
    finalizar() {
        this.exibirCabecalho('FINALIZAR ETAPA');
        if (this.etapas.length === 0) {
            this.exibirListaVazia('etapa');
            this.aguardarEnter();
            return;
        }
        this.etapas.forEach((etapa, index) => {
            console.log(`${index + 1}. ${etapa.nome} - Status: ${etapa.status}`);
        });
        const indice = parseInt(this.solicitarOpcao('\nEscolha a etapa (numero): ')) - 1;
        if (this.validarIndice(indice, this.etapas.length)) {
            this.etapas[indice].finalizar();
            this.exibirSucesso('Etapa finalizada!');
        }
        else {
            this.exibirErro();
        }
        this.aguardarEnter();
    }
    associarFuncionario() {
        this.exibirCabecalho('ASSOCIAR FUNCIONARIO A ETAPA');
        if (this.etapas.length === 0) {
            this.exibirListaVazia('etapa');
            this.aguardarEnter();
            return;
        }
        this.etapas.forEach((etapa, index) => {
            console.log(`${index + 1}. ${etapa.nome}`);
        });
        const indiceEtapa = parseInt(this.solicitarOpcao('\nEscolha a etapa (numero): ')) - 1;
        if (!this.validarIndice(indiceEtapa, this.etapas.length)) {
            this.exibirErro();
            this.aguardarEnter();
            return;
        }
        if (this.funcionarios.length === 0) {
            this.exibirListaVazia('funcionario');
            this.aguardarEnter();
            return;
        }
        this.funcionarios.forEach((func, index) => {
            console.log(`${index + 1}. ${func.nome} (${func.nivelPermissao})`);
        });
        const indiceFuncionario = parseInt(this.solicitarOpcao('\nEscolha o funcionario (numero): ')) - 1;
        if (this.validarIndice(indiceFuncionario, this.funcionarios.length)) {
            this.etapas[indiceEtapa].associarFuncionario(this.funcionarios[indiceFuncionario]);
            this.exibirSucesso('Funcionario associado com sucesso!');
        }
        else {
            this.exibirErro();
        }
        this.aguardarEnter();
    }
    editar() {
        this.exibirCabecalho('EDITAR ETAPA');
        if (this.etapas.length === 0) {
            this.exibirListaVazia('etapa');
            this.aguardarEnter();
            return;
        }
        this.etapas.forEach((etapa, index) => {
            console.log(`${index + 1}. ${etapa.nome} (Ordem: ${etapa.ordem})`);
        });
        const indice = parseInt(this.solicitarOpcao('\nEscolha a etapa (numero): ')) - 1;
        if (!this.validarIndice(indice, this.etapas.length)) {
            this.exibirErro();
            this.aguardarEnter();
            return;
        }
        const etapa = this.etapas[indice];
        let continuar = true;
        while (continuar) {
            this.exibirCabecalho('EDITAR ETAPA');
            console.log(`1. Nome: ${etapa.nome}`);
            console.log(`2. Prazo: ${etapa.prazo}`);
            console.log(`3. Ordem: ${etapa.ordem}`);
            console.log(`4. Status: ${etapa.status}`);
            console.log('5. Excluir Etapa');
            console.log('0. Voltar');
            const campo = this.solicitarOpcao('\nEscolha o campo a editar: ');
            switch (campo) {
                case '1':
                    etapa.nome = this.solicitarTexto('Novo Nome');
                    this.exibirSucesso('Nome atualizado!');
                    break;
                case '2':
                    etapa.prazo = this.solicitarTexto('Novo Prazo (ex: 2025-12-31)');
                    this.exibirSucesso('Prazo atualizado!');
                    break;
                case '3':
                    etapa.ordem = parseInt(this.solicitarTexto('Nova Ordem'));
                    this.exibirSucesso('Ordem atualizada!');
                    break;
                case '4':
                    console.log('\n1. NAO INICIADA\n2. EM ANDAMENTO\n3. CONCLUIDA\n4. CANCELADA');
                    const statusOpcao = this.solicitarOpcao('Escolha o status: ');
                    switch (statusOpcao) {
                        case '1':
                            etapa.status = status_1.StatusEtapa.NAOINICIADA;
                            break;
                        case '2':
                            etapa.status = status_1.StatusEtapa.EMANDAMENTO;
                            break;
                        case '3':
                            etapa.status = status_1.StatusEtapa.CONCLUIDA;
                            break;
                        case '4':
                            etapa.status = status_1.StatusEtapa.CANCELADA;
                            break;
                        default:
                            etapa.status = status_1.StatusEtapa.NAOINICIADA;
                            break;
                    }
                    this.exibirSucesso('Status atualizado!');
                    break;
                case '5':
                    this.excluir();
                    continuar = false;
                    break;
                case '0':
                    continuar = false;
                    break;
                default:
                    this.exibirErro();
            }
            if (campo !== '0' && campo !== '5')
                this.aguardarEnter();
        }
    }
    excluir() {
        this.exibirCabecalho('EXCLUIR ETAPA');
        if (this.etapas.length === 0) {
            this.exibirListaVazia('etapa');
            this.aguardarEnter();
            return;
        }
        this.etapas.forEach((etapa, index) => {
            console.log(`${index + 1}. ${etapa.nome} - Ordem: ${etapa.ordem}`);
        });
        const indice = parseInt(this.solicitarOpcao('\nEscolha a etapa para excluir (numero): ')) - 1;
        if (this.validarIndice(indice, this.etapas.length)) {
            const etapaRemovida = this.etapas.splice(indice, 1)[0];
            this.exibirSucesso(`Etapa ${etapaRemovida.nome} excluida com sucesso!`);
        }
        else {
            this.exibirErro();
        }
        this.aguardarEnter();
    }
}
exports.EtapaInterface = EtapaInterface;
