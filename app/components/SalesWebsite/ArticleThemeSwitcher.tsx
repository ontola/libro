import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/styles';
import { SomeTerm } from '@ontologies/core';
import clsx from 'clsx';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import { SalesTheme } from '../../themes/salesWebsite/SalesThemeProvider';
import { salesMessages } from '../../translations/messages';

export interface ArticleThemeSwitcherProps {
  themes: SomeTerm[];
  currentTheme: SomeTerm | null;
  onThemeSwitch: (theme: SomeTerm | null) => void;
}

const useStyles = makeStyles<SalesTheme>((theme) => ({
  themeButton: {
    '&:hover': {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.getContrastText(theme.palette.secondary.main),
    },
    backgroundColor: '#F8FBFF',
    borderRadius: theme.shape.borderRadius,
    fontWeight: theme.typography.fontWeightBold,
    padding: '0.8rem',
    transition: 'color 100ms, background-color 100ms',
  },
  themeButtonActive: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.getContrastText(theme.palette.secondary.main),
  },
  themeContainer: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center',
  },
}));

export const ArticleThemeSwitcher = ({
  themes,
  currentTheme,
  onThemeSwitch,
}: ArticleThemeSwitcherProps): JSX.Element => {
  const classes = useStyles();

  const createClickHandler = (clickedTheme: SomeTerm | null) => () => {
    onThemeSwitch(clickedTheme);
  };

  const getThemeClassName = (theme: SomeTerm | null) => clsx({
    [classes.themeButton]: true,
    [classes.themeButtonActive]: theme?.value === currentTheme?.value,
  });

  return (
    <div className={classes.themeContainer}>
      <Button
        className={getThemeClassName(null)}
        onClick={createClickHandler(null)}
      >
        <FormattedMessage {...salesMessages.showAll} />
      </Button>
      {themes.map((theme: SomeTerm) => (
        <Button
          className={getThemeClassName(theme)}
          key={theme?.value}
          onClick={createClickHandler(theme)}
        >
          {theme?.value}
        </Button>
      ))}
    </div>
  );
};
