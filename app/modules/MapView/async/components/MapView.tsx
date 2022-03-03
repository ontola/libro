import { Coordinate } from 'ol/coordinate';
import { fromLonLat } from 'ol/proj';
import React from 'react';

import { LoadingCard } from '../../../../components/Loading';
import {
  FeatureSelectCallback,
  Layer,
  MapViewChangeCallback,
  MapViewProps,
  ViewProps,
} from '../../components/MapView';
import {
  DEFAULT_LAT,
  DEFAULT_LON,
  DEFAULT_ZOOM, 
} from '../../lib/settings';
import { useFeatures } from '../hooks/useFeatures';
import { usePlacementIds } from '../hooks/usePlacementIds';

import MapCanvas from './MapCanvas';

export const MapView: React.FC<MapViewProps> = ({
  initialLat,
  initialLon,
  initialZoom,
  mapboxTileURL,
  navigate,
  onMapClick,
  onMove,
  onSelect,
  onZoom,
  overlayResource,
  placements: placementIds,
  variant,
}) => {
  const [placements, loading] = usePlacementIds(placementIds);
  const [placementFeatures, resolvedCenter] = useFeatures(placements);

  const initialView: ViewProps | undefined = (initialLat && initialLon && initialZoom) ? {
    center: fromLonLat([initialLon, initialLat]),
    zoom: initialZoom,
  } : undefined;

  const [view, setView] = React.useState<ViewProps | undefined>(initialView);

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

  const [overlayPosition, setOverlayPosition] = React.useState<Coordinate | undefined>(undefined);

  const handleSelect = React.useCallback<FeatureSelectCallback>((feature, newCenter) => {
    if (onSelect) {
      onSelect(feature, newCenter);
    }

    if (feature?.getProperties()?.markAsVisited) {
      feature.getProperties().markAsVisited(feature);
    }

    if (newCenter) {
      setOverlayPosition(newCenter);
    }
  }, [onSelect]);

  const layers = React.useMemo<Layer[]>(() => (
    [{
      clustered: true,
      features: placementFeatures,
    }]
  ), [placementFeatures]);

  const handleViewChange = React.useCallback<MapViewChangeCallback>((newCenter, newZoom) => {
    setView({
      center: newCenter,
      zoom: newZoom,
    });
  }, [setView]);

  if (loading || !mapboxTileURL || (resolvedCenter && !view)) {
    return <LoadingCard />;
  }

  const defaultView = {
    center: fromLonLat([DEFAULT_LON, DEFAULT_LAT]),
    zoom: DEFAULT_ZOOM,
  };

  return (
    <MapCanvas
      overlayPadding
      layers={layers}
      mapboxTileURL={mapboxTileURL}
      navigate={navigate}
      overlayPosition={overlayPosition}
      overlayResource={overlayResource}
      variant={variant}
      view={view ?? defaultView}
      onMapClick={onMapClick}
      onMove={onMove}
      onSelect={handleSelect}
      onViewChange={handleViewChange}
      onZoom={onZoom}
    />
  );
};
