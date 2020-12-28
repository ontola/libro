import PropTypes from 'prop-types';
import React, { MouseEvent } from 'react';

type OnClickHandler = (e: MouseEvent<HTMLButtonElement>) => any;

const propTypes = {
  /** The children float to the top right */
  children: PropTypes.node,
  /** The header floats to the top left */
  onClick: PropTypes.func,
};

// Used to remove the annoying focus outline border after clicking
const onClickAndBlur = (e: MouseEvent<HTMLButtonElement>, onClick: OnClickHandler) => {
  if (onClick !== undefined) {
    onClick(e);
    // Only blur when the event is a click, not for using the Enter button.
    // React fires a clickEvent when the user uses Enter, but the coordinates are zero.
  }
  if (e.nativeEvent.x !== 0) {
    e.currentTarget.blur();
  }
};

const BlurButton = ({
  children,
  onClick,
  ...props
}: {
  children: React.ReactNode,
  onClick: OnClickHandler,
}) => (
  <button
    {...props}
    onClick={(e) => onClickAndBlur(e, onClick)}
  >
    {children}
  </button>
);

BlurButton.propTypes = propTypes;

export default BlurButton;
