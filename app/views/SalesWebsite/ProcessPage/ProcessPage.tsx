import { makeStyles } from '@material-ui/styles';
import * as schema from '@ontologies/schema';
import {
  FC,
  useProperty,
} from 'link-redux';
import React from 'react';

import { VerticalLinearStepper } from '../../../components/SalesWebsite/Stepper';
import sales from '../../../ontology/sales';
import { SalesTheme, withSalesTheme } from '../../../themes/salesWebsite/SalesThemeProvider';
import { fullResourceTopology } from '../../../topologies/FullResource';
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

const ProcessPage: FC = () => {
  const classes = useStyles();
  const [backgroundImage] = useProperty(sales.backgroundImage);
  const [backgroundImageMobile] = useProperty(sales.backgroundImageMobile);
  const [title] = useProperty(schema.name);
  const [text] = useProperty(schema.text);
  const [buttonText] = useProperty(sales.buttonText);
  const [callToActionButtonText] = useProperty(sales.buttonText);
  const [callToActionText] = useProperty(sales.callToActionText);
  const [callToActionTitle] = useProperty(sales.callToActionTitle);
  const [image] = useProperty(schema.image);

  // const [productText1] = useProperty(sales.stepper) as Node[];
  // const productTexts = useContainerToArr(productText1);

  return (
    <div className={classes.wrapper}>
      <Header
        backgroundImageUrl={backgroundImage.value}
        backgroundImageUrlMobile={backgroundImageMobile.value}
        buttonText={buttonText.value}
        subtitle={text.value}
        title={title.value}
      />
      <VerticalLinearStepper
        // steps={productTexts.map((paragraph: SomeTerm) => (paragraph.value))}
        imageUrl={image}
        steps={['tja']}
      />

      <CallToAction
        buttonText={callToActionButtonText.value}
        imageUrl="/static/images/call_to_action_background.svg"
        subtitle={callToActionText.value}
        title={callToActionTitle.value}
      />
    </div>
  );
};

ProcessPage.type = sales.ProcessPage;

ProcessPage.topology = fullResourceTopology;

ProcessPage.hocs = [withSalesTheme];

export default ProcessPage;
