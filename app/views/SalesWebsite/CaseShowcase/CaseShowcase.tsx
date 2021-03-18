import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button/Button';
import Grid from '@material-ui/core/Grid';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import { makeStyles } from '@material-ui/styles';
import * as schema from '@ontologies/schema';
import { FC, useProperty } from 'link-redux';
import React from 'react';

import argu from '../../../ontology/argu';
import { showcaseTopology } from '../../../topologies/Showcase';
import { SalesTheme } from '../SalesThemeProvider';

const useStyles = makeStyles<SalesTheme>((theme) => ({
  arrow: {
    color: '#2D7080',
    fontSize: 60,
  },
  margin: {
    marginTop: 100,
  },
  productButton: {
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
    [theme.breakpoints.up('md')]: {
      width: '40%',
    },
    [theme.breakpoints.up('lg')]: {
      width: '25%',
    },
    alignItems: 'flex-start',
    justifyContent: 'center',
    margin: 10,
    marginTop: 50,
    maxWidth: 500,
    padding: '0 30px',
    textAlign: 'left',
    textTransform: 'none',
  },
  themeIndicator: {
    color: theme.palette.primary.main,
    fontSize: 16,
    fontWeight: 600,
  },
  title: {
    fontSize: 22,
    fontWeight: 600,
  },
}));

const CaseShowcase: FC = () => {
  const classes = useStyles();
  const [name] = useProperty(schema.name);
  const [tagline] = useProperty(argu.ns('tagline'));
  const [text] = useProperty(schema.text);

  return (
    <Button
      className={classes.productButton}
    >
      <Grid
        container
        justify="flex-start"
      >
        <Typography className={classes.themeIndicator} variant="h6">{name.value}</Typography>
        <Typography className={classes.title} variant="h6">{tagline.value}</Typography>
        <Typography variant="h6">{text.value}</Typography>
        <ArrowRightAltIcon className={classes.arrow} />
      </Grid>
    </Button>
  );
};

CaseShowcase.type = argu.ns('CasePage');

CaseShowcase.topology = showcaseTopology;

export default CaseShowcase;
