import lDiff from 'lodash/difference';
import randomString from 'crypto-random-string';

export const excludeFrom = (fields, exclude) => lDiff(fields, exclude);

export const capitalize = (val) => {
  if (typeof val !== 'string') val = '';
  return val.charAt(0).toUpperCase() + val.substring(1);
};

/**
 * generate a cryptographically safe random string
 * @param {number} length : length of random string to be generated
 */
export const generateRandomString = (length = 10, option = {}) =>
  randomString({ length, ...option });
