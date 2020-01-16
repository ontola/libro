import schema from '@ontologies/schema';
import { linkedPropType, register } from 'link-redux';
import React from 'react';

import Detail from '../../../components/Detail';
import argu from '../../../ontology/argu';
import { detailsBarTopology } from '../../../topologies/DetailsBar';

const propTypes = {
  linkedProp: linkedPropType,
};

class FollowsCount extends React.PureComponent {
  static type = schema.Thing;

  static property = argu.followsCount;

  static topology = detailsBarTopology;

  static propTypes = propTypes;

  render() {
    const { linkedProp } = this.props;

    if (linkedProp.value === '0') {
      return null;
    }

    return (
      <Detail
        icon="user-o"
        text={linkedProp.value}
        title={`${linkedProp.value} volgers`}
      />
    );
  }
}

export default register(FollowsCount);
