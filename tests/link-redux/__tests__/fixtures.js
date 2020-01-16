import schema from '@ontologies/schema';
import { mount } from 'enzyme';
import { Property } from 'link-redux';

import argu from '../../../app/ontology/argu';
import {
  loc,
  prop,
  toArr,
} from '../fixtures';

describe('tests', () => {
  describe('link-redux', () => {
    describe('fixtures', () => {
      describe('prop', () => {
        it('should raise without a subject', () => {
          const tree = mount(prop({
            property: schema.name,
            resources: [],
            subject: argu.ns('test'),
          }));
          expect(tree.find(Property)).toHaveProp('label', schema.name);
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
