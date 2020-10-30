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
import { fromLonLat } from 'ol/proj';
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
  f.setId(placement.value || placement.id);
  const { hoverStyle, style } = getStyles(image.value, theme);
  f.setProperties({
    hoverStyle,
    style,
    zoomLevel,
  });

  return f;
};

const useFeatures = (placements) => {
  const lrs = useLRS();
  const theme = useTheme();

  const [loading, setLoading] = React.useState(true);
  const [memoizedFeatures, setMemoizedFeatures] = React.useState(null);
  const [memoizedCenter, setMemoizedCenter] = React.useState(null);
  const [memoizedDependencies, setDependencies] = React.useState(null);
  const timestamp = useDataInvalidation(memoizedDependencies || []);
  useDataFetching((memoizedDependencies || []).filter(isNamedNode));

  React.useEffect(() => {
    const features = [];
    const dependencies = [];
    const addFeature = (rawFeature, index) => {
      const feature = !loading && featureFromPlacement(lrs, rawFeature, theme);

      const isCenter = index === 0;

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

    const currentlyLoading = memoizedDependencies?.filter(isNamedNode)?.find((resource) => (
      !entityIsLoaded(lrs, resource)
    ));

    if (loading !== currentlyLoading) {
      setLoading(currentlyLoading);
    }
  }, [loading, timestamp, placements]);

  return [memoizedFeatures || [], memoizedCenter, loading];
};

const MapView = ({
  initialLat,
  initialLon,
  initialZoom,
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
        center: resolvedCenter?.getGeometry()?.getCoordinates(),
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

  if (loading || !placementFeatures) {
    return <LoadingCard />;
  }

  return (
    <MapCanvas
      overlayPadding
      layers={layers}
      navigate={navigate}
      overlayPosition={overlayPosition}
      overlayResource={overlayResource}
      view={view}
      onMapClick={onMapClick}
      onMove={onMove}
      onSelect={handleSelect}
      onViewChange={(newCenter, newZoom) => {
        setView({
          center: newCenter,
          zoom: newZoom,
        });
      }}
      onZoom={onZoom}
    />
  );
};

MapView.propTypes = {
  initialLat: PropTypes.number,
  initialLon: PropTypes.number,
  initialZoom: PropTypes.number,
  navigate: PropTypes.func,
  onMapClick: PropTypes.func,
  onMove: PropTypes.func,
  onSelect: PropTypes.func,
  onZoom: PropTypes.func,
  overlayResource: linkType,
  placements: linkType,
};

export default MapView;
