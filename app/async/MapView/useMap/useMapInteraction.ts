import { MapBrowserEvent } from 'ol';
import { Coordinate } from 'ol/coordinate';
import { click, pointerMove } from 'ol/events/condition';
import Select from 'ol/interaction/Select';
import Map from 'ol/Map';
import { toLonLat } from 'ol/proj';
import { EventHandler, useCallback, useEffect } from 'react';

import getStyle from '../getStyle';

import { ViewProps } from './useCreateMap';
import useHandleSelect, { SelectHandler } from './useHandleSelect';
import useViewChangeHandler from './useViewChangeHandler';

export interface MapCallbacks {
  onMapClick: (newLon: number, newLat: number) => void;
  onMove: EventHandler<any>;
  onSelect: SelectHandler;
  onViewChange: (center: Coordinate, zoom: number) => any;
  onZoom: EventHandler<any>;
}

const useMapInteraction = (
  map: Map | null,
  view: ViewProps,
  callbacks: MapCallbacks,
): [Coordinate?] => {
  const clickHandler = callbacks.onMapClick
    ? (e: MapBrowserEvent) => {
        const [lon, lat] = toLonLat(e.coordinate);
        callbacks.onMapClick(lon, lat);

        return true;
      }
    : () => true;
  const handleMapClick = useCallback(clickHandler, [callbacks.onMapClick]);
  const [handleViewChange, internalCenter] = useViewChangeHandler(view, callbacks);
  const handleSelect = useHandleSelect(callbacks.onSelect);

  useEffect(() => {
    if (map) {
      const select = new Select({
        condition: click,
        style: undefined,
      });
      select.on('select', handleSelect);

      const hover = new Select({
        condition: pointerMove,
        style: getStyle('hoverStyle'),
      });

      map.on('click', handleMapClick);
      map.on('moveend', handleViewChange);

      map.addInteraction(select);
      map.addInteraction(hover);

      return () => {
        map.un('click', handleMapClick);
        map.un('moveend', handleViewChange);

        map.removeInteraction(select);
        map.removeInteraction(hover);

        map.setTarget(undefined);
      };
    }

    return () => undefined;
  }, [map, callbacks, handleMapClick, handleViewChange]);

  return [internalCenter];
};

export default useMapInteraction;
