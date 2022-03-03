import 'ol/ol.css';

import clsx from 'clsx';
import { SomeNode } from 'link-lib';
import { Resource } from 'link-redux';
import { Coordinate } from 'ol/coordinate';
import React from 'react';
import FontAwesome from 'react-fontawesome';

import { ButtonVariant } from '../../../../components/Button';
import ErrorButtonWithFeedback from '../../../../components/Error/ErrorButtonWithFeedback';
import LinkLoader from '../../../../components/Loading/LinkLoader';
import OverlayContainer from '../../../../components/OverlayContainer';
import { MapVariant, NavigateCallback } from '../../components/MapView';
import { alertDialogTopology } from '../../../../topologies/Dialog';
import useMap, { UseMapProps } from '../hooks/useMap';
import useMapStyles from '../hooks/useMapStyles';
import useOverlay from '../hooks/useOverlay';

interface MapCanvasProps extends UseMapProps {
  navigate?: NavigateCallback;
  overlayPadding?: boolean;
  overlayPosition?: Coordinate;
  overlayResource?: SomeNode;
  variant?: MapVariant;
}

const MapCanvas = (props: MapCanvasProps): JSX.Element => {
  const {
    variant = MapVariant.Default,
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
    [classes.containerLarge]: variant === MapVariant.Fullscreen || variant === MapVariant.MapQuestion,
  });

  const canvasClassName = clsx({
    [classes.canvas]: true,
    [classes.canvasLarge]: variant === MapVariant.Fullscreen || variant === MapVariant.MapQuestion,
    [classes.canvasFullscreen]: variant === MapVariant.Fullscreen,
    [classes.canvasMapQuestion]: variant === MapVariant.MapQuestion,
    [classes.flowInput]: variant === MapVariant.Flow,
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
              variant={ButtonVariant.Box}
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
