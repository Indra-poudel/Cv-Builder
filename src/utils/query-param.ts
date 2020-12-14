/**
 * Stringify to url with query params.
 *
 * @example
 * stringify('link', { foo: 'bar', goo: 'car', hoo: 'dar' })
 * => 'link?foo=bar&goo=car&hoo=bar'
 *
 * @param {object} value
 * @returns {string}
 */

const stringfy = (object: any) => {
  return Object.keys(object)
    .reduce((previousValue, currentValue) => {
      return object[currentValue] != null ? `${previousValue}${currentValue}=${object[currentValue]}&` : previousValue;
    }, '?')
    .slice(0, -1);
};

const queryParamUtils = {
  stringfy,
};

export default queryParamUtils;
