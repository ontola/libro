import rdf, { NamedNode } from '@ontologies/core';

import ontola from '../ontology/ontola';

export const isTableDisplay = (collectionDisplay: NamedNode): boolean => (
  rdf.equals(collectionDisplay, ontola['collectionDisplay/table'])
    || rdf.equals(collectionDisplay, ontola['collectionDisplay/settingsTable'])
);
