import React, { CSSProperties, MouseEvent } from 'react';

type OnClickHandler = (e: MouseEvent<HTMLButtonElement>) => any;

const preventAfterClickOutline = (e: MouseEvent<HTMLButtonElement>, onClick: OnClickHandler | undefined) => {
  const isClickByEnterKey = e.nativeEvent.x === 0;

  if (typeof onClick !== 'undefined') {
    onClick(e);
  }

  if (!isClickByEnterKey) {
    e.currentTarget.blur();
  }
};

interface PropTypes {
  className?: string;
  style?: CSSProperties;
  title?: string;
  onClick?: OnClickHandler;
}

const BlurButton: React.FC<PropTypes> = ({
  children,
  onClick,
  ...props
}) => (
  <button
    type="button"
    {...props}
    onClick={(e) => preventAfterClickOutline(e, onClick)}
  >
    {children}
  </button>
);

export default BlurButton;
