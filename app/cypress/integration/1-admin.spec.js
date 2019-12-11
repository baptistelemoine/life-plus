describe("admin page", () => {
  it("should display the admin page", () => {
    cy.visit("/admin");
    cy.urlPathShouldEqual(`/admin`);
  });

  it("should create a new product", () => {
    cy.server();
    cy.route("POST", /products/).as("createProduct");
    cy.urlPathShouldEqual(`/admin`);
    cy.get("[data-test=admin-products-add-btn]").click();
    cy.get("[data-test=add-product-name]").type("Product from test");
    cy.get("[data-test=add-product-desc]").type(
      "This is a description for newly created product"
    );
    cy.get("[data-test=add-product-price]").type(12);
    cy.queryByText(/submit/i).click();
    cy.wait("@createProduct").then(response => {
      expect(response.status).to.eq(201);
    });
    cy.visit("/");
  });

  it("should have at least one product in shop", () => {
    cy.get("[data-test=shop-product-card]").should("exist");
  });
});
