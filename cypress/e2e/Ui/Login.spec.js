/// <reference types="cypress" />


describe('Funcionalidade: Login', () => {
    // Define que todos os cenários descrito abaixo são na url de login
    beforeEach(() => {
        cy.visit('login')

    });
    // Realizar login com usuário e senha válidos - SUCESSO
    it('Deve fazer login com sucesso', () => {
        cy.login('pamelalopes@bootcamp.com', 'p123456')
        cy.get('[data-test="dashboard-welcome"]').should('contain', 'Bem-vindo')
        cy.get('[data-test="dashboard-noProfile"]').should('contain', 'Você não tem um perfil criado, por favor adicione algumas informações')
        cy.get('[data-test="dashboard-createProfile"]').should('contain', 'Criar Perfil')
    });
    // Testativa de login com usuário inválido
    it('Usuário não cadastrado', () => {
        cy.login('pamelalopess@bootcamp.com', 'p123456')
        cy.get('[data-test="login-submit"]').click()
        cy.get('[data-test="alert"]').should('contain', 'Credenciais inválidas')
    });
    // Tentativa de login com senha inválida
    it('Usuário com senha inválida', () => {
        cy.login('pamelalopes@bootcamp.com', 'p123457')
        cy.get('[data-test="login-submit"]').click()
        cy.get('[data-test="alert"]').should('contain', 'Credenciais inválidas')
    });
    // Tentativa de login sem usuário e senha
    it('Usuário não informa usuário e senha', () => {
        cy.get('[data-test="login-submit"]').click()
        cy.get('[data-test="login-email"] > .MuiFormHelperText-root').should('contain', 'Email é obrigatório')
        cy.get('[data-test="login-password"] > .MuiFormHelperText-root').should('contain', 'Senha é obrigatória')
    });
    // Tentativa de login apenas com usuário
    it('Usuário não informa senha', () => {
        cy.get('[data-test="login-email"] > .MuiInputBase-root > .MuiInputBase-input').type('pamelalopes@bootcamp.com')
        cy.get('[data-test="login-submit"]').click()
        cy.get('[data-test="login-password"] > .MuiFormHelperText-root').should('contain', 'Senha é obrigatória')
    });
    // Tentativa de login apenas com senha
    it('Usuário não informa usuário', () => {
        cy.get('[data-test="login-password"] > .MuiInputBase-root > .MuiInputBase-input').type('p123456')
        cy.get('[data-test="login-submit"]').click()
        cy.get('.MuiFormHelperText-root').should('contain', 'Email é obrigatório')
    });
});