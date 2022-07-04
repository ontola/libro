import ChevronRight from '@mui/icons-material/ChevronRight';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import { LibroTheme } from '../../Kernel/lib/themes';

export interface ReadMoreButtonProps {
  className?: string
}

const CONTAINER_GAP = 3;

const useStyles = makeStyles<LibroTheme>((theme) => ({
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
