
const { calculateEquation, multSym } = require('../public/js/script'); // Import the relevant parts

test('multiply two numbers', () => {
  const equation = '2 * 3';
  const result = calculateEquation(equation);
  expect(result).toBe(6); // Verify that multiplication works as expected
});

test('multiply with other operations', () => {
  const equation = '2 + 3 * 4';
  const result = calculateEquation(equation);
  expect(result).toBe(14); // Verify that multiplication is performed before addition
});