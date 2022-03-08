/** @jest-environment jsdom*/

import { Feature } from 'ol';

import { allFeaturesVisited, featureCount } from '../helpers';

describe('helpers', () => {
  const featureUnvisited = new Feature();
  featureUnvisited.setProperties({ visited: false });

  const featureVisited = new Feature();
  featureVisited.setProperties({ visited: true });

  const singleUnvisited = new Feature();
  singleUnvisited.set('features',  [featureUnvisited] );

  const singleVisited = new Feature();
  singleVisited.set('features',  [featureVisited] );

  const featureMix = new Feature();
  featureMix.set('features',  [featureVisited, featureUnvisited] );

  describe('featureCount', () => {
    it('handles correct input', () => {
      expect(featureCount(singleVisited)).toBe(1);
      /* eslint-disable-next-line @typescript-eslint/no-magic-numbers */
      expect(featureCount(featureMix)).toBe(2);
    });
  });

  describe('allFeaturesVisited', () => {
    it('handles correct input', () => {
      expect(allFeaturesVisited(singleUnvisited)).toBe(false);
      expect(allFeaturesVisited(singleVisited)).toBe(true);
      expect(allFeaturesVisited(featureMix)).toBe(false);
    });
  });
});
