// https://docs.cypress.io/api/introduction/api.html

describe('List', () => {
  it('List', () => {
    cy.visit('/list')
    cy.contains('div', '列表')
  })
})
