#!/usr/bin/env node

/**
 * Supported calculator operations:
 * - addition
 * - subtraction
 * - multiplication
 * - division
 * - modulo
 * - power
 * - square root
 */

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    throw new Error('Cannot divide by zero.');
  }

  return a / b;
}

function modulo(a, b) {
  if (b === 0) {
    throw new Error('Cannot divide by zero.');
  }

  return a % b;
}

function power(base, exponent) {
  return base ** exponent;
}

function squareRoot(n) {
  if (n < 0) {
    throw new Error('Cannot calculate square root of a negative number.');
  }

  return Math.sqrt(n);
}

function calculate(operation, a, b) {
  switch (operation) {
    case 'add':
    case '+':
      return add(a, b);
    case 'subtract':
    case '-':
      return subtract(a, b);
    case 'multiply':
    case '*':
      return multiply(a, b);
    case 'divide':
    case '/':
      return divide(a, b);
    case 'modulo':
    case '%':
      return modulo(a, b);
    case 'power':
    case '^':
      return power(a, b);
    case 'squareRoot':
    case 'sqrt':
    case '√':
      return squareRoot(a);
    default:
      throw new Error(
        `Unsupported operation "${operation}". Use add, subtract, multiply, divide, modulo, power, or squareRoot.`,
      );
  }
}

function parseNumber(value, label) {
  const parsed = Number(value);

  if (Number.isNaN(parsed)) {
    throw new Error(`Invalid ${label}: "${value}".`);
  }

  return parsed;
}

function main(argv = process.argv.slice(2)) {
  const [operation, leftValue, rightValue] = argv;
  const unaryOperations = new Set(['squareRoot', 'sqrt', '√']);

  if (!operation || leftValue === undefined || (!unaryOperations.has(operation) && rightValue === undefined)) {
    console.error('Usage: node src/calculator.js <operation> <left> [right]');
    console.error('Operations: add, subtract, multiply, divide, modulo, power, squareRoot');
    process.exitCode = 1;
    return;
  }

  const left = parseNumber(leftValue, 'left operand');
  const normalizedOperation = operation.toLowerCase();
  const result = unaryOperations.has(normalizedOperation)
    ? calculate(normalizedOperation, left)
    : calculate(normalizedOperation, left, parseNumber(rightValue, 'right operand'));

  console.log(result);
}

if (require.main === module) {
  main();
}

module.exports = {
  add,
  subtract,
  multiply,
  divide,
  modulo,
  power,
  squareRoot,
  calculate,
  main,
};
