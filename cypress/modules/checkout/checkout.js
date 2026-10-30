const seletores = {
  linkCarrinho: 'a[href="/view_cart"]',
  enderecoEntrega: '#address_delivery',
  enderecoCobranca: '#address_invoice',
  resumo: '#cart_info',
  comentario: 'textarea[name="message"]',
  botaoFazerPedido: 'a[href="/payment"]',
  nomeCartao: '[data-qa="name-on-card"]',
  numeroCartao: '[data-qa="card-number"]',
  cvc: '[data-qa="cvc"]',
  mesValidade: '[data-qa="expiry-month"]',
  anoValidade: '[data-qa="expiry-year"]',
  botaoPagar: '[data-qa="pay-button"]',
  pedidoRealizado: '[data-qa="order-placed"]'
};

function abrirCarrinho() {
  cy.get(seletores.linkCarrinho).first().click();
}

function validarEnderecoEResumo(usuario) {
  [seletores.enderecoEntrega, seletores.enderecoCobranca].forEach((endereco) => {
    cy.get(endereco)
      .should('contain.text', usuario.primeiroNome)
      .and('contain.text', usuario.endereco)
      .and('contain.text', usuario.cidade);
  });
  cy.get(seletores.resumo).should('be.visible');
}

function fazerPedido(comentario) {
  cy.get(seletores.comentario).type(comentario);
  cy.get(seletores.botaoFazerPedido).click();
}

function pagar(cartao) {
  cy.get(seletores.nomeCartao).type(cartao.nome);
  cy.get(seletores.numeroCartao).type(cartao.numero);
  cy.get(seletores.cvc).type(cartao.cvc);
  cy.get(seletores.mesValidade).type(cartao.mes);
  cy.get(seletores.anoValidade).type(cartao.ano);
  cy.get(seletores.botaoPagar).click();
}

function validarPedidoConfirmado() {
  cy.get(seletores.pedidoRealizado)
    .should('be.visible')
    .and('contain.text', 'Order Placed!');
  cy.contains('Congratulations! Your order has been confirmed!').should('be.visible');
}

module.exports = {
  abrirCarrinho,
  validarEnderecoEResumo,
  fazerPedido,
  pagar,
  validarPedidoConfirmado
};
