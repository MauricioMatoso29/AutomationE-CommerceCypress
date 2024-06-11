describe('Aprendendo conceitos cypress', () => {
  before(()=>{
    cy.visit('/');
  })

  it('1 - Acessando home da pagina Automation Exercise', () => {
    cy.contains('Automation');
    cy.get('div.features_items');
  });

  it.only('2 - Verificando itens para compra', () => {
    cy.get('div.features_items');
    cy.get('div.features_items').children().first();
    cy.get('div.features_items').children().last();//acessando filhos do elemento
    cy.get('div.features_items').children().eq(2);
  });

  it('3 - Validando login com usuario e senha invalidos', () => {
    cy.get('div.shop-menu').contains('Login').click();

    cy.contains('Login to your account');

    cy.get('[data-qa="login-email"]')
      .type('teste@gmail.com')
      .should('be.visible')
      .and('have.attr','placeholder','Email Address')
      .and('have.prop','required');

    cy.get('[data-qa="login-password"]').type('123456').should('have.value', '123456');

    cy.get('[data-qa="login-button"]').contains('Login').click();

    cy.contains('Your email or password is incorrect!');

  });

  it('4 - Colocar item no carinho', () => {
    cy.get('[data-product-id="2"]').contains('Add to cart').click();

    cy.get('[id="cartModal"]').contains('Added!');

    cy.get('button.close-modal', {timeout: 5000}).click();
  });

  it('5 - Usando o intercept para acessar tela', () => {
    cy.intercept('GET', 'products');
    cy.get('.navbar-nav').contains('Products').click();

  });

  it('6 - Get produtos usando intercept', () => {
    cy.request('GET', 'https://automationexercise.com/api/productsList').should((response)=>{
      expect(response.status).to.be.eq(200);
      expect(response.body).not.to.be.empty;
      let body = JSON.parse(response.body);
      expect(body.products).to.be.an('array');
      expect(body.products).to.have.length.above(1);
    });
  });
  
})