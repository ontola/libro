import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React from 'react';

import { SalesTheme } from '../../themes/salesWebsite/SalesThemeProvider';

import { CallToActionButton } from './CallToActionButton';

export interface HeaderProps {
  backgroundImageUrl: string,
  backgroundImageUrlMobile: string,
  backgroundImageXL: string,
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
  gradient: {
    background: `linear-gradient(0deg, ${theme.palette.background.default}, 10%, ${theme.palette.background.default}, transparent);`,
    height: '100px',
    marginTop: 80,
    width: '100%',
  },
  header: {
    alignItems: 'center',
    backgroundAttachment: 'fixed',
    backgroundColor: theme.palette.background.default,
    backgroundImage: ({ backgroundImageUrl }) => `url(${backgroundImageUrl})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginBottom: 20,

    [theme.breakpoints.down('xs')]: {
      backgroundImage: ({ backgroundImageUrlMobile }) => `url(${backgroundImageUrlMobile})`,
    },

    [theme.breakpoints.up('xl')]: {
      backgroundImage: ({ backgroundImageXL }) => `url(${backgroundImageXL}) !important`,
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
    [theme.breakpoints.down('sm')]: {
      fontSize: '2rem',
    },
    fontSize: '3rem',
    marginTop: '8rem',
    maxWidth: '16em',
    textAlign: 'center',
  },
}));

export const Header = ({
  backgroundImageUrl,
  backgroundImageUrlMobile,
  backgroundImageXL,
  buttonLink,
  buttonText,
  title,
  subtitle,
  children,
}: React.PropsWithChildren<HeaderProps>): JSX.Element => {
  const classes = useStyles({
    backgroundImageUrl,
    backgroundImageUrlMobile,
    backgroundImageXL,
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
      <div className={classes.gradient} />
    </div>
  );
};
