"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GerenciadorAeronaves = void 0;
class GerenciadorAeronaves {
    constructor() {
        this.contadorAeronave = 1;
        this.contadorPeca = 1;
        this.contadorEtapa = 1;
        this.contadorFuncionario = 1;
        this.contadorTeste = 1;
        this.aeronaves = [];
    }
    gerarCodigoAeronave() {
        return `AER${String(this.contadorAeronave++).padStart(3, '0')}`;
    }
    gerarCodigoPeca() {
        return `PEC${String(this.contadorPeca++).padStart(3, '0')}`;
    }
    gerarCodigoEtapa() {
        return `ETP${String(this.contadorEtapa++).padStart(3, '0')}`;
    }
    gerarCodigoFuncionario() {
        return `FUN${String(this.contadorFuncionario++).padStart(3, '0')}`;
    }
    gerarCodigoTeste() {
        return `TST${String(this.contadorTeste++).padStart(3, '0')}`;
    }
    excluirAeronave(codigo) {
        const indice = this.aeronaves.findIndex(a => a.codigo === codigo);
        if (indice >= 0) {
            this.aeronaves.splice(indice, 1);
            return true;
        }
        return false;
    }
    cadastrarAeronave(aeronave) {
        if (this.codigoExiste(aeronave.codigo)) {
            console.log(`ERRO: Já existe uma aeronave com o código ${aeronave.codigo}!`);
            return false;
        }
        this.aeronaves.push(aeronave);
        console.log(`Aeronave ${aeronave.modelo} cadastrada com sucesso!`);
        return true;
    }
    codigoExiste(codigo) {
        return this.aeronaves.some(aeronave => aeronave.codigo === codigo);
    }
    buscarPorCodigo(codigo) {
        return this.aeronaves.find(aeronave => aeronave.codigo === codigo);
    }
    listarAeronaves() {
        return this.aeronaves;
    }
    removerAeronave(codigo) {
        const index = this.aeronaves.findIndex(aeronave => aeronave.codigo === codigo);
        if (index !== -1) {
            this.aeronaves.splice(index, 1);
            console.log(`Aeronave com código ${codigo} removida com sucesso!`);
            return true;
        }
        console.log(`ERRO: Aeronave com código ${codigo} não encontrada!`);
        return false;
    }
}
exports.GerenciadorAeronaves = GerenciadorAeronaves;
