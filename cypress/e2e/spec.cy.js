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

describe("BODMAS and other tests from button press", () => {
  it("2^((2+2)×3!)/(4*2) should result in 2097152", () => {
    cy.visit("localhost:3000");
    cy.get("#two").click();
    cy.get("#power").click();
    cy.get("#open").click();
    cy.get("#two").click();
    cy.get("#add").click();
    cy.get("#two").click();
    cy.get("#close").click();
    cy.get("#multiply").click();
    cy.get("#three").click();
    cy.get("#fact").click();
    cy.get("#close").click();
    cy.get("#divide").click();
    cy.get("#open").click();
    cy.get("#four").click();
    cy.get("#multiply").click();
    cy.get("#two").click();
    cy.get("#close").click();
    cy.get("#equal").click();

    // 2^((2+2)×3!)÷(4×2)

    cy.get("#display").contains("2097152").should((elem) => {
      expect(elem.text()).to.equal('2097152');
    });
  });

  it("should handle parentheses", () => {
    cy.visit("localhost:3000");
    cy.get("#open").click();
    cy.get("#two").click();
    cy.get("#add").click();
    cy.get("#three").click();
    cy.get("#close").click();
    cy.get("#multiply").click();
    cy.get("#four").click();
    cy.get("#equal").click();

    cy.get("#display").contains("20").should((elem) => {
      expect(elem.text()).to.equal('20');
    });
  });

  it("should follow order of operations", () => {
    cy.visit("localhost:3000");
    cy.get("#two").click();
    cy.get("#add").click();
    cy.get("#three").click();
    cy.get("#multiply").click();
    cy.get("#four").click();
    cy.get("#equal").click();

    cy.get("#display").contains("14").should((elem) => {
      expect(elem.text()).to.equal('14');
    });
  });

  it("should handle multiple operations in a row", () => {
    cy.visit("localhost:3000");
    cy.get("#two").click();
    cy.get("#add").click();
    cy.get("#three").click();
    cy.get("#subtract").click();
    cy.get("#one").click();
    cy.get("#multiply").click();
    cy.get("#four").click();
    cy.get("#divide").click();
    cy.get("#two").click();
    cy.get("#equal").click();

    cy.get("#display").contains("3").should((elem) => {
      expect(elem.text()).to.equal('3');
    });
  });

  it("should handle an equation starting with an operator", () => {
    cy.visit("localhost:3000");
    cy.get("#add").click();
    cy.get("#two").click();
    cy.get("#add").click();
    cy.get("#three").click();
    cy.get("#equal").click();

    cy.get("#display").contains("5").should((elem) => {
      expect(elem.text()).to.equal('5');
    });
  });

  it("should handle an equation ending with an operator", () => {
    cy.visit("localhost:3000");
    cy.get("#two").click();
    cy.get("#add").click();
    cy.get("#three").click();
    cy.get("#add").click();
    cy.get("#equal").click();

    cy.get("#display").contains("5").should((elem) => {
      expect(elem.text()).to.equal('5');
    });
  });

  it("should handle negative numbers in parentheses", () => {
    cy.visit("localhost:3000");
    cy.get("#two").click();
    cy.get("#add").click();
    cy.get("#open").click();
    cy.get("#subtract").click();
    cy.get("#three").click();
    cy.get("#close").click();
    cy.get("#equal").click();

    cy.get("#display").contains("-1").should((elem) => {
      expect(elem.text()).to.equal('-1');
    });
  });

  it("should handle complex equations with square roots and exponents", () => {
    cy.visit("localhost:3000");
    cy.get("#sqrt").click();
    cy.get("#four").click();
    cy.get("#close").click();
    cy.get("#add").click();
    cy.get("#two").click();
    cy.get("#power").click();
    cy.get("#three").click();
    cy.get("#close").click();
    cy.get("#equal").click();

    cy.get("#display").contains("10").should((elem) => {
      expect(elem.text()).to.equal('10');
    });
  });

  it("should handle repeated square roots", () => {
    cy.visit("localhost:3000");
    cy.get("#sqrt").click();
    cy.get("#sqrt").click();
    cy.get("#one").click();
    cy.get("#six").click();
    cy.get("#close").click();
    cy.get("#close").click();
    cy.get("#equal").click();

    cy.get("#display").contains("2").should((elem) => {
      expect(elem.text()).to.equal('2');
    });
  });
});

