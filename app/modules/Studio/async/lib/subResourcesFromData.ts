import rdf, {
  BlankNode,
  NamedNode,
  Node,
  Quad,
  isBlankNode,
} from '@ontologies/core';

import { NdEmpJsonParser } from '../../../../helpers/transformers/empndjson';
import { Slice } from '../../../Common/lib/seed';

const findLocalReferrals = (subject: Node, data: Quad[]): Set<BlankNode> => new Set(data
  .filter((q) => rdf.equals(q.subject, subject))
  .map((q) => q.object)
  .filter((id): id is BlankNode => isBlankNode(id)));

const collectLocalNodes = (nodes: Set<BlankNode>, data: Quad[]): Set<BlankNode> => {
  const outgoing = [];

  for (const node of nodes.values()) {
    const referrals = findLocalReferrals(node, data);
    outgoing.push(...referrals);
  }

  return new Set([...nodes, ...outgoing]);
};

export const groupLocalIdsByGlobalIds = (documents: Map<NamedNode, Set<Node>>, data: Quad[]): void => {
  for (const document of documents.keys()) {
    const existing = documents.get(document)!;
    const blankNodes = findLocalReferrals(document, data);
    const resolved = collectLocalNodes(blankNodes, data);
    documents.set(document, new Set([...existing, ...resolved]));
  }
};

export const subResourcesFromData = (data: string, websiteIRI: string, mapping: Record<string, string>): Slice => {
  const parser = new NdEmpJsonParser();

  return parser.parseString(data, websiteIRI, mapping)[0];
};
