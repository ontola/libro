import LinkedRenderStore from 'link-lib';
import { linkedPropType } from 'link-redux';
import React from 'react';

import { Heading } from '../../../components';
import { NS } from '../../../helpers/LinkedRenderStore';
import { cardTopology } from '../../../topologies/Card';
import { cardFixedTopology } from '../../../topologies/Card/CardFixed';
import { cardMainTopology } from '../../../topologies/Card/CardMain';
import { containerTopology } from '../../../topologies/Container';
import { primaryResourceTopology } from '../../../topologies/PrimaryResource';

const propTypes = {
  linkedProp: linkedPropType,
};

const Creator = ({ linkedProp }) => (
  <Heading size="3">{linkedProp.value}</Heading>
);

Creator.propTypes = propTypes;

export default LinkedRenderStore.registerRenderer(
  Creator,
  NS.argu('Notification'),
  NS.schema('name'),
  [
    primaryResourceTopology,
    cardFixedTopology,
    cardMainTopology,
    cardTopology,
    containerTopology,
  ]
);
