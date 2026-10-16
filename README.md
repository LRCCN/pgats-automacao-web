# PGATS – Automação Web com Cypress

Projeto de estudo da Pós-Graduação em Automação de Testes de Software (PGATS), disciplina **Introdução a Aplicações Web**. Reúne exercícios práticos de automação de testes end-to-end (E2E) com Cypress.

## Objetivo

- Praticar automação de testes web com Cypress.
- Identificar e corrigir testes com falhas de sintaxe, funcionalidade e seletores.
- Comparar seletores **CSS** e **XPath** em legibilidade e velocidade de execução.

## Tecnologias

| Tecnologia | Uso |
|---|---|
| [Cypress](https://www.cypress.io/) 13.x | Framework de testes E2E |
| [cypress-xpath](https://github.com/cypress-io/cypress-xpath) 2.x | Habilita `cy.xpath()` |
| Node.js / npm | Ambiente e gerenciamento de dependências |

## Estrutura do projeto

```
cypress/
├── e2e/
│   ├── 1-getting-started/
│   │   └── automation-exercise.cy.js
│   ├── 5-test-cases.cy.js          # Test Cases 1 a 5 com seletores CSS
│   ├── 5-test-cases-xpath.cy.js    # Mesmos testes com seletores XPath
│   ├── 6-modulos.cy.js             # Test Cases 1 a 5 modularizados (Ações de Negócio)
│   ├── 7-modulos-xpath.cy.js       # Mesma spec modularizada, com módulos XPath
│   └── exercicio-casa.cy.js        # Exercício: testes com bugs corrigidos
├── fixtures/
│   └── usuarios.json               # Dados de teste (usuário válido e inexistente)
├── modules/                        # Ações de Negócio, por funcionalidade
│   ├── cadastro/cadastro.js
│   ├── login/login.js
│   ├── logout/logout.js
│   └── conta/conta.js
├── modules-xpath/                  # Mesmos módulos, com seletores XPath (cy.xpath)
│   └── cadastro | login | logout | conta
└── support/
    ├── commands.js
    └── e2e.js                      # Importa o cypress-xpath
cypress.config.js
```

## Como executar

```bash
# instalar dependências
npm install

# abrir a interface do Cypress
npx cypress open

# rodar todos os testes no terminal
npx cypress run

# rodar um spec específico
npx cypress run --spec cypress/e2e/5-test-cases.cy.js
```

> **Windows / VS Code:** se o terminal exibir o erro `cachedDataRejected`, a variável `ELECTRON_RUN_AS_NODE` está definida. Rode com `env -u ELECTRON_RUN_AS_NODE npx cypress run ...` (Git Bash) ou remova a variável antes (`Remove-Item Env:ELECTRON_RUN_AS_NODE` no PowerShell).

## Testes

### 1. Automation Exercise – Test Cases 1 a 5
Site: <https://automationexercise.com/>

Arquivo: [5-test-cases.cy.js](cypress/e2e/5-test-cases.cy.js)

| Caso | Cenário |
|---|---|
| 1 | Registrar usuário |
| 2 | Login com e-mail e senha corretos |
| 3 | Login com e-mail e senha incorretos |
| 4 | Logout |
| 5 | Registrar usuário com e-mail já existente |

Cada teste gera um e-mail único (`luiz-qa+<timestamp>@teste.com`) para evitar o erro "Email Address already exist!", e exclui a conta criada ao final. As ações repetidas ficam em helpers (`abrirLogin`, `preencherCadastro`, `login`, `logout`, `excluirConta`).

### 2. Test Cases 1 a 5 modularizados
Arquivo: [6-modulos.cy.js](cypress/e2e/6-modulos.cy.js)

Mesmos cenários do item 1, reescritos com a arquitetura de **módulos de Ações de Negócio**:

- **Spec:** só orquestra os cenários. Não conhece seletores nem faz asserções.
- **Módulos** (`cypress/modules/<funcionalidade>/`): funções e `module.exports`, sem classes nem "Page Object". Cada um guarda seus seletores em `const seletores` e suas asserções (`validar...`). Nomes em português orientados ao negócio (`acessarLogin`, `efetuarLogin`, `cadastrarUsuario`, `validarUsuarioAutenticado`, `efetuarLogout`, `excluirConta`).
- **Dados:** `fixtures/usuarios.json`. A spec só gera o e-mail único com `Date.now()`.
- **baseUrl:** definida em `cypress.config.js` (`https://automationexercise.com`).

```js
login.acessarLogin();
cadastro.cadastrarUsuario(usuario);
logout.efetuarLogout();
login.efetuarLogin(usuario.email, usuario.senha);
login.validarUsuarioAutenticado(usuario.nome);
conta.excluirConta();
```

```bash
npx cypress run --spec cypress/e2e/6-modulos.cy.js
```

**Versão XPath:** [7-modulos-xpath.cy.js](cypress/e2e/7-modulos-xpath.cy.js) é a mesma spec apontando para `cypress/modules-xpath/`. Os módulos têm as mesmas funções e a mesma API; só mudam o `const seletores` (XPath) e o `cy.get` → `cy.xpath`. Assim a spec não muda e dá para comparar CSS x XPath no mesmo cenário.

```bash
npx cypress run --spec cypress/e2e/7-modulos-xpath.cy.js
```

### 3. Exercício de casa – correção de testes com bugs
Site: <https://devfinance-agilizei.netlify.app>

Arquivo: [exercicio-casa.cy.js](cypress/e2e/exercicio-casa.cy.js) (origem: [gist](https://gist.github.com/samlucax/0df852881249b561cdf8888493b03125))

O gist trazia 6 testes de cadastro de transação com falhas propositais. Erros encontrados e correções:

| Teste | Origem do erro | Correção |
|---|---|---|
| 1 | `.contains()` e `.get()` sem argumentos (sintaxe) | `cy.contains("button", "Salvar")` e asserção de 1 linha |
| 2 | `sendKeys` não existe no Cypress; botão `"Add"` inexistente | `type` e `"Salvar"` |
| 3 | Faltava `cy.visit`; data no formato `02/01/2023` (o input `date` exige `yyyy-mm-dd`) | `visit`, data `2023-02-01`, asserção ativada |
| 4 | Campos preenchidos antes de abrir o modal | Abrir "Nova Transação" primeiro |
| 5 | Texto `"Nueva Transación"` incorreto; asserção `.alert` sem sentido | `"Nova Transação"` e checagem de 1 linha |
| 6 | `it.skip`, sem `cy.visit`, esperava 100 linhas | Remover skip, visitar a página, esperar 1 linha |

O `cy.visit` foi movido para um `beforeEach`, já que todos os testes dependiam dele.

## Comparativo: CSS x XPath

**Exercício:** instalar `cypress-xpath` e adaptar os seletores dos testes, observando legibilidade e velocidade de execução.

- Spec CSS: [5-test-cases.cy.js](cypress/e2e/5-test-cases.cy.js)
- Spec XPath: [5-test-cases-xpath.cy.js](cypress/e2e/5-test-cases-xpath.cy.js)

O suporte é ativado em [cypress/support/e2e.js](cypress/support/e2e.js) com `require('cypress-xpath')`.

### Exemplos lado a lado

| Alvo | CSS | XPath |
|---|---|---|
| Campo por `data-qa` | `[data-qa="signup-name"]` | `//*[@data-qa="signup-name"]` |
| Link de login | `a[href*=login]` | `//a[contains(@href,"login")]` |
| Título por texto | `cy.contains('New User Signup!')` | `//h2[normalize-space()="New User Signup!"]` |
| Mensagem de erro | `.login-form` + `contain.text` | `//div[contains(@class,"login-form")]//p[contains(text(),"...")]` |

### Resultado de uma execução (headless, Electron)

| Teste | CSS | XPath |
|---|---|---|
| 1. Register | 16,7s | 23,6s |
| 2. Login correto | 73,7s | 24,4s |
| 3. Login incorreto | 4,7s | 5,7s |
| 4. Logout | 80,2s | 32,2s |
| 5. Email existente | 20,2s | 27,8s |
| **Total** | **3m18s** | **1m55s** |

### Conclusões

- **Velocidade:** não dá para concluir que um é mais rápido. Os tempos variam muito entre testes (o CSS levou 73s e 80s nos testes 2 e 4, contra 24s e 32s do XPath, mas foi mais rápido nos outros três). A variação vem do site externo (rede, anúncios), não do motor de seletor. A diferença de processamento entre CSS e XPath é desprezível frente ao tempo de rede.
- **Legibilidade:** o CSS é mais curto e direto para atributos, ids e classes. O XPath é mais verboso, mas ganha quando o seletor depende de **texto** ou da **estrutura** do DOM (navegar para cima/baixo na árvore).
- **Dependência:** `cy.xpath()` não é nativo do Cypress, exige o plugin `cypress-xpath`.
- **Recomendação:** usar CSS (ou `data-qa`) como padrão e XPath apenas quando o CSS não resolver.

### Como reproduzir o comparativo

```bash
npx cypress run --spec "cypress/e2e/5-test-cases.cy.js,cypress/e2e/5-test-cases-xpath.cy.js"
```

Para uma comparação mais justa, rode cada suíte de 3 a 5 vezes, alterne a ordem de execução e compare a média.
