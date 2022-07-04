import { Property, register } from 'link-redux';
import React from 'react';

import { Size } from '../../../Kernel/lib/themes';
import Container from '../../../Common/topologies/Container';
import Grid from '../../../Common/topologies/Grid';
import { tabPaneTopology } from '../../../Common/topologies/TabPane';
import ontola from '../../../Kernel/ontology/ontola';
import argu from '../../ontology/argu';

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
