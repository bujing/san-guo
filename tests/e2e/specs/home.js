// https://docs.cypress.io/api/introduction/api.html

describe('Home', () => {
  it('Home', () => {
    cy.visit('/')
    cy.contains('div', '首页')
  })
})
