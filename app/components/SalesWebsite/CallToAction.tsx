import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React from 'react';

import { SalesTheme } from '../../themes/salesWebsite/SalesThemeProvider';

import { CallToActionButton } from './CallToActionButton';

const useStyles = makeStyles<SalesTheme, Partial<CallToActionProps>>((theme) => ({
  button: {
    fontSize: 18,
  },
  header: {
    alignItems: 'center',
    backgroundColor: theme.palette.primary.main,
    backgroundImage: ({ imageUrl }) => `url(${imageUrl})`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    display: 'flex',
    flexDirection: 'column',
    padding: 20,
    paddingBottom: '5rem',
    paddingTop: '2rem',
    width: '100%',
  },
  subtitle: {
    color: 'white',
    fontSize: 22,
    margin: 'auto',
    marginBottom: '3rem',
    maxWidth: '40rem',
    textAlign: 'center',
  },
  title: {
    color: 'white',
    maxWidth: 900,
    textAlign: 'center',
  },
}));

export interface CallToActionProps {
  buttonLink: string,
  buttonText: string,
  title: string,
  subtitle: string,
  imageUrl: string,
}

/** Full page with a branded header */
export const CallToAction = ({
  buttonLink,
  buttonText,
  title,
  subtitle,
  imageUrl,
}: CallToActionProps): JSX.Element => {
  const classes = useStyles({ imageUrl });

  return (
    <div className={classes.header}>
      <Typography className={classes.title} variant="h1">{title}</Typography>
      <Typography className={classes.subtitle} variant="subtitle1">{subtitle}</Typography>
      <CallToActionButton text={buttonText} url={buttonLink} />
    </div>
  );
};
