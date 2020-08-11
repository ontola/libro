import schema from '@ontologies/schema';
import {
  Property,
  register,
} from 'link-redux';
import React from 'react';

import { LoadingFiller } from '../../components/Loading/index';
import argu from '../../ontology/argu';
import ontola from '../../ontology/ontola';
import Container from '../../topologies/Container/index';
import Grid from '../../topologies/Grid';
import { tabPaneTopology } from '../../topologies/TabPane';

const ForumTabPane = () => (
  <Container size="large">
    <Property label={schema.name} />
    <Property label={schema.text} />
    <Grid container spacing={6}>
      <Property label={ontola.widgets} onLoad={LoadingFiller} />
    </Grid>
  </Container>
);

ForumTabPane.type = [argu.ContainerNode, schema.WebPage];

ForumTabPane.topology = tabPaneTopology;

export default register(ForumTabPane);
