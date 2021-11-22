import {
  MapBrowserEvent,
  Map as OLMap,
  View as OLView,
} from 'ol';
import { defaults as defaultControls } from 'ol/control';
import { Coordinate } from 'ol/coordinate';
import { pointerMove, singleClick } from 'ol/events/condition';
import { FeatureLike } from 'ol/Feature';
import { Circle, Polygon } from 'ol/geom';
import GeometryType from 'ol/geom/GeometryType';
import { Draw } from 'ol/interaction';
import Select from 'ol/interaction/Select';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import { toLonLat } from 'ol/proj';
import Cluster from 'ol/source/Cluster';
import TileSource from 'ol/source/Tile';
import VectorSource, { VectorSourceEvent } from 'ol/source/Vector';
import XYZ from 'ol/source/XYZ';
import { StyleFunction } from 'ol/style/Style';
import React, {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useIntl } from 'react-intl';

import {
  ClusterSelectCallback,
  FeatureSelectCallback,
  Layer,
  MapClickCallback,
  MapMoveCallback,
  MapViewChangeCallback,
  MapZoomCallback,
  UserDrawingCallback,
  ViewProps,
} from '../../components/MapView';
import { handle } from '../../../../helpers/logging';
import useMapAccessToken, { MapAccessToken, RequestMapAccessToken } from '../../../../hooks/useMapAccessToken';
import { mapMessages } from '../../../../translations/messages';
import CurrentLocationControl from '../components/CurrentLocationControl';

import { useSelectHandler } from './useSelectHandler';

export const FOCUS_ZOOM = 12;
const CLUSTER_DISTANCE = 30;
const TILE_SIZE = 512;
const GEOMETRY_NAME = 'userDrawing';

interface CreateMapProps {
  accessToken?: string;
  currentLocationTooltip: string;
  layerSources?: Array<VectorSource | Cluster>;
  mapRef: MutableRefObject<HTMLDivElement | null>;
  tileSource?: TileSource;
  view: ViewProps;
}

const getStyle = (styleName: string): StyleFunction => (
  (feature: FeatureLike) => {
    const features = feature?.get('features');
    const styleFunction = (features?.[0] || feature).get(styleName);

    return styleFunction(feature);
  }
);

const updateFeatures = (layerSources: Array<VectorSource | Cluster> | undefined, layers: Layer[]) => {
  if (layerSources) {
    layerSources.forEach((source, index) => {
      const layer = layers[index];

      if (layer.clustered) {
        (source as Cluster).getSource().clear(true);
        (source as Cluster).getSource().addFeatures(layer.features.slice() || []);
      } else {
        source.clear(true);
        source.addFeatures(layer.features.slice() || []);
      }
    });
  }
};

const createMap = ({
  accessToken,
  currentLocationTooltip,
  layerSources,
  mapRef,
  tileSource,
  view,
}: CreateMapProps): OLMap | undefined => {
  const { current } = mapRef;

  if (!current || !accessToken || !layerSources || !tileSource) {
    return undefined;
  }

  const layers = [
    new TileLayer({
      source: tileSource,
    }),
    ...layerSources.map((source) => {
      const vl = new VectorLayer({ source });
      vl.setStyle(source.getProperties().customStyle ? getStyle('style') : undefined);

      return vl;
    }),
  ];

  const controls = defaultControls({
    rotate: false,
  }).extend([
    new CurrentLocationControl(currentLocationTooltip),
  ]);

  return new OLMap({
    controls,
    layers,
    target: current,
    view: new OLView(view),
  });
};

type MapClickHandler = (e: MapBrowserEvent) => boolean;

const handleMapClick = (
  onMapClick: MapClickCallback,
  zoom: number,
): MapClickHandler => (e: MapBrowserEvent) => {
  const features = e.map.getFeaturesAtPixel(e.pixel);

  // if there are any features the click is handled by the select handler instead
  if (features.length === 0) {
    const [lon, lat] = toLonLat(e.coordinate);
    onMapClick(lon, lat, e.map.getView().getZoom() || zoom);
  }

  return true;
};

