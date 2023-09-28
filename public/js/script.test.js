import { calculateEquation } from './script';

describe("Square root", () => {
    test('"√(9)" should result in 3', () => {
        expect(calculateEquation("√(8)")).toBe(3);
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
    // test('"√(-4)" should result in NaN', () => {
        // expect(calculateEquation("√(-4)")).toBe(NaN));
    // });
    test('"√(2)" should result in 1.414', () => {
        expect(calculateEquation("√(2)")).toBe(1.414);
    });
});
