import * as schema from '@ontologies/schema';
import {
  Type,
  register,
  useProperty, 
} from 'link-redux';
import { PropTypes } from 'link-redux/dist-types/components/Type';
import React from 'react';

import { containerTopology } from '../../topologies/Container';
import Card from '../../topologies/Card';

const EntryPointContainer = (props: PropTypes) => {
  const [name] = useProperty(schema.name);
  const typeProps = {
    ...props,
    name,
  };

  return(
    <Card>
      <Type {...typeProps} />
    </Card>
  );
};

EntryPointContainer.type = schema.EntryPoint;

EntryPointContainer.topology = containerTopology;

export default register(EntryPointContainer);
