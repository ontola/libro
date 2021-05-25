import {
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

import Button from '../../../components/Button';
import { ReadMoreButton } from '../../../components/SalesWebsite';
import sales from '../../../ontology/sales';
import { SalesTheme } from '../../../themes/salesWebsite/SalesThemeProvider';
import { showcaseTopology } from '../../../topologies/Showcase';

const INNER_CONTAINER_GAP = 3;
const INNER_CONTAINER_PADDING = 2;

const useStyles = makeStyles<SalesTheme>((theme) => ({
  arrow: {
    fontSize: 50,
  },
  innerContainer: {
    gap: theme.spacing(INNER_CONTAINER_GAP),
    padding: theme.spacing(INNER_CONTAINER_PADDING),
  },
  productButton: {
    [theme.breakpoints.down('sm')]: {
      '&:hover': {
        boxShadow: '0 0 25px rgba(0,0,0,0.2)',
      },
      boxShadow: '0 0 25px rgba(0,0,0,0.2)',
      width: '100%',
    },
    alignItems: 'flex-start',
    display: 'flex',
    justifyContent: 'flex-start',
    padding: '1rem',
    textAlign: 'left',
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
        plain
        className={classes.productButton}
        href={subject.value}
      >
        <Grid
          container
          alignItems="flex-start"
          className={classes.innerContainer}
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
