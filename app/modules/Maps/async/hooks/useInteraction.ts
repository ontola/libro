import { MapBrowserEvent, Map as OLMap } from 'ol';
import { Coordinate } from 'ol/coordinate';
import { pointerMove, singleClick } from 'ol/events/condition';
import { FeatureLike } from 'ol/Feature';
import { Circle, Polygon } from 'ol/geom';
import GeometryType from 'ol/geom/GeometryType';
import { Draw } from 'ol/interaction';
import Select from 'ol/interaction/Select';
import { Vector } from 'ol/layer';
import { toLonLat } from 'ol/proj';
import VectorSource, { VectorSourceEvent } from 'ol/source/Vector';
import { StyleFunction } from 'ol/style/Style';
import {
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from 'react';

import {
  ClusterSelectCallback,
  FeatureSelectCallback,
  MapInteractionCallback,
} from '../../components/ControlledMap';

import { useSelectHandler } from './useSelectHandler';

const GEOMETRY_NAME = 'userDrawing';

type MapClickHandler = (e: MapBrowserEvent) => boolean;

const defaultStyleFunction = new Vector().getStyleFunction() ?? (() => null);

export const getStyle = (styleName: string): StyleFunction => (
  (feature: FeatureLike) => {
    const features = feature?.get('features');
    const styleFunction = (features?.[0] || feature).get(styleName);

    return styleFunction ? styleFunction(feature) : defaultStyleFunction(feature, 0);
  }
);

const drawingInteraction = (interactionType?: GeometryType) =>
  interactionType && [GeometryType.CIRCLE, GeometryType.POLYGON].includes(interactionType);

const getHoverSelect = (): Select =>
  new Select({
    condition: pointerMove,
    style: getStyle('hoverStyle'),
  });

export const getSelect = (
  setDeselect: Dispatch<SetStateAction<undefined | (() => void)>>,
  handleSelect: (e: any) => void,
): Select => {
  const select = new Select({
    condition: singleClick,
    style: getStyle('hoverStyle'),
  });
  select.on('select', handleSelect);
  setDeselect(() => () => {
    select.getFeatures().clear();
    handleSelect(undefined);
  });

  return select;
};

const handleMapClick = (
  onInteraction: MapInteractionCallback,
  zoom: number,
): MapClickHandler => (e: MapBrowserEvent) => {
  const features = e.map.getFeaturesAtPixel(e.pixel);

  // if there are any features the click is handled by the select handler instead
  if (features.length === 0) {
    const [lon, lat] = toLonLat(e.coordinate);
    const geometry = {
      points: [{
        lat,
        lon,
      }],
      type: GeometryType.POINT,
    };

    onInteraction(geometry, e.map.getView().getZoom() || zoom);
  }

  return true;
};

const handleDrawEnd = (onInteraction: MapInteractionCallback, zoom: number) => (e: VectorSourceEvent) => {
  if (e.feature) {
    const geometry = e.feature.getGeometry();
    const geometryType = geometry?.getType();
    let coords: Coordinate[];

    switch (geometryType) {
    case GeometryType.POLYGON:
      coords = (geometry as Polygon).getCoordinates()[0];
      break;
    case GeometryType.CIRCLE:
      coords = [(geometry as Circle).getCenter(), (geometry as Circle).getLastCoordinate()];
      break;
    default:
      coords = [];
      break;
    }

    if (coords.length > 0 && geometryType) {
      const storedGeometry = {
        points: coords.map((coord: Coordinate) => {
          const [lon, lat] = toLonLat(coord);

          return {
            lat,
            lon,
          };
        }),
        type: geometryType,
      };

      onInteraction(storedGeometry, zoom);
    }

    e.target.removeFeature(e.feature);
  }
};

export const useInteraction = (
  zoom: number,
  onInteraction: MapInteractionCallback | undefined,
  map: OLMap | undefined,
  availableInteractionTypes: GeometryType[] | undefined,
  onClusterSelect: ClusterSelectCallback | undefined,
  onSelect: FeatureSelectCallback | undefined,
): [(() => void) | undefined, Dispatch<SetStateAction<GeometryType | undefined>>] => {
  const drawSource = useMemo(() => new VectorSource(), []);
  const [interactionType, setInteractionType] = useState<GeometryType | undefined>(availableInteractionTypes?.length === 1 ? availableInteractionTypes[0] : undefined);
  const [deselect, setDeselect] = useState<undefined | (() => void)>(undefined);
  const handleSelect = useSelectHandler(onClusterSelect, onSelect);

  // sets handler for clicking empty map space
  useEffect(() => {
    if (!onInteraction || !map || !interactionType) {
      return () => undefined;
    }

    if (drawingInteraction(interactionType)) {
      if (drawSource) {
        const draw = new Draw({
          geometryName: GEOMETRY_NAME,
          source: drawSource,
          type: interactionType,
        });

        map.addInteraction(draw);
        const callback = handleDrawEnd(onInteraction, zoom);
        drawSource.on('addfeature', callback);

        return () => {
          drawSource?.un('addfeature', callback);
          map?.removeInteraction(draw);
        };
      }

      return () => undefined;
    }

    const callback = handleMapClick(onInteraction, zoom);

    map.on('click', callback);

    return () => {
      map?.un('click', callback);
    };
  }, [!!map, onInteraction, interactionType, zoom]);

  useEffect(() => {
    if (!map) {
      return () => undefined;
    }

    const select = getSelect(setDeselect, handleSelect);
    map.addInteraction(select);

    const hover = getHoverSelect();
    map.addInteraction(hover);

    return () => {
      map.removeInteraction(select);
      map.removeInteraction(hover);
    };
  }, [handleSelect, map, interactionType]);

  return [deselect, setInteractionType];
};
