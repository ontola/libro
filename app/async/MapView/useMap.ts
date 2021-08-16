import {
  Feature,
  MapBrowserEvent,
  Map as OLMap,
  View,
} from 'ol';
import { defaults as defaultControls } from 'ol/control';
import { Coordinate } from 'ol/coordinate';
import { pointerMove, singleClick } from 'ol/events/condition';
import { boundingExtent, getCenter } from 'ol/extent';
import { FeatureLike } from 'ol/Feature';
import { Point } from 'ol/geom';
import Select from 'ol/interaction/Select';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import { fromLonLat, toLonLat } from 'ol/proj';
import Cluster from 'ol/source/Cluster';
import TileSource from 'ol/source/Tile';
import VectorSource from 'ol/source/Vector';
import XYZ from 'ol/source/XYZ';
import { StyleFunction } from 'ol/style/Style';
import React, {
  EventHandler,
  MutableRefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { getMetaContent } from '../../helpers/arguHelpers';
import { handle } from '../../helpers/logging';
import useMapAccessToken, { MapAccessToken, RequestMapAccessToken } from '../../hooks/useMapAccessToken';

import CurrentLocationControl from './CurrentLocationControl';

export const FOCUS_ZOOM = 12;
const CLUSTER_DISTANCE = 30;
const CLUSTER_PADDING = 0.5;
const DEFAULT_LAT = 52.1344;
const DEFAULT_LON = 5.1917;
const DEFAULT_ZOOM = 6.8;
const TILE_SIZE = 512;

interface Layer {
  clustered?: boolean;
  features: Feature[];
}

export interface ViewProps {
  center?: Coordinate;
  zoom?: number;
}

interface CreateMapProps {
  accessToken?: string;
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

const controls = defaultControls({
  rotate: false,
}).extend([new CurrentLocationControl( 'Show Current Location' )]);

const createMap = ({
  accessToken,
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

  const map = new OLMap({
    controls,
    layers,
    target: current,
    view: new View({
      center: center || fromLonLat([DEFAULT_LON, DEFAULT_LAT]),
      zoom: zoom || DEFAULT_ZOOM,
    }),
  });

  return map;
};

export interface UseMapProps {
  layers: Layer[];
  onClusterSelect?: (features: Feature[], newCenter: Coordinate) => void;
  onMapClick?: (newLon: number, newLat: number, newZoom: number) => void;
  onMove?: EventHandler<any>;
  onSelect?: (feature: Feature | undefined, center: Coordinate | undefined) => any;
  onViewChange?: (center: Coordinate, zoom: number) => any;
  onZoom?: EventHandler<any>;
  view?: ViewProps;
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
  const [mapToken, requestMapToken] = useMapAccessToken();
  const mapboxTileURL = useMemo(
    () => getMetaContent('mapboxTileURL'),
    [],
  );
  const mapRef = useRef<HTMLDivElement>(null);
  const { center, zoom } = view || {};

  const [internalCenter, setCenter] = useState<Coordinate | undefined>(undefined);
  const [internalZoom, setZoom] = useState(zoom || DEFAULT_ZOOM);
  const [layerSources, setLayerSources] = useState<Array<Cluster | VectorSource> | undefined>(undefined);
  const [tileSource, setTileSource] = useState<TileSource | undefined>(undefined);
  const [error, setError] = useState<Error | undefined>(undefined);
  const [memoizedMap, setMap] = useState<OLMap | undefined>(undefined);

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
  const handleSelect = useCallback((e) => {
    const [feature] = e?.selected || [];
    const features = feature?.get('features');
    const selected = features?.[0] || feature;

    if (features?.length > 1) {
      const [left, top, right, bottom] = boundingExtent(
        features.map((f: Feature<Point>) => f?.getGeometry()?.getCoordinates()),
      );
      const clusterCenter = getCenter([left, top, right, bottom]);

      if (left === right && top === bottom) {
        if (onClusterSelect) {
          onClusterSelect(features, clusterCenter);
        }
      } else {
        const eventView = e.mapBrowserEvent.map.getView();
        // eslint-disable-next-line no-underscore-dangle
        const [width, height] = eventView.getViewportSize_();
        const resolution = eventView.getResolutionForExtentInternal(
          [left, top, right, bottom],
          [width * CLUSTER_PADDING, height * CLUSTER_PADDING],
        );
        const newZoom = eventView.getZoomForResolution(resolution);

        e.mapBrowserEvent.map.getView().animate({
          center: clusterCenter,
          zoom: newZoom,
        });
      }
    } else if (selected) {
      const geometry = selected.getGeometry();
      const selectCenter = (geometry.getType() === 'Point')
        ? geometry.getCoordinates()
        : getCenter(geometry.getExtent());

      if (onSelect) {
        onSelect(selected, selectCenter);
      }
    } else if (onSelect) {
      onSelect(undefined, undefined);
    }
  }, [onSelect]);

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
    const handleViewChange = (e: MapBrowserEvent) => {
      const newCenter = e.map.getView().getCenter();

      if (newCenter !== internalCenter) {
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

    if (memoizedMap && handleViewChange) {
      memoizedMap.addEventListener('moveend', handleViewChange as any);
    }

    return () => {
      if (memoizedMap && handleViewChange) {
        memoizedMap.removeEventListener('moveend', handleViewChange as any);
      }
    };
  }, [!!memoizedMap, internalCenter, internalZoom, onMove, onViewChange, onZoom, setCenter, setZoom]);

  useEffect(() => {
    const handleMapClick = (e: MapBrowserEvent) => {
      if (onMapClick) {
        const [lon, lat] = toLonLat(e.coordinate);
        onMapClick(lon, lat, e.map.getView().getZoom() || internalZoom);
      }

      return true;
    };

    if (memoizedMap && onMapClick) {
      memoizedMap.addEventListener('click', handleMapClick as any);
    }

    return () => {
      if (memoizedMap && onMapClick) {
        memoizedMap.removeEventListener('click', handleMapClick as any);
      }
    };
  }, [!!memoizedMap, onMapClick]);

  useEffect(() => {
    if (memoizedMap && (center || zoom)) {
      if (!internalCenter) {
        if (center) {
          memoizedMap.getView().setCenter(center);
        }

        if (zoom) {
          memoizedMap.getView().setZoom(zoom);
        }
      } else {
        memoizedMap.getView().animate({
          center,
          zoom,
        });
      }
    }
  }, [memoizedMap, center, zoom]);

  useEffect(() => {
    updateFeatures(layerSources, layers);
  }, [!!layerSources, ...layers]);

  const [deselect, setDeselect] = useState<undefined | (() => void)>(undefined);
  useEffect(() => {
    if (memoizedMap) {
      const select = new Select({
        condition: singleClick,
        style: getStyle('hoverStyle'),
      });
      select.on('select', handleSelect);
      setDeselect(() => () => {
        select.getFeatures().clear();
        handleSelect(undefined);
      });
      memoizedMap.addInteraction(select);

      const hover = new Select({
        condition: pointerMove,
        style: getStyle('hoverStyle'),
      });
      memoizedMap.addInteraction(hover);

      return () => {
        memoizedMap.removeInteraction(select);
        memoizedMap.removeInteraction(hover);
      };
    }

    return () => undefined;
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
