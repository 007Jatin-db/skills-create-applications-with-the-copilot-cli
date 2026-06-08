const calculator = require('../calculator');

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

  it('calculates modulo values', () => {
    expect(calculator.modulo(5, 2)).toBe(1);
    expect(calculator.calculate('modulo', 5, 2)).toBe(1);
    expect(calculator.calculate('%', 20, 6)).toBe(2);
  });

  it('calculates powers', () => {
    expect(calculator.power(2, 3)).toBe(8);
    expect(calculator.calculate('power', 2, 3)).toBe(8);
    expect(calculator.calculate('^', 3, 2)).toBe(9);
  });

  it('calculates square roots', () => {
    expect(calculator.squareRoot(16)).toBe(4);
    expect(calculator.calculate('squareRoot', 16)).toBe(4);
    expect(calculator.calculate('sqrt', 25)).toBe(5);
  });

  it('throws on division by zero and modulo by zero', () => {
    expect(() => calculator.divide(10, 0)).toThrow('Cannot divide by zero.');
    expect(() => calculator.modulo(10, 0)).toThrow('Cannot divide by zero.');
  });

  it('throws on square root of a negative number', () => {
    expect(() => calculator.squareRoot(-1)).toThrow(
      'Cannot calculate square root of a negative number.',
    );
  });

  it('supports operator aliases in calculate', () => {
    expect(calculator.calculate('+', 2, 3)).toBe(5);
    expect(calculator.calculate('-', 10, 4)).toBe(6);
    expect(calculator.calculate('*', 45, 2)).toBe(90);
    expect(calculator.calculate('/', 20, 5)).toBe(4);
  });

  it('throws on unsupported operations', () => {
    expect(() => calculator.calculate('mod', 1, 2)).toThrow(
      'Unsupported operation "mod". Use add, subtract, multiply, divide, modulo, power, or squareRoot.',
    );
  });

  it('parses and runs the CLI entrypoint for binary operations', () => {
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

  it('parses and runs the CLI entrypoint for square root', () => {
    const originalLog = console.log;
    const originalError = console.error;
    const originalExitCode = process.exitCode;
    const logs = [];

    console.log = (...args) => logs.push(args.join(' '));
    console.error = () => {};
    process.exitCode = undefined;

    calculator.main(['sqrt', '16']);

    expect(logs).toEqual(['4']);

    console.log = originalLog;
    console.error = originalError;
    process.exitCode = originalExitCode;
  });
});
