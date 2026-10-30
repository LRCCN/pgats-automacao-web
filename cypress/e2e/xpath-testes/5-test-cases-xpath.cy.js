// Mesma suíte de 5-test-cases.cy.js, porém com seletores XPath (cypress-xpath)
// para comparar legibilidade e velocidade de execução com os seletores CSS.
describe('Automation Exercise - Test Cases 1 a 5 (XPath)', () => {
  let usuario;

  beforeEach(() => {
    usuario = {
      nome: 'luiz-qa',
      email: `luiz-qa+${Date.now()}@teste.com`,
      senha: '12345',
    };
  });

  // ---------- helpers ----------
  const dataQa = (nome) => `//*[@data-qa="${nome}"]`;

  const abrirLogin = () => {
    cy.visit('https://automationexercise.com/');
    cy.xpath('//a[contains(@href,"login")]').click();
  };

  const preencherCadastro = () => {
    cy.xpath(dataQa('signup-name')).type(usuario.nome);
    cy.xpath(dataQa('signup-email')).type(usuario.email);
    cy.xpath(dataQa('signup-button')).click();

    cy.xpath('//input[@id="id_gender2"]').check();
    cy.xpath(dataQa('password')).type(usuario.senha);
    cy.xpath(dataQa('days')).select('15');
    cy.xpath(dataQa('months')).select('12');
    cy.xpath(dataQa('years')).select('1993');
    cy.xpath('//input[@id="newsletter"]').check();
    cy.xpath('//input[@id="optin"]').check();

    cy.xpath(dataQa('first_name')).type('Luiz');
    cy.xpath(dataQa('last_name')).type('QA');
    cy.xpath(dataQa('company')).type('PGATS');
    cy.xpath(dataQa('address')).type('Rua dos Testes, 123');
    cy.xpath(dataQa('address2')).type('Apto 47');
    cy.xpath(dataQa('country')).select('India');
    cy.xpath(dataQa('state')).type('AM');
    cy.xpath(dataQa('city')).type('Manaus');
    cy.xpath(dataQa('zipcode')).type('01000-000');
    cy.xpath(dataQa('mobile_number')).type('92999999999');
    cy.xpath(dataQa('create-account')).click();

    cy.xpath(dataQa('account-created')).should('be.visible');
    cy.xpath(dataQa('continue-button')).click();
  };

  const logout = () => {
    cy.xpath('//a[@href="/logout"]').click();
    cy.url().should('include', '/login');
  };

  const login = (email, senha) => {
    cy.xpath(dataQa('login-email')).type(email);
    cy.xpath(dataQa('login-password')).type(senha);
    cy.xpath(dataQa('login-button')).click();
  };

  const excluirConta = () => {
    cy.xpath('//a[@href="/delete_account"]').click();
    cy.xpath(dataQa('account-deleted')).should('be.visible');
    cy.xpath(dataQa('continue-button')).click();
  };

  const criarUsuarioEDeslogar = () => {
    abrirLogin();
    preencherCadastro();
    logout();
  };

  const navbar = () => cy.xpath('//ul[contains(@class,"navbar-nav")]');

  // ---------- testes ----------
  it('Test Case 1: Register User', () => {
    abrirLogin();
    cy.xpath('//h2[normalize-space()="New User Signup!"]').should('be.visible');

    preencherCadastro();

    navbar().should('contain.text', `Logged in as ${usuario.nome}`);
    excluirConta();
  });

  it('Test Case 2: Login User with correct email and password', () => {
    criarUsuarioEDeslogar();

    cy.xpath('//h2[normalize-space()="Login to your account"]').should('be.visible');
    login(usuario.email, usuario.senha);

    navbar().should('contain.text', `Logged in as ${usuario.nome}`);
    excluirConta();
  });

  it('Test Case 3: Login User with incorrect email and password', () => {
    abrirLogin();

    cy.xpath('//h2[normalize-space()="Login to your account"]').should('be.visible');
    login('email-inexistente@teste.com', 'senha-errada');

    cy.xpath('//div[contains(@class,"login-form")]//p[contains(text(),"Your email or password is incorrect!")]')
      .should('be.visible');
  });

  it('Test Case 4: Logout User', () => {
    criarUsuarioEDeslogar();

    login(usuario.email, usuario.senha);
    navbar().should('contain.text', `Logged in as ${usuario.nome}`);

    logout();
    cy.xpath('//h2[normalize-space()="Login to your account"]').should('be.visible');

    login(usuario.email, usuario.senha);
    excluirConta();
  });

  it('Test Case 5: Register User with existing email', () => {
    criarUsuarioEDeslogar();

    cy.xpath('//h2[normalize-space()="New User Signup!"]').should('be.visible');
    cy.xpath(dataQa('signup-name')).type(usuario.nome);
    cy.xpath(dataQa('signup-email')).type(usuario.email);
    cy.xpath(dataQa('signup-button')).click();

    cy.xpath('//div[contains(@class,"signup-form")]//p[contains(text(),"Email Address already exist!")]')
      .should('be.visible');

    login(usuario.email, usuario.senha);
    excluirConta();
  });
});
