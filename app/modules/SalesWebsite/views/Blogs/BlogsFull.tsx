import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import * as rdfs from '@ontologies/rdfs';
import * as schema from '@ontologies/schema';
import {
  FC,
  Property,
  Resource,
  register,
} from 'link-redux';
import React from 'react';

import { fullResourceTopology } from '../../../Common/topologies';
import Container from '../../../Common/topologies/Container';
import { BreakPoints, LibroTheme } from '../../../Kernel/lib/themes';
import { FilterableArticleCollection } from '../../components/FilterableArticleCollection';
import sales from '../../ontology/sales';
import Showcase from '../../topologies/Showcase';

const useStyles = makeStyles<LibroTheme>((theme) => ({
  blogGrid: {
    display: 'grid',
    gap: '2rem',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    width: '100%',
  },
  container: {
    backgroundColor: theme.palette.background.default,
    marginBottom: '5rem',
  },
  propositionSelector: {
    [theme.breakpoints.down(BreakPoints.Medium)]: {
      boxShadow: 'unset',
      gridGap: 40,
      gridTemplateColumns: '1fr 1fr',
      padding: 20,
    },
    [theme.breakpoints.down(BreakPoints.Small)]: {
      gridTemplateColumns: '1fr',
    },
    backgroundColor: 'white',
    borderRadius: 5,
    boxShadow: '0 0 25px rgba(0,0,0,0.2)',
    display: 'grid',
    flex: 1,
    gridTemplateColumns: '1fr 1fr 1fr 1fr',
    overflow: 'hidden',
  },

}));

const BlogsFull: FC = ({ subject }) => {
  const classes = useStyles();

  return (
    <main role="main">
      <Property label={sales.header} />
      <Container className={classes.container}>
        <FilterableArticleCollection
          articlePropertyPath={[sales.blogs, rdfs.member]}
          fadeWrapper={Showcase}
          renderArticles={(articles) => (
            <div className={classes.blogGrid}>
              {articles.map((article) => (
                <Resource
                  headingLevel="h2"
                  key={article.value}
                  subject={article}
                />
              ))}
            </div>
          )}
          subject={subject}
        />
      </Container>
      <Typography
        align="center"
        variant="h2"
      >
        <Property label={schema.text} />
      </Typography>
      <Container className={classes.container}>
        <Showcase
          className={classes.propositionSelector}
          spacing={0}
        >
          <Property label={sales.showcase} />
        </Showcase>
      </Container>
      <Property
        label={sales.callToActionBlock}
        trackingId="blogs-full-cta"
      />
    </main>
  );
};

BlogsFull.type = sales.Blogs;
BlogsFull.topology = fullResourceTopology;

export default register(BlogsFull);
