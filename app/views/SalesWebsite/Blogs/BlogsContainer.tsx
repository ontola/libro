import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import * as schema from '@ontologies/schema';
import clsx from 'clsx';
import {
  FC,
  Resource,
  array,
  useIds,
  useValues,
} from 'link-redux';
import React from 'react';

import sales from '../../../ontology/sales';
import { LibroTheme } from '../../../themes/themes';
import { containerTopology } from '../../../topologies/Container';
import Showcase from '../../../topologies/Showcase';

const BLOG_SPACING = 8;

export interface BlogsContainerProps {
  centerHeading?: boolean;
}

const useStyles = makeStyles<LibroTheme>((theme) => ({
  headingCenter: {
    textAlign: 'center',
  },
  showcaseContainer: {
    display: 'grid',
    gap: theme.spacing(BLOG_SPACING),
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
  },
}));

const BlogsContainer: FC<BlogsContainerProps> = ({ centerHeading }) => {
  const classes = useStyles();
  const headingClasses = clsx({
    [classes.headingCenter]: centerHeading,
  });
  const [name] = useValues(schema.name);
  const blogs = useIds(array(sales.blogShowcase));

  return (
    <React.Fragment>
      <Typography
        className={headingClasses}
        variant="h2"
      >
        {name}
      </Typography>
      <Showcase className={classes.showcaseContainer}>
        {blogs.map((iri) => (
          <div key={iri.value}>
            <Resource subject={iri} />
          </div>
        ))}
      </Showcase>
    </React.Fragment>
  );
};

BlogsContainer.type = sales.Blogs;

BlogsContainer.topology = containerTopology;

export default BlogsContainer;
