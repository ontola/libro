/**
 * @jest-environment jsdom
 */
import * as schema from '@ontologies/schema';
import * as sh from '@ontologies/shacl';

import { renderLinkedHook } from '../../../../../../tests/test-utils-hooks';
import example from '../../../../Core/ontology/example';
import { useFieldHashes } from '../useFieldHashes';

const shapeWithSingleField = (id: string) => ({
  '@id': id,
  [sh.path.toString()]: schema.name,
});

describe('useFieldHashes', () => {

  describe('without backing data', () => {
    it('returns an empty map when no fields are present', async () => {
      const { result } = await renderLinkedHook(() => useFieldHashes([]), {});

      expect(result.current.size).toBe(0);
    });

    it('returns map of hashed keys with one element', async () => {
      const { result } = await renderLinkedHook(() => useFieldHashes([example.ns('field')]), {});

      expect(result.current.size).toBe(0);
    });
  });

  describe('with backing data', () => {
    it('returns map of hashed keys with one element', async () => {
      const field = example.ns('field');
      const data = shapeWithSingleField(field.value);

      const { result } = await renderLinkedHook(() => useFieldHashes([field]), data);
      const hashedPath = btoa(schema.name.value);

      expect(result.current.size).toBe(1);
      expect(result.current.get(hashedPath)).toBe(field);
    });

    it('memoizes the result', async () => {
      const data = shapeWithSingleField(example.ns('field').value);

      let props = [example.ns('field')];

      const { result, rerender } = await renderLinkedHook(() => useFieldHashes(props), data);
      const firstMap = result.current;

      props = [example.ns('field')];
      rerender();

      const secondMap = result.current;

      expect(firstMap).toBe(secondMap);
    });

    it('updates the map when a second field is added', async () => {
      const data = shapeWithSingleField(example.ns('field').value);

      let props = [example.ns('field')];

      const { result, rerender } = await renderLinkedHook(() => useFieldHashes(props), data);
      const firstMap = result.current;

      props = [example.ns('field')];
      rerender();

      const secondMap = result.current;

      expect(firstMap).toBe(secondMap);
    });
  });

});
