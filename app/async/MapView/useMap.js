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

const DEFAULT_LAT = 52.1344;
const DEFAULT_LON = 5.1917;
const DEFAULT_ZOOM = 6.8;
const TILE_SIZE = 512;
const CLUSTER_DISTANCE = 40;
const CLUSTER_ZOOM = 2;

const getStyle = (styleName) => (feature) => {
  const features = feature?.get('features');

  return (features?.[0] || feature).get(styleName)(feature);
};

const updateFeatures = (layerSources, layers) => {
  if (layerSources) {
    layerSources.forEach((source, index) => {
      source.clear(true);
      const layer = layers[index];
      if (layer.clustered) {
        source.source.addFeatures(layer.features.slice() || []);
      } else {
        source.addFeatures(layer.features.slice() || []);
      }
    });
  }
};

const createMap = ({
  accessToken,
  initialLat,
  initialLon,
  initialZoom,
  fullscreenButton,
  layerSources,
  mapRef,
  tileSource,
}) => {
  const { current } = mapRef;

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

  const controls = defaultControls({
    rotate: false,
  });
  if (fullscreenButton) {
    controls.extend([
      new FullScreen(),
    ]);
  }

  const map = new OLMap({
    controls,
    layers,
    target: current,
    view: new View({
      center: fromLonLat([initialLon || DEFAULT_LON, initialLat || DEFAULT_LAT]),
      zoom: initialZoom || DEFAULT_ZOOM,
    }),
  });

  return map;
};

const useMap = (props) => {
  const {
    accessToken,
    initialZoom,
    layers,
    requestAccessToken,
    setOverlayPosition,
    onMapClick,
    onSelect,
    onZoom,
  } = props;
  const mapboxTileURL = useMemo(() => getMetaContent('mapboxTileURL'));
  const mapRef = useRef();
  useEffect(() => {
    if (!accessToken) {
      requestAccessToken();
    }
  }, [accessToken]);

  const [zoom, setZoom] = useState(initialZoom || DEFAULT_ZOOM);
  const [layerSources, setLayerSources] = useState(null);
  const [tileSource, setTileSource] = useState(null);
  const [error, setError] = useState(undefined);
  const [memoizedMap, setMap] = useState(undefined);

  const handleError = useCallback((e) => {
    handle(e);
    setError(true);
  }, []);
  const handleMapClick = useCallback(
    onMapClick ? (e) => onMapClick(...toLonLat(e.coordinate), zoom) : undefined,
    []
  );
  const handleLoad = useCallback(() => {
    setError(undefined);
  }, []);
  const handleSelect = useCallback((e) => {
    const [feature] = e.selected;
    const features = feature?.get('features');
    const selected = features?.[0] || feature;

    if (features?.length > 1) {
      const bounds = boundingExtent(features.map((f) => f.getGeometry().getCoordinates()));
      const newZoom = e.mapBrowserEvent.map.getView().getZoom() + CLUSTER_ZOOM;

      e.mapBrowserEvent.map.getView().animate({
        center: getCenter(bounds),
        zoom: newZoom,
      });
    } else if (selected) {
      if (onSelect) {
        onSelect(selected);
      }

      const geometry = selected.getGeometry();
      if (geometry.getType === 'Point') {
        setOverlayPosition(geometry.getCoordinates());
      } else {
        setOverlayPosition(getCenter(geometry.getExtent()));
      }
    } else if (onSelect) {
      onSelect(null);
    }
  }, []);
  const handleZoom = useCallback(
    (e) => {
      const newZoom = e.map.getView().getZoom();
      if (newZoom !== zoom) {
        if (onZoom) {
          onZoom(newZoom);
        }
        setZoom(newZoom);
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
      if (handleZoom) {
        map.addEventListener('moveend', handleZoom);
      }
    }

    return () => {
      if (map) {
        if (handleMapClick) {
          map.removeEventListener('click', handleMapClick);
        }
        if (handleZoom) {
          map.removeEventListener('moveend', handleZoom);
        }
        map.setTarget(null);
      }
    };
  }, [mapRef.current, accessToken, layerSources, tileSource]);

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
    mapRef,
  };
};

export default useMap;
