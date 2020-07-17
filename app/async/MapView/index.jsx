import rdf, { isNamedNode } from '@ontologies/core';
import schema from '@ontologies/schema';
import {
  linkType,
  useDataFetching, useDataInvalidation,
  useLRS,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { LoadingCard } from '../../components/Loading';
import { entityIsLoaded } from '../../helpers/data';
import { tryParseFloat } from '../../helpers/numbers';
import { isResource } from '../../helpers/types';
import argu from '../../ontology/argu';

import './Map.scss';
import MapCanvas from './MapCanvas';

const convertPlacement = (lrs, placement) => {
  if (!isResource(placement)) {
    return placement;
  }

  const image = lrs.getResourceProperty(placement, schema.image);
  const lon = lrs.getResourceProperty(placement, schema.longitude);
  const lat = lrs.getResourceProperty(placement, schema.latitude);
  const zoom = lrs.getResourceProperty(placement, argu.zoomLevel);

  return {
    id: placement.value,
    image,
    lat: tryParseFloat(lat),
    lon: tryParseFloat(lon),
    zoom: tryParseFloat(zoom),
  };
};

const useFeatures = (placements, center) => {
  const lrs = useLRS();

  const [loading, setLoading] = React.useState(true);
  const [memoizedFeatures, setMemoizedFeatures] = React.useState([]);
  const [memoizedCenter, setMemoizedCenter] = React.useState(null);
  const [memoizedDependencies, setDependencies] = React.useState([]);
  const timestamp = useDataInvalidation(memoizedDependencies);
  useDataFetching(memoizedDependencies.filter(isNamedNode));

  React.useEffect(() => {
    const features = [];
    const dependencies = [];
    const addFeature = (rawFeature, index) => {
      const feature = convertPlacement(lrs, rawFeature);

      const isCenter = rawFeature === center || (!center && index === 0);

      if (feature && isCenter) {
        setMemoizedCenter(feature);
      }

      dependencies.push(rawFeature);
      features.push(feature);
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
  }, [timestamp, placements]);

  return [memoizedFeatures, memoizedCenter, loading];
};

const MapView = ({
  center,
  navigate,
  onMapClick,
  placements,
}) => {
  const lrs = useLRS();
  const [features, resolvedCenter, loading] = useFeatures(placements, center);
  const [selected, setSelected] = React.useState(null);

  const onSelect = (id) => {
    if (!id) {
      setSelected(null);
    } else {
      setSelected(
        lrs.getResourceProperty(
          id.termType ? id : rdf.namedNode(id),
          argu.placeable
        )
      );
    }
  };

  if (loading) {
    return <LoadingCard />;
  }

  return (
    <MapCanvas
      features={features}
      initialLat={resolvedCenter?.lat}
      initialLon={resolvedCenter?.lon}
      initialZoom={resolvedCenter?.zoom}
      navigate={navigate}
      overlayResource={selected}
      onMapClick={onMapClick}
      onSelect={onSelect}
    />
  );
};

MapView.propTypes = {
  center: linkType,
  navigate: PropTypes.func,
  onMapClick: PropTypes.func,
  placements: linkType,
};

export default MapView;
