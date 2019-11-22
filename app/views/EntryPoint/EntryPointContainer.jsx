import { Type, register } from 'link-redux';
import React from 'react';

import { NS } from '../../helpers/LinkedRenderStore';
import { containerTopology } from '../../topologies/Container';
import Card from '../../topologies/Card';

const EntryPointContainer = props => (
  <Card>
    <Type {...props} />
  </Card>
);

EntryPointContainer.type = NS.schema('EntryPoint');

EntryPointContainer.topology = containerTopology;

EntryPointContainer.mapDataToProps = {
  name: NS.schema('name'),
};

export default register(EntryPointContainer);
