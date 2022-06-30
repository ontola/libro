import * as schema from '@ontologies/schema';
import {
  FC,
  Property,
  PropertyProps,
  register,
} from 'link-redux';
import React from 'react';

import argu from '../../../../Argu/lib/argu';
import { LoadingHidden } from '../../../../Core/components/Loading';
import ontola from '../../../../Core/ontology/ontola';
import { tableRowTopology } from '../../../../Table/topologies/TableRow';

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
