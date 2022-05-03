import rdf, {
  BlankNode,
  NamedNode,
  Node,
  Quad,
  isBlankNode,
  isNamedNode,
} from '@ontologies/core';
import { doc } from '@rdfdev/iri';
import { DataSlice } from 'link-lib/dist-types/store/StructuredStore';

import { sliceToQuads } from '../../../../helpers/seed';
import { NdEmpJsonParser } from '../../../../helpers/transformers/empndjson';

import { websiteRelativePath } from './iri';
import { toWrappedDataDocument } from './quadsToDataObject';
import { ResourceType, SubResource } from './types';

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

const documentsInSlice = (slice: DataSlice): NamedNode[] => {
  const ids = Object
    .values(slice)
    .map((record) => record._id)
    .filter<NamedNode>(isNamedNode)
    .map(doc);

  return Array.from(new Set(ids));
};

export const subResourcesFromData = (data: string, websiteIRI: string, mapping: Record<string, string>): SubResource[] => {
  const parser = new NdEmpJsonParser();
  const slice = parser.parseString(data, websiteIRI, mapping)[0];
  const quads = sliceToQuads(slice);
  const documents = documentsInSlice(slice);

  return documents.map((document, index) => {
    const value = toWrappedDataDocument(document, quads, websiteIRI);

    return {
      id: index,
      name: `website-${index}`,
      path: websiteRelativePath(document.value, websiteIRI),
      type: ResourceType.RDF,
      value,
    };
  });
};
