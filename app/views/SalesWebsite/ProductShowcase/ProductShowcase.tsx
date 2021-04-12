import { Button, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/styles';
import * as schema from '@ontologies/schema';
import {
  FC,
  Property,
  useProperty,
} from 'link-redux';
import React from 'react';

import { ReadMoreButton } from '../../../components/SalesWebsite';
import argu from '../../../ontology/argu';
import { showcaseTopology } from '../../../topologies/Showcase';
import { SalesTheme } from '../SalesThemeProvider';

const useStyles = makeStyles<SalesTheme>((theme) => ({
  arrow: {
    fontSize: 50,
  },
  productButton: {
    [theme.breakpoints.down('sm')]: {
      boxShadow: '0 0 25px rgba(0,0,0,0.2)',
      width: '100%',
    },
    alignItems: 'flex-start',
    backgroundColor: 'white',
    justifyContent: 'flex-start',
    padding: '1rem',
    textAlign: 'left',
    textTransform: 'none',
  },
  subTextContainer: {
    [theme.breakpoints.up('md')]: {
      height: 56,
    },
  },
  title: {
    fontWeight: theme.typography.fontWeightBold,
  },
}));

const ProductShowcase: FC = ({ subject }) => {
  const classes = useStyles();
  const [tagline] = useProperty(argu.ns('tagline'));
  const [name] = useProperty(schema.name);

  return (
    <Button
      className={classes.productButton}
      href={subject.value}
    >
      <Grid
        container
        alignItems="flex-start"
        direction="column"
      >
        <Typography
          className={classes.title}
          variant="h3"
        >
          {name.value}
        </Typography>
        <div className={classes.subTextContainer} >
          <Typography variant="subtitle1">{tagline.value}</Typography>
        </div>
        <Property label={schema.image} />
        <ReadMoreButton />
      </Grid>
    </Button>
  );
};

ProductShowcase.type = argu.ns('ProductPage');

ProductShowcase.topology = showcaseTopology;

export default ProductShowcase;
