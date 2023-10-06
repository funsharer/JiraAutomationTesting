
describe('Issue comments creating, editing and deleting', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {
            cy.visit(url + '/board');
            cy.contains('This is an issue of type: Task.').click();
        });
    });

    const getIssueDetailsModal = () => cy.get('[data-testid="modal:issue-details"]');

    it('should add a new comment, edit, and delete', () => {
        const comment = 'TEST_COMMENT';
        const editedComment = 'EDITED_COMMENT';

        // Add a new comment
        getIssueDetailsModal().within(() => {
            cy.contains('Add a comment...')
                .click();

            cy.get('textarea[placeholder="Add a comment..."]').type(comment);

            cy.contains('button', 'Save')
                .click()
                .should('not.exist');

                
            cy.get('[data-testid="issue-comment"]').should('contain', comment);
        });

        // Verify that the comment is added
        getIssueDetailsModal().within(() => {
            cy.get('[data-testid="issue-comment"]')
            .first()
            .contains('Edit')
            .click()
            .should('not.exist');

            cy.get('textarea[placeholder="Add a comment..."]')
            .should('contain', comment)
            .clear()
            .type(editedComment);
            
            cy.contains('button', 'Save')
            .click()
            .should('not.exist');

        cy.get('[data-testid="issue-comment"]')
            .should('contain', 'Edit')
            .and('contain', editedComment);
        });

        // Verify that the Save button is not present
        cy.contains('button', 'Save').should('not.exist');

        // Verify that the comment has been edited
        getIssueDetailsModal().within(() => {
            cy.get('[data-testid="issue-comment"]')
            .should('contain', editedComment);

        });
       
        getIssueDetailsModal()
        cy.get('[data-testid="issue-comment"]')
        .contains('Delete')
        .click();

    cy.get('[data-testid="modal:confirm"]')
        .contains('button', 'Delete comment')
        .click();

    // Ensure that the modal is closed
    cy.get('[data-testid="modal:confirm"]').should('not.exist');

    // Ensure that the comment is deleted
    getIssueDetailsModal()
        cy.get('[data-testid="issue-comment"]')
        .should('not.contain', editedComment);

        });
    });
