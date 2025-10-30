import * as readlineSync from 'readline-sync';
import { CodigoBase } from './codigoBase';
import { GerenciadorAeronaves } from '../services/gerenciadorAeronaves';
import { Etapa } from '../models/etapa';
import { Funcionario } from '../models/funcionario';
import { StatusEtapa } from '../models/status';

export class EtapaInterface extends CodigoBase {
    private gerenciador: GerenciadorAeronaves;
    private etapas: Etapa[] = [];
    private funcionarios: Funcionario[] = [];

    constructor() {
        super('ETAPA');
        this.gerenciador = new GerenciadorAeronaves();
    }

    protected gerarNovoCodigo(): string {
        return this.gerenciador.gerarCodigoEtapa();
    }

    menu(): void {
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
                case '1': this.cadastrar(); break;
                case '2': this.listar(); break;
                case '3': this.iniciar(); break;
                case '4': this.finalizar(); break;
                case '5': this.associarFuncionario(); break;
                case '6': this.editar(); break;
                case '0': continuar = false; break;
                default:
                    this.exibirErro();
                    this.aguardarEnter();
            }
        }
    }

    cadastrar(): void {
        this.exibirCabecalho('CADASTRAR NOVA ETAPA');
        
        const nome = this.solicitarTexto('Nome');
        const prazo = this.solicitarTexto('Prazo (ex: 2025-12-31)');
        const ordem = parseInt(this.solicitarTexto('Ordem'));
        
        const etapa = new Etapa(nome, prazo, StatusEtapa.NAOINICIADA, [], ordem);
        this.etapas.push(etapa);
        
        this.exibirSucesso('Etapa cadastrada com sucesso!');
        this.aguardarEnter();
    }

    listar(): void {
        this.exibirCabecalho('LISTA DE ETAPAS');
        
        if (this.etapas.length === 0) {
            this.exibirListaVazia('etapa');
        } else {
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

    iniciar(): void {
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
            const etapaSelecionada = this.etapas[indice];
            
            // Verificar se a etapa anterior foi concluída
            const etapaAnteriorConcluida = this.verificarEtapaAnteriorConcluida(etapaSelecionada.ordem);
            
            etapaSelecionada.iniciar(etapaAnteriorConcluida);
            this.exibirSucesso('Etapa iniciada!');
        } else {
            this.exibirErro();
        }
        
        this.aguardarEnter();
    }

    finalizar(): void {
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
        } else {
            this.exibirErro();
        }
        
        this.aguardarEnter();
    }

    associarFuncionario(): void {
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
        } else {
            this.exibirErro();
        }
        
        this.aguardarEnter();
    }

    editar(): void {
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
                        case '1': etapa.status = StatusEtapa.NAOINICIADA; break;
                        case '2': etapa.status = StatusEtapa.EMANDAMENTO; break;
                        case '3': etapa.status = StatusEtapa.CONCLUIDA; break;
                        case '4': etapa.status = StatusEtapa.CANCELADA; break;
                        default: etapa.status = StatusEtapa.NAOINICIADA; break;
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
            
            if (campo !== '0' && campo !== '5') this.aguardarEnter();
        }
    }

    excluir(): void {
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
        } else {
            this.exibirErro();
        }
        
        this.aguardarEnter();
    }

    // Método auxiliar para verificar se a etapa anterior foi concluída
    private verificarEtapaAnteriorConcluida(ordemAtual: number): boolean {
        // Se é a primeira etapa (ordem 1), não precisa de validação
        if (ordemAtual <= 1) {
            return true;
        }

        // Procura a etapa anterior
        const etapaAnterior = this.etapas.find(e => e.ordem === ordemAtual - 1);
        
        // Se não encontrar etapa anterior, assume como concluída
        if (!etapaAnterior) {
            return true;
        }

        // Retorna se a etapa anterior está concluída
        return etapaAnterior.status === StatusEtapa.CONCLUIDA;
    }
}