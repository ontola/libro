import React from 'react';
import { FormattedMessage } from 'react-intl';
import { makeStyles } from '@material-ui/core/styles';

import { LibroTheme } from '../../themes/themes';

const useStyles = makeStyles<LibroTheme>((theme) => ({
  link: {
    '&:focus': {
      clip: 'auto',
      color: theme.palette.primary.contrastText,
      fontWeight: 'bold',
      height: 'auto',
      lineHeight: theme.appBar.height,
      padding: '0 10px',
      textAlign: 'center',
      textDecoration: 'none',
      top: 0,
      width: '100%',
    },
    backgroundColor: theme.palette.primary.main,
    // Most of the next styles are used to make the element
    // both hidden, yet selectable across a large set of browsers
    clip: 'rect(1px, 1px, 1px, 1px)',
    height: '1px',
    margin: '0',
    overflow: 'hidden',
    position: 'fixed',
    top: '-100px',
    width: '1px',
    willChange: 'transform',
  },
  root: {
    position: 'fixed',
    zIndex: 1500,
  },
}));

/**
 * Enables keyboard-only users to quickly set focus to the main content.
 * Is hidden for mouse users.
 */
const SkipNavigation = (): JSX.Element => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <a
        className={classes.link}
        href="#start-of-content"
      >
        <FormattedMessage
          defaultMessage="Skip navigation"
          id="https://app.argu.co/i18n/navbar/skipToMain"
        />
      </a>
      <a
        className={classes.link}
        href="mailto:info@argu.co?subject=Moeite met navigeren"
      >
        <FormattedMessage
          defaultMessage="Having trouble with navigation? Mail us!"
          id="https://app.argu.co/i18n/navbar/troubleNavigating"
        />
      </a>
    </div>
  );
};

export default SkipNavigation;
