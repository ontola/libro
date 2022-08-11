import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import { LibroTheme, Margin } from '../../Kernel/lib/themes';
import { salesMessages } from '../../../translations/messages';
import { PricingInterval } from '../lib/PricingInterval';

export interface IntervalSwitcherProps {
  currentInterval: PricingInterval;
  onIntervalChange: (interval: PricingInterval) => void;
}

const useStyles = makeStyles<LibroTheme>((theme) => ({
  themeButton: {
    '&:hover': {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.getContrastText(theme.palette.secondary.main),
    },
    backgroundColor: 'none',
    border: `1px solid ${theme.palette.secondary.main}`,
    borderRadius: theme.shape.borderRadius,
    color: theme.palette.secondary.main,
    padding: '.8rem',
    transition: 'color 100ms, background-color 100ms',
  },
  themeButtonActive: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.getContrastText(theme.palette.secondary.main),
  },
  wrapper: {
    display: 'flex',
    gap: theme.spacing(Margin.Medium),
  },
}));

export const IntervalSwitcher: React.FC<IntervalSwitcherProps> = ({
  currentInterval,
  onIntervalChange,
}) => {
  const classes = useStyles();

  const getClassName = (interval: PricingInterval) => clsx({
    [classes.themeButton]: true,
    [classes.themeButtonActive]: interval === currentInterval,
  });

  return (
    <div className={classes.wrapper}>
      <Button
        className={getClassName(PricingInterval.Yearly)}
        onClick={() => onIntervalChange(PricingInterval.Yearly)}
      >
        <FormattedMessage {...salesMessages.intervalSwitcherYearly} />
      </Button>
      <Button
        className={getClassName(PricingInterval.Monthly)}
        onClick={() => onIntervalChange(PricingInterval.Monthly)}
      >
        <FormattedMessage {...salesMessages.intervalSwitcherMonthly} />
      </Button>
    </div>
  );
};
