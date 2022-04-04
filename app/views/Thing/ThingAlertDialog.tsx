import * as schema from '@ontologies/schema';
import {
  FC,
  Resource,
  register,
} from 'link-redux';
import React from 'react';

import { alertDialogTopology, containerTopology } from '../../topologies';

const ThingAlertDialog: FC = (props) => (
  <Resource
    {...props}
    topology={containerTopology}
  />
);

ThingAlertDialog.type = schema.Thing;

ThingAlertDialog.topology = alertDialogTopology;

export default register(ThingAlertDialog);
