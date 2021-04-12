import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Node, SomeTerm } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import {
  FC,
  Property,
  useProperty,
} from 'link-redux';
import React from 'react';

import { useContainerToArr } from '../../../hooks/useContainerToArr';
import argu from '../../../ontology/argu';
import Container from '../../../topologies/Container';
import { fullResourceTopology } from '../../../topologies/FullResource';
import CallToAction from '../CallToAction/CallToAction';
import HeaderProductPages from '../Headers/HeaderProductPages';
import Parallax from '../Parallax/Parallax';
import { SalesTheme, withSalesTheme } from '../SalesThemeProvider';

const useStyles = makeStyles<SalesTheme>((theme) => ({
  caseContainer: {
    background: 'linear-gradient(to bottom, #f8fbff, #ffffff)',
    padding: 20,
    paddingTop: 60,
  },
  featureShowcaseBackground: {
    background: theme.palette.primary.main,
    padding: 40,
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
    marginBottom: -20,
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
  const [productText1] = useProperty(argu.ns('productTextContent')) as Node[];
  const productTexts = useContainerToArr(productText1);
  const [featureTitle] = useProperty(argu.ns('featureTitle'));
  const [callToActionButtonText] = useProperty(argu.ns('buttonText'));
  const [callToActionText] = useProperty(argu.ns('callToActionText'));
  const [callToActionTitle] = useProperty(argu.ns('callToActionTitle'));
  const [parallax] = useProperty(argu.ns('parallax'));
  const [titleFunctionaliteiten] = useProperty(argu.ns('titleFunctionaliteiten'));
  const [buttonTextFunctionaliteiten] = useProperty(argu.ns('buttonTextFunctionaliteiten'));
  const [textFunctionaliteiten] = useProperty(argu.ns('textFunctionaliteiten'));

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
      <div className={classes.caseContainer}>
        <Container>
          <Property label={argu.ns('cases')} />
        </Container>
      </div>
      <Container>
        <Property label={argu.ns('functionalities')} />
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

ProductPage.type = argu.ns('ProductPage');

ProductPage.topology = fullResourceTopology;

ProductPage.hocs = [withSalesTheme];

export default ProductPage;