type ViewUpdater = (newCenter: Coordinate | undefined, newZoom: number | undefined) => void;
type ViewChangeHandler = (e: MapBrowserEvent) => void;

export const makeViewUpdater = (
  center: Coordinate,
  zoom: number,
  setCenter: Dispatch<SetStateAction<Coordinate>>,
  setZoom: Dispatch<SetStateAction<number>>,
  onMove?: MapMoveCallback,
  onViewChange?: (center: Coordinate, zoom: number) => any,
  onZoom?: MapZoomCallback,
): ViewUpdater => (newCenter: Coordinate | undefined, newZoom: number | undefined) => {
  if (newCenter && newCenter !== center) {
    if (onMove) {
      onMove(newCenter);
    }

    setCenter(newCenter);
  }

  if (newZoom && newZoom !== zoom) {
    if (onZoom) {
      onZoom(newZoom);
    }

    setZoom(newZoom);
  }

  if (newCenter && newZoom && onViewChange) {
    onViewChange(newCenter, newZoom);
  }
};

const createViewChangeHandler = (updateView: ViewUpdater): ViewChangeHandler => (e: MapBrowserEvent) => {
  const newCenter = e.map.getView().getCenter();
  const newZoom = e.map.getView().getZoom();

  updateView(newCenter, newZoom);
};

export const getSelect = (
  setDeselect: Dispatch<SetStateAction<undefined | (() => void)>>,
  handleSelect: (e: any) => void,
): Select => {
  const select = new Select({
    condition: singleClick,
    //style: getStyle('hoverStyle'),
  });
  select.on('select', handleSelect);
  setDeselect(() => () => {
    select.getFeatures().clear();
    handleSelect(undefined);
  });

  return select;
};

const getHoverSelect = (): Select =>
  new Select({
    condition: pointerMove,
    //style: getStyle('hoverStyle'),
  });

const toVectorSource = (layer: Layer): VectorSource => {
  const source = layer.clustered ?
    new Cluster({
      distance: CLUSTER_DISTANCE,
      source: new VectorSource(),
    }) :
    new VectorSource();

  source.setProperties({ customStyle: layer.customStyle });

  return source;
};

const toTileSource = (accessToken: string, URL: string): TileSource =>
  new XYZ({
    tileSize: [TILE_SIZE, TILE_SIZE],
    url: `${URL}/tiles/{z}/{x}/{y}?access_token=${accessToken}`,
  });

const addFeature = (geometryName: string, onPolygon: UserDrawingCallback) => (e: VectorSourceEvent) => {
  if (e.feature && e.feature.getGeometryName() === geometryName) {
    const geometry = e.feature.getGeometry();
    let coords: Coordinate[];

    switch (geometry?.getType()) {
    case 'Polygon':
      coords = (geometry as Polygon).getCoordinates()[0];
      break;
    case 'Circle':
      coords = [(geometry as Circle).getCenter(), (geometry as Circle).getLastCoordinate()];
      break;
    default:
      coords = [];
      break;
    }

    onPolygon(coords.map((coord: Coordinate) => toLonLat(coord)));
  }
};

export interface UseMapProps {
  geometryType?: GeometryType;
  layers: Layer[];
  mapboxTileURL: string;
  onClusterSelect?: ClusterSelectCallback;
  onMapClick?: MapClickCallback;
  onMove?: MapMoveCallback;
  onSelect?: FeatureSelectCallback;
  onViewChange?: MapViewChangeCallback;
  onZoom?: MapZoomCallback;
  onPolygon?: UserDrawingCallback;
  polygonLayer?: number;
  view: ViewProps;
}

