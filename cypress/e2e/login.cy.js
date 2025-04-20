describe('Login Page Test Suite', () => {
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

  function fillSignupForm(user) {
    cy.contains('b', 'Enter Account Information').should('be.visible');
    cy.get('#id_gender2').check();
    cy.get('[data-qa="name"]').should('have.value', user.firstName);
    cy.get('[data-qa="email"]').should('have.value', user.email);
    cy.get('[data-qa="password"]').type(user.password);
    cy.get('[data-qa="days"]').select('12');
    cy.get('[data-qa="months"]').select('March');
    cy.get('[data-qa="years"]').select('1992');
    cy.get('#newsletter').check();
    cy.get('#optin').check();
    cy.get('[data-qa="first_name"]').type(user.firstName);
    cy.get('[data-qa="last_name"]').type(user.lastName);
    cy.get('[data-qa="company"]').type(user.company);
    cy.get('[data-qa="address"]').type(user.address);
    cy.get('[data-qa="country"]').select(user.country);
    cy.get('[data-qa="state"]').type(user.state);
    cy.get('[data-qa="city"]').type(user.city);
    cy.get('[data-qa="zipcode"]').type(user.zip);
    cy.get('[data-qa="mobile_number"]').type(user.mobile);
  }

  it('should allow user to register a new account', () => {
    cy.contains('a', 'Signup / Login').click();
    cy.url().should('include', '/login');
    cy.contains('h2', 'New User Signup!').should('be.visible');
    cy.get('[data-qa="signup-name"]').type(user.firstName);
    cy.get('[data-qa="signup-email"]').type(user.email);
    cy.get('[data-qa="signup-button"]').click();
    cy.url().should('include', '/signup');
    fillSignupForm(user);
    cy.get('[data-qa="create-account"]').click();
    cy.url().should('include', '/account_created');
    cy.contains('b', 'Account Created!').should('be.visible');
    cy.contains('p', 'Congratulations! Your new account has been successfully created!').should('be.visible');
    cy.get('[data-qa="continue-button"]').click();
    cy.url().should('include', '/automationexercise');
  });

  it('should allow user to log out', () => {
    cy.UserLogin(user);
    cy.contains('a', 'Logout').click();
    cy.url().should('include', '/login');
  });

  it('should not allow login with incorrect credentials', () => {
    cy.contains('a', 'Signup / Login').click();
    cy.url().should('include', '/login');
    cy.contains('h2', 'Login to your account').should('be.visible');
    cy.get('[data-qa="login-email"]').type(user.email);
    cy.get('[data-qa="login-password"]').type('incorrectPassword123');
    cy.get('[data-qa="login-button"]').click();
    cy.contains('p', 'Your email or password is incorrect!').should('be.visible');
  });

  it('should delete user account successfully', () => {
    cy.UserLogin(user);
    cy.contains('a', 'Delete Account').click();
    cy.url().should('include', '/delete_account');
    cy.contains('b', 'Account Deleted!').should('be.visible');
    cy.get('[data-qa="continue-button"]').click();
    cy.url().should('include', '/automationexercise');
  });
});