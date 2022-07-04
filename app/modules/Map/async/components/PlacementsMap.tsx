import { Coordinate } from 'ol/coordinate';
import React from 'react';

import { LoadingCard } from '../../../Common/components/Loading';
import ControlledMap, {
  FeatureSelectCallback,
  Layer,
  ViewProps,
} from '../../components/ControlledMap';
import { PlacementsMapProps } from '../../components/PlacementsMap';
import { useFeatures } from '../hooks/useFeatures';
import { usePlacementIds } from '../hooks/usePlacementIds';

const PlacementsMap: React.FC<PlacementsMapProps> = ({
  initialLat,
  initialLon,
  initialZoom,
  navigate,
  onInteraction,
  onMove,
  onSelect,
  onZoom,
  overlayResource,
  placements: placementIds,
  variant,
}) => {
  const [placements, loading] = usePlacementIds(placementIds);
  const [placementFeatures, resolvedCenter] = useFeatures(placements);

  const [view, setView] = React.useState<ViewProps | undefined>(undefined);

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

  if (loading || (resolvedCenter && !view)) {
    return <LoadingCard />;
  }

  return (
    <ControlledMap
      overlayPadding
      initialLat={initialLat}
      initialLon={initialLon}
      initialZoom={initialZoom}
      layers={layers}
      navigate={navigate}
      overlayPosition={overlayPosition}
      overlayResource={overlayResource}
      variant={variant}
      view={view}
      onInteraction={onInteraction}
      onMove={onMove}
      onSelect={handleSelect}
      onZoom={onZoom}
    />
  );
};

export default PlacementsMap;
