import { View } from 'ol';

import { correctZoomForViewport } from '../useSelectHandler';

describe('useSelectHandler', () => {
  describe('correctZoomForViewport', () => {

    const eventView = new View();

    it('is a number', () => {
      expect(typeof (correctZoomForViewport(eventView, [-1, 1, 1, -1]))).toBe('number');
    });
  })
})
