describe('Cadastrar entradas e saídas com bugs', () => {
  beforeEach(() => {
    cy.visit("https://devfinance-agilizei.netlify.app")
  });

  it('Cadastrar uma nova transação de entrada - falha 1', () => {
    cy.contains("Nova Transação").click()
    cy.get("#description").type("Mesada")
    cy.get("#amount").type(100)
    cy.get("#date").type("2023-02-01")

    // .contains() sem argumento e .get() sem seletor eram inválidos
    cy.contains("button", "Salvar").click()

    cy.get("tbody tr").should("have.length", 1)
  });

  it('Cadastrar uma nova transação de entrada - falha 2', () => {
    cy.contains("Nova Transação").click()
    // sendKeys não existe no Cypress, o comando é type
    cy.get("#description").type("Mesada")
    cy.get("#amount").type(100)
    cy.get("#date").type("2023-02-01")

    // o botão se chama "Salvar", não "Add"
    cy.contains("Salvar").click()

    cy.get("tbody tr").should("have.length", 1)
  });

  it('Cadastrar uma nova transação de entrada - falha 3', () => {
    // faltava o cy.visit (agora no beforeEach)
    cy.contains("Nova Transação").click()
    cy.get("#description").type("Mesada")
    cy.get("#amount").type(100)

    // input type="date" exige o formato yyyy-mm-dd
    cy.get("#date").type("2023-02-01")

    cy.contains("Salvar").click()

    cy.get("tbody tr").should("have.length", 1)
  });

  it('Cadastrar uma nova transação de entrada - falha 4', () => {
    // o modal precisa ser aberto antes de preencher os campos
    cy.contains("Nova Transação").click()
    cy.get("#amount").type(100)
    cy.get("#description").type("Mesada")
    cy.get("#date").type("2023-02-01")
    
    cy.contains("Salvar").click()

    cy.get("tbody tr").should("have.length", 1)
  });

  it('Cadastrar uma nova transação de entrada - falha 5', () => {
    // texto do botão incorreto ("Nueva Transación")
    cy.contains("Nova Transação").click()
    cy.get("#description").type("Mesada")
    cy.get("#amount").type(100)
    cy.get("#date").type("2023-02-01")

    cy.contains("Salvar").click()

    cy.get("tbody tr").should("have.length", 1)
  });

  it('Cadastrar uma nova transação de entrada - falha 6', () => {
    cy.contains("Nova Transação").click()
    cy.get("#description").type("Mesada")
    cy.get("#amount").type(100)
    cy.get("#date").type("2023-02-01")

    cy.contains("Salvar").click()

    // apenas uma transação foi cadastrada, não 100
    cy.get("tbody tr").should("have.length", 1)
  });
});
