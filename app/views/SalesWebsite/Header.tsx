import { Button, Typography } from '@material-ui/core';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import { makeStyles } from '@material-ui/styles';
import { Property } from 'link-redux';
import React from 'react';

import argu from '../../ontology/argu';
import Container from '../../topologies/Container';
import Showcase from '../../topologies/Showcase';

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
    backgroundSize: '1375 px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
      backgroundPositionX: '14%',
      backgroundPositionY: '30%',
      backgroundSize: '225%',
    },
    [theme.breakpoints.down('xs')]: {
      backgroundPositionX: '14%',
      backgroundPositionY: '20%',
      backgroundSize: '300%',
    },
  },
  propositionSelector: {
    [theme.breakpoints.down('sm')]: {
      boxShadow: 'unset',
      gridGap: 40,
      gridTemplateColumns: '1fr 1fr',
      padding: 20,
    },
    [theme.breakpoints.down('xs')]: {
      gridTemplateColumns: '1fr',
    },
    borderRadius: 5,
    boxShadow: '0 0 25px rgba(0,0,0,0.2)',
    display: 'grid',
    flex: 1,
    gridTemplateColumns: '1fr 1fr 1fr 1fr',
    marginBottom: 100,
    marginTop: 100,
    overflow: 'hidden',
  },
  subtitle: {
    maxWidth: '40rem',
    paddingBottom: '2rem',
    textAlign: 'center',
  },
  title: {
    marginTop: 60,
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
    <div
      className={classes.header}
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      <Typography className={classes.title} variant="h1">{title}</Typography>
      <Typography
        className={classes.subtitle}
        variant="subtitle1"
      >
        {subtitle}
      </Typography>
      <Button
        className={classes.button}
        color="secondary"
        endIcon={<ArrowRightAltIcon style={{ fontSize: 40 }} />}
        variant="contained"
      >
        {buttonText}
      </Button>
      <Container>
        <Showcase>
          <div className={classes.propositionSelector}>
            <Property label={argu.ns('showcase')} />
          </div>
        </Showcase>
      </Container>
    </div >
  );
};

export default Header;
