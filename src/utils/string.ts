export const interpolate = (str: string, params = {}) => {
  let formattedString = str;

  for (const [key, value] of Object.entries(params)) {
    const val: any = value || '';

    formattedString = formattedString.replace(new RegExp(':' + key, 'gi'), val.toString());
  }

  return formattedString;
};

/**
 * This function helps to change email to email with asterisk
 * exmaple@gmail.com to e*****@gmail.com
 *
 * @param emailString
 */
export const formatEmailWithAsterisk = (emailString: string) => {
  const splitEmail = emailString.split('@');
  const domain = splitEmail[1];
  const name = splitEmail[0];
  return name
    .substring(0, 1)
    .concat(Array(name.length - 1).join('*'))
    .concat('@')
    .concat(domain);
};

/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * convertToString(null)
 * // => ''
 *
 * convertToString(-0)
 * // => '-0'
 *
 * convertToString([1,2])
 * // => '1, 2'
 */
export const convertToString = (value: number | string | Array<string> | Array<number> | null | undefined) => {
  const INFINITY = Infinity;
  if (value == null) return '';

  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value === 'string') return value;
  // In case of array
  if (Array.isArray(value)) {
    // Recursively convert values (susceptible to call stack limits).
    return value.join(', ');
  }
  const result = `${value}`;
  return result === '0' && 1 / value === -INFINITY ? '-0' : result;
};

export const extractContentFromHtml = (html: string) => {
  const span = document.createElement('span');
  span.innerHTML = html;
  return span.textContent || span.innerText || '';
};
