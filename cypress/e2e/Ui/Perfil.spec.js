/// <reference types="cypress" />

const faker = require ('faker-br')

describe('Funcionalidade: Criar perfil', () => {
    // Define que todos os cenários descrito abaixo são na url de cadastrar
    beforeEach(() => {
        cy.visit('cadastrar')
    });
    // Preenchimento de todos os campos de cadastro de perfil
    it('Dados de perfil completo', () => {    
        var varName = faker.name.firstName()
        var varEmail = faker.internet.email()
        var varPassword = faker.internet.password()
        cy.cadastrar(varName, varEmail,varPassword,varPassword)
        cy.get('[data-test="dashboard-welcome"]').should('contain', 'Bem-vindo')
        cy.get('[data-test="dashboard-createProfile"]').click()
        cy.get('.large').should('contain','Crie Seu Perfil')
        cy.get('#mui-component-select-status').click()
            cy.contains('Gerente de Testes').click()
        cy.get('[data-test="profile-company"] > .MuiInputBase-root > .MuiInputBase-input').type(faker.company.companyName())
        cy.get('[data-test="profile-webSite"] > .MuiInputBase-root > .MuiInputBase-input').type(faker.internet.url())
        cy.get('[data-test="profile-location"] > .MuiInputBase-root > .MuiInputBase-input').type(faker.address.city() + ' - ' + faker.address.state() )
        cy.get('[data-test="profile-skills"] > .MuiInputBase-root > .MuiInputBase-input').type(faker.random.word() +', ' + faker.random.word() +', ' + faker.random.word() +', ' + faker.random.word())
        cy.get('[data-test="profile-gitHub"] > .MuiInputBase-root > .MuiInputBase-input').type('www.github.com')
        cy.get('[rows="1"]').type(faker.lorem.paragraphs())
        cy.get('[data-test="profile-socials"]').click()
        cy.get('[data-test="profile-twitter"] > .MuiInputBase-root > .MuiInputBase-input').type(faker.internet.url())
        cy.get('[data-test="profile-facebook"] > .MuiInputBase-root > .MuiInputBase-input').type(faker.internet.url())
        cy.get('[data-test="profile-youtube"] > .MuiInputBase-root > .MuiInputBase-input').type(faker.internet.url())
        cy.get('[data-test="profile-linkedin"] > .MuiInputBase-root > .MuiInputBase-input').type(faker.internet.url())
        cy.get('[data-test="profile-instagram"] > .MuiInputBase-root > .MuiInputBase-input').type(faker.internet.url())
        cy.get('[data-test="profile-medium"] > .MuiInputBase-root > .MuiInputBase-input').type(faker.internet.url())
        cy.get('[data-test="profile-submit"]').click() 
        cy.get('[data-test="alert"]').should('contain', 'Perfil Criado')
        cy.get('.large').should('contain', 'Dashboard')
        cy.get('[data-test="dashboard-editProfile"]').should('contain', 'Editar Perfil')
        cy.get('[data-test="dashboard-addExperience"]').should('contain', 'Adicionar Experiência')
        cy.get('[href="/adicionar-formacao"]').should('contain', 'Adicionar Formação Acadêmica')
        cy.get('.container > :nth-child(5)').should('contain', 'Experiências')
        cy.get(':nth-child(6) > thead > tr > :nth-child(1)').should('contain', 'Empresa')
        cy.get(':nth-child(6) > thead > tr > :nth-child(2)').should('contain', 'Posição')
        cy.get(':nth-child(6) > thead > tr > :nth-child(3)').should('contain', 'Período')
        cy.get('.container > :nth-child(7)').should('contain', 'Formações Acadêmicas')
        cy.get(':nth-child(8) > thead > tr > :nth-child(1)').should('contain', 'Escola')
        cy.get(':nth-child(8) > thead > tr > :nth-child(2)').should('contain', 'Grau')
        cy.get(':nth-child(8) > thead > tr > :nth-child(3)').should('contain', 'Período')
        cy.get('[data-test="dashboard-deleteProfile"]').should('contain', 'Excluir Conta')
    });
    // Preenchimento de todos os campos de cadastro de perfil exceto redes sociais
    it('Dados de perfil sem dados de rede social', () => {    
        var varName = faker.name.firstName()
        var varEmail = faker.internet.email()
        var varPassword = faker.internet.password()
        cy.cadastrar(varName, varEmail,varPassword,varPassword)
        cy.get('[data-test="dashboard-welcome"]').should('contain', 'Bem-vindo')
        cy.get('[data-test="dashboard-createProfile"]').click()
        cy.get('.large').should('contain','Crie Seu Perfil')
        cy.get('#mui-component-select-status').click()
        //Seleção de status random
        cy.get('.MuiMenu-list li')
            .then(($li) => {
            const items = $li.toArray()
            return Cypress._.sample(items)
        }).click()
        cy.get('[data-test="profile-company"] > .MuiInputBase-root > .MuiInputBase-input').type(faker.company.companyName())
        cy.get('[data-test="profile-webSite"] > .MuiInputBase-root > .MuiInputBase-input').type(faker.internet.url())
        cy.get('[data-test="profile-location"] > .MuiInputBase-root > .MuiInputBase-input').type(faker.address.city() + ' - ' + faker.address.state() )
        cy.get('[data-test="profile-skills"] > .MuiInputBase-root > .MuiInputBase-input').type(faker.random.word() +', ' + faker.random.word() +', ' + faker.random.word() +', ' + faker.random.word())
        cy.get('[data-test="profile-gitHub"] > .MuiInputBase-root > .MuiInputBase-input').type('www.github.com')
        cy.get('[rows="1"]').type(faker.lorem.sentence())
        cy.get('[data-test="profile-submit"]').click() 
        cy.get('[data-test="alert"]').should('contain', 'Perfil Criado')
        cy.get('.large').should('contain', 'Dashboard')
        cy.get('[data-test="dashboard-editProfile"]').should('contain', 'Editar Perfil')
        cy.get('[data-test="dashboard-addExperience"]').should('contain', 'Adicionar Experiência')
        cy.get('[href="/adicionar-formacao"]').should('contain', 'Adicionar Formação Acadêmica')
        cy.get('.container > :nth-child(5)').should('contain', 'Experiências')
        cy.get(':nth-child(6) > thead > tr > :nth-child(1)').should('contain', 'Empresa')
        cy.get(':nth-child(6) > thead > tr > :nth-child(2)').should('contain', 'Posição')
        cy.get(':nth-child(6) > thead > tr > :nth-child(3)').should('contain', 'Período')
        cy.get('.container > :nth-child(7)').should('contain', 'Formações Acadêmicas')
        cy.get(':nth-child(8) > thead > tr > :nth-child(1)').should('contain', 'Escola')
        cy.get(':nth-child(8) > thead > tr > :nth-child(2)').should('contain', 'Grau')
        cy.get(':nth-child(8) > thead > tr > :nth-child(3)').should('contain', 'Período')
        cy.get('[data-test="dashboard-deleteProfile"]').should('contain', 'Excluir Conta')
    });
    // Tentativa de cadastro de perfil com todos os campos vazios
    it('Campos obrigatórios de cadastro de perfil', () => {    
        var varName = faker.name.firstName()
        var varEmail = faker.internet.email()
        var varPassword = faker.internet.password()
        cy.cadastrar(varName, varEmail,varPassword,varPassword)
        cy.get('[data-test="dashboard-welcome"]').should('contain', 'Bem-vindo')
        cy.get('[data-test="dashboard-createProfile"]').click()
        cy.get('.large').should('contain','Crie Seu Perfil')
        cy.get('[data-test="profile-submit"]').click()
        cy.get(':nth-child(1) > .form-text').should('contain', 'Nos dê uma ideia de onde você está em sua carreira')
        cy.get(':nth-child(5) > .form-text').should('contain', 'Use vírgula para separar os valores por favor (ex. Testes de Integração, Automação de Testes, Cypress, Testes Manuais)') 
    });
    // Tentativa de cadastro de perfil com todos campos vazios, exceto Status
    it('Campos obrigatórios de cadastro de perfil, valida Status', () => {    
        var varName = faker.name.firstName()
        var varEmail = faker.internet.email()
        var varPassword = faker.internet.password()
        cy.cadastrar(varName, varEmail,varPassword,varPassword)
        cy.get('[data-test="dashboard-welcome"]').should('contain', 'Bem-vindo')
        cy.get('[data-test="dashboard-createProfile"]').click()
        cy.get('.large').should('contain','Crie Seu Perfil')
        cy.get('#mui-component-select-status').click()
        //Seleção de status random
        cy.get('.MuiMenu-list li')
            .then(($li) => {
            const items = $li.toArray()
            return Cypress._.sample(items)
        }).click()
        cy.get('[data-test="profile-skills"] > .MuiInputBase-root > .MuiInputBase-input').type(faker.random.word() +', ' + faker.random.word() +', ' + faker.random.word() +', ' + faker.random.word())
        cy.get('[data-test="profile-submit"]').click()
        
    });
    // Tentativa de cadastro de perfil apenas campos obrigatórios preenchidos
    it('Campos obrigatórios de cadastro de perfil, valida Status e Conhecimentos', () => {    
        var varName = faker.name.firstName()
        var varEmail = faker.internet.email()
        var varPassword = faker.internet.password()
        cy.cadastrar(varName, varEmail,varPassword,varPassword)
        cy.get('[data-test="dashboard-welcome"]').should('contain', 'Bem-vindo')
        cy.get('[data-test="dashboard-createProfile"]').click()
        cy.get('.large').should('contain','Crie Seu Perfil')
        cy.get('#mui-component-select-status').click()
        //Seleção de status random
        cy.get('.MuiMenu-list li')
            .then(($li) => {
            const items = $li.toArray()
            return Cypress._.sample(items)
        }).click()
        cy.get('[data-test="profile-skills"] > .MuiInputBase-root > .MuiInputBase-input').type(faker.random.word() +', ' + faker.random.word() +', ' + faker.random.word() +', ' + faker.random.word())
        cy.get('[data-test="profile-submit"]').click()
        cy.get('[data-test="alert"]').should('contain', 'Perfil Criado')
        cy.get('.large').should('contain', 'Dashboard')
        cy.get('[data-test="dashboard-editProfile"]').should('contain', 'Editar Perfil')
        cy.get('[data-test="dashboard-addExperience"]').should('contain', 'Adicionar Experiência')
        cy.get('[href="/adicionar-formacao"]').should('contain', 'Adicionar Formação Acadêmica')
        cy.get('.container > :nth-child(5)').should('contain', 'Experiências')
        cy.get(':nth-child(6) > thead > tr > :nth-child(1)').should('contain', 'Empresa')
        cy.get(':nth-child(6) > thead > tr > :nth-child(2)').should('contain', 'Posição')
        cy.get(':nth-child(6) > thead > tr > :nth-child(3)').should('contain', 'Período')
        cy.get('.container > :nth-child(7)').should('contain', 'Formações Acadêmicas')
        cy.get(':nth-child(8) > thead > tr > :nth-child(1)').should('contain', 'Escola')
        cy.get(':nth-child(8) > thead > tr > :nth-child(2)').should('contain', 'Grau')
        cy.get(':nth-child(8) > thead > tr > :nth-child(3)').should('contain', 'Período')
        cy.get('[data-test="dashboard-deleteProfile"]').should('contain', 'Excluir Conta')
    });
     // Tentativa de cadastro de perfil apenas campos obrigatórios e um rede social preenchida
     it('Campos obrigatórios de cadastro de perfil, uma rede social', () => {    
        var varName = faker.name.firstName()
        var varEmail = faker.internet.email()
        var varPassword = faker.internet.password()
        cy.cadastrar(varName, varEmail,varPassword,varPassword)
        cy.get('[data-test="dashboard-welcome"]').should('contain', 'Bem-vindo')
        cy.get('[data-test="dashboard-createProfile"]').click()
        cy.get('.large').should('contain','Crie Seu Perfil')
        cy.get('#mui-component-select-status').click()
        //Seleção de status random
        cy.get('.MuiMenu-list li')
            .then(($li) => {
            const items = $li.toArray()
            return Cypress._.sample(items)
        }).click()
        cy.get('[data-test="profile-skills"] > .MuiInputBase-root > .MuiInputBase-input').type(faker.random.word() +', ' + faker.random.word() +', ' + faker.random.word() +', ' + faker.random.word())
        cy.get('[data-test="profile-socials"]').click()
        cy.get('[data-test="profile-linkedin"] > .MuiInputBase-root > .MuiInputBase-input').type(faker.internet.url())
        cy.get('[data-test="profile-submit"]').click()
        cy.get('[data-test="alert"]').should('contain', 'Perfil Criado')
        cy.get('.large').should('contain', 'Dashboard')
        cy.get('[data-test="dashboard-editProfile"]').should('contain', 'Editar Perfil')
        cy.get('[data-test="dashboard-addExperience"]').should('contain', 'Adicionar Experiência')
        cy.get('[href="/adicionar-formacao"]').should('contain', 'Adicionar Formação Acadêmica')
        cy.get('.container > :nth-child(5)').should('contain', 'Experiências')
        cy.get(':nth-child(6) > thead > tr > :nth-child(1)').should('contain', 'Empresa')
        cy.get(':nth-child(6) > thead > tr > :nth-child(2)').should('contain', 'Posição')
        cy.get(':nth-child(6) > thead > tr > :nth-child(3)').should('contain', 'Período')
        cy.get('.container > :nth-child(7)').should('contain', 'Formações Acadêmicas')
        cy.get(':nth-child(8) > thead > tr > :nth-child(1)').should('contain', 'Escola')
        cy.get(':nth-child(8) > thead > tr > :nth-child(2)').should('contain', 'Grau')
        cy.get(':nth-child(8) > thead > tr > :nth-child(3)').should('contain', 'Período')
        cy.get('[data-test="dashboard-deleteProfile"]').should('contain', 'Excluir Conta')
    });
    // Cancelamento de cadastro de perfil
    it('Cancelar cadastro de perfil', () => {    
        var varName = faker.name.firstName()
        var varEmail = faker.internet.email()
        var varPassword = faker.internet.password()
        cy.cadastrar(varName, varEmail,varPassword,varPassword)
        cy.get('[data-test="dashboard-welcome"]').should('contain', 'Bem-vindo')
        cy.get('[data-test="dashboard-createProfile"]').click()
        cy.get('.large').should('contain','Crie Seu Perfil')
        cy.get('[data-test="profile-dashboard"]').click()
        cy.get('.large').should('contain', 'Dashboard')
        cy.get('[data-test="dashboard-noProfile"]').should('contain', 'Você não tem um perfil criado, por favor adicione algumas informações')
        cy.get('[data-test="dashboard-createProfile"]').should('contain', 'Criar Perfil')
   });
});