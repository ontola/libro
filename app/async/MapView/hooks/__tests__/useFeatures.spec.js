import { createTheme } from '@material-ui/core/styles';
import { Feature } from 'ol';
import Point from 'ol/geom/Point';
import { fromLonLat } from 'ol/proj';

import {
  addFeature,
  getMarkAsVisited,
  toFeature,
} from '../useFeatures';

describe('useFeatures', () => {
  const image = {
    termType: 'NamedNode',
    value: 'image3',
  };
  const theme = createTheme();

  describe('toFeature', () => {
    const placement = {
      id:'id5',
      image,
      lat: 15,
      lon: 23.3,
      zoomLevel: 6.8,
    };

    it('constructs', () => {
      const feature = toFeature(placement, theme, ['a', 'b', placement.id, 'c']);

      expect(feature.getId()).toBe('id5');
      expect(feature.getGeometry().getCoordinates()).toStrictEqual(fromLonLat([23.3, 15]));
      expect(feature.getProperties().image.value).toBe('image3');
      expect(feature.getProperties().visited).toBe(true);
      expect(feature.getProperties().zoomLevel).toBe(6.8);
      expect(typeof feature.getProperties().style).toBe('function');
      expect(typeof feature.getProperties().hoverStyle).toBe('function');
    });
  });

  describe('getMarkAsVisited', () => {
    const feature1 = new Feature(new Point([2, 3]));
    feature1.setId('feature1');
    const feature2 = new Feature(new Point([4, 5]));
    feature2.setId('feature2');
    const feature3 = new Feature(new Point([7, 9]));
    feature3.setId('feature3');
    feature3.setProperties({ image });

    let visitedFeatures;
    const getVisitedFeatures = () => visitedFeatures;
    const setVisitedFeatures = (features) => { visitedFeatures = features; };

    it('adds a new feature', () => {
      visitedFeatures = [feature1.getId(), feature2.getId()];
      getMarkAsVisited(setVisitedFeatures, getVisitedFeatures, theme)(feature3);

      expect(visitedFeatures).toStrictEqual([feature1.getId(), feature2.getId(), feature3.getId()]);
      expect(feature3.getProperties().visited).toBe(true);
    });

    it('does not add existing feature', () => {
      visitedFeatures = [feature1.getId(), feature3.getId()];
      getMarkAsVisited(setVisitedFeatures, getVisitedFeatures, theme)(feature3);

      expect(visitedFeatures).toStrictEqual([feature1.getId(), feature3.getId()]);
    });
  });

  describe('addFeature', () => {
    const feature = new Feature(new Point([11, 13]));
    const getVisitedFeatures = () => [];
    let center;
    const setMemoizedCenter = (newCenter) => (center = newCenter);
    let visitedFeatures;
    const setVisitedFeatures = (newFeatures) => (visitedFeatures = newFeatures);

    it('adds a Feature', () => {
      const features = [];
      addFeature(
        feature,
        0,
        theme,
        getVisitedFeatures,
        setMemoizedCenter,
        setVisitedFeatures,
        features);

      expect(center.getGeometry().getCoordinates()).toStrictEqual([11, 13]);
      expect(typeof feature.getProperties().markAsVisited).toBe('function');
      expect(features).toStrictEqual([feature]);
    });

    it('does not add undefined', () => {
      const features = [];
      addFeature(
        undefined,
        0,
        theme,
        getVisitedFeatures,
        setMemoizedCenter,
        setVisitedFeatures,
        features);

      addFeature(
        false,
        0,
        theme,
        getVisitedFeatures,
        setMemoizedCenter,
        setVisitedFeatures,
        features);

      expect(features).toStrictEqual([]);
    });
  });
});