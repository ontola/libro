import MyLocationIcon from '@material-ui/icons/MyLocation';
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

export interface CurrentLocationOptions {
  tipLabel: string;
}

class CurrentLocation extends Control {
  private static geolocation?: Geolocation;
  private static defaultZoom = 13;
  private readonly positionFeature: Feature;
  private readonly positionLayer: VectorLayer;

  constructor({ tipLabel }: CurrentLocationOptions) {
    super({
      element: document.createElement('div'),
    });

    this.positionFeature = new Feature();
    this.positionFeature.setStyle(new Style({
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
    }));

    this.positionLayer = new VectorLayer({
      source: new VectorSource({
        features: [this.positionFeature],
      }),
    });

    const button = document.createElement('button');
    button.setAttribute('type', 'button');
    button.title = tipLabel || 'Show current location';
    ReactDOM.render(<MyLocationIcon fontSize="small" />, button);
    button.addEventListener(
      EventType.CLICK,
      this.handleClick.bind(this),
      false,
    );

    this.element.className = clsx('current-location', CLASS_UNSELECTABLE, CLASS_CONTROL);
    this.element.appendChild(button);
  }

  public start() {
    const map = this.getMap();
    if (!map) {
      return;
    }

    map.addLayer(this.positionLayer);

    if (!CurrentLocation.geolocation) {
      CurrentLocation.geolocation = new Geolocation({
        projection: map.getView().getProjection(),
        trackingOptions: {
          enableHighAccuracy: true,
        },
      });
      CurrentLocation.geolocation.setTracking(true);
      CurrentLocation.geolocation.once('change', this.panToCurrentLocation);
    } else {
      this.handleChangePosition();
      this.panToCurrentLocation();
    }
    CurrentLocation.geolocation.on('change:position', this.handleChangePosition);
  }

  public stop() {
    this.getMap()?.removeLayer(this.positionLayer!);
    if (CurrentLocation.geolocation) {
      CurrentLocation.geolocation.un('change:position', this.handleChangePosition);
      if (!CurrentLocation.geolocation.getListeners('change:position')?.length) {
        CurrentLocation.geolocation.setTracking(false);
        CurrentLocation.geolocation = undefined;
      }
    }
  }

  public panToCurrentLocation() {
    const coordinate = CurrentLocation.geolocation?.getPosition();
    if (coordinate) {
      const view = this.getMap()?.getView();
      const zoom = view?.getZoom() || CurrentLocation.defaultZoom;
      view?.animate({
        center: coordinate,
        duration: 300,
        zoom: Math.max(zoom, CurrentLocation.defaultZoom),
      });
    }
  }

  protected handleClick(event: MouseEvent) {
    event.preventDefault();

    if (!this.positionLayer) {
      this.start();
    } else {
      this.panToCurrentLocation();
    }
  }

  protected handleChangePosition() {
    const coordinate = CurrentLocation.geolocation?.getPosition();
    this.positionFeature.setGeometry(coordinate ? new Point(coordinate) : undefined);
  }
}

export default CurrentLocation;
