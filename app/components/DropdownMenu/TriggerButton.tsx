import IconButton from '@material-ui/core/IconButton';
import React, { MouseEventHandler } from 'react';

export interface TriggerButtonProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
  anchorRef?: React.RefObject<HTMLButtonElement>;
  id?: string;
  open?: boolean;
}

export type Trigger = (triggerProps: TriggerButtonProps) => JSX.Element;

const TriggerButton = ({
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

export default TriggerButton;
