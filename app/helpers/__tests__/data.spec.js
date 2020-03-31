
import ex from '../../ontology/ex';
import {
  allow,
  filter,
  sort,
} from '../data';

const e = ex.ns('e');
const input = [ex.ns('a'), ex.ns('f'), ex.ns('e'), ex.ns('d'), ex.ns('b')];
const ordered = [ex.ns('a'), ex.ns('b'), ex.ns('d'), ex.ns('e'), ex.ns('f')];

describe('helpers', () => {
  describe('data', () => {
    describe('allow', () => {
      it('should filter by default', () => {
        expect(allow(input, [])).toHaveLength(0);
      });

      it('should let elements through by IRI', () => {
        expect(allow(input, [ex.ns('e')])).toEqual([e]);
      });

      it('should let elements through by regex', () => {
        expect(allow(input, [/e$/])).toEqual([e]);
      });
    });

    describe('filter', () => {
      it('should allow by default', () => {
        expect(filter(input, [])).toHaveLength(input.length);
      });

      it('should filter elements by IRI', () => {
        const result = filter(input, [e]);
        expect(result).toHaveLength(input.length - 1);
        expect(result).not.toContain([e]);
      });

      it('should filter elements by regex', () => {
        const result = filter(input, [/e$/]);
        expect(result).toHaveLength(input.length - 1);
        expect(result).not.toContain([e]);
      });
    });

    describe('sort', () => {
      it('should sort the elements', () => {
        expect(input.sort(sort([]))).toEqual(ordered);
      });

      it('should allow changing the order', () => {
        const expected = [
          ex.ns('d'),
          ex.ns('b'),
          ex.ns('a'),
          ex.ns('e'),
          ex.ns('f'),
        ];
        expect(input.sort(sort(['d', 'b']))).toEqual(expected);
      });
    });
  });
});
