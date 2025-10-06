import * as readlineSync from 'readline-sync';
import { GerenciadorAeronaves } from '../services/gerenciadorAeronaves';
import { Aeronave } from '../models/aeronave';
import { TipoAeronave } from '../models/types';
import { Peca } from '../models/peca';
import { Etapa } from '../models/etapa';
import { Teste } from '../models/teste';
import { CodigoBase } from './codigoBase';

export class AeronaveInterface extends CodigoBase {
    private gerenciador: GerenciadorAeronaves;
    private aeronaves: Aeronave[] = [];
    private pecas: Peca[] = [];
    private etapas: Etapa[] = [];
    private testes: Teste[] = [];

    constructor() {
        super('AERONAVE');
        this.gerenciador = new GerenciadorAeronaves();
    }

    protected gerarNovoCodigo(): string {
        return this.gerenciador.gerarCodigoAeronave();
    }

    menu(): void {
        let continuar = true;
        while (continuar) {
            this.exibirCabecalho('GERENCIAR AERONAVES');
            console.log('1. Cadastrar Nova Aeronave');
            console.log('2. Listar Aeronaves');
            console.log('3. Editar Aeronave');
            console.log('4. Excluir Aeronave');
            console.log('0. Voltar');

            const opcao = this.solicitarOpcao();

            switch (opcao) {
                case '1': this.cadastrar(); break;
                case '2': this.listar(); break;
                case '3': this.editar(); break;
                case '4': this.excluir(); break;
                case '0': continuar = false; break;
                default:
                    this.exibirErro();
                    this.aguardarEnter();
            }
        }
    }

    cadastrar(): void {
        this.exibirCabecalho('CADASTRAR NOVA AERONAVE');
        
        const modelo = this.solicitarTexto('Modelo');
        const capacidade = parseInt(this.solicitarTexto('Capacidade de passageiros'));
        const alcance = parseFloat(this.solicitarTexto('Alcance (km)'));
        const cliente = this.solicitarTexto('Cliente (opcional)');
        const dataEntrega = this.solicitarTexto('Data de Entrega (opcional)');

        console.log('\nTipos de aeronave:');
        console.log('1. COMERCIAL');
        console.log('2. MILITAR');
        const tipoOpcao = this.solicitarOpcao('Escolha o tipo: ');

        let tipo: TipoAeronave;
        switch (tipoOpcao) {
            case '1': tipo = TipoAeronave.COMERCIAL; break;
            case '2': tipo = TipoAeronave.MILITAR; break;
            default: tipo = TipoAeronave.COMERCIAL; break;
        }

        const aeronave = new Aeronave(
            this.gerarNovoCodigo(), 
            modelo, 
            tipo, 
            capacidade, 
            alcance, 
            cliente, 
            dataEntrega
        );
        
        this.aeronaves.push(aeronave);
        this.exibirSucesso('Aeronave cadastrada com sucesso!');
        this.aguardarEnter();
    }

    listar(): void {
        this.exibirCabecalho('LISTA DE AERONAVES');
        
        if (this.aeronaves.length === 0) {
            this.exibirListaVazia('aeronave');
        } else {
            this.aeronaves.forEach((aero, index) => {
                console.log(`\n${index + 1}. ${aero.codigo} - ${aero.modelo} (${aero.tipo})`);
                console.log(`   Capacidade: ${aero.capacidade} | Alcance: ${aero.alcance}km`);
            });
        }
        
        this.aguardarEnter();
    }

    editar(): void {
        this.exibirCabecalho('EDITAR AERONAVE');
        
        if (this.aeronaves.length === 0) {
            this.exibirListaVazia('aeronave');
            this.aguardarEnter();
            return;
        }

        this.aeronaves.forEach((aero, index) => {
            console.log(`${index + 1}. ${aero.codigo} - ${aero.modelo} (${aero.tipo})`);
        });

        const indice = parseInt(this.solicitarOpcao('\nEscolha a aeronave (número): ')) - 1;

        if (!this.validarIndice(indice, this.aeronaves.length)) {
            this.exibirErro();
            this.aguardarEnter();
            return;
        }

        const aeronave = this.aeronaves[indice];
        let continuar = true;

        while (continuar) {
            this.exibirCabecalho('EDITAR AERONAVE');
            console.log(`1. Modelo: ${aeronave.modelo}`);
            console.log(`2. Tipo: ${aeronave.tipo}`);
            console.log(`3. Capacidade: ${aeronave.capacidade}`);
            console.log(`4. Alcance: ${aeronave.alcance}`);
            console.log('0. Voltar');

            const campo = this.solicitarOpcao('\nEscolha o campo a editar: ');

            switch (campo) {
                case '1':
                    aeronave.modelo = this.solicitarTexto('Novo Modelo');
                    this.exibirSucesso('Modelo atualizado!');
                    break;
                case '2':
                    console.log('\nTipos de aeronave:');
                    console.log('1. COMERCIAL');
                    console.log('2. MILITAR');
                    const tipoOpcao = this.solicitarOpcao('Escolha o tipo: ');
                    switch (tipoOpcao) {
                        case '1': aeronave.tipo = TipoAeronave.COMERCIAL; break;
                        case '2': aeronave.tipo = TipoAeronave.MILITAR; break;
                        default: aeronave.tipo = TipoAeronave.COMERCIAL; break;
                    }
                    this.exibirSucesso('Tipo atualizado!');
                    break;
                case '3':
                    aeronave.capacidade = parseInt(this.solicitarTexto('Nova Capacidade'));
                    this.exibirSucesso('Capacidade atualizada!');
                    break;
                case '4':
                    aeronave.alcance = parseFloat(this.solicitarTexto('Novo Alcance (km)'));
                    this.exibirSucesso('Alcance atualizado!');
                    break;
                case '0': 
                    continuar = false; 
                    break;
                default: 
                    this.exibirErro();
            }

            if (campo !== '0') this.aguardarEnter();
        }
    }

    excluir(): void {
        this.exibirCabecalho('EXCLUIR AERONAVE');
        
        if (this.aeronaves.length === 0) {
            this.exibirListaVazia('aeronave');
            this.aguardarEnter();
            return;
        }

        this.aeronaves.forEach((aero, index) => {
            console.log(`${index + 1}. ${aero.codigo} - ${aero.modelo} (${aero.tipo})`);
        });

        const indice = parseInt(this.solicitarOpcao('\nEscolha a aeronave para excluir (número): ')) - 1;

        if (this.validarIndice(indice, this.aeronaves.length)) {
            const removida = this.aeronaves.splice(indice, 1)[0];
            this.exibirSucesso(`Aeronave ${removida.modelo} excluída com sucesso!`);
        } else {
            this.exibirErro();
        }

        this.aguardarEnter();
    }
}