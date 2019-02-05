/**
 * Filter to prevent superfluous unhandled middleware action from going to execActionByIRI
 *
 * Acts as a security filter as well, to prevent cross-site action injections.
 */

import { MiddlewareActionHandler, MiddlewareWithBoundLRS } from 'link-lib';
import { NamedNode } from 'rdflib';

import { getMetaContent } from '../helpers/arguHelpers';

export const website = getMetaContent('website-iri');
export const frontendIRI = NamedNode.find(website!);

const execFilter = () => (): MiddlewareWithBoundLRS => {
  const executableSites = [
    frontendIRI.site(),
  ];

  return (next: MiddlewareActionHandler) => (iri: NamedNode, opts: any): Promise<any> => {
    if (executableSites.includes(iri.site())) {
      return next(iri, opts);
    }

    return Promise.resolve();
  };
};

export default execFilter;
