import { Feature } from 'ol';
import Cluster from 'ol/source/Cluster';
import TileSource from 'ol/source/Tile';
import VectorSource from 'ol/source/Vector';
import XYZ from 'ol/source/XYZ';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { getMetaContent } from '../../../helpers/arguHelpers';
import { handle } from '../../../helpers/logging';

const CLUSTER_DISTANCE = 30;
const TILE_SIZE = 512;

export type LayerSources = Array<VectorSource | Cluster> | null;

export interface Layer {
  clustered: boolean;
  features: Feature[];
}

const useLayeredSource = (accessToken: string, layers: Layer[]): [boolean, LayerSources, TileSource | null] => {
  const [error, setError] = useState<boolean>(false);
  const [layerSources, setLayerSources] = useState<Array<Cluster | VectorSource> | null>(null);
  const [tileSource, setTileSource] = useState<TileSource | null>(null);

  const mapboxTileURL = useMemo(
    () => getMetaContent('mapboxTileURL'),
    [],
  );

  const handleError = useCallback((e) => {
    handle(e);
    setError(true);

    return true;
  }, []);

  const handleLoad = useCallback(() => {
    setError(false);

    return true;
  }, []);

  useEffect(() => {
    if (accessToken) {
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
        url: `${mapboxTileURL}/tiles/{z}/{x}/{y}?access_token=${accessToken}`,
      });
      source.addEventListener('tileloadend', handleLoad);
      source.addEventListener('tileloaderr', handleError);
      setTileSource(source);

      return () => {
        source.removeEventListener('tileloadend', handleLoad);
        source.removeEventListener('tileloaderr', handleError);
      };
    }

    return () => null;
  }, [accessToken, layers]);

  return [error, layerSources, tileSource];
};

export default useLayeredSource;
