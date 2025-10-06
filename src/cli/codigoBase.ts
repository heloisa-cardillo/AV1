import * as readlineSync from 'readline-sync';

export abstract class CodigoBase {
  private _ultimoCodigo: string = '';
  protected tipo: string;

  constructor(tipo: string) {
    this.tipo = tipo;
  }

  protected abstract gerarNovoCodigo(): string;

  protected gerarEExibirCodigo(): string {
    const codigo = this.gerarNovoCodigo();
    this._ultimoCodigo = codigo;
    console.log(`Código gerado: ${codigo}`);
    return codigo;
  }

  // Getters e Setters
  public getUltimoCodigo(): string {
    return this._ultimoCodigo;
  }

  protected setUltimoCodigo(codigo: string): void {
    this._ultimoCodigo = codigo;
  }

  protected aguardarEnter(mensagem: string = '\nPressione ENTER para continuar...'): void {
    readlineSync.question(mensagem);
  }

  protected limparTela(): void {
    console.clear();
  }

  protected exibirErro(mensagem: string = 'Opção inválida!'): void {
    console.log(`\n${mensagem}`);
  }

  protected exibirSucesso(mensagem: string): void {
    console.log(`\n${mensagem}`);
  }

  protected exibirCabecalho(titulo: string): void {
    this.limparTela();
    console.log(`\n=== ${titulo.toUpperCase()} ===`);
  }

  protected exibirListaVazia(entidade: string): void {
    console.log(`Nenhum(a) ${entidade} cadastrado(a).`);
  }

  protected validarIndice(indice: number, tamanhoLista: number): boolean {
    return indice >= 0 && indice < tamanhoLista;
  }

  protected solicitarOpcao(mensagem: string = '\nEscolha uma opção: '): string {
    return readlineSync.question(mensagem);
  }

  protected solicitarTexto(campo: string): string {
    return readlineSync.question(`${campo}: `);
  }
}