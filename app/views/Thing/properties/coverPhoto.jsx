import LinkedRenderStore from 'link-lib';
import { linkedPropType, LinkedResourceContainer } from 'link-redux';
import React from 'react';

import { NS } from '../../../helpers/LinkedRenderStore';
import { LDLink } from '../../../components';
import { cardTopology } from '../../../topologies/Card';
import { cardFixedTopology } from '../../../topologies/Card/CardFixed';

const propTypes = {
  linkedProp: linkedPropType,
};

const ClickableCover = ({ linkedProp }) => (
  <LDLink>
    <LinkedResourceContainer subject={linkedProp} />
  </LDLink>
);

ClickableCover.propTypes = propTypes;

export default LinkedRenderStore.registerRenderer(
  ClickableCover,
  NS.schema('Thing'),
  NS.argu('coverPhoto'),
  [
    cardTopology,
    cardFixedTopology,
  ]
);
