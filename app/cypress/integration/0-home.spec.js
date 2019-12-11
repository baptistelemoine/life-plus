describe("home page", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should display the home page and display nav buttons", () => {
    cy.urlPathShouldEqual(`/`);
    cy.queryByText(/admin/i).should("exist");
    cy.queryByText(/carts/i).should("exist");
  });

  it("should redirect to admin when clicking nav", () => {
    cy.queryByText(/admin/i)
      .should("exist")
      .click();
    cy.urlPathShouldEqual(`/admin`);
  });
});
