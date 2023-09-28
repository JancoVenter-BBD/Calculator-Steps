import { calculateEquation } from './script';

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

