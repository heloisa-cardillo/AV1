"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PecaInterface = void 0;
const gerenciadorAeronaves_1 = require("../services/gerenciadorAeronaves");
const peca_1 = require("../models/peca");
const types_1 = require("../models/types");
const status_1 = require("../models/status");
const codigoBase_1 = require("./codigoBase");
class PecaInterface extends codigoBase_1.CodigoBase {
    constructor() {
        super('PEÇA');
        this.pecas = [];
        this.gerenciador = new gerenciadorAeronaves_1.GerenciadorAeronaves();
    }
    gerarNovoCodigo() {
        return this.gerenciador.gerarCodigoPeca();
    }
    menu() {
        let continuar = true;
        while (continuar) {
            this.exibirCabecalho('GERENCIAR PECAS');
            console.log('1. Cadastrar Nova Peca');
            console.log('2. Listar Pecas');
            console.log('3. Atualizar Status de Peca');
            console.log('4. Excluir Peca');
            console.log('5. Editar Peca');
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
                    this.atualizarStatus();
                    break;
                case '4':
                    this.excluir();
                    break;
                case '5':
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
        this.exibirCabecalho('CADASTRAR NOVA PECA');
        const nome = this.solicitarTexto('Nome');
        const codigo = this.gerarNovoCodigo();
        const fornecedor = this.solicitarTexto('Fornecedor');
        console.log('\nTipos disponiveis:\n1. NACIONAL\n2. IMPORTADA');
        const tipoOpcao = this.solicitarOpcao('Escolha o tipo: ');
        const tipo = tipoOpcao === '1' ? types_1.TipoPeca.NACIONAL : types_1.TipoPeca.IMPORTADA;
        console.log('\nStatus disponiveis:\n1. EM PRODUCAO\n2. EM TRANSPORTE\n3. PRONTA');
        const statusOpcao = this.solicitarOpcao('Escolha o status: ');
        let status;
        switch (statusOpcao) {
            case '1':
                status = status_1.StatusPeca.EMPRODUCAO;
                break;
            case '2':
                status = status_1.StatusPeca.EMTRANSPORTE;
                break;
            case '3':
                status = status_1.StatusPeca.PRONTA;
                break;
            default: status = status_1.StatusPeca.EMPRODUCAO;
        }
        const peca = new peca_1.Peca(nome, codigo, fornecedor, status, tipo);
        this.pecas.push(peca);
        this.exibirSucesso('Peca cadastrada com sucesso!');
        this.aguardarEnter();
    }
    listar() {
        this.exibirCabecalho('LISTA DE PECAS');
        if (this.pecas.length === 0) {
            this.exibirListaVazia('peca');
        }
        else {
            this.pecas.forEach((p, i) => {
                console.log(`\n${i + 1}. ${p.nome}`);
                console.log(`   Codigo: ${p.codigo}`);
                console.log(`   Fornecedor: ${p.fornecedor}`);
                console.log(`   Tipo: ${p.tipo}`);
                console.log(`   Status: ${p.status}`);
            });
        }
        this.aguardarEnter();
    }
    atualizarStatus() {
        this.exibirCabecalho('ATUALIZAR STATUS DE PECA');
        if (this.pecas.length === 0) {
            this.exibirListaVazia('peca');
            this.aguardarEnter();
            return;
        }
        this.pecas.forEach((p, i) => {
            console.log(`${i + 1}. ${p.nome} - Status: ${p.status}`);
        });
        const indice = parseInt(this.solicitarOpcao('\nEscolha a peca (numero): ')) - 1;
        if (!this.validarIndice(indice, this.pecas.length)) {
            this.exibirErro();
            this.aguardarEnter();
            return;
        }
        console.log('\nStatus disponiveis:\n1. EM PRODUCAO\n2. EM TRANSPORTE\n3. PRONTA');
        const statusOpcao = this.solicitarOpcao('Escolha o status: ');
        let status;
        switch (statusOpcao) {
            case '1':
                status = status_1.StatusPeca.EMPRODUCAO;
                break;
            case '2':
                status = status_1.StatusPeca.EMTRANSPORTE;
                break;
            case '3':
                status = status_1.StatusPeca.PRONTA;
                break;
            default: status = status_1.StatusPeca.EMPRODUCAO;
        }
        this.pecas[indice].status = status;
        this.exibirSucesso('Status atualizado com sucesso!');
        this.aguardarEnter();
    }
    excluir() {
        this.exibirCabecalho('EXCLUIR PECA');
        if (this.pecas.length === 0) {
            this.exibirListaVazia('peca');
            this.aguardarEnter();
            return;
        }
        this.pecas.forEach((p, i) => {
            console.log(`${i + 1}. ${p.nome}`);
        });
        const indice = parseInt(this.solicitarOpcao('\nEscolha a peca para excluir (numero): ')) - 1;
        if (this.validarIndice(indice, this.pecas.length)) {
            const removida = this.pecas.splice(indice, 1)[0];
            this.exibirSucesso(`Peca ${removida.nome} excluida com sucesso!`);
        }
        else {
            this.exibirErro();
        }
        this.aguardarEnter();
    }
    editar() {
        this.exibirCabecalho('EDITAR PECA');
        if (this.pecas.length === 0) {
            this.exibirListaVazia('peca');
            this.aguardarEnter();
            return;
        }
        this.pecas.forEach((p, i) => {
            console.log(`${i + 1}. ${p.nome}`);
        });
        const indice = parseInt(this.solicitarOpcao('\nEscolha a peca (numero): ')) - 1;
        if (!this.validarIndice(indice, this.pecas.length)) {
            this.exibirErro();
            this.aguardarEnter();
            return;
        }
        const peca = this.pecas[indice];
        let continuar = true;
        while (continuar) {
            this.exibirCabecalho(`EDITAR PECA: ${peca.nome}`);
            console.log(`1. Nome: ${peca.nome}`);
            console.log(`2. Fornecedor: ${peca.fornecedor}`);
            console.log(`3. Tipo: ${peca.tipo}`);
            console.log('0. Voltar');
            const campo = this.solicitarOpcao('\nEscolha o campo a editar: ');
            switch (campo) {
                case '1':
                    peca.nome = this.solicitarTexto('Novo Nome');
                    this.exibirSucesso('Nome atualizado!');
                    break;
                case '2':
                    peca.fornecedor = this.solicitarTexto('Novo Fornecedor');
                    this.exibirSucesso('Fornecedor atualizado!');
                    break;
                case '3':
                    console.log('\nTipos disponiveis:\n1. NACIONAL\n2. IMPORTADA');
                    const tipoOpcao = this.solicitarOpcao('Escolha o tipo: ');
                    peca.tipo = tipoOpcao === '1' ? types_1.TipoPeca.NACIONAL : types_1.TipoPeca.IMPORTADA;
                    this.exibirSucesso('Tipo atualizado!');
                    break;
                case '0':
                    continuar = false;
                    break;
                default:
                    this.exibirErro();
            }
            if (campo !== '0')
                this.aguardarEnter();
        }
    }
}
exports.PecaInterface = PecaInterface;
