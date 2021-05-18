import {
  Button,
  Grid,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import * as schema from '@ontologies/schema';
import {
  FC,
  useProperty,
} from 'link-redux';
import React from 'react';

import { ReadMoreButton } from '../../../components/SalesWebsite';
import sales from '../../../ontology/sales';
import { SalesTheme } from '../../../themes/salesWebsite/SalesThemeProvider';
import { showcaseTopology } from '../../../topologies/Showcase';

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
    display: 'flex',
    justifyContent: 'flex-start',
    padding: '1rem',
    textAlign: 'left',
    textTransform: 'none',
  },
  root: {
    width: '28em',
  },
  subTextContainer: {
    [theme.breakpoints.up('xs')]: {
      height: 66,
    },
  },
  title: {
    fontWeight: theme.typography.fontWeightBold,
  },
}));

const ProductPageShowcase: FC = ({ subject }) => {
  const classes = useStyles();
  const [tagline] = useProperty(sales.tagline);
  const [name] = useProperty(schema.name);

  return (
    <Grid item>
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
          <div className={classes.subTextContainer}>
            <Typography variant="body1">
              {tagline.value}
            </Typography>
          </div>
          <ReadMoreButton />
        </Grid>
      </Button>
    </Grid>
  );
};

ProductPageShowcase.type = sales.ProductPage;

ProductPageShowcase.topology = showcaseTopology;

export default ProductPageShowcase;
