const seletores = {
  linkLogin: 'a[href*=login]',
  email: '[data-qa="login-email"]',
  senha: '[data-qa="login-password"]',
  botaoEntrar: '[data-qa="login-button"]',
  formularioLogin: '.login-form',
  usuarioAutenticado: '.navbar-nav'
};

function acessarLogin() {
  cy.visit('/');
  cy.get(seletores.linkLogin).click();
}

function efetuarLogin(email, senha) {
  cy.get(seletores.email).type(email);
  cy.get(seletores.senha).type(senha);
  cy.get(seletores.botaoEntrar).click();
}

function validarFormularioDeLoginVisivel() {
  cy.contains('Login to your account').should('be.visible');
}

function validarUsuarioAutenticado(nome) {
  cy.get(seletores.usuarioAutenticado)
    .should('contain.text', `Logged in as ${nome}`);
}

function validarMensagemDeErro() {
  cy.get(seletores.formularioLogin)
    .should('contain.text', 'Your email or password is incorrect!');
}

module.exports = {
  acessarLogin,
  efetuarLogin,
  validarFormularioDeLoginVisivel,
  validarUsuarioAutenticado,
  validarMensagemDeErro
};
