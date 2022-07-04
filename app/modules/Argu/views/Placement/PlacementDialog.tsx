import { register } from 'link-redux';
import { SubjectProp } from 'link-redux/dist-types/types';
import React from 'react';

import { alertDialogTopology } from '../../../Common/topologies/Dialog';
import PlacementsMap from '../../../Map/components/PlacementsMap';
import argu from '../../ontology/argu';

const PlacementAlertDialog = ({ subject }: SubjectProp): JSX.Element => {
  const placements = React.useMemo(() => [subject], [subject]);

  return (
    <PlacementsMap placements={placements} />
  );
};

PlacementAlertDialog.type = argu.Placement;

PlacementAlertDialog.topology = alertDialogTopology;

export default register(PlacementAlertDialog);
