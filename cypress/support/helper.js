export function login(loginname, password) {
    cy.log('Open home page');
    cy.visit('/');

    cy.log('Open account/login page');
    cy.get('#customer_menu_top').click();

    cy.log("Fill login form")
    cy.get('#loginFrm_loginname').type(loginname)
    cy.get('#loginFrm_password').type(password)
    cy.get('[title="Login"]').click()
}

