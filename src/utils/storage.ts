/**
 * Saves a new entry to the localstorage.
 *
 * @param {string} key
 * @param {string} value
 */
export function set(key: string, value: string) {
  localStorage.setItem(key, value);
}

/**
 * Retrieves the value stored under a key in the localstorage.
 *
 * @param {string} key
 * @returns {string}
 */
export function get(key: string) {
  return localStorage.getItem(key);
}

/**
 * Removes an item from the localstorage for given key.
 *
 * @param {string} key
 */
export function remove(key: string) {
  localStorage.removeItem(key);
}
