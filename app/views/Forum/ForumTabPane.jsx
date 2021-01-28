import * as schema from '@ontologies/schema';
import {
  Property,
  linkType,
  register,
} from 'link-redux';
import React from 'react';

import Heading from '../../components/Heading';
import argu from '../../ontology/argu';
import ontola from '../../ontology/ontola';
import Container from '../../topologies/Container/index';
import Grid from '../../topologies/Grid';
import { tabPaneTopology } from '../../topologies/TabPane';

const ForumTabPane = ({ name }) => (
  <Container size="large">
    <Heading>{name?.value}</Heading>
    <Property label={schema.text} />
    <Grid container spacing={6}>
      <Property label={ontola.widgets} />
    </Grid>
  </Container>
);

ForumTabPane.type = [argu.ContainerNode, schema.WebPage];

ForumTabPane.topology = tabPaneTopology;

ForumTabPane.mapDataToProps = {
  name: schema.name,
};

ForumTabPane.propTypes = {
  name: linkType,
};

export default register(ForumTabPane);
