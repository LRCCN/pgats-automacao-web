/// <reference types="cypress" />

const cadastro = require('../../modules-xpath/cadastro/cadastro');
const login = require('../../modules-xpath/login/login');
const logout = require('../../modules-xpath/logout/logout');
const conta = require('../../modules-xpath/conta/conta');
const usuarios = require('../../fixtures/usuarios.json');

describe('Automation Exercise - Test Cases 1 a 5 (modularizado, XPath)', () => {
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
    login.acessarLogin();
    cadastro.cadastrarUsuario(usuario);
    logout.efetuarLogout();

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
    login.acessarLogin();
    cadastro.cadastrarUsuario(usuario);
    logout.efetuarLogout();
    login.efetuarLogin(usuario.email, usuario.senha);
    login.validarUsuarioAutenticado(usuario.nome);

    logout.efetuarLogout();

    logout.validarUsuarioDeslogado();
    login.validarFormularioDeLoginVisivel();

    // limpeza: entra novamente para excluir a conta criada
    login.efetuarLogin(usuario.email, usuario.senha);
    conta.excluirConta();
  });

  it('Test Case 5: Register User with existing email', () => {
    login.acessarLogin();
    cadastro.cadastrarUsuario(usuario);
    logout.efetuarLogout();

    cadastro.validarFormularioDeCadastroVisivel();
    cadastro.iniciarCadastro(usuario.nome, usuario.email);

    cadastro.validarEmailJaCadastrado();

    // limpeza: entra para excluir a conta criada
    login.efetuarLogin(usuario.email, usuario.senha);
    conta.excluirConta();
  });
});
