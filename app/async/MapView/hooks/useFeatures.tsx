import { Theme, useTheme } from '@material-ui/core';
import {
  NamedNode,
  isNamedNode,
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
import React, { Dispatch, SetStateAction } from 'react';

import { Placement } from '../../../containers/MapView';
import { entityIsLoaded } from '../../../helpers/data';
import { tryParseFloat } from '../../../helpers/numbers';
import { isResource } from '../../../helpers/types';
import useStoredState from '../../../hooks/useStoredState';
import fa4 from '../../../ontology/fa4';
import ontola from '../../../ontology/ontola';
import { getStyles } from '../lib/helpers';

const imageForPlacement = (node: SomeNode, lrs: LinkReduxLRSType): NamedNode =>
  lrs.getResourceProperty(node, schema.image) ?? fa4.ns('map-marker');

const toPlacement = (lrs: LinkReduxLRSType, node: SomeNode): Placement => ({
  id: node.value,
  image: imageForPlacement(node, lrs),
  lat: tryParseFloat(lrs.getResourceProperty(node, schema.latitude)),
  lon: tryParseFloat(lrs.getResourceProperty(node, schema.longitude)),
  zoomLevel: tryParseFloat(lrs.getResourceProperty(node, ontola.zoomLevel)),
});

export const toFeature = (
  {
    id,
    image,
    lat,
    lon,
    zoomLevel,
  }: Placement,
  theme: Theme,
  visitedFeatures: string[],
): Feature<Point> | undefined => {
  if (!id || !image || !lat || !lon) {
    return undefined;
  }

  const { hoverStyle, style } = getStyles(image.value, theme);
  const feature = new Feature(new Point(fromLonLat([lon, lat])));
  feature.setId(id);

  feature.setProperties({
    hoverStyle,
    image,
    style,
    visited: visitedFeatures.includes(id),
    zoomLevel,
  });

  return feature;
};

export const getMarkAsVisited = (
  setVisitedFeatures: Dispatch<SetStateAction<string[]>>,
  getVisitedFeatures: () => string[],
  theme: Theme,
): ((feature: Feature<Point>) => void) => (feature: Feature<Point>) => {
  setVisitedFeatures(Array.from(new Set([...getVisitedFeatures(), feature.getId() as string])));

  const { hoverStyle, style } = getStyles(
    feature.getProperties().image.value,
    theme,
  );

  feature.setProperties({
    hoverStyle,
    style,
    visited: true,
  });
};

export const addFeature = (
  feature: false | Feature<Point> | undefined,
  index: number,
  theme: Theme,
  getVisitedFeatures: () => string[],
  setMemoizedCenter: Dispatch<SetStateAction<Feature<Point> | null>>,
  setVisitedFeatures: Dispatch<SetStateAction<string[]>>,
  features: Array<Feature<Point>>,
): void => {
  if (!feature) return;

  if (index === 0) {
    setMemoizedCenter(feature);
  }

  feature.setProperties({ markAsVisited: getMarkAsVisited(setVisitedFeatures, getVisitedFeatures, theme) });
  features.push(feature);
};

type FeatureSet = [Array<Feature<Point>>, Feature<Point> | null, boolean];

export const useFeatures = (placements: Array<SomeNode | Placement>): FeatureSet => {
  const lrs = useLRS();
  const { subject } = useLinkRenderContext();
  const theme = useTheme();

  const [, setVisitedFeatures, getVisitedFeatures] = useStoredState(
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

    if (placements) {
      placements.forEach((rawFeature: SomeNode | Placement, index: number) => {
        if (isNamedNode(rawFeature)) {
          dependencies.push(rawFeature);
        }

        const placement = isResource(rawFeature) ? toPlacement(lrs, rawFeature) : rawFeature;

        addFeature(
          !loading && toFeature(placement, theme, getVisitedFeatures()),
          index,
          theme,
          getVisitedFeatures,
          setMemoizedCenter,
          setVisitedFeatures,
          features,
        );
      });
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
