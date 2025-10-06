# Sistema Aerocode - Gestão de Produção de Aeronaves

Sistema completo de gerenciamento para produção de aeronaves, desenvolvido em TypeScript com aplicação de princípios de Programação Orientada a Objetos (POO).

---

## Sobre o Projeto

Sistema CLI para gerenciar todo o ciclo de produção de aeronaves, desde o cadastro inicial até a entrega final ao cliente, incluindo controle de peças, etapas de produção, testes e relatórios.

---

## Como Executar

```bash
# Instalar dependências
npm install

# Compilar TypeScript
npm run build

# Executar sistema
npm run dev
```

**Pré-requisitos**: Node.js 14+

---

## Usuários de Teste

| Usuário | Senha     | Nível         |
|---------|-----------|---------------|
| jose    | senha123  | Engenheiro    |
| dani    | senha456  | Administrador |
| amy     | senha789  | Operador      |
| frida   | senha101  | Engenheiro    |
| hanna   | senha202  | Operador      |

---

## Funcionalidades Principais

- Gestão completa de aeronaves, peças, etapas, funcionários e testes
- Sistema de autenticação com controle de acesso
- Controle de permissões por nível
- Persistência de dados em arquivos
- Interface CLI

---

## Arquitetura do Sistema

```
src/
├── models/          # Entidades do domínio
├── services/        # Lógica de negócio
├── cli/             # Interfaces de usuário (herdam de CodigoBase)
└── index.ts         # Ponto de entrada
```

<details>
<summary>Ver estrutura detalhada</summary>

```
src/
├── models/
│   ├── aeronave.ts
│   ├── peca.ts
│   ├── etapa.ts
│   ├── funcionario.ts
│   ├── teste.ts
│   ├── types.ts
│   ├── status.ts
│   └── permissions.ts
├── services/
│   ├── gerenciadorAeronaves.ts
│   ├── gerenciadorPermissoes.ts
│   ├── relatorios.ts
│   └── arquivos.ts
├── cli/
│   ├── codigoBase.ts (classe abstrata)
│   ├── aeronaveInterface.ts
│   ├── pecaInterface.ts
│   ├── etapaInterface.ts
│   ├── funcionarioInterface.ts
│   ├── testeInterface.ts
│   └── relatorioInterface.ts
└── index.ts
```

</details>

---

## Funcionalidades Extras
- [x] 5 usuários pré-cadastrados (mock data)
- [x] Interface CLI com cores
- [x] Validações e tratamento de erros 
- [x] Limite de 3 tentativas de login
- [x] Status CANCELADA para etapas
