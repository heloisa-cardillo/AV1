import { Aeronave } from '../models/aeronave';
import { Persistencia } from './arquivos';
import * as fs from 'fs';
import * as path from 'path';

export class Relatorio {
    private persistencia: Persistencia

    constructor() {
        this.persistencia = new Persistencia()
    }

    gerarRelatorio(aeronave: Aeronave): string {
        let conteudo = '\n=== RELATÓRIO DA AERONAVE ===\n'
        conteudo += '==============================\n\n'
        
        // Informações da aeronave
        conteudo += `CÓDIGO: ${aeronave.codigo}\n`
        conteudo += `MODELO: ${aeronave.modelo}\n`
        conteudo += `TIPO: ${aeronave.tipo}\n`
        conteudo += `CAPACIDADE: ${aeronave.capacidade} passageiros\n`
        conteudo += `ALCANCE: ${aeronave.alcance} km\n`
        conteudo += `CLIENTE: ${aeronave.cliente}\n`
        conteudo += `DATA DE ENTREGA: ${aeronave.dataEntrega}\n`
        
        // Peças
        conteudo += '\n--- PEÇAS ---\n'
        if (aeronave.pecas.length > 0) {
            aeronave.pecas.forEach((peca, index) => {
                conteudo += `${index + 1}. ${peca.nome} (${peca.codigo})\n`
                conteudo += `   Fornecedor: ${peca.fornecedor}\n`
                conteudo += `   Tipo: ${peca.tipo}\n`
                conteudo += `   Status: ${peca.status}\n\n`
            })
        } else {
            conteudo += 'Nenhuma peça cadastrada.\n\n'
        }
        
        // Etapas
        conteudo += '--- ETAPAS ---\n'
        if (aeronave.etapas.length > 0) {
            aeronave.etapas.forEach((etapa, index) => {
                conteudo += `${index + 1}. ${etapa.nome}\n`
                conteudo += `   Prazo: ${etapa.prazo}\n`
                conteudo += `   Status: ${etapa.status}\n`
                conteudo += `   Funcionários: ${etapa.funcionarios.map(f => f.nome).join(', ')}\n\n`
            })
        } else {
            conteudo += 'Nenhuma etapa cadastrada.\n\n'
        }
        
        // Testes
        conteudo += '--- TESTES ---\n'
        if (aeronave.testes.length > 0) {
            aeronave.testes.forEach((teste, index) => {
                conteudo += `${index + 1}. ${teste.tipo} - Resultado: ${teste.resultado}\n`
            })
        } else {
            conteudo += 'Nenhum teste cadastrado.\n'
        }

        return conteudo
    }

    salvarEmArquivo(aeronave: Aeronave): void {
        try {
            const conteudo = this.gerarRelatorio(aeronave)
            
            // Criar diretório de relatórios se não existir
            const dataDir = path.join(process.cwd(), 'data')
            const relatoriosDir = path.join(dataDir, 'relatorios')
            
            if (!fs.existsSync(relatoriosDir)) {
                fs.mkdirSync(relatoriosDir, { recursive: true })
            }
            
            // Gerar nome do arquivo com timestamp
            const timestamp = new Date().toISOString().replace(/[:.]/g, '-').split('T')[0]
            const nomeArquivo = `relatorio_${aeronave.codigo}_${timestamp}.txt`
            const caminhoArquivo = path.join(relatoriosDir, nomeArquivo)
            
            // Salvar arquivo
            fs.writeFileSync(caminhoArquivo, conteudo, 'utf-8')
            
            console.log(`\n✓ Relatório salvo com sucesso em: ${caminhoArquivo}`)
        } catch (erro) {
            console.error('Erro ao salvar relatório:', erro)
        }
    }

    exibirRelatorio(aeronave: Aeronave): void {
        const conteudo = this.gerarRelatorio(aeronave)
        console.log(conteudo)
    }
}