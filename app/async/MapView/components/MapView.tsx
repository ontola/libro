import { fromLonLat } from 'ol/proj';
import React, { useMemo } from 'react';

import { LoadingCard } from '../../../components/Loading';
import { PropTypes } from '../../../containers/MapView';
import { getMetaContent } from '../../../helpers/arguHelpers';
import { useFeatures } from '../hooks/useFeatures';
import { usePlacementIds } from '../hooks/usePlacementIds';

import MapCanvas from './MapCanvas';

export const MapView: React.FC<PropTypes> = ({
  initialLat,
  initialLon,
  initialZoom,
  large,
  navigate,
  onMapClick,
  onMove,
  onSelect,
  onZoom,
  overlayResource,
  placements: placementIds,
}) => {
  const mapboxTileURL = useMemo(
    () => getMetaContent('mapboxTileURL'),
    [],
  );

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

    if (feature?.markAsVisited) {
      feature.markAsVisited(feature);
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

  if (loading || !placementFeatures || !view || !mapboxTileURL) {
    return <LoadingCard />;
  }

  return (
    <MapCanvas
      overlayPadding
      large={large}
      layers={layers}
      mapboxTileURL={mapboxTileURL}
      navigate={navigate}
      overlayPosition={overlayPosition}
      overlayResource={overlayResource}
      view={view}
      onMapClick={onMapClick}
      onMove={onMove}
      onSelect={handleSelect}
      onViewChange={handleViewChange}
      onZoom={onZoom}
    />
  );
};
