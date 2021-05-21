import { Button, Typography } from '@material-ui/core';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import { NavLink } from 'react-router-dom';

import { retrievePath } from '../../helpers/iris';
import { SalesTheme } from '../../themes/salesWebsite/SalesThemeProvider';

const useStyles = makeStyles<SalesTheme>((theme) => ({
  button: {
    fontSize: 18,
    textTransform: 'none',
  },
  header: {
    alignItems: 'center',
    backgroundColor: theme.palette.background.default,
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
  const classes = useStyles();

  return (
    <div
      className={classes.header}
      style={{
        backgroundColor: '#2D7080',
        backgroundImage: `url(${imageUrl})`,
      }}
    >
      <Typography className={classes.title} variant="h1">{title}</Typography>
      <Typography className={classes.subtitle} variant="subtitle1">{subtitle}</Typography>
      <Button
        className={classes.button}
        color="secondary"
        component={NavLink as React.ElementType}
        endIcon={<ArrowRightAltIcon style={{ fontSize: 40 }} />}
        to={retrievePath(buttonLink)}
        variant="contained"
      >
        {buttonText}
      </Button>
    </div>
  );
};
