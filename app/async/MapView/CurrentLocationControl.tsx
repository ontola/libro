import MyLocationIcon from '@material-ui/icons/MyLocation';
// import CircularProgress from '@material-ui/icons/CircularProgress'; <- niet die
import CircularProgress from '@material-ui/core/CircularProgress';
import clsx from 'clsx';
import { Feature, Geolocation } from 'ol';
import { Control } from 'ol/control';
import { CLASS_CONTROL, CLASS_UNSELECTABLE } from 'ol/css';
import EventType from 'ol/events/EventType';
import Point from 'ol/geom/Point';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import {
  Circle,
  Fill,
  Stroke,
  Style,
} from 'ol/style';
import React from 'react';
import ReactDOM from 'react-dom';

const locationStyle = () => new Style({
  image: new Circle({
    fill: new Fill({
      color: '#3399CC',
    }),
    radius: 6,
    stroke: new Stroke({
      color: '#FFF',
      width: 2,
    }),
  }),
});

class CurrentLocationControl extends Control {
    private static geolocation?: Geolocation;
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    private static defaultZoom = 13;
    private readonly positionFeature: Feature;
    private readonly positionLayer:  VectorLayer;
    private readonly button: HTMLButtonElement;

    constructor( tipLabel : string) {
      super({
        element: document.createElement('div'),
      });

      this.positionFeature = new Feature();
      this.positionFeature.setProperties({
        hoverStyle: locationStyle,
        style: locationStyle,
      });
      this.positionFeature.setStyle(locationStyle);

      this.positionLayer = new VectorLayer({
        source: new VectorSource({
          features: [this.positionFeature],
        }),
      });

      const button = document.createElement('button');
      button.setAttribute('type', 'button');
      this.button = button;
      this.setNormalIcon(tipLabel);
      button.addEventListener(
        EventType.CLICK,
        this.handleClick.bind(this),
        false,
      );

      this.element.className = clsx('current-location', CLASS_UNSELECTABLE, CLASS_CONTROL);
      this.element.appendChild(button);

      this.getMap = this.getMap.bind(this);
      this.panToCurrentLocation = this.panToCurrentLocation.bind(this);
      this.handleChangePosition = this.handleChangePosition.bind(this);
    }

    public start() {
      const map = this.getMap();

      this.setLoadingIcon();

      if (!map) {
        return;
      }

      map.addLayer(this.positionLayer);

      if (!CurrentLocationControl.geolocation) {
        CurrentLocationControl.geolocation = new Geolocation({
          projection: map.getView().getProjection(),
          trackingOptions: {
            enableHighAccuracy: true,
          },
        });
        CurrentLocationControl.geolocation.setTracking(true);
        CurrentLocationControl.geolocation.once('change', () => {
          this.setNormalIcon();
          this.panToCurrentLocation();
        });
      } else {
        this.handleChangePosition();
        this.panToCurrentLocation();
      }

      CurrentLocationControl.geolocation.on('change:position', this.handleChangePosition);
    }

    public stop() {
      this.getMap()?.removeLayer(this.positionLayer!);

      if (CurrentLocationControl.geolocation) {
        CurrentLocationControl.geolocation.un('change:position', this.handleChangePosition);

        if (!CurrentLocationControl.geolocation.getListeners('change:position')?.length) {
          CurrentLocationControl.geolocation.setTracking(false);
          CurrentLocationControl.geolocation = undefined;
        }
      }
    }

    public panToCurrentLocation() {
      const coordinate = CurrentLocationControl.geolocation?.getPosition();

      if (coordinate) {
        const view = this.getMap()?.getView();
        const zoom = view?.getZoom() || CurrentLocationControl.defaultZoom;
        view?.animate({
          center: coordinate,
          duration: 300,
          zoom: Math.max(zoom, CurrentLocationControl.defaultZoom),
        });
      }
    }

    protected setLoadingIcon() {
      this.button.title = 'Loading location...';
      ReactDOM.render(<CircularProgress fontSize="small" />, this.button);
    }

    protected setNormalIcon(tipLabel?: string) {
      this.button.title = tipLabel || 'Show current location';
      ReactDOM.render(<MyLocationIcon fontSize="small" />, this.button);
    }

    protected handleClick(event: MouseEvent) {
      event.preventDefault();

      if (CurrentLocationControl.geolocation) {
        this.panToCurrentLocation();
      } else {
        this.start();
      }
    }

    protected handleChangePosition() {
      const coordinate = CurrentLocationControl.geolocation?.getPosition();
      this.positionFeature.setGeometry(coordinate ? new Point(coordinate) : undefined);
    }
}

export default CurrentLocationControl;
