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
    fontSize: 50,
  },
  productButton: {
    '&:first-child': {
      paddingLeft: '2rem',
    },
    '&:last-child': {
      paddingRight: '2rem',
    },
    alignItems: 'start',
    flex: 1,
    padding: '1rem',
    textAlign: 'left',
    textTransform: 'none',
    [theme.breakpoints.down('md')]: {
      width: '25%',
    },
    width: '50%',
  },
  subTextContainer: {
    minHeight: 55,
  },
  typography: {
    fontWeight: theme.typography.fontWeightBold,
  },
}));

const ProductShowcase: FC = () => {
  const classes = useStyles();
  const [tagline] = useProperty(argu.ns('tagline'));
  const [name] = useProperty(schema.name);

  return (
    <Button
      className={classes.productButton}
    >
      <Grid
        container
        alignItems="flex-start"
        direction="column"
      >
        <Typography className={classes.typography} variant="h6">{name.value}</Typography>
        <div className={classes.subTextContainer}>
          <Typography variant="subtitle1">{tagline.value}</Typography>
        </div>
        <ArrowRightAltIcon
          className={classes.arrow}
          color="primary"
          fontSize="large"
        />
      </Grid>
    </Button>
  );
};

ProductShowcase.type = argu.ns('ProductPage');

ProductShowcase.topology = showcaseTopology;

export default ProductShowcase;