describe("BODMAS and other tests from keystrokes", () => {
  it("2^((2+2)×3!)/(4*2) should result in 2097152", () => {
    cy.visit("localhost:3000");
    cy.get("body").type("2^(2+2)×3!)/(4*2){enter}");

    cy.get("#display").contains("2097152").should((elem) => {
      expect(elem.text()).to.equal('2097152');
    });
  });

  it("should handle parentheses", () => {
    cy.visit("localhost:3000");
    cy.get("body").type("(2+3)*4{enter}");

    cy.get("#display").contains("20").should((elem) => {
      expect(elem.text()).to.equal('20');
    });
  });

  it("should follow order of operations", () => {
    cy.visit("localhost:3000");
    cy.get("body").type("2+3*4{enter}");

    cy.get("#display").contains("14").should((elem) => {
      expect(elem.text()).to.equal('14');
    });
  });

  it("should handle multiple operations in a row", () => {
    cy.visit("localhost:3000");
    cy.get("body").type("2+3-1*4/2{enter}");

    cy.get("#display").contains("3").should((elem) => {
      expect(elem.text()).to.equal('3');
    });
  });

  it("should handle an equation starting with an operator", () => {
    cy.visit("localhost:3000");
    cy.get("body").type("+2+3{enter}");

    cy.get("#display").contains("5").should((elem) => {
      expect(elem.text()).to.equal('5');
    });
  });

  it("should handle an equation ending with an operator", () => {
    cy.visit("localhost:3000");
    cy.get("body").type("2+3+{enter}");

    cy.get("#display").contains("5").should((elem) => {
      expect(elem.text()).to.equal('5');
    });
  });

  it("should handle negative numbers in parentheses", () => {
    cy.visit("localhost:3000");
    cy.get("body").type("2+(-3){enter}");

    cy.get("#display").contains("-1").should((elem) => {
      expect(elem.text()).to.equal('-1');
    });
  });
});

describe("Subtraction from button press", () => {
  it("5-5 should result in 0", () => {
    cy.visit("localhost:3000");
    cy.get("#five").click();
    cy.get("#subtract").click();
    cy.get("#five").click();
    cy.get("#equal").click();

    cy.get("#display").contains("0").should((elem) => {
      expect(elem.text()).to.equal('0');
    });
  });

  it("5--5 should result in 10", () => {
    cy.visit("localhost:3000");
    cy.get("#five").click();
    cy.get("#subtract").click();
    cy.get("#subtract").click();
    cy.get("#five").click();
    cy.get("#equal").click();

    cy.get("#display").contains("10").should((elem) => {
      expect(elem.text()).to.equal('10');
    });
  });

  it("0-10 should result in -10", () => {
    cy.visit("localhost:3000");
    cy.get("#zero").click();
    cy.get("#subtract").click();
    cy.get("#one").click();
    cy.get("#zero").click();
    cy.get("#equal").click();

    cy.get("#display").contains("-10").should((elem) => {
      expect(elem.text()).to.equal('-10');
    });
  });

  it("3.5-1.2 should result in 2.3", () => {
    cy.visit("localhost:3000");
    cy.get("#three").click();
    cy.get("#decimal").click();
    cy.get("#five").click();
    cy.get("#subtract").click();
    cy.get("#one").click();
    cy.get("#decimal").click();
    cy.get("#two").click();
    cy.get("#equal").click();

    cy.get("#display").contains("2.3").should((elem) => {
      expect(elem.text()).to.equal('2.3');
    });
  });
});

describe("Subtraction from keystroke press", () => {
  it("5-5 should result in 0", () => {
    cy.visit("localhost:3000");
    cy.get("body").type("5-5{enter}");

    cy.get("#display").contains("0").should((elem) => {
      expect(elem.text()).to.equal('0');
    });
  });

  it("5--5 should result in 10", () => {
    cy.visit("localhost:3000");
    cy.get("body").type("5--5{enter}");

    cy.get("#display").contains("10").should((elem) => {
      expect(elem.text()).to.equal('10');
    });
  });

  it("0-10 should result in -10", () => {
    cy.visit("localhost:3000");
    cy.get("body").type("0-10{enter}");

    cy.get("#display").contains("-10").should((elem) => {
      expect(elem.text()).to.equal('-10');
    });
  });

  it("3.5-1.2 should result in 2.3", () => {
    cy.visit("localhost:3000");
    cy.get("body").type("3.5-1.2{enter}");

    cy.get("#display").contains("2.3").should((elem) => {
      expect(elem.text()).to.equal('2.3');
    });
  });
});

