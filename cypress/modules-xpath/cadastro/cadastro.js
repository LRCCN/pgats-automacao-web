const dataQa = (valor) => `//*[@data-qa="${valor}"]`;

const seletores = {
  nome: dataQa('signup-name'),
  email: dataQa('signup-email'),
  botaoCadastrar: dataQa('signup-button'),
  formularioCadastro: '//div[contains(@class,"signup-form")]',
  tituloCadastro: '//h2[normalize-space()="New User Signup!"]',
  genero: '//input[@id="id_gender2"]',
  senha: dataQa('password'),
  dia: dataQa('days'),
  mes: dataQa('months'),
  ano: dataQa('years'),
  newsletter: '//input[@id="newsletter"]',
  ofertas: '//input[@id="optin"]',
  primeiroNome: dataQa('first_name'),
  ultimoNome: dataQa('last_name'),
  empresa: dataQa('company'),
  endereco: dataQa('address'),
  complemento: dataQa('address2'),
  pais: dataQa('country'),
  estado: dataQa('state'),
  cidade: dataQa('city'),
  cep: dataQa('zipcode'),
  celular: dataQa('mobile_number'),
  botaoCriarConta: dataQa('create-account'),
  contaCriada: dataQa('account-created'),
  botaoContinuar: dataQa('continue-button')
};

function iniciarCadastro(nome, email) {
  cy.xpath(seletores.nome).type(nome);
  cy.xpath(seletores.email).type(email);
  cy.xpath(seletores.botaoCadastrar).click();
}

function preencherDadosDoUsuario(usuario) {
  cy.xpath(seletores.genero).check();
  cy.xpath(seletores.senha).type(usuario.senha);
  cy.xpath(seletores.dia).select(usuario.dia);
  cy.xpath(seletores.mes).select(usuario.mes);
  cy.xpath(seletores.ano).select(usuario.ano);
  cy.xpath(seletores.newsletter).check();
  cy.xpath(seletores.ofertas).check();
  cy.xpath(seletores.primeiroNome).type(usuario.primeiroNome);
  cy.xpath(seletores.ultimoNome).type(usuario.ultimoNome);
  cy.xpath(seletores.empresa).type(usuario.empresa);
  cy.xpath(seletores.endereco).type(usuario.endereco);
  cy.xpath(seletores.complemento).type(usuario.complemento);
  cy.xpath(seletores.pais).select(usuario.pais);
  cy.xpath(seletores.estado).type(usuario.estado);
  cy.xpath(seletores.cidade).type(usuario.cidade);
  cy.xpath(seletores.cep).type(usuario.cep);
  cy.xpath(seletores.celular).type(usuario.celular);
  cy.xpath(seletores.botaoCriarConta).click();
}

function cadastrarUsuario(usuario) {
  iniciarCadastro(usuario.nome, usuario.email);
  preencherDadosDoUsuario(usuario);
  validarCadastroRealizado();
  cy.xpath(seletores.botaoContinuar).click();
}

function validarFormularioDeCadastroVisivel() {
  cy.xpath(seletores.tituloCadastro).should('be.visible');
}

function validarCadastroRealizado() {
  cy.xpath(seletores.contaCriada)
    .should('be.visible')
    .and('contain', 'Account Created!');
}

function validarEmailJaCadastrado() {
  cy.xpath(seletores.formularioCadastro)
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
