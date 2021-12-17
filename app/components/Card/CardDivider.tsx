import { makeStyles } from '@material-ui/styles';
import React from 'react';

import { LibroTheme } from '../../themes/themes';

export interface CardDividerProps {
  lineColor?: string;
  margin?: boolean;
  text?: React.ReactNode;
}

const useStyles = makeStyles<LibroTheme, CardDividerProps>((theme) => ({
  cardDivider: {
    alignItems: 'center',
    backgroundColor: ({ lineColor }) => lineColor ?? theme.palette.grey.xLight,
    display: 'flex',
    height: '2px',
    justifyContent: 'center',
    marginBottom: ({ margin }) => margin ? '1em' : undefined,
    width: '100%',
  },
  text: {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightBold,
    padding: '0 7px',
    zIndex: 1,
  },
}));

/**
 * A fine grey line with an optional text in its center
 * @returns {component} Component
 */
const CardDivider = (props: CardDividerProps): JSX.Element => {
  const classes = useStyles(props);

  return (
    <div
      className={classes.cardDivider}
    >
      {props.text && (
        <span className={classes.text}>
          {props.text}
        </span>
      )}
    </div>
  );
};

export default CardDivider;
