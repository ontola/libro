/**
 * Helpers to aid in IRI processing.
 * @param {Window} window The window object.
 * @returns {Object} Window-bound functions object.
 */
export function iris(window) {
  return {
    currentURL() {
      if (typeof window !== 'undefined') {
        return window.location.href;
      }
      return undefined;
    },

    /**
     * Returns only the pathname and beyond. Useful for relative navigation.
     * @param {string} iriString The IRI to process.
     * @returns {undefined|string} The pathname or undefined if invalid.
     */
    retrievePath(iriString) {
      const iri = iriString && new URL(iriString);
      return iri && iri.pathname + iri.search;
    },
  };
}

const windowBound = iris(typeof window !== 'undefined' ? window : undefined);

export const {
  currentURL,
  retrievePath,
} = windowBound;

export default windowBound.retrievePath;
