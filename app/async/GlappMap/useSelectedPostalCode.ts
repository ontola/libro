import { Feature } from 'ol';
import { Coordinate } from 'ol/coordinate';
import { Extent, extend } from 'ol/extent';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';
import Style from 'ol/style/Style';
import React from 'react';

import { FOCUS_ZOOM, ViewProps } from '../MapView/useMap';

import { PostalMapping } from './usePostalShapes';

const HALF = 0.5;

const selectedShapeStyle = new Style({
  fill: new Fill({
    color: 'hsla(120, 64%, 40%, 0.60)',
  }),
  stroke: new Stroke({
    color: '#323232',
    width: 5,
  }),
});

interface UseSelectedPostalCode {
  postalShapes: PostalMapping;
  selectedPostalCode?: number;
  setView: (view: ViewProps) => void;
  setOverlayPosition: (position: Coordinate) => void;
  view: ViewProps;
}

const useSelectedPostalCode = ({
  postalShapes,
  selectedPostalCode,
  setView,
  setOverlayPosition,
  view,
}: UseSelectedPostalCode): [Feature[]] => {
  const [selectedFeatures, setSelectedFeatures] = React.useState<Feature[]>([]);

  React.useEffect(() => {
    if (selectedPostalCode && postalShapes[selectedPostalCode]) {
      const cloned = postalShapes[selectedPostalCode].map((f) => {
        const clone = f.clone();
        clone.setProperties({
          hoverStyle: () => selectedShapeStyle,
          style: () => selectedShapeStyle,
        });

        return clone;
      });
      const features = postalShapes[selectedPostalCode];
      const initialExtend = features[0]?.getGeometry()?.getExtent();

      if (initialExtend) {
        const [minX, minY, maxX] = features.reduce<Extent>((acc, next) => {
          const ext = next?.getGeometry()?.getExtent();

          return ext ? extend(acc, ext) : acc;
        }, initialExtend);

        const center = [HALF * (minX + maxX), minY];

        setOverlayPosition(center);
        setView({
          center,
          zoom: Math.max(view?.zoom || 0, FOCUS_ZOOM),
        });
      }

      setSelectedFeatures(cloned);
    } else {
      setSelectedFeatures([]);
    }
  }, [selectedPostalCode]);

  return [selectedFeatures];
};

export default useSelectedPostalCode;
