import { StringUtils } from './StringUtils';

const { errorToString, isBlank, isEmpty } = StringUtils;

describe('errorToString()', () => {
  it('returns error.message for Error objects', () => {
    const errorMessage = 'Network Error';
    expect(errorToString(new Error(errorMessage))).toBe(errorMessage);
  });

  it('returns strings as is', () => {
    const errorMessage = 'Network Error';
    expect(errorToString(errorMessage)).toBe(errorMessage);
  });

  it('returns "Something went wrong" for all other types', () => {
    const errorMessage = 'Something went wrong';
    expect(errorToString({ code: 404, message: 'Not Found' })).toBe(
      errorMessage
    );
  });
});

describe('isBlank()', () => {
  it('returns true for undefined', () => {
    expect(isBlank(undefined)).toBe(true);
  });

  it('returns true for null', () => {
    expect(isBlank(null)).toBe(true);
  });

  it('returns true for zero length string', () => {
    expect(isBlank('')).toBe(true);
  });

  it('returns true for whitespace-only string', () => {
    expect(isBlank('  ')).toBe(true);
  });

  it('returns false for strings with trimmed length > 0', () => {
    expect(isBlank('bob')).toBe(false);
    expect(isBlank('  bob  ')).toBe(false);
  });
});

describe('isEmpty()', () => {
  it('returns true for undefined', () => {
    expect(isEmpty(undefined)).toBe(true);
  });

  it('returns true for null', () => {
    expect(isEmpty(null)).toBe(true);
  });

  it('returns true for zero length string', () => {
    expect(isEmpty('')).toBe(true);
  });

  it('returns false for whitespace-only string', () => {
    expect(isEmpty('  ')).toBe(false);
  });

  it('returns false for strings with trimmed length > 0', () => {
    expect(isEmpty('bob')).toBe(false);
    expect(isEmpty('  bob  ')).toBe(false);
  });
});
