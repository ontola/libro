import { useTheme } from '@mui/material/styles';
import rdf from '@ontologies/core';
import { Feature } from 'ol';
import { default as OlGeometry } from 'ol/geom/Geometry';
import GeometryType from 'ol/geom/GeometryType';
import Point from 'ol/geom/Point';
import { fromLonLat } from 'ol/proj';
import React from 'react';

import { tryParseFloat } from '../../../../../../helpers/numbers';
import { getStyles } from '../../../lib/helpers';
import {
  Geometry,
  Layer,
  MapInteractionCallback,
} from '../../../../components/ControlledMap';
import fa4 from '../../../../../../ontology/fa4';
import { LibroTheme } from '../../../../../../themes/themes';
import { FormField } from '../../../../../../components/FormField/FormFieldTypes';

const buildFeature = (geometry: Geometry, theme: LibroTheme) => {
  const { hoverStyle, style } = getStyles(fa4.ns('map-marker').value, theme);
  const feature = new Feature(geometryForFeature(geometry));

  feature.setProperties({
    hoverStyle,
    image: fa4.ns('map-marker'),
    style,
  });

  return feature;
};

const buildGeometry = (lat: number | undefined, lon: number | undefined, zoomLevel: number | undefined) => {
  if (lat && lon && zoomLevel) {
    return {
      points: [{
        lat,
        lon,
      }],
      type: GeometryType.POINT,
      zoomLevel,
    };
  }

  return undefined;
};

const geometryForFeature = (geometry: Geometry): OlGeometry | undefined => {
  switch (geometry.type) {
  case GeometryType.POINT:
    return new Point(fromLonLat([geometry.points[0].lon, geometry.points[0].lat]));
    break;
  }

  return undefined;
};

export const useGeometryInput = (latInput: FormField, lonInput: FormField, zoomLevelInput: FormField): [Layer[], MapInteractionCallback] => {
  const theme = useTheme();

  const [geometry, setGeometry] = React.useState<Geometry | undefined>(undefined);
  const [geometryLayers, setGeometryLayers] = React.useState<Layer[]>([]);

  const handleInteraction = React.useCallback((newGeometry: Geometry, newZoom: number) => {
    if (newGeometry.type === GeometryType.POINT) {
      const { lat, lon } = newGeometry.points[0];
      latInput.onChange([rdf.literal(lat)]);
      lonInput.onChange([rdf.literal(lon)]);

      if (newZoom) {
        zoomLevelInput.onChange([rdf.literal(newZoom)]);
      }

      setGeometry(buildGeometry(lat, lon, newZoom));
    }
  }, []);

  React.useEffect(() => {
    const lat = tryParseFloat(latInput.values[0]);
    const lon = tryParseFloat(lonInput.values[0]);
    const zoomLevel = tryParseFloat(zoomLevelInput.values[0]);

    setGeometry(buildGeometry(lat, lon, zoomLevel));
  }, []);

  React.useEffect(() => {
    const feature = geometry && buildFeature(geometry, theme);
    const features = feature ? [feature] : [];

    setGeometryLayers([{
      clustered: true,
      features,
    }]);
  }, [geometry]);

  return [geometryLayers, handleInteraction];
};

