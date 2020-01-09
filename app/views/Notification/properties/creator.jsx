import schema from '@ontologies/schema';
import LinkedRenderStore from 'link-lib';
import {
  Property,
  Resource,
  linkedPropType,
} from 'link-redux';
import React from 'react';

import { NS } from '../../../helpers/LinkedRenderStore';
import { cardTopology } from '../../../topologies/Card';
import { cardMainTopology } from '../../../topologies/Card/CardMain';
import { containerTopology } from '../../../topologies/Container';
import { detailsBarTopology } from '../../../topologies/DetailsBar';
import { navbarTopology } from '../../../topologies/Navbar';
import { primaryResourceTopology } from '../../../topologies/PrimaryResource';

const propTypes = {
  linkedProp: linkedPropType,
};

const Creator = ({ linkedProp }) => (
  <Resource subject={linkedProp} topology={detailsBarTopology}>
    <Property label={schema.image} />
  </Resource>
);

Creator.propTypes = propTypes;

export default LinkedRenderStore.registerRenderer(
  Creator,
  NS.argu('Notification'),
  schema.creator,
  [
    primaryResourceTopology,
    cardTopology,
    cardMainTopology,
    containerTopology,
    detailsBarTopology,
    navbarTopology,
  ]
);
