import { TipoPeca } from './types';
import { StatusPeca } from './status';

export class Peca {
    private _nome: string
    private _codigo: string
    private _fornecedor: string
    private _status: StatusPeca
    private _tipo: TipoPeca

    get nome(): string { return this._nome; }
    set nome(value: string) { this._nome = value; }

    get codigo(): string { return this._codigo; }
    set codigo(value: string) { this._codigo = value; }

    get fornecedor(): string { return this._fornecedor; }
    set fornecedor(value: string) { this._fornecedor = value; }

    get status(): StatusPeca { return this._status; }
    set status(value: StatusPeca) { this._status = value; }

    get tipo(): TipoPeca { return this._tipo; }
    set tipo(value: TipoPeca) { this._tipo = value; }

    constructor(nome: string, codigo: string, fornecedor: string, status: StatusPeca, tipo: TipoPeca) {
        this._nome = nome
        this._codigo = codigo
        this._fornecedor = fornecedor
        this._status = status
        this._tipo = tipo
    }

    atualizarStatus(novoStatus: StatusPeca): void {
        this._status = novoStatus
        console.log(`Status da peça ${this.nome} atualizado para ${novoStatus}`)
    }

    salvar(): void {
        console.log(`Peça ${this.nome} salva com sucesso!`)
    }

    carregar(): void {
        console.log(`Peça ${this.nome} carregada!`)
    }
}