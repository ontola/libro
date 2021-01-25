import Cluster from 'ol/source/Cluster';
import VectorSource from 'ol/source/Vector';
import {
  useEffect,
  useRef,
} from 'react';

import useCreateMap, { ViewProps } from './useMap/useCreateMap';
import useLayeredSource, { Layer } from './useMap/useLayerSource';
import useMapInteraction, { MapCallbacks } from './useMap/useMapInteraction';

const DEFAULT_ZOOM = 6.8;

const updateFeatures = (layerSources: Array<VectorSource | Cluster> | null, layers: Layer[]) => {
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

export interface UseMapProps extends MapCallbacks {
  accessToken: string;
  layers: Layer[];
  requestAccessToken: () => any;
  view: ViewProps;
}

const useMap = ({
  accessToken,
  layers,
  requestAccessToken,
  view,
  ...callbacks
}: UseMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!accessToken) {
      requestAccessToken();
    }
  }, [accessToken]);
  const { center, zoom } = view || { zoom: DEFAULT_ZOOM};

  const [error, layerSources, tileSource] = useLayeredSource(accessToken, layers);
  const map = useCreateMap(
    accessToken,
    mapRef,
    view,
    layerSources,
    tileSource,
  );
  const [internalCenter] = useMapInteraction(map, view, callbacks);

  useEffect(() => {
    if (map && (center || zoom)) {
      if (!internalCenter) {
        if (center) {
          map.getView().setCenter(center);
        }
        if (zoom) {
          map.getView().setZoom(zoom);
        }
      } else {
        map.getView().animate({
          center,
          zoom,
        });
      }
    }
  }, [map, center, zoom]);

  useEffect(() => {
    updateFeatures(layerSources, layers);
  }, [!!layerSources, ...layers]);

  return {
    error,
    map,
    mapRef,
  };
};

export default useMap;
