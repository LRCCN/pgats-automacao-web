const seletores = {
  linkProdutos: 'a[href="/products"]',
  titulo: '.features_items .title',
  cards: '.features_items .product-image-wrapper',
  nomes: '.features_items .productinfo p',
  linkDetalhe: 'a[href^="/product_details/"]',
  detalhe: '.product-information',
  campoBusca: '#search_product',
  botaoBusca: '#submit_search',
  botaoAdicionar: '.productinfo a.add-to-cart',
  modalCarrinho: '#cartModal',
  linkVerCarrinho: '#cartModal a[href="/view_cart"]'
};

function acessarProdutos() {
  cy.get(seletores.linkProdutos).first().click();
  cy.url().should('include', '/products');
}

function validarListaDeProdutos() {
  cy.get(seletores.titulo).should('contain.text', 'All Products');
  cy.get(seletores.cards).should('have.length.greaterThan', 0);
}

function abrirPrimeiroProduto() {
  cy.get(seletores.linkDetalhe).first().click();
  cy.url().should('include', '/product_details/');
}

function validarDetalheDoProduto() {
  cy.get(seletores.detalhe).within(() => {
    cy.get('h2').should('not.be.empty');
    cy.contains('Category:').should('be.visible');
    cy.contains('Availability:').should('be.visible');
    cy.contains('Condition:').should('be.visible');
    cy.contains('Brand:').should('be.visible');
  });
}

function buscarProduto(termo) {
  cy.get(seletores.campoBusca).type(termo);
  cy.get(seletores.botaoBusca).click();
}

function validarResultadoDaBusca(termo) {
  cy.get(seletores.titulo).should('contain.text', 'Searched Products');
  cy.get(seletores.cards).should('have.length.greaterThan', 0);
  cy.get(seletores.nomes).each(($nome) => {
    expect($nome.text().toLowerCase()).to.contain(termo.toLowerCase());
  });
}

// o botão só aparece no hover; force evita depender dele
function adicionarProdutoAoCarrinho(indice) {
  cy.get(seletores.botaoAdicionar).eq(indice).click({ force: true });
  cy.get(seletores.modalCarrinho).should('be.visible');
}

function verCarrinho() {
  cy.get(seletores.linkVerCarrinho).click();
}

module.exports = {
  acessarProdutos,
  validarListaDeProdutos,
  abrirPrimeiroProduto,
  validarDetalheDoProduto,
  buscarProduto,
  validarResultadoDaBusca,
  adicionarProdutoAoCarrinho,
  verCarrinho
};
