/**
 * Hard redirect to the given location.
 *
 * @param {string} location
 */
export const redirect = (location: string) => {
  window && window.location.assign(location);
};
