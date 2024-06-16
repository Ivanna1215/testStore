
Cypress.Commands.add('login', (loginname, password) => {
    cy.log('Open home page');
    cy.visit('/');

    cy.log('Open account/login page');
    cy.get('#customer_menu_top').click();

    cy.log("Fill login form")
    cy.get('#loginFrm_loginname').type(loginname)
    cy.get('#loginFrm_password').type(password)
    cy.get('[title="Login"]').click()
})

// Cypress.Commands.overwrite('type', (originalFn, element, text) => {
//     originalFn(element, text)
//     return originalFn(element, text)
// })

// Cypress.Commands.overwrite('type', (originalFn, element, text, options) => {
//     // Викликаємо оригінальну функцію `type` для введення тексту
//     originalFn(element, text, options);

//     // Додаємо перевірку, що текст був введений правильно
//     cy.wrap(element).should('have.value', text);
// });
