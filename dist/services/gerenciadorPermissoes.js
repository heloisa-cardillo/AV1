"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GerenciadorPermissoes = void 0;
const permissions_1 = require("../models/permissions");
class GerenciadorPermissoes {
    static podeGerenciarAeronaves(funcionario) {
        return funcionario.nivelPermissao === permissions_1.NivelPermissao.ADMINISTRADOR ||
            funcionario.nivelPermissao === permissions_1.NivelPermissao.ENGENHEIRO;
    }
    static podeGerenciarFuncionarios(funcionario) {
        return funcionario.nivelPermissao === permissions_1.NivelPermissao.ADMINISTRADOR;
    }
    static podeExecutarTestes(funcionario) {
        return funcionario.nivelPermissao === permissions_1.NivelPermissao.ADMINISTRADOR ||
            funcionario.nivelPermissao === permissions_1.NivelPermissao.ENGENHEIRO;
    }
    static podeGerenciarEtapas(funcionario) {
        return funcionario.nivelPermissao === permissions_1.NivelPermissao.ADMINISTRADOR ||
            funcionario.nivelPermissao === permissions_1.NivelPermissao.ENGENHEIRO;
    }
    static podeVisualizarRelatorios(funcionario) {
        // Todos os níveis podem visualizar relatórios
        return true;
    }
    static verificarPermissao(funcionario, acao) {
        switch (acao) {
            case 'gerenciar_aeronaves':
                return this.podeGerenciarAeronaves(funcionario);
            case 'gerenciar_funcionarios':
                return this.podeGerenciarFuncionarios(funcionario);
            case 'executar_testes':
                return this.podeExecutarTestes(funcionario);
            case 'gerenciar_etapas':
                return this.podeGerenciarEtapas(funcionario);
            case 'visualizar_relatorios':
                return this.podeVisualizarRelatorios(funcionario);
            default:
                console.log(`ERRO: Ação "${acao}" não reconhecida!`);
                return false;
        }
    }
    static exibirMensagemAcessoNegado(funcionario, acao) {
        console.log(`ACESSO NEGADO: O funcionário ${funcionario.nome} (${funcionario.nivelPermissao}) não tem permissão para ${acao}!`);
    }
}
exports.GerenciadorPermissoes = GerenciadorPermissoes;
