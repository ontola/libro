import schema from '@ontologies/schema';
import {
  Property,
  Resource,
  register,
} from 'link-redux';
import React from 'react';

import ontola from '../../ontology/ontola';
import Metadata from '../../components/Metadata';
import FullResource from '../../topologies/FullResource';
import { pageTopology } from '../../topologies/Page';

const ThingPage = (props) => (
  <React.Fragment>
    <Metadata />
    <Property label={ontola.coverPhoto} onLoad={() => null} />
    <FullResource>
      <Resource partOf {...props} />
    </FullResource>
  </React.Fragment>
);

ThingPage.type = schema.Thing;

ThingPage.topology = [
  pageTopology,
];

export default register(ThingPage);
