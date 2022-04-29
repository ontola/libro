import { ButtonBase } from '@mui/material';
import React, {
  CSSProperties,
  MouseEvent,
} from 'react';

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

export interface BlurButtonProps {
  className?: string;
  style?: CSSProperties;
  title?: string;
  onClick?: OnClickHandler;
}

const BlurButton = React.forwardRef<HTMLButtonElement, React.PropsWithChildren<BlurButtonProps>>(({
  children,
  onClick,
  ...props
}, ref) => (
  <ButtonBase
    ref={ref}
    type="button"
    {...props}
    onClick={(e) => preventAfterClickOutline(e, onClick)}
  >
    {children}
  </ButtonBase>
));

BlurButton.displayName = 'BlurButton';

export default BlurButton;
