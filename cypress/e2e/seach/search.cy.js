describe("Search Test", () => {
  it("Successfully searches listings by title", () => {
    // Ignore hydration errors
    Cypress.on("uncaught:exception", (err) => {
      if (err.message.includes("Hydration failed")) {
        return false; // returning false here prevents Cypress from failing the test
      }
      return true; // Throw error for any other exceptions
    });

    cy.visit("http://localhost:3000/auth");

    // Find and click the button that contains 'listings'
    cy.contains('[data-cy="listings"]').click();

    // Now proceed with the rest of the test
    // Simulate CTRL + K to open search
    cy.get("body").type("{ctrl}k");

    // Simulate pressing Escape to ensure any initial dialogues are closed
    cy.get("body").type("{esc}");

    // Click the search button
    cy.contains("Search By Title").click();

    // Simulate typing into the search box and pressing Enter
    // Assuming you have a test item with title 'Test Item'
    cy.get('input[type="search"]').type("Test Item{enter}");

    // Click the first item in the list
    // Adjust the selector based on your actual DOM structure
    cy.get(".command-list .command-item").first().click();

    // Verify that the page contains the item
    // Adjust the verification step based on what you expect to see
    cy.url().should("include", "/listings/Test-Item");
    cy.contains("Test Item").should("be.visible");
  });
});
