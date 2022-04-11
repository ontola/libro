import rdf, {
  BlankNode,
  NamedNode,
  Node,
  Quad,
  isBlankNode,
} from '@ontologies/core';
import { doc } from '@rdfdev/iri';

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

const partitionIdsByDoc = (data: Quad[]):  Map<NamedNode, Set<Node>> => {
  const blankNodes = new Set();
  const documents = new Map<NamedNode, Set<Node>>();

  for (const quad of data) {
    const { subject } = quad;

    if (isBlankNode(subject)) {
      blankNodes.add(subject);
    } else {
      const root = doc(subject);

      if (!documents.has(root)) {
        documents.set(root, new Set());
      }

      documents.get(root)!.add(subject);
    }
  }

  return documents;
};

export const subResourcesFromData = (quads: Quad[], websiteIRI: string): SubResource[] => {
  const documents = partitionIdsByDoc(quads);

  const resources: SubResource[] = [];

  let index = 0;

  for (const [document, _] of documents.entries()) {
    const value = toWrappedDataDocument(document, quads, websiteIRI);

    resources.push({
      id: index += 1,
      name: `website-${index}`,
      path: websiteRelativePath(document.value, websiteIRI),
      type: ResourceType.RDF,
      value,
    });
  }

  return resources;
};
