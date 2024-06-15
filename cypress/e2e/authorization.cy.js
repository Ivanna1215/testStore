import user from '../fixtures/user.json';
import { faker } from '@faker-js/faker';

beforeEach(() => {
    cy.log('Open home page');
    cy.visit('/');

    cy.log('Open account/login page');
    cy.get('#customer_menu_top').click();

});

it('Successfull authorization', () => {
    cy.log("Fill login form")
    cy.get('#loginFrm_loginname').type(user.loginname)
    cy.get('#loginFrm_password').type(user.password)
    cy.get('[title="Login"]').click()
})

describe('Negative authorization test suite', () => {

    afterEach(()=>{
        cy.get('[title="Login"]').click()
        cy.log('Verify error message');
        cy.get('.alert.alert-error.alert-danger').should('have.text', `\n×\nError: Incorrect login or password provided.`);
    })

    it('User cannot login with incorect loginname', () => {
        user.loginname = faker.internet.userName();
        cy.log("Fill login form")
        cy.get('#loginFrm_loginname').type(user.loginname)
        cy.get('#loginFrm_password').type(user.password);
    })

    it('User cannot login with empty loginname', () => {
        cy.log("Fill login form")
        cy.get('#loginFrm_password').type(user.password);
    })

    it('User cannot login with incorect password', () => {
        user.password = faker.internet.password();

        cy.log("Fill login form")
        cy.get('#loginFrm_loginname').type(user.loginname)
        cy.get('#loginFrm_password').type(user.password);
    })

    it('User cannot login with empty password', () => {
        cy.log("Fill login form")
        cy.get('#loginFrm_loginname').type(user.loginname);
    })


})