import {
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import Button from '@material-ui/core/Button/Button';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
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
import {
  CallToAction,
  Header,
} from '../../../components/SalesWebsite';

const useStyles = makeStyles<SalesTheme>((theme) => ({
  academyContainer: {
    margin: 20,
    paddingBottom: '4em',
  },
  button: {
    fontSize: 24,
    fontWeight: theme.typography.fontWeightMedium,
  },
  buttonPrimary: {
    backgroundColor: '#B33A00',
    borderRadius: 3,
    color: 'white',
    height: 48,
    margin: 20,
    padding: 20,
  },
  container: {
    marginTop: 100,
  },
  gridStyle: {
    marginBottom: 20,
    marginTop: 20,
    paddingBottom: 20,
    paddingTop: 20,
  },
  image: {
    padding: 20,
  },
  imageWrapper: {
    alignItems: 'flex-end',
    display: 'flex',
    flexDirection: 'column',
    marginTop: -250,
    [theme.breakpoints.down('md')]: {
      margin: -25,
    },
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
  stepperWrapper: {
    marginTop: 50,
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

const ProcessPageFull: FC = () => {
  const classes = useStyles();
  const styles = useTheme();

  const [backgroundImage] = useProperty(sales.backgroundImage);
  const [backgroundImageMobile] = useProperty(sales.backgroundImageMobile);
  const [title] = useProperty(schema.name);
  const [text] = useProperty(schema.text);
  const [callToActionButtonLink] = useProperty(sales.buttonLink);
  const [callToActionButtonText] = useProperty(sales.buttonText);
  const [callToActionText] = useProperty(sales.callToActionText);
  const [callToActionTitle] = useProperty(sales.callToActionTitle);

  const [textTitle] = useProperty(sales.textTitle);
  const [textBlock] = useProperty(sales.textBlock);

  return (
    <div className={classes.wrapper}>
      <Header
        backgroundImageUrl={backgroundImage.value}
        backgroundImageUrlMobile={backgroundImageMobile.value}
        subtitle={text.value}
        title={title.value}
      />
      <Container>
        <Grid item md={8} sm={12}>
          <Typography
            className={classes.title}
            variant="h2"
          >
            {textTitle.value}
          </Typography>
          <Typography
            variant="body1"
          >
            {textBlock.value}
          </Typography>
        </Grid>
      </Container>
      <Container>
        <Grid
          container
          alignItems="center"
          className={classes.container}
          direction="row"
          justify="center"
        >
          <Grid item className={classes.stepperWrapper} md={8} sm={12}>
            <Property label={sales.stepper} />
          </Grid>
          <Grid item className={classes.imageWrapper} md={4} sm={12}>
            {useMediaQuery(styles.breakpoints.down('md')) ?
              null
              :
              <div>
                <Property
                  className={classes.image}
                  label={schema.image}
                />
                <Property
                  className={classes.image}
                  label={sales.secondaryImage}
                />
                <Property
                  className={classes.image}
                  label={sales.tertiaryImage}
                />
              </div>}
          </Grid>
        </Grid>
      </Container>
      <Container>
        <div className={classes.academyContainer}>
          <Typography
            className={classes.title}
            variant="h2"
          >
            Onze Academy
          </Typography>
          <Typography
            variant="body1"
          >
            Naast onze bewezen werkwijze hebben wij een academy ingericht waarmee
            wij jou in staat stellen Argu zo optimaal mogelijk in te zetten voor
            jouw vraagstuk.
          </Typography>
          <Button
            className={classes.button}
            color="primary"
            endIcon={<ChevronRightIcon />}
            href="/academy"
            target="_blank"
            variant="contained"
          >
            Bekijk onze academy
          </Button>
        </div>
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

ProcessPageFull.type = sales.ProcessPage;

ProcessPageFull.topology = fullResourceTopology;

ProcessPageFull.hocs = [withSalesTheme];

export default ProcessPageFull;
