import { Typography } from '@material-ui/core';
import ChevronRight from '@material-ui/icons/ChevronRight';
import React from 'react';
import { FormattedMessage } from 'react-intl';

export const ReadMoreButton = (): JSX.Element => (
  <Typography>
    <FormattedMessage
      defaultMessage="Read more"
      id="https://app.argu.co/i18n/sales/readmore"
    />
    <ChevronRight />
  </Typography>
);
