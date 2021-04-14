import { Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/styles';
import * as schema from '@ontologies/schema';
import {
  FC,
  Property,
  useProperty,
} from 'link-redux';
import React from 'react';

import argu from '../../../ontology/argu';
import { containerTopology } from '../../../topologies/Container';
import Showcase from '../../../topologies/Showcase';
import { SalesTheme } from '../../../themes/salesWebsite/SalesThemeProvider';

const useStyles = makeStyles<SalesTheme>({
  gridStyle: {
    backgroundColor: '#F8FBFF',
  },
});

const BlogContainer: FC = () => {
  const classes = useStyles();
  const [name] = useProperty(schema.name);

  return (
    <Grid
      container
      alignItems="center"
      className={classes.gridStyle}
      direction="column"
    >
      <Typography className={classes.textStyle} variant="h2">{name.value}</Typography>
      <Showcase>
        <Property label={argu.ns('blogShowcase')} />
      </Showcase>
    </Grid>
  );
};

BlogContainer.type = argu.ns('Blogs');

BlogContainer.topology = containerTopology;

export default BlogContainer;
