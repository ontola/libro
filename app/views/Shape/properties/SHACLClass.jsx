import LinkedRenderStore from 'link-lib';
import {
  LinkedResourceContainer,
  PropertyBase,
} from 'link-redux';
import React from 'react';

import { NS } from '../../../helpers/LinkedRenderStore';
import { allTopologies } from '../../../topologies';

class SHACLClass extends PropertyBase {
  render() {
    const targetShape = this.props.lrs.store.anyStatementMatching(
      null,
      NS.sh('targetClass'),
      this.props.linkedProp,
      null
    );

    if (!targetShape) {
      // TODO: bugsnag
      return null;
    }

    return (
      <LinkedResourceContainer subject={targetShape.subject} />
    );
  }
}

export default LinkedRenderStore.registerRenderer(
  SHACLClass,
  NS.sh('PropertyShape'),
  NS.sh('class'),
  allTopologies
);
