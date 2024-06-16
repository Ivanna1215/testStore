import user from '../fixtures/user.json';
import { faker } from '@faker-js/faker';
import { login } from '../support/helper'

beforeEach(() => {
    // cy.login(user.loginname,user.password);
    login(user.loginname, user.password);

});

it('Place order from the main page', () => {
    let productPrice;
    let productQuantity;
    cy.log("Fill login form")
    cy.visit('/')
    cy.get('.prdocutname').first().click()
    cy.get('.productfilneprice').then((price) => {

        // productPrice has value '\n\t\t\t\t\t\t\t\t\t$29.50\t\t\t\t\t\t\t\t'
        // line bellow removes all /n/t  charters from the string and keep only 29.50
        productPrice = price.text().replace(/[\n/t]/g, '').replace('$', '')
        cy.log(productPrice)

    })
    cy.get('#product_quantity').then((quantity) => {
        productQuantity = quantity.val().replace(/[\n/t]/g, '').replace('$', '')
        cy.log(productQuantity)
        cy.log(productPrice)

        cy.get('.productpagecart').click()
        cy.get('#totals_table td').eq(1).should('contain', productPrice * productQuantity)
        cy.get('#totals_table td').eq(3).should('contain', '$2.00')
        cy.get('#totals_table td').eq(5).should('contain', productPrice * productQuantity + 2)
    })

    // cy.get('#cart_checkout1').click()
    // cy.get('#checkout_btn').click()
    // cy.get('.maintext')
    //     .should('contain', 'Your Order Has Been Processed!')
    // .contains('Your Order Has Been Processed!').should('be.visible')

})

