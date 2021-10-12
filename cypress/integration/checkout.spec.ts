describe('Order page', function () {
  it('allows creating an order from a menu', function () {
    // Go to order page
    cy.visit('/');

    // Verify that the correct title is rendered
    cy.contains('Our Menu');

    // Add 4 menu items to the order
    cy.get('[data-testid="menu-item"]').contains('Avocado Toast').click();
    cy.get('[data-testid="menu-item"]').contains('Margherita Pizza').click();
    cy.get('[data-testid="menu-item"]').contains('Four Cheese Pasta').click();
    cy.get('[data-testid="menu-item"]').contains('Tiramisu').click();

    // Delete "Four Cheese Pasta" from the order
    cy.get('[data-testid="order-items"]')
      .contains('Four Cheese Pasta')
      .parent()
      .find('[data-testid="delete-button"]')
      .click();

    // Verify that there are 3 items left
    cy.get('[data-testid="order-items"] > tbody > tr').should('have.length', 3);

    // Click on Checkout button
    cy.contains('Checkout').click();

    // Verify that we are on the checkout page
    cy.get('h1').contains('Checkout');
  });
});
