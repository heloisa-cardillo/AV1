import * as readlineSync from 'readline-sync';
import chalk from 'chalk';
import { Aeronave } from './models/aeronave';
import { Persistencia } from './services/arquivos';
import { Funcionario } from './models/funcionario';
import { Peca } from './models/peca';
import { Etapa } from './models/etapa';
import { Teste } from './models/teste';
import { GerenciadorAeronaves } from './services/gerenciadorAeronaves';
import { GerenciadorPermissoes } from './services/gerenciadorPermissoes';
import { NivelPermissao } from './models/permissions';
import { AeronaveInterface } from './cli/aeronaveInterface';
import { PecaInterface } from './cli/pecaInterface';
import { EtapaInterface } from './cli/etapaInterface';
import { FuncionarioInterface } from './cli/funcionarioInterface';
import { TesteInterface } from './cli/testeInterface';
import { RelatorioInterface } from './cli/relatorioInterface';
import { Relatorio } from './services/relatorios'

class SistemaAerocode {
    private funcionarioLogado: Funcionario | null
    private funcionarios: Array<Funcionario>
    private gerenciadorAeronaves: GerenciadorAeronaves
    private pecas: Array<Peca>
    private etapas: Array<Etapa>
    private testes: Array<Teste>
    private persistencia: Persistencia

    constructor() {
        this.funcionarioLogado = null
        this.funcionarios = []
        this.gerenciadorAeronaves = new GerenciadorAeronaves()
        this.pecas = []
        this.etapas = []
        this.testes = []
        this.persistencia = new Persistencia()
        this.inicializarDadosPadrao()
        this.carregarDados()
    }

    private inicializarDadosPadrao(): void {
        const funcionario1 = new Funcionario(
            '001',
            'José',
            '12-11111111',
            'Rua Engenheiro Jose Longo, 622 - São José dos Campos - SP',
            'jose',
            'senha123',
            NivelPermissao.ENGENHEIRO
        )

        const funcionario2 = new Funcionario(
            '002',
            'Dani',
            '12-22222222',
            'Rua Engenheiro Jose Longo, 622 - São José dos Campos - SP',
            'dani',
            'senha456',
            NivelPermissao.ADMINISTRADOR
        )

        const funcionario3 = new Funcionario(
            '003',
            'Amy',
            '12-33333333',
            'Rua Engenheiro Jose Longo, 622 - São José dos Campos - SP',
            'amy',
            'senha789',
            NivelPermissao.OPERADOR
        )

        const funcionario4 = new Funcionario(
            '004',
            'Frida',
            '12-44444444',
            'Rua Engenheiro Jose Longo, 622 - São José dos Campos - SP',
            'frida',
            'senha101',
            NivelPermissao.ENGENHEIRO
        )

        const funcionario5 = new Funcionario(
            '005',
            'Hanna',
            '12-55555555',
            'Rua Engenheiro Jose Longo, 622 - São José dos Campos - SP',
            'hanna',
            'senha202',
            NivelPermissao.ENGENHEIRO
        )

        this.funcionarios.push(funcionario1, funcionario2, funcionario3, funcionario4, funcionario5)
    }

    iniciar(): void {
        this.exibirBanner()

        if (!this.fazerLogin()) {
            console.log('\nEncerrando sistema...')
            return
        }

        this.menuPrincipal()
    }

    private exibirBanner(): void {
        console.clear()
        console.log('\n=== AEROCODE SISTEMAS ===')
        console.log('Gestao de Producao de Aeronaves\n')
    }

    private fazerLogin(): boolean {
        console.log('\n=== LOGIN NO SISTEMA ===')

        let tentativas = 0
        const maxTentativas = 3

        while (tentativas < maxTentativas) {
            process.stdout.write('Usuario: ')
            const usuario = readlineSync.question('')
            process.stdout.write('\x1b[1A\x1b[2K')
            console.log(`Usuario: ${chalk.hex('#0000FF')(usuario)}`)

            process.stdout.write('Senha: ')
            const senha = readlineSync.question('')
            process.stdout.write('\x1b[1A\x1b[2K')
            console.log(`Senha: ${chalk.hex('#0000FF')(senha)}`)

            const funcionario = this.funcionarios.find(f => f.autenticar(usuario, senha))

            if (funcionario) {
                this.funcionarioLogado = funcionario
                console.log(`\nLogin realizado com sucesso!`)
                console.log(`Bem-vindo(a), ${chalk.hex('#0000FF')(funcionario.nome)}!`)
                console.log(`Nivel de acesso: ${chalk.cyan(funcionario.nivelPermissao)}\n`)
                readlineSync.question('Pressione ENTER para continuar...')
                return true
            }

            tentativas++
            console.log(`\nUsuario ou senha incorretos! (Tentativa ${tentativas}/${maxTentativas})\n`)
        }

        console.log('Numero maximo de tentativas excedido!')
        return false
    }

