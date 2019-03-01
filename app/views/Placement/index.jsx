import {
  lrsType,
  register,
  subjectType,
} from 'link-redux';
import React from 'react';

import MapView from '../../containers/MapView';
import { NS } from '../../helpers/LinkedRenderStore';
import { alertDialogTopology } from '../../topologies/Dialog';

import PlacementOmniformFields from './PlacementOmniformFields';

class PlacementAlertDialog extends React.PureComponent {
  static type = NS.argu('Placement');

  static topology = alertDialogTopology;

  static propTypes = {
    lrs: lrsType,
    subject: subjectType,
  };

  render() {
    const { lrs, subject } = this.props;

    return (
      <MapView
        lrs={lrs}
        placements={[subject]}
        subjectPlacement={subject}
      />
    );
  }
}

export default [
  PlacementOmniformFields,
  register(PlacementAlertDialog),
];
