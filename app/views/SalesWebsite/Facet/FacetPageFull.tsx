import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import * as schema from '@ontologies/schema';
import {
  FC,
  Property,
  useProperty,
} from 'link-redux';
import React from 'react';

import Button from '../../../components/Button';
import sales from '../../../ontology/sales';
import { SalesTheme, withSalesTheme } from '../../../themes/salesWebsite/SalesThemeProvider';
import Container from '../../../topologies/Container';
import { fullResourceTopology } from '../../../topologies/FullResource';
import {
  CallToAction,
  Header,
} from '../../../components/SalesWebsite';

const useStyles = makeStyles<SalesTheme>((theme) => ({
  callToPricing: {
    paddingBottom: '7em',
    textAlign: 'center',
  },
  facetsWrapper: {
    // COMMENT TD: Hier kan je die verschillende achtergrond kleuren gaan meegeven voor facet container achtergrond.
    backgroundColor: 'transparent',
  },
  wrapper: {
    // This should be removed if Page no longer sets a margin
    backgroundColor: theme.palette.background.default,
    marginTop: '-1rem',
  },
}));

const FacetPageFull: FC = () => {
  const [color] = useProperty(schema.color);

  const classes = useStyles({
    backgroundColor: color.value,
  });

  const [backgroundImage] = useProperty(sales.backgroundImage);
  const [backgroundImageMobile] = useProperty(sales.backgroundImageMobile);
  const [title] = useProperty(schema.name);
  const [text] = useProperty(schema.text);
  const [callToActionButtonText] = useProperty(sales.buttonText);
  const [callToActionText] = useProperty(sales.callToActionText);
  const [callToActionTitle] = useProperty(sales.callToActionTitle);
  const [moreTitle] = useProperty(sales.moreTitle);
  const [moreDescription] = useProperty(sales.moreDescription);
  const [morePageName] = useProperty(sales.morePageName);
  const [morePageLink] = useProperty(sales.morePageLink);

  return (
    <div className={classes.wrapper}>
      <Header
        backgroundImageUrl={backgroundImage.value}
        backgroundImageUrlMobile={backgroundImageMobile.value}
        subtitle={text.value}
        title={title.value}
      />
      <div className={classes.facetsWrapper}>
        <Container>
          <Property label={sales.facets} />
        </Container>
      </div>
      <Container className={classes.callToPricing}>
        <Typography variant="h2">
          {moreTitle.value}
        </Typography>
        <Typography>
          {moreDescription.value}
          <Button
            plain
            href={morePageLink.value}
          >
            {morePageName.value}
          </Button>
        </Typography>
      </Container>
      <CallToAction
        buttonText={callToActionButtonText.value}
        imageUrl="/static/images/call_to_action_background.svg"
        subtitle={callToActionText.value}
        title={callToActionTitle.value}
      />
    </div>
  );
};

FacetPageFull.type = sales.FacetPage;

FacetPageFull.topology = fullResourceTopology;

FacetPageFull.hocs = [withSalesTheme];

export default FacetPageFull;
