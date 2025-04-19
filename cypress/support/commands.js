Cypress.Commands.add('UserLogin', (user) => { 
    cy.contains('a', 'Signup / Login').click()
    cy.url().should('include', '/login');
    cy.contains('h2', 'Login to your account').should('be.visible')
    cy.get('[data-qa="login-email"]').type(user.email)
    cy.get('[data-qa="login-password"]').type(user.password)
    cy.get('[data-qa="login-button"]').click()
    cy.url().should('include', '/automationexercise');
  })