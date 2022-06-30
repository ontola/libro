import { Property, register } from 'link-redux';
import React from 'react';

import org from '../../../../ontology/org';
import { containerTopology } from '../../../Common/topologies/Container';
import argu from '../../lib/argu';

const PermissionGroupContainer = () => (
  <React.Fragment>
    <Property label={org.organization} />
  </React.Fragment>
);

PermissionGroupContainer.type = argu.GrantTreeGroup;

PermissionGroupContainer.topology = containerTopology;

export default register(PermissionGroupContainer);
