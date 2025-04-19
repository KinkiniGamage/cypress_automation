Cypress.Commands.add('UserLogin', (apple) => { 
    cy.contains('a', 'Signup / Login').click()
    cy.url().should('include', '/login');
    cy.contains('h2', 'Login to your account').should('be.visible')
    cy.get('[data-qa="login-email"]').type(apple.email)
    cy.get('[data-qa="login-password"]').type(apple.password)
    cy.get('[data-qa="login-button"]').click()
    cy.url().should('include', '/automationexercise');
  })