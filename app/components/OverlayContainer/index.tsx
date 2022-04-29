import { makeStyles } from '@mui/styles';
import PropTypes from 'prop-types';
import React, { MouseEvent, MouseEventHandler } from 'react';
import * as ReactDOM from 'react-dom';

import { cardClassIdentifier } from '../../topologies/Card/sharedCardStyles';

interface PropTypes {
  children: React.ReactNode;
  clickHandler: MouseEventHandler;
  overlayRef: HTMLElement | null;
}

export const coverImageChildCID = 'CID-CoverImageChild';

const useStyles = makeStyles({
  overlayContainer: {
    '& div': {
      maxWidth: '25rem',
    },
    [`& .${cardClassIdentifier}`]: {
      maxHeight: '40vh',
      overflow: 'auto',
    },
    [`& .${coverImageChildCID}`]: {
      height: 'initial',
    },
  },
});

/**
 * Render content in an openlayers overlay.
 * Due to their mouse handling implementation, clicks get fucked up, see the issue for more info
 * https://github.com/openlayers/openlayers/issues/6948
 * @flaky
 */
const OverlayContainer = ({
  children,
  clickHandler,
  overlayRef,
}: PropTypes): JSX.Element | null => {
  if (!overlayRef) {
    return null;
  }

  const classes = useStyles();

  const convertToClick = React.useCallback((e: MouseEvent<HTMLDivElement>) => {
    e.persist();
    e.preventDefault();
    e.stopPropagation();
    clickHandler(e);
  }, [clickHandler]);

  return ReactDOM.createPortal(
    (
      <div className={classes.overlayContainer}>
        <div
          className="click-ignore"
          onMouseUp={convertToClick}
        >
          {children}
        </div>
      </div>
    ),
    overlayRef,
  );
};

export default OverlayContainer;
