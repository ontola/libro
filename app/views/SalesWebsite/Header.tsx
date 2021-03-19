import { Button, Typography } from '@material-ui/core';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import { makeStyles } from '@material-ui/styles';
import React from 'react';

import { SalesTheme } from './SalesThemeProvider';

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
    backgroundSize: 'contain',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    paddingBottom: '2rem',
    paddingTop: 75,
    width: '100%',
  },
  subtitle: {
    margin: 'auto',
    maxWidth: '40rem',
    padding: '2rem',
    paddingBottom: '3rem',
    textAlign: 'center',
  },
  title: {
    textAlign: 'center',
  },
}));

interface HeaderProps {
  buttonText: string,
  title: string,
  subtitle: string,
  imageUrl: string,
}

/** Full page with a branded header */
const Header = ({
  buttonText,
  title,
  subtitle,
  imageUrl,
}: HeaderProps): JSX.Element => {
  const classes = useStyles();

  return (
    <div className={classes.header} style={{ backgroundImage: `url(${imageUrl})` }} >
      <Typography className={classes.title} variant="h1">{title}</Typography>
      <Typography className={classes.subtitle} variant="subtitle1">{subtitle}</Typography>
      <Button
        className={classes.button}
        color="secondary"
        endIcon={<ArrowRightAltIcon style={{ fontSize: 40 }} />}
        variant="contained"
      >
        {buttonText}
      </Button>
    </div >
  );
};

export default Header;
