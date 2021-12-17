import { makeStyles } from '@material-ui/styles';
import React from 'react';

import { LibroTheme } from '../../themes/themes';

export interface CountBubbleProps {
  /** The number displayed in the bubble */
  count: number,
}

const useStyles = makeStyles((theme: LibroTheme) => ({
  '@keyframes popout': {
    '0%': {
      transform: 'scale(1)',
    },

    '20%': {
      animationTimingFunction: 'ease-out',
      transform: 'scale(.7)',
    },

    '50%': {
      animationTimingFunction: 'ease-in',
      transform: 'scale(1.5)',
    },

    '100%': {
      animationTimingFunction: 'ease-out',
      transform: 'scale(1)',
    },
  },
  countBubble: {
    alignItems: 'center',
    animation: 'popout .4s 1s 1',
    backgroundColor: theme.palette.red.main,
    borderRadius: '100%',
    display: 'inline-flex',
    height: '1.2rem',
    justifyContent: 'center',
    width: '1.2rem',
  },

  number: {
    color: theme.palette.common.white,
    flex: 1,
    fontSize: '.8em',
    textAlign: 'center',
  },
}));

// Small item to indicate the count of something important.
const CountBubble = ({
  count,
}: CountBubbleProps): JSX.Element => {
  const classes = useStyles();

  return (
    <div
      className={classes.countBubble}
    >
      <div className={classes.number}>
        {count}
      </div>
    </div>
  );
};

export default CountBubble;
