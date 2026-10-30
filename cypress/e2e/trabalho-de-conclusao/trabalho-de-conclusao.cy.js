/// <reference types="cypress" />

const cadastro = require('../../modules/cadastro/cadastro');
const login = require('../../modules/login/login');
const logout = require('../../modules/logout/logout');
const conta = require('../../modules/conta/conta');
const api = require('../../modules/api/api');
const home = require('../../modules/home/home');
const produtos = require('../../modules/produtos/produtos');
const carrinho = require('../../modules/carrinho/carrinho');
const checkout = require('../../modules/checkout/checkout');
const usuarios = require('../../fixtures/usuarios.json');
const pagamento = require('../../fixtures/pagamento.json');

describe('Automation Exercise - Trabalho de Conclusão (Test Cases 1, 2, 3, 4, 5, 8, 9, 10, 15 e 16)', () => {
  let usuario;

  // e-mail único por teste, evitando "Email Address already exist!"
  beforeEach(() => {
    usuario = { ...usuarios.usuarioValido, email: `luiz-qa+${Date.now()}@teste.com` };
  });

  it('Test Case 1: Register User', () => {
    login.acessarLogin();
    cadastro.validarFormularioDeCadastroVisivel();

    cadastro.cadastrarUsuario(usuario);

    login.validarUsuarioAutenticado(usuario.nome);
    conta.excluirConta();
  });

  it('Test Case 2: Login User with correct email and password', () => {
    api.criarUsuario(usuario);
    login.acessarLogin();

    login.validarFormularioDeLoginVisivel();
    login.efetuarLogin(usuario.email, usuario.senha);

    login.validarUsuarioAutenticado(usuario.nome);
    conta.excluirConta();
  });

  it('Test Case 3: Login User with incorrect email and password', () => {
    login.acessarLogin();
    login.validarFormularioDeLoginVisivel();

    login.efetuarLogin(usuarios.usuarioInexistente.email, usuarios.usuarioInexistente.senha);

    login.validarMensagemDeErro();
  });

  it('Test Case 4: Logout User', () => {
    api.criarUsuario(usuario);
    login.acessarLogin();
    login.efetuarLogin(usuario.email, usuario.senha);
    login.validarUsuarioAutenticado(usuario.nome);

    logout.efetuarLogout();

    logout.validarUsuarioDeslogado();
    login.validarFormularioDeLoginVisivel();

    api.excluirUsuario(usuario);
  });

  it('Test Case 5: Register User with existing email', () => {
    api.criarUsuario(usuario);
    login.acessarLogin();

    cadastro.validarFormularioDeCadastroVisivel();
    cadastro.iniciarCadastro(usuario.nome, usuario.email);

    cadastro.validarEmailJaCadastrado();

    api.excluirUsuario(usuario);
  });

  it('Test Case 8: Verify All Products and product detail page', () => {
    home.acessarHome();
    produtos.acessarProdutos();
    produtos.validarListaDeProdutos();

    produtos.abrirPrimeiroProduto();

    produtos.validarDetalheDoProduto();
  });

  it('Test Case 9: Search Product', () => {
    home.acessarHome();
    produtos.acessarProdutos();
    produtos.validarListaDeProdutos();

    produtos.buscarProduto('Blue Top');

    produtos.validarResultadoDaBusca('Blue Top');
  });

  it('Test Case 10: Verify Subscription in home page', () => {
    home.acessarHome();

    home.inscreverNaNewsletter(usuario.email);

    home.validarInscricao();
  });

  it('Test Case 15: Place Order: Register while Checkout', () => {
    home.acessarHome();
    produtos.adicionarProdutoAoCarrinho(0);
    produtos.verCarrinho();
    carrinho.validarProdutosNoCarrinho(1);

    carrinho.irParaCheckout();
    carrinho.irParaLoginPeloCheckout();
    cadastro.cadastrarUsuario(usuario);
    login.validarUsuarioAutenticado(usuario.nome);

    checkout.abrirCarrinho();
    carrinho.irParaCheckout();
    checkout.validarEnderecoEResumo(usuario);
    checkout.fazerPedido(pagamento.comentario);
    checkout.pagar(pagamento.cartao);

    checkout.validarPedidoConfirmado();
    conta.excluirConta();
  });

  it('Test Case 16: Place Order: Login before Checkout', () => {
    api.criarUsuario(usuario);
    login.acessarLogin();
    login.efetuarLogin(usuario.email, usuario.senha);
    login.validarUsuarioAutenticado(usuario.nome);

    produtos.adicionarProdutoAoCarrinho(0);
    produtos.verCarrinho();
    carrinho.validarProdutosNoCarrinho(1);
    carrinho.irParaCheckout();
    checkout.validarEnderecoEResumo(usuario);
    checkout.fazerPedido(pagamento.comentario);
    checkout.pagar(pagamento.cartao);

    checkout.validarPedidoConfirmado();
    conta.excluirConta();
  });
});
