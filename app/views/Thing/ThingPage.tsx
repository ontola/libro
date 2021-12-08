import * as schema from '@ontologies/schema';
import {
  Property,
  Resource,
  register,
} from 'link-redux';
import React from 'react';

import Metadata from '../../components/Metadata';
import FullResource from '../../topologies/FullResource';
import { pageTopology } from '../../topologies/Page';

const ThingPage = (props: any): JSX.Element => (
  <React.Fragment>
    <Metadata />
    <FullResource>
      <Property label={schema.isPartOf} />
      <Resource {...props} />
    </FullResource>
  </React.Fragment>
);

ThingPage.type = schema.Thing;

ThingPage.topology = pageTopology;

export default register(ThingPage);
