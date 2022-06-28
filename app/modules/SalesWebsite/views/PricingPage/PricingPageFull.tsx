import { makeStyles } from '@mui/styles';
import { SomeNode } from 'link-lib';
import {
  FC,
  Property,
  Resource,
  register,
  useIds,
} from 'link-redux';
import React from 'react';

import sales from '../../ontology/sales';
import {
  BreakPoints,
  LibroTheme,
  Margin,
} from '../../../../themes/themes';
import { fullResourceTopology } from '../../../../topologies';
import Container from '../../../../topologies/Container';
import Grid from '../../../../topologies/Grid';
import { useSeqToArr } from '../../../Core/hooks/useSeqToArr';
import { IntervalSwitcher } from '../../components/IntervalSwitcher';
import { PricingInterval } from '../Tier/Price';

const useStyles = makeStyles<LibroTheme>((theme) => ({
  container: {
    marginBottom: '7em',
  },
  lowerSection: {
    marginTop: '7em',
  },
  tierGrid: {
    [theme.breakpoints.down(BreakPoints.Medium)]: {
      gridTemplateColumns: 'repeat(3, 20rem)',
      overflowX: 'auto',
      paddingBottom: theme.spacing(Margin.Medium),
      scrollSnapType: 'x mandatory',
      width: '100%',
    },
    display: 'grid',
    gap: theme.spacing(Margin.Medium),
    gridTemplateColumns: '1fr 1fr 1fr',
    marginTop: theme.spacing(Margin.Medium),
  },
}));

const PricingPageFull: FC = () => {
  const classes = useStyles();
  const [tiersNode] = useIds(sales.tiers);
  const [tiers, loading] = useSeqToArr<SomeNode>(tiersNode);

  const [interval, setInterval] = React.useState(PricingInterval.Monthly);

  return (
    <main role="main">
      <Property label={sales.header} />
      <Container className={classes.container}>
        <IntervalSwitcher
          currentInterval={interval}
          onIntervalChange={setInterval}
        />
        <Grid
          className={classes.tierGrid}
          direction="row"
        >
          {!loading && tiers.map((tier) => (
            <Resource
              interval={interval}
              key={tier.value}
              subject={tier}
            />
          ))}
        </Grid>
        <div className={classes.lowerSection}>
          <Property label={sales.sections} />
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