import { defaultNS } from 'link-lib';

import {
  allow,
  filter,
  sort,
} from '../data';

const e = defaultNS.ex('e');
const input = [defaultNS.ex('a'), defaultNS.ex('f'), defaultNS.ex('e'), defaultNS.ex('d'), defaultNS.ex('b')];
const ordered = [defaultNS.ex('a'), defaultNS.ex('b'), defaultNS.ex('d'), defaultNS.ex('e'), defaultNS.ex('f')];

describe('helpers', () => {
  describe('data', () => {
    describe('allow', () => {
      it('should filter by default', () => {
        expect(allow(input, [])).toHaveLength(0);
      });

      it('should let elements through by IRI', () => {
        expect(allow(input, [defaultNS.ex('e')])).toEqual([e]);
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
          defaultNS.ex('d'),
          defaultNS.ex('b'),
          defaultNS.ex('a'),
          defaultNS.ex('e'),
          defaultNS.ex('f'),
        ];
        expect(input.sort(sort(['d', 'b']))).toEqual(expected);
      });
    });
  });
});
