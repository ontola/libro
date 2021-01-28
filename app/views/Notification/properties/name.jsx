import * as schema from '@ontologies/schema';
import LinkedRenderStore from 'link-lib';
import { linkedPropType } from 'link-redux';
import React from 'react';

import Heading from '../../../components/Heading';
import argu from '../../../ontology/argu';
import { cardTopology } from '../../../topologies/Card';
import { cardFixedTopology } from '../../../topologies/Card/CardFixed';
import { cardMainTopology } from '../../../topologies/Card/CardMain';
import { containerTopology } from '../../../topologies/Container';
import { fullResourceTopology } from '../../../topologies/FullResource';

const propTypes = {
  linkedProp: linkedPropType,
};

const Creator = ({ linkedProp }) => (
  <Heading size="3">{linkedProp.value}</Heading>
);

Creator.propTypes = propTypes;

export default LinkedRenderStore.registerRenderer(
  Creator,
  argu.Notification,
  schema.name,
  [
    fullResourceTopology,
    cardFixedTopology,
    cardMainTopology,
    cardTopology,
    containerTopology,
  ]
);