const useMap = (props: UseMapProps): {
  deselect: (() => void) | undefined;
  error: Error | undefined;
  map: OLMap | undefined;
  mapRef: React.RefObject<HTMLDivElement>;
  mapToken: MapAccessToken;
  requestMapToken: RequestMapAccessToken;
} => {
  const {
    geometryType,
    layers,
    mapboxTileURL,
    onClusterSelect,
    onMapClick,
    onMove,
    onPolygon,
    onSelect,
    onViewChange,
    onZoom,
    polygonLayer,
    view,
  } = props;
  const intl = useIntl();
  const [mapToken, requestMapToken] = useMapAccessToken();
  const mapRef = useRef<HTMLDivElement>(null);

  const [center, setCenter] = useState<Coordinate>(view.center);
  const [zoom, setZoom] = useState<number>(view.zoom);
  const [layerSources, setLayerSources] = useState<Array<Cluster | VectorSource> | undefined>(undefined);
  const [tileSource, setTileSource] = useState<TileSource | undefined>(undefined);
  const [error, setError] = useState<Error | undefined>(undefined);
  const [map, setMap] = useState<OLMap | undefined>(undefined);
  const [deselect, setDeselect] = useState<undefined | (() => void)>(undefined);

  useEffect(() => {
    if (mapToken.token) {
      setError(undefined);
    }
  }, [mapToken.token]);

  const handleError = useCallback((e) => {
    handle(e);
    setError(e);

    return true;
  }, []);

  const handleLoad = useCallback(() => {
    setError(undefined);

    return true;
  }, []);

  const handleSelect = useSelectHandler(onClusterSelect, onSelect);

  useEffect(() => {
    if (mapToken.token) {
      const sources = layers.map(toVectorSource);
      setLayerSources(sources);

      const source = toTileSource(mapToken.token, mapboxTileURL);
      source.addEventListener('tileloadend', handleLoad);
      source.addEventListener('tileloaderror', handleError);
      source.addEventListener('imageloaderror', handleError);
      setTileSource(source);

      return () => {
        source.removeEventListener('tileloadend', handleLoad);
        source.removeEventListener('tileloaderror', handleError);
        source.removeEventListener('imageloaderror', handleError);
      };
    }

    return () => undefined;
  }, [mapToken.token]);

  useEffect(() => {
    const newMap = createMap({
      ...props,
      accessToken: mapToken.token,
      currentLocationTooltip: intl.formatMessage(mapMessages.currentLocationTooltip),
      layerSources,
      mapRef,
      tileSource,
    });
    setMap(newMap);

    return () => {
      if (newMap) {
        newMap.setTarget(undefined);
      }
    };
  }, [mapRef.current, mapToken.token, layerSources, tileSource]);

  useEffect(() => {
    const viewChangeHandler = createViewChangeHandler(makeViewUpdater(
      center,
      zoom,
      setCenter,
      setZoom,
      onMove,
      onViewChange,
      onZoom,
    ));

    if (map && viewChangeHandler) {
      map.on('moveend', viewChangeHandler);
    }

    return () => {
      if (map && viewChangeHandler) {
        map.un('moveend', viewChangeHandler);
      }
    };
  }, [!!map, center, zoom, onMove, onViewChange, onZoom, setCenter, setZoom]);

  // sets handler for clicking empty map space
  useEffect(() => {
    if (map && onMapClick) {
      map.on('click', handleMapClick(onMapClick, zoom));
    }

    return () => {
      if (map && onMapClick) {
        map.un('click', handleMapClick(onMapClick, zoom));
      }
    };
  }, [!!map, onMapClick?.toString(), zoom]);

  useEffect(() => {
    if (geometryType && onPolygon && layerSources && polygonLayer) {
      const source = layerSources[polygonLayer];

      const draw = new Draw({
        geometryName: GEOMETRY_NAME,
        source: source,
        type: geometryType,
      });

      map?.addInteraction(draw);
      source.on('addfeature', addFeature(GEOMETRY_NAME, onPolygon));

      return () => {
        source.un('addfeature', addFeature(GEOMETRY_NAME, onPolygon));
        map?.removeInteraction(draw);
      };
    }

    return () => undefined;
  }, [!!map, geometryType]);

  useEffect(() => {
    updateFeatures(layerSources, layers);
  }, [!!layerSources, ...layers]);

  useEffect(() => {
    if (!map || onPolygon) {
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
  }, [handleSelect, map]);

  return {
    deselect,
    error,
    map,
    mapRef,
    mapToken,
    requestMapToken,
  };
};

export default useMap;
