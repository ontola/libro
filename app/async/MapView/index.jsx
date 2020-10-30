import { useTheme } from '@material-ui/core';
import { isNamedNode } from '@ontologies/core';
import schema from '@ontologies/schema';
import {
  linkType,
  useDataFetching,
  useDataInvalidation,
  useLRS,
} from 'link-redux';
import { Feature } from 'ol';
import Point from 'ol/geom/Point';
import { fromLonLat, toLonLat } from 'ol/proj';
import PropTypes from 'prop-types';
import React from 'react';

import { LoadingCard } from '../../components/Loading';
import { entityIsLoaded } from '../../helpers/data';
import { tryParseFloat } from '../../helpers/numbers';
import { isResource } from '../../helpers/types';
import fa4 from '../../ontology/fa4';
import ontola from '../../ontology/ontola';

import { getStyles } from './helpers';
import MapCanvas from './MapCanvas';

const imageForPlacement = (placement, lrs) => (
  lrs.getResourceProperty(placement, schema.image) || fa4.ns('map-marker')
);

const featureProps = (lrs, placement) => {
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

const featureFromPlacement = (lrs, placement, theme) => {
  const {
    image,
    lat,
    lon,
    zoomLevel,
  } = featureProps(lrs, placement);

  if (!image) {
    return undefined;
  }

  const f = new Feature(new Point(fromLonLat([lon, lat])));
  f.local = placement;
  f.setId(placement.value);
  const { hoverStyle, style } = getStyles(image.value, theme);
  f.setProperties({
    hoverStyle,
    style,
    zoomLevel,
  });

  return f;
};

const useFeatures = (placements, center) => {
  const lrs = useLRS();

  const [loading, setLoading] = React.useState(true);
  const [memoizedFeatures, setMemoizedFeatures] = React.useState([]);
  const [memoizedCenter, setMemoizedCenter] = React.useState(null);
  const [memoizedDependencies, setDependencies] = React.useState([]);
  const timestamp = useDataInvalidation(memoizedDependencies);
  useDataFetching(memoizedDependencies.filter(isNamedNode));
  const theme = useTheme();

  React.useEffect(() => {
    const features = [];
    const dependencies = [];
    const addFeature = (rawFeature, index) => {
      const feature = !loading && featureFromPlacement(lrs, rawFeature, theme);

      const isCenter = rawFeature === center || (!center && index === 0);

      if (feature && isCenter) {
        setMemoizedCenter(feature);
      }

      dependencies.push(rawFeature);
      if (feature) {
        features.push(feature);
      }
    };

    if (placements) {
      placements.forEach(addFeature);
    }
    setDependencies(dependencies);
    setMemoizedFeatures(features);

    const currentlyLoading = memoizedDependencies.filter(isNamedNode).find((resource) => (
      !entityIsLoaded(lrs, resource)
    ));

    if (loading !== currentlyLoading) {
      setLoading(currentlyLoading);
    }
  }, [loading, timestamp, placements]);

  return [memoizedFeatures, memoizedCenter, loading];
};

const MapView = ({
  center,
  navigate,
  onMapClick,
  onSelect,
  onZoom,
  overlayResource,
  placements,
}) => {
  const [placementFeatures, resolvedCenter, loading] = useFeatures(placements, center);
  const [overlayPosition, setOverlayPosition] = React.useState(null);
  const handleSelect = React.useCallback((feature, newCenter) => {
    if (onSelect) {
      onSelect(feature, newCenter);
    }
    setOverlayPosition(newCenter);
  }, [onSelect]);

  if (loading) {
    return <LoadingCard />;
  }

  const [cLon, cLat] = resolvedCenter
    ? toLonLat(resolvedCenter.getGeometry().getCoordinates())
    : [null, null];
  const zoom = resolvedCenter && resolvedCenter.getProperties().zoomLevel;

  return (
    <MapCanvas
      overlayPadding
      initialLat={cLat}
      initialLon={cLon}
      initialZoom={zoom}
      layers={[{
        clustered: true,
        features: placementFeatures,
      }]}
      navigate={navigate}
      overlayPosition={overlayPosition}
      overlayResource={overlayResource}
      onMapClick={onMapClick}
      onSelect={handleSelect}
      onZoom={onZoom}
    />
  );
};

MapView.propTypes = {
  center: linkType,
  navigate: PropTypes.func,
  onMapClick: PropTypes.func,
  onSelect: PropTypes.func,
  onZoom: PropTypes.func,
  overlayResource: linkType,
  placements: linkType,
};

export default MapView;
