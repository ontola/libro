import {
  Node,
  Quadruple,
} from '@ontologies/core';
import RDFIndex from 'link-lib/dist-types/store/RDFIndex';

import parseToGraph from '../../lib/parseToGraph';

export const parseSource = (source: string, websiteIRI: string): [Node[], Quadruple[]] => {
  const graphs = parseToGraph(source, websiteIRI);
  const nextResources = graphs.flatMap(([subject]) => subject);
  const data = graphs.flatMap(([_, rdfIndex]) => (rdfIndex as RDFIndex).quads);

  return [nextResources, data];
};
