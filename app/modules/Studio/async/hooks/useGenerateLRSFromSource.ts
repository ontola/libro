import { Node, Quadruple } from '@ontologies/core';

import parseToGraph from '../../lib/parseToGraph';

export const parseSource = (source: string, websiteIRI: string, idempotentNaming = true): [Node[], Quadruple[]] => {
  const graphs = parseToGraph(source, websiteIRI, idempotentNaming);
  const nextResources = graphs.flatMap(([subject]) => subject);
  const data = graphs.flatMap(([_, rdfIndex]) => rdfIndex.quads);

  return [nextResources, data];
};
