"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const readlineSync = __importStar(require("readline-sync"));
const chalk_1 = __importDefault(require("chalk"));
const aeronave_1 = require("./models/aeronave");
const arquivos_1 = require("./services/arquivos");
const funcionario_1 = require("./models/funcionario");
const peca_1 = require("./models/peca");
const etapa_1 = require("./models/etapa");
const teste_1 = require("./models/teste");
const gerenciadorAeronaves_1 = require("./services/gerenciadorAeronaves");
const gerenciadorPermissoes_1 = require("./services/gerenciadorPermissoes");
const permissions_1 = require("./models/permissions");
const aeronaveInterface_1 = require("./cli/aeronaveInterface");
const pecaInterface_1 = require("./cli/pecaInterface");
const etapaInterface_1 = require("./cli/etapaInterface");
const funcionarioInterface_1 = require("./cli/funcionarioInterface");
const testeInterface_1 = require("./cli/testeInterface");
const relatorioInterface_1 = require("./cli/relatorioInterface");
class SistemaAerocode {
    constructor() {
        this.funcionarioLogado = null;
        this.funcionarios = [];
        this.gerenciadorAeronaves = new gerenciadorAeronaves_1.GerenciadorAeronaves();
        this.pecas = [];
        this.etapas = [];
        this.testes = [];
        this.persistencia = new arquivos_1.Persistencia();
        this.inicializarDadosPadrao();
        this.carregarDados();
    }
    inicializarDadosPadrao() {
        const funcionario1 = new funcionario_1.Funcionario('001', 'José', '12-11111111', 'Rua Engenheiro Jose Longo, 622 - São José dos Campos - SP', 'jose', 'senha123', permissions_1.NivelPermissao.ENGENHEIRO);
        const funcionario2 = new funcionario_1.Funcionario('002', 'Dani', '12-22222222', 'Rua Engenheiro Jose Longo, 622 - São José dos Campos - SP', 'dani', 'senha456', permissions_1.NivelPermissao.ADMINISTRADOR);
        const funcionario3 = new funcionario_1.Funcionario('003', 'Amy', '12-33333333', 'Rua Engenheiro Jose Longo, 622 - São José dos Campos - SP', 'amy', 'senha789', permissions_1.NivelPermissao.OPERADOR);
        const funcionario4 = new funcionario_1.Funcionario('004', 'Frida', '12-44444444', 'Rua Engenheiro Jose Longo, 622 - São José dos Campos - SP', 'frida', 'senha101', permissions_1.NivelPermissao.ENGENHEIRO);
        const funcionario5 = new funcionario_1.Funcionario('005', 'Hanna', '12-55555555', 'Rua Engenheiro Jose Longo, 622 - São José dos Campos - SP', 'hanna', 'senha202', permissions_1.NivelPermissao.ENGENHEIRO);
        this.funcionarios.push(funcionario1, funcionario2, funcionario3, funcionario4, funcionario5);
    }
    iniciar() {
        this.exibirBanner();
        if (!this.fazerLogin()) {
            console.log('\nEncerrando sistema...');
            return;
        }
        this.menuPrincipal();
    }
    exibirBanner() {
        console.clear();
        console.log('\n=== AEROCODE SISTEMAS ===');
        console.log('Gestao de Producao de Aeronaves\n');
    }
    fazerLogin() {
        console.log('\n=== LOGIN NO SISTEMA ===');
        let tentativas = 0;
        const maxTentativas = 3;
        while (tentativas < maxTentativas) {
            process.stdout.write('Usuario: ');
            const usuario = readlineSync.question('');
            process.stdout.write('\x1b[1A\x1b[2K');
            console.log(`Usuario: ${chalk_1.default.hex('#0000FF')(usuario)}`);
            process.stdout.write('Senha: ');
            const senha = readlineSync.question('');
            process.stdout.write('\x1b[1A\x1b[2K');
            console.log(`Senha: ${chalk_1.default.hex('#0000FF')(senha)}`);
            const funcionario = this.funcionarios.find(f => f.autenticar(usuario, senha));
            if (funcionario) {
                this.funcionarioLogado = funcionario;
                console.log(`\nLogin realizado com sucesso!`);
                console.log(`Bem-vindo(a), ${chalk_1.default.hex('#0000FF')(funcionario.nome)}!`);
                console.log(`Nivel de acesso: ${chalk_1.default.cyan(funcionario.nivelPermissao)}\n`);
                readlineSync.question('Pressione ENTER para continuar...');
                return true;
            }
            tentativas++;
            console.log(`\nUsuario ou senha incorretos! (Tentativa ${tentativas}/${maxTentativas})\n`);
        }
        console.log('Numero maximo de tentativas excedido!');
        return false;
    }
    carregarDados() {
        try {
            const funcionariosCarregados = this.persistencia.carregar('funcionarios.json');
            if (funcionariosCarregados.length > 0) {
                this.funcionarios = funcionariosCarregados.map((f) => new funcionario_1.Funcionario(f.id, f.nome, f.telefone, f.endereco, f.usuario, f.senha, f.nivelPermissao));
            }
            const pecasCarregadas = this.persistencia.carregar('pecas.json');
            if (pecasCarregadas.length > 0) {
                this.pecas = pecasCarregadas.map((p) => new peca_1.Peca(p.nome, p.codigo, p.fornecedor, p.tipo, p.status));
            }
            const etapasCarregadas = this.persistencia.carregar('etapas.json');
            if (etapasCarregadas.length > 0) {
                this.etapas = etapasCarregadas.map((e) => new etapa_1.Etapa(e.nome, e.prazo, e.status, e.funcionarios || [], e.ordem));
            }
            const testesCarregados = this.persistencia.carregar('testes.json');
            if (testesCarregados.length > 0) {
                this.testes = testesCarregados.map((t) => new teste_1.Teste(t.tipo, t.resultado));
            }
            const aeronavesCarregadas = this.persistencia.carregar('aeronaves.json');
            if (aeronavesCarregadas.length > 0) {
                aeronavesCarregadas.forEach((a) => {
                    const aeronave = new aeronave_1.Aeronave(a.codigo, a.modelo, a.tipo, a.capacidade, a.alcance, a.cliente || '', a.dataEntrega || '');
                    if (a.pecas && Array.isArray(a.pecas)) {
                        a.pecas.forEach((p) => aeronave.pecas.push(p));
                    }
                    if (a.etapas && Array.isArray(a.etapas)) {
                        a.etapas.forEach((e) => aeronave.etapas.push(e));
                    }
                    if (a.testes && Array.isArray(a.testes)) {
                        a.testes.forEach((t) => aeronave.testes.push(t));
                    }
                    this.gerenciadorAeronaves.cadastrarAeronave(aeronave);
                });
            }
        }
        catch (erro) {
            console.error('Erro ao carregar dados:', erro);
        }
    }
    salvarDados() {
        try {
            this.persistencia.salvar('funcionarios.json', this.funcionarios);
            this.persistencia.salvar('pecas.json', this.pecas);
            this.persistencia.salvar('etapas.json', this.etapas);
            this.persistencia.salvar('testes.json', this.testes);
            this.persistencia.salvar('aeronaves.json', this.gerenciadorAeronaves.listarAeronaves());
        }
        catch (erro) {
            console.error('Erro ao salvar dados:', erro);
        }
    }
    menuPrincipal() {
        let continuar = true;
        while (continuar) {
            console.clear();
            console.log('\n=== MENU PRINCIPAL ===');
            console.log(`Usuario logado: ${chalk_1.default.hex('#0000FF')(this.funcionarioLogado?.nome)} (${chalk_1.default.cyan(this.funcionarioLogado?.nivelPermissao)})`);
            console.log('\n1. Gerenciar Aeronaves');
            console.log('2. Gerenciar Pecas');
            console.log('3. Gerenciar Etapas');
            console.log('4. Gerenciar Funcionarios');
            console.log('5. Executar Testes');
            console.log('6. Gerar Relatorios');
            console.log('0. Sair');
            const opcao = readlineSync.question('\nEscolha uma opcao: ');
            switch (opcao) {
                case '1':
                    if (gerenciadorPermissoes_1.GerenciadorPermissoes.verificarPermissao(this.funcionarioLogado, 'gerenciar_aeronaves')) {
                        const aeronaveInterface = new aeronaveInterface_1.AeronaveInterface();
                        aeronaveInterface.menu();
                        this.salvarDados();
                    }
                    else {
                        gerenciadorPermissoes_1.GerenciadorPermissoes.exibirMensagemAcessoNegado(this.funcionarioLogado, 'gerenciar aeronaves');
                        readlineSync.question('\nPressione ENTER para continuar...');
                    }
                    break;
                case '2':
                    const pecaInterface = new pecaInterface_1.PecaInterface();
                    pecaInterface.menu();
                    this.salvarDados();
                    break;
                case '3':
                    if (gerenciadorPermissoes_1.GerenciadorPermissoes.verificarPermissao(this.funcionarioLogado, 'gerenciar_etapas')) {
                        const etapaInterface = new etapaInterface_1.EtapaInterface();
                        etapaInterface.menu();
                        this.salvarDados();
                    }
                    else {
                        gerenciadorPermissoes_1.GerenciadorPermissoes.exibirMensagemAcessoNegado(this.funcionarioLogado, 'gerenciar etapas');
                        readlineSync.question('\nPressione ENTER para continuar...');
                    }
                    break;
                case '4':
                    if (gerenciadorPermissoes_1.GerenciadorPermissoes.verificarPermissao(this.funcionarioLogado, 'gerenciar_funcionarios')) {
                        const funcionarioInterface = new funcionarioInterface_1.FuncionarioInterface();
                        funcionarioInterface.menu();
                        this.salvarDados();
                    }
                    else {
                        gerenciadorPermissoes_1.GerenciadorPermissoes.exibirMensagemAcessoNegado(this.funcionarioLogado, 'gerenciar funcionarios');
                        readlineSync.question('\nPressione ENTER para continuar...');
                    }
                    break;
                case '5':
                    if (gerenciadorPermissoes_1.GerenciadorPermissoes.verificarPermissao(this.funcionarioLogado, 'executar_testes')) {
                        const testeInterface = new testeInterface_1.TesteInterface();
                        testeInterface.menu();
                        this.salvarDados();
                    }
                    else {
                        gerenciadorPermissoes_1.GerenciadorPermissoes.exibirMensagemAcessoNegado(this.funcionarioLogado, 'executar testes');
                        readlineSync.question('\nPressione ENTER para continuar...');
                    }
                    break;
                case '6':
                    const relatorioInterface = new relatorioInterface_1.RelatorioInterface(this.gerenciadorAeronaves);
                    relatorioInterface.menu();
                    break;
                case '0':
                    continuar = false;
                    this.salvarDados();
                    console.log('\nEncerrando sistema...');
                    break;
                default:
                    console.log('\nOpcao invalida!');
                    readlineSync.question('Pressione ENTER para continuar...');
            }
        }
    }
}
// Iniciar o sistema
const sistema = new SistemaAerocode();
sistema.iniciar();
