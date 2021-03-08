
import { Button, Theme, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React from 'react';

const useStyles = makeStyles<Theme>(theme => ({
  title: {
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    maxWidth: '40rem',
    margin: 'auto',
    marginBottom: '3rem',
  },
  header: {
    backgroundColor: theme.palette.background.default,
    width: '100%',
    paddingTop: '2rem',
    paddingBottom: '5rem',
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  }
}));

interface HeaderProps {
  title: string,
  subtitle: string,
  imageUrl: string,
}

/** Full page with a branded header */
const Header = ({ title, subtitle, imageUrl }: HeaderProps) => {
  const classes = useStyles();

  return (
    <div className={classes.header} style={{ backgroundImage: `url(${imageUrl})` }} >
      <Typography variant="h1" className={classes.title}>{title}</Typography>
      <Typography variant="subtitle1" className={classes.subtitle}>{subtitle}</Typography>
      <Button variant="contained" color="secondary">Geef chips</Button>
    </div >
  );
};

export default Header;
