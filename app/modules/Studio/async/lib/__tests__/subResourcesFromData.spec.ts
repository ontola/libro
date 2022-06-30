import rdf, {
  NamedNode,
  Node,
  Quad,
} from '@ontologies/core';
import * as schema from '@ontologies/schema';

import example from '../../../../Core/ontology/example';
import { groupLocalIdsByGlobalIds } from '../subResourcesFromData';

describe('subResourcesFromData', () => {
  describe('groupLocalIdsByGlobalIds', () => {
    it('0', () => {
      const documents: Map<NamedNode, Set<Node>> = new Map();
      const data: Quad[] = [];

      groupLocalIdsByGlobalIds(documents, data);

      expect(documents.size).toEqual(0);
    });

    it('1', () => {
      const first = example.ns('1');
      const a = rdf.blankNode();

      const documents: Map<NamedNode, Set<Node>> = new Map();
      documents.set(first, new Set());
      const data: Quad[] = [
        rdf.quad(first, schema.comment, a),
        rdf.quad(a, schema.text, rdf.literal('test')),
      ];

      groupLocalIdsByGlobalIds(documents, data);

      expect(Array.from(documents.get(first)!)).toContain(a);
    });

    it('2', () => {
      const first = example.ns('1');
      const a = rdf.blankNode();
      const b = rdf.blankNode();

      const documents: Map<NamedNode, Set<Node>> = new Map();
      documents.set(first, new Set());
      const data: Quad[] = [
        rdf.quad(first, schema.comment, a),
        rdf.quad(a, schema.author, b),
        rdf.quad(b, schema.text, rdf.literal('test')),
      ];

      groupLocalIdsByGlobalIds(documents, data);

      expect(Array.from(documents.get(first)!)).toContain(a);
      expect(Array.from(documents.get(first)!)).toContain(b);
    });
  });
});
