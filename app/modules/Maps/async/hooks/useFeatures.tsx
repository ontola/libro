import { Theme, useTheme } from '@mui/material';
import { Feature } from 'ol';
import Point from 'ol/geom/Point';
import { fromLonLat } from 'ol/proj';
import React from 'react';

import { Placement } from '../../components/ControlledMap';
import { getStyles } from '../lib/helpers';

const isVisited = (feature: Feature<Point>): boolean =>
  sessionStorage.getItem(`${feature.getId()}.isVisited`) === 'true';

const createVisitedMarker = (theme: Theme) => (feature: Feature<Point>) => {
  sessionStorage.setItem(`${feature.getId()}.isVisited`, 'true');

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

export const toFeature = (
  placement: Placement,
  theme: Theme,
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
    markAsVisited: createVisitedMarker(theme),
    style,
    visited: isVisited(feature),
    zoomLevel,
  });

  return feature;
};

type FeatureSet = [features: Array<Feature<Point>>, center: Feature<Point> | null];

export const useFeatures = (placements: Placement[]): FeatureSet => {
  const theme = useTheme();

  const [features, setFeatures] = React.useState<Array<Feature<Point>>>([]);
  const [center, setCenter] = React.useState<Feature<Point> | null>(null);

  React.useEffect(() => {
    const newFeatures = placements.map(
      (placement: Placement) => toFeature(
        placement,
        theme,
      ),
    );

    if (newFeatures.length > 0) {
      setCenter(newFeatures[0]);
    }

    setFeatures(newFeatures);
  }, [placements]);

  return [features, center];
};
