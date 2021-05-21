import { makeStyles } from '@material-ui/styles';
import * as schema from '@ontologies/schema';
import {
  FC,
  Property,
  register,
  useProperty,
} from 'link-redux';
import React from 'react';

import { CallToAction, Header } from '../../../components/SalesWebsite';
import sales from '../../../ontology/sales';
import { withSalesTheme } from '../../../themes/salesWebsite/SalesThemeProvider';
import Container from '../../../topologies/Container';
import { fullResourceTopology } from '../../../topologies/FullResource';
import Grid from '../../../topologies/Grid';

const useStyles = makeStyles({
  container: {
    marginBottom: '7em',
  },
  tierGrid: {
    justifyContent: 'center',
  },
});

const PricingPageFull: FC = () => {
  const classes = useStyles();
  const [backgroundImage] = useProperty(sales.backgroundImage);
  const [backgroundImageMobile] = useProperty(sales.backgroundImageMobile);
  const [callToActionButtonLink] = useProperty(sales.buttonLink);
  const [callToActionButtonText] = useProperty(sales.buttonText);
  const [callToActionText] = useProperty(sales.callToActionText);
  const [callToActionTitle] = useProperty(sales.callToActionTitle);
  const [name] = useProperty(schema.name);
  const [text] = useProperty(schema.text);

  return (
    <div>
      <Header
        backgroundImageUrl={backgroundImage.value}
        backgroundImageUrlMobile={backgroundImageMobile.value}
        subtitle={text.value}
        title={name.value}
      />
      <Container className={classes.container}>
        <Grid className={classes.tierGrid} direction="row">
          <Property label={sales.tiers} />
        </Grid>
      </Container>
      <CallToAction
        buttonLink={callToActionButtonLink.value}
        buttonText={callToActionButtonText.value}
        imageUrl="/static/images/call_to_action_background.svg"
        subtitle={callToActionText.value}
        title={callToActionTitle.value}
      />
    </div>
  );
};

PricingPageFull.type = sales.PricingPage;

PricingPageFull.topology = fullResourceTopology;

PricingPageFull.hocs = [withSalesTheme];

export default register(PricingPageFull);
