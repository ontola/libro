import {
  Property,
  register,
} from 'link-redux';
import React from 'react';

import argu from '../../ontology/argu';
import ontola from '../../ontology/ontola';
import { Size } from '../../themes/themes';
import Container from '../../topologies/Container/index';
import Grid from '../../topologies/Grid';
import { tabPaneTopology } from '../../topologies/TabPane';

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
