import { makeStyles } from '@material-ui/styles';
import React from 'react';

import { LibroTheme } from '../../themes/themes';
import Button, { ButtonVariant } from '../Button';

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
    fontWeight: theme.typography.fontWeightMedium,
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
