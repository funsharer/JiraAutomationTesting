import { faker } from '@faker-js/faker';

describe('Issue create', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {
      
      cy.visit(url + '/board?modal-issue-create=true');
    });
  });

  it('Should create an issue and validate it successfully', () => {
    
    cy.get('[data-testid="modal:issue-create"]').within(() => {

      cy.get('.ql-editor').type('My bug description');
      cy.get('input[name="title"]').type('Bug');

      cy.get('[data-testid="select:type"]').click();
      cy.get('[data-testid="select-option:Bug"]')
        .trigger('click');

      cy.get('[data-testid="select:reporterId"]').click();
      cy.get('[data-testid="select-option:Pickle Rick"]').click();

      cy.get('[data-testid="select:priority"]').click();
      cy.get('[data-testid="select-option:Highest"]').click();

      cy.get('button[type="submit"]').click();
    });

    
    cy.get('[data-testid="modal:issue-create"]').should('not.exist');
    cy.contains('Issue has been successfully created.').should('be.visible');

    
    cy.reload();
    cy.contains('Issue has been successfully created.').should('not.exist');

    
    cy.get('[data-testid="board-list:backlog').should('be.visible').and('have.length', '1').within(() => {
      
      cy.get('[data-testid="list-issue"]')
        .should('have.length', '5')
        .first()
        .find('p')
        .contains('Bug');
      
      cy.get('[data-testid="icon:bug"]').should('be.visible');
    });
  });

  it('Should validate title is required field if missing', () => {
    
    cy.get('[data-testid="modal:issue-create"]').within(() => {
     
      cy.get('button[type="submit"]').click();

      
      cy.get('[data-testid="form-field:title"]').should('contain', 'This field is required');
    });
  });

  
  it('Should create an issue and validate it successfully', () => {

    const Description = faker.lorem.paragraph();
    const randomTitle = faker.lorem.sentence();

    cy.get('[data-testid="modal:issue-create"]').within(() => {

      cy.get('.ql-editor').type(Description);
      cy.get('input[name="title"]').type(randomTitle);

      cy.get('[data-testid="select:type"]').click();
      cy.get('[data-testid="icon:task"]')
        .trigger('click');

      cy.get('[data-testid="select:reporterId"]').click();
      cy.get('[data-testid="select-option:Baby Yoda"]').click();

      cy.get('[data-testid="select:priority"]').click();
      cy.get('[data-testid="select-option:Low"]').click();

      cy.get('button[type="submit"]').click();
    });

    
    cy.get('[data-testid="modal:issue-create"]').should('not.exist');
    cy.contains('Issue has been successfully created.').should('be.visible');

    
    cy.reload();
    cy.contains('Issue has been successfully created.').should('not.exist');

    
    cy.get('[data-testid="board-list:backlog').should('be.visible').and('have.length', '1').within(() => {
      
      cy.get('[data-testid="list-issue"]')
        .should('have.length', '5')
        .first()
        .find('p')
        .contains(randomTitle);
      
      cy.get('[data-testid="icon:task"]').should('be.visible');
    });
  });

});