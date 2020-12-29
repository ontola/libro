import React, { MouseEvent } from 'react';

type OnClickHandler = (e: MouseEvent<HTMLButtonElement>) => any;

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

interface PropTypes {
  onClick: OnClickHandler;
}

const BlurButton: React.FC<PropTypes> = ({
  children,
  onClick,
  ...props
}) => (
  <button
    {...props}
    onClick={(e) => onClickAndBlur(e, onClick)}
  >
    {children}
  </button>
);

export default BlurButton;
