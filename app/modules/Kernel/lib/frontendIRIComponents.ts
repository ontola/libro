import rdf, { NamedNode } from '@ontologies/core';

import { getMetaContent } from './dom';

export const website = __TEST__
  ? 'https://app.argu.co/freetown'
  : getMetaContent('website') ?? 'https://example.com';
export const frontendIRI: NamedNode = rdf.namedNode(website!);
export const frontendIRIStr = frontendIRI.value;
export const frontendPathname = new URL(frontendIRIStr).pathname;
export const frontendOrigin = new URL(frontendIRIStr).origin;
