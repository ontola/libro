import 'ol/ol.css';

import clsx from 'clsx';
import { SomeNode } from 'link-lib';
import { Resource } from 'link-redux';
import { Coordinate } from 'ol/coordinate';
import React from 'react';
import FontAwesome from 'react-fontawesome';

import { ButtonTheme } from '../../../components/Button';
import ErrorButtonWithFeedback from '../../../components/Error/ErrorButtonWithFeedback';
import { FormTheme } from '../../../components/Form/Form';
import LinkLoader from '../../../components/Loading/LinkLoader';
import OverlayContainer from '../../../components/OverlayContainer';
import { NavigateCallback } from '../../../containers/MapView';
import { alertDialogTopology } from '../../../topologies/Dialog';
import useMap, { UseMapProps } from '../hooks/useMap';
import useMapStyles from '../hooks/useMapStyles';
import useOverlay from '../hooks/useOverlay';

interface MapCanvasProps extends UseMapProps {
  large?: boolean;
  theme?: FormTheme;
  navigate?: NavigateCallback;
  overlayPadding?: boolean;
  overlayPosition?: Coordinate;
  overlayResource?: SomeNode;
}

const MapCanvas = (props: MapCanvasProps): JSX.Element => {
  const {
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
    mapToken,
    mapRef,
    requestMapToken,
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
    [classes.flowInput]: props.theme === FormTheme.Flow,
  });

  if (mapToken.loading) {
    return <LinkLoader />;
  }

  const currentError = error || mapToken.error;

  if (!mapRef || currentError) {
    return (
      <div
        className={wrapperClassName}
        data-testid="map-view"
      >
        <div className={canvasClassName} />
        <div className={classes.indicator}>
          <FontAwesome name="map-o" />
          {currentError && (
            <ErrorButtonWithFeedback
              caughtError={currentError}
              reloadLinkedObject={requestMapToken}
              theme={ButtonTheme.Box}
            />
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      className={wrapperClassName}
      data-testid="map-view"
    >
      <div
        className={canvasClassName}
        data-testid="map-canvas"
        ref={mapRef}
      />
      <OverlayContainer
        clickHandler={handleOverlayClick}
        overlayRef={overlayRef.current}
      >
        {overlayResource && (
          <Resource
            subject={overlayResource}
            topology={alertDialogTopology}
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

export default MapCanvas;
