import { makeViewUpdater } from '../useMap';

describe('useMap', () => {
  describe('viewUpdater', () => {
    let center;
    let zoom;

    const setCenter = (newCenter) => {center = newCenter};
    const setZoom = (newZoom) => {zoom = newZoom};

    const o = {
      onMove:  (coordinate) => {},
      onViewChange : (coordinate, z) => {},
      onZoom : (z) => {},
    }
    const moveSpy = jest.spyOn(o, 'onMove');
    const viewSpy = jest.spyOn(o, 'onViewChange');
    const zoomSpy = jest.spyOn(o, 'onZoom');

    it('handles all input', () => {
      center = [2.6, 3.1];
      zoom = 9.9;
      moveSpy.mockReset();
      viewSpy.mockReset();
      zoomSpy.mockReset();

      const updateView = makeViewUpdater(
        center,
        zoom,
        setCenter,
        setZoom,
        o.onMove,
        o.onViewChange,
        o.onZoom,
      );
      updateView([7.8, 2.9], 6.8);

      expect(moveSpy).toHaveBeenCalled();
      expect(viewSpy).toHaveBeenCalled();
      expect(zoomSpy).toHaveBeenCalled();
      expect(center).toStrictEqual([7.8, 2.9]);
      expect(zoom).toBe(6.8);
    })

    it('handles undefined handlers', () => {
      center = [2.6, 3.1];
      zoom = 9.9;
      moveSpy.mockReset();
      viewSpy.mockReset();
      zoomSpy.mockReset();

      const updateView = makeViewUpdater(
        center,
        zoom,
        setCenter,
        setZoom,
        undefined,
        undefined,
        undefined,
      );
      updateView([7.8, 2.9], 6.8);

      expect(moveSpy).not.toHaveBeenCalled();
      expect(viewSpy).not.toHaveBeenCalled();
      expect(zoomSpy).not.toHaveBeenCalled();
      expect(center).toStrictEqual([7.8, 2.9]);
      expect(zoom).toBe(6.8);
    })

    it('handles undefined new values', () => {
      center = [2.6, 3.1];
      zoom = 9.9;
      moveSpy.mockReset();
      viewSpy.mockReset();
      zoomSpy.mockReset();

      const updateView = makeViewUpdater(
        center,
        zoom,
        setCenter,
        setZoom,
        o.onMove,
        o.onViewChange,
        o.onZoom,
      );
      updateView(undefined, undefined);

      expect(moveSpy).not.toHaveBeenCalled();
      expect(viewSpy).not.toHaveBeenCalled();
      expect(zoomSpy).not.toHaveBeenCalled();
      expect(center).toStrictEqual([2.6, 3.1]);
      expect(zoom).toBe(9.9);
    })
  })
})
