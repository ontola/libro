import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button/Button';
import Grid from '@material-ui/core/Grid';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import { makeStyles } from '@material-ui/styles';
import * as schema from '@ontologies/schema';
import {
  FC,
  Property,
  useProperty,
} from 'link-redux';
import React from 'react';

import sales from '../../../ontology/sales';
import { showcaseTopology } from '../../../topologies/Showcase';
import { SalesTheme } from '../../../themes/salesWebsite/SalesThemeProvider';

const useStyles = makeStyles<SalesTheme>({
  icon: {
    color: '#2D7080',
    fontSize: 60,
  },
  image: {
    maxWidth: '100%',
  },
  productButton: {
    backgroundColor: '#FFFFFF',
    borderColor: 'grey',
    borderRadius: 5,
    flex: 'column',
    margin: 10,
    marginTop: 50,
    padding: '0 30px',
    textTransform: 'none',
  },
  text: {
    textAlign: 'left',
  },
});

const BlogPageShowcase: FC = () => {
  const classes = useStyles();
  const [name] = useProperty(schema.name);
  const [theme] = useProperty(sales.theme);

  return (
    <Button
      className={classes.productButton}
    >
      <Grid
        container
        alignItems="center"
        direction="column"
      >
        <Property className={classes.image} label={schema.image} />
        <Typography className={classes.text} variant="h4">{name.value}</Typography>
        <Typography className={classes.text}>{theme.value}</Typography>
        <ArrowRightAltIcon className={classes.icon} />
      </Grid>
    </Button>
  );
};

BlogPageShowcase.type = sales.BlogPage;

BlogPageShowcase.topology = showcaseTopology;

export default BlogPageShowcase;
