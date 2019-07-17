import { register } from 'link-redux';
import React from 'react';

import { NS } from '../../helpers/LinkedRenderStore';
import { parentTopology } from '../../topologies/Parent';

class OrganizationParent extends React.PureComponent {
  static type = [NS.schema('Organization'), NS.argu('Page')];

  static topology = parentTopology;

  render() {
    return null;
  }
}

export default register(OrganizationParent);
