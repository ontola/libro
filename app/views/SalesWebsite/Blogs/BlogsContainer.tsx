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

import sales from '../../../ontology/sales';
import { containerTopology } from '../../../topologies/Container';
import Showcase from '../../../topologies/Showcase';
import { SalesTheme } from '../../../themes/salesWebsite/SalesThemeProvider';

const useStyles = makeStyles<SalesTheme>({
  gridStyle: {
    backgroundColor: '#FFFF',
  },
});

const BlogsContainer: FC = () => {
  const classes = useStyles();
  const [name] = useProperty(schema.name);

  return (
    <Grid
      container
      alignItems="flex-start"
      direction="column"
    >
      <Typography
        className={classes.textStyle}
        variant="h2"
      >
        {name.value}
      </Typography>
      <Showcase>
        <Property label={sales.blogShowcase} />
      </Showcase>
    </Grid>
  );
};

BlogsContainer.type = sales.Blogs;

BlogsContainer.topology = containerTopology;

export default BlogsContainer;
