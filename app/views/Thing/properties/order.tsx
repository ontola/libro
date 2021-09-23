import * as schema from '@ontologies/schema';
import {
  FC,
  Property,
  PropertyProps,
  register,
} from 'link-redux';
import React from 'react';

import argu from '../../../ontology/argu';
import ontola from '../../../ontology/ontola';
import { tableRowTopology } from '../../../topologies/TableRow';

const Order: FC<PropertyProps> = ({
  linkedProp,
}) => (
  <React.Fragment>
    <Property
      label={ontola.moveUpAction}
      onLoad={() => null}
    />
    {linkedProp.value}
    <Property
      label={ontola.moveDownAction}
      onLoad={() => null}
    />
  </React.Fragment>
);

Order.type = schema.Thing;

Order.topology = tableRowTopology;

Order.property = argu.order;

export default register(Order);
