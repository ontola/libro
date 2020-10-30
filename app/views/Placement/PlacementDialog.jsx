import {
  register,
  subjectType,
} from 'link-redux';
import React from 'react';

import MapView from '../../containers/MapView';
import argu from '../../ontology/argu';
import { alertDialogTopology } from '../../topologies/Dialog';

const PlacementAlertDialog = ({ subject }) => (
  <MapView
    placements={[subject]}
  />
);

PlacementAlertDialog.type = argu.Placement;

PlacementAlertDialog.topology = alertDialogTopology;

PlacementAlertDialog.propTypes = {
  subject: subjectType,
};

export default register(PlacementAlertDialog);
