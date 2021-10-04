import { Theme, useTheme } from '@material-ui/core';
import {
  NamedNode,
  isNamedNode,
  isNode, 
} from '@ontologies/core';
import * as schema from '@ontologies/schema';
import { SomeNode } from 'link-lib';
import {
  LinkReduxLRSType,
  useDataFetching,
  useDataInvalidation,
  useLRS,
  useLinkRenderContext, 
} from 'link-redux';
import { Feature } from 'ol';
import Point from 'ol/geom/Point';
import { fromLonLat } from 'ol/proj';
import React from 'react';

import { Placement } from '../../../containers/MapView';
import { entityIsLoaded } from '../../../helpers/data';
import { tryParseFloat } from '../../../helpers/numbers';
import { isResource } from '../../../helpers/types';
import useStoredState from '../../../hooks/useStoredState';
import fa4 from '../../../ontology/fa4';
import ontola from '../../../ontology/ontola';
import { getStyles } from '../lib/helpers';

const imageForPlacement = (placement: SomeNode, lrs: LinkReduxLRSType): NamedNode => (
  lrs.getResourceProperty(placement, schema.image) || fa4.ns('map-marker')
);

const featureProps = (lrs: LinkReduxLRSType, placement: SomeNode | Placement): Placement => {
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

const toFeature = (placement, lat, lon, image, theme, visitedFeatures, zoomLevel) => {
  if (!image || !lat || !lon) {
    return undefined;
  }

  const f = new Feature(new Point(fromLonLat([lon, lat])));

  f.setId(isNode(placement) ? placement.value : placement.id);
  const visited = visitedFeatures.includes(f.getId());
  const { hoverStyle, style } = getStyles(image.value, theme);
  f.setProperties({
    hoverStyle,
    image,
    style,
    visited,
    zoomLevel,
  });

  return f;
};

const featureFromPlacement = (
  lrs: LinkReduxLRSType,
  placement: SomeNode | Placement,
  visitedFeatures: any,
  theme: Theme,
) => {
  const {
    image,
    lat,
    lon,
    zoomLevel,
  } = featureProps(lrs, placement);

  return toFeature(placement, lat, lon, image, theme, visitedFeatures, zoomLevel);
};

type FeatureSet = [Array<Feature<Point>>, Feature<Point> | null, boolean];

export const useFeatures = (placements: Array<SomeNode | Placement>): FeatureSet => {
  const lrs = useLRS();
  const { subject } = useLinkRenderContext();
  const theme = useTheme();

  const [_, setVisitedFeatures, getVisitedFeatures] = useStoredState(
    `${subject.value}.visitedFeatures`,
    [],
    sessionStorage,
    (x) => x == null ? JSON.parse('null') : JSON.parse(x),
    JSON.stringify,
  );

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
      const feature = !loading && featureFromPlacement(lrs, rawFeature, getVisitedFeatures(), theme);

      const isCenter = index === 0;

      if (feature && isCenter) {
        setMemoizedCenter(feature);
      }

      if (isNamedNode(rawFeature)) {
        dependencies.push(rawFeature);
      }

      if (feature) {
        const markAsVisited = () => {
          setVisitedFeatures(Array.from(new Set([...getVisitedFeatures(), feature.getId()])));
          const { hoverStyle, style } = getStyles(
            feature.getProperties().image.value,
            theme,
          );
          const visited = true;
          feature.setProperties({
            hoverStyle,
            style,
            visited,
          });
        };

        feature.setProperties({ markAsVisited });
        features.push(feature);
      }
    };

    if (placements) {
      placements.forEach(addFeature);
    }

    setDependencies(dependencies);
    setMemoizedFeatures(features);

    const currentlyLoading = !!dependencies?.find(
      (resource: SomeNode) => !entityIsLoaded(lrs, resource),
    );

    if (loading !== currentlyLoading) {
      setLoading(currentlyLoading);
    }
  }, [loading, timestamp, placements]);

  return [memoizedFeatures || [], memoizedCenter, loading];
};
