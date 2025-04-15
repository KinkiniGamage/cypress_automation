describe('Login Page Test', () => {
    it('Visits the login page and checks the login flow', () => {
      cy.visit('https://automationexercise.com/'); 
      cy.url().should('include', '/automationexercise');
    });
  });