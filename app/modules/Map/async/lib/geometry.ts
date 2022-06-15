import { Feature } from 'ol';
import { Coordinate } from 'ol/coordinate';
import { Circle, Polygon } from 'ol/geom';
import GeometryType from 'ol/geom/GeometryType';
import { fromLonLat } from 'ol/proj';

import { tryParseFloat } from '../../../Common/lib/numbers';
import { InputValue } from '../../../Form/components/FormField/FormFieldTypes';
import { Geometry, Point } from '../../components/ControlledMap';

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
  case GeometryType.CIRCLE:
    /* eslint-disable no-case-declarations */
    const center = toOLCoords(geometry.points[0]);
    const edge = toOLCoords(geometry.points[1]);
    const radius = distance(center, edge);

    return new Feature(new Circle(center, radius));

  case GeometryType.POLYGON:
    return new Feature(new Polygon([geometry.points.map(toOLCoords)]));

  default:
    throw new Error(`undefined geometry type: ${geometry.type}`);
  }
};

export const toPoint = (s: InputValue[]): Point | undefined => {
  const [lon, lat] = s.map(tryParseFloat);

  return (lon && lat)? {
    lat,
    lon,
  } : undefined;
};
