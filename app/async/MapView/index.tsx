import { useTheme } from '@material-ui/core';
import { isNamedNode, isNode } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import { SomeNode } from 'link-lib';
import {
  LinkReduxLRSType,
  useDataFetching,
  useDataInvalidation,
  useLRS,
} from 'link-redux';
import { Feature } from 'ol';
import Point from 'ol/geom/Point';
import { fromLonLat } from 'ol/proj';
import React from 'react';

import { LoadingCard } from '../../components/Loading';
import { Placement, PropTypes } from '../../containers/MapView';
import { entityIsLoaded } from '../../helpers/data';
import { tryParseFloat } from '../../helpers/numbers';
import { isResource } from '../../helpers/types';
import fa4 from '../../ontology/fa4';
import ontola from '../../ontology/ontola';

import { getStyles } from './helpers';
import MapCanvas from './MapCanvas';

const imageForPlacement = (placement: SomeNode, lrs: LinkReduxLRSType) => (
  lrs.getResourceProperty(placement, schema.image) || fa4.ns('map-marker')
);

const featureProps = (lrs: LinkReduxLRSType, placement: SomeNode | Placement) => {
  if (!isResource(placement)) {
    return placement;
  }

  const image = imageForPlacement(placement, lrs);
  const lat = tryParseFloat(lrs.getResourceProperty(placement, schema.latitude));
  const lon = tryParseFloat(lrs.getResourceProperty(placement, schema.longitude));
  const zoomLevel = tryParseFloat(lrs.getResourceProperty(placement, ontola.zoomLevel));

  return {
    image,
    lat,
    lon,
    zoomLevel,
  };
};

const featureFromPlacement = (lrs: LinkReduxLRSType, placement: SomeNode | Placement, theme: any) => {
  const {
    image,
    lat,
    lon,
    zoomLevel,
  } = featureProps(lrs, placement);

  if (!image) {
    return undefined;
  }

  const f = new Feature(new Point(fromLonLat([lon!, lat!])));
  f.setId(isNode(placement) ? placement.value : placement.id);
  const { hoverStyle, style } = getStyles(image.value, theme);
  f.setProperties({
    hoverStyle,
    style,
    zoomLevel,
  });

  return f;
};

type FeatureSet = [Array<Feature<Point>>, Feature<Point> | null, boolean];

const useFeatures = (placements: Array<SomeNode | Placement>): FeatureSet => {
  const lrs = useLRS();
  const theme = useTheme();

  const [loading, setLoading] = React.useState(true);
  const [memoizedFeatures, setMemoizedFeatures] = React.useState<Array<Feature<Point>> | null>(null);
  const [memoizedCenter, setMemoizedCenter] = React.useState<Feature<Point> | null>(null);
  const [memoizedDependencies, setDependencies] = React.useState<SomeNode[] | null>(null);
  const timestamp = useDataInvalidation(memoizedDependencies || []);
  useDataFetching((memoizedDependencies || []).filter(isNamedNode));

  React.useEffect(() => {
    const features: Array<Feature<Point>> = [];
    const dependencies: SomeNode[] = [];
    const addFeature = (rawFeature: SomeNode | Placement, index: number) => {
      const feature = !loading && featureFromPlacement(lrs, rawFeature, theme);

      const isCenter = index === 0;

      if (feature && isCenter) {
        setMemoizedCenter(feature);
      }

      if (isNamedNode(rawFeature)) {
        dependencies.push(rawFeature);
      }
      if (feature) {
        features.push(feature);
      }
    };

    if (placements) {
      placements.forEach(addFeature);
    }
    setDependencies(dependencies);
    setMemoizedFeatures(features);

    const currentlyLoading = !!dependencies?.find((resource) => (
      !entityIsLoaded(lrs, resource)
    ));

    if (loading !== currentlyLoading) {
      setLoading(currentlyLoading);
    }
  }, [loading, timestamp, placements]);

  return [memoizedFeatures || [], memoizedCenter, loading];
};

const MapView: React.FC<PropTypes> = ({
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
  const initialView = (initialLat || initialLon || initialZoom) && {
    center: (initialLat && initialLon) ? fromLonLat([initialLon, initialLat]) : null,
    zoom: initialZoom,
  };
  const [view, setView] = React.useState(initialView);
  React.useEffect(() => {
    if (resolvedCenter) {
      setView({
        center: resolvedCenter?.getGeometry()?.getCoordinates() || null,
        zoom: resolvedCenter?.getProperties()?.zoomLevel,
      });
    }
  }, [loading, resolvedCenter?.getId()]);
  const [overlayPosition, setOverlayPosition] = React.useState(null);
  const handleSelect = React.useCallback((feature, newCenter) => {
    if (onSelect) {
      onSelect(feature, newCenter);
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

export default MapView;
