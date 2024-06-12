describe('Outros possíveis cenários', () => {
  before(()=>{
    cy.visit('/');
  })

  function launchAndVerifyHomePage() {
    cy.get('body').should('be.visible');
    cy.get('header').should('be.visible');
    cy.contains('Home').should('be.visible');
  }

  it('1 - Verify Test Cases Page', () => {
    launchAndVerifyHomePage();

    cy.get('a[href="/test_cases"]').first().click();

    cy.contains('Test Cases').should('be.visible');

  });

  it('2 - Checking items for purchase', () => {
    launchAndVerifyHomePage();

    cy.get('div.features_items');
    cy.get('div.features_items').children().first();
    cy.get('div.features_items').children().last();//acessando filhos do elemento
    cy.get('div.features_items').children().eq(2);
  });

  it('3 - Add item to affection', () => {
    launchAndVerifyHomePage();

    cy.get('[data-product-id="2"]').contains('Add to cart').click();
    cy.get('[id="cartModal"]').contains('Added!');

    cy.get('button.close-modal', {timeout: 5000}).click();
  });

  it('4 - Verify product list', () => {
    cy.request('GET', 'https://automationexercise.com/api/productsList').should((response)=>{
      expect(response.status).to.be.eq(200);
      expect(response.body).not.to.be.empty;
      let body = JSON.parse(response.body);
      expect(body.products).to.be.an('array');
      expect(body.products).to.have.length.above(1);
    });
  });

  it('5 - Contact Us Form', () => {
    launchAndVerifyHomePage();

    cy.get('a[href="/contact_us"]').click();
    cy.contains('Get In Touch').should('be.visible');

    cy.get('input[data-qa="name"]').type('Nome Teste');
    cy.get('input[data-qa="email"]').type('teste@example.com');
    cy.get('input[data-qa="subject"]').type('Assunto Teste');
    cy.get('textarea[data-qa="message"]').type('Esta é uma mensagem de teste.');

    const filePath = 'teste.txt'; // Arquivo localizado em cypress/fixtures/teste.txt
    cy.get('input[type="file"]').attachFile(filePath);

    cy.get('input[data-qa="submit-button"]').click();

    cy.on('window:confirm', () => true);

    cy.contains('Success! Your details have been submitted successfully.').should('be.visible');
  });

  it.only('6 - Checking if items have been added to the cart', () => {
    launchAndVerifyHomePage();

    cy.get('a[href="/products"]').click();

    cy.url().should('include', '/products');
    cy.contains('All Products').should('be.visible');

    cy.get('[data-product-id="1"]').contains('Add to cart').click();
    cy.get('[id="cartModal"]').contains('Added!');

    cy.contains('Continue Shopping').click();

    cy.get('[data-product-id="2"]').contains('Add to cart').click();
    cy.get('[id="cartModal"]').contains('Added!');

    cy.contains('View Cart').click();

    cy.get('.cart_product').should('have.length', 2);
  });
  
})