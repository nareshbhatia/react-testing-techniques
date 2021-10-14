const address = {
  firstName: 'John',
  lastName: 'Smith',
  address: '100 Federal Street',
  city: 'Boston',
  state: 'MA',
  zip: '02110',
};

describe('Checkout workflow', function () {
  it('allows user to place an order', function () {
    // Go to the home page
    cy.visit('/');

    // Add 4 items to the cart
    cy.get('[data-testid="product"]').contains('iMac').click();
    cy.get('[data-testid="product"]').contains('MacBook Pro').click();
    cy.get('[data-testid="product"]').contains('iPad').click();
    cy.get('[data-testid="product"]').contains('Google Home Mini').click();

    // Verify that there are 4 items in the cart
    cy.get('[data-testid="order-items"] > tbody > tr').should('have.length', 4);

    // Delete "MacBook Pro" from the cart
    cy.get('[data-testid="order-items"]')
      .contains('MacBook Pro')
      .parent()
      .find('[data-testid="delete-button"]')
      .click();

    // Verify that there are 3 items left
    cy.get('[data-testid="order-items"] > tbody > tr').should('have.length', 3);

    // Click on Checkout button
    cy.contains('Checkout').click();

    // Verify that we are on the checkout page
    cy.contains('Place your order');

    // Fill in the address
    cy.get('input[name="shippingAddress.firstName"]').type(address.firstName);
    cy.get('input[name="shippingAddress.lastName"]').type(address.lastName);
    cy.get('input[name="shippingAddress.address"]').type(address.address);
    cy.get('input[name="shippingAddress.city"]').type(address.city);
    cy.get('input[name="shippingAddress.state"]').type(address.state);
    cy.get('input[name="shippingAddress.zip"]').type(address.zip);

    // Place the order
    cy.contains('Place your order').click();

    // Make sure order appears in the orders page, total should be 1,577.00
    cy.contains('John Smith');
    cy.contains('1,577.00');
  });
});
