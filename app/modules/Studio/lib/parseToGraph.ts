/* eslint-disable unused-imports/no-unused-vars */
import rdf from '@ontologies/core';
import { toGraph } from 'link-lib';
import { ParsedObject } from 'link-lib/dist-types/types';

import '../../../useFactory';

import { evaluate } from './evaluate';
import { normalize } from './normalize';

const parseToGraph = (source: string, websiteIRI: string, idempotentNaming = true): ParsedObject[] => {
  const data = evaluate(source, websiteIRI);
  const normalized = normalize(data, idempotentNaming);

  return normalized.map((obj) => toGraph(obj, undefined, undefined, {
    _ids: {
      ns: (_) => rdf.namedNode('_ids'),
    },
  }));
};

export default parseToGraph;