    private carregarDados(): void {
        try {
            const funcionariosCarregados = this.persistencia.carregar<any>('funcionarios.json')
            if (funcionariosCarregados.length > 0) {
                this.funcionarios = funcionariosCarregados.map((f: any) =>
                    new Funcionario(f.id, f.nome, f.telefone, f.endereco, f.usuario, f.senha, f.nivelPermissao)
                )
            }

            const pecasCarregadas = this.persistencia.carregar<any>('pecas.json')
            if (pecasCarregadas.length > 0) {
                this.pecas = pecasCarregadas.map((p: any) =>
                    new Peca(p.nome, p.codigo, p.fornecedor, p.tipo, p.status)
                )
            }

            const etapasCarregadas = this.persistencia.carregar<any>('etapas.json')
            if (etapasCarregadas.length > 0) {
                this.etapas = etapasCarregadas.map((e: any) =>
                    new Etapa(e.nome, e.prazo, e.status, e.funcionarios || [], e.ordem)
                )
            }

            const testesCarregados = this.persistencia.carregar<any>('testes.json')
            if (testesCarregados.length > 0) {
                this.testes = testesCarregados.map((t: any) =>
                    new Teste(t.tipo, t.resultado)
                )
            }

            const aeronavesCarregadas = this.persistencia.carregar<any>('aeronaves.json')
            if (aeronavesCarregadas.length > 0) {
                aeronavesCarregadas.forEach((a: any) => {
                    const aeronave = new Aeronave(
                        a.codigo,
                        a.modelo,
                        a.tipo,
                        a.capacidade,
                        a.alcance,
                        a.cliente || '',
                        a.dataEntrega || ''
                    )
                    if (a.pecas && Array.isArray(a.pecas)) {
                        a.pecas.forEach((p: any) => aeronave.pecas.push(p))
                    }
                    if (a.etapas && Array.isArray(a.etapas)) {
                        a.etapas.forEach((e: any) => aeronave.etapas.push(e))
                    }
                    if (a.testes && Array.isArray(a.testes)) {
                        a.testes.forEach((t: any) => aeronave.testes.push(t))
                    }

                    this.gerenciadorAeronaves.cadastrarAeronave(aeronave)
                })
            }

        } catch (erro) {
            console.error('Erro ao carregar dados:', erro)
        }
    }

    private salvarDados(): void {
        try {
            this.persistencia.salvar('funcionarios.json', this.funcionarios)
            this.persistencia.salvar('pecas.json', this.pecas)
            this.persistencia.salvar('etapas.json', this.etapas)
            this.persistencia.salvar('testes.json', this.testes)
            this.persistencia.salvar('aeronaves.json', this.gerenciadorAeronaves.listarAeronaves())
        } catch (erro) {
            console.error('Erro ao salvar dados:', erro)
        }
    }

    private menuPrincipal(): void {
        let continuar = true

        while (continuar) {
            console.clear()
            console.log('\n=== MENU PRINCIPAL ===')
            console.log(`Usuario logado: ${chalk.hex('#0000FF')(this.funcionarioLogado?.nome)} (${chalk.cyan(this.funcionarioLogado?.nivelPermissao)})`)
            console.log('\n1. Gerenciar Aeronaves')
            console.log('2. Gerenciar Pecas')
            console.log('3. Gerenciar Etapas')
            console.log('4. Gerenciar Funcionarios')
            console.log('5. Executar Testes')
            console.log('6. Gerar Relatorios')
            console.log('0. Sair')

            const opcao = readlineSync.question('\nEscolha uma opcao: ')

            switch (opcao) {
                case '1':
                    if (GerenciadorPermissoes.verificarPermissao(this.funcionarioLogado!, 'gerenciar_aeronaves')) {
                        const aeronaveInterface = new AeronaveInterface()
                        aeronaveInterface.menu()
                        this.salvarDados()
                    } else {
                        GerenciadorPermissoes.exibirMensagemAcessoNegado(this.funcionarioLogado!, 'gerenciar aeronaves')
                        readlineSync.question('\nPressione ENTER para continuar...')
                    }
                    break
                case '2':
                    const pecaInterface = new PecaInterface()
                    pecaInterface.menu()
                    this.salvarDados()
                    break
                case '3':
                    if (GerenciadorPermissoes.verificarPermissao(this.funcionarioLogado!, 'gerenciar_etapas')) {
                        const etapaInterface = new EtapaInterface()
                        etapaInterface.menu()
                        this.salvarDados()
                    } else {
                        GerenciadorPermissoes.exibirMensagemAcessoNegado(this.funcionarioLogado!, 'gerenciar etapas')
                        readlineSync.question('\nPressione ENTER para continuar...')
                    }
                    break
                case '4':
                    if (GerenciadorPermissoes.verificarPermissao(this.funcionarioLogado!, 'gerenciar_funcionarios')) {
                        const funcionarioInterface = new FuncionarioInterface()
                        funcionarioInterface.menu()
                        this.salvarDados()
                    } else {
                        GerenciadorPermissoes.exibirMensagemAcessoNegado(this.funcionarioLogado!, 'gerenciar funcionarios')
                        readlineSync.question('\nPressione ENTER para continuar...')
                    }
                    break
                case '5':
                    if (GerenciadorPermissoes.verificarPermissao(this.funcionarioLogado!, 'executar_testes')) {
                        const testeInterface = new TesteInterface()
                        testeInterface.menu()
                        this.salvarDados()
                    } else {
                        GerenciadorPermissoes.exibirMensagemAcessoNegado(this.funcionarioLogado!, 'executar testes')
                        readlineSync.question('\nPressione ENTER para continuar...')
                    }
                    break
                case '6':
                    const relatorioInterface = new RelatorioInterface(this.gerenciadorAeronaves)
                    relatorioInterface.menu()
                    break
                case '0':
                    continuar = false
                    this.salvarDados()
                    console.log('\nEncerrando sistema...')
                    break
                default:
                    console.log('\nOpcao invalida!')
                    readlineSync.question('Pressione ENTER para continuar...')
            }
        }
    }
}

// Iniciar o sistema
const sistema = new SistemaAerocode()
sistema.iniciar()