import {
  register,
  LinkedResourceContainer,
  Property,
  subjectType,
} from 'link-redux';
import React from 'react';

import { allTopologies } from '../../topologies';
import { NS } from '../../helpers/LinkedRenderStore';

class PropertyQuery extends React.PureComponent {
  static type = NS.ontola('PropertyQuery');

  static topology = allTopologies;

  static mapDataToProps = [NS.sh('path'), NS.sh('targetNode')];

  static propTypes = {
    path: subjectType,
    targetNode: subjectType,
  };

  render() {
    const { path, targetNode } = this.props;

    return (
      <LinkedResourceContainer subject={targetNode}>
        <Property label={path} />
      </LinkedResourceContainer>
    );
  }
}

export default [
  register(PropertyQuery),
];
