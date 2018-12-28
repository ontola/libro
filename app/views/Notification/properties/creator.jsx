import LinkedRenderStore from 'link-lib';
import {
  linkedPropType,
  LinkedResourceContainer,
  Property,
} from 'link-redux';
import React from 'react';

import { NS } from '../../../helpers/LinkedRenderStore';
import { cardTopology } from '../../../topologies/Card';
import { cardMainTopology } from '../../../topologies/Card/CardMain';
import { containerTopology } from '../../../topologies/Container';
import { detailsBarTopology } from '../../../topologies/DetailsBar';
import { primaryResourceTopology } from '../../../topologies/PrimaryResource';
import { headerTopology } from '../../../topologies/Header';

const propTypes = {
  linkedProp: linkedPropType,
};

const Creator = ({ linkedProp }) => (
  <LinkedResourceContainer subject={linkedProp} topology={detailsBarTopology}>
    <Property label={NS.schema('image')} />
  </LinkedResourceContainer>
);

Creator.propTypes = propTypes;

export default LinkedRenderStore.registerRenderer(
  Creator,
  NS.argu('Notification'),
  NS.schema('creator'),
  [
    primaryResourceTopology,
    cardTopology,
    cardMainTopology,
    containerTopology,
    detailsBarTopology,
    headerTopology,
  ]
);
