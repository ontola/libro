import * as schema from '@ontologies/schema';
import {
  FC,
  Resource,
  register,
} from 'link-redux';
import React from 'react';

import { containerTopology } from '../../topologies/Container';
import { alertDialogTopology } from '../../topologies/Dialog';

const ThingAlertDialog: FC = (props) => (
  <Resource
    {...props}
    topology={containerTopology}
  />
);

ThingAlertDialog.type = schema.Thing;

ThingAlertDialog.topology = alertDialogTopology;

export default register(ThingAlertDialog);
