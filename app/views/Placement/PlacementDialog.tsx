import { register } from 'link-redux';
import { SubjectProp } from 'link-redux/dist-types/types';
import React from 'react';

import MapView from '../../containers/MapView';
import argu from '../../ontology/argu';
import { alertDialogTopology } from '../../topologies/Dialog';

const PlacementAlertDialog = ({ subject }: SubjectProp): JSX.Element => (
  <MapView
    placements={[subject]}
  />
);

PlacementAlertDialog.type = argu.Placement;

PlacementAlertDialog.topology = alertDialogTopology;

export default register(PlacementAlertDialog);
