import user from '../fixtures/user.json';
import { faker } from '@faker-js/faker';

describe('Registration test suite', () => {

  it('Registration with valid data', () => {

    user.firstname = faker.internet.userName();
    user.email = faker.internet.email();
    user.fax = '12345566';
    user.address1 = faker.location.streetAddress();
    user.address1 = faker.location.secondaryAddress();
    user.address2 = faker.location.zipCode();
    user.telephone = faker.phone.number();

    cy.log('Open home page');
    cy.visit('/');

    cy.log('Open login page');
    cy.get('#customer_menu_top').click();

    cy.log('Open account/create page');
    cy.get('[title="Continue"]').click();

    cy.log('Fill in the form');
    cy.get('#AccountFrm_firstname').type(user.firstname);
    cy.get('#AccountFrm_lastname').type(user.lastname);
    cy.get('#AccountFrm_email').type(user.email);
    cy.get('#AccountFrm_telephone').type(user.telephone);
    cy.get('#AccountFrm_fax').type(user.fax);
    cy.get('#AccountFrm_company').type(user.company);
    cy.get('#AccountFrm_address_1').type(user.address1)
    cy.get('#AccountFrm_address_2').type(user.address2)
    cy.get('#AccountFrm_city').type(user.city)
    cy.get('#AccountFrm_country_id').select(user.country)
    cy.get('#AccountFrm_zone_id').select(user.zone)
    cy.get('#AccountFrm_postcode').type(user.postcode)
    cy.get('#AccountFrm_loginname').type(user.loginname)
    cy.get('#AccountFrm_password').type(user.password)
    cy.get('#AccountFrm_confirm').type(user.password)

    cy.log('Submit the form');

    cy.get('#AccountFrm_newsletter1').click()

    cy.get('#AccountFrm_agree').check()
    cy.get('[title="Continue"]').click()

    cy.log('Verify registration')

    cy.get('.maintext').should('contain', 'Your Account Has Been Created!')
    cy.get('[title="Continue"]').click()
    cy.get('.subtext').should('contain', user.firstname)

  })



})