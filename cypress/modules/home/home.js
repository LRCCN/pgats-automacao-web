const seletores = {
  tituloSubscription: '.single-widget h2',
  email: '#susbscribe_email',
  botaoInscrever: '#subscribe',
  sucesso: '#success-subscribe'
};

function acessarHome() {
  cy.visit('/');
  cy.title().should('contain', 'Automation Exercise');
}

function inscreverNaNewsletter(email) {
  cy.get(seletores.tituloSubscription).scrollIntoView().should('contain.text', 'Subscription');
  cy.get(seletores.email).type(email);
  cy.get(seletores.botaoInscrever).click();
}

function validarInscricao() {
  cy.get(seletores.sucesso)
    .should('be.visible')
    .and('contain.text', 'You have been successfully subscribed!');
}

module.exports = {
  acessarHome,
  inscreverNaNewsletter,
  validarInscricao
};
