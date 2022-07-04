import { makeStyles } from '@mui/styles';
import React from 'react';

import { LibroTheme } from '../../../Kernel/lib/themes';
import Button, { ButtonVariant } from '../../../Common/components/Button';

import { TriggerButtonProps } from './TriggerButton';

export interface TriggerButtonNavBarProps extends TriggerButtonProps {
  icon?: string;
  endIcon?: React.ReactNode;
}

const useStyles = makeStyles<LibroTheme>((theme) => ({
  triggerButton: {
    '&:hover, &:focus': {
      color: 'inherit',
    },
    alignItems: 'center',
    color: 'inherit',
    display: 'flex',
    fontSize: theme.navBarFontSize,
    fontWeight: theme.typography.fontWeightMedium,
    padding: '6px 8px',
  },
}));

export const TriggerButtonNavBar = ({
  onClick,
  anchorRef,
  id,
  icon,
  endIcon,
  open,
  children,
}: React.PropsWithChildren<TriggerButtonNavBarProps>): JSX.Element => {
  const classes = useStyles();

  return (
    <Button
      aria-controls={id}
      aria-expanded={open ? 'true' : undefined}
      aria-haspopup="true"
      className={classes.triggerButton}
      endIcon={endIcon}
      icon={icon}
      ref={anchorRef}
      variant={ButtonVariant.Transparent}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};