describe("Addition from button press", () => {
  it("2+3 should result in 5", () => {
    cy.visit("localhost:3000");
    cy.get("#two").click();
    cy.get("#add").click();
    cy.get("#three").click();
    cy.get("#equal").click();

    cy.get("#display").contains("5").should((elem) => {
      expect(elem.text()).to.equal('5');
    });
  });

  it("0+0 should result in 0", () => {
    cy.visit("localhost:3000");
    cy.get("#zero").click();
    cy.get("#add").click();
    cy.get("#zero").click();
    cy.get("#equal").click();

    cy.get("#display").contains("0").should((elem) => {
      expect(elem.text()).to.equal('0');
    });
  });

  it("-1+1 should result in 0", () => {
    cy.visit("localhost:3000");
    cy.get("#subtract").click();
    cy.get("#one").click();
    cy.get("#add").click();
    cy.get("#one").click();
    cy.get("#equal").click();

    cy.get("#display").contains("0").should((elem) => {
      expect(elem.text()).to.equal('0');
    });
  });

  it("0-5 should result in -5", () => {
    cy.visit("localhost:3000");
    cy.get("#zero").click();
    cy.get("#subtract").click();
    cy.get("#five").click();
    cy.get("#equal").click();

    cy.get("#display").contains("-5").should((elem) => {
      expect(elem.text()).to.equal('-5');
    });
  });

  it("0.1+0.2 should result in 0.3", () => {
    cy.visit("localhost:3000");
    cy.get("#zero").click();
    cy.get("#decimal").click();
    cy.get("#one").click();
    cy.get("#add").click();
    cy.get("#zero").click();
    cy.get("#decimal").click();
    cy.get("#two").click();
    cy.get("#equal").click();

    cy.get("#display").contains("0.3").should((elem) => {
      expect(elem.text()).to.equal('0.3');
    });
  });
  
  it("should handle large numbers", () => {
    cy.visit("localhost:3000");
    cy.get("#nine").click();
    cy.get("#nine").click();
    cy.get("#nine").click();
    cy.get("#nine").click(); 
    cy.get("#nine").click();
    cy.get("#nine").click();
    cy.get("#nine").click();
    cy.get("#nine").click();
    cy.get("#nine").click();
    cy.get("#nine").click();
    cy.get("#nine").click();
    cy.get("#nine").click();
    cy.get("#nine").click();
    cy.get("#nine").click();
    cy.get("#nine").click();
    cy.get("#nine").click();
    cy.get("#add").click();
    cy.get("#one").click();
    cy.get("#equal").click();

    cy.get("#display").contains("10000000000000000").should((elem) => {
      expect(elem.text()).to.equal('10000000000000000');
    });
  });
});

describe("Addition from keystroke press", () => {
  it("2+3 should result in 5", () => {
    cy.visit("localhost:3000");
    cy.get("body").type("2+3{enter}");

    cy.get("#display").contains("5").should((elem) => {
      expect(elem.text()).to.equal('5');
    });
  });

  it("0+0 should result in 0", () => {
    cy.visit("localhost:3000");
    cy.get("body").type("0+0{enter}");

    cy.get("#display").contains("0").should((elem) => {
      expect(elem.text()).to.equal('0');
    });
  });

  it("-1+1 should result in 0", () => {
    cy.visit("localhost:3000");
    cy.get("body").type("-1+1{enter}");

    cy.get("#display").contains("0").should((elem) => {
      expect(elem.text()).to.equal('0');
    });
  });

  it("0-5 should result in -5", () => {
    cy.visit("localhost:3000");
    cy.get("body").type("0-5{enter}");

    cy.get("#display").contains("-5").should((elem) => {
      expect(elem.text()).to.equal('-5');
    });
  });

  it("0.1+0.2 should result in 0.3", () => {
    cy.visit("localhost:3000");
    cy.get("body").type("0.1+0.2{enter}");

    cy.get("#display").contains("0.3").should((elem) => {
      expect(elem.text()).to.equal('0.3');
    });
  });
  
  it("should handle large numbers", () => {
    cy.visit("localhost:3000");
    cy.get("body").type("9999999999999999+1{enter}");

    cy.get("#display").contains("10000000000000000").should((elem) => {
      expect(elem.text()).to.equal('10000000000000000');
    });
  });
});

