import { MapBrowserEvent, Map as OLMap } from 'ol';
import { Coordinate } from 'ol/coordinate';
import React, { Dispatch, SetStateAction } from 'react';

import {
  MapMoveCallback,
  MapViewChangeCallback,
  MapZoomCallback,
  ViewProps,
} from '../../components/ControlledMap';

export type ViewUpdater = (newCenter: Coordinate | undefined, newZoom: number | undefined) => void;
export type ViewChangeHandler = (e: MapBrowserEvent) => void;

export const makeViewUpdater = (
  center: Coordinate,
  zoom: number,
  setCenter: Dispatch<SetStateAction<Coordinate>>,
  setZoom: Dispatch<SetStateAction<number>>,
  onMove?: MapMoveCallback,
  onViewChange?: (center: Coordinate, zoom: number) => any,
  onZoom?: MapZoomCallback,
): ViewUpdater => (newCenter: Coordinate | undefined, newZoom: number | undefined) => {
  if (newCenter && newCenter !== center) {
    if (onMove) {
      onMove(newCenter);
    }

    setCenter(newCenter);
  }

  if (newZoom && newZoom !== zoom) {
    if (onZoom) {
      onZoom(newZoom);
    }

    setZoom(newZoom);
  }

  if (newCenter && newZoom && onViewChange) {
    onViewChange(newCenter, newZoom);
  }
};

const createViewChangeHandler = (updateView: ViewUpdater): ViewChangeHandler => (e: MapBrowserEvent) => {
  const newCenter = e.map.getView().getCenter();
  const newZoom = e.map.getView().getZoom();

  updateView(newCenter, newZoom);
};

const useViewHandlers = (
  view: ViewProps,
  map?: OLMap,
  onMove?: MapMoveCallback,
  onViewChange?: MapViewChangeCallback,
  onZoom?: MapZoomCallback,
): number => {
  const [center, setCenter] = React.useState<Coordinate>(view.center);
  const [zoom, setZoom] = React.useState<number>(view.zoom);

  React.useEffect(() => {
    const viewChangeHandler = createViewChangeHandler(makeViewUpdater(
      center,
      zoom,
      setCenter,
      setZoom,
      onMove,
      onViewChange,
      onZoom,
    ));

    if (map && viewChangeHandler) {
      map.on('moveend', viewChangeHandler);
    }

    return () => {
      if (map && viewChangeHandler) {
        map.un('moveend', viewChangeHandler);
      }
    };
  }, [!!map, center, zoom, onMove, onViewChange, onZoom, setCenter, setZoom]);

  return zoom;
};

export default useViewHandlers;
