const dataQa = (valor) => `//*[@data-qa="${valor}"]`;

const seletores = {
  linkLogin: '//a[contains(@href,"login")]',
  email: dataQa('login-email'),
  senha: dataQa('login-password'),
  botaoEntrar: dataQa('login-button'),
  formularioLogin: '//div[contains(@class,"login-form")]',
  tituloLogin: '//h2[normalize-space()="Login to your account"]',
  usuarioAutenticado: '//ul[contains(@class,"navbar-nav")]'
};

function acessarLogin() {
  cy.visit('/');
  cy.xpath(seletores.linkLogin).click();
}

function efetuarLogin(email, senha) {
  cy.xpath(seletores.email).type(email);
  cy.xpath(seletores.senha).type(senha);
  cy.xpath(seletores.botaoEntrar).click();
}

function validarFormularioDeLoginVisivel() {
  cy.xpath(seletores.tituloLogin).should('be.visible');
}

function validarUsuarioAutenticado(nome) {
  cy.xpath(seletores.usuarioAutenticado)
    .should('contain.text', `Logged in as ${nome}`);
}

function validarMensagemDeErro() {
  cy.xpath(seletores.formularioLogin)
    .should('contain.text', 'Your email or password is incorrect!');
}

module.exports = {
  acessarLogin,
  efetuarLogin,
  validarFormularioDeLoginVisivel,
  validarUsuarioAutenticado,
  validarMensagemDeErro
};
