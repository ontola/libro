import { createNS } from '@ontologies/core';

import { frontendIRIStr } from './app';

export const sliceIRI = (iri: string): string => iri.slice(0, iri.endsWith('/') ? -1 : undefined);

const appSlashless = createNS(sliceIRI(frontendIRIStr));

export default {
  ns: appSlashless,
};
