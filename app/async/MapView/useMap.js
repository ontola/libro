import {
  Map as OLMap,
  View,
} from 'ol';
import {
  FullScreen,
  defaults as defaultControls,
} from 'ol/control';
import { click, pointerMove } from 'ol/events/condition';
import { boundingExtent, getCenter } from 'ol/extent';
import Select from 'ol/interaction/Select';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import { fromLonLat, toLonLat } from 'ol/proj';
import Cluster from 'ol/source/Cluster';
import VectorSource from 'ol/source/Vector';
import XYZ from 'ol/source/XYZ';
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { getMetaContent } from '../../helpers/arguHelpers';
import { handle } from '../../helpers/logging';

const CLUSTER_DISTANCE = 30;
const CLUSTER_PADDING = 20;
const CLUSTER_ZOOM_DURATION = 1000;
const DEFAULT_LAT = 52.1344;
const DEFAULT_LON = 5.1917;
const DEFAULT_ZOOM = 6.8;
const TILE_SIZE = 512;

const getStyle = (styleName) => (feature) => {
  const features = feature?.get('features');

  return (features?.[0] || feature).get(styleName)(feature);
};

const updateFeatures = (layerSources, layers) => {
  if (layerSources) {
    layerSources.forEach((source, index) => {
      const layer = layers[index];
      if (layer.clustered) {
        source.source.clear(true);
        source.source.addFeatures(layer.features.slice() || []);
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
}) => {
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

const useMap = (props) => {
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
  const mapboxTileURL = useMemo(() => getMetaContent('mapboxTileURL'));
  const mapRef = useRef();
  useEffect(() => {
    if (!accessToken) {
      requestAccessToken();
    }
  }, [accessToken]);
  const { center, zoom } = view || {};

  const [internalCenter, setCenter] = useState(null);
  const [internalZoom, setZoom] = useState(zoom || DEFAULT_ZOOM);
  const [layerSources, setLayerSources] = useState(null);
  const [tileSource, setTileSource] = useState(null);
  const [error, setError] = useState(undefined);
  const [memoizedMap, setMap] = useState(undefined);

  const handleError = useCallback((e) => {
    handle(e);
    setError(true);
  }, []);
  const handleMapClick = useCallback(
    onMapClick ? (e) => onMapClick(...toLonLat(e.coordinate)) : undefined,
    []
  );
  const handleLoad = useCallback(() => {
    setError(undefined);
  }, []);
  const handleSelect = useCallback((e) => {
    const [feature] = e?.selected || [];
    const features = feature?.get('features');
    const selected = features?.[0] || feature;

    if (features?.length > 1) {
      const [left, top, right, bottom] = boundingExtent(
        features.map((f) => f.getGeometry().getCoordinates())
      );
      if (left !== right && top !== bottom) {
        e.mapBrowserEvent.map.getView().fit(
          [
            left - CLUSTER_PADDING,
            top - CLUSTER_PADDING,
            right + CLUSTER_PADDING,
            bottom + CLUSTER_PADDING,
          ],
          { duration: CLUSTER_ZOOM_DURATION }
        );
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
      onSelect(null);
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
    }
  );

  useEffect(() => {
    if (accessToken) {
      const sources = layers.map((layer) => {
        const vectorSource = new VectorSource();
        let source;
        if (layer.clustered) {
          source = new Cluster({
            distance: CLUSTER_DISTANCE,
            source: vectorSource,
          });
        } else {
          source = vectorSource;
        }

        return source;
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

    return () => {};
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
        map.setTarget(null);
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
        style: false,
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

    return () => {};
  }, [handleSelect, memoizedMap]);

  return {
    error,
    map: memoizedMap,
    mapRef,
  };
};

export default useMap;
