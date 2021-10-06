/**
 * Based on https://github.com/nareshbhatia/react-force
 */

/**
 * Returns an error message from any passed object
 */
const errorToString = (error: any) => {
  let result = 'Something went wrong';

  if (error instanceof Error) {
    result = error.message;
  } else if (typeof error === 'string') {
    result = error;
  }

  return result;
};

/**
 * isBlank
 * -------
 * Returns true if string is undefined or null or it's trimmed length is 0.
 * So whitespace-only strings will return true.
 *
 * Examples:
 *   isBlank(undefined)   // => true
 *   isBlank(null)        // => true
 *   isBlank('')          // => true
 *   isBlank('  ')        // => true
 *   isBlank('bob')       // => false
 *   isBlank('  bob  ')   // => false
 */
const isBlank = (str: string | undefined | null): boolean => {
  return !str || str.trim().length === 0;
};

/**
 * isEmpty
 * -------
 * Returns true if string is undefined or null or it's length is 0
 * So whitespace-only strings will return false.
 *
 * Examples:
 *   isEmpty(undefined)   // => true
 *   isEmpty(null)        // => true
 *   isEmpty('')          // => true
 *   isEmpty('  ')        // => false
 *   isEmpty('bob')       // => false
 *   isEmpty('  bob  ')   // => false
 */
const isEmpty = (str: string | undefined | null): boolean => {
  return !str || str.length === 0;
};

export const StringUtils = {
  errorToString,
  isBlank,
  isEmpty,
};
