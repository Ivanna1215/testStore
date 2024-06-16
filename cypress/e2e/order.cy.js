import user from '../fixtures/user.json';
import { faker } from '@faker-js/faker';
import { login } from '../support/helper'

beforeEach(() => {
    // cy.login(user.loginname,user.password);
    login(user.loginname, user.password);

    // cy.log('Verify shopping cart')

    cy.get('.cart_total').click()
    cy.get('.cart_total').eq(0).then(($span) => {
        const text = $span.text().trim().replace('$', '').replace('.00', '');
        const value = parseFloat(text);

        if (value >= 1) {
            cy.get('#top_cart_product_list').click({force:true})
            cy.log('Delete products from shopping cart')
            cy.get('.btn.btn-sm.btn-default').click()
            cy.get('.contentpanel').should('contain', 'Your shopping cart is empty!')
        } else if (value === 0) {
            cy.log('Value is 0, Your shopping cart is empty!');
        }
    })

    cy.visit('/')
})

it('Place order from the main page', () => {
    let productPrice;
    let productQuantity;
    cy.log("Fill login form")
  
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

        cy.get('#cart_quantity50').should('have.value', '1')

        cy.get('#totals_table td').eq(3).should('contain', '$2.00')
        cy.get('#totals_table td').eq(5).should('contain', productPrice * productQuantity + 2)

        cy.log('Delete products from shopping cart')
        cy.get('.btn.btn-sm.btn-default').click()
        cy.get('.contentpanel').should('contain', 'Your shopping cart is empty!')
    })

    // cy.get('#cart_checkout1').click()
    // cy.get('#checkout_btn').click()
    // cy.get('.maintext')
    //     .should('contain', 'Your Order Has Been Processed!')
    // .contains('Your Order Has Been Processed!').should('be.visible')

})

