import { Literal } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import { FC, register } from 'link-redux';
import React from 'react';

import argu from '../../ontology/argu';
import { cardListTopology } from '../../topologies/Card/CardList';
import { cardMicroRowTopology } from '../../topologies/Card/CardMicroRow';

interface PersonSectionProps {
  name: Literal;
}

const PersonSection: FC<PersonSectionProps> = ({ name }) => (
  <b
    style={{
      color: '#707070',
      fontWeight: 'bold',
    }}
  >
    {name.value}
  </b>
);

PersonSection.type = [
  schema.Person,
  schema.Organization,
  argu.Page,
];

PersonSection.topology = [
  cardListTopology,
  cardMicroRowTopology,
];

PersonSection.mapDataToProps = {
  name: schema.name,
};

export default register(PersonSection);
