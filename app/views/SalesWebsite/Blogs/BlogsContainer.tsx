import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
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

const BLOG_SPACING = 8;

export interface BlogsContainerProps {
  centerHeading?: boolean;
}

const useStyles = makeStyles<SalesTheme>((theme) => ({
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
  const [name] = useProperty(schema.name);
  const [blogShowcase] = useProperty(sales.blogShowcase) as SomeNode[];
  const blogs = useResourceProperty(blogShowcase, rdfs.member);

  return (
    <React.Fragment>
      <Typography
        className={headingClasses}
        variant="h2"
      >
        {name.value}
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
