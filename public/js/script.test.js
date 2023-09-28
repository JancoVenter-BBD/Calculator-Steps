import { calculateEquation } from './script';

describe("Square root", () => {
    test('"√(9)" should result in 3', () => {
        expect(calculateEquation("√(9)")).toBe(3);
    });
    test('"√(4)" should result in 2', () => {
        expect(calculateEquation("√(4)")).toBe(2);
    });
    test('"√(1)" should result in 1', () => {
        expect(calculateEquation("√(1)")).toBe(1);
    });
    test('"√(0)" should result in 0', () => {
        expect(calculateEquation("√(0)")).toBe(0);
    });
    test('"√(-4)" should result in Error: Negative square root', () => {
        expect(calculateEquation("√(-4)")).toBe("Error: Negative square root");
    });
    test('"√(2)" should result in 1.4142', () => {
        expect(calculateEquation("√(2)")).toBeCloseTo(1.41421356237, 5);
    });
    test('"√(0.4)" should result in 0.63246', () => {
      expect(calculateEquation("√(0.4)")).toBeCloseTo(0.63246, 4);
    });
    test('"√(-(-4))" should result in 2', () => {
      expect(calculateEquation("√(-(-4))")).toBe(2);
    });
    test('"√(π)" should result in 1.7725', () => {
      expect(calculateEquation("√(π)")).toBeCloseTo(1.7725, 4);
    });
});

describe("Addition", () => {
    test('"2+3" should result in 5', () => {
        expect(calculateEquation("2+3")).toBe(5);
    });
    test('"0+0" should result in 0', () => {
        expect(calculateEquation("0+0")).toBe(0);
    });
    test('"-1+1" should result in 0', () => {
        expect(calculateEquation("-1+1")).toBe(0);
    });
    test('"0-5" should result in -5', () => {
        expect(calculateEquation("0-5")).toBe(-5);
    });
    test('"0.1+0.2" should result in 0.3', () => {
        expect(calculateEquation("0.1+0.2")).toBe(0.3);
    });
    test('should handle large numbers', () => {
      expect(calculateEquation("9999999999999999 + 1")).toBe(10000000000000000);
    });
});

describe("Subtraction", () => {
    test('"5-5" should result in 0', () => {
      expect(calculateEquation("5-5")).toBe(0);
    });
    test('"5--5" should result in 10', () => {
      expect(calculateEquation("5--5")).toBe(10);
    });
    test('"0-10" should result in -10', () => {
      expect(calculateEquation("0-10")).toBe(-10);
    });
    test('"3.5-1.2" should result in 2.3', () => {
      expect(calculateEquation("3.5-1.2")).toBe(2.3);
    });
});

describe("Division", () => {
  test('"10/2" should result in 5', () => {
    expect(calculateEquation("10/2")).toBe(5);
  });
  test('"10/0" should result in an "Error: Division by zero"', () => {
    expect(calculateEquation("10/0")).toBe("Error: Division by zero");
  });
  test('"2.5/5" should result in 0.5', () => {
    expect(calculateEquation("2.5/5")).toBe(0.5);
  });
});

describe("BODMAS chain operation and other tests", () => {
  test('"2^((2+2)×3!)/(4*2)" should result in 2097152', () => {
    expect(calculateEquation("2^((2+2)×3!)/(4*2)")).toBe(2097152);
  });
  test('should handle parentheses', () => {
    expect(calculateEquation("(2+3)*4")).toBe(20);
  });
  test('should follow order of operations', () => {
    expect(calculateEquation("2+3×4")).toBe(14);
  });
  test('should handle an empty input', () => {
    expect(calculateEquation("")).toBe(0); // Assumes starting with 0 by default
  });
  test('should handle multiple operations in a row', () => {
    expect(calculateEquation("2+3-1×4/2")).toBe(3); // Follows order of operations
  });
  test('should handle complex expressions with parentheses', () => {
    expect(calculateEquation("(2+3)×(4-1)/2")).toBe(7.5);
  });
  test('should handle multiple decimal points', () => {
    expect(calculateEquation("1.5.5")).toBe("Error: Invalid input");
  });
  test('should handle an equation starting with an operator', () => {
    expect(calculateEquation("+2+3")).toBe(5); // Treats as positive number
  });
  test('should handle an equation ending with an operator', () => {
    expect(calculateEquation("2+3+")).toBe(5); // Ignores the trailing operator
  });
  test('should handle negative numbers in parentheses', () => {
    expect(calculateEquation("2+(-3)")).toBe(-1);
  });
  test('should handle complex equations with square roots and exponents', () => {
    expect(calculateEquation("√(4)+2^(3)")).toBe(10); // 2 + 8
  });
  test('should handle repeated square roots', () => {
    expect(calculateEquation("√(√(16))")).toBe(2);
  });
});

describe("Factorial", () => {
  test('0! should be 1', () => {
    expect(calculateEquation("0!")).toBe(1);
  });

  test('1! should be 1', () => {
    expect(calculateEquation("1!")).toBe(1);
  });

  test('2! should be 2', () => {
    expect(calculateEquation("2!")).toBe(2);
  });

  test('3! should be 6', () => {
    expect(calculateEquation("3!")).toBe(6);
  });

  test('5! should be 120', () => {
    expect(calculateEquation("5!")).toBe(120);
  });

  test('1.5! should be 1.3293', () => {
    expect(calculateEquation("1.5!")).toBeCloseTo(1.3293, 4);
  });

  test('-6! should be -720', () => {
    expect(calculateEquation("-6!")).toBe(-720);
  });
});

describe("Percentage", () => {
  test('0% should be 0', () => {
    expect(calculateEquation("0%")).toBe(0);
  });

  test('10% should be 0.1', () => {
    expect(calculateEquation("10%")).toBe(0.1);
  });

  test('100% should be 1', () => {
    expect(calculateEquation("100%")).toBe(1);
  });

  test('25.67% should be 0.2567', () => {
    expect(calculateEquation("25.67%")).toBe(0.2567);
  });

  test('134% should be 1.34', () => {
    expect(calculateEquation("134%")).toBe(1.34);
  });
});

describe('Multiplication', ()=> {
  test('8 * 4 should be 32', () => {
    expect(calculateEquation("8 * 4")).toBe(32);
  })

  test('-4 * 3 should be -12', () => {
    expect(calculateEquation("-4 * 3")).toBe(-12);
  })

  test('0 * 5 should be 0', () => {
    expect(calculateEquation("0 * 5")).toBe(0);
  });

  test('-3 * -5 should be 15', () => {
    expect(calculateEquation("-3*-5")).toBe(15);
  });

  test(' 2.5 * 3.5 should be 8.75', () => {
    expect(calculateEquation("2.5 * 3.5")).toBe(8.75);
  });
})

describe('Power Operations', () => {
  test('2^3 should be 8', () => {
    expect(calculateEquation("2^(3)")).toBe(8);
  });

  test('Negative exponent: 2^-3 should be 0.125', () => {
    expect(calculateEquation("2^(-3)")).toBe(0.125);
  });

  test('Base 0: 0^5 should be 0', () => {
    expect(calculateEquation("0^(5)")).toBe(0);
  });

  test('Exponent 0: 7^0 should be 1', () => {
    expect(calculateEquation("7^(0)")).toBe(1);
  });

  test('Decimal base: 1.5^2 should be 2.25', () => {
    expect(calculateEquation("1.5^(2)")).toBe(2.25);
  });

});