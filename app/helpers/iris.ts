import { isDifferentOrigin as checkOrigin } from 'link-lib';
import { NamedNode } from 'rdflib';

import { frontendPathname } from '../middleware/app';

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
    const t = typeof iri === 'string' ? new URL(iri, window.location.origin).toString() : iri;
    return checkOrigin(t);
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
      return new URL(pathString, window.location.origin).href;
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

      return !new URL(url, window.location.origin).pathname.startsWith(frontendPathname);
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
      const bugNormalized = iriString.replace(`${window.location.origin}//`, `${window.location.origin}/`);
      const iri = iriString && new URL(bugNormalized, window.location.origin);
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
