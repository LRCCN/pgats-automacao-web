const seletores = {
  nome: '[data-qa="signup-name"]',
  email: '[data-qa="signup-email"]',
  botaoCadastrar: '[data-qa="signup-button"]',
  formularioCadastro: '.signup-form',
  genero: '#id_gender2',
  senha: '[data-qa="password"]',
  dia: '[data-qa="days"]',
  mes: '[data-qa="months"]',
  ano: '[data-qa="years"]',
  newsletter: '#newsletter',
  ofertas: '#optin',
  primeiroNome: '[data-qa="first_name"]',
  ultimoNome: '[data-qa="last_name"]',
  empresa: '[data-qa="company"]',
  endereco: '[data-qa="address"]',
  complemento: '[data-qa="address2"]',
  pais: '[data-qa="country"]',
  estado: '[data-qa="state"]',
  cidade: '[data-qa="city"]',
  cep: '[data-qa="zipcode"]',
  celular: '[data-qa="mobile_number"]',
  botaoCriarConta: '[data-qa="create-account"]',
  contaCriada: '[data-qa="account-created"]',
  botaoContinuar: '[data-qa="continue-button"]'
};

function iniciarCadastro(nome, email) {
  cy.get(seletores.nome).type(nome);
  cy.get(seletores.email).type(email);
  cy.get(seletores.botaoCadastrar).click();
}

function preencherDadosDoUsuario(usuario) {
  cy.get(seletores.genero).check();
  cy.get(seletores.senha).type(usuario.senha);
  cy.get(seletores.dia).select(usuario.dia);
  cy.get(seletores.mes).select(usuario.mes);
  cy.get(seletores.ano).select(usuario.ano);
  cy.get(seletores.newsletter).check();
  cy.get(seletores.ofertas).check();
  cy.get(seletores.primeiroNome).type(usuario.primeiroNome);
  cy.get(seletores.ultimoNome).type(usuario.ultimoNome);
  cy.get(seletores.empresa).type(usuario.empresa);
  cy.get(seletores.endereco).type(usuario.endereco);
  cy.get(seletores.complemento).type(usuario.complemento);
  cy.get(seletores.pais).select(usuario.pais);
  cy.get(seletores.estado).type(usuario.estado);
  cy.get(seletores.cidade).type(usuario.cidade);
  cy.get(seletores.cep).type(usuario.cep);
  cy.get(seletores.celular).type(usuario.celular);
  cy.get(seletores.botaoCriarConta).click();
}

function cadastrarUsuario(usuario) {
  iniciarCadastro(usuario.nome, usuario.email);
  preencherDadosDoUsuario(usuario);
  validarCadastroRealizado();
  cy.get(seletores.botaoContinuar).click();
}

function validarFormularioDeCadastroVisivel() {
  cy.contains('New User Signup!').should('be.visible');
}

function validarCadastroRealizado() {
  cy.get(seletores.contaCriada)
    .should('be.visible')
    .and('contain', 'Account Created!');
}

function validarEmailJaCadastrado() {
  cy.get(seletores.formularioCadastro)
    .should('contain.text', 'Email Address already exist!');
}

module.exports = {
  iniciarCadastro,
  preencherDadosDoUsuario,
  cadastrarUsuario,
  validarFormularioDeCadastroVisivel,
  validarCadastroRealizado,
  validarEmailJaCadastrado
};
