import { describe, it, expect } from 'vitest';
import calculator from '../calculator.js';

describe('calculator operations', () => {
  it('adds numbers', () => {
    expect(calculator.add(2, 3)).toBe(5);
    expect(calculator.add(10, -4)).toBe(6);
  });

  it('subtracts numbers', () => {
    expect(calculator.subtract(10, 4)).toBe(6);
    expect(calculator.subtract(4, 10)).toBe(-6);
  });

  it('multiplies numbers', () => {
    expect(calculator.multiply(45, 2)).toBe(90);
    expect(calculator.multiply(-3, 5)).toBe(-15);
  });

  it('divides numbers', () => {
    expect(calculator.divide(20, 5)).toBe(4);
    expect(calculator.divide(9, 2)).toBe(4.5);
  });

  it('supports operator aliases in calculate', () => {
    expect(calculator.calculate('+', 2, 3)).toBe(5);
    expect(calculator.calculate('-', 10, 4)).toBe(6);
    expect(calculator.calculate('*', 45, 2)).toBe(90);
    expect(calculator.calculate('/', 20, 5)).toBe(4);
  });

  it('throws on division by zero', () => {
    expect(() => calculator.divide(10, 0)).toThrow('Cannot divide by zero.');
    expect(() => calculator.calculate('divide', 10, 0)).toThrow(
      'Cannot divide by zero.',
    );
  });

  it('throws on unsupported operations', () => {
    expect(() => calculator.calculate('mod', 1, 2)).toThrow(
      'Unsupported operation "mod". Use add, subtract, multiply, or divide.',
    );
  });

  it('parses and runs the CLI entrypoint', () => {
    const originalLog = console.log;
    const originalError = console.error;
    const originalExitCode = process.exitCode;
    const logs = [];

    console.log = (...args) => logs.push(args.join(' '));
    console.error = () => {};
    process.exitCode = undefined;

    calculator.main(['add', '2', '3']);

    expect(logs).toEqual(['5']);

    console.log = originalLog;
    console.error = originalError;
    process.exitCode = originalExitCode;
  });
});
