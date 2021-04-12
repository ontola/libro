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
import Showcase from '../../../topologies/Showcase';
import CallToAction from '../CallToAction/CallToAction';
import Header from '../Headers/Header';
import { SalesTheme, withSalesTheme } from '../SalesThemeProvider';

const useStyles = makeStyles<SalesTheme>((theme) => ({
  buttonPrimary: {
    backgroundColor: '#B33A00',
    borderRadius: 3,
    color: 'white',
    height: 48,
    margin: 20,
    padding: 20,
  },
  caseContainer: {
    background: 'linear-gradient(to bottom, #f8fbff, #ffffff)',
    padding: 20,
  },
  featureContainer: {
    marginBottom: 30,
    marginTop: 45,
  },
  gridStyle: {
    marginBottom: 20,
    marginTop: 20,
    paddingBottom: 20,
    paddingTop: 20,
  },
  paperContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  productPageTile: {
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    color: 'black',
    height: 170,
    margin: 10,
    padding: '0 30px',
    width: 250,
  },
  propositionSelector: {
    [theme.breakpoints.down('sm')]: {
      boxShadow: 'unset',
      gridGap: 40,
      gridTemplateColumns: '1fr 1fr',
      padding: 20,
    },
    [theme.breakpoints.down('xs')]: {
      gridTemplateColumns: '1fr',
    },
    borderRadius: 5,
    boxShadow: '0 0 25px rgba(0,0,0,0.2)',
    display: 'grid',
    flex: 1,
    gridTemplateColumns: '1fr 1fr 1fr 1fr',
    marginBottom: 100,
    marginTop: 100,
    overflow: 'hidden',
  },
  subtitle: {
    textAlign: 'center',
    width: 643,
  },
  wrapper: {
    // This should be removed if Page no longer sets a margin
    backgroundColor: theme.palette.background.default,
    marginTop: '-1rem',
  },
}));

const HomePage: FC = () => {
  const classes = useStyles();
  const [backgroundImage] = useProperty(argu.ns('backgroundImage'));
  const [backgroundImageMobile] = useProperty(argu.ns('backgroundImageMobile'));
  const [title] = useProperty(schema.name);
  const [text] = useProperty(schema.text);
  const [buttonText] = useProperty(argu.ns('buttonText'));
  const [callToActionButtonText] = useProperty(argu.ns('buttonText'));
  const [callToActionText] = useProperty(argu.ns('callToActionText'));
  const [callToActionTitle] = useProperty(argu.ns('callToActionTitle'));

  return (
    <div className={classes.wrapper}>
      <Header
        backgroundImageUrl={backgroundImage.value}
        backgroundImageUrlMobile={backgroundImageMobile.value}
        buttonText={buttonText.value}
        subtitle={text.value}
        title={title.value}
      >
        <Container>
          <Showcase>
            <div className={classes.propositionSelector}>
              <Property label={argu.ns('showcase')} />
            </div>
          </Showcase>
        </Container>
      </Header>
      <div className={classes.caseContainer}>
        <Container>
          <Property label={argu.ns('cases')} />
        </Container>
      </div>
      <Container>
        <div className={classes.featureContainer}>
          <Property label={argu.ns('features')} />
        </div>
        <Showcase>
          <Property label={argu.ns('duoBlock')} />
        </Showcase>
        <Property label={argu.ns('blogs')} />
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

HomePage.type = argu.ns('HomePage');

HomePage.topology = fullResourceTopology;

HomePage.hocs = [withSalesTheme];

export default HomePage;
