import { makeStyles } from '@material-ui/styles';
import {
  FC,
  Property,
  register,
} from 'link-redux';
import React from 'react';

import argu from '../../../ontology/argu';
import sales from '../../../ontology/sales';
import { LibroTheme } from '../../../themes/themes';
import Container from '../../../topologies/Container';
import { fullResourceTopology } from '../../../topologies/FullResource';
import Grid from '../../../topologies/Grid';

const useStyles = makeStyles<LibroTheme>((theme) => ({
  container: {
    backgroundColor: theme.palette.background.default,
    marginBottom: '7em',
  },
  lowerSection: {
    marginTop: '7em',
  },
  tierGrid: {
    justifyContent: 'center',
  },
}));

const PricingPageFull: FC = () => {
  const classes = useStyles();

  return (
    <main role="main">
      <Property label={sales.header} />
      <Container className={classes.container}>
        <Grid
          className={classes.tierGrid}
          direction="row"
        >
          <Property label={sales.tiers} />
        </Grid>
        <div className={classes.lowerSection}>
          <Property label={argu.lowerSection} />
        </div>
      </Container>
      <Property
        label={sales.callToActionBlock}
        trackingId="pricing-page-full-cta"
      />
    </main>
  );
};

PricingPageFull.type = sales.PricingPage;

PricingPageFull.topology = fullResourceTopology;

export default register(PricingPageFull);
