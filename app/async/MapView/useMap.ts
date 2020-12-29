import {
  Feature,
  Map as OLMap,
  View,
} from 'ol';
import {
  defaults as defaultControls,
  FullScreen,
} from 'ol/control';
import { Coordinate } from 'ol/coordinate';
import { click, pointerMove } from 'ol/events/condition';
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
import {
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

const CLUSTER_DISTANCE = 30;
const CLUSTER_PADDING = 0.5;
const DEFAULT_LAT = 52.1344;
const DEFAULT_LON = 5.1917;
const DEFAULT_ZOOM = 6.8;
const TILE_SIZE = 512;

interface Layer {
  clustered: boolean;
  features: Feature[];
}

interface ViewProps {
  center: Coordinate;
  zoom: number;
}

interface CreateMapProps {
  accessToken: string;
  layerSources: Array<VectorSource | Cluster> | null;
  mapRef: MutableRefObject<HTMLDivElement | null>;
  tileSource: TileSource | null;
  view: ViewProps;
}
const getStyle = (styleName: string): StyleFunction => (
  (feature: FeatureLike) => {
    const features = feature?.get('features');

    return (features?.[0] || feature).get(styleName)(feature);
  }
);

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

const createMap = ({
  accessToken,
  layerSources,
  mapRef,
  tileSource,
  view,
}: CreateMapProps): OLMap | null => {
  const { current } = mapRef;
  const { center, zoom } = view || {};

  if (!current || !accessToken || !layerSources || !tileSource) {
    return null;
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
    controls: defaultControls({
      rotate: false,
    }).extend([
      new FullScreen(),
    ]),
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
  accessToken: string;
  layers: Layer[];
  requestAccessToken: () => any;
  onMapClick: (newLon: number, newLat: number) => void;
  onMove: EventHandler<any>;
  onSelect: (feature: Feature | null, center: Coordinate | null) => any;
  onViewChange: (center: Coordinate, zoom: number) => any;
  onZoom: EventHandler<any>;
  view: ViewProps;
}

const useMap = (props: UseMapProps) => {
  const {
    accessToken,
    layers,
    requestAccessToken,
    onMapClick,
    onMove,
    onSelect,
    onViewChange,
    onZoom,
    view,
  } = props;
  const mapboxTileURL = useMemo(
    () => getMetaContent('mapboxTileURL'),
    [],
  );
  const mapRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!accessToken) {
      requestAccessToken();
    }
  }, [accessToken]);
  const { center, zoom } = view || {};

  const [internalCenter, setCenter] = useState(null);
  const [internalZoom, setZoom] = useState(zoom || DEFAULT_ZOOM);
  const [layerSources, setLayerSources] = useState(null as Array<Cluster | VectorSource> | null);
  const [tileSource, setTileSource] = useState(null as TileSource | null);
  const [error, setError] = useState(undefined as boolean | undefined);
  const [memoizedMap, setMap] = useState(null as OLMap | null);

  const handleError = useCallback((e) => {
    handle(e);
    setError(true);

    return true;
  }, []);
  const handleMapClick = useCallback(
    onMapClick ? (e) => {
      const [lon, lat] = toLonLat(e.coordinate);
      onMapClick(lon, lat);

      return true;
    } : () => true,
    [onMapClick],
  );
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
      if (left !== right && top !== bottom) {
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
      onSelect(null, null);
    }
  }, [onSelect]);
  const handleViewChange = useCallback(
    (e) => {
      const newCenter = e.map.getView().getCenter();
      if (newCenter !== internalCenter) {
        if (onMove) {
          onMove(newCenter);
        }
        setCenter(newCenter);
      }
      const newZoom = e.map.getView().getZoom();
      if (newZoom !== internalZoom) {
        if (onZoom) {
          onZoom(newZoom);
        }
        setZoom(newZoom);
      }
      if (onViewChange) {
        onViewChange(newCenter, newZoom);
      }

      return true;
    }, [internalCenter, internalZoom, onMove, onViewChange, onZoom, setCenter, setZoom],
  );

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
  }, [accessToken]);

  useEffect(() => {
    const map = createMap({
      ...props,
      layerSources,
      mapRef,
      tileSource,
    });
    setMap(map);

    if (map) {
      if (handleMapClick) {
        map.addEventListener('click', handleMapClick);
      }
      if (handleViewChange) {
        map.addEventListener('moveend', handleViewChange);
      }
    }

    return () => {
      if (map) {
        if (handleMapClick) {
          map.removeEventListener('click', handleMapClick);
        }
        if (handleViewChange) {
          map.removeEventListener('moveend', handleViewChange);
        }
        map.setTarget(undefined);
      }
    };
  }, [mapRef.current, accessToken, layerSources, tileSource]);

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

  useEffect(() => {
    if (memoizedMap) {
      const select = new Select({
        condition: click,
        style: undefined,
      });
      select.on('select', handleSelect);
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

    return () => null;
  }, [handleSelect, memoizedMap]);

  return {
    error,
    map: memoizedMap,
    mapRef,
  };
};

export default useMap;