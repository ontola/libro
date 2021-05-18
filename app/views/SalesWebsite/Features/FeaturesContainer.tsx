import { makeStyles } from '@material-ui/styles';
import * as schema from '@ontologies/schema';
import {
  FC,
  Property,
  useProperty,
} from 'link-redux';
import React from 'react';

import { Parallax } from '../../../components/SalesWebsite';
import sales from '../../../ontology/sales';
import Container, { containerTopology } from '../../../topologies/Container';
import Showcase from '../../../topologies/Showcase';
import { SalesTheme } from '../../../themes/salesWebsite/SalesThemeProvider';

const useStyles = makeStyles<SalesTheme>((theme) => ({
  propositionSelector: {
    display: 'grid',
    gridGap: 20,
    gridTemplateColumns: '1fr 1fr 1fr 1fr',
    marginBottom: 70,
    marginTop: 30,
    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: '1fr 1fr',
    },
    [theme.breakpoints.down('xs')]: {
      gridTemplateColumns: '1fr',
    },
  },
  screenDivider: {
    display: 'grid',
    gridGap: 20,
    gridTemplateColumns: '1fr 1fr',
    marginBottom: 80,
    marginTop: 80,
    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: '1fr',
    },
  },
}));

const FeaturesContainer: FC = () => {
  const classes = useStyles();
  const [image] = useProperty(schema.image);
  const [backgroundImageMobile] = useProperty(sales.backgroundImageMobile);
  const [name] = useProperty(schema.name);
  const [text] = useProperty(schema.text);
  const [buttonText] = useProperty(sales.buttonText);

  return (
    <Parallax
      backgroundImageUrl={image.value}
      backgroundImageUrlMobile={backgroundImageMobile.value}
      buttonText={buttonText.value}
      subtitle={text.value}
      title={name.value}
    >
      <div>
        <Showcase>
          <div className={classes.propositionSelector}>
            <Property label={sales.featuresShowcase} />
          </div>
        </Showcase>
        <Container>
          <div className={classes.screenDivider}>
            <Property label={sales.blogs} />
            <Property label={sales.moreInformationBlock} />
          </div>
        </Container>
      </div>
    </Parallax>
  );
};

FeaturesContainer.type = sales.Features;

FeaturesContainer.topology = containerTopology;

export default FeaturesContainer;