describe("Multiplication from button press", () => {
  it("8*4 should result in 32", () => {
    cy.visit("localhost:3000");
    cy.get("#eight").click();
    cy.get("#multiply").click();
    cy.get("#four").click();
    cy.get("#equal").click();

    cy.get("#display").contains("32").should((elem) => {
      expect(elem.text()).to.equal('32');
    });
  });

  it("-4*3 should result in -12", () => {
    cy.visit("localhost:3000");
    cy.get("#subtract").click();
    cy.get("#four").click();
    cy.get("#multiply").click();
    cy.get("#three").click();
    cy.get("#equal").click();

    cy.get("#display").contains("-12").should((elem) => {
      expect(elem.text()).to.equal('-12');
    });
  });

  it("0*5 should result in 0", () => {
    cy.visit("localhost:3000");
    cy.get("#zero").click();
    cy.get("#multiply").click();
    cy.get("#five").click();
    cy.get("#equal").click();

    cy.get("#display").contains("0").should((elem) => {
      expect(elem.text()).to.equal('0');
    });
  });

  it("-3*-5 should result in 15", () => {
    cy.visit("localhost:3000");
    cy.get("#subtract").click();
    cy.get("#three").click();
    cy.get("#multiply").click();
    cy.get("#subtract").click();
    cy.get("#five").click();
    cy.get("#equal").click();

    cy.get("#display").contains("15").should((elem) => {
      expect(elem.text()).to.equal('15');
    });
  });

  it("2.5*3.5 should result in 8.75", () => {
    cy.visit("localhost:3000");
    cy.get("#two").click();
    cy.get("#decimal").click();
    cy.get("#five").click();
    cy.get("#multiply").click();
    cy.get("#three").click();
    cy.get("#decimal").click();
    cy.get("#five").click();
    cy.get("#equal").click();

    cy.get("#display").contains("8.75").should((elem) => {
      expect(elem.text()).to.equal('8.75');
    });
  });
});

describe("Multiplication from button press", () => {
  it("8*4 should result in 32", () => {
    cy.visit("localhost:3000");
    cy.get("body").type("8*4{enter}");

    cy.get("#display").contains("32").should((elem) => {
      expect(elem.text()).to.equal('32');
    });
  });

  it("-4*3 should result in -12", () => {
    cy.visit("localhost:3000");
    cy.get("body").type("-4*3{enter}");

    cy.get("#display").contains("-12").should((elem) => {
      expect(elem.text()).to.equal('-12');
    });
  });

  it("0*5 should result in 0", () => {
    cy.visit("localhost:3000");
    cy.get("body").type("0*5{enter}");

    cy.get("#display").contains("0").should((elem) => {
      expect(elem.text()).to.equal('0');
    });
  });

  it("-3*-5 should result in 15", () => {
    cy.visit("localhost:3000");
    cy.get("body").type("-3*-5{enter}");

    cy.get("#display").contains("15").should((elem) => {
      expect(elem.text()).to.equal('15');
    });
  });

  it("2.5*3.5 should result in 8.75", () => {
    cy.visit("localhost:3000");
    cy.get("body").type("2.5*3.5{enter}");

    cy.get("#display").contains("8.75").should((elem) => {
      expect(elem.text()).to.equal('8.75');
    });
  });
});

describe("Division from button press", () => {
  it("10/2 should result in 5", () => {
    cy.visit("localhost:3000");
    cy.get("#one").click();
    cy.get("#zero").click();
    cy.get("#divide").click();
    cy.get("#two").click();
    cy.get("#equal").click();

    cy.get("#display").contains("5").should((elem) => {
      expect(elem.text()).to.equal('5');
    });
  });

  it("10/0 should result in an error", () => {
    cy.visit("localhost:3000");
    cy.get("#one").click();
    cy.get("#zero").click();
    cy.get("#divide").click();
    cy.get("#zero").click();
    cy.get("#equal").click();

    cy.get("#display").contains("Error: Division by zero").should((elem) => {
      expect(elem.text()).to.equal("Error: Division by zero");
    });
  });

  it("2.5/5 should result in 0.5", () => {
    cy.visit("localhost:3000");
    cy.get("#two").click();
    cy.get("#decimal").click();
    cy.get("#five").click();
    cy.get("#divide").click();
    cy.get("#five").click();
    cy.get("#equal").click();

    cy.get("#display").contains("0.5").should((elem) => {
      expect(elem.text()).to.equal('0.5');
    });
  });
});

describe("Division from keystroke press", () => {
  it("10/2 should result in 5", () => {
    cy.visit("localhost:3000");
    cy.get("body").type("10/2{enter}");

    cy.get("#display").contains("5").should((elem) => {
      expect(elem.text()).to.equal('5');
    });
  });

  it("10/0 should result in an error", () => {
    cy.visit("localhost:3000");
    cy.get("body").type("10/0{enter}");

    cy.get("#display").contains("Error: Division by zero").should((elem) => {
      expect(elem.text()).to.equal("Error: Division by zero");
    });
  });

  it("2.5/5 should result in 0.5", () => {
    cy.visit("localhost:3000");
    cy.get("body").type("2.5/5{enter}");

    cy.get("#display").contains("0.5").should((elem) => {
      expect(elem.text()).to.equal('0.5');
    });
  });
});

