import { Theme, useTheme } from '@material-ui/core';
import { useLinkRenderContext } from 'link-redux';
import { Feature } from 'ol';
import Point from 'ol/geom/Point';
import { fromLonLat } from 'ol/proj';
import React, { Dispatch, SetStateAction } from 'react';

import { Placement } from '../../../containers/MapView';
import useStoredState from '../../../hooks/useStoredState';
import { getStyles } from '../lib/helpers';

const EMPTY_ARRAY: Array<Feature<Point>> = [];

export const toFeature = (
  placement: Placement,
  theme: Theme,
  visitedFeatures: string[],
): Feature<Point> => {
  const {
    id,
    image,
    lat,
    lon,
    zoomLevel,
  } = placement;
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
  feature: Feature<Point>,
  index: number,
  theme: Theme,
  getVisitedFeatures: () => string[],
  setMemoizedCenter: Dispatch<SetStateAction<Feature<Point> | null>>,
  setVisitedFeatures: Dispatch<SetStateAction<string[]>>,
  features: Array<Feature<Point>>,
): void => {
  if (index === 0) {
    setMemoizedCenter(feature);
  }

  feature.setProperties({ markAsVisited: getMarkAsVisited(setVisitedFeatures, getVisitedFeatures, theme) });
  features.push(feature);
};

type FeatureSet = [features: Array<Feature<Point>>, center: Feature<Point> | null];

export const useFeatures = (placements: Placement[]): FeatureSet => {
  const theme = useTheme();
  const { subject } = useLinkRenderContext();

  const [, setVisitedFeatures, getVisitedFeatures] = useStoredState(
    `${subject.value}.visitedFeatures`,
    [],
    sessionStorage,
    (x) => x == null ? JSON.parse('null') : JSON.parse(x),
    JSON.stringify,
  );

  const [features, setFeatures] = React.useState<Array<Feature<Point>> | null>(null);
  const [center, setCenter] = React.useState<Feature<Point> | null>(null);

  React.useEffect(() => {
    const newFeatures: Array<Feature<Point>> = [];

    placements.forEach((placement: Placement, index: number) => {
      addFeature(
        toFeature(placement, theme, getVisitedFeatures()),
        index,
        theme,
        getVisitedFeatures,
        setCenter,
        setVisitedFeatures,
        newFeatures,
      );
    });

    setFeatures(newFeatures);
  }, [placements]);

  return [features ?? EMPTY_ARRAY, center];
};
