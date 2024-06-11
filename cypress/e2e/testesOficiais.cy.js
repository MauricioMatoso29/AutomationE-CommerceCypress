describe('Aprendendo conceitos cypress', () => {
  before(()=>{
    cy.visit('/');
  })

  it('1 - Register User', () => {
    cy.get('body').should('be.visible');
    cy.get('header').should('be.visible');
    cy.contains('Home').should('be.visible');

    cy.get('[href="/login"]').click();

    cy.contains('New User Signup!').should('be.visible');

    cy.get('input[name="name"]').type('Nome Teste13');
    cy.get('input[data-qa="signup-email"]').type('teste13@example.com');

    cy.get('button[data-qa="signup-button"]').click();

    cy.contains('Enter Account Information').should('be.visible');

    cy.get('#id_gender1').click();
    cy.get('#name').type('Nome Teste');
    cy.get('#password').type('11223344');
    cy.get('#days').select('10');
    cy.get('#months').select('May');
    cy.get('#years').select('1990');

    cy.get('#newsletter').check();

    cy.get('#optin').check();

    cy.get('#first_name').type('Nome');
    cy.get('#last_name').type('Sobrenome');
    cy.get('#company').type('Empresa Teste');
    cy.get('#address1').type('Endereço 1 Teste');
    cy.get('#address2').type('Endereço 2 Teste');
    cy.get('#country').select('United States');
    cy.get('#state').type('Estado Teste');
    cy.get('#city').type('Cidade Teste');
    cy.get('#zipcode').type('12345');
    cy.get('#mobile_number').type('11987654321');

    cy.get('button[data-qa="create-account"]').click();

    cy.get('body').then(($body) => {
      cy.log($body.text());
    });

    cy.contains('Congratulations! Your new account has been successfully created!', { timeout: 10000 }).should('be.visible') // Aumenta o tempo de espera para 10 segundos
      .then(() => {
        cy.log('Conta criada com sucesso!');
      });
  });

  it.only('2 - Register User AND Delete', () => {
    cy.get('body').should('be.visible');
    cy.get('header').should('be.visible');
    cy.contains('Home').should('be.visible');

    cy.get('[href="/login"]').click();

    cy.contains('New User Signup!').should('be.visible');

    cy.get('input[name="name"]').type('Nome Teste20');
    cy.get('input[data-qa="signup-email"]').type('teste20@example.com');

    cy.get('button[data-qa="signup-button"]').click();

    cy.contains('Enter Account Information').should('be.visible');

    cy.get('#id_gender1').click();
    cy.get('#name').type('Nome Teste');
    cy.get('#password').type('11223344');
    cy.get('#days').select('10');
    cy.get('#months').select('May');
    cy.get('#years').select('1990');

    cy.get('#newsletter').check();

    cy.get('#optin').check();

    cy.get('#first_name').type('Nome');
    cy.get('#last_name').type('Sobrenome');
    cy.get('#company').type('Empresa Teste');
    cy.get('#address1').type('Endereço 1 Teste');
    cy.get('#address2').type('Endereço 2 Teste');
    cy.get('#country').select('United States');
    cy.get('#state').type('Estado Teste');
    cy.get('#city').type('Cidade Teste');
    cy.get('#zipcode').type('12345');
    cy.get('#mobile_number').type('11987654321');

    cy.get('button[data-qa="create-account"]').click();

    cy.get('body').then(($body) => {
      cy.log($body.text());
    });

    cy.contains('Congratulations! Your new account has been successfully created!').should('be.visible')

    cy.contains('Continue').click();

    cy.contains('Logged in as').should('be.visible');

    cy.contains('Delete Account').click();

    cy.contains('Your account has been permanently deleted!').should('be.visible');

    cy.contains('Continue').click();
    
  });

})