describe("Square root from button press", () => {
  it("sqrt(9) should result in 3", () => {
    cy.visit("localhost:3000");
    cy.get("#sqrt").click();
    cy.get("#nine").click();
    cy.get("#close").click();
    cy.get("#equal").click();

    cy.get("#display").contains("3").should((elem) => {
      expect(elem.text()).to.equal('3');
    });
  });

  it("sqrt(4) should result in 2", () => {
    cy.visit("localhost:3000");
    cy.get("#sqrt").click();
    cy.get("#four").click();
    cy.get("#close").click();
    cy.get("#equal").click();

    cy.get("#display").contains("2").should((elem) => {
      expect(elem.text()).to.equal('2');
    });
  });

  it("sqrt(1) should result in 1", () => {
    cy.visit("localhost:3000");
    cy.get("#sqrt").click();
    cy.get("#one").click();
    cy.get("#close").click();
    cy.get("#equal").click();

    cy.get("#display").contains("1").should((elem) => {
      expect(elem.text()).to.equal('1');
    });
  });

  it("sqrt(0) should result in 0", () => {
    cy.visit("localhost:3000");
    cy.get("#sqrt").click();
    cy.get("#zero").click();
    cy.get("#close").click();
    cy.get("#equal").click();

    cy.get("#display").contains("0").should((elem) => {
      expect(elem.text()).to.equal('0');
    });
  });

  it("sqrt(-4) should result in Error", () => {
    cy.visit("localhost:3000");
    cy.get("#sqrt").click();
    cy.get("#subtract").click();
    cy.get("#four").click();
    cy.get("#close").click();
    cy.get("#equal").click();

    cy.get("#display").contains("Error: Negative square root").should((elem) => {
      expect(elem.text()).to.equal('Error: Negative square root');
    });
  });

  it("sqrt(2) should result in 1.4142", () => {
    cy.visit("localhost:3000");
    cy.get("#sqrt").click();
    cy.get("#two").click();
    cy.get("#close").click();
    cy.get("#equal").click();

    cy.get("#display").contains("1.414213562").should((elem) => {
      expect(elem.text()).to.equal('1.414213562');
    });
  });

  it("sqrt(0.4) should result in 0.63246", () => {
    cy.visit("localhost:3000");
    cy.get("#sqrt").click();
    cy.get("#zero").click();
    cy.get("#decimal").click();
    cy.get("#four").click();
    cy.get("#close").click();
    cy.get("#equal").click();

    cy.get("#display").contains("0.632455532").should((elem) => {
      expect(elem.text()).to.equal('0.632455532');
    });
  });

  it("sqrt(-(-4)) should result in 2", () => {
    cy.visit("localhost:3000");
    cy.get("#sqrt").click();
    cy.get("#subtract").click();
    cy.get("#open").click();
    cy.get("#subtract").click();
    cy.get("#four").click();
    cy.get("#close").click();
    cy.get("#close").click();
    cy.get("#equal").click();

    cy.get("#display").contains("2").should((elem) => {
      expect(elem.text()).to.equal('2');
    });
  });

  it("sqrt(pi) should result in 1.7725", () => {
    cy.visit("localhost:3000");
    cy.get("#sqrt").click();
    cy.get("#pi").click();
    cy.get("#close").click();
    cy.get("#equal").click();

    cy.get("#display").contains("1.772453851").should((elem) => {
      expect(elem.text()).to.equal('1.772453851');
    });
  });
});

describe("Power from button press", () => {
  it("2^3 should result in 8", () => {
    cy.visit("localhost:3000");
    cy.get("#two").click();
    cy.get("#power").click();
    cy.get("#three").click();
    cy.get("#close").click();
    cy.get("#equal").click();

    cy.get("#display").contains("8").should((elem) => {
      expect(elem.text()).to.equal('8');
    });
  });

  it("2^-3 should result in 0.125", () => {
    cy.visit("localhost:3000");
    cy.get("#two").click();
    cy.get("#power").click();
    cy.get("#subtract").click();
    cy.get("#three").click();
    cy.get("#close").click();
    cy.get("#equal").click();

    cy.get("#display").contains("0.125").should((elem) => {
      expect(elem.text()).to.equal('0.125');
    });
  });

  it("0^5 should result in 0", () => {
    cy.visit("localhost:3000");
    cy.get("#zero").click();
    cy.get("#power").click();
    cy.get("#five").click();
    cy.get("#close").click();
    cy.get("#equal").click();

    cy.get("#display").contains("0").should((elem) => {
      expect(elem.text()).to.equal('0');
    });
  });

  it("7^0 should result in 1", () => {
    cy.visit("localhost:3000");
    cy.get("#seven").click();
    cy.get("#power").click();
    cy.get("#zero").click();
    cy.get("#close").click();
    cy.get("#equal").click();

    cy.get("#display").contains("1").should((elem) => {
      expect(elem.text()).to.equal('1');
    });
  });

  it("1.5^2 should result in 2.25", () => {
    cy.visit("localhost:3000");
    cy.get("#one").click();
    cy.get("#decimal").click();
    cy.get("#five").click();
    cy.get("#power").click();
    cy.get("#two").click();
    cy.get("#close").click();
    cy.get("#equal").click();

    cy.get("#display").contains("2.25").should((elem) => {
      expect(elem.text()).to.equal('2.25');
    });
  });
});

