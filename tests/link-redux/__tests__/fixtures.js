import { mount } from 'enzyme';
import { defaultNS } from 'link-lib';
import { Property } from 'link-redux';

import { loc, prop, toArr } from '../fixtures';

describe('tests', () => {
  describe('link-redux', () => {
    describe('fixtures', () => {
      describe('prop', () => {
        it('should raise without a subject', () => {
          const name = defaultNS.schema('name');
          const tree = mount(prop({
            property: name,
            resources: [],
            subject: defaultNS.argu('test'),
          }));
          expect(tree.find(Property)).toHaveProp('label', name);
        });
      });

      describe('loc', () => {
        it('should raise without a subject', () => {
          expect(() => loc({})).toThrowError('No subject nor resources given');
        });
      });

      describe('toArr', () => {
        it('should always return an array', () => {
          expect(toArr(undefined)).toEqual([]);
        });
      });
    });
  });
});
