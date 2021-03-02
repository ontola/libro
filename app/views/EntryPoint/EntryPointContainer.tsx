import * as schema from '@ontologies/schema';
import { Type, register } from 'link-redux';
import { PropTypes } from 'link-redux/dist-types/components/Type';
import React from 'react';

import { containerTopology } from '../../topologies/Container';
import Card from '../../topologies/Card';

const EntryPointContainer = (props: PropTypes) => (
  <Card>
    <Type {...props} />
  </Card>
);

EntryPointContainer.type = schema.EntryPoint;

EntryPointContainer.topology = containerTopology;

EntryPointContainer.mapDataToProps = {
  name: schema.name,
};

export default register(EntryPointContainer);
