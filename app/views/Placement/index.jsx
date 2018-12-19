import {
  lrsType,
  register, subjectType,
} from 'link-redux';
import React from 'react';

import Spinner from '../../components/Spinner';
import { NS } from '../../helpers/LinkedRenderStore';
import { alertDialogTopology } from '../../topologies/Dialog';

// eslint-disable-next-line no-inline-comments
const MapView = React.lazy(() => import(/* webpackChunkName: 'MapView' */ '../../async/MapView/index'));

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
      <React.Suspense fallback={<Spinner loading />}>
        <MapView
          lrs={lrs}
          placements={[subject]}
          subjectPlacement={subject}
        />
      </React.Suspense>
    );
  }
}

export default register(PlacementAlertDialog);
