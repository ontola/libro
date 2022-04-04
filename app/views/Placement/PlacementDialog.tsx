import { register } from 'link-redux';
import { SubjectProp } from 'link-redux/dist-types/types';
import React from 'react';

import MapView from '../../modules/MapView/components/MapView';
import argu from '../../ontology/argu';
import { alertDialogTopology } from '../../topologies';

const PlacementAlertDialog = ({ subject }: SubjectProp): JSX.Element => {
  const placements = React.useMemo(() => [subject], [subject]);

  return (
    <MapView placements={placements} />
  );
};

PlacementAlertDialog.type = argu.Placement;

PlacementAlertDialog.topology = alertDialogTopology;

export default register(PlacementAlertDialog);
