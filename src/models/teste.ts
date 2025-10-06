import { TipoTeste } from './types';
import { ResultadoTeste } from './permissions';

export class Teste {
    private _tipo: TipoTeste
    private _resultado: ResultadoTeste

    get tipo(): TipoTeste { return this._tipo; }
    set tipo(value: TipoTeste) { this._tipo = value; }

    get resultado(): ResultadoTeste { return this._resultado; }
    set resultado(value: ResultadoTeste) { this._resultado = value; }

    constructor(tipo: TipoTeste, resultado: ResultadoTeste) {
        this._tipo = tipo
        this._resultado = resultado
    }

    salvar(): void {
        console.log(`Teste ${this.tipo} salvo com resultado: ${this.resultado}`)
    }

    carregar(): void {
        console.log(`Teste ${this.tipo} carregado!`)
    }
}




