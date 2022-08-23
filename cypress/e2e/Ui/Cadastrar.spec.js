/// <reference types="cypress" />
const faker = require ('faker-br')


describe('Funcionalidade: Cadastrar', () => {
    // Para todos os cenários abaixo, utilizar a url cadastrar
    beforeEach(() => {
        cy.visit('cadastrar')

    });
    // Declaração de variaveis
    var varName = faker.name.firstName()
    var varEmail = faker.internet.email()
    var varPassword = faker.internet.password()
    // Cadastro de novo usuário realizado com sucesso
    it('Deve fazer cadastro com sucesso', () => {
        cy.cadastrar(varName, varEmail,varPassword,varPassword)
        cy.get('[data-test="dashboard-welcome"]').should('contain', 'Bem-vindo')
        cy.get('[data-test="dashboard-noProfile"]').should('contain', 'Você não tem um perfil criado, por favor adicione algumas informações')
        cy.get('[data-test="dashboard-createProfile"]').should('contain', 'Criar Perfil')
    });
    // Tentativa de cadastro com todos os campos vazios - Nome, email, senha e confirmação de senha
    it('Validar todos campos obrigatórios', () => {
        cy.get('[data-test="register-submit"]').click()
        // A validação da msg de obrigatoriedade do campo nome esta errada, pois cita email obrigatório e não nome
        cy.get('[data-test="register-name"] > .MuiFormHelperText-root').should('contain', 'Email é obrigatório')
        cy.get('[data-test="register-email"] > .MuiFormHelperText-root').should('contain', 'Email é obrigatório')
        cy.get('[data-test="register-password"] > .MuiFormHelperText-root').should('contain', 'Senha é obrigatória')
        cy.get('[data-test="register-password2"] > .MuiFormHelperText-root').should('contain', 'Confirmar senha é obrigatória')
    });
    // Tentativa de cadastro sem informar email, senha e confirmação da senha
    it('Validar campos obrigatórios - exceto Nome', () => {
        cy.get('[data-test="register-name"] > .MuiInputBase-root > .MuiInputBase-input').type(varEmail)
        cy.get('[data-test="register-submit"]').click()
        cy.get('[data-test="register-email"] > .MuiFormHelperText-root').should('contain', 'Email é obrigatório')
        cy.get('[data-test="register-password"] > .MuiFormHelperText-root').should('contain', 'Senha é obrigatória')
        cy.get('[data-test="register-password2"] > .MuiFormHelperText-root').should('contain', 'Confirmar senha é obrigatória')
    });
    // Tentativa de cadastro  sem informar senha e confirmação da senha
    it('Validar campos obrigatórios - exceto Nome, E-mail', () => {
        cy.get('[data-test="register-name"] > .MuiInputBase-root > .MuiInputBase-input').type(varName)
        cy.get('[data-test="register-email"] > .MuiInputBase-root > .MuiInputBase-input').type(varEmail)
        cy.get('[data-test="register-submit"]').click()
        cy.get('[data-test="register-password"] > .MuiFormHelperText-root').should('contain', 'Senha é obrigatória')
        cy.get('[data-test="register-password2"] > .MuiFormHelperText-root').should('contain', 'Confirmar senha é obrigatória')
    });
    // Tentativa de cadastro sem informar confirmação da senha
    it('Validar campos obrigatórios - exceto Nome, E-mail, Senha', () => {
        cy.get('[data-test="register-name"] > .MuiInputBase-root > .MuiInputBase-input').type(varName)
        cy.get('[data-test="register-email"] > .MuiInputBase-root > .MuiInputBase-input').type(varEmail)
        cy.get('[data-test="register-password"] > .MuiInputBase-root > .MuiInputBase-input').type(varPassword)
        cy.get('[data-test="register-submit"]').click()
        cy.get('[data-test="register-password2"] > .MuiFormHelperText-root').should('contain', 'Confirmar senha é obrigatória')
    });
    // Tentativa de cadastro com email sem domínio
    it('Validar campos - Email', () => {
        cy.get('[data-test="register-name"] > .MuiInputBase-root > .MuiInputBase-input').type(varName)
        cy.get('[data-test="register-email"] > .MuiInputBase-root > .MuiInputBase-input').type('emailinvalido')
        cy.get('[data-test="register-password"] > .MuiInputBase-root > .MuiInputBase-input').type(varPassword)
        cy.get('[data-test="register-password2"] > .MuiInputBase-root > .MuiInputBase-input').type(varPassword)
        cy.get('[data-test="register-submit"]').click()
        cy.get('[data-test="register-email"] > .MuiFormHelperText-root').should('contain', 'Digite um email válido')
    });
    // Tentativa de cadastro com email com domínio incompleto (.com)
    it('Validar campos - Email invalido 2', () => {
        cy.get('[data-test="register-name"] > .MuiInputBase-root > .MuiInputBase-input').type(varName)
        cy.get('[data-test="register-email"] > .MuiInputBase-root > .MuiInputBase-input').type('emailinvalido.com')
        cy.get('[data-test="register-password"] > .MuiInputBase-root > .MuiInputBase-input').type(varPassword)
        cy.get('[data-test="register-password2"] > .MuiInputBase-root > .MuiInputBase-input').type(varPassword)
        cy.get('[data-test="register-submit"]').click()
        cy.get('[data-test="register-email"] > .MuiFormHelperText-root').should('contain', 'Digite um email válido')
    });
    // Tentativa de cadastro com email com domínio incompleto (@dominio)
    it('Validar campos - Email invalido 3', () => {
        cy.get('[data-test="register-name"] > .MuiInputBase-root > .MuiInputBase-input').type(varName)
        cy.get('[data-test="register-email"] > .MuiInputBase-root > .MuiInputBase-input').type('emailinvalido@com')
        cy.get('[data-test="register-password"] > .MuiInputBase-root > .MuiInputBase-input').type(varPassword)
        cy.get('[data-test="register-password2"] > .MuiInputBase-root > .MuiInputBase-input').type(varPassword)
        cy.get('[data-test="register-submit"]').click()
        cy.get('[data-test="register-email"] > .MuiFormHelperText-root').should('contain', 'Digite um email válido')
    });
    // Tentativa de cadastro com confirmação de senha diferente da senha informada
    it('Validar campos - Confirmar senha não confere', () => {
        cy.get('[data-test="register-name"] > .MuiInputBase-root > .MuiInputBase-input').type(varName)
        cy.get('[data-test="register-email"] > .MuiInputBase-root > .MuiInputBase-input').type(varEmail)
        cy.get('[data-test="register-password"] > .MuiInputBase-root > .MuiInputBase-input').type(faker.internet.password())
        cy.get('[data-test="register-password2"] > .MuiInputBase-root > .MuiInputBase-input').type(faker.internet.password())
        cy.get('[data-test="register-submit"]').click()
        cy.get('[data-test="register-password2"] > .MuiFormHelperText-root').should('contain', 'Senhas precisam ser idênticas')
    });
});