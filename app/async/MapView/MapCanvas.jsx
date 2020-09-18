import classNames from 'classnames';
import {
  Resource,
  linkType,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';
import FontAwesome from 'react-fontawesome';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import LinkLoader from '../../components/Loading/LinkLoader';
import OverlayContainer from '../../components/OverlayContainer';
import withReducer from '../../containers/withReducer';
import { popupTopology } from '../../topologies/Popup';

import 'ol/ol.css';
import useMap from './useMap';
import useMapStyles from './useMapStyles';
import useOverlay from './useOverlay';
import { getMapAccessToken } from './actions';
import reducer, { MapReducerKey } from './reducer';
import { getAccessToken, getAccessTokenError } from './selectors';

const MapCanvas = (props) => {
  const {
    accessTokenError,
    large,
    overlayResource,
    navigate,
  } = props;
  const [overlayPosition, setOverlayPosition] = React.useState();
  const {
    deselect,
    error,
    map,
    mapRef,
  } = useMap({
    setOverlayPosition,
    ...props,
  });
  const {
    handleOverlayClick,
    overlayRef,
  } = useOverlay({
    map,
    navigate,
    overlayPosition,
    overlayResource,
  });
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

MapCanvas.propTypes = {
  accessToken: PropTypes.string,
  accessTokenError: PropTypes.string,
  large: PropTypes.bool,
  navigate: PropTypes.func,
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
