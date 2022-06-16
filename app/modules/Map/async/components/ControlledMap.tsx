import { fromLonLat } from 'ol/proj';
import React from 'react';

import { LoadingCard } from '../../../../components/Loading';
import {
  ControlledMapProps,
  MapViewChangeCallback,
  ViewProps,
} from '../../components/ControlledMap';
import {
  DEFAULT_LAT,
  DEFAULT_LON,
  DEFAULT_ZOOM,
} from '../../lib/settings';

import MapCanvas from './MapCanvas';

const defaultView = {
  center: fromLonLat([DEFAULT_LON, DEFAULT_LAT]),
  zoom: DEFAULT_ZOOM,
};

const ControllerMap: React.FC<ControlledMapProps> = ({
  initialLat,
  initialLon,
  initialZoom,
  mapboxTileURL,
  view,
  ...otherProps
}) => {
  const initialView: ViewProps = {
    center: fromLonLat([initialLon ?? DEFAULT_LON, initialLat ?? DEFAULT_LAT]),
    zoom: initialZoom ?? DEFAULT_ZOOM,
  };

  const [controlledView, setView] = React.useState<ViewProps>(initialView);

  const handleViewChange = React.useCallback<MapViewChangeCallback>((newCenter, newZoom) => {
    setView({
      center: newCenter,
      zoom: newZoom,
    });
  }, [setView]);

  if (!mapboxTileURL) {
    return <LoadingCard />;
  }

  return (
    <MapCanvas
      mapboxTileURL={mapboxTileURL}
      view={view ?? controlledView ?? defaultView}
      onViewChange={handleViewChange}
      {...otherProps}
    />
  );
};

export default ControllerMap;
