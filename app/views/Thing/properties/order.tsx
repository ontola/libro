import * as schema from '@ontologies/schema';
import {
  FC,
  Property,
  PropertyProps,
  register,
} from 'link-redux';
import React from 'react';

import { LoadingHidden } from '../../../components/Loading';
import argu from '../../../ontology/argu';
import ontola from '../../../ontology/ontola';
import { tableRowTopology } from '../../../topologies';

const Order: FC<PropertyProps> = () => (
  <React.Fragment>
    <Property
      label={ontola.moveUpAction}
      onLoad={LoadingHidden}
    />
    <br />
    <Property
      label={ontola.moveDownAction}
      onLoad={LoadingHidden}
    />
  </React.Fragment>
);

Order.type = schema.Thing;

Order.topology = tableRowTopology;

Order.property = argu.order;

export default register(Order);
