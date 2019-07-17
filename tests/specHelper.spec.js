/* global val prop arr result */

import { declareProps, normalizeProps } from './specHelper';

describe('specHelper', () => {
  describe('declareProps', () => {
    describe('with an array', () => {
      declareProps(['val', 'prop', 'arr']);

      it('declares the variables', () => {
        let caught = false;
        try {
          expect(val).not.toBeDefined();
          expect(prop).not.toBeDefined();
          expect(arr).not.toBeDefined();
        } catch (e) {
          caught = true;
        }
        expect(caught).toBeFalsy();
      });
    });

    describe('with an object', () => {
      declareProps({
        arr: ['a', 'b'],
        prop: undefined,
        val: 'test',
      });

      it('declares the variables', () => {
        let caught = false;
        try {
          expect(arr).toEqual(['a', 'b']);
          expect(prop).not.toBeDefined();
          expect(val).toEqual('test');
        } catch (e) {
          caught = true;
        }
        expect(caught).toBeFalsy();
      });
    });
  });

  describe('normalizeProps', () => {
    describe('without params', () => {
      set('subject', () => normalizeProps());
      set('result', () => undefined);

      it('normalizes the props', () => {
        expect(subject).toEqual({});
      });
    });

    describe('with array', () => {
      set('subject', () => normalizeProps(['a', 'b', 'c']));
      set('result', () => ({
        a: undefined,
        b: undefined,
        c: undefined,
      }));

      it('normalizes the props', () => {
        expect(subject).toEqual(result);
      });
    });

    describe('with mixed params', () => {
      set('subject', () => normalizeProps({
        a: 'aa',
        b: 'bb',
      }, 'c', 'd'));
      set('result', () => ({
        a: 'aa',
        b: 'bb',
        c: undefined,
        d: undefined,
      }));

      it('normalizes the props', () => {
        expect(subject).toEqual(result);
      });
    });

    describe('with object', () => {
      set('subject', () => normalizeProps({
        a: 'aa',
        b: 'bb',
        c: 'cc',
      }));
      set('result', () => ({
        a: 'aa',
        b: 'bb',
        c: 'cc',
      }));

      it('normalizes the props', () => {
        expect(subject).toEqual(result);
      });
    });

    describe('with single argument', () => {
      set('subject', () => normalizeProps('a'));
      set('result', () => ({ a: undefined }));

      it('normalizes the props', () => {
        expect(subject).toEqual(result);
      });
    });
  });
});
