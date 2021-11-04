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
import { toFeature } from '../lib/geometry';

import MapCanvas from './MapCanvas';

export const MapView: React.FC<MapViewProps> = ({
  geometry,
  geometryType,
  initialLat,
  initialLon,
  initialZoom,
  mapboxTileURL,
  navigate,
  onMapClick,
  onMove,
  onSelect,
  onPolygon,
  onZoom,
  overlayResource,
  placements: placementIds,
  variant,
}) => {
  const [placements, loading] = usePlacementIds(placementIds);
  const [placementFeatures, resolvedCenter] = useFeatures(placements);

  const initialView: ViewProps = {
    center: fromLonLat([initialLon ?? DEFAULT_LON, initialLat ?? DEFAULT_LAT]),
    zoom: initialZoom ?? DEFAULT_ZOOM,
  };

  const [view, setView] = React.useState<ViewProps>(initialView);

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

  const geometryFeatures = geometry && geometry.points.length > 0 ? [toFeature(geometry)] : [];
  const layers = React.useMemo<Layer[]>(() => (
    [{
      clustered: true,
      customStyle: true,
      features: placementFeatures,
    },
    {
      clustered: false,
      customStyle: false,
      features: geometryFeatures,
    }]
  ), [placementFeatures, geometryFeatures]);
  const polygonLayer = 1;

  const handleViewChange = React.useCallback<MapViewChangeCallback>((newCenter, newZoom) => {
    setView({
      center: newCenter,
      zoom: newZoom,
    });
  }, [setView]);

  if (loading || !mapboxTileURL || (resolvedCenter && !view)) {
    return <LoadingCard />;
  }

  return (
    <MapCanvas
      overlayPadding
      geometryType={geometryType}
      large={large}
      layers={layers}
      mapboxTileURL={mapboxTileURL}
      navigate={navigate}
      overlayPosition={overlayPosition}
      overlayResource={overlayResource}
      polygonLayer={polygonLayer}
      variant={variant}
      view={view}
      onMapClick={onMapClick}
      onMove={onMove}
      onPolygon={onPolygon}
      onSelect={handleSelect}
      onViewChange={handleViewChange}
      onZoom={onZoom}
    />
  );
};
