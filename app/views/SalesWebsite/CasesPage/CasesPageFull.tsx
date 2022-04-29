import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import * as as from '@ontologies/as';
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
import { LibroTheme } from '../../../themes/themes';
import { fullResourceTopology } from '../../../topologies';
import Container from '../../../topologies/Container';
import Grid from '../../../topologies/Grid';

const SECTION_SPACING = 10;
const GRID_ITEM_SPACING = 10;
const THEME_SWITCHER_BOTTOM_MARGIN = 20;

const useStyles = makeStyles<LibroTheme>((theme) => ({
  container: {
    backgroundColor: theme.palette.background.default,
  },
  imageContainer: {
    '& img': {
      width: '100%',
    },
    backgroundColor: '#F8FBFF',
    marginTop: theme.spacing(SECTION_SPACING),
    padding: '2rem',
  },
  item: {
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(GRID_ITEM_SPACING),
    },
  },
  themeSwitcher: {
    marginBottom: theme.spacing(THEME_SWITCHER_BOTTOM_MARGIN),
  },
}));

const CasesPageFull: FC = ({ subject }) => {
  const classes = useStyles();

  return (
    <main role="main">
      <Property label={sales.header} />
      <Container className={classes.container}>
        <FilterableArticleCollection
          articlePropertyPath={[as.items, rdfs.member]}
          renderArticles={(articles) => (
            <Grid
              container
              spacing={GRID_ITEM_SPACING}
              wrap="wrap"
            >
              {articles.map((article) => (
                <Resource
                  headingLevel="h2"
                  key={article.value}
                  subject={article}
                />
              ))}
            </Grid>
          )}
          subject={subject}
        />
      </Container>
      <div className={classes.imageContainer}>
        <Typography
          align="center"
          variant="h2"
        >
          <Property label={schema.text} />
        </Typography>
        <Property label={schema.image} />
      </div>
      <Property
        label={sales.callToActionBlock}
        trackingId="cases-page-full-cta"
      />
    </main>
  );
};

CasesPageFull.type = sales.CasesPage;

CasesPageFull.topology = fullResourceTopology;

export default register(CasesPageFull);
