/**
 * Helpers to aid in IRI processing.
 */

/**
 * Returns only the pathname and beyond. Useful for relative navigation.
 * @param {string} iriString The IRI to process.
 * @returns {undefined|string} The pathname or undefined if invalid.
 */
export function retrievePath(iriString) {
  const iri = iriString && new URL(iriString);
  return iri && iri.pathname + iri.search;
}