describe("Power from keystroke press", () => {
  it("2^3 should result in 8", () => {
    cy.visit("localhost:3000");
    cy.get("body").type("2^3){enter}");

    cy.get("#display").contains("8").should((elem) => {
      expect(elem.text()).to.equal('8');
    });
  });

  it("2^-3 should result in 0.125", () => {
    cy.visit("localhost:3000");
    cy.get("body").type("2^-3){enter}");

    cy.get("#display").contains("0.125").should((elem) => {
      expect(elem.text()).to.equal('0.125');
    });
  });

  it("0^5 should result in 0", () => {
    cy.visit("localhost:3000");
    cy.get("body").type("0^5){enter}");

    cy.get("#display").contains("0").should((elem) => {
      expect(elem.text()).to.equal('0');
    });
  });

  it("7^0 should result in 1", () => {
    cy.visit("localhost:3000");
    cy.get("body").type("7^0){enter}");

    cy.get("#display").contains("1").should((elem) => {
      expect(elem.text()).to.equal('1');
    });
  });

  it("1.5^2 should result in 2.25", () => {
    cy.visit("localhost:3000");
    cy.get("body").type("1.5^2){enter}");

    cy.get("#display").contains("2.25").should((elem) => {
      expect(elem.text()).to.equal('2.25');
    });
  });
});

describe("Percentage from button press", () => {
  it("0% should result in 0", () => {
    cy.visit("localhost:3000");
    cy.get("#zero").click();
    cy.get("#percent").click();
    cy.get("#equal").click();

    cy.get("#display").contains("0").should((elem) => {
      expect(elem.text()).to.equal('0');
    });
  });

  it("10% should result in 0.1", () => {
    cy.visit("localhost:3000");
    cy.get("#one").click();
    cy.get("#zero").click();
    cy.get("#percent").click();
    cy.get("#equal").click();

    cy.get("#display").contains("0.1").should((elem) => {
      expect(elem.text()).to.equal('0.1');
    });
  });

  it("100% should result in 1", () => {
    cy.visit("localhost:3000");
    cy.get("#one").click();
    cy.get("#zero").click();
    cy.get("#zero").click();
    cy.get("#percent").click();
    cy.get("#equal").click();

    cy.get("#display").contains("1").should((elem) => {
      expect(elem.text()).to.equal('1');
    });
  });

  it("25.67% should result in 0.2567", () => {
    cy.visit("localhost:3000");
    cy.get("#two").click();
    cy.get("#five").click();
    cy.get("#decimal").click();
    cy.get("#six").click();
    cy.get("#seven").click();
    cy.get("#percent").click();
    cy.get("#equal").click();

    cy.get("#display").contains("0.2567").should((elem) => {
      expect(elem.text()).to.equal('0.2567');
    });
  });

  it("134% should result in 1.34", () => {
    cy.visit("localhost:3000");
    cy.get("#one").click();
    cy.get("#three").click();
    cy.get("#four").click();
    cy.get("#percent").click();
    cy.get("#equal").click();

    cy.get("#display").contains("1.34").should((elem) => {
      expect(elem.text()).to.equal('1.34');
    });
  });
});

describe("Factorial from keystroke", () => {
  it("0! should be 1", () => {
    cy.visit("localhost:3000");
    cy.get("body").type("0!{enter}");

    cy.get("#display").contains("1").should((elem) => {
      expect(elem.text()).to.equal('1');
    });
  });

  it("1! should be 1", () => {
    cy.visit("localhost:3000");
    cy.get("body").type("1!{enter}");

    cy.get("#display").contains("1").should((elem) => {
      expect(elem.text()).to.equal('1');
    });
  });

  it("2! should be 2", () => {
    cy.visit("localhost:3000");
    cy.get("body").type("2!{enter}");

    cy.get("#display").contains("2").should((elem) => {
      expect(elem.text()).to.equal('2');
    });
  });

  it("3! should be 6", () => {
    cy.visit("localhost:3000");
    cy.get("body").type("3!{enter}");

    cy.get("#display").contains("6").should((elem) => {
      expect(elem.text()).to.equal('6');
    });
  });

  it("5! should be 120", () => {
    cy.visit("localhost:3000");
    cy.get("body").type("5!{enter}");

    cy.get("#display").contains("120").should((elem) => {
      expect(elem.text()).to.equal('120');
    });
  });

  it("1.5! should be 1.3293", () => {
    cy.visit("localhost:3000");
    cy.get("body").type("1.5!{enter}");

    cy.get("#display").contains("1.3293").should((elem) => {
      expect(Number(elem.text())).to.be.closeTo(1.3293, 4);
    });
  });

  it("-6! should be -720", () => {
    cy.visit("localhost:3000");
    cy.get("body").type("-6!{enter}");

    cy.get("#display").contains("-720").should((elem) => {
      expect(elem.text()).to.equal('-720');
    });
  });
});

