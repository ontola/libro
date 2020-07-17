import {
  register,
  subjectType,
} from 'link-redux';
import React from 'react';

import MapView from '../../containers/MapView';
import argu from '../../ontology/argu';
import { alertDialogTopology } from '../../topologies/Dialog';

class PlacementAlertDialog extends React.PureComponent {
  static type = argu.Placement;

  static topology = alertDialogTopology;

  static propTypes = {
    subject: subjectType,
  };

  render() {
    const { subject } = this.props;

    return (
      <MapView
        placements={[subject]}
      />
    );
  }
}

export default [
  register(PlacementAlertDialog),
];
