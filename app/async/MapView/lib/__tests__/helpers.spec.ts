/** @jest-environment jsdom*/
import { Feature } from 'ol';

import { allFeaturesVisited } from '../helpers';

describe('helpers', () => {
  describe('allFeaturesVisited', () => {

    const feature = new Feature();
    feature.setProperties({ visited: false });

    const singleton = new Feature();
    singleton.setProperties({ features: [feature] });

    it('handles', () => {
      expect(allFeaturesVisited(singleton)).toBe(false);
    });
  });
});
