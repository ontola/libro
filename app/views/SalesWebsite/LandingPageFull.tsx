import { makeStyles } from '@material-ui/styles';
import * as schema from '@ontologies/schema';
import {
  FC,
  Property,
  useProperty,
} from 'link-redux';
import React from 'react';

import argu from '../../ontology/argu';
import Container from '../../topologies/Container';
import { fullResourceTopology } from '../../topologies/FullResource';
import Showcase from '../../topologies/Showcase';

import CallToAction from './CallToAction';
import Header from './Header';
import { SalesTheme, withSalesTheme } from './SalesThemeProvider';

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

const LandingPageFull: FC = () => {
  const classes = useStyles();
  const [image] = useProperty(schema.image);
  const [title] = useProperty(schema.name);
  const [text] = useProperty(schema.text);
  const [buttonText] = useProperty(argu.ns('buttonText'));
  const [callToActionButtonText] = useProperty(argu.ns('buttonText'));
  const [callToActionText] = useProperty(argu.ns('callToActionText'));
  const [callToActionTitle] = useProperty(argu.ns('callToActionTitle'));

  return (
    <div className={classes.wrapper}>
      <Header
        buttonText={buttonText.value}
        imageUrl={image.value}
        subtitle={text.value}
        title={title.value}
      />
      <div className={classes.caseContainer}>
        <Container>
          <Property label={argu.ns('cases')} />
        </Container>
      </div>
      <Container>
        <Property label={argu.ns('features')} />
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

LandingPageFull.type = argu.ns('LandingPage');

LandingPageFull.topology = fullResourceTopology;

LandingPageFull.hocs = [withSalesTheme];

export default LandingPageFull;
