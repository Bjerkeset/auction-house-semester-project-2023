describe("Search Test", () => {
  it("Successfully searches listings by title", () => {
    // Ignore specific errors
    Cypress.on("uncaught:exception", (err) => {
      // Add the error messages that you want to ignore
      const ignoredErrors = [
        "Hydration failed",
        "Server Functions cannot be called during initial render",
        "There was an error while hydrating this Suspense boundary. Switched to client rendering",
      ];

      // Check if the error message includes any of the ignored errors
      const shouldIgnoreError = ignoredErrors.some((ignoredError) =>
        err.message.includes(ignoredError)
      );

      // If the error is one of the ignored errors, prevent Cypress from failing the test
      return !shouldIgnoreError;
    });

    cy.visit("http://localhost:3000/listings/all");

    // Find and click the button that contains 'listings'
    // cy.contains('[data-cy="listings"]').click();

    // Now proceed with the rest of the test
    // Simulate CTRL + K to open search
    // Now proceed with the rest of the test
    // Simulate CTRL + K to open search
    cy.wait(5000);

    cy.get("body").type("{ctrl}k");

    cy.wait(1500);

    // Simulate pressing Escape to ensure any initial dialogues are closed
    cy.get("body").type("{esc}");

    // Click the search button
    cy.get('[data-cy="search-button"]').click();

    cy.wait(500);

    // Type 'venus' into the already focused input field
    cy.get("body").type("venus");
    cy.wait(1000);
    // Type 'venus' into the already focused input field

    // Take a screenshot for visual inspection
    // cy.screenshot();

    // Click the last visible item that contains "Venus Item"
    cy.get('[data-cy="search-item"]')
      .filter(":visible")
      // .contains("span[data-cy='search-item']")
      .last()
      .click();

    // Wait for the URL to change and use a regex to match 'venus' case-insensitively
    cy.url().should("match", /venus/i);
  });
});
