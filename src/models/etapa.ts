import { StatusEtapa } from './status';
import { Funcionario } from './funcionario';

export class Etapa {
    private _nome: string
    private _prazo: string
    private _status: StatusEtapa
    private _funcionarios: Array<Funcionario>
    private _ordem: number

    get nome(): string { return this._nome; }
    set nome(value: string) { this._nome = value; }

    get prazo(): string { return this._prazo; }
    set prazo(value: string) { this._prazo = value; }

    get status(): StatusEtapa { return this._status; }
    set status(value: StatusEtapa) { this._status = value; }

    get ordem(): number { return this._ordem; }
    set ordem(value: number) { this._ordem = value; }

    get funcionarios(): Array<Funcionario> { return this._funcionarios; }

    constructor(nome: string, prazo: string, status: StatusEtapa, funcionarios: Array<Funcionario>, ordem: number) {
        this._nome = nome
        this._prazo = prazo
        this._status = status
        this._funcionarios = funcionarios
        this._ordem = ordem
    }

    iniciar(etapaAnteriorConcluida: boolean = true): void {
        if (!etapaAnteriorConcluida && this._ordem > 1) {
            console.log(`ERRO: A etapa anterior (ordem ${this._ordem - 1}) precisa ser concluída antes de iniciar "${this.nome}"!`)
            return
        }
        
        if (this.status === StatusEtapa.CONCLUIDA) {
            console.log(`ERRO: A etapa ${this.nome} já foi concluída e não pode ser reiniciada!`)
            return
        }
        this.status = StatusEtapa.EMANDAMENTO
        console.log(`Etapa ${this.nome} iniciada!`)
    }

    finalizar(): void {
        if (this.status === StatusEtapa.NAOINICIADA) {
            console.log(`ERRO: A etapa ${this.nome} precisa ser iniciada antes de ser finalizada!`)
            return
        }
        if (this.status === StatusEtapa.CONCLUIDA) {
            console.log(`AVISO: A etapa ${this.nome} já está concluída!`)
            return
        }
        this.status = StatusEtapa.CONCLUIDA
        console.log(`Etapa ${this.nome} finalizada!`)
    }

    associarFuncionario(funcionario: Funcionario): void {
        if (this.funcionarioJaAssociado(funcionario.id)) {
            console.log(`AVISO: O funcionário ${funcionario.nome} já está associado à etapa ${this.nome}!`)
            return
        }
        this._funcionarios.push(funcionario)
        console.log(`Funcionário ${funcionario.nome} associado à etapa ${this.nome}`)
    }

    funcionarioJaAssociado(idFuncionario: string): boolean {
        return this._funcionarios.some(func => func.id === idFuncionario)
    }

    listarFuncionarios(): Array<Funcionario> {
        return this._funcionarios
    }
}