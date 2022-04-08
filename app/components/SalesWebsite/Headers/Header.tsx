import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React from 'react';

import { LibroTheme } from '../../../themes/themes';
import { CallToActionButton } from '../CallToActionButton';

import type { HeaderProps } from './HeaderProps';

const useStyles = makeStyles<LibroTheme, Partial<HeaderProps>>((theme) => ({
  button: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
    fontSize: 18,
  },
  gradient: {
    background: `linear-gradient(0deg, ${theme.palette.background.default}, 10%, ${theme.palette.background.default}, rgba(255, 255, 255, 0));`,
    height: '50px',
    position: 'relative',
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

    [theme.breakpoints.down('xs')]: {
      backgroundAttachment: 'unset',
      backgroundImage: ({ backgroundImageUrlMobile }) => `url(${backgroundImageUrlMobile})`,
    },

    [theme.breakpoints.up('xl')]: {
      backgroundImage: ({ backgroundImageXL }) => `url(${backgroundImageXL}) !important`,
    },
  },
  spacer: {
    margin: 50,
    [theme.breakpoints.down('sm')]: {
      margin: 30,
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

export const Header: React.FC<HeaderProps> = ({
  backgroundImageUrl,
  backgroundImageUrlMobile,
  backgroundImageXL,
  buttonLink,
  buttonText,
  title,
  subtitle,
  children,
}) => {
  const classes = useStyles({
    backgroundImageUrl,
    backgroundImageUrlMobile,
    backgroundImageXL,
  });

  return (
    <div className={classes.header}>
      <Typography
        className={classes.title}
        variant="h1"
      >
        {title}
      </Typography>
      {subtitle ?
        (
          <Typography
            className={classes.subtitle}
            component="p"
            variant="subtitle1"
          >
            {subtitle}
          </Typography>
        ) : (
          <div className={classes.spacer} />
        )}
      {buttonText && (
        <CallToActionButton
          text={buttonText}
          url={buttonLink!}
        />
      )}
      {children}
      <div className={classes.gradient} />
    </div>
  );
};
