import { linkedPropType, register } from 'link-redux';
import React from 'react';

import Detail from '../../../components/Detail';
import { NS } from '../../../helpers/LinkedRenderStore';
import { detailsBarTopology } from '../../../topologies/DetailsBar';

const propTypes = {
  linkedProp: linkedPropType,
};

class PinnedAt extends React.PureComponent {
  static type = NS.schema('Thing');

  static property = NS.argu('pinnedAt');

  static topology = detailsBarTopology;

  static propTypes = propTypes;

  render() {
    const { linkedProp } = this.props;

    return (
      <Detail
        icon="map-pin"
        title={`Vastgezet op ${new Date(linkedProp.value).toLocaleString()}`}
      />
    );
  }
}

export default register(PinnedAt);
