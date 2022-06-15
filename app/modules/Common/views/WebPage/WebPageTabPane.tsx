import * as schema from '@ontologies/schema';
import {
  Property,
  register,
  useValues, 
} from 'link-redux';
import React from 'react';

import ontola from '../../../../ontology/ontola';
import { Size } from '../../../../themes/themes';
import { tabPaneTopology } from '../../../../topologies';
import Container from '../../../../topologies/Container';
import Grid from '../../../../topologies/Grid';
import GridItem from '../../components/Grid/GridItem';
import Heading from '../../components/Heading';

const WebPageTabPane = () => {
  const [name] = useValues(schema.name);

  return (
    <Container size={Size.Large}>
      <GridItem size={3}>
        <Container>
          <Heading>
            {name}
          </Heading>
          <Property label={schema.text} />
        </Container>
      </GridItem>
      <Grid
        container
        spacing={6}
      >
        <Property label={ontola.widgets} />
      </Grid>
    </Container>
  );
};

WebPageTabPane.type = schema.WebPage;

WebPageTabPane.topology = tabPaneTopology;

export default register(WebPageTabPane);
