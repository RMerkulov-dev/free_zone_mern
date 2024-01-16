describe('Login/Register form test', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('register user', () => {
    cy.get('[data-test=login_or_register]').as('choose-login-link').should('exist');
    cy.get('@choose-login-link').click();
    cy.get('[data-test=firstName-input]').as('firstName').should('exist');
    cy.get('@firstName').type('Roman');
    cy.get('[data-test=lastName-input]').as('lastName').should('exist');
    cy.get('@lastName').type('Merkulov');
    cy.get('[data-test=location-input]').as('location').should('exist');
    cy.get('@location').type('Odessa');
    cy.get('[data-test=occupation-input]').as('occupation').should('exist');
    cy.get('@occupation').type('Developer');
    cy.get('[data-test=dropzone]').should('exist').click();
    cy.get('[data-test=dropzone]').selectFile('cypress/fixtures/avatar.jpg', {
      action: 'drag-drop',
    });
    cy.get('[data-test=dropzone').submit();
    cy.get('[data-test=email-input]').as('email').should('exist');
    cy.get('@email').type('fotoromario@gmail.com');
    cy.get('[data-test=password-input]').as('password').should('exist');
    cy.get('@password').type('12345');
    cy.get('[data-test=button-submit').as('submit-btn').should('exist').click();
    cy.get('[data-test=submit-form').submit();

    cy.get('@email').type('fotoromario@gmail.com');
    cy.get('@password').type('12345');
    cy.get('[data-test=button-submit').as('submit-btn').should('exist').click();
    cy.get('[data-test=submit-form').submit();
  });
});
