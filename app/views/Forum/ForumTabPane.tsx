import * as schema from '@ontologies/schema';
import {
  Property,
  register,
  useValues,
} from 'link-redux';
import React from 'react';

import GridItem from '../../components/Grid/GridItem';
import Heading from '../../components/Heading';
import { Size } from '../../components/shared/config';
import argu from '../../ontology/argu';
import ontola from '../../ontology/ontola';
import Container from '../../topologies/Container/index';
import Grid from '../../topologies/Grid';
import { tabPaneTopology } from '../../topologies/TabPane';

const ForumTabPane = () => {
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

ForumTabPane.type = [argu.ContainerNode, schema.WebPage];

ForumTabPane.topology = tabPaneTopology;

export default register(ForumTabPane);
