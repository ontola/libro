import React from 'react';
import { FormattedMessage } from 'react-intl';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  link: {
    '&:focus': {
      clip: 'auto',
      color: theme.palette.primary.contrastText,
      fontWeight: 'bold',
      height: 'auto',
      lineHeight: '3.2rem',
      padding: '0 10px',
      textAlign: 'center',
      textDecoration: 'none',
      top: 0,
      width: '100%',
    },
    backgroundColor: theme.palette.primary.main,
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

const SkipNavigation = () => {
  const classes = useStyles();

  return (
    <div className={`SkipNavigation ${classes.root}`}>
      <a
        className={`SkipNavigation__link ${classes.link}`}
        href="#start-of-content"
      >
        <FormattedMessage
          defaultMessage="Skip to main"
          id="https://app.argu.co/i18n/navbar/skipToMain"
        />
      </a>
      <a
        className={`SkipNavigation__link ${classes.link}`}
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
