import { makeStyles } from '@material-ui/styles';
import { Node } from '@ontologies/core';
import * as rdfs from '@ontologies/rdfs';
import * as schema from '@ontologies/schema';
import {
  FC,
  Resource,
  register,
  useProperty,
  useResourceProperty,
} from 'link-redux';
import React from 'react';

import { CallToAction, Header } from '../../../components/SalesWebsite';
import sales from '../../../ontology/sales';
import { SalesTheme } from '../../../themes/salesWebsite/SalesThemeProvider';
import { fullResourceTopology } from '../../../topologies/FullResource';

const SECTION_BOTTOM_MARGIN = 30;

const useStyles = makeStyles<SalesTheme>((theme) => ({
  section: {
    '& h2': {
      fontSize: '2rem',
    },
    '&:last-of-type': {
      marginBottom: '0px',
    },
    marginBottom: theme.spacing(SECTION_BOTTOM_MARGIN),
  },
}));

const AboutPage: FC = () => {
  const classes = useStyles();
  const [backgroundImage] = useProperty(sales.backgroundImage);
  const [backgroundImageMobile] = useProperty(sales.backgroundImageMobile);
  const [callToActionBackgroundImage] = useProperty(sales.callToActionBackgroundImage);
  const [callToActionButtonLink] = useProperty(sales.buttonLink);
  const [callToActionButtonText] = useProperty(sales.buttonText);
  const [callToActionText] = useProperty(sales.callToActionText);
  const [callToActionTitle] = useProperty(sales.callToActionTitle);
  const [name] = useProperty(schema.name);
  const [text] = useProperty(schema.text);
  const [sections] = useProperty(sales.sections) as [Node];
  const sectionMembers = useResourceProperty(sections, rdfs.member);

  return (
    <React.Fragment>
      <Header
        backgroundImageUrl={backgroundImage.value}
        backgroundImageUrlMobile={backgroundImageMobile.value}
        subtitle={text.value}
        title={name.value}
      />
      <div>
        {sectionMembers.map((section) => (
          <div className={classes.section} key={section.value}>
            <Resource subject={section} />
          </div>
        ))}
      </div>
      <CallToAction
        buttonLink={callToActionButtonLink.value}
        buttonText={callToActionButtonText.value}
        imageUrl={callToActionBackgroundImage.value}
        subtitle={callToActionText.value}
        title={callToActionTitle.value}
      />
    </React.Fragment>
  );
};

AboutPage.type = sales.AboutPage;
AboutPage.topology = fullResourceTopology;

export default register(AboutPage);
