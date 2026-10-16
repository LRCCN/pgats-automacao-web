describe('Automation Exercise', () => {
    // Cadastro
  it('Cadastro um novo usuário com sucesso', () => {
    // e-mail único a cada execução, evitando "Email Address already exist!"
    const timestamp = Date.now();
    const usuario = {
      nome: 'luiz-qa',
      email: `luiz-qa+${timestamp}@teste.com`,
      senha: '12345',
    };

    cy.visit('https://automationexercise.com/');
    cy.get('a[href*=login]').click();

    cy.get('[data-qa="signup-name"]').type(usuario.nome);
    cy.get('[data-qa="signup-email"]').type(usuario.email);

    cy.get('[data-qa="signup-button"]').click();

    // radio buttons -> check
    cy.get('#id_gender2').check();

    cy.get('[data-qa="password"]').type(usuario.senha);

    // Selects e Comboboxes -> select
    cy.get('[data-qa="days"]').select('15');
    cy.get('[data-qa="months"]').select('12');
    cy.get('[data-qa="years"]').select('1993');

    // checkboxes -> check
    cy.get('#newsletter').check();
    cy.get('#optin').check();

    // dados pessoais
    cy.get('[data-qa="first_name"]').type('Luiz');
    cy.get('[data-qa="last_name"]').type('QA');
    cy.get('[data-qa="company"]').type('PGATS');
    cy.get('[data-qa="address"]').type('Rua dos Testes, 123');
    cy.get('[data-qa="address2"]').type('Apto 47');
    cy.get('[data-qa="country"]').select('India');
    cy.get('[data-qa="state"]').type('AM');
    cy.get('[data-qa="city"]').type('Manaus');
    cy.get('[data-qa="zipcode"]').type('01000-000');
    cy.get('[data-qa="mobile_number"]').type('92999999999');

    cy.get('[data-qa="create-account"]').click();

    // valida conta criada
    cy.get('[data-qa="account-created"]').should('be.visible');
    cy.get('[data-qa="continue-button"]').click();

    // valida que o usuário está logado
    cy.get('.navbar-nav').should('contain.text', 'Logged in as');
  });
});