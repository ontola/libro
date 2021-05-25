import ChevronRight from '@material-ui/icons/ChevronRight';
import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { FormattedMessage } from 'react-intl';

import { SalesTheme } from '../../themes/salesWebsite/SalesThemeProvider';

const CONTAINER_GAP = 3;

const useStyles = makeStyles<SalesTheme>((theme) => ({
  container: {
    alignItems: 'center',
    color: theme.palette.primary.main,
    display: 'flex',
    gap: theme.spacing(CONTAINER_GAP),
  },
}));

export const ReadMoreButton = (): JSX.Element => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <span>
        <FormattedMessage
          defaultMessage="Read more"
          id="https://app.argu.co/i18n/sales/readmore"
        />
        <ChevronRight />
      </span>
    </div>
  );
};
