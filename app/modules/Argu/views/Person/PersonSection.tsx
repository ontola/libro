import * as schema from '@ontologies/schema';
import { register, useProperty } from 'link-redux';
import React from 'react';

import argu from '../../ontology/argu';
import { cardMicroRowTopology, listTopology } from '../../../../topologies';

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
  listTopology,
  cardMicroRowTopology,
];

export default register(PersonSection);
