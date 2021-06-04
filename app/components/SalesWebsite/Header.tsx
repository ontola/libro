import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React from 'react';

import { SalesTheme } from '../../themes/salesWebsite/SalesThemeProvider';

import { CallToActionButton } from './CallToActionButton';

export interface HeaderProps {
  backgroundImageUrl: string,
  backgroundImageUrlMobile: string,
  buttonLink?: string,
  buttonText?: string,
  title: string,
  subtitle?: string,
}

const useStyles = makeStyles<SalesTheme, Partial<HeaderProps>>((theme) => ({
  button: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
    fontSize: 18,
  },
  header: {
    alignItems: 'center',
    backgroundColor: theme.palette.background.default,
    backgroundImage: ({ backgroundImageUrl }) => `url(${backgroundImageUrl})`,
    backgroundPosition: '50% 20%',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '110%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    paddingBottom: 100,

    [theme.breakpoints.down('xs')]: {
      backgroundImage: ({ backgroundImageUrlMobile }) => `url(${backgroundImageUrlMobile})`,
    },
  },
  subtitle: {
    maxWidth: '40rem',
    paddingBottom: '2rem',
    paddingLeft: '2rem',
    paddingRight: '2rem',
    textAlign: 'center',
  },
  title: {
    marginTop: '8rem',
    maxWidth: '16em',
    textAlign: 'center',
  },
}));

export const Header = ({
  backgroundImageUrl,
  backgroundImageUrlMobile,
  buttonLink,
  buttonText,
  title,
  subtitle,
  children,
}: React.PropsWithChildren<HeaderProps>): JSX.Element => {
  const classes = useStyles({
    backgroundImageUrl,
    backgroundImageUrlMobile,
  });

  return (
    <div className={classes.header}>
      <Typography className={classes.title} variant="h1">{title}</Typography>
      {subtitle && (
        <Typography
          className={classes.subtitle}
          variant="subtitle1"
        >
          {subtitle}
        </Typography>
      )}
      {buttonText && (
        <CallToActionButton text={buttonText} url={buttonLink!} />
      )}
      {children}
    </div>
  );
};
