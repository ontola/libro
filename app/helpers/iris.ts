import {
  NamedNode,
  SomeTerm,
  isBlankNode,
  isNamedNode,
} from '@ontologies/core';

import { frontendOrigin, frontendPathname } from '../ontology/app';

const FABase = 'http://fontawesome.io/icon/';

export const createCurrentURL = (_window?: Window) => (): string | undefined => {
  if (typeof _window === 'undefined') {
    return undefined;
  }

  return _window.location.href;
};

export function isFontAwesomeIRI(iri: string): boolean {
  return iri.startsWith(FABase);
}

export function normalizeFontAwesomeIRI(stringOrIRI: string | SomeTerm): string {
  const str = typeof stringOrIRI !== 'string' ? stringOrIRI.value : stringOrIRI;

  return isFontAwesomeIRI(str) ? str.split(FABase).pop()! : str;
}

export const sequenceFilter = /^http:\/\/www\.w3\.org\/1999\/02\/22-rdf-syntax-ns#_[\d]+$/;

export const isDifferentOrigin = (originIRI: string | any): boolean => {
  const href = typeof originIRI === 'string' ? new URL(originIRI, frontendOrigin).toString() : originIRI;

  if (isBlankNode(href) || !href) {
    return false;
  }

  const origin = isNamedNode(href) ? href.value : href;

  return !origin.startsWith(frontendOrigin + '/');
};

/**
 * @param {string} pathString The path to process, e.g. `/path`.
 * @returns {undefined|string} The fully qualified URL.
 */
export const expandPath = (pathString: string | undefined): string | undefined => {
  if (!pathString) { return undefined; }

  return new URL(pathString, frontendOrigin).href;
};

export const isLocalAnchor = (iriString: string): boolean => iriString === '#';

export const isDifferentWebsite = (iri: string | NamedNode | URL): boolean => {
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
};

/**
 * Returns only the pathname and beyond. Useful for relative navigation.
 * @param {string|NamedNode} iri The IRI to process.
 * @returns {undefined|string} The pathname or undefined if invalid.
 */
export const retrievePath = (iri: NamedNode | string): string | undefined => {
  const iriString = typeof iri === 'string' ? iri : iri.value;

  if (isLocalAnchor(iriString)) {
    return iriString;
  }

  // TODO: https://github.com/linkeddata/rdflib.js/issues/265
  const bugNormalized = iriString.replace(`${frontendOrigin}//`, `${frontendOrigin}/`);
  const url = iriString && new URL(bugNormalized, frontendOrigin);

  return url && url.pathname + url.search + url.hash;
};

export const currentURL = createCurrentURL(typeof window !== 'undefined' ? window : undefined!);

export default retrievePath;
