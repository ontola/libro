import { IconButton, PropTypes } from '@mui/material';
import React from 'react';

export interface TriggerButtonProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  anchorRef?: React.RefObject<HTMLButtonElement>;
  id?: string;
  open?: boolean;
  color?: PropTypes.Color;
  title: string;
}

export type Trigger = (triggerProps: TriggerButtonProps) => JSX.Element;

const TriggerButton = ({
  onClick,
  anchorRef,
  id,
  open,
  children,
  color = 'default',
  title,
}: React.PropsWithChildren<TriggerButtonProps>): JSX.Element => (
  <IconButton
    centerRipple
    aria-controls={id}
    aria-expanded={open ? 'true' : undefined}
    aria-haspopup="true"
    color={color}
    ref={anchorRef}
    size="small"
    title={title}
    onClick={onClick}
  >
    {children}
  </IconButton>
);

export default TriggerButton;
