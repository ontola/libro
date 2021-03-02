import clsx from 'clsx';
import { SomeNode } from 'link-lib';
import { Resource } from 'link-redux';
import { Coordinate } from 'ol/coordinate';
import 'ol/ol.css';
import React from 'react';
import FontAwesome from 'react-fontawesome';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import LinkLoader from '../../components/Loading/LinkLoader';
import OverlayContainer from '../../components/OverlayContainer';
import withReducer from '../../containers/withReducer';
import { getMapAccessToken } from '../../state/MapView/actions';
import reducer, { MapReducerKey } from '../../state/MapView/reducer';
import { popupTopology } from '../../topologies/Popup';
import { getAccessToken, getAccessTokenError } from '../../state/MapView/selectors';

import useMap, { UseMapProps } from './useMap';
import useMapStyles from './useMapStyles';
import useOverlay from './useOverlay';

interface PropTypes extends UseMapProps {
  accessTokenError: string;
  large: boolean;
  navigate: (resource: SomeNode) => void;
  overlayPadding: boolean;
  overlayPosition: Coordinate;
  overlayResource: SomeNode;
}

const MapCanvas = (props: PropTypes) => {
  const {
    accessTokenError,
    large,
    navigate,
    overlayPadding,
    overlayPosition,
    overlayResource,
  } = props;
  const {
    deselect,
    error,
    map,
    mapRef,
  } = useMap(props);
  const {
    handleOverlayClick,
    overlayRef,
  } = useOverlay({
    map,
    navigate,
    overlayPadding,
    overlayPosition,
    overlayResource,
  });
  const classes = useMapStyles();
  const wrapperClassName = clsx({
    [classes.container]: true,
    [classes.containerFullscreen]: large,
  });
  const canvasClassName = clsx({
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

  if (!props.accessToken) {
    return <LinkLoader />;
  }

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
            onClose={() => {
              if (deselect) {
                deselect();
              }
            }}
          />
        )}
      </OverlayContainer>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  accessToken: getAccessToken(state),
  accessTokenError: getAccessTokenError(state),
});

const mapDispatchToProps = (dispatch: any) => ({
  requestAccessToken: () => dispatch(getMapAccessToken()),
});

export default connect(mapStateToProps, mapDispatchToProps)(
  withReducer(MapReducerKey, reducer)(MapCanvas),
);
