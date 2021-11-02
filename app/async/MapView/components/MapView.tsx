import { fromLonLat } from 'ol/proj';
import React from 'react';

import { LoadingCard } from '../../../components/Loading';
import { PropTypes } from '../../../containers/MapView';
import { useFeatures } from '../hooks/useFeatures';
import { usePlacementIds } from '../hooks/usePlacementIds';

import MapCanvas from './MapCanvas';

const DEFAULT_LAT = 52.1344;
const DEFAULT_LON = 5.1917;
const DEFAULT_ZOOM = 6.8;

export const MapView: React.FC<PropTypes> = ({
  initialLat,
  initialLon,
  initialZoom,
  large,
  mapboxTileURL,
  navigate,
  onMapClick,
  onMove,
  onSelect,
  onZoom,
  overlayResource,
  placements: placementIds,
}) => {
  const [placements, loading] = usePlacementIds(placementIds);
  const [placementFeatures, resolvedCenter] = useFeatures(placements);

  const initialView = (initialLat && initialLon && initialZoom) ? {
    center: fromLonLat([initialLon, initialLat]),
    zoom: initialZoom,
  } : undefined;

  const [view, setView] = React.useState(initialView);

  React.useEffect(() => {
    if (resolvedCenter) {
      const center = resolvedCenter.getGeometry()?.getCoordinates();
      const zoom = resolvedCenter.getProperties()?.zoomLevel;

      if (center && zoom) {
        setView({
          center,
          zoom,
        });
      }
    }
  }, [loading, resolvedCenter?.getId()]);

  const [overlayPosition, setOverlayPosition] = React.useState(undefined);

  const handleSelect = React.useCallback((feature, newCenter) => {
    if (onSelect) {
      onSelect(feature, newCenter);
    }

    if (feature?.getProperties()?.markAsVisited) {
      feature.getProperties().markAsVisited(feature);
    }

    setOverlayPosition(newCenter);
  }, [onSelect]);

  const layers = React.useMemo(() => (
    [{
      clustered: true,
      features: placementFeatures,
    }]
  ), [placementFeatures]);

  const handleViewChange = React.useCallback((newCenter, newZoom) => {
    setView({
      center: newCenter,
      zoom: newZoom,
    });
  }, [setView]);

  if (loading || !mapboxTileURL) {
    return <LoadingCard />;
  }

  const defaultView = {
    center: fromLonLat([DEFAULT_LON, DEFAULT_LAT]),
    zoom: DEFAULT_ZOOM,
  };

  return (
    <MapCanvas
      overlayPadding
      large={large}
      layers={layers}
      mapboxTileURL={mapboxTileURL}
      navigate={navigate}
      overlayPosition={overlayPosition}
      overlayResource={overlayResource}
      view={view ?? defaultView}
      onMapClick={onMapClick}
      onMove={onMove}
      onSelect={handleSelect}
      onViewChange={handleViewChange}
      onZoom={onZoom}
    />
  );
};
