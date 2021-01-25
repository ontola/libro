import { Coordinate } from 'ol/coordinate';
import MapEvent from 'ol/MapEvent';
import { useCallback, useState } from 'react';

import { ViewProps } from './useCreateMap';
import { MapCallbacks } from './useMapInteraction';

const useViewChangeHandler = (
  view: ViewProps,
  {
    onMove,
    onViewChange,
    onZoom,
  }: MapCallbacks,
): [(evt: MapEvent) => void, Coordinate?] => {
  const [internalZoom, setZoom] = useState(view.zoom);
  const [internalCenter, setCenter] = useState<Coordinate | undefined>();

  const viewChangeHandler = useCallback(
    (e) => {
      const newCenter = e.map.getView().getCenter();
      if (newCenter !== internalCenter) {
        if (onMove) {
          onMove(newCenter);
        }
        setCenter(newCenter);
      }
      const newZoom = e.map.getView().getZoom();
      if (newZoom !== internalZoom) {
        if (onZoom) {
          onZoom(newZoom);
        }
        setZoom(newZoom);
      }
      if (onViewChange) {
        onViewChange(newCenter, newZoom);
      }

      return true;
    }, [internalCenter, internalZoom, onMove, onViewChange, onZoom, setCenter, setZoom],
  );

  return [
    viewChangeHandler,
    internalCenter,
  ];
};

export default useViewChangeHandler;
