import rdf from '@ontologies/core';
import { MiddlewareActionHandler, SomeNode } from 'link-lib';

import libro from '../modules/Core/ontology/libro';

declare global {
  interface Window {
    _paq: any | undefined;
  }
}

const analyticsMiddleware = () => () =>
  (next: MiddlewareActionHandler) => (iri: SomeNode, opts: unknown): Promise<any> => {
    if (rdf.id(iri) === rdf.id(libro.actions.navigation.push)
      || rdf.id(iri) === rdf.id(libro.actions.navigation.pop)) {
      if (typeof window !== 'undefined' && window._paq) {
        window._paq.push(['setCustomUrl', window.location.toString()]);
        window._paq.push(['setDocumentTitle', window.document.title]);
        window._paq.push(['trackPageView']);

        return next(iri, opts);
      }
    }

    return next(iri, opts);
  };

export default analyticsMiddleware;
