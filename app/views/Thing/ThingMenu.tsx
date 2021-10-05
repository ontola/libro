import * as foaf from '@ontologies/foaf';
import * as rdfs from '@ontologies/rdfs';
import * as schema from '@ontologies/schema';
import { Property, register } from 'link-redux';
import React from 'react';

import LDLink from '../../components/LDLink';
import { menuTopology } from '../../topologies/Menu';

const ThingMenu = (): JSX.Element => (
  <LDLink>
    <Property label={[schema.name, rdfs.label, foaf.name]} />
  </LDLink>
);

ThingMenu.type = schema.Thing;

ThingMenu.topology = menuTopology;

export default register(ThingMenu);