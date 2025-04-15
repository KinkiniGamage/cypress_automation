describe('Login Page Test', () => {

    beforeEach('Visits the home page', () => {
      cy.visit('https://automationexercise.com/'); 
      cy.url().should('include', '/automationexercise');

      
    });

    it('User Sign up as a new registration', () => {
      cy.contains('a', 'Signup / Login').click()
      cy.url().should('include', '/login');
      cy.contains('h2', 'New User Signup!').should('be.visible')
      cy.get('[data-qa="signup-name"]').type('Kinkini')
      cy.get('[data-qa="signup-email"]').type('kinkini3@mail.com')
      cy.get('[data-qa="signup-button"]').click()
      cy.url().should('include', '/signup');
      cy.contains('b' , 'Enter Account Information').should('be.visible')
      cy.get('#id_gender2').check()
      cy.get('[data-qa="name"]').should('have.value', 'Kinkini')
      cy.get('[data-qa="email"]').should('have.value', 'kinkini3@mail.com')
      cy.get('[data-qa="password"]').type('12345')
      cy.get('[data-qa="days"]').select('12')
      cy.get('[data-qa="months"]').select('March')
      cy.get('[data-qa="years"]').select('1992')
      cy.get('#newsletter').check()
      cy.get('#optin').check()
      cy.get('[data-qa="first_name"]').type('Kinkini')
      cy.get('[data-qa="last_name"]').type('Gamage')
      cy.get('[data-qa="company"]').type('Pearson')
      cy.get('[data-qa="address"]').type('22, Settlement Road, Bundoora')
      cy.get('[data-qa="country"]').select('Australia')
      cy.get('[data-qa="state"]').type('Victoria')
      cy.get('[data-qa="city"]').type('Melbourne')
      cy.get('[data-qa="zipcode"]').type('5000')
      cy.get('[data-qa="mobile_number"]').type('0477111111')
      cy.get('[data-qa="create-account"]').click()
      cy.url().should('include', '/account_created');
      cy.contains('b', 'Account Created!').should('be.visible')
      cy.contains('p', 'Congratulations! Your new account has been successfully created!').should('be.visible')
      cy.contains('p', 'You can now take advantage of member privileges to enhance your online shopping experience with us.').should('be.visible')
      cy.get('[data-qa="continue-button"]').click()
      cy.url().should('include', '/automationexercise');
    });

    Cypress.Commands.add('UserLogin', () => { 
      cy.contains('a', 'Signup / Login').click()
      cy.url().should('include', '/login');
      cy.contains('h2', 'Login to your account').should('be.visible')
      cy.get('[data-qa="login-email"]').type('kinkini3@mail.com')
      cy.get('[data-qa="login-password"]').type('12345')
      cy.get('[data-qa="login-button"]').click()
      cy.url().should('include', '/automationexercise');
    
    })

    it('UserLogout', () => { 
      cy.UserLogin()
      cy.url().should('include', '/automationexercise');
      cy.contains('a', 'Logout').click()
      cy.url().should('include', '/login');
    })

    it('Delete User', () => {
      cy.UserLogin()
      cy.contains('a', 'Delete Account').click()
      cy.url().should('include', '/delete_account');
      cy.contains('b', 'Account Deleted!').should('be.visible')
      cy.contains('p', 'Your account has been permanently deleted!').should('be.visible')
      cy.contains('p', 'You can create new account to take advantage of member privileges to enhance your online shopping experience with us.').should('be.visible')
      cy.get('[data-qa="continue-button"]').click()
      cy.url().should('include', '/automationexercise');
      
    });
  });

  