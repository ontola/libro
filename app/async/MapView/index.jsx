import * as fa from 'fontawesome';
import {
  LinkedResourceContainer,
  linkType,
  lrsType,
  subjectType,
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
import { NamedNode } from 'rdflib';
import React from 'react';
import FontAwesome from 'react-fontawesome';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import OverlayContainer from '../../components/OverlayContainer';
import { MAPBOX_TILE_API_BASE } from '../../config';
import withReducer from '../../containers/withReducer';
import { collectionMembers } from '../../helpers/diggers';
import { isFontAwesomeIRI, normalizeFontAwesomeIRI } from '../../helpers/iris';
import { NS } from '../../helpers/LinkedRenderStore';
import { handle } from '../../helpers/logging';
import { tryParseFloat } from '../../helpers/numbers';
import { popupTopology } from '../../topologies/Popup';

import './Map.scss';
import { getMapAccessToken } from './actions';
import reducer, { MapReducerKey } from './reducer';
import { getAccessToken, getAccessTokenError } from './selectors';

const IMG_SIZE = 24;
const CIRCLE_SIZE = 12;
const ICON_X = 7;
const ICON_Y = 19;
const ANCHOR_X_CENTER = 0.5;
const ANCHOR_Y_BOTTOM = 1;
const DEFAULT_CENTER = {
  lat: 52.1344,
  lon: 5.1917,
  zoom: 6.8,
};

class MapView extends React.Component {
  static propTypes = {
    accessToken: PropTypes.string,
    error: PropTypes.instanceOf(Error),
    getAccessToken: PropTypes.func,
    /** Additional placement to render on the map */
    location: linkType,
    lrs: lrsType,
    navigate: PropTypes.func,
    onMapClick: PropTypes.func,
    /** Placements to render on the map. */
    placements: PropTypes.arrayOf(PropTypes.oneOfType([
      PropTypes.instanceOf(NamedNode),
      PropTypes.shape({
        id: PropTypes.string,
        image: PropTypes.instanceOf(NamedNode),
        lat: PropTypes.number,
        lon: PropTypes.number,
      }),
    ])),
    /** Enable to render the subject's placement */
    renderSubject: PropTypes.bool,
    /** Placeable to center on, it should have its own placement. */
    subject: subjectType,
    /**
     * A placement to center on.
     * Takes precedence over {subject}
     */
    subjectPlacement: subjectType,
  };

  static generateMarkerImage(image, highlight = false) {
    let text = '\uf041';
    if (isFontAwesomeIRI(image)) {
      text = fa(normalizeFontAwesomeIRI(image));
    }

    const canvas = document.createElement('canvas');
    const canvasCtx = canvas.getContext('2d');
    const vectorContext = toContext(canvasCtx, { size: [100, 100] });

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

    const circle = new Circle([CIRCLE_SIZE, CIRCLE_SIZE], CIRCLE_SIZE);

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
    this.showFeatureResourceInOverlay = this.showFeatureResourceInOverlay.bind(this);
    this.onMapClick = props.onMapClick
      ? e => props.onMapClick(toLonLat(e.coordinate))
      : undefined;

    this.onError = this.onError.bind(this);
    this.onLoad = this.onLoad.bind(this);

    this.state = {
      error: undefined,
      selected: undefined,
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

    this.iconStyles[image] = MapView.generateMarkerImage(image);

    return this.iconStyles[image];
  }

  featureFromPlacement(placement) {
    const values = this.resolvePlacement(placement);

    if (!values) {
      return undefined;
    }

    const {
      id,
      lon,
      lat,
      image,
    } = values;

    const f = new Feature(new Point(fromLonLat([lon, lat])));
    f.setId(id);
    f.setStyle(this.getImage(image.value));

    return f;
  }

  isInMemoryFeature(feature) {
    return this.props.placements.find(p => p.id === feature.getId());
  }

  showFeatureResourceInOverlay(e) {
    const { lrs } = this.props;
    const [feature] = e.selected;

    let selected, position;

    if (feature) {
      const id = feature.getId();
      selected = lrs.getResourceProperty(
        id.termType ? id : NamedNode.find(id),
        NS.argu('placeable')
      );
      position = feature.getGeometry().getCoordinates();
    }

    this.setState({ selected });
    this.overlay.setPosition(position);
  }

  updateFeatures() {
    const {
      location,
      lrs,
      placements,
      renderSubject,
      subject,
    } = this.props;

    const features = placements
      .filter(Boolean)
      .map(this.featureFromPlacement)
      .filter(Boolean);

    const locationFeature = this.featureFromPlacement(location);
    if (locationFeature) {
      features.push(locationFeature);
    }
    const subjectLocation = renderSubject && lrs.getResourceProperty(subject, NS.schema('location'));
    if (subjectLocation) {
      const subjectPlacement = this.resolvePlacement(subjectLocation);
      const subjectFeature = this.featureFromPlacement(subjectPlacement);
      features.push(subjectFeature);
    }

    this.placementFeatureSource.clear(true);
    this.placementFeatureSource.addFeatures(features);
  }

  createMap() {
    const { accessToken } = this.props;
    const { current } = this.mapRef;

    if (!current || this.map || !accessToken) {
      return;
    }

    const { lrs, subject, subjectPlacement } = this.props;

    const centerPlacement = subjectPlacement
      || (subject && lrs.getResourceProperty(subject, NS.schema('location')));
    let center = centerPlacement && this.resolvePlacement(
      lrs.dig(centerPlacement, collectionMembers).pop()
      || centerPlacement
    );

    if (!center) {
      handle(new Error(`Map has no center (${subject})`));
      center = DEFAULT_CENTER;
    }

    const { lon, lat, zoom } = center;

    if (this.tileSource) {
      this.tileSource.removeEventListener('tileloadend', this.onLoad);
      this.tileSource.removeEventListener('tileloaderr', this.onError);
    }
    this.tileSource = new XYZ({
      url: `${MAPBOX_TILE_API_BASE}mapbox.streets/{z}/{x}/{y}.png?access_token=${accessToken}`,
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
        center: fromLonLat([lon, lat]),
        zoom,
      }),
    });
    if (this.onMapClick) {
      this.map.addEventListener('click', this.onMapClick);
    }

    this.select = new Select({
      condition: click,
    });
    this.select.on('select', this.showFeatureResourceInOverlay);
    this.map.addInteraction(this.select);

    this.hover = new Select({
      condition: pointerMove,
    });
    this.hover.on('select', this.highlightFeature);
    this.map.addInteraction(this.hover);

    this.updateFeatures();
  }

  highlightFeature(e) {
    const update = highlight => (feature) => {
      const local = this.isInMemoryFeature(feature);
      let image;
      if (local) {
        ({ image } = local);
      } else {
        image = this.props.lrs.getResourceProperty(
          NamedNode.find(feature.getId()),
          NS.schema('image')
        );
      }
      feature.setStyle(MapView.generateMarkerImage(image.value, highlight));
    };

    e.selected.map(update(true));
    e.deselected.map(update(false));
  }

  resolvePlacement(placement) {
    if (!placement || !placement.termType) {
      return placement;
    }

    const { lrs } = this.props;

    const place = placement && lrs.getResourceProperty(placement, NS.schema('geo'));
    const image = lrs.getResourceProperty(placement, NS.schema('image'));

    if (!place) {
      return undefined;
    }

    const lon = lrs.getResourceProperty(place, NS.schema('longitude'));
    const lat = lrs.getResourceProperty(place, NS.schema('latitude'));
    const zoom = lrs.getResourceProperty(place, NS.argu('zoomLevel'));

    if (!(lon && lat && zoom)) {
      lrs.report(new TypeError(`Placement without coordinates: '${place.value}'`));

      return undefined;
    }

    return {
      id: placement.value,
      image,
      lat: tryParseFloat(lat),
      lon: tryParseFloat(lon),
      zoom: tryParseFloat(zoom),
    };
  }

  render() {
    const handleClick = e => e.target.className !== 'click-ignore'
      && this.props.navigate(this.state.selected);

    const errorMessage = (this.props.error || this.state.error) && (
      <span>
        <FormattedMessage
          defaultMessage="Error loading map"
          id="https://app.argu.co/i18n/errors/map/loadError"
        />
      </span>
    );

    return (
      <div className="Map">
        <div className="Map--map-container" ref={this.mapRef} />
        <OverlayContainer
          clickHandler={handleClick}
          overlayRef={this.overlayRef}
        >
          {this.state.selected && (
            <LinkedResourceContainer
              subject={this.state.selected}
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

const mapStateToProps = state => ({
  accessToken: getAccessToken(state),
  error: getAccessTokenError(state),
});

const mapDispatchToProps = dispatch => ({
  getAccessToken: () => dispatch(getMapAccessToken()),
});

const ConnectedMap = connect(mapStateToProps, mapDispatchToProps)(MapView);

export default withReducer(MapReducerKey, reducer)(ConnectedMap);
