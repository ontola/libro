import { Typography } from '@material-ui/core';
import ChevronRight from '@material-ui/icons/ChevronRight';
import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { FormattedMessage } from 'react-intl';

import { SalesTheme } from '../../themes/salesWebsite/SalesThemeProvider';

const useStyles = makeStyles<SalesTheme>((theme) => ({
  arrow: {
    color: theme.palette.primary.main,
    fontSize: 30,
    fontWeight: 'bold',
    marginLeft: -20,
  },
  container: {
    display: 'flex',
  },
  title: {
    color: theme.palette.primary.main,
  },
}));

export const ReadMoreButton = (): JSX.Element => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Typography
        className={classes.title}
        variant="subtitle1"
      >
        <FormattedMessage
          defaultMessage="Read more"
          id="https://app.argu.co/i18n/sales/readmore"
        />
      </Typography>
      <Typography>
        <ChevronRight className={classes.arrow} />
      </Typography>
    </div>
  );
};
