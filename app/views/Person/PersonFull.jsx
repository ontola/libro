import foaf from '@ontologies/foaf';
import schema from '@ontologies/schema';
import {
  Property,
  register,
} from 'link-redux';
import React from 'react';

import ontola from '../../ontology/ontola';
import { fullResourceTopology } from '../../topologies/FullResource';

class PersonFull extends React.PureComponent {
  static type = [
    schema.Person,
    foaf.Person,
  ];

  static topology = fullResourceTopology;

  render() {
    return (
      <Property label={ontola.profileMenu} />
    );
  }
}

export default register(PersonFull);
