import * as fa from 'fontawesome';
import {
  Resource,
  linkType,
} from 'link-redux';
import {
  Feature,
  Map as OLMap,
  Overlay,
  View,
} from 'ol';
import { defaults as defaultControls } from 'ol/control';
import { click, pointerMove } from 'ol/events/condition';
import Circle from 'ol/geom/Circle';
import Point from 'ol/geom/Point';
import Select from 'ol/interaction/Select';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import OverlayPositioning from 'ol/OverlayPositioning';
import { fromLonLat, toLonLat } from 'ol/proj';
import { toContext } from 'ol/render';
import VectorSource from 'ol/source/Vector';
import XYZ from 'ol/source/XYZ';
import CircleStyle from 'ol/style/Circle';
import Fill from 'ol/style/Fill';
import Icon from 'ol/style/Icon';
import Stroke from 'ol/style/Stroke';
import Style from 'ol/style/Style';
import PropTypes from 'prop-types';
import React from 'react';
import FontAwesome from 'react-fontawesome';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import OverlayContainer from '../../components/OverlayContainer';
import { MAPBOX_TILE_API_BASE, MAPBOX_TILE_STYLE } from '../../config';
import withReducer from '../../containers/withReducer';
import { isFontAwesomeIRI, normalizeFontAwesomeIRI } from '../../helpers/iris';
import { handle } from '../../helpers/logging';
import { popupTopology } from '../../topologies/Popup';

import 'ol/ol.css';
import './Map.scss';
import { getMapAccessToken } from './actions';
import reducer, { MapReducerKey } from './reducer';
import { getAccessToken, getAccessTokenError } from './selectors';

const IMG_SIZE = 26;
const CIRCLE_RADIUS = 12;
const CIRCLE_SIZE = 13;
const ICON_X = 8;
const ICON_Y = 19;
const ANCHOR_X_CENTER = 0.5;
const ANCHOR_Y_BOTTOM = 1;
const DEFAULT_LAT = 52.1344;
const DEFAULT_LON = 5.1917;
const DEFAULT_ZOOM = 6.8;
const TILE_SIZE = 512;

const generateMarkerImage = (image, highlight = false) => {
  let text = '\uf041';
  if (isFontAwesomeIRI(image)) {
    text = fa(normalizeFontAwesomeIRI(image));
  }

  const canvas = document.createElement('canvas');
  const canvasCtx = canvas.getContext('2d');
  const vectorContext = toContext(canvasCtx, {
    pixelRatio: 1,
    size: [100, 100],
  });

  const fill = new Fill({ color: highlight ? '#92a1b5' : '#475668' });
  const stroke = new Stroke({
    color: 'white',
    width: 2,
  });
  const circleStyle = new Style({
    fill,
    image: new CircleStyle({
      fill,
      radius: 10,
      stroke,
    }),
    stroke,
  });

  const circle = new Circle([CIRCLE_SIZE, CIRCLE_SIZE], CIRCLE_RADIUS);

  vectorContext.setStyle(circleStyle);
  vectorContext.drawGeometry(circle);

  canvasCtx.fillStyle = 'white';
  canvasCtx.font = 'normal 18px FontAwesome';
  canvasCtx.fillText(text, ICON_X, ICON_Y);

  return new Style({
    image: new Icon({
      anchor: [ANCHOR_X_CENTER, ANCHOR_Y_BOTTOM],
      img: canvas,
      imgSize: [IMG_SIZE, IMG_SIZE],
    }),
  });
};

