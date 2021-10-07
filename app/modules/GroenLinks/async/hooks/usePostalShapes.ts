import { useResourceProperty } from 'link-redux';
import { Feature } from 'ol';
import GeoJSON from 'ol/format/GeoJSON';
import Point from 'ol/geom/Point';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';
import Style from 'ol/style/Style';
import React from 'react';

import { tryParseFloat } from '../../../../helpers/numbers';
import app from '../../../../ontology/app';
import teamGL from '../../../../ontology/teamGL';
import { Priorities } from '../../components/GlappMap';
import { postalCodeIri } from '../../views/Glapp/helpers';

export interface PostalCodes {
  features: Array<Feature<Point>>;
  type: string;
}

const DEFAULT_MAX_PRIORITY = 5;
const DEFAULT_MIN_PRIORITY = 1;
const SHADE_COUNT = 10;

const hoverShapeStyle = new Style({
  fill: new Fill({
    color: 'hsla(120, 64%, 60%, 0.60)',
  }),
  stroke: new Stroke({
    color: '#323232',
    width: 1,
  }),
});

export interface PostalMapping {
  [postalDigits: string]: Feature[];
}

interface ShapeStyle {
  [name: string]: Style;
}

const shapeStyle: ShapeStyle = {};

for (let i = 0; i <= SHADE_COUNT; i++) {
  /* eslint-disable @typescript-eslint/no-magic-numbers */
  const fillColor = `hsla(120, 64%, ${(65 - (5 * i)).toFixed()}%, ${(0.2 + 0.06 * i).toFixed(2)})`;
  /* eslint-enable @typescript-eslint/no-magic-numbers */

  shapeStyle[i] = new Style({
    fill: new Fill({
      color: fillColor,
    }),
  });
}

const styleForPostalCode = (
  feature: Feature,
  maxPriority: number,
  minPriority: number,
  priorities: Priorities,
) => {
  const { postalDigits } = feature.getProperties();

  const priority = priorities[postalCodeIri(postalDigits).value];
  const range = maxPriority - minPriority;
  const prioIndex = (
    SHADE_COUNT * (Math.max(0, (Math.min(priority, maxPriority) - minPriority)) / range)
  ).toFixed();

  return shapeStyle[prioIndex];
};

const useStyleForPostalCode = (priorities?: Priorities) => {
  const [maxPriorityProp] = useResourceProperty(app.c_a, teamGL.maxPriority);
  const maxPriority = tryParseFloat(maxPriorityProp);
  const [minPriorityProp] = useResourceProperty(app.c_a, teamGL.minPriority);
  const minPriority = tryParseFloat(minPriorityProp);

  const getStyle = React.useCallback((feature: Feature) => (
    priorities && styleForPostalCode(
      feature,
      maxPriority || DEFAULT_MAX_PRIORITY,
      minPriority || DEFAULT_MIN_PRIORITY,
      priorities,
    )
  ), [maxPriority, minPriority, priorities]);

  return getStyle;
};

interface UsePostalShapes {
  priorities?: Priorities;
  postalCodes?: PostalCodes;
}

const usePostalShapes = ({
  priorities,
  postalCodes,
}: UsePostalShapes): PostalMapping => {
  const getPostalCodeStyle = useStyleForPostalCode(priorities);
  const [postalShapes, setPostalShapes] = React.useState<PostalMapping>({});

  React.useEffect(() => {
    if (priorities && postalCodes) {
      const postalMapping: PostalMapping = {};
      const features = (new GeoJSON()).readFeatures(postalCodes);
      features.forEach((f) => {
        f.setProperties({
          hoverStyle: () => hoverShapeStyle,
          style: getPostalCodeStyle,
        });

        const { postalDigits } = f.getProperties();

        if (!postalMapping[postalDigits]) {
          postalMapping[postalDigits] = [];
        }

        postalMapping[postalDigits].push(f);
      });

      setPostalShapes(postalMapping);
    }
  }, [postalCodes, !!priorities]);

  return postalShapes;
};

export default usePostalShapes;
