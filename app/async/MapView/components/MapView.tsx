import { fromLonLat } from 'ol/proj';
import React from 'react';

import { LoadingCard } from '../../../components/Loading';
import { PropTypes } from '../../../containers/MapView';
import { useFeatures } from '../hooks/useFeatures';

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
  placements,
}) => {
  const [placementFeatures, resolvedCenter, loading] = useFeatures(placements);
  const initialView = (initialLat || initialLon || initialZoom) ? {
    center: (initialLat && initialLon) ? fromLonLat([initialLon, initialLat]) : undefined,
    zoom: initialZoom,
  } : undefined;
  const [view, setView] = React.useState(initialView);
  React.useEffect(() => {
    if (resolvedCenter) {
      setView({
        center: resolvedCenter?.getGeometry()?.getCoordinates() || undefined,
        zoom: resolvedCenter?.getProperties()?.zoomLevel,
      });
    }
  }, [loading, resolvedCenter?.getId()]);
  const [overlayPosition, setOverlayPosition] = React.useState(undefined);
  const handleSelect = React.useCallback((feature, newCenter) => {
    if (onSelect) {
      onSelect(feature, newCenter);
    }

    if (feature?.markAsVisited) {
      feature.markAsVisited();
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

  if (loading || !placementFeatures) {
    return <LoadingCard />;
  }

  return (
    <MapCanvas
      overlayPadding
      large={large}
      layers={layers}
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
