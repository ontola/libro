import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import {
  FC,
  Property,
} from 'link-redux';
import React from 'react';

import sales from '../../../ontology/sales';
import { SalesTheme, withSalesTheme } from '../../../themes/salesWebsite/SalesThemeProvider';
import Container from '../../../topologies/Container';
import { fullResourceTopology } from '../../../topologies/FullResource';
import Showcase from '../../../topologies/Showcase';

const useStyles = makeStyles<SalesTheme>((theme) => ({
  blogs: {
    marginBottom: '10em',
    marginTop: '10em',
  },
  buttonPrimary: {
    backgroundColor: '#B33A00',
    borderRadius: 3,
    color: 'white',
    height: 48,
    margin: 20,
    padding: 20,
  },
  caseContainer: {
    background: 'linear-gradient(to bottom, #f8fbff, #ffffff)',
    backgroundSize: '100vw',
    padding: 20,
  },
  gridStyle: {
    marginBottom: 20,
    marginTop: 20,
    paddingBottom: 20,
    paddingTop: 20,
  },
  paperContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  productPageTile: {
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    color: 'black',
    height: 170,
    margin: 10,
    padding: '0 30px',
    width: 250,
  },
  propositionContainer: {
    marginBottom: 30,
    marginTop: 45,
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
    marginBottom: 100,
    marginTop: 100,
    overflow: 'hidden',
  },
  subtitle: {
    textAlign: 'center',
    width: 643,
  },
  wrapper: {
    // This should be removed if Page no longer sets a margin
    backgroundColor: theme.palette.background.default,
    marginTop: '-1rem',
  },
}));

const HomePageFull: FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <Property label={sales.header} />
      <Container>
        <Showcase
          className={classes.propositionSelector}
          spacing={0}
        >
          <Property label={sales.showcase} />
        </Showcase>
      </Container>
      <div className={classes.caseContainer}>
        <Property noBackdrop label={sales.cases} />
      </div>
      <Container>
        <Grid
          container
          className={classes.propositionContainer}
          direction="row"
        >
          <Property label={sales.propositions} />
        </Grid>
        <Showcase className={classes.propositionContainer}>
          <Property label={sales.duoBlock} />
        </Showcase>
        <div className={classes.blogs}>
          <Property centerHeading label={sales.blogs} />
        </div>
      </Container>
      <Property label={sales.callToActionBlock} />
    </div>
  );
};

HomePageFull.type = sales.HomePage;

HomePageFull.topology = fullResourceTopology;

HomePageFull.hocs = [withSalesTheme];

export default HomePageFull;
