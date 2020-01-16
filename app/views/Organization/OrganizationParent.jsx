import schema from '@ontologies/schema';
import { register } from 'link-redux';
import React from 'react';

import argu from '../../ontology/argu';
import { parentTopology } from '../../topologies/Parent';

class OrganizationParent extends React.PureComponent {
  static type = [schema.Organization, argu.ns('Page')];

  static topology = parentTopology;

  render() {
    return null;
  }
}

export default register(OrganizationParent);
