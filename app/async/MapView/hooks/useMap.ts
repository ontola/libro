import {
  Feature,
  MapBrowserEvent,
  Map as OLMap,
  View,
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
  EventHandler,
  MutableRefObject,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useIntl } from 'react-intl';

import { getMetaContent } from '../../../helpers/dom';
import { handle } from '../../../helpers/logging';
import useMapAccessToken, { MapAccessToken, RequestMapAccessToken } from '../../../hooks/useMapAccessToken';
import { mapMessages } from '../../../translations/messages';
import CurrentLocationControl from '../components/CurrentLocationControl';

import { useSelectHandler } from './useSelectHandler';

export const FOCUS_ZOOM = 12;
const CLUSTER_DISTANCE = 30;
const TILE_SIZE = 512;

interface Layer {
  clustered?: boolean;
  features: Feature[];
}

export interface ViewProps {
  center: Coordinate;
  zoom: number;
}

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
    view: new View({
      center,
      zoom,
    }),
  });
};

export const centerChanged = (
  center: Coordinate,
  zoom: number,
  view?: View,
): void => {
  if (view) {
    view.animate({
      center,
      zoom,
    });
  }
};

export const handleMapClick = (
  onMapClick:(newLon: number, newLat: number, newZoom: number) => void,
  internalZoom: number,
): (e: MapBrowserEvent) => boolean => (e: MapBrowserEvent) => {
  if (onMapClick) {
    const [lon, lat] = toLonLat(e.coordinate);
    onMapClick(lon, lat, e.map.getView().getZoom() || internalZoom);
  }

  return true;
};

const handleViewChange = (
  internalCenter: Coordinate,
  setCenter: Dispatch<SetStateAction<Coordinate>>,
  internalZoom: number,
  setZoom: Dispatch<SetStateAction<number>>,
  onMove?: EventHandler<any>,
  onViewChange?: (center: Coordinate, zoom: number) => any,
  onZoom?: EventHandler<any>,
): (e: MapBrowserEvent) => void => (e: MapBrowserEvent) => {
  const newCenter = e.map.getView().getCenter();

  if (newCenter && newCenter !== internalCenter) {
    if (onMove) {
      onMove(newCenter);
    }

    setCenter(newCenter);
  }

  const newZoom = e.map.getView().getZoom();

  if (newZoom && newZoom !== internalZoom) {
    if (onZoom) {
      onZoom(newZoom);
    }

    setZoom(newZoom);
  }

  if (newCenter && newZoom && onViewChange) {
    onViewChange(newCenter, newZoom);
  }
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

export const getHoverSelect = (): Select =>
  new Select({
    condition: pointerMove,
    style: getStyle('hoverStyle'),
  });

export interface UseMapProps {
  layers: Layer[];
  onClusterSelect?: (features: Feature[], newCenter: Coordinate) => void;
  onMapClick?: (newLon: number, newLat: number, newZoom: number) => void;
  onMove?: EventHandler<any>;
  onSelect?: (feature: Feature | undefined, center: Coordinate | undefined) => any;
  onViewChange?: (center: Coordinate, zoom: number) => any;
  onZoom?: EventHandler<any>;
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
  const mapboxTileURL = useMemo(
    () => getMetaContent('mapboxTileURL'),
    [],
  );
  const mapRef = useRef<HTMLDivElement>(null);
  // center should probably only be used for initialization
  const { center, zoom } = view;

  const [internalCenter, setCenter] = useState<Coordinate>(center);
  const [internalZoom, setZoom] = useState<number>(zoom);
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
      const sources = layers.map((layer) => {
        const vectorSource = new VectorSource();
        let layerSource;

        if (layer.clustered) {
          layerSource = new Cluster({
            distance: CLUSTER_DISTANCE,
            source: vectorSource,
          });
        } else {
          layerSource = vectorSource;
        }

        return layerSource;
      });

      setLayerSources(sources);
      const source = new XYZ({
        tileSize: [TILE_SIZE, TILE_SIZE],
        url: `${mapboxTileURL}/tiles/{z}/{x}/{y}?access_token=${mapToken.accessToken}`,
      });
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
    const viewChangeHandler = handleViewChange(internalCenter, setCenter, internalZoom, setZoom,  onMove, onViewChange, onZoom);

    if (memoizedMap && viewChangeHandler) {
      memoizedMap.addEventListener('moveend', viewChangeHandler as any);
    }

    return () => {
      if (memoizedMap && viewChangeHandler) {
        memoizedMap.removeEventListener('moveend', viewChangeHandler as any);
      }
    };
  }, [!!memoizedMap, internalCenter, internalZoom, onMove, onViewChange, onZoom, setCenter, setZoom]);

  useEffect(() => {
    if (memoizedMap && onMapClick) {
      memoizedMap.addEventListener('click', handleMapClick(onMapClick, internalZoom) as any);
    }

    return () => {
      if (memoizedMap && onMapClick) {
        memoizedMap.removeEventListener('click', handleMapClick(onMapClick, internalZoom) as any);
      }
    };
  }, [!!memoizedMap, onMapClick]);

  useEffect(() => centerChanged(center, zoom, memoizedMap?.getView()), [memoizedMap, center, zoom]);

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
