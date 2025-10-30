"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FuncionarioInterface = void 0;
const gerenciadorAeronaves_1 = require("../services/gerenciadorAeronaves");
const gerenciadorPermissoes_1 = require("../services/gerenciadorPermissoes");
const funcionario_1 = require("../models/funcionario");
const permissions_1 = require("../models/permissions");
const codigoBase_1 = require("./codigoBase");
class FuncionarioInterface extends codigoBase_1.CodigoBase {
    constructor() {
        super('FUNCIONÁRIO');
        this.funcionarios = [];
        this.gerenciador = new gerenciadorAeronaves_1.GerenciadorAeronaves();
        this.gerenciadorPermissoes = new gerenciadorPermissoes_1.GerenciadorPermissoes();
    }
    gerarNovoCodigo() {
        return `FUNC-${Date.now()}`;
    }
    menu() {
        let continuar = true;
        while (continuar) {
            this.exibirCabecalho('GERENCIAR FUNCIONÁRIOS');
            console.log('1. Cadastrar Novo Funcionário');
            console.log('2. Listar Funcionários');
            console.log('3. Editar Funcionário');
            console.log('4. Excluir Funcionário');
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
                    this.editar();
                    break;
                case '4':
                    this.excluir();
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
        this.exibirCabecalho('CADASTRAR NOVO FUNCIONÁRIO');
        const nome = this.solicitarTexto('Nome');
        const telefone = this.solicitarTexto('Telefone');
        const endereco = this.solicitarTexto('Endereço');
        const usuario = this.solicitarTexto('Usuário');
        const senha = this.solicitarTexto('Senha');
        console.log('\nNíveis de permissão:');
        console.log('1. ADMINISTRADOR');
        console.log('2. ENGENHEIRO');
        console.log('3. OPERADOR');
        const nivelOpcao = this.solicitarOpcao('Escolha o nível: ');
        let nivel;
        switch (nivelOpcao) {
            case '1':
                nivel = permissions_1.NivelPermissao.ADMINISTRADOR;
                break;
            case '2':
                nivel = permissions_1.NivelPermissao.ENGENHEIRO;
                break;
            case '3':
                nivel = permissions_1.NivelPermissao.OPERADOR;
                break;
            default:
                nivel = permissions_1.NivelPermissao.OPERADOR;
                break;
        }
        const funcionario = new funcionario_1.Funcionario(this.gerarNovoCodigo(), nome, telefone, endereco, usuario, senha, nivel);
        this.funcionarios.push(funcionario);
        this.exibirSucesso('Funcionário cadastrado com sucesso!');
        this.aguardarEnter();
    }
    listar() {
        this.exibirCabecalho('LISTA DE FUNCIONÁRIOS');
        if (this.funcionarios.length === 0) {
            this.exibirListaVazia('funcionário');
        }
        else {
            this.funcionarios.forEach((func, index) => {
                console.log(`\n${index + 1}. ${func.id} - ${func.nome}`);
                console.log(`   Usuário: ${func.usuario} | Nível: ${func.nivelPermissao}`);
            });
        }
        this.aguardarEnter();
    }
    editar() {
        this.exibirCabecalho('EDITAR FUNCIONÁRIO');
        if (this.funcionarios.length === 0) {
            this.exibirListaVazia('funcionário');
            this.aguardarEnter();
            return;
        }
        this.funcionarios.forEach((func, index) => {
            console.log(`${index + 1}. ${func.id} - ${func.nome} (${func.nivelPermissao})`);
        });
        const indice = parseInt(this.solicitarOpcao('\nEscolha o funcionário (número): ')) - 1;
        if (!this.validarIndice(indice, this.funcionarios.length)) {
            this.exibirErro();
            this.aguardarEnter();
            return;
        }
        const funcionario = this.funcionarios[indice];
        let continuar = true;
        while (continuar) {
            this.exibirCabecalho('EDITAR FUNCIONÁRIO');
            console.log(`1. Nome: ${funcionario.nome}`);
            console.log(`2. Telefone: ${funcionario.telefone}`);
            console.log(`3. Endereço: ${funcionario.endereco}`);
            console.log(`4. Nível de Permissão: ${funcionario.nivelPermissao}`);
            console.log('0. Voltar');
            const campo = this.solicitarOpcao('\nEscolha o campo a editar: ');
            switch (campo) {
                case '1':
                    funcionario.nome = this.solicitarTexto('Novo Nome');
                    this.exibirSucesso('Nome atualizado!');
                    break;
                case '2':
                    funcionario.telefone = this.solicitarTexto('Novo Telefone');
                    this.exibirSucesso('Telefone atualizado!');
                    break;
                case '3':
                    funcionario.endereco = this.solicitarTexto('Novo Endereço');
                    this.exibirSucesso('Endereço atualizado!');
                    break;
                case '4':
                    console.log('\nNíveis de permissão:');
                    console.log('1. ADMINISTRADOR');
                    console.log('2. ENGENHEIRO');
                    console.log('3. OPERADOR');
                    const nivelOpcao = this.solicitarOpcao('Escolha o nível: ');
                    switch (nivelOpcao) {
                        case '1':
                            funcionario.nivelPermissao = permissions_1.NivelPermissao.ADMINISTRADOR;
                            break;
                        case '2':
                            funcionario.nivelPermissao = permissions_1.NivelPermissao.ENGENHEIRO;
                            break;
                        case '3':
                            funcionario.nivelPermissao = permissions_1.NivelPermissao.OPERADOR;
                            break;
                        default:
                            funcionario.nivelPermissao = permissions_1.NivelPermissao.OPERADOR;
                            break;
                    }
                    this.exibirSucesso('Nível de permissão atualizado!');
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
    excluir() {
        this.exibirCabecalho('EXCLUIR FUNCIONÁRIO');
        if (this.funcionarios.length === 0) {
            this.exibirListaVazia('funcionário');
            this.aguardarEnter();
            return;
        }
        this.funcionarios.forEach((func, index) => {
            console.log(`${index + 1}. ${func.id} - ${func.nome} (${func.nivelPermissao})`);
        });
        const indice = parseInt(this.solicitarOpcao('\nEscolha o funcionário para excluir (número): ')) - 1;
        if (this.validarIndice(indice, this.funcionarios.length)) {
            const removido = this.funcionarios.splice(indice, 1)[0];
            this.exibirSucesso(`Funcionário ${removido.nome} excluído com sucesso!`);
        }
        else {
            this.exibirErro();
        }
        this.aguardarEnter();
    }
}
exports.FuncionarioInterface = FuncionarioInterface;
