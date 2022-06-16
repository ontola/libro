/* eslint-disable @typescript-eslint/no-magic-numbers */

import rdf from '@ontologies/core';
import GeometryType from 'ol/geom/GeometryType';
import { toLonLat } from 'ol/proj';

import {
  distance,
  toFeature,
  toPoint,
} from '../geometry';

describe('geometry', () => {
  describe('distance', () => {
    const positiveSmall = [12, 11];
    const positiveBig = [20, 21];
    const negative = [-30, -31];
    const floatingCoords = [
      [1.5, 1.6],
      [1.5, 1],
    ];

    const smallBig = 12.81;
    const smallNegative = 59.4;
    const floating = 0.6;

    it('handles zero distance', () => expect(distance(positiveSmall, positiveSmall)).toBe(0));

    it('rounds to two decimals', () => expect(distance(positiveSmall, positiveBig)).toBe(smallBig));

    it('handles negative coordinates', () => expect(distance(positiveSmall, negative)).toBe(smallNegative));

    it('handles A smaller than B', () => expect(distance(positiveSmall, positiveBig)).toBe(smallBig));

    it('handles A greater than B', () => expect(distance(positiveBig, positiveSmall)).toBe(smallBig));

    it('handles floating point precision', () => expect(distance(floatingCoords[0], floatingCoords[1])).toBe(floating));
  });

  describe('toFeature', () => {
    describe('with circle', () => {
      const geometry = {
        points: [
          {
            lat: 1.5,
            lon: 1.6,
          },
          {
            lat: 1.5,
            lon: 1,
          },
        ],
        type: GeometryType.CIRCLE,
      };
      const feature = toFeature(geometry);

      it('has geometry type circle', () => {
        expect(feature.getGeometry()!.getType()).toBe('Circle');
      });

      it('has a center', () => {
        // @ts-ignore
        const [lon, lat] = toLonLat(feature.getGeometry()!.getCenter());
        expect(lat).toBe(1.5);
        expect(lon).toBe(1.6);
      });

      it('has a radius', () => {
        // @ts-ignore
        const center = toLonLat(feature.getGeometry()!.getCenter());
        const edge = toLonLat(feature.getGeometry()!.getLastCoordinate());
        expect(distance(center, edge)).toBe(0.6);
      });
    });

    describe('with polygon', () => {
      const geometry = {
        points: [
          {
            lat: -2.2,
            lon: -3.4,
          },
          {
            lat: -2.4,
            lon: 1.9,
          },
          {
            lat: 6.7,
            lon: 1.8,
          },
          {
            lat: 6.4,
            lon: -3.1,
          },
          {
            lat: -2.2,
            lon: -3.4,
          },
        ],
        type: GeometryType.POLYGON,
      };

      const feature = toFeature(geometry);

      it('has geometry type polygon', () => {
        expect(feature.getGeometry()!.getType()).toBe('Polygon');
      });

      it('has length', () => {
        expect(feature.getGeometry()!.getCoordinates()[0].length).toBe(5);
      });

      it('is closed', () => {
        const coordinates = feature.getGeometry()!.getCoordinates()[0];
        expect(coordinates[coordinates.length-1]).toStrictEqual(coordinates[0]);
      });
    });
  });

  describe('toPoint', () => {
    it('handles correct input', () => {
      expect(toPoint([
        rdf.namedNode('1.5'),
        rdf.namedNode('1.6'),
      ])).toStrictEqual({
        lat: 1.6,
        lon: 1.5,
      });
    });
  });
});
