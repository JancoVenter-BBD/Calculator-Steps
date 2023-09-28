describe("Page Loads and buttons present", () => {
  it("Visits the calculator", () => {
    cy.visit("localhost:3000");
    for (let i = 0; i < 10; i++) {
      cy.get(".card-body").contains(i.toString());
    }

    const customChars = [
      "√",
      "AC",
      "(",
      ")",
      "÷",
      "-",
      "+",
      "=",
      "%",
      "π",
      "!",
    ];
    for (let c = 0; c < customChars.length; c++) {
      cy.get(".card-body").contains(customChars[c]);
    }
  });
});

describe("Enter a calculation and observe results and history", () => {
  it("Adds 1+1, expects 2 and clear to leave 0", () => {
    cy.visit("localhost:3000");

    cy.get("#one").click();
    cy.get("#add").click();
    cy.get("#one").click();
    cy.get("#equal").click();

    cy.get("#display").contains("2");

    cy.get("#clear").click();

    cy.get("#display").contains("0");
  });

  it("Checks history logs 1+1=2 to history, and clears", () => {
    cy.visit("localhost:3000");

    cy.get("#one").click();
    cy.get("#add").click();
    cy.get("#one").click();
    cy.get("#equal").click();

    cy.get("#historyDisplay").contains("1+1");
    cy.get("#historyDisplay").contains("2");

    cy.get("#clearBtn").click();

    cy.get("#historyDisplay").contains("No history");
  });

  it("Checks fill from history", () => {
    cy.visit("localhost:3000");

    cy.get("#one").click();
    cy.get("#add").click();
    cy.get("#one").click();
    cy.get("#equal").click();

    cy.get("#clear").click();

    cy.get('li[question="1+1"]').click();

    cy.get("#display").contains("2");
  });
});

describe("Keystrokes are registered correctly", () => {
  it("Enters a calculation and checks the display", () => {
    cy.visit("localhost:3000");
    cy.get("body").type("3*3*10{enter}");
    cy.get("#display").contains("90").should((elem) => {
      expect(elem.text()).to.equal('90');
    });
  });
});
