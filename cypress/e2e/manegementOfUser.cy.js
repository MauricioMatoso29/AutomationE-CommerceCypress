describe('Válidando cenários de cadastro/login/logout/delete de usuários', () => {
  before(()=>{
    cy.visit('/');
  })

  //Funções Auxiliares

  function launchAndVerifyHomePage() {
    cy.get('body').should('be.visible');
    cy.get('header').should('be.visible');
    cy.contains('Home').should('be.visible');
  }
  
  function RegisterUser(name, email) {
    cy.get('[href="/login"]').click();
    cy.contains('New User Signup!').should('be.visible');
    cy.get('input[name="name"]').type(name);
    cy.get('input[data-qa="signup-email"]').type(email);
    cy.get('button[data-qa="signup-button"]').click();
  }

  function loginUser(email, password) {
    cy.get('a[href="/login"]').click();
    cy.contains('Login to your account').should('be.visible');
    cy.get('input[data-qa="login-email"]').type(email);
    cy.get('input[data-qa="login-password"]').type(password);
    cy.get('button[data-qa="login-button"]').click();
  }

  function deleteAccount() {
    cy.contains('Delete Account').click();
    cy.contains('Your account has been permanently deleted!').should('be.visible');
    cy.contains('Continue').click();
  }

  //Cenários de teste

  it('1 - Register User', () => {
    launchAndVerifyHomePage();

    RegisterUser('Mauricio Pontes2','mauricio21421@example.com')
    cy.contains('Enter Account Information').should('be.visible');
    //preencher dados adicionais
    cy.get('#id_gender1').click();
    cy.get('#name').type('MAURICIO');
    cy.get('#password').type('mauricio12232');
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
    //Assert

    cy.contains('Congratulations! Your new account has been successfully created!', { timeout: 10000 }).should('be.visible')
      .then(() => {
        cy.log('Conta criada com sucesso!');
      });
  });

  it('2 - Cadastro de usuario já existente', () => {
    launchAndVerifyHomePage();//Arrange

    RegisterUser('Mauricio Pontes','mauricio2141@example.com')//Act

    cy.contains('Email Address already exist!').should('be.visible');//Assert

  });

  it('3 - Login User with correct email and password', () => {
    launchAndVerifyHomePage();

    loginUser('MAURICIOTESTE31@example.com','mauricio1223');

    cy.contains('Logged in as').should('be.visible');

  });

  it('4 - Login User with incorrect email and password', () => {
    launchAndVerifyHomePage();//Arrange

    loginUser('mauriinex@example.com','mauricio12');//Act

    cy.contains('Your email or password is incorrect!').should('be.visible');//Assert

  });

  it('5 - Login User and Delete', () => {
    launchAndVerifyHomePage();

    loginUser('MAURICIOTESTE31@example.com','mauricio1223');
    cy.contains('Logged in as').should('be.visible');

    deleteAccount();

  });

  it.only('6 - Logout User', () => {
    launchAndVerifyHomePage();

    loginUser('mauricio21421@example.com','mauricio12232');
    cy.contains('Logged in as').should('be.visible');

    cy.get('a[href="/logout"]').click();
    cy.contains('Login to your account').should('be.visible');

  });

})