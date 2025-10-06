//guardar os dados

import * as fs from 'fs';
import * as path from 'path';

export class Persistencia {
    private dataDir: string

    constructor() {
        this.dataDir = path.join(process.cwd(), 'data')
        this.inicializarDiretorio()
    }

    private inicializarDiretorio(): void {
        if (!fs.existsSync(this.dataDir)) {
            fs.mkdirSync(this.dataDir, { recursive: true })
        }
    }

    salvar<T>(nomeArquivo: string, dados: T[]): void {
        try {
            const caminhoArquivo = path.join(this.dataDir, nomeArquivo)
            fs.writeFileSync(caminhoArquivo, JSON.stringify(dados, null, 2), 'utf-8')
        } catch (erro) {
            console.error(`Erro ao salvar ${nomeArquivo}:`, erro)
        }
    }

    carregar<T>(nomeArquivo: string): T[] {
        try {
            const caminhoArquivo = path.join(this.dataDir, nomeArquivo)

            if (!fs.existsSync(caminhoArquivo)) {
                return []
            }

            const conteudo = fs.readFileSync(caminhoArquivo, 'utf-8')
            return JSON.parse(conteudo)
        } catch (erro) {
            console.error(`Erro ao carregar ${nomeArquivo}:`, erro)
            return []
        }
    }
}