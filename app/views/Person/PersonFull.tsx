import * as foaf from '@ontologies/foaf';
import * as schema from '@ontologies/schema';
import {
  FC,
  Property,
  register,
} from 'link-redux';
import React from 'react';

import ontola from '../../ontology/ontola';
import { fullResourceTopology } from '../../topologies/FullResource';

const PersonFull: FC = () => (
  <Property label={ontola.profileMenu} />
);

PersonFull.type = [
  schema.Person,
  foaf.Person,
];

PersonFull.topology = fullResourceTopology;

export default register(PersonFull);