const createMap = ({
  accessToken,
  initialLat,
  initialLon,
  initialZoom,
  mapRef,
  overlayRef,
  tileSource,
  placementFeatureSource,
}) => {
  const { current } = mapRef;

  if (!current || !accessToken || !placementFeatureSource || !tileSource) {
    return [];
  }

  const layers = [
    new TileLayer({
      source: tileSource,
    }),
    new VectorLayer({
      source: placementFeatureSource,
    }),
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

const featureFromPlacement = (getImage, placement) => {
  if (!placement) {
    return undefined;
  }

  const {
    id,
    lon,
    lat,
    image,
  } = placement;

  if (!image) {
    return undefined;
  }

  const f = new Feature(new Point(fromLonLat([lon, lat])));
  f.setId(id);
  f.setStyle(getImage(image.value));

  return f;
};

const updateFeatures = (placementFeatureSource, getImage, features) => {
  if (placementFeatureSource) {
    const mapFeatures = (features || [])
      .filter(Boolean)
      .map((placement) => featureFromPlacement(getImage, placement))
      .filter(Boolean);

    placementFeatureSource.clear(true);
    placementFeatureSource.addFeatures(mapFeatures);
  }
};

const useMap = (props) => {
  const {
    accessToken,
    features,
    requestAccessToken,
    navigate,
    onMapClick,
    onSelect,
    overlayResource,
  } = props;
  const mapRef = React.useRef();
  const overlayRef = React.useRef(document.createElement('div'));
  React.useEffect(() => {
    if (!accessToken) {
      requestAccessToken();
    }
  }, [accessToken]);

  const [placementFeatureSource, setPlacementFeatureSource] = React.useState(null);
  const [tileSource, setTileSource] = React.useState(null);
  const [error, setError] = React.useState(undefined);
  const [memoizedOverlay, setOverlay] = React.useState(undefined);
  const [memoizedMap, setMap] = React.useState(undefined);
  const [iconStyles, setIconStyles] = React.useState({});

  const getImage = React.useCallback((image) => {
    if (iconStyles[image]) {
      return iconStyles[image];
    }
    const newIconStyles = { ...iconStyles };
    newIconStyles[image] = generateMarkerImage(image);

    setIconStyles(newIconStyles);

    return newIconStyles[image];
  }, []);
  const featureById = React.useCallback((feature) => (
    features.find((p) => p.id === feature.getId())
  ), [features]);
  const highlightFeature = React.useCallback((highlight) => (feature) => {
    const local = featureById(feature);
    if (local) {
      const { image } = local;

      feature.setStyle(generateMarkerImage(image.value, highlight));
    }
  }, [featureById]);

  const handleError = React.useCallback((e) => {
    handle(e);
    setError(true);
  }, []);
  const handleMapClick = React.useCallback(
    onMapClick ? (e) => onMapClick(toLonLat(e.coordinate)) : undefined,
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
  const handleHover = React.useCallback((e) => {
    e.selected.map(highlightFeature(true));
    e.deselected.map(highlightFeature(false));
  }, []);

  React.useEffect(() => {
    if (accessToken) {
      setPlacementFeatureSource(new VectorSource());
      const source = new XYZ({
        tileSize: [TILE_SIZE, TILE_SIZE],
        url: `${MAPBOX_TILE_API_BASE}/${MAPBOX_TILE_STYLE}/tiles/{z}/{x}/{y}?access_token=${accessToken}`,
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
      mapRef,
      overlayRef,
      placementFeatureSource,
      tileSource,
    });
    setOverlay(overlay);
    setMap(map);

    if (map && handleMapClick) {
      map.addEventListener('click', handleMapClick);
    }

    return () => {
      if (map) {
        if (handleMapClick) {
          map.removeEventListener('click', handleMapClick);
        }
        map.setTarget(null);
      }
    };
  }, [mapRef.current, accessToken, placementFeatureSource, tileSource]);

  React.useEffect(() => {
    updateFeatures(placementFeatureSource, getImage, features);
  }, [placementFeatureSource, features]);

  React.useEffect(() => {
    if (memoizedMap) {
      const select = new Select({
        condition: click,
      });
      select.on('select', handleSelect);
      memoizedMap.addInteraction(select);

      const hover = new Select({
        condition: pointerMove,
      });
      hover.on('select', handleHover);
      memoizedMap.addInteraction(hover);

      return () => {
        memoizedMap.removeInteraction(select);
        memoizedMap.removeInteraction(hover);
      };
    }

    return () => {};
  }, [handleSelect, handleHover, memoizedMap]);

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
    overlayResource,
  } = props;
  const {
    error,
    mapRef,
    handleOverlayClick,
    overlayRef,
  } = useMap(props);

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
      <div className="Map" data-testid="map-view">
        <div className="Map--map-container" />
        <div className="Map--map-indicator">
          <FontAwesome name="map-o" />
          {errorMessage}
        </div>
      </div>
    );
  }

  return (
    <div className="Map" data-testid="map-view">
      <div className="Map--map-container" ref={mapRef} />
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
