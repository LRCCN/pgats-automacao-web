const seletores = {
  tabela: '#cart_info_table',
  linhas: '#cart_info_table tbody tr',
  botaoCheckout: '.check_out',
  modalLogin: '.modal-body a[href="/login"]'
};

function validarProdutosNoCarrinho(quantidade) {
  cy.url().should('include', '/view_cart');
  cy.get(seletores.tabela).should('be.visible');
  cy.get(seletores.linhas).should('have.length', quantidade);
}

function irParaCheckout() {
  cy.get(seletores.botaoCheckout).click();
}

function irParaLoginPeloCheckout() {
  cy.get(seletores.modalLogin).click();
}

module.exports = {
  validarProdutosNoCarrinho,
  irParaCheckout,
  irParaLoginPeloCheckout
};