describe("Factorial from button press", () => {
  it("0! should be 1", () => {
    cy.visit("localhost:3000");
    cy.get("#zero").click();
    cy.get("#fact").click();
    cy.get("#equal").click();

    cy.get("#display").contains("1").should((elem) => {
      expect(elem.text()).to.equal('1');
    });
  });

  it("1! should be 1", () => {
    cy.visit("localhost:3000");
    cy.get("#one").click();
    cy.get("#fact").click();
    cy.get("#equal").click();

    cy.get("#display").contains("1").should((elem) => {
      expect(elem.text()).to.equal('1');
    });
  });

  it("2! should be 2", () => {
    cy.visit("localhost:3000");
    cy.get("#two").click();
    cy.get("#fact").click();
    cy.get("#equal").click();

    cy.get("#display").contains("2").should((elem) => {
      expect(elem.text()).to.equal('2');
    });
  });

  it("3! should be 6", () => {
    cy.visit("localhost:3000");
    cy.get("#three").click();
    cy.get("#fact").click();
    cy.get("#equal").click();

    cy.get("#display").contains("6").should((elem) => {
      expect(elem.text()).to.equal('6');
    });
  });

  it("5! should be 120", () => {
    cy.visit("localhost:3000");
    cy.get("#five").click();
    cy.get("#fact").click();
    cy.get("#equal").click();

    cy.get("#display").contains("120").should((elem) => {
      expect(elem.text()).to.equal('120');
    });
  });

  it("1.5! should be 1.3293", () => {
    cy.visit("localhost:3000");
    cy.get("#one").click();
    cy.get("#decimal").click();
    cy.get("#five").click();
    cy.get("#fact").click();
    cy.get("#equal").click();

    cy.get("#display").contains("1.3293").should((elem) => {
      expect(Number(elem.text())).to.be.closeTo(1.3293, 4);
    });
  });

  it("-6! should be -720", () => {
    cy.visit("localhost:3000");
    cy.get("#subtract").click();
    cy.get("#six").click();
    cy.get("#fact").click();
    cy.get("#equal").click();

    cy.get("#display").contains("-720").should((elem) => {
      expect(elem.text()).to.equal('-720');
    });
  });
});

describe("Percentage from keyboard press", () => {
  it("0% should result in 0", () => {
    cy.visit("localhost:3000");
    cy.get("body").type("0%{enter}");

    cy.get("#display").contains("0").should((elem) => {
      expect(elem.text()).to.equal('0');
    });
  });

  it("10% should result in 0.1", () => {
    cy.visit("localhost:3000");
    cy.get("body").type("10%{enter}");

    cy.get("#display").contains("0.1").should((elem) => {
      expect(elem.text()).to.equal('0.1');
    });
  });

  it("100% should result in 1", () => {
    cy.visit("localhost:3000");
    cy.get("body").type("100%{enter}");

    cy.get("#display").contains("1").should((elem) => {
      expect(elem.text()).to.equal('1');
    });
  });

  it("25.67% should result in 0.2567", () => {
    cy.visit("localhost:3000");
    cy.get("body").type("25.67%{enter}");

    cy.get("#display").contains("0.2567").should((elem) => {
      expect(elem.text()).to.equal('0.2567');
    });
  });

  it("134% should result in 1.34", () => {
    cy.visit("localhost:3000");
    cy.get("body").type("134%{enter}");

    cy.get("#display").contains("1.34").should((elem) => {
      expect(elem.text()).to.equal('1.34');
    });
  });
});

