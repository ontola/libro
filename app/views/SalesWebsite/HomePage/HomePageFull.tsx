import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import * as schema from '@ontologies/schema';
import {
  FC,
  Property,
  useProperty,
} from 'link-redux';
import React from 'react';

import sales from '../../../ontology/sales';
import { SalesTheme, withSalesTheme } from '../../../themes/salesWebsite/SalesThemeProvider';
import Container from '../../../topologies/Container';
import { fullResourceTopology } from '../../../topologies/FullResource';
import Showcase from '../../../topologies/Showcase';
import {
  CallToAction,
  Header,
} from '../../../components/SalesWebsite';

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
  propositionContainer: {
    marginBottom: 30,
    marginTop: 45,
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
  questions: {
    backgroundColor: 'transparent',
    height: 'auto',
    marginTop: -114,
    position: 'absolute',
    right: 104,
    transform: 'rotate(30deg)',
    width: 25,
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
  zooComplot: {
    backgroundColor: 'transparent',
    height: 'auto',
    marginTop: -76,
    position: 'absolute',
    right: -20,
    width: 200,
  },
}));

const HomePageFull: FC = () => {
  const classes = useStyles();
  const [backgroundImage] = useProperty(sales.backgroundImage);
  const [backgroundImageMobile] = useProperty(sales.backgroundImageMobile);
  const [title] = useProperty(schema.name);
  const [text] = useProperty(schema.text);
  const [buttonText] = useProperty(sales.buttonText);
  const [callToActionButtonText] = useProperty(sales.buttonText);
  const [callToActionText] = useProperty(sales.callToActionText);
  const [callToActionTitle] = useProperty(sales.callToActionTitle);

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
              <Property label={sales.showcase} />
            </div>
          </Showcase>
          <img
            alt="The giraffe went away"
            className={classes.zooComplot}
            src="https://freesvg.org/img/1580290489giraffe-silhouette-freesvg.org.png"
          />
          <img
            alt="More questions"
            className={classes.questions}
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Red_question_mark.svg/450px-Red_question_mark.svg.png"
          />
        </Container>
      </Header>
      <div className={classes.caseContainer}>
        <Container>
          <Property label={sales.cases} />
        </Container>
      </div>
      <Container>
        <div className={classes.propositionContainer}>
          <Grid container direction="row">
            <Property label={sales.propositions} />
          </Grid>
        </div>
        <Showcase>
          <Property label={sales.duoBlock} />
        </Showcase>
        <Property label={sales.blogs} />
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

HomePageFull.type = sales.HomePage;

HomePageFull.topology = fullResourceTopology;

HomePageFull.hocs = [withSalesTheme];

export default HomePageFull;
