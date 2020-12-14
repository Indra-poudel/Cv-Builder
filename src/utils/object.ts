/**
 * Check if object is empty or not.
 *
 * @param {Object} object
 */
export const isObjectEmpty = (object: Object) => {
  return !object || (Object.entries(object).length === 0 && object.constructor === Object);
};

// transform to array
export const transformToArray = (object: any) => {
  return Object.keys(object).map((objectKey) => object[objectKey]);
};
