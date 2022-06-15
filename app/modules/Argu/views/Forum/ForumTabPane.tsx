import { Property, register } from 'link-redux';
import React from 'react';

import argu from '../../ontology/argu';
import ontola from '../../../../ontology/ontola';
import { Size } from '../../../../themes/themes';
import { tabPaneTopology } from '../../../../topologies';
import Container from '../../../../topologies/Container';
import Grid from '../../../../topologies/Grid';

const ForumTabPane = () => (
  <Container size={Size.Large}>
    <Grid
      container
      spacing={6}
    >
      <Property label={ontola.widgets} />
    </Grid>
  </Container>
);

ForumTabPane.type = argu.ContainerNode;

ForumTabPane.topology = tabPaneTopology;

export default register(ForumTabPane);
