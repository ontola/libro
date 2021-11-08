import {
  MapBrowserEvent,
  Map as OLMap,
  View as OLView,
} from 'ol';
import { defaults as defaultControls } from 'ol/control';
import { Coordinate } from 'ol/coordinate';
import { pointerMove, singleClick } from 'ol/events/condition';
import { FeatureLike } from 'ol/Feature';
import Select from 'ol/interaction/Select';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import { toLonLat } from 'ol/proj';
import Cluster from 'ol/source/Cluster';
import TileSource from 'ol/source/Tile';
import VectorSource from 'ol/source/Vector';
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
  ViewProps,
} from '../../../containers/MapView';
import { handle } from '../../../helpers/logging';
import useMapAccessToken, { MapAccessToken, RequestMapAccessToken } from '../../../hooks/useMapAccessToken';
import { mapMessages } from '../../../translations/messages';
import CurrentLocationControl from '../components/CurrentLocationControl';

import { useSelectHandler } from './useSelectHandler';

export const FOCUS_ZOOM = 12;
const CLUSTER_DISTANCE = 30;
const TILE_SIZE = 512;

interface CreateMapProps {
  accessToken?: string;
  currentLocationTooltip: string;
  layerSources?: Array<VectorSource | Cluster>;
  mapRef: MutableRefObject<HTMLDivElement | null>;
  tileSource?: TileSource;
  view?: ViewProps;
}

const getStyle = (styleName: string): StyleFunction => (
  (feature: FeatureLike) => {
    const features = feature?.get('features');

    return (features?.[0] || feature).get(styleName)(feature);
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
  const { center, zoom } = view || {};

  if (!current || !accessToken || !layerSources || !tileSource) {
    return undefined;
  }

  const layers = [
    new TileLayer({
      source: tileSource,
    }),
    ...layerSources.map((source) => (
      new VectorLayer({
        source,
        style: getStyle('style'),
      })
    )),
  ];

  const controls = defaultControls({
    rotate: false,
  }).extend([new CurrentLocationControl(currentLocationTooltip)]);

  return new OLMap({
    controls,
    layers,
    target: current,
    view: new OLView({
      center,
      zoom,
    }),
  });
};

type MapClickHandler = (e: MapBrowserEvent) => boolean;

const handleMapClick = (
  onMapClick: MapClickCallback,
  internalZoom: number,
): MapClickHandler => (e: MapBrowserEvent) => {
  if (onMapClick) {
    const [lon, lat] = toLonLat(e.coordinate);
    onMapClick(lon, lat, e.map.getView().getZoom() || internalZoom);
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
    style: getStyle('hoverStyle'),
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
    style: getStyle('hoverStyle'),
  });

const toVectorSource = (layer: Layer): VectorSource =>
  layer.clustered ?
    new Cluster({
      distance: CLUSTER_DISTANCE,
      source: new VectorSource(),
    }) :
    new VectorSource();

const toTileSource = (accessToken: string, URL: string): TileSource =>
  new XYZ({
    tileSize: [TILE_SIZE, TILE_SIZE],
    url: `${URL}/tiles/{z}/{x}/{y}?access_token=${accessToken}`,
  });

export interface UseMapProps {
  layers: Layer[];
  mapboxTileURL: string;
  onClusterSelect?: ClusterSelectCallback;
  onMapClick?: MapClickCallback;
  onMove?: MapMoveCallback;
  onSelect?: FeatureSelectCallback;
  onViewChange?: MapViewChangeCallback;
  onZoom?: MapZoomCallback;
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
    layers,
    mapboxTileURL,
    onClusterSelect,
    onMapClick,
    onMove,
    onSelect,
    onViewChange,
    onZoom,
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
  const [memoizedMap, setMap] = useState<OLMap | undefined>(undefined);
  const [deselect, setDeselect] = useState<undefined | (() => void)>(undefined);

  useEffect(() => {
    if (mapToken.accessToken) {
      setError(undefined);
    }
  }, [mapToken.accessToken]);

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
    if (mapToken.accessToken) {
      const sources = layers.map(toVectorSource);
      setLayerSources(sources);

      const source = toTileSource(mapToken.accessToken, mapboxTileURL);
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
  }, [mapToken.accessToken]);

  useEffect(() => {
    const map = createMap({
      ...props,
      accessToken: mapToken.accessToken,
      currentLocationTooltip: intl.formatMessage(mapMessages.currentLocationTooltip),
      layerSources,
      mapRef,
      tileSource,
    });
    setMap(map);

    return () => {
      if (map) {
        map.setTarget(undefined);
      }
    };
  }, [mapRef.current, mapToken.accessToken, layerSources, tileSource]);

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

    if (memoizedMap && viewChangeHandler) {
      memoizedMap.on('moveend', viewChangeHandler);
    }

    return () => {
      if (memoizedMap && viewChangeHandler) {
        memoizedMap.un('moveend', viewChangeHandler);
      }
    };
  }, [!!memoizedMap, center, zoom, onMove, onViewChange, onZoom, setCenter, setZoom]);

  useEffect(() => {
    if (memoizedMap && onMapClick) {
      memoizedMap.on('click', handleMapClick(onMapClick, zoom));
    }

    return () => {
      if (memoizedMap && onMapClick) {
        memoizedMap.un('click', handleMapClick(onMapClick, zoom));
      }
    };
  }, [!!memoizedMap, onMapClick?.toString(), zoom]);

  useEffect(() => {
    updateFeatures(layerSources, layers);
  }, [!!layerSources, ...layers]);

  useEffect(() => {
    if (!memoizedMap) {
      return () => undefined;
    }

    const select = getSelect(setDeselect, handleSelect);
    memoizedMap.addInteraction(select);

    const hover = getHoverSelect();
    memoizedMap.addInteraction(hover);

    return () => {
      memoizedMap.removeInteraction(select);
      memoizedMap.removeInteraction(hover);
    };
  }, [handleSelect, memoizedMap]);

  return {
    deselect,
    error,
    map: memoizedMap,
    mapRef,
    mapToken,
    requestMapToken,
  };
};

export default useMap;
