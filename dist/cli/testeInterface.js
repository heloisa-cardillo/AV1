"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TesteInterface = void 0;
const teste_1 = require("../models/teste");
const types_1 = require("../models/types");
const permissions_1 = require("../models/permissions");
const codigoBase_1 = require("./codigoBase");
class TesteInterface extends codigoBase_1.CodigoBase {
    constructor() {
        super('TESTE');
        this.testes = [];
    }
    gerarNovoCodigo() {
        return `TESTE-${this.testes.length + 1}`;
    }
    menu() {
        let continuar = true;
        while (continuar) {
            this.exibirCabecalho('EXECUTAR TESTES');
            console.log('1. Executar Novo Teste');
            console.log('2. Listar Testes');
            console.log('3. Editar Teste');
            console.log('4. Excluir Teste');
            console.log('0. Voltar');
            const opcao = this.solicitarOpcao();
            switch (opcao) {
                case '1':
                    this.executar();
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
    executar() {
        this.exibirCabecalho('EXECUTAR NOVO TESTE');
        console.log('Tipos de teste:');
        console.log('1. ELETRICO');
        console.log('2. HIDRAULICO');
        console.log('3. AERODINAMICO');
        const tipoOpcao = this.solicitarOpcao('Escolha o tipo: ');
        let tipo;
        switch (tipoOpcao) {
            case '1':
                tipo = types_1.TipoTeste.ELETRICO;
                break;
            case '2':
                tipo = types_1.TipoTeste.HIDRAULICO;
                break;
            case '3':
                tipo = types_1.TipoTeste.AERODINAMICO;
                break;
            default:
                tipo = types_1.TipoTeste.ELETRICO;
                break;
        }
        console.log('\nResultados:\n1. APROVADO\n2. REPROVADO');
        const resultadoOpcao = this.solicitarOpcao('Escolha o resultado: ');
        const resultado = resultadoOpcao === '1' ? permissions_1.ResultadoTeste.APROVADO : permissions_1.ResultadoTeste.REPROVADO;
        const teste = new teste_1.Teste(tipo, resultado);
        this.testes.push(teste);
        this.exibirSucesso('Teste executado e registrado com sucesso!');
        this.aguardarEnter();
    }
    listar() {
        this.exibirCabecalho('LISTA DE TESTES');
        if (this.testes.length === 0) {
            this.exibirListaVazia('teste');
        }
        else {
            this.testes.forEach((t, index) => {
                console.log(`${index + 1}. Tipo: ${t.tipo} - Resultado: ${t.resultado}`);
            });
        }
        this.aguardarEnter();
    }
    editar() {
        this.exibirCabecalho('EDITAR TESTE');
        if (this.testes.length === 0) {
            this.exibirListaVazia('teste');
            this.aguardarEnter();
            return;
        }
        this.testes.forEach((t, index) => {
            console.log(`${index + 1}. Tipo: ${t.tipo} - Resultado: ${t.resultado}`);
        });
        const indice = parseInt(this.solicitarOpcao('\nEscolha o teste (numero): ')) - 1;
        if (!this.validarIndice(indice, this.testes.length)) {
            this.exibirErro();
            this.aguardarEnter();
            return;
        }
        const teste = this.testes[indice];
        let continuar = true;
        while (continuar) {
            this.exibirCabecalho('EDITAR TESTE');
            console.log(`1. Tipo: ${teste.tipo}`);
            console.log(`2. Resultado: ${teste.resultado}`);
            console.log('0. Voltar');
            const campo = this.solicitarOpcao('\nEscolha o campo a editar: ');
            switch (campo) {
                case '1':
                    console.log('\nTipos de teste:\n1. ELETRICO\n2. HIDRAULICO\n3. AERODINAMICO');
                    const tipoOpcao = this.solicitarOpcao('Escolha o tipo: ');
                    switch (tipoOpcao) {
                        case '1':
                            teste.tipo = types_1.TipoTeste.ELETRICO;
                            break;
                        case '2':
                            teste.tipo = types_1.TipoTeste.HIDRAULICO;
                            break;
                        case '3':
                            teste.tipo = types_1.TipoTeste.AERODINAMICO;
                            break;
                        default:
                            teste.tipo = types_1.TipoTeste.ELETRICO;
                            break;
                    }
                    this.exibirSucesso('Tipo atualizado!');
                    break;
                case '2':
                    console.log('\nResultados:\n1. APROVADO\n2. REPROVADO');
                    const resultadoOpcao = this.solicitarOpcao('Escolha o resultado: ');
                    teste.resultado = resultadoOpcao === '1' ? permissions_1.ResultadoTeste.APROVADO : permissions_1.ResultadoTeste.REPROVADO;
                    this.exibirSucesso('Resultado atualizado!');
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
        this.exibirCabecalho('EXCLUIR TESTE');
        if (this.testes.length === 0) {
            this.exibirListaVazia('teste');
            this.aguardarEnter();
            return;
        }
        this.testes.forEach((t, index) => {
            console.log(`${index + 1}. Tipo: ${t.tipo} - Resultado: ${t.resultado}`);
        });
        const indice = parseInt(this.solicitarOpcao('\nEscolha o teste para excluir (numero): ')) - 1;
        if (this.validarIndice(indice, this.testes.length)) {
            const removido = this.testes.splice(indice, 1)[0];
            this.exibirSucesso(`Teste ${removido.tipo} excluido com sucesso!`);
        }
        else {
            this.exibirErro();
        }
        this.aguardarEnter();
    }
    // Métodos necessários para a interface base
    cadastrar() {
        this.executar();
    }
}
exports.TesteInterface = TesteInterface;
