import * as readlineSync from 'readline-sync';
import { GerenciadorAeronaves } from '../services/gerenciadorAeronaves';
import { Relatorio } from '../services/relatorios';

export class RelatorioInterface {
    constructor(private gerenciadorAeronaves: GerenciadorAeronaves) {}

    menu(): void {
        let continuar = true;
        while (continuar) {
            console.clear();
            console.log('\n=== GERAR RELATORIOS ===');
            console.log('1. Exibir Relatorio de Aeronave');
            console.log('2. Salvar Relatorio em Arquivo');
            console.log('0. Voltar');
            const opcao = readlineSync.question('\nEscolha uma opcao: ');
            switch (opcao) {
                case '1': this.exibir(); break;
                case '2': this.salvar(); break;
                case '0': continuar = false; break;
                default:
                    console.log('\nOpcao invalida!');
                    readlineSync.question('Pressione ENTER para continuar...');
            }
        }
    }

    exibir(): void {
        console.clear();
        console.log('\n=== EXIBIR RELATORIO DE AERONAVE ===');
        const aeronaves = this.gerenciadorAeronaves.listarAeronaves();
        if (!aeronaves.length) {
            console.log('Nenhuma aeronave cadastrada.');
            readlineSync.question('\nPressione ENTER para continuar...');
            return;
        }
        aeronaves.forEach((a, i) => console.log(`${i + 1}. ${a.modelo} (${a.codigo})`));
        const indice = parseInt(readlineSync.question('\nEscolha a aeronave (numero): ')) - 1;
        if (indice >= 0 && indice < aeronaves.length) {
            const relatorio = new Relatorio();
            relatorio.exibirRelatorio(aeronaves[indice]);
        } else {
            console.log('\nOpcao invalida!');
        }
        readlineSync.question('\nPressione ENTER para continuar...');
    }

    salvar(): void {
        console.clear();
        console.log('\n=== SALVAR RELATORIO EM ARQUIVO ===');
        const aeronaves = this.gerenciadorAeronaves.listarAeronaves();
        if (!aeronaves.length) {
            console.log('Nenhuma aeronave cadastrada.');
            readlineSync.question('\nPressione ENTER para continuar...');
            return;
        }
        aeronaves.forEach((a, i) => console.log(`${i + 1}. ${a.modelo} (${a.codigo})`));
        const indice = parseInt(readlineSync.question('\nEscolha a aeronave (numero): ')) - 1;
        if (indice >= 0 && indice < aeronaves.length) {
            const relatorio = new Relatorio();
            relatorio.salvarEmArquivo(aeronaves[indice]);
        } else {
            console.log('\nOpcao invalida!');
        }
        readlineSync.question('\nPressione ENTER para continuar...');
    }
}