import rdf, { NamedNode } from '@ontologies/core';
import React from 'react';

import { appContext } from '../appContext';

export const useWebsiteIRI = (): NamedNode => {
  const { website } = React.useContext(appContext);
  const websiteIRI = React.useMemo<NamedNode>(() => rdf.namedNode(website), [website]);

  return websiteIRI;
};
