import { makeStyles } from '@mui/styles';
import clsx from 'clsx';
import React from 'react';

import { LibroTheme } from '../../../../themes/themes';

export interface CardActionsProps {
  alignRight?: boolean;
  noSpacing?: boolean;
}

const useStyles = makeStyles<LibroTheme>((theme) => ({
  alignRight: {
    justifyContent: 'flex-end',
  },
  cardActions: {
    '& > *': {
      '&:first-child': {
        borderBottomLeftRadius: theme.shape.borderRadius,
      },
      '&:last-child': {
        borderBottomRightRadius: theme.shape.borderRadius,
      },
    },
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  'noSpacing': {
    marginTop: 0,
  },
}));

/**
 * A wrapper for CardButtons to provide for the correct styling
 * @returns {component} Component
 */
const CardActions = ({
  alignRight,
  children,
  noSpacing,
}: React.PropsWithChildren<CardActionsProps>): JSX.Element => {
  const classes = useStyles();

  const className = clsx({
    [classes.cardActions]: true,
    [classes.noSpacing]: noSpacing,
    [classes.alignRight]: alignRight,
  });

  return (
    <div
      className={className}
      data-testid="card-actions"
    >
      {children}
    </div>
  );
};

export default CardActions;
