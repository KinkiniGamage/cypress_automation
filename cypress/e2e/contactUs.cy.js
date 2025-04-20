import 'cypress-file-upload';

describe('Contact Us Page Test Suite', () => {
    let user;

    before(() => {
        cy.fixture('user').then((userData) => {
          user = {
            ...userData,
            email: Cypress.env('USER_EMAIL'),
            password: Cypress.env('USER_PASSWORD'),
          };
        });
      });
    
      beforeEach(() => {
        cy.visit('https://automationexercise.com/');
        cy.url().should('include', '/automationexercise');
      });

      it('should allow to send contact form', () => {
        cy.contains('a', 'Contact us').click();
        cy.url().should('include', '/contact_us');
        cy.contains('h2', 'Get In Touch').should('be.visible');
        cy.get('[data-qa="name"]').type(user.firstName);
        cy.get('[data-qa="email"]').type(user.email);
        cy.get('[data-qa="subject"]').type('This is the sybject');
        cy.get('[data-qa="message"]').type('This is going to be a standard size message.');
        // Add the file upload interaction here
        const fileName = 'TestFile.docx'; // Make sure this file exists in cypress/fixtures

        cy.fixture(fileName, 'base64').then((fileContent) => {
          cy.get('input[name="upload_file"]').attachFile({
            fileContent,
            fileName,
            mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            encoding: 'base64',
          });
        });
        
        cy.get('[data-qa="submit-button"]').click();
     });

});