import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import * as schema from '@ontologies/schema';
import {
  FC,
  Property,
  useProperty,
} from 'link-redux';
import React from 'react';

import { ArticleContent, HeaderProductPages } from '../../../components/SalesWebsite';
import sales from '../../../ontology/sales';
import { LibroTheme, Size } from '../../../themes/themes';
import Container from '../../../topologies/Container';
import { fullResourceTopology } from '../../../topologies/FullResource';
import BlueBlock from '../../../topologies/SalesWebsite/BlueBlock';

const useStyles = makeStyles<LibroTheme>((theme) => ({
  articleContent: {
    margin: 'unset',
    maxWidth: '100%',
    width: '100%',
  },
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
    marginBottom: 50,
    padding: '6rem',
    [theme.breakpoints.down('sm')]: {
      padding: '1rem',
    },
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
  const [featureTitle] = useProperty(sales.featureTitle);

  return (
    <div className={classes.wrapper}>
      <HeaderProductPages
        backgroundImageUrl={backgroundImage.value}
        backgroundImageUrlMobile={backgroundImageMobile.value}
        buttonLink={buttonLink.value}
        buttonText={buttonText.value}
        subtitle={text}
        title={title.value}
      >
        <Container className={classes.textBlockContainer}>
          <ArticleContent classes={{ content: classes.articleContent }}>
            <Property label={sales.productText} />
          </ArticleContent>
        </Container>
      </HeaderProductPages>
      <BlueBlock size={Size.Large}>
        <Typography
          className={classes.titleFeatureBlock}
          variant="h2"
        >
          {featureTitle?.value}
        </Typography>
        <Grid
          container
          direction="row"
        >
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
      <Property
        label={sales.callToActionBlock}
        trackingId="product-page-full-cta"
      />
    </div>
  );
};

ProductPageFull.type = sales.ProductPage;

ProductPageFull.topology = fullResourceTopology;

export default ProductPageFull;
