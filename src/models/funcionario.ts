import { NivelPermissao } from './permissions';

export class Funcionario {
    private _id: string
    private _nome: string
    private _telefone: string
    private _endereco: string
    private _usuario: string
    private _senha: string
    private _nivelPermissao: NivelPermissao

    get id(): string { return this._id; }
    set id(value: string) { this._id = value; }

    get nome(): string { return this._nome; }
    set nome(value: string) { this._nome = value; }

    get telefone(): string { return this._telefone; }
    set telefone(value: string) { this._telefone = value; }

    get endereco(): string { return this._endereco; }
    set endereco(value: string) { this._endereco = value; }

    get usuario(): string { return this._usuario; }
    set usuario(value: string) { this._usuario = value; }

    get senha(): string { return this._senha; }
    set senha(value: string) { this._senha = value; }

    get nivelPermissao(): NivelPermissao { return this._nivelPermissao; }
    set nivelPermissao(value: NivelPermissao) { this._nivelPermissao = value; }

    constructor(id: string, nome: string, telefone: string, endereco: string, usuario: string, senha: string, nivelPermissao: NivelPermissao) {
        this._id = id
        this._nome = nome
        this._telefone = telefone
        this._endereco = endereco
        this._usuario = usuario
        this._senha = senha
        this._nivelPermissao = nivelPermissao
    }

    autenticar(usuario: string, senha: string): boolean {
        return this._usuario === usuario && this._senha === senha
    }

    salvar(): void {
        console.log(`Funcionário ${this.nome} salvo com sucesso!`)
    }

    carregar(): void {
        console.log(`Funcionário ${this.nome} carregado!`)
    }
}