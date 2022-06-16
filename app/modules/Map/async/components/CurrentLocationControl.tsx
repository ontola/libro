import CircularProgress from '@mui/material/CircularProgress';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import clsx from 'clsx';
import { Geolocation, Map } from 'ol';
import { Control } from 'ol/control';
import { CLASS_CONTROL, CLASS_UNSELECTABLE } from 'ol/css';
import React from 'react';
import ReactDOM from 'react-dom';

const DEFAULT_ZOOM = 13;

interface CurrentLocationButtonProps {
  getMap: () => Map,
  tooltip: string,
}

const CurrentLocationButton = ({
  getMap,
  tooltip,
}: CurrentLocationButtonProps) => {
  const map = getMap();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [geolocation, setGeolocation] = React.useState<Geolocation | undefined>(undefined);

  const panToLocation = (location: Geolocation): void => {
    const coordinates = location?.getPosition();

    if (coordinates) {
      const view = map?.getView();
      const zoom = view?.getZoom() ?? DEFAULT_ZOOM;
      view?.animate({
        center: coordinates,
        duration: 300,
        zoom: Math.max(zoom, DEFAULT_ZOOM),
      });
    }
  };

  const start = (): void => {
    setLoading(true);

    if (!map) {
      return;
    }

    if (!geolocation) {
      const newGeoLocation = new Geolocation({
        projection: map.getView().getProjection(),
        trackingOptions: {
          enableHighAccuracy: true,
        },
      });
      newGeoLocation.setTracking(true);
      newGeoLocation.once('change', () => {
        setLoading(false);
        newGeoLocation.setTracking(false);
        panToLocation(newGeoLocation);
      });
      setGeolocation(newGeoLocation);
    }

  };

  const handleClick: React.MouseEventHandler = (event): void => {
    event.preventDefault();

    if (geolocation) {
      panToLocation(geolocation);
    } else {
      start();
    }
  };

  const className = clsx('current-location', CLASS_UNSELECTABLE, CLASS_CONTROL);

  return (
    <div className={className}>
      <button
        title={tooltip}
        type="button"
        onClick={handleClick}
      >
        {loading ? (
          <CircularProgress
            style={{ verticalAlign: 'middle' }}
          />
        ) : (
          <MyLocationIcon
            fontSize="small"
            style={{ verticalAlign: 'middle' }}
          />
        )}
      </button>
    </div>
  );
};

class CurrentLocationControl extends Control {
  constructor(tooltip: string) {
    super({
      element: document.createElement('div'),
    });

    ReactDOM.render(
      <CurrentLocationButton
        getMap={this.getMap.bind(this)}
        tooltip={tooltip}
      />,
      this.element,
    );
  }
}

export default CurrentLocationControl;
