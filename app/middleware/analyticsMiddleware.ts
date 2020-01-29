import rdf, { createNS, NamedNode } from '@ontologies/core';
import { MiddlewareActionHandler } from 'link-lib';

declare global {
  interface Window {
    _paq: any | undefined;
  }
}

const analyticsMiddleware = () => () => {
  const ontola = createNS('https://ns.ontola.io/');

  return (next: MiddlewareActionHandler) => (iri: NamedNode, opts: any): Promise<any> => {
    if (rdf.id(iri) === rdf.id(ontola('actions/navigation/push'))
      || rdf.id(iri) === rdf.id(ontola('actions/navigation/pop'))) {
      if (typeof window !== 'undefined' && window._paq) {
        window._paq.push(['setCustomUrl', window.location.toString()]);
        window._paq.push(['setDocumentTitle', window.document.title]);
        window._paq.push(['trackPageView']);

        return next(iri, opts);
      }
    }

    return next(iri, opts);
  };
};

export default analyticsMiddleware;
