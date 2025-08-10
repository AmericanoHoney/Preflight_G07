describe("Frontend - Product Storage App", () => {
  // Force correct URLs regardless of environment variables
  const frontendUrl = "http://localhost:6007";
  const backendUrl = "http://localhost:3000";

  beforeEach(() => {
    // Clear any existing products before each test
    cy.request({
      method: "DELETE",
      url: `${backendUrl}/stock/all`,
      failOnStatusCode: false,
    });
  });

  describe("Page Loading and Basic UI", () => {
    it("should load the main page successfully", () => {
      cy.visit(frontendUrl);

      // Check main heading
      cy.contains("🏪 Product Storage").should("be.visible");
      cy.contains("จัดการคลังสินค้าของฉัน").should("be.visible");

      // Check page structure
      cy.get('[class*="bg-gray-700"]', { timeout: 8000 }).should("exist");
      cy.get('[class*="rounded-2xl"]').should("exist");
    });

    it("should display loading state initially", () => {
      cy.visit(frontendUrl);

      // Should show loading text briefly
      cy.contains("Loading products...", { timeout: 1000 }).should("exist");
    });
  });

  describe("Empty State", () => {
    it("should show empty state when no products exist", () => {
      cy.visit(frontendUrl);

      // Wait for loading to complete
      cy.contains("Loading products...").should("not.exist");

      // Should show empty state message
      cy.contains("No products yet.").should("be.visible");
    });
  });

  describe("Product List Functionality", () => {
    beforeEach(() => {
      // Add some test products
      const testProducts = [
        {
          title: "Test Product 1",
          category: "Electronics",
          amount: 10,
          productid: "TEST001",
        },
        {
          title: "Test Product 2",
          category: "Books",
          amount: 5,
          productid: "TEST002",
        },
      ];

      testProducts.forEach((product) => {
        cy.request({
          method: "PUT",
          url: `${backendUrl}/stock`,
          body: product,
        });
      });
    });

    it("should display products when they exist", () => {
      cy.visit(frontendUrl);

      // Wait for loading to complete
      cy.contains("Loading products...").should("not.exist");

      // Should not show empty state
      cy.contains("No products yet.").should("not.exist");

      // Should show product grid
      cy.get('[class*="grid"]').should("exist");

      // Should show test products
      cy.contains("Test Product 1").should("be.visible");
      cy.contains("Test Product 2").should("be.visible");
    });

    it("should display product information correctly", () => {
      cy.visit(frontendUrl);

      // Wait for products to load
      cy.contains("Test Product 1").should("be.visible");

      // Check if product cards contain expected information
      cy.contains("Electronics").should("be.visible");
      cy.contains("Books").should("be.visible");
    });

    it("should refresh products automatically", () => {
      cy.visit(frontendUrl);

      // Wait for initial load
      cy.contains("Test Product 1").should("be.visible");

      // Add a new product via API
      cy.request({
        method: "PUT",
        url: `${backendUrl}/stock`,
        body: {
          title: "Auto Refresh Test",
          category: "Test Category",
          amount: 1,
          productid: "REFRESH001",
        },
      });

      // Should appear automatically due to SWR refresh (within 5 seconds)
      // SWR refreshInterval is 2000ms, so give it more time
      cy.contains("Auto Refresh Test", { timeout: 6000 }).should("be.visible");
    });
  });

  describe("Add Product Functionality", () => {
    it("should have add product component visible", () => {
      cy.visit(frontendUrl);

      // Look for add product button or form
      // This depends on your AddProduct component implementation
      cy.get('button, [role="button"]').should("exist");
    });
  });

  describe("Error Handling", () => {
    it("should handle API errors gracefully", () => {
      // Mock a failing backend by using wrong URL
      cy.intercept("GET", "**/stock", { forceNetworkError: true }).as(
        "getStockError"
      );

      cy.visit(frontendUrl);

      // Should show error message
      cy.contains("Failed to load products", { timeout: 5000 }).should(
        "be.visible"
      );
    });

    it("should handle network timeouts", () => {
      // Mock slow response
      cy.intercept("GET", "**/stock", (req) => {
        req.reply({ delay: 10000, body: [] });
      }).as("getStockSlow");

      cy.visit(frontendUrl);

      // Should show loading state for extended time
      cy.contains("Loading products...").should("be.visible");
    });
  });

  describe("Responsive Design", () => {
    it("should work on mobile viewport", () => {
      // Add a test product first so grid appears
      cy.request({
        method: "PUT",
        url: `${backendUrl}/stock`,
        body: {
          title: "Mobile Test Product",
          category: "Mobile Test",
          amount: 1,
          productid: "MOBILE001",
        },
      });

      cy.viewport("iphone-6");
      cy.visit(frontendUrl);

      // Check main elements are still visible
      cy.contains("🏪 Product Storage").should("be.visible");

      // Wait for product to load
      cy.contains("Mobile Test Product").should("be.visible");

      // Grid should adapt to mobile (single column)
      cy.get(".grid").should("exist");
      cy.get('[class*="grid-cols-1"]').should("exist");
    });

    it("should work on tablet viewport", () => {
      cy.viewport("ipad-2");
      cy.visit(frontendUrl);

      // Check main elements are still visible
      cy.contains("🏪 Product Storage").should("be.visible");
    });

    it("should work on desktop viewport", () => {
      // Add a test product first so grid appears
      cy.request({
        method: "PUT",
        url: `${backendUrl}/stock`,
        body: {
          title: "Desktop Test Product",
          category: "Desktop Test",
          amount: 1,
          productid: "DESKTOP001",
        },
      });

      cy.viewport(1200, 800);
      cy.visit(frontendUrl);

      // Check main elements are still visible
      cy.contains("🏪 Product Storage").should("be.visible");

      // Wait for product to load
      cy.contains("Desktop Test Product").should("be.visible");

      // Should have multi-column grid on larger screens
      cy.get(".grid").should("exist");
      cy.get('[class*="xl:grid-cols-4"]').should("exist");
    });
  });

  describe("Performance and UX", () => {
    it("should load within reasonable time", () => {
      const startTime = Date.now();

      cy.visit(frontendUrl);
      cy.contains("🏪 Product Storage").should("be.visible");

      cy.then(() => {
        const loadTime = Date.now() - startTime;
        expect(loadTime).to.be.lessThan(5000); // Should load within 5 seconds
      });
    });

    it("should maintain state during navigation", () => {
      // Add a product first
      cy.request({
        method: "PUT",
        url: `${backendUrl}/stock`,
        body: {
          title: "State Test Product",
          category: "Test",
          amount: 1,
          productid: "STATE001",
        },
      });

      cy.visit(frontendUrl);
      cy.contains("State Test Product").should("be.visible");

      // Simulate page refresh
      cy.reload();

      // Product should still be visible
      cy.contains("State Test Product").should("be.visible");
    });
  });

  describe("SearchBar Component", () => {
  it("should focus input with Ctrl/⌘+K", () => {
  cy.visit(frontendUrl);

  // input มาแล้ว และตอนแรกยังไม่โฟกัส
  cy.get('input[aria-label="Search"]').as('search').should('exist');
  cy.get('@search').should('not.be.focused');

  // ยิง KeyboardEvent ไปที่ window
  cy.window().then((win) => {
    win.dispatchEvent(new win.KeyboardEvent('keydown', {
      key: 'k',
      ctrlKey: true,
      bubbles: true,
      cancelable: true,
      composed: true,
    }));
  });
  cy.get('@search').should('be.focused');

  // ทดสอบ meta 
  cy.get('@search').blur();
  cy.window().then((win) => {
    win.dispatchEvent(new win.KeyboardEvent('keydown', {
      key: 'k',
      metaKey: true,
      bubbles: true,
      cancelable: true,
      composed: true,
    }));
  });
  cy.get('@search').should('be.focused');
});

  it("should show typing indicator immediately and hide after debounce", () => {
    cy.clock();
    cy.visit(frontendUrl);

    cy.get('input[aria-label="Search"]').as("search");
    cy.get("@search").type("phone");

    // ระหว่างพิมพ์ควรเห็นจุด '…'
    cy.contains("…").should("exist");

    // หมดเวลา debounce 
    cy.tick(210);
    cy.contains("…").should("not.exist");

    // ปุ่ม Clear ควรโผล่
    cy.get('button[aria-label="Clear search"]').should("exist").click();

    // ค่าถูกล้างและโฟกัสยังอยู่
    cy.get("@search").should("have.value", "");
  });

  it("should keep value when typing normally and clear only when clicking Clear", () => {
    cy.visit(frontendUrl);
    cy.get('input[aria-label="Search"]').type("abc");
    cy.get('input[aria-label="Search"]').should("have.value", "abc");
    cy.get('button[aria-label="Clear search"]').click();
    cy.get('input[aria-label="Search"]').should("have.value", "");
  });
});
});