import RDFTypes from '@rdfdev/prop-types';
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
import { MAPBOX_TILE_API_BASE } from '../../config';
import withReducer from '../../containers/withReducer';
import { isFontAwesomeIRI, normalizeFontAwesomeIRI } from '../../helpers/iris';
import { handle } from '../../helpers/logging';
import { popupTopology } from '../../topologies/Popup';

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

class MapCanvas extends React.Component {
  static propTypes = {
    accessToken: PropTypes.string,
    error: PropTypes.instanceOf(Error),
    /** Features to render on the map. */
    features: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      image: RDFTypes.namedNode,
      lat: PropTypes.number,
      lon: PropTypes.number,
    })),
    getAccessToken: PropTypes.func,
    initialLat: PropTypes.number,
    initialLon: PropTypes.number,
    initialZoom: PropTypes.number,
    navigate: PropTypes.func,
    onMapClick: PropTypes.func,
    onSelect: PropTypes.func,
    overlayResource: linkType,
  };

  static generateMarkerImage(image, highlight = false) {
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
  }

  constructor(props) {
    super(props);

    this.iconStyles = {};
    this.mapRef = React.createRef();
    this.overlayRef = document.createElement('div');
    this.placementFeatureSource = new VectorSource();

    this.hover = undefined;
    this.map = undefined;
    this.overlay = undefined;
    this.select = undefined;
    this.tileSource = undefined;

    this.featureFromPlacement = this.featureFromPlacement.bind(this);
    this.highlightFeature = this.highlightFeature.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.onMapClick = props.onMapClick
      ? (e) => props.onMapClick(toLonLat(e.coordinate))
      : undefined;

    this.onHover = this.onHover.bind(this);
    this.onError = this.onError.bind(this);
    this.onLoad = this.onLoad.bind(this);

    this.state = {
      error: undefined,
    };
  }

  componentDidMount() {
    if (!this.props.accessToken) {
      this.props.getAccessToken();
    }
    this.createMap();
  }

  componentDidUpdate() {
    this.createMap();
    this.updateFeatures();
  }

  componentWillUnmount() {
    if (this.tileSource) {
      this.tileSource.removeEventListener('tileloaderr', this.onError);
    }
    if (this.map && this.onMapClick) {
      this.map.removeEventListener('click', this.onMapClick);
    }
  }

  onError(e) {
    handle(e);
    this.setState({
      error: true,
    });
  }

  onLoad() {
    if (this.state.error) {
      this.setState({
        error: undefined,
      });
    }
  }

  getImage(image) {
    if (this.iconStyles[image]) {
      return this.iconStyles[image];
    }

    this.iconStyles[image] = MapCanvas.generateMarkerImage(image);

    return this.iconStyles[image];
  }

  featureFromPlacement(placement) {
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
    f.setStyle(this.getImage(image.value));

    return f;
  }

  isInMemoryFeature(feature) {
    return this.props.features.find((p) => p.id === feature.getId());
  }

  onSelect(e) {
    const [feature] = e.selected;

    if (feature) {
      if (this.props.onSelect) {
        const id = feature.getId();
        this.props.onSelect(id);
      }

      const position = feature.getGeometry().getCoordinates();
      this.overlay.setPosition(position);
    } else {
      this.props.onSelect(null);
    }
  }

  updateFeatures() {
    const { features } = this.props;

    const mapFeatures = (features || [])
      .filter(Boolean)
      .map(this.featureFromPlacement)
      .filter(Boolean);

    this.placementFeatureSource.clear(true);
    this.placementFeatureSource.addFeatures(mapFeatures);
  }

  createMap() {
    const {
      accessToken,
      initialLat,
      initialLon,
      initialZoom,
    } = this.props;
    const { current } = this.mapRef;

    if (!current || this.map || !accessToken) {
      return;
    }

    if (this.tileSource) {
      this.tileSource.removeEventListener('tileloadend', this.onLoad);
      this.tileSource.removeEventListener('tileloaderr', this.onError);
    }
    this.tileSource = new XYZ({
      url: `${MAPBOX_TILE_API_BASE}mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=${accessToken}`,
    });
    this.tileSource.addEventListener('tileloadend', this.onLoad);
    this.tileSource.addEventListener('tileloaderr', this.onError);

    const layers = [
      new TileLayer({
        source: this.tileSource,
      }),
      new VectorLayer({
        source: this.placementFeatureSource,
      }),
    ];

    this.overlay = new Overlay({
      autoPan: true,
      element: this.overlayRef,
      positioning: OverlayPositioning.TOP_CENTER,
      stopEvent: true,
    });

    this.map = new OLMap({
      controls: defaultControls({
        rotate: false,
      }),
      layers,
      overlays: [this.overlay],
      target: current,
      view: new View({
        center: fromLonLat([initialLon || DEFAULT_LON, initialLat || DEFAULT_LAT]),
        zoom: initialZoom || DEFAULT_ZOOM,
      }),
    });
    if (this.onMapClick) {
      this.map.addEventListener('click', this.onMapClick);
    }

    this.select = new Select({
      condition: click,
    });
    this.select.on('select', this.onSelect);
    this.map.addInteraction(this.select);

    this.hover = new Select({
      condition: pointerMove,
    });
    this.hover.on('select', this.onHover);
    this.map.addInteraction(this.hover);

    this.updateFeatures();
  }

  onHover(e) {
    e.selected.map(this.highlightFeature(true));
    e.deselected.map(this.highlightFeature(false));
  }

  highlightFeature(highlight) {
    return (feature) => {
      const local = this.isInMemoryFeature(feature);
      if (local) {
        const { image } = local;

        feature.setStyle(MapCanvas.generateMarkerImage(image.value, highlight));
      }
    };
  }

  render() {
    const handleClick = (e) => e.target.className !== 'click-ignore'
      && this.props.navigate
      && this.props.navigate(this.props.overlayResource);

    const errorMessage = (this.props.error || this.state.error) && (
      <span>
        <FormattedMessage
          defaultMessage="Error loading map"
          id="https://app.argu.co/i18n/errors/map/loadError"
        />
      </span>
    );

    return (
      <div className="Map" data-testid="map-view">
        <div className="Map--map-container" ref={this.mapRef} />
        <OverlayContainer
          clickHandler={handleClick}
          overlayRef={this.overlayRef}
        >
          {this.props.overlayResource && (
            <Resource
              subject={this.props.overlayResource}
              topology={popupTopology}
            />
          )}
        </OverlayContainer>
        <div className="Map--map-indicator">
          <FontAwesome name="map-o" />
          {errorMessage}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  accessToken: getAccessToken(state),
  error: getAccessTokenError(state),
});

const mapDispatchToProps = (dispatch) => ({
  getAccessToken: () => dispatch(getMapAccessToken()),
});

export default connect(mapStateToProps, mapDispatchToProps)(
  withReducer(MapReducerKey, reducer)(MapCanvas)
);
