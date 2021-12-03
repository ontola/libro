import { Feature } from 'ol';
import { Coordinate } from 'ol/coordinate';
import { Circle, Polygon } from 'ol/geom';
import { fromLonLat } from 'ol/proj';

import {
  Geometry,
  GeometryType,
  Point, 
} from '../../../containers/MapView';
import { tryParseFloat } from '../../../helpers/numbers';
import { InputValue } from '../../../hooks/useFormField';

const roundToTwo = (x: number) => Math.round((x + Number.EPSILON) * 100) / 100;

/**
 * calculates the distance between a and b
 */
export const distance = (a: Coordinate, b: Coordinate): number => {
  const dx = a[0] - b[0];
  const dy = a[1] - b[1];

  return roundToTwo(Math.sqrt(dx * dx + dy * dy));
};

const toOLCoords = (p: Point): Coordinate => fromLonLat([p.lon, p.lat]);

export const toFeature = (geometry: Geometry): Feature<Circle | Polygon> => {
  switch (geometry.type) {
    case GeometryType.Circle:
    /* eslint-disable no-case-declarations */
      const center = toOLCoords(geometry.points[0]);
      const edge = toOLCoords(geometry.points[1]);
      const radius = distance(center, edge);

      return new Feature(new Circle(center, radius));

    case GeometryType.Polygon:
      return new Feature(new Polygon([geometry.points.map(toOLCoords)]));
  }
};

export const toPoint = (s: InputValue): Point | undefined => {
  const [lon, lat] = s.value.split(',').map(tryParseFloat);

  return (lon && lat)? {
    lat,
    lon,
  } : undefined;
};
