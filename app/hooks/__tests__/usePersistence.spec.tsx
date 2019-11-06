import rdf from '@ontologies/core';

import { NS } from '../../helpers/LinkedRenderStore';
import { cleanup } from '../../test-utils';
import { serializeForStorage } from '../usePersistence';

describe('persistence', () => {
  afterEach(cleanup);

  describe('serialization', () => {
    it('serializes plain strings', () => {
      expect(serializeForStorage('test')).toEqual('"test"');
    });

    it('serializes named nodes', () => {
      const serialized = serializeForStorage(NS.ex('5'));
      expect(serialized).toContain('"termType":"NamedNode"');
      expect(serialized).toContain('"value":"http://example.com/ns#5"');
    });

    it('serializes Literal with datatype string', () => {
      const serialized = serializeForStorage(rdf.literal('test'));

      expect(serialized).toContain('"termType":"Literal"');
      expect(serialized).toContain('"value":"test"');
      expect(serialized).toContain('"datatype":{');
      expect(serialized).toContain('"value":"http://www.w3.org/2001/XMLSchema#string"');
    });

    it('serializes blank nodes', () => {
      const serialized = serializeForStorage(rdf.blankNode('test'));

      expect(serialized).toContain('"termType":"BlankNode"');
      expect(serialized).toContain('"value":"test"');
    });
  });
});
