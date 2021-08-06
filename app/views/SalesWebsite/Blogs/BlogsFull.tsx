import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';
import * as rdfs from '@ontologies/rdfs';
import * as schema from '@ontologies/schema';
import {
  FC,
  Property,
  Resource,
  register,
} from 'link-redux';
import React from 'react';

import { FilterableArticleCollection } from '../../../components/SalesWebsite/FilterableArticleCollection';
import sales from '../../../ontology/sales';
import { SalesTheme } from '../../../themes/salesWebsite/SalesThemeProvider';
import Container from '../../../topologies/Container';
import { fullResourceTopology } from '../../../topologies/FullResource';
import Showcase from '../../../topologies/Showcase';

const useStyles = makeStyles<SalesTheme>((theme) => ({
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
    [theme.breakpoints.down('sm')]: {
      boxShadow: 'unset',
      gridGap: 40,
      gridTemplateColumns: '1fr 1fr',
      padding: 20,
    },
    [theme.breakpoints.down('xs')]: {
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
    <React.Fragment>
      <Property label={sales.header} />
      <Container className={classes.container}>
        <FilterableArticleCollection
          articlePropertyPath={[sales.blogs, rdfs.member]}
          fadeWrapper={Showcase}
          renderArticles={(articles) => (
            <div className={classes.blogGrid}>
              {articles.map((article) => (
                <Resource
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
    </React.Fragment>
  );
};

BlogsFull.type = sales.Blogs;
BlogsFull.topology = fullResourceTopology;

export default register(BlogsFull);
