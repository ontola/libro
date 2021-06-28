import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';
import * as as from '@ontologies/as';
import { Node } from '@ontologies/core';
import * as rdfs from '@ontologies/rdfs';
import * as schema from '@ontologies/schema';
import {
  FC,
  Property,
  Resource,
  register,
  useProperty,
  useResourceProperty,
} from 'link-redux';
import React from 'react';

import sales from '../../../ontology/sales';
import { SalesTheme, withSalesTheme } from '../../../themes/salesWebsite/SalesThemeProvider';
import Container from '../../../topologies/Container';
import { fullResourceTopology } from '../../../topologies/FullResource';
import Grid from '../../../topologies/Grid';

const SECTION_SPACING = 10;
const GRID_ITEM_SPACING = 4;

const useStyles = makeStyles<SalesTheme>((theme) => ({
  grid: {
    gap: theme.spacing(GRID_ITEM_SPACING),
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
}));

const CasesPageFull: FC = () => {
  const classes = useStyles();
  const [itemsList] = useProperty(as.items) as Node[];
  const items = useResourceProperty(itemsList, rdfs.member);

  return (
    <React.Fragment>
      <Property label={sales.header} />
      <Container>
        <Grid
          container
          className={classes.grid}
          justify="space-between"
          spacing={0}
        >
          {items.map((iri) => (
            <Grid
              item
              className={classes.item}
              key={iri.value}
              md={4}
              sm={6}
              xs={12}
            >
              <Resource subject={iri} />
            </Grid>
          ))}
        </Grid>
      </Container>
      <div className={classes.imageContainer}>
        <Typography align="center" variant="h2">
          <Property label={schema.text} />
        </Typography>
        <Property label={schema.image} />
      </div>
      <Property label={sales.callToActionBlock} />
    </React.Fragment>
  );
};

CasesPageFull.type = sales.CasesPage;

CasesPageFull.topology = fullResourceTopology;

CasesPageFull.hocs = [withSalesTheme];

export default register(CasesPageFull);
