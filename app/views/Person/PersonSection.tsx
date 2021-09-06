import * as schema from '@ontologies/schema';
import {
  register,
  useProperty,
} from 'link-redux';
import React from 'react';

import argu from '../../ontology/argu';
import { cardListTopology } from '../../topologies/Card/CardList';
import { cardMicroRowTopology } from '../../topologies/Card/CardMicroRow';

const PersonSection = () => {
  const [name] = useProperty(schema.name);

  return (
    <b
      style={{
        color: '#707070',
        fontWeight: 'bold',
      }}
    >
      {name.value}
    </b>
  );
};

PersonSection.type = [
  schema.Person,
  schema.Organization,
  argu.Page,
];

PersonSection.topology = [
  cardListTopology,
  cardMicroRowTopology,
];

export default register(PersonSection);
