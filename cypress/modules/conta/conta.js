const seletores = {
  linkExcluirConta: 'a[href="/delete_account"]',
  contaExcluida: '[data-qa="account-deleted"]',
  botaoContinuar: '[data-qa="continue-button"]'
};

function excluirConta() {
  cy.get(seletores.linkExcluirConta).click();
  validarContaExcluida();
  cy.get(seletores.botaoContinuar).click();
}

function validarContaExcluida() {
  cy.get(seletores.contaExcluida)
    .should('be.visible')
    .and('contain', 'Account Deleted!');
}

module.exports = {
  excluirConta
};
