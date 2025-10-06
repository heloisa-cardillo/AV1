import { TipoAeronave } from './types';
import { StatusEtapa } from './status';
import { Peca } from './peca';
import { Etapa } from './etapa';
import { Teste } from './teste';

export class Aeronave {
    private _codigo: string
    private _modelo: string
    private _tipo: TipoAeronave
    private _capacidade: number
    private _alcance: number
    private _cliente: string
    private _dataEntrega: string
    private _pecas: Array<Peca>
    private _etapas: Array<Etapa>
    private _testes: Array<Teste>

    get codigo(): string { return this._codigo; }
    set codigo(value: string) { this._codigo = value; }

    get modelo(): string { return this._modelo; }
    set modelo(value: string) { this._modelo = value; }

    get tipo(): TipoAeronave { return this._tipo; }
    set tipo(value: TipoAeronave) { this._tipo = value; }

    get capacidade(): number { return this._capacidade; }
    set capacidade(value: number) { this._capacidade = value; }

    get alcance(): number { return this._alcance; }
    set alcance(value: number) { this._alcance = value; }

    get cliente(): string { return this._cliente; }
    set cliente(value: string) { this._cliente = value; }

    get dataEntrega(): string { return this._dataEntrega; }
    set dataEntrega(value: string) { this._dataEntrega = value; }

    get pecas(): Array<Peca> { return this._pecas; }
    get etapas(): Array<Etapa> { return this._etapas; }
    get testes(): Array<Teste> { return this._testes; }

    constructor(
        codigo: string,
        modelo: string,
        tipo: TipoAeronave,
        capacidade: number,
        alcance: number,
        cliente: string = '',
        dataEntrega: string = ''
    ) {
        this._codigo = codigo
        this._modelo = modelo
        this._tipo = tipo
        this._capacidade = capacidade
        this._alcance = alcance
        this._cliente = cliente
        this._dataEntrega = dataEntrega
        this._pecas = []
        this._etapas = []
        this._testes = []
    }

    detalhes(): void {
        console.log(`Código: ${this.codigo}`)
        console.log(`Modelo: ${this.modelo}`)
        console.log(`Tipo: ${this.tipo}`)
        console.log(`Capacidade: ${this.capacidade} passageiros`)
        console.log(`Alcance: ${this.alcance} km`)
        if (this.cliente) console.log(`Cliente: ${this.cliente}`)
        if (this.dataEntrega) {
            const [ano, mes, dia] = this.dataEntrega.split('-')
            console.log(`Data de Entrega: ${dia}/${mes}/${ano}`)
        }
        console.log(`Peças: ${this.pecas.length}`)
        console.log(`Etapas: ${this.etapas.length}`)
        console.log(`Testes: ${this.testes.length}`)
    }

    adicionarPeca(peca: Peca): void {
        this.pecas.push(peca)
        console.log(`Peça ${peca.nome} adicionada à aeronave ${this.modelo}`)
    }

    adicionarEtapa(etapa: Etapa): void {
      
        if (this.etapas.length > 0) {
            const ultimaEtapa = this.etapas[this.etapas.length - 1]

            if (etapa.ordem !== ultimaEtapa.ordem + 1) {
                console.log(`ERRO: A etapa ${etapa.nome} não pode ser adicionada! Ordem esperada: ${ultimaEtapa.ordem + 1}, ordem recebida: ${etapa.ordem}`)
                return
            }

            if (ultimaEtapa.status !== StatusEtapa.CONCLUIDA) {
                console.log(`AVISO: A etapa anterior "${ultimaEtapa.nome}" ainda não foi concluída!`)
            }
        } else {

            if (etapa.ordem !== 1) {
                console.log(`ERRO: A primeira etapa deve ter ordem 1! Ordem recebida: ${etapa.ordem}`)
                return
            }
        }

        this.etapas.push(etapa)
        console.log(`Etapa ${etapa.nome} adicionada à aeronave ${this.modelo}`)
    }

    adicionarTeste(teste: Teste): void {
        this.testes.push(teste)
        console.log(`Teste ${teste.tipo} adicionado à aeronave ${this.modelo}`)
    }

    listarPecas(): Array<Peca> {
        return this.pecas
    }

    listarEtapas(): Array<Etapa> {
        return this.etapas
    }

    listarTestes(): Array<Teste> {
        return this.testes
    }

    salvar(): void {
        console.log(`Aeronave ${this.modelo} salva com sucesso!`)
    }

    carregar(): void {
        console.log(`Aeronave ${this.modelo} carregada!`)
    }
}