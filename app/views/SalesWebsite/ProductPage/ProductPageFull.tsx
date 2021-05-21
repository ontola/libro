import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Node, SomeTerm } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import {
  FC,
  Property,
  useProperty,
} from 'link-redux';
import React from 'react';

import { CallToAction, HeaderProductPages } from '../../../components/SalesWebsite';
import { Size } from '../../../components/shared/config';
import { useContainerToArr } from '../../../hooks/useContainerToArr';
import sales from '../../../ontology/sales';
import { SalesTheme, withSalesTheme } from '../../../themes/salesWebsite/SalesThemeProvider';
import Container from '../../../topologies/Container';
import { fullResourceTopology } from '../../../topologies/FullResource';
import BlueBlock from '../../../topologies/SalesWebsite/BlueBlock';

const useStyles = makeStyles<SalesTheme>((theme) => ({
  caseContainer: {
    padding: 20,
    paddingTop: 60,
  },
  featureTitle: {
    color: '#FFF',
  },
  textBlock: {
    maxWidth: '60rem',
    textAlign: 'center',
  },
  textBlockContainer: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginBottom: 50,
  },
  title: {
    marginTop: '9rem',
    textAlign: 'center',
  },
  titleFeatureBlock: {
    color: theme.palette.background.default,
    textAlign: 'center',
  },
  wrapper: {
    // This should be removed if Page no longer sets a margin
    backgroundColor: theme.palette.background.default,
    marginTop: '-1rem',
  },
}));

const ProductPageFull: FC = () => {
  const classes = useStyles();
  const [buttonLink] = useProperty(sales.buttonLink);
  const [buttonText] = useProperty(sales.buttonText);
  const [backgroundImage] = useProperty(sales.backgroundImage);
  const [backgroundImageMobile] = useProperty(sales.backgroundImageMobile);
  const [title] = useProperty(schema.description);
  const [text] = useProperty(schema.text);
  const [productTextTitle] = useProperty(sales.productTextTitle);
  const [productText1] = useProperty(sales.productTextContent) as Node[];
  const productTexts = useContainerToArr(productText1);
  const [featureTitle] = useProperty(sales.featureTitle);
  const [callToActionText] = useProperty(sales.callToActionText);
  const [callToActionTitle] = useProperty(sales.callToActionTitle);

  return (
    <div className={classes.wrapper}>
      <HeaderProductPages
        backgroundImageUrl={backgroundImage.value}
        backgroundImageUrlMobile={backgroundImageMobile.value}
        buttonLink={buttonLink.value}
        buttonText={buttonText.value}
        subtitle={text.value}
        title={title.value}
      >
        <Container>
          <Typography
            className={classes.title}
            variant="h2"
          >
            {productTextTitle.value}
          </Typography>
          <div className={classes.textBlockContainer}>
            {Array.isArray(productTexts) && productTexts
              .map((paragraph: SomeTerm, i: number) => (
                <Typography
                  className={classes.textBlock}
                  key={i}
                  variant="body1"
                >
                  {paragraph.value}
                </Typography>
              ))}
          </div>
        </Container>
      </HeaderProductPages>
      <BlueBlock size={Size.Large}>
        <Typography
          className={classes.titleFeatureBlock}
          variant="h2"
        >
          {featureTitle?.value}
        </Typography>
        <Grid container direction="row">
          <Property label={sales.propositions} />
        </Grid>
      </BlueBlock>
      <div className={classes.caseContainer}>
        <Container>
          <Property label={sales.cases} />
        </Container>
      </div>
      <Container size={Size.Large}>
        <Property label={sales.features} />
      </Container>
      <CallToAction
        buttonLink={buttonLink.value}
        buttonText={buttonText.value}
        imageUrl="/static/images/call_to_action_background.svg"
        subtitle={callToActionText.value}
        title={callToActionTitle.value}
      />
    </div>
  );
};

ProductPageFull.type = sales.ProductPage;

ProductPageFull.topology = fullResourceTopology;

ProductPageFull.hocs = [withSalesTheme];

export default ProductPageFull;
