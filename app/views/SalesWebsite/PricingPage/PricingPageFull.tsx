import { makeStyles } from '@material-ui/styles';
import {
  FC,
  Property,
  register,
} from 'link-redux';
import React from 'react';

import argu from '../../../ontology/argu';
import sales from '../../../ontology/sales';
import { withSalesTheme } from '../../../themes/salesWebsite/SalesThemeProvider';
import Container from '../../../topologies/Container';
import { fullResourceTopology } from '../../../topologies/FullResource';
import Grid from '../../../topologies/Grid';

const useStyles = makeStyles({
  container: {
    marginBottom: '7em',
  },
  lowerSection: {
    marginTop: '7em',
  },
  tierGrid: {
    justifyContent: 'center',
  },
});

const PricingPageFull: FC = () => {
  const classes = useStyles();

  return (
    <div>
      <Property label={sales.header} />
      <Container className={classes.container}>
        <Grid className={classes.tierGrid} direction="row">
          <Property label={sales.tiers} />
        </Grid>
        <div className={classes.lowerSection}>
          <Property label={argu.lowerSection} />
        </div>
      </Container>
      <Property label={sales.callToActionBlock} />
    </div>
  );
};

PricingPageFull.type = sales.PricingPage;

PricingPageFull.topology = fullResourceTopology;

PricingPageFull.hocs = [withSalesTheme];

export default register(PricingPageFull);
