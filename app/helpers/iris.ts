import { BlankNode, NamedNode } from 'rdflib';

import { frontendOrigin, frontendPathname } from '../middleware/app';

const FABase = 'http://fontawesome.io/icon/';

export function isFontAwesomeIRI(iri: string) {
  return iri.startsWith(FABase);
}

export function normalizeFontAwesomeIRI(stringOrIRI: string | NamedNode) {
  const str = typeof stringOrIRI !== 'string' ? stringOrIRI.value : stringOrIRI;

  return isFontAwesomeIRI(str) ? str.split(FABase).pop() : str;
}

/**
 * Helpers to aid in IRI processing.
 * @param {Window} window The window object.
 * @returns {Object} Window-bound functions object.
 */
export function iris(window: Window) {
  const isDifferentOrigin = (iri: string | any): boolean => {
    const href = typeof iri === 'string' ? new URL(iri, frontendOrigin).toString() : iri;

    if (href instanceof BlankNode) {
      return false;
    }
    const origin = href instanceof NamedNode ? href.value : href;

    return !origin.startsWith(frontendOrigin + '/');
  };

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
    expandPath(pathString: string | undefined) {
      if (!pathString) { return undefined; }
      return new URL(pathString, frontendOrigin).href;
    },

    isLocalAnchor(iriString: string) {
      return iriString === '#';
    },

    isDifferentOrigin,

    isDifferentWebsite(iri: string | NamedNode | URL) {
      if (isDifferentOrigin(iri)) {
        return true;
      }

      let url: string | NamedNode | URL = iri;
      if (typeof url !== 'string') {
        if (url instanceof URL) {
          url = url.toString();
        } else {
          url = url.value;
        }
      }

      return !new URL(url, frontendOrigin).pathname.startsWith(frontendPathname);
    },

    /**
     * Returns only the pathname and beyond. Useful for relative navigation.
     * @param {string} iriString The IRI to process.
     * @returns {undefined|string} The pathname or undefined if invalid.
     */
    retrievePath(iriString: string) {
      if (isLocalAnchor(iriString)) {
        return iriString;
      }
      // TODO: https://github.com/linkeddata/rdflib.js/issues/265
      const bugNormalized = iriString.replace(`${frontendOrigin}//`, `${frontendOrigin}/`);
      const iri = iriString && new URL(bugNormalized, frontendOrigin);
      return iri && iri.pathname + iri.search + iri.hash;
    },
  };
}

const windowBound = iris(typeof window !== 'undefined' ? window : undefined!);

export const {
  currentURL,
  expandPath,
  isDifferentWebsite,
  isLocalAnchor,
  retrievePath,
} = windowBound;

export default windowBound.retrievePath;
