import { Funcionario } from '../models/funcionario';
import { NivelPermissao } from '../models/permissions';

export class GerenciadorPermissoes {
    
    static podeGerenciarAeronaves(funcionario: Funcionario): boolean {
        return funcionario.nivelPermissao === NivelPermissao.ADMINISTRADOR || 
               funcionario.nivelPermissao === NivelPermissao.ENGENHEIRO
    }

    static podeGerenciarFuncionarios(funcionario: Funcionario): boolean {
        return funcionario.nivelPermissao === NivelPermissao.ADMINISTRADOR
    }

    static podeExecutarTestes(funcionario: Funcionario): boolean {
        return funcionario.nivelPermissao === NivelPermissao.ADMINISTRADOR || 
               funcionario.nivelPermissao === NivelPermissao.ENGENHEIRO
    }

    static podeGerenciarEtapas(funcionario: Funcionario): boolean {
        return funcionario.nivelPermissao === NivelPermissao.ADMINISTRADOR || 
               funcionario.nivelPermissao === NivelPermissao.ENGENHEIRO
    }

    static podeVisualizarRelatorios(funcionario: Funcionario): boolean {
        // Todos os níveis podem visualizar relatórios
        return true
    }

    static verificarPermissao(funcionario: Funcionario, acao: string): boolean {
        switch (acao) {
            case 'gerenciar_aeronaves':
                return this.podeGerenciarAeronaves(funcionario)
            case 'gerenciar_funcionarios':
                return this.podeGerenciarFuncionarios(funcionario)
            case 'executar_testes':
                return this.podeExecutarTestes(funcionario)
            case 'gerenciar_etapas':
                return this.podeGerenciarEtapas(funcionario)
            case 'visualizar_relatorios':
                return this.podeVisualizarRelatorios(funcionario)
            default:
                console.log(`ERRO: Ação "${acao}" não reconhecida!`)
                return false
        }
    }

    static exibirMensagemAcessoNegado(funcionario: Funcionario, acao: string): void {
        console.log(`ACESSO NEGADO: O funcionário ${funcionario.nome} (${funcionario.nivelPermissao}) não tem permissão para ${acao}!`)
    }
}