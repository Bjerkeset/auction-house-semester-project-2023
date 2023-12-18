describe("Registration Test", () => {
  it("Successfully registers a new user with a random email and name", () => {
    // Utility function to generate random strings
    const generateRandomString = (length) => {
      return Math.random().toString(20).substr(2, length);
    };

    // Generate random email and username
    const randomEmail = `testuser${generateRandomString(8)}@noroff.no`;
    const randomUsername = `TestUser${generateRandomString(10)}`;

    // Broaden the intercept pattern to catch all POST requests to /auth
    cy.intercept("POST", "**/auth").as("registerRequest");

    cy.visit("http://localhost:3000/auth");
    cy.contains("button", "Register").click();

    // Use generated random values
    cy.get('input[type="email"]').type(randomEmail);
    cy.get('input[type="name"]').type(randomUsername);
    cy.contains("button", "Next Step").click();
    cy.get('input[type="password"]').first().type("password123");
    cy.get('input[type="password"]').last().type("password123");
    cy.contains("button", "Submit").click();

    // Wait for the intercepted request and verify its properties
    cy.wait("@registerRequest").then((interception) => {
      cy.log("Interception:", interception);
      expect(interception.response.statusCode).to.eq(200);
      // Additional assertions as needed
    });

    cy.contains("Registration and login successful").should("be.visible");
  });
});

describe("Registration Duplicate Test", () => {
  it("Fails to register the same user twice", () => {
    // Credentials used in the first successful registration test
    const email = "testuser@noroff.no";
    const username = "TestUser";

    // Broaden the intercept pattern to catch all POST requests to /auth
    cy.intercept("POST", "**/auth").as("registerRequest");

    cy.visit("http://localhost:3000/auth");
    cy.contains("button", "Register").click();

    // Use the same email and username
    cy.get('input[type="email"]').type(email);
    cy.get('input[type="name"]').type(username);
    cy.contains("button", "Next Step").click();
    cy.get('input[type="password"]').first().type("password123");
    cy.get('input[type="password"]').last().type("password123");
    cy.contains("button", "Submit").click();

    // Wait for the intercepted request and verify its properties
    cy.wait("@registerRequest").then((interception) => {
      expect(interception.response.statusCode).not.to.eq(200);
    });

    // Add assertions here to check for duplicate registration error in the UI
    cy.contains("Profile already exists").should("be.visible");
  });
});
