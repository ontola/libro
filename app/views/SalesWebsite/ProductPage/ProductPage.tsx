import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import * as schema from '@ontologies/schema';
import {
  FC,
  Property,
  useProperty,
} from 'link-redux';
import React from 'react';

import argu from '../../../ontology/argu';
import Container from '../../../topologies/Container';
import { fullResourceTopology } from '../../../topologies/FullResource';
import HeaderProductPages from '../HeaderProductPages';
import { SalesTheme, withSalesTheme } from '../SalesThemeProvider';

const useStyles = makeStyles<SalesTheme>((theme) => ({
  featureShowcaseBackground: {
    background: theme.palette.primary.main,
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
    justifyContent: 'center',
  },
  title: {
    marginTop: '9rem',
    textAlign: 'center',
  },
  titleFeatureBlock: {
    color: theme.palette.background.default,
    padding: 40,
    textAlign: 'center',
  },
  wrapper: {
    // This should be removed if Page no longer sets a margin
    backgroundColor: theme.palette.background.default,
    marginTop: '-1rem',
  },
}));

const ProductPage: FC = () => {
  const classes = useStyles();
  const [buttonText] = useProperty(argu.ns('buttonText'));
  const [image] = useProperty(schema.image);
  const [backgroundImage] = useProperty(argu.ns('backgroundImage'));
  const [backgroundImageMobile] = useProperty(argu.ns('backgroundImageMobile'));
  const [title] = useProperty(schema.description);
  const [text] = useProperty(schema.text);
  const [productTextTitle] = useProperty(argu.ns('productTextTitle'));
  const [productTextContent] = useProperty(argu.ns('productTextContent'));
  const [featureTitle] = useProperty(argu.ns('featureTitle'));

  return (
    <div className={classes.wrapper}>
      <HeaderProductPages
        backgroundImageUrl={backgroundImage.value}
        backgroundImageUrlMobile={backgroundImageMobile.value}
        buttonText={buttonText.value}
        imageUrl={image}
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
            <Typography
              className={classes.textBlock}
              variant="subtitle1"
            >
              {productTextContent.value}
            </Typography>
          </div>
        </Container>
      </HeaderProductPages>
      <div className={classes.featureShowcaseBackground}>
        <Container>
          <Typography
            className={classes.titleFeatureBlock}
            variant="h2"
          >
            {featureTitle.value}
          </Typography>
          <Property label={argu.ns('features')} />
        </Container>
      </div>
    </div>
  );
};

ProductPage.type = argu.ns('ProductPage');

ProductPage.topology = fullResourceTopology;

ProductPage.hocs = [withSalesTheme];

export default ProductPage;
