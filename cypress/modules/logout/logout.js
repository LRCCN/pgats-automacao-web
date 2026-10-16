const seletores = {
  linkLogout: 'a[href="/logout"]'
};

function efetuarLogout() {
  cy.get(seletores.linkLogout).click();
}

function validarUsuarioDeslogado() {
  cy.url().should('include', '/login');
  cy.get(seletores.linkLogout).should('not.exist');
}

module.exports = {
  efetuarLogout,
  validarUsuarioDeslogado
};