describe("Brackets from button press", () => {
  it("(2+2) should result in 4", () => {
    cy.visit("localhost:3000");
    cy.get("#open").click();
    cy.get("#two").click();
    cy.get("#add").click();
    cy.get("#two").click();
    cy.get("#close").click();
    cy.get("#equal").click();

    cy.get("#display").contains("4").should((elem) => {
      expect(elem.text()).to.equal('4');
    });
  });

  it("(2+2)*3 should result in 12", () => {
    cy.visit("localhost:3000");
    cy.get("#open").click();
    cy.get("#two").click();
    cy.get("#add").click();
    cy.get("#two").click();
    cy.get("#close").click();
    cy.get("#multiply").click();
    cy.get("#three").click();
    cy.get("#equal").click();

    cy.get("#display").contains("12").should((elem) => {
      expect(elem.text()).to.equal('12');
    });
  });

  it("(2+2)*3^2 should result in 36", () => {
    cy.visit("localhost:3000");
    cy.get("#open").click();
    cy.get("#two").click();
    cy.get("#add").click();
    cy.get("#two").click();
    cy.get("#close").click();
    cy.get("#multiply").click();
    cy.get("#three").click();
    cy.get("#power").click();
    cy.get("#two").click();
    cy.get("#close").click();
    cy.get("#equal").click();

    cy.get("#display").contains("36").should((elem) => {
      expect(elem.text()).to.equal('36');
    });
  });

  it("((2+2)*3 should result in Error", () => {
    cy.visit("localhost:3000");
    cy.get("#open").click();
    cy.get("#open").click();
    cy.get("#two").click();
    cy.get("#add").click();
    cy.get("#two").click();
    cy.get("#close").click();
    cy.get("#multiply").click();
    cy.get("#three").click();
    cy.get("#equal").click();

    cy.get("#display").contains("Error: Mismatched brackets").should((elem) => {
      expect(elem.text()).to.equal('Error: Mismatched brackets');
    });
  });

  it("(2+2)*3) should result in Error", () => {
    cy.visit("localhost:3000");
    cy.get("#open").click();
    cy.get("#two").click();
    cy.get("#add").click();
    cy.get("#two").click();
    cy.get("#close").click();
    cy.get("#multiply").click();
    cy.get("#three").click();
    cy.get("#close").click();
    cy.get("#equal").click();

    cy.get("#display").contains("Error: Mismatched brackets").should((elem) => {
      expect(elem.text()).to.equal('Error: Mismatched brackets');
    });
  });

  it("(2+2)*3^2)) should result in Error", () => {
    cy.visit("localhost:3000");
    cy.get("#open").click();
    cy.get("#two").click();
    cy.get("#add").click();
    cy.get("#two").click();
    cy.get("#close").click();
    cy.get("#multiply").click();
    cy.get("#three").click();
    cy.get("#power").click();
    cy.get("#two").click();
    cy.get("#close").click();
    cy.get("#close").click();
    cy.get("#close").click();
    cy.get("#equal").click();

    cy.get("#display").contains("Error: Mismatched brackets").should((elem) => {
      expect(elem.text()).to.equal('Error: Mismatched brackets');
    });
  });
});

describe("Brackets from keyboard press", () => {
  it("(2+2) should result in 4", () => {
    cy.visit("localhost:3000");
    cy.get("body").type("(2+2){enter}");

    cy.get("#display").contains("4").should((elem) => {
      expect(elem.text()).to.equal('4');
    });
  });

  it("(2+2)*3 should result in 12", () => {
    cy.visit("localhost:3000");
    cy.get("body").type("(2+2)*3{enter}");

    cy.get("#display").contains("12").should((elem) => {
      expect(elem.text()).to.equal('12');
    });
  });

  it("(2+2)*3^2 should result in 36", () => {
    cy.visit("localhost:3000");
    cy.get("body").type("(2+2)*3^2){enter}");

    cy.get("#display").contains("36").should((elem) => {
      expect(elem.text()).to.equal('36');
    });
  });

  it("((2+2)*3 should result in Error", () => {
    cy.visit("localhost:3000");
    cy.get("body").type("((2+2)*3{enter}");

    cy.get("#display").contains("Error: Mismatched brackets").should((elem) => {
      expect(elem.text()).to.equal('Error: Mismatched brackets');
    });
  });

  it("(2+2)*3) should result in Error", () => {
    cy.visit("localhost:3000");
    cy.get("body").type("(2+2)*3){enter}");

    cy.get("#display").contains("Error: Mismatched brackets").should((elem) => {
      expect(elem.text()).to.equal('Error: Mismatched brackets');
    });
  });

  it("(2+2)*3^2)) should result in Error", () => {
    cy.visit("localhost:3000");
    cy.get("body").type("(2+2)*3^2)){enter}");

    cy.get("#display").contains("Error: Mismatched brackets").should((elem) => {
      expect(elem.text()).to.equal('Error: Mismatched brackets');
    });
  });
});
