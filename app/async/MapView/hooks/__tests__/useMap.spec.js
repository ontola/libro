import { View } from 'ol';

import { centerChanged } from '../useMap';

describe('useMap', () => {
  describe('centerChanged', () => {
    const center = [2.6, 3.1];
    const zoom = 9.9;

    it('handles all input', () => {
      const view = new View();
      centerChanged(center, zoom, view);
      expect(view.getCenter()).toStrictEqual([2.6, 3.1]);
      expect(view.getZoom()).toBe(9.9);
    })

    it('handles undefined view', () => {
      expect(() => centerChanged(center, zoom, undefined)).not.toThrow();
    })
  })
})
