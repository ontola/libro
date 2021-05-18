import { Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/styles';
import * as rdfs from '@ontologies/rdfs';
import * as schema from '@ontologies/schema';
import { SomeNode } from 'link-lib';
import {
  FC,
  Resource,
  useProperty,
  useResourceProperty,
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
  const [blogShowcase] = useProperty(sales.blogShowcase) as SomeNode[];
  const blogs = useResourceProperty(blogShowcase, rdfs.member);

  return (
    <Grid
      container
      alignItems="flex-start"
      direction="column"
    >
      <Grid item>
        <Typography
          className={classes.textStyle}
          variant="h2"
        >
          {name.value}
        </Typography>
      </Grid>
      <Grid item>
        <Showcase>
          {blogs.map((iri) => (
            <Grid item key={iri.value}>
              <Resource subject={iri} />
            </Grid>
          ))}
        </Showcase>
      </Grid>
    </Grid>
  );
};

BlogsContainer.type = sales.Blogs;

BlogsContainer.topology = containerTopology;

export default BlogsContainer;
