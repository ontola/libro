import { Map as OLMap, View as OLView } from 'ol';
import { defaults as defaultControls } from 'ol/control';
import GeometryType from 'ol/geom/GeometryType';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import Cluster from 'ol/source/Cluster';
import TileSource from 'ol/source/Tile';
import VectorSource from 'ol/source/Vector';
import XYZ from 'ol/source/XYZ';
import React, {
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState, 
} from 'react';
import { useIntl } from 'react-intl';

import { handle } from '../../../../helpers/logging';
import { mapMessages } from '../../../../translations/messages';
import {
  ClusterSelectCallback,
  FeatureSelectCallback,
  Layer,
  MapInteractionCallback,
  MapMoveCallback,
  MapViewChangeCallback,
  MapZoomCallback,
  ViewProps,
} from '../../components/ControlledMap';
import useMapAccessToken, { MapAccessToken, RequestMapAccessToken } from '../../hooks/useMapAccessToken';
import CurrentLocationControl from '../components/CurrentLocationControl';
import InteractionTypeControl from '../components/InteractionTypeControl';

import { getStyle, useInteraction } from './useInteraction';
import useViewHandlers from './useViewHandlers';

export const FOCUS_ZOOM = 12;
const CLUSTER_DISTANCE = 30;
const TILE_SIZE = 512;

interface CreateMapProps {
  accessToken?: string;
  availableInteractionTypes?: GeometryType[];
  currentLocationTooltip: string;
  layerSources?: Array<VectorSource | Cluster>;
  mapRef: MutableRefObject<HTMLDivElement | null>;
  setInteractionType: (interactionType?: GeometryType) => void;
  tileSource?: TileSource;
  view: ViewProps;
}

export interface UseMapProps {
  availableInteractionTypes?: GeometryType[];
  layers: Layer[];
  mapboxTileURL: string;
  onClusterSelect?: ClusterSelectCallback;
  onInteraction?: MapInteractionCallback;
  onMove?: MapMoveCallback;
  onSelect?: FeatureSelectCallback;
  onViewChange?: MapViewChangeCallback;
  onZoom?: MapZoomCallback;
  view: ViewProps;
}

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
  availableInteractionTypes,
  currentLocationTooltip,
  layerSources,
  mapRef,
  setInteractionType,
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
    ...layerSources.map((source) => (
      new VectorLayer({
        source,
        style: getStyle('style'),
      })
    )),
  ];

  const customControls = [
    new CurrentLocationControl(currentLocationTooltip),
  ];

  if (availableInteractionTypes && availableInteractionTypes.length > 1) {
    availableInteractionTypes.forEach((type, index) => {
      customControls.push(new InteractionTypeControl(type, setInteractionType, index));
    });
  }

  const controls = defaultControls({
    rotate: false,
  }).extend(customControls);

  return new OLMap({
    controls,
    layers,
    target: current,
    view: new OLView(view),
  });
};

const toVectorSource = (layer: Layer): VectorSource => {
  const source = layer.clustered ?
    new Cluster({
      distance: CLUSTER_DISTANCE,
      source: new VectorSource(),
    }) :
    new VectorSource();

  return source;
};

const toTileSource = (accessToken: string, URL: string): TileSource =>
  new XYZ({
    tileSize: [TILE_SIZE, TILE_SIZE],
    url: `${URL}/tiles/{z}/{x}/{y}?access_token=${accessToken}`,
  });

const useMap = (props: UseMapProps): {
  deselect: (() => void) | undefined;
  error: Error | undefined;
  map: OLMap | undefined;
  mapRef: React.RefObject<HTMLDivElement>;
  mapToken: MapAccessToken;
  requestMapToken: RequestMapAccessToken;
} => {
  const {
    availableInteractionTypes,
    layers,
    mapboxTileURL,
    onClusterSelect,
    onInteraction,
    onMove,
    onSelect,
    onViewChange,
    onZoom,
    view,
  } = props;
  const intl = useIntl();
  const [mapToken, requestMapToken] = useMapAccessToken();
  const mapRef = useRef<HTMLDivElement>(null);

  const [layerSources, setLayerSources] = useState<Array<Cluster | VectorSource> | undefined>(undefined);
  const [tileSource, setTileSource] = useState<TileSource | undefined>(undefined);
  const [error, setError] = useState<Error | undefined>(undefined);
  const [map, setMap] = useState<OLMap | undefined>(undefined);
  const zoom = useViewHandlers(
    view,
    map,
    onMove,
    onViewChange,
    onZoom,
  );
  const [deselect, setInteractionType] = useInteraction(zoom, onInteraction, map, availableInteractionTypes, onClusterSelect, onSelect);

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
      availableInteractionTypes,
      currentLocationTooltip: intl.formatMessage(mapMessages.currentLocationTooltip),
      layerSources,
      mapRef,
      setInteractionType,
      tileSource,
    });
    setMap(newMap);

    newMap?.getViewport()?.addEventListener('contextmenu', () => {
      if (availableInteractionTypes && availableInteractionTypes.length > 1) {
        setInteractionType(undefined);
      }
    });

    return () => {
      if (newMap) {
        newMap.setTarget(undefined);
      }
    };
  }, [mapRef.current, mapToken.token, layerSources, tileSource]);

  useEffect(() => {
    updateFeatures(layerSources, layers);
  }, [!!layerSources, ...layers]);

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
