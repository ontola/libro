import * as fa from 'fontawesome';
import { namedNodeByIRI } from 'link-lib';
import {
  LinkedResourceContainer,
  lrsType,
  subjectType,
} from 'link-redux';
import { defaults as defaultControls } from 'ol/control';
import { click, pointerMove } from 'ol/events/condition';
import {
  Feature,
  Map as OLMap,
  Overlay,
  View,
} from 'ol';
import Circle from 'ol/geom/Circle';
import Point from 'ol/geom/Point';
import Select from 'ol/interaction/Select';
import VectorLayer from 'ol/layer/Vector';
import TileLayer from 'ol/layer/Tile';
import OverlayPositioning from 'ol/OverlayPositioning';
import { fromLonLat } from 'ol/proj';
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
import { connect } from 'react-redux';

import OverlayContainer from '../../components/OverlayContainer';
import { MAPBOX_TILE_API_BASE } from '../../config';
import withReducer from '../../containers/withReducer';
import { isFontAwesomeIRI, normalizeFontAwesomeIRI } from '../../helpers/iris';
import { NS } from '../../helpers/LinkedRenderStore';
import { handle } from '../../helpers/logging';
import { tryParseFloat } from '../../helpers/numbers';
import { popupTopology } from '../../topologies/Popup';

import './Map.scss';
import { getMapAccessToken } from './actions';
import reducer, { MapReducerKey } from './reducer';
import { getAccessToken } from './selectors';

const IMG_SIZE = 24;
const CIRCLE_SIZE = 12;
const ICON_X = 7;
const ICON_Y = 19;
const ANCHOR_X_CENTER = 0.5;
const ANCHOR_Y_BOTTOM = 1;

class Map extends React.Component {
  static propTypes = {
    accessToken: PropTypes.string,
    getAccessToken: PropTypes.func,
    lrs: lrsType,
    navigate: PropTypes.func,
    /** Placements to render on the map. */
    placements: PropTypes.arrayOf(PropTypes.instanceOf(NamedNode)),
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

    this.featureFromPlacement = this.featureFromPlacement.bind(this);
    this.highlightFeature = this.highlightFeature.bind(this);
    this.showFeatureResourceInOverlay = this.showFeatureResourceInOverlay.bind(this);

    this.state = {
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

  getImage(image) {
    if (this.iconStyles[image]) {
      return this.iconStyles[image];
    }

    this.iconStyles[image] = Map.generateMarkerImage(image);

    return this.iconStyles[image];
  }

  featureFromPlacement(placement) {
    const {
      id,
      lon,
      lat,
      image,
    } = this.resolvePlacement(placement);

    const f = new Feature(new Point(fromLonLat([lon, lat])));
    f.setId(id);
    f.setStyle(this.getImage(image.value));

    return f;
  }

  showFeatureResourceInOverlay(e) {
    const { lrs } = this.props;
    const [feature] = e.selected;

    let selected, position;

    if (feature) {
      const id = feature.getId();
      selected = lrs.getResourceProperty(namedNodeByIRI(id), NS.argu('placeable'));
      position = feature.getGeometry().getCoordinates();
    }

    this.setState({ selected });
    this.overlay.setPosition(position);
  }

  updateFeatures() {
    const features = this.props
      .placements
      .filter(Boolean)
      .map(this.featureFromPlacement);

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
    const center = this.resolvePlacement(centerPlacement);

    if (!center) {
      handle(new Error(`Map has no center (${subject})`));
      return;
    }

    const { lon, lat, zoom } = center;

    const layers = [
      new TileLayer({
        source: new XYZ({
          url: `${MAPBOX_TILE_API_BASE}mapbox.streets/{z}/{x}/{y}.png?access_token=${accessToken}`,
        }),
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
      const image = this.props.lrs.getResourceProperty(
        namedNodeByIRI(feature.getId()),
        NS.schema('image')
      );
      feature.setStyle(Map.generateMarkerImage(image.value, highlight));
    };

    e.selected.map(update(true));
    e.deselected.map(update(false));
  }

  resolvePlacement(placement) {
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
      </div>
    );
  }
}

const mapStateToProps = state => ({
  accessToken: getAccessToken(state),
});

const mapDispatchToProps = dispatch => ({
  getAccessToken: () => dispatch(getMapAccessToken()),
});

const ConnectedMap = connect(mapStateToProps, mapDispatchToProps)(Map);

export default withReducer(MapReducerKey, reducer)(ConnectedMap);
