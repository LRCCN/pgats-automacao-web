const dataQa = (valor) => `//*[@data-qa="${valor}"]`;

const seletores = {
  linkExcluirConta: '//a[@href="/delete_account"]',
  contaExcluida: dataQa('account-deleted'),
  botaoContinuar: dataQa('continue-button')
};

function excluirConta() {
  cy.xpath(seletores.linkExcluirConta).click();
  validarContaExcluida();
  cy.xpath(seletores.botaoContinuar).click();
}

function validarContaExcluida() {
  cy.xpath(seletores.contaExcluida)
    .should('be.visible')
    .and('contain', 'Account Deleted!');
}

module.exports = {
  excluirConta
};
