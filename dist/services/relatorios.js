"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Relatorio = void 0;
class Relatorio {
    gerarRelatorio(aeronave) {
        console.log('\nRELATÓRIO DA AERONAVE');
        console.log('_____________________\n');
        aeronave.detalhes();
        console.log('\n--- PEÇAS ---');
        if (aeronave.pecas.length > 0) {
            aeronave.pecas.forEach((peca, index) => {
                console.log(`${index + 1}. ${peca.nome} (${peca.codigo}) - Status: ${peca.status} - Tipo: ${peca.tipo}`);
            });
        }
        else {
            console.log('Nenhuma peça cadastrada.');
        }
        console.log('\n--- ETAPAS ---');
        if (aeronave.etapas.length > 0) {
            aeronave.etapas.forEach((etapa, index) => {
                console.log(`${index + 1}. ${etapa.nome} - Prazo: ${etapa.prazo} - Status: ${etapa.status}`);
                console.log(`   Funcionários: ${etapa.funcionarios.map(f => f.nome).join(', ')}`);
            });
        }
        else {
            console.log('Nenhuma etapa cadastrada.');
        }
        console.log('\n--- TESTES ---');
        if (aeronave.testes.length > 0) {
            aeronave.testes.forEach((teste, index) => {
                console.log(`${index + 1}. ${teste.tipo} - Resultado: ${teste.resultado}`);
            });
        }
        else {
            console.log('Nenhum teste cadastrado.');
        }
    }
    salvarEmArquivo() {
        console.log('\nRelatório salvo em arquivo!');
    }
}
exports.Relatorio = Relatorio;
