/** @jest-environment jsdom*/
/* eslint-disable @typescript-eslint/no-magic-numbers */

import { createTheme } from '@mui/material/styles';
import { NamedNode } from '@ontologies/core';
import { fromLonLat } from 'ol/proj';

import { toFeature } from '../useFeatures';

describe('useFeatures', () => {
  const image = {
    termType: 'NamedNode',
    value: 'image3',
  } as NamedNode;
  const theme = createTheme();
  const placement = {
    id: 'id5',
    image,
    lat: 15,
    lon: 23.3,
    zoomLevel: 6.8,
  };
  const feature = toFeature(placement, theme);

  describe('toFeature', () => {
    it('constructs', () => {
      expect(feature.getId()).toBe('id5');
      expect(feature.getGeometry()!.getCoordinates()).toStrictEqual(fromLonLat([23.3, 15]));
      expect(feature.getProperties().image.value).toBe('image3');
      expect(typeof feature.getProperties().visited).toBe('boolean');
      expect(feature.getProperties().zoomLevel).toBe(6.8);
      expect(typeof feature.getProperties().style).toBe('function');
      expect(typeof feature.getProperties().hoverStyle).toBe('function');
      expect(typeof feature.getProperties().markAsVisited).toBe('function');
    });
  });

  describe('createVisitedMarker', () => {
    it('marks as visited',  () => {
      expect(feature.getProperties().visited).toBe(false);
      expect(sessionStorage.getItem(`${feature.getId()}.isVisited`)).not.toBe('true');
      feature.getProperties().markAsVisited(feature);
      expect(feature.getProperties().visited).toBe(true);
      expect(sessionStorage.getItem(`${feature.getId()}.isVisited`)).toBe('true');
    });
  });
});
