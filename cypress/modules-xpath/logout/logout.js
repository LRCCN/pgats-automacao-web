const seletores = {
  linkLogout: '//a[@href="/logout"]'
};

function efetuarLogout() {
  cy.xpath(seletores.linkLogout).click();
}

function validarUsuarioDeslogado() {
  cy.url().should('include', '/login');
  cy.xpath(seletores.linkLogout).should('not.exist');
}

module.exports = {
  efetuarLogout,
  validarUsuarioDeslogado
};
