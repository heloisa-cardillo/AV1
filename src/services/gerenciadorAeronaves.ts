import { Aeronave } from '../models/aeronave';

export class GerenciadorAeronaves {
    private aeronaves: Array<Aeronave>
    private contadorAeronave: number = 1;
    private contadorPeca: number = 1;
    private contadorEtapa: number = 1;
    private contadorFuncionario: number = 1;
    private contadorTeste: number = 1;

    constructor() {
        this.aeronaves = []
    }

    gerarCodigoAeronave(): string {
        return `AER${String(this.contadorAeronave++).padStart(3, '0')}`;
    }

    gerarCodigoPeca(): string {
        return `PEC${String(this.contadorPeca++).padStart(3, '0')}`;
    }

    gerarCodigoEtapa(): string {
        return `ETP${String(this.contadorEtapa++).padStart(3, '0')}`;
    }

    gerarCodigoFuncionario(): string {
        return `FUN${String(this.contadorFuncionario++).padStart(3, '0')}`;
    }

    gerarCodigoTeste(): string {
        return `TST${String(this.contadorTeste++).padStart(3, '0')}`;
    }

    excluirAeronave(codigo: string): boolean {
        const indice = this.aeronaves.findIndex(a => a.codigo === codigo)
        if (indice >= 0) {
            this.aeronaves.splice(indice, 1)
            return true
        }
        return false
    }

    cadastrarAeronave(aeronave: Aeronave): boolean {
        if (this.codigoExiste(aeronave.codigo)) {
            console.log(`ERRO: Já existe uma aeronave com o código ${aeronave.codigo}!`)
            return false
        }
        this.aeronaves.push(aeronave)
        console.log(`Aeronave ${aeronave.modelo} cadastrada com sucesso!`)
        return true
    }

    codigoExiste(codigo: string): boolean {
        return this.aeronaves.some(aeronave => aeronave.codigo === codigo)
    }

    buscarPorCodigo(codigo: string): Aeronave | undefined {
        return this.aeronaves.find(aeronave => aeronave.codigo === codigo)
    }

    listarAeronaves(): Array<Aeronave> {
        return this.aeronaves
    }

    removerAeronave(codigo: string): boolean {
        const index = this.aeronaves.findIndex(aeronave => aeronave.codigo === codigo)
        if (index !== -1) {
            this.aeronaves.splice(index, 1)
            console.log(`Aeronave com código ${codigo} removida com sucesso!`)
            return true
        }
        console.log(`ERRO: Aeronave com código ${codigo} não encontrada!`)
        return false
    }
}