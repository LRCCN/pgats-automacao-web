describe('Automation Exercise - Test Cases 1 a 5', () => {
  let usuario;

  // gera um usuário único por teste, evitando "Email Address already exist!"
  beforeEach(() => {
    usuario = {
      nome: 'luiz-qa',
      email: `luiz-qa+${Date.now()}@teste.com`,
      senha: '12345',
    };
  });

  // ---------- helpers ----------
  const abrirLogin = () => {
    cy.visit('https://automationexercise.com/');
    cy.get('a[href*=login]').click();
  };

  const preencherCadastro = () => {
    cy.get('[data-qa="signup-name"]').type(usuario.nome);
    cy.get('[data-qa="signup-email"]').type(usuario.email);
    cy.get('[data-qa="signup-button"]').click();

    cy.get('#id_gender2').check();
    cy.get('[data-qa="password"]').type(usuario.senha);
    cy.get('[data-qa="days"]').select('15');
    cy.get('[data-qa="months"]').select('12');
    cy.get('[data-qa="years"]').select('1993');
    cy.get('#newsletter').check();
    cy.get('#optin').check();

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

    cy.get('[data-qa="account-created"]').should('be.visible');
    cy.get('[data-qa="continue-button"]').click();
  };

  const logout = () => {
    cy.get('a[href="/logout"]').click();
    cy.url().should('include', '/login');
  };

  const login = (email, senha) => {
    cy.get('[data-qa="login-email"]').type(email);
    cy.get('[data-qa="login-password"]').type(senha);
    cy.get('[data-qa="login-button"]').click();
  };

  const excluirConta = () => {
    cy.get('a[href="/delete_account"]').click();
    cy.get('[data-qa="account-deleted"]').should('be.visible');
    cy.get('[data-qa="continue-button"]').click();
  };

  // cria o usuário pela UI e desloga, deixando-o pronto para login
  const criarUsuarioEDeslogar = () => {
    abrirLogin();
    preencherCadastro();
    logout();
  };

  // ---------- testes ----------
  it('Test Case 1: Register User', () => {
    abrirLogin();
    cy.contains('New User Signup!').should('be.visible');

    preencherCadastro();

    cy.get('.navbar-nav').should('contain.text', `Logged in as ${usuario.nome}`);
    excluirConta();
  });

  it('Test Case 2: Login User with correct email and password', () => {
    criarUsuarioEDeslogar();

    cy.contains('Login to your account').should('be.visible');
    login(usuario.email, usuario.senha);

    cy.get('.navbar-nav').should('contain.text', `Logged in as ${usuario.nome}`);
    excluirConta();
  });

  it('Test Case 3: Login User with incorrect email and password', () => {
    abrirLogin();

    cy.contains('Login to your account').should('be.visible');
    login('email-inexistente@teste.com', 'senha-errada');

    cy.get('.login-form').should('contain.text', 'Your email or password is incorrect!');
  });

  it('Test Case 4: Logout User', () => {
    criarUsuarioEDeslogar();

    login(usuario.email, usuario.senha);
    cy.get('.navbar-nav').should('contain.text', `Logged in as ${usuario.nome}`);

    logout();
    cy.contains('Login to your account').should('be.visible');

    // limpeza: entra novamente para excluir a conta criada
    login(usuario.email, usuario.senha);
    excluirConta();
  });

  it('Test Case 5: Register User with existing email', () => {
    criarUsuarioEDeslogar();

    cy.contains('New User Signup!').should('be.visible');
    cy.get('[data-qa="signup-name"]').type(usuario.nome);
    cy.get('[data-qa="signup-email"]').type(usuario.email);
    cy.get('[data-qa="signup-button"]').click();

    cy.get('.signup-form').should('contain.text', 'Email Address already exist!');

    // limpeza: entra para excluir a conta criada
    login(usuario.email, usuario.senha);
    excluirConta();
  });
});
