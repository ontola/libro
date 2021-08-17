import MyLocationIcon from '@material-ui/icons/MyLocation';
import CircularProgress from '@material-ui/core/CircularProgress';
import clsx from 'clsx';
import { Geolocation } from 'ol';
import { Control } from 'ol/control';
import { CLASS_CONTROL, CLASS_UNSELECTABLE } from 'ol/css';
import EventType from 'ol/events/EventType';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import React from 'react';
import ReactDOM from 'react-dom';

class CurrentLocationControl extends Control {
    private static geolocation?: Geolocation;
    private readonly positionLayer: VectorLayer;
    private readonly button: HTMLButtonElement;

    constructor(tipLabel: string) {
      super({
        element: document.createElement('div'),
      });

      this.positionLayer = new VectorLayer({
        source: new VectorSource({
          features: [],
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
    }

    public start(): void {
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
        this.panToCurrentLocation();
      }
    }

    public stop(): void {
      this.getMap()?.removeLayer(this.positionLayer!);

      if (CurrentLocationControl.geolocation) {

        if (!CurrentLocationControl.geolocation.getListeners('change:position')?.length) {
          CurrentLocationControl.geolocation.setTracking(false);
          CurrentLocationControl.geolocation = undefined;
        }
      }
    }

    public panToCurrentLocation(): void {
      const coordinate = CurrentLocationControl.geolocation?.getPosition();
      const defaultZoom = 13;

      if (coordinate) {
        const view = this.getMap()?.getView();
        const zoom = view?.getZoom() || defaultZoom;
        view?.animate({
          center: coordinate,
          duration: 300,
          zoom: Math.max(zoom, defaultZoom),
        });
      }
    }

    protected setLoadingIcon(): void {
      this.button.title = 'Loading location...';
      ReactDOM.render(<CircularProgress />, this.button);
    }

    protected setNormalIcon(tipLabel?: string): void {
      this.button.title = tipLabel || 'Show current location';
      ReactDOM.render(<MyLocationIcon fontSize="small" />, this.button);
    }

    protected handleClick(event: MouseEvent): void {
      event.preventDefault();

      if (CurrentLocationControl.geolocation) {
        this.panToCurrentLocation();
      } else {
        this.start();
      }
    }
}

export default CurrentLocationControl;
