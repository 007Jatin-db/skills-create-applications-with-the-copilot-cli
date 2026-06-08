#!/usr/bin/env node

/**
 * Supported calculator operations:
 * - addition
 * - subtraction
 * - multiplication
 * - division
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
    default:
      throw new Error(
        `Unsupported operation "${operation}". Use add, subtract, multiply, or divide.`,
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

  if (!operation || leftValue === undefined || rightValue === undefined) {
    console.error('Usage: node src/calculator.js <operation> <left> <right>');
    console.error('Operations: add, subtract, multiply, divide');
    process.exitCode = 1;
    return;
  }

  const left = parseNumber(leftValue, 'left operand');
  const right = parseNumber(rightValue, 'right operand');
  const result = calculate(operation.toLowerCase(), left, right);

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
  calculate,
  main,
};
