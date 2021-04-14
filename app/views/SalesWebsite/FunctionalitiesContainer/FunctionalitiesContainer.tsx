import { makeStyles } from '@material-ui/styles';
import * as schema from '@ontologies/schema';
import {
  FC,
  Property,
  useProperty,
} from 'link-redux';
import React from 'react';

import { Parallax } from '../../../components/SalesWebsite';
import argu from '../../../ontology/argu';
import { containerTopology } from '../../../topologies/Container';
import Showcase from '../../../topologies/Showcase';
import { SalesTheme } from '../../../themes/salesWebsite/SalesThemeProvider';

const useStyles = makeStyles<SalesTheme>((theme) => ({
  container: {
    backgroundColor: 'yellowgreen',
    flex: 1,
    margin: 'auto',
  },
  propositionSelector: {
    display: 'grid',
    gridGap: 20,
    gridTemplateColumns: '1fr 1fr 1fr 1fr',
    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: '1fr 1fr',
    },
    [theme.breakpoints.down('xs')]: {
      gridTemplateColumns: '1fr',
    },
  },
}));

const FunctionalitiesContainer: FC = () => {
  const classes = useStyles();
  const [image] = useProperty(schema.image);
  const [backgroundImageMobile] = useProperty(argu.ns('backgroundImageMobile'));
  const [name] = useProperty(schema.name);
  const [text] = useProperty(schema.text);
  const [buttonText] = useProperty(argu.ns('buttonText'));

  return (
    <Parallax
      backgroundImageUrl={image.value}
      backgroundImageUrlMobile={backgroundImageMobile.value}
      buttonText={buttonText.value}
      subtitle={text.value}
      title={name.value}
    >
      <Showcase>
        <div className={classes.propositionSelector}>
          <Property label={argu.ns('functionalitiesShowcase')} />
        </div>
      </Showcase>
    </Parallax>
  );
};

FunctionalitiesContainer.type = argu.ns('FunctionalitiesContainer');

FunctionalitiesContainer.topology = containerTopology;

export default FunctionalitiesContainer;
