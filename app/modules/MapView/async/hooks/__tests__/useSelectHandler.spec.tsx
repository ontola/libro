/** @jest-environment jsdom*/
/* eslint-disable @typescript-eslint/no-magic-numbers */

import { View } from 'ol';
import { Extent } from 'ol/extent';

import { getZoomForCluster, zoomOnCluster } from '../useSelectHandler';

describe('useSelectHandler', () => {
  const eventView = new View();
  eventView.setViewportSize([416, 256]);
  const extent = [569905.5836620766, 6813500.752466188, 574946.3309618826, 6817181.378618145] as Extent;
  const testZoom = 12.410464280662433;

  describe('getZoomForCluster', () => {
    it('handles magic', () => {
      expect(getZoomForCluster(eventView, extent)).toBe(testZoom);
    });
  });

  describe('zoomOnCluster', () => {
    it('sets internal state', () => {
      zoomOnCluster(eventView, extent);
      expect(eventView.getCenter()).toStrictEqual([(extent[0] + extent[2]) / 2, (extent[1] + extent[3]) / 2]);
      expect(eventView.getZoom()).toBe(testZoom);
    });
  });
});
/* eslint-enable @typescript-eslint/no-magic-numbers */
