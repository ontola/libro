import { linkedPropType, register } from 'link-redux';
import React from 'react';

import Detail from '../../../components/Detail';
import { NS } from '../../../helpers/LinkedRenderStore';
import { detailsBarTopology } from '../../../topologies/DetailsBar';

const propTypes = {
  linkedProp: linkedPropType,
};

class MotionsCount extends React.PureComponent {
  static type = NS.schema('Thing');

  static property = NS.argu('motionsCount');

  static topology = detailsBarTopology;

  static propTypes = propTypes;

  render() {
    const { linkedProp } = this.props;

    if (linkedProp.value === '0') {
      return null;
    }

    return (
      <Detail
        icon="lightbulb-o"
        text={linkedProp.value}
        title={`${linkedProp.value} ideeën`}
      />
    );
  }
}

export default register(MotionsCount);
