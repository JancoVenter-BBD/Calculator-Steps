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
    test('"√(2)" should result in 1.4142135624', () => {
        expect(calculateEquation("√(2)")).toBe(1.4142135624);
    });
    test('"√(0.4)" should result in 0.632455532', () => {
      expect(calculateEquation("√(0.4)")).toBe(0.632455532);
    });
    test('"√(-(-4))" should result in 2', () => {
      expect(calculateEquation("√(-(-4))")).toBe(2);
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

describe("BODMAS chain operation", () => {
  test('"2^((2+2)×3!)/(4*2)" should result in 2097152', () => {
    expect(calculateEquation("2^((2+2)×3!)/(4*2)")).toBe(2097152);
  });
});

