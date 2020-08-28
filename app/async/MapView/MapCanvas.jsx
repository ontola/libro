import classNames from 'classnames';
import {
  Resource,
  linkType,
} from 'link-redux';
import {
  Map as OLMap,
  Overlay,
  View,
} from 'ol';
import { defaults as defaultControls } from 'ol/control';
import { click, pointerMove } from 'ol/events/condition';
import Select from 'ol/interaction/Select';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import OverlayPositioning from 'ol/OverlayPositioning';
import { fromLonLat, toLonLat } from 'ol/proj';
import VectorSource from 'ol/source/Vector';
import XYZ from 'ol/source/XYZ';
import PropTypes from 'prop-types';
import React from 'react';
import FontAwesome from 'react-fontawesome';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import OverlayContainer from '../../components/OverlayContainer';
import withReducer from '../../containers/withReducer';
import { getMetaContent } from '../../helpers/arguHelpers';
import { handle } from '../../helpers/logging';
import { popupTopology } from '../../topologies/Popup';

import 'ol/ol.css';
import useMapStyles from './useMapStyles';
import { getMapAccessToken } from './actions';
import reducer, { MapReducerKey } from './reducer';
import { getAccessToken, getAccessTokenError } from './selectors';

const DEFAULT_LAT = 52.1344;
const DEFAULT_LON = 5.1917;
const DEFAULT_ZOOM = 6.8;
const TILE_SIZE = 512;

const getStyle = (styleName) => (feature) => (
  feature.get(styleName)
);

const createMap = ({
  accessToken,
  initialLat,
  initialLon,
  initialZoom,
  layerSources,
  mapRef,
  overlayRef,
  tileSource,
}) => {
  const { current } = mapRef;

  if (!current || !accessToken || !layerSources || !tileSource) {
    return [];
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

  const overlay = new Overlay({
    autoPan: true,
    element: overlayRef.current,
    positioning: OverlayPositioning.TOP_CENTER,
    stopEvent: true,
  });

  const map = new OLMap({
    controls: defaultControls({
      rotate: false,
    }),
    layers,
    overlays: [overlay],
    target: current,
    view: new View({
      center: fromLonLat([initialLon || DEFAULT_LON, initialLat || DEFAULT_LAT]),
      zoom: initialZoom || DEFAULT_ZOOM,
    }),
  });

  return [map, overlay];
};

const updateFeatures = (layerSources, layers) => {
  if (layerSources) {
    layerSources.forEach((source, index) => {
      source.clear(true);
      source.addFeatures(layers[index].features?.map((f) => f) || []);
    });
  }
};

const useMap = (props) => {
  const {
    accessToken,
    initialZoom,
    layers,
    requestAccessToken,
    navigate,
    onMapClick,
    onSelect,
    onZoom,
    overlayResource,
  } = props;
  const mapboxTileURL = React.useMemo(() => getMetaContent('mapboxTileURL'));
  const mapRef = React.useRef();
  const overlayRef = React.useRef(document.createElement('div'));
  React.useEffect(() => {
    if (!accessToken) {
      requestAccessToken();
    }
  }, [accessToken]);

  const [zoom, setZoom] = React.useState(initialZoom || DEFAULT_ZOOM);
  const [layerSources, setLayerSources] = React.useState(null);
  const [tileSource, setTileSource] = React.useState(null);
  const [error, setError] = React.useState(undefined);
  const [memoizedOverlay, setOverlay] = React.useState(undefined);
  const [memoizedMap, setMap] = React.useState(undefined);

  const handleError = React.useCallback((e) => {
    handle(e);
    setError(true);
  }, []);
  const handleMapClick = React.useCallback(
    onMapClick ? (e) => onMapClick(...toLonLat(e.coordinate), zoom) : undefined,
    []
  );
  const handleLoad = React.useCallback(() => {
    setError(undefined);
  }, []);
  const handleSelect = React.useCallback((e) => {
    const [feature] = e.selected;

    if (feature) {
      if (onSelect) {
        const id = feature.getId();
        onSelect(id);
      }

      const position = feature.getGeometry().getCoordinates();
      memoizedOverlay.setPosition(position);
    } else if (onSelect) {
      onSelect(null);
    }
  }, [memoizedOverlay]);
  const handleZoom = React.useCallback(
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

  React.useEffect(() => {
    if (accessToken) {
      setLayerSources(layers.map(() => new VectorSource()));
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

  React.useEffect(() => {
    const [map, overlay] = createMap({
      ...props,
      layerSources,
      mapRef,
      overlayRef,
      tileSource,
    });
    setOverlay(overlay);
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

  React.useEffect(() => {
    updateFeatures(layerSources, layers);
  }, [!!layerSources, ...layers]);

  React.useEffect(() => {
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

  const handleOverlayClick = React.useCallback((e) => (
    e.target.className !== 'click-ignore' && navigate && navigate(overlayResource)
  ), [overlayResource]);

  return {
    error,
    handleOverlayClick,
    mapRef,
    overlayRef,
  };
};

const MapCanvas = (props) => {
  const {
    accessTokenError,
    large,
    overlayResource,
  } = props;
  const {
    error,
    mapRef,
    handleOverlayClick,
    overlayRef,
  } = useMap(props);
  const classes = useMapStyles();
  const wrapperClassName = classNames({
    [classes.container]: true,
    [classes.containerFullscreen]: large,
  });
  const canvasClassName = classNames({
    [classes.canvas]: true,
    [classes.canvasFullscreen]: large,
  });
  const errorMessage = (accessTokenError || error) && (
    <span>
      <FormattedMessage
        defaultMessage="Error loading map"
        id="https://app.argu.co/i18n/errors/map/loadError"
      />
    </span>
  );

  if (!mapRef || errorMessage) {
    return (
      <div className={wrapperClassName} data-testid="map-view">
        <div className={canvasClassName} />
        <div className={classes.indicator}>
          <FontAwesome name="map-o" />
          {errorMessage}
        </div>
      </div>
    );
  }

  return (
    <div className={wrapperClassName} data-testid="map-view">
      <div className={canvasClassName} ref={mapRef} />
      <OverlayContainer
        clickHandler={handleOverlayClick}
        overlayRef={overlayRef.current}
      >
        {overlayResource && (
          <Resource
            subject={overlayResource}
            topology={popupTopology}
          />
        )}
      </OverlayContainer>
    </div>
  );
};

MapCanvas.propTypes = {
  accessTokenError: PropTypes.string,
  large: PropTypes.bool,
  overlayResource: linkType,
};

const mapStateToProps = (state) => ({
  accessToken: getAccessToken(state),
  accessTokenError: getAccessTokenError(state),
});

const mapDispatchToProps = (dispatch) => ({
  requestAccessToken: () => dispatch(getMapAccessToken()),
});

export default connect(mapStateToProps, mapDispatchToProps)(
  withReducer(MapReducerKey, reducer)(MapCanvas)
);
