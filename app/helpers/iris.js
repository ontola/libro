import { isDifferentOrigin as checkOrigin } from 'link-lib';

const FABase = 'http://fontawesome.io/icon/';

export function isFontAwesomeIRI(iri) {
  return iri.startsWith(FABase);
}

export function normalizeFontAwesomeIRI(stringOrIRI) {
  const string = typeof stringOrIRI !== 'string' ? stringOrIRI.value : stringOrIRI;

  return isFontAwesomeIRI(string) ? string.split(FABase).pop() : string;
}

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
     * @param {string} pathString The path to process, e.g. `/path`.
     * @returns {undefined|string} The fully qualified URL.
     */
    expandPath(pathString) {
      if (!pathString) return undefined;
      return new URL(pathString, window.location.origin).href;
    },

    isDifferentOrigin(iri) {
      const t = typeof iri === 'string' ? new URL(iri, window.location.origin).toString() : iri;
      return checkOrigin(t);
    },

    /**
     * Returns only the pathname and beyond. Useful for relative navigation.
     * @param {string} iriString The IRI to process.
     * @returns {undefined|string} The pathname or undefined if invalid.
     */
    retrievePath(iriString) {
      // TODO: https://github.com/linkeddata/rdflib.js/issues/265
      const bugNormalized = iriString.replace(`${window.location.origin}//`, `${window.location.origin}/`);
      const iri = iriString && new URL(bugNormalized, window.location.origin);
      return iri && iri.pathname + iri.search + iri.hash;
    },
  };
}

const windowBound = iris(typeof window !== 'undefined' ? window : undefined);

export const {
  currentURL,
  expandPath,
  isDifferentOrigin,
  retrievePath,
} = windowBound;

export default windowBound.retrievePath;
