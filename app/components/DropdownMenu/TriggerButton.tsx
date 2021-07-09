import IconButton from '@material-ui/core/IconButton';
import React from 'react';

export interface TriggerButtonProps {
  onClick: () => void;
  anchorRef: React.RefObject<HTMLButtonElement>;
  id: string;
  open: boolean;
}

export const TriggerButton = ({
  onClick,
  anchorRef,
  id,
  open,
  children,
}: React.PropsWithChildren<TriggerButtonProps>): JSX.Element => (
  <IconButton
    centerRipple
    aria-controls={id}
    aria-expanded={open ? 'true' : undefined}
    aria-haspopup="true"
    color="default"
    ref={anchorRef}
    size="small"
    onClick={onClick}
  >
    {children}
  </IconButton>
);
