describe("Page Loads and buttons working", () => {
  it("Visits the calculator and checks for buttons", () => {
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

  it ('Checks buttons are inputting correctly', () => {
    cy.visit("localhost:3000");
    const buttonIds = [
      '#one',
      '#two',
      '#three',
      '#four',
      '#five',
      '#six',
      '#seven',
      '#eight',
      '#nine',
      '#zero'
    ]
    for (let b = 0; b < buttonIds.length; b++) {
      cy.get(buttonIds[b]).click();
    }
    cy.get('#display').contains('1234567890').should((elem) => {
      expect(elem.text()).to.equal('1234567890');
    });
  })
});

describe("Enter a calculation and observe results and history", () => {
  it("Adds 1+1, expects 2 and clear to leave 0", () => {
    cy.visit("localhost:3000");

    cy.get("#one").click();
    cy.get("#add").click();
    cy.get("#one").click();
    cy.get("#equal").click();

    cy.get("#display").contains("2").should((elem) => {
      expect(elem.text()).to.equal('2');
    });

    cy.get("#clear").click();

    cy.get("#display").contains("0").should((elem) => {
      expect(elem.text()).to.equal('0');
    });
  });

  it("Checks history logs 1+1=2 to history, and clears", () => {
    cy.visit("localhost:3000");

    cy.get("#one").click();
    cy.get("#add").click();
    cy.get("#one").click();
    cy.get("#equal").click();

    cy.get("#historyDisplay").contains("1+1").should((elem) => {
      expect(elem.text()).to.equal('1+1');
    });
    cy.get("#historyDisplay").contains("2").should((elem) => {
      expect(elem.text()).to.equal('2');
    });

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

    cy.get("#display").contains("2").should((elem) => {
      expect(elem.text()).to.equal('2');
    });
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

  it("Checks all button keystronkes", () => {
    cy.visit("localhost:3000");
    cy.get("body").type("1234567890");
    cy.get("#display").contains("1234567890").should((elem) => {
      expect(elem.text()).to.equal('1234567890');
    });
  });
});

describe("Ensures the number cannot have 2 periods", () => {
  it("Enters a calculation with buttons and checks the display", () => {
    cy.visit("localhost:3000");
    cy.get("#one").click();
    cy.get("#decimal").click();
    cy.get("#one").click();
    cy.get("#decimal").click();
    cy.get("#display").contains("1.1").should((elem) => {
      expect(elem.text()).to.equal('1.1');
    });
  });

  it("Enters a calculation with key presses and checks the display", () => {
    cy.visit("localhost:3000");
    cy.get('body').type('1,1.,')
    cy.get("#display").contains("1.1").should((elem) => {
      expect(elem.text()).to.equal('1.1');
    });
  });
});

describe("Typing a number after a percentage", () => {
  it("Enter a number after a percentage", () => {
    cy.visit("localhost:3000");
    cy.get("#one").click();
    cy.get("#seven").click();
    cy.get("#percent").click();
    cy.get("#five").click();
    cy.get("#equal").click();

    cy.get("#display").contains("0.85").should((elem) => {
      expect(elem.text()).to.equal('0.85');
    });
  });

  it("Enter an operation after a percentage", () => {
    cy.visit("localhost:3000");
    cy.get("#one").click();
    cy.get("#seven").click();
    cy.get("#percent").click();
    cy.get("#add").click();
    cy.get("#two").click();
    cy.get("#equal").click();

    cy.get("#display").contains("2.17").should((elem) => {
      expect(elem.text()).to.equal('2.17');
    })
  });
})

describe("Typing a number after a percentage", () => {
  it("Enter a number after a percentage", () => {
    cy.visit("localhost:3000");
    cy.get("#one").click();
    cy.get("#seven").click();
    cy.get("#percent").click();
    cy.get("#five").click();
    cy.get("#equal").click();

    cy.get("#display").contains("0.85").should((elem) => {
      expect(elem.text()).to.equal('0.85');
    });
  });

  it("Enter an operation after a percentage", () => {
    cy.visit("localhost:3000");
    cy.get("#one").click();
    cy.get("#seven").click();
    cy.get("#percent").click();
    cy.get("#add").click();
    cy.get("#two").click();
    cy.get("#equal").click();

    cy.get("#display").contains("2.17").should((elem) => {
      expect(elem.text()).to.equal('2.17');
    })
  });
})

describe("Checks dark mode switch", () => {
  it("Checks initial background colour", () => {
    cy.visit("localhost:3000");
    cy.get("body").should("have.css", "background-color", "rgb(255, 255, 255)");
  });

  it("Selects dark mode and checks background colour", () => {
    cy.visit("localhost:3000");
    cy.get('span.slider.round').click()
    cy.get("body").should("have.css", "background-color", "rgb(33, 37, 41)");
  });
});