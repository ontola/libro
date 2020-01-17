import React from 'react';
import { FormattedMessage } from 'react-intl';
import { makeStyles } from '@material-ui/core/styles';

import './SkipNavigation.scss';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.main,
  },
}));

const SkipNavigation = () => {
  const classes = useStyles();

  return (
    <div className="SkipNavigation">
      <a
        className={`SkipNavigation__link ${classes.root}`}
        href="#start-of-content"
      >
        <FormattedMessage
          defaultMessage="Skip to main"
          id="https://app.argu.co/i18n/navbar/skipToMain"
        />
      </a>
      <a
        className={`SkipNavigation__link ${classes.root}`}
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
