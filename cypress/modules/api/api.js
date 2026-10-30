// App Actions: prepara/limpa o estado da aplicação via API, sem passar pela UI
function criarUsuario(usuario) {
  cy.request({
    method: 'POST',
    url: '/api/createAccount',
    form: true,
    body: {
      name: usuario.nome,
      email: usuario.email,
      password: usuario.senha,
      title: 'Mrs',
      birth_date: usuario.dia,
      birth_month: usuario.mes,
      birth_year: usuario.ano,
      firstname: usuario.primeiroNome,
      lastname: usuario.ultimoNome,
      company: usuario.empresa,
      address1: usuario.endereco,
      address2: usuario.complemento,
      country: usuario.pais,
      zipcode: usuario.cep,
      state: usuario.estado,
      city: usuario.cidade,
      mobile_number: usuario.celular
    }
  }).then(({ body }) => {
    // a API responde 200 no HTTP e o status real no corpo (JSON em texto)
    expect(JSON.parse(body).responseCode).to.eq(201);
  });
}

function excluirUsuario(usuario) {
  cy.request({
    method: 'DELETE',
    url: '/api/deleteAccount',
    form: true,
    body: { email: usuario.email, password: usuario.senha }
  }).then(({ body }) => {
    expect(JSON.parse(body).responseCode).to.eq(200);
  });
}

module.exports = { criarUsuario, excluirUsuario };
