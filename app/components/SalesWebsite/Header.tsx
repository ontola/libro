import {
  Button,
  Typography,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import { NavLink } from 'react-router-dom';

import { retrievePath } from '../../helpers/iris';
import { SalesTheme } from '../../themes/salesWebsite/SalesThemeProvider';

const useStyles = makeStyles<SalesTheme>((theme) => ({
  button: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
    fontSize: 18,
    textTransform: 'none',
  },
  header: {
    alignItems: 'center',
    backgroundColor: theme.palette.background.default,
    backgroundPosition: '50% 20%',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '1375 px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    paddingBottom: 100,
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
    textAlign: 'center',
  },
}));

export interface HeaderProps {
  backgroundImageUrl: string,
  backgroundImageUrlMobile: string,
  buttonLink?: string,
  buttonText?: string,
  children?: React.ReactChild;
  title: string,
  subtitle?: string,
}

/** Full page with a branded header */
export const Header = ({
  backgroundImageUrl,
  backgroundImageUrlMobile,
  buttonLink,
  buttonText,
  title,
  subtitle,
  children,
}: HeaderProps): JSX.Element => {
  const classes = useStyles();
  const styles = useTheme();
  const backgroundImage = useMediaQuery(styles.breakpoints.down('xs'))
    ? backgroundImageUrlMobile : backgroundImageUrl;

  return (
    <div
      className={classes.header}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <Typography className={classes.title} variant="h1">{title}</Typography>
      {subtitle && (
        <Typography
          className={classes.subtitle}
          variant="subtitle1"
        >
          {subtitle}
        </Typography>
      )}
      {buttonText === undefined ?
        null
        :
        <Button
          className={classes.button}
          color="secondary"
          component={NavLink as React.ElementType}
          endIcon={<ArrowRightAltIcon style={{ fontSize: 40 }} />}
          to={retrievePath(buttonLink!)}
          variant="contained"
        >
          {buttonText}
        </Button>}
      {children}
    </div>
  );
};
