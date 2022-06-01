import { Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { FC, Property } from 'link-redux';
import React from 'react';

import sales from '../../../ontology/sales';
import {
  BreakPoints,
  LibroTheme,
  Margin,
} from '../../../themes/themes';
import Container from '../../../topologies/Container';
import { fullResourceTopology } from '../../../topologies';
import { HeaderTheme } from '../Header';

const TWO = 2;

const useStyles = makeStyles<LibroTheme>((theme) => ({
  blogs: {
    [theme.breakpoints.down(BreakPoints.Medium)]: {
      marginTop: '5em',
    },
    marginBlock: theme.spacing(Margin.XXL * TWO),
  },
  caseContainer: {
    background: 'linear-gradient(to bottom, #f8fbff, #ffffff)',
    backgroundSize: '100vw',
    marginBottom: theme.spacing(Margin.XXL),
    padding: theme.spacing(Margin.XXL),
    paddingBottom: 0,
  },
  propositionContainer: {
    marginTop: theme.spacing(Margin.XXL),
  },
}));

const HomePageFull: FC = () => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Property
        label={sales.header}
        theme={HeaderTheme.HomePage}
      />
      <Container>
        <Property label={sales.sections} />
      </Container>
      <div className={classes.caseContainer}>
        <Property
          noBackdrop
          label={sales.cases}
        />
      </div>
      <Property label={sales.duoBlock} />
      <Container>
        <Grid
          container
          className={classes.propositionContainer}
          direction="row"
        >
          <Property label={sales.propositions} />
        </Grid>
        <div className={classes.blogs}>
          <Property
            centerHeading
            label={sales.blogs}
          />
        </div>
      </Container>
      <Property
        label={sales.callToActionBlock}
        trackingId="home-page-full-cta"
      />
    </React.Fragment>
  );
};

HomePageFull.type = sales.HomePage;

HomePageFull.topology = fullResourceTopology;

export default HomePageFull;
