/**
 * Filter to prevent superfluous unhandled middleware action from going to execActionByIRI
 *
 * Acts as a security filter as well, to prevent cross-site action injections.
 */

import rdf from '@ontologies/core';
import {
  MiddlewareActionHandler,
  MiddlewareWithBoundLRS,
  SomeNode,
} from 'link-lib';

const execFilter = (websiteIRI: string) => (): MiddlewareWithBoundLRS => {
  const executableSites = [
    rdf.namedNode(new URL(websiteIRI).origin),
  ].map((t) => rdf.id(t));

  return (next: MiddlewareActionHandler) => (iri: SomeNode, opts: any): Promise<any> => {
    const origin = new URL(iri.value).origin;

    if (!origin || origin === 'null') {
      throw new Error(`IRI has no origin (was ${iri.value})`);
    }

    if (executableSites.includes(rdf.id(rdf.namedNode(origin)))) {
      return next(iri, opts);
    }

    return Promise.resolve();
  };
};

export default execFilter;
