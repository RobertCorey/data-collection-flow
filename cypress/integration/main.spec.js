/// <reference types="cypress" />

context("Main", () => {
  it("foobar", () => {
    cy.visit("http://localhost:3000");
    cy.get(".App > button").click();
    cy.contains("Add Car").click();
    cy.contains("Add Car").click();
    cy.contains("Finish").click();
    cy.contains("Complete");
  });
});
