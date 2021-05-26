import ChevronRight from '@material-ui/icons/ChevronRight';
import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { FormattedMessage } from 'react-intl';
import clsx from 'clsx';

import { SalesTheme } from '../../themes/salesWebsite/SalesThemeProvider';

export interface ReadMoreButtonProps {
  className?: string
}

const CONTAINER_GAP = 3;

const useStyles = makeStyles<SalesTheme>((theme) => ({
  container: {
    alignItems: 'center',
    color: theme.palette.primary.main,
    display: 'flex',
    gap: theme.spacing(CONTAINER_GAP),
  },
}));

export const ReadMoreButton = ({ className }: ReadMoreButtonProps): JSX.Element => {
  const styles = useStyles();

  const containerClasses = clsx({
    [styles.container]: true,
    ...(className ? { [className]: true } : {}),
  });

  return (
    <div className={containerClasses}>
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
