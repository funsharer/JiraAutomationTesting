describe('Issue time tracking', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {
      cy.visit(url + '/board');
      cy.contains('This is an issue of type: Task.').click();
    });
  });

  it('Should add estimation to issue', () => {
    // Adding time tracking and estimation
    cy.get('input[placeholder="Number"]').clear().type(10);
    cy.get('[data-testid="icon:stopwatch"]').click();
    cy.get('[data-testid="modal:tracking"]', { timeout: 10000 }).within(() => {
      // Select the first input with placeholder "Number", clear it, and type '20'
      cy.get('input[placeholder="Number"]').filter(':first')
        .should('exist')
        .should('be.visible')
        .clear()
        .type('20');

      // Additional check for value
      cy.get('input[placeholder="Number"]').filter(':first')
        .should('have.value', '20');

      // Select the last input with placeholder "Number", clear it, and type '10'
      cy.get('input[placeholder="Number"]').filter(':last')
        .clear()
        .type('10');

      // Click the 'Done' button
      cy.contains('button', 'Done').click();
    });
  });

  it('Should remove Logged time', () => {
    cy.get('[data-testid="icon:stopwatch"]').click();
    cy.get('[data-testid="modal:tracking"]').within(() => {
      // Select the first input with placeholder "Number" containing '20', clear it
      cy.get('input[placeholder="Number"]').filter(':first')
        .should('exist')
        .should('be.visible')
        .should('have.value', '20')
        .clear();

      // Ensure the input is empty after clearing
      cy.get('input[placeholder="Number"]').filter(':first')
        .should('have.value', '')
        .should('exist')
        .should('be.visible')
        .clear();

      // Select the last input with placeholder "Number" containing '10', clear it
      cy.get('input[placeholder="Number"]').filter(':last')
        .should('exist')
        .should('be.visible')
        .should('have.value', '10')
        .clear();

      // Ensure the input is empty after clearing
      cy.get('input[placeholder="Number"]').filter(':last')
        .should('have.value', '')
        .should('exist')
        .should('be.visible');

      // Click the 'Done' button
      cy.contains('button', 'Done').click();
    });
  });
});