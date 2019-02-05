import LinkedRenderStore from 'link-lib';
import { LinkedResourceContainer, linkedPropType } from 'link-redux';
import React from 'react';

import { NS } from '../../../helpers/LinkedRenderStore';
import { detailsBarTopology } from '../../../topologies/DetailsBar';
import { navbarTopology } from '../../../topologies/Navbar';
import { voteBubbleTopology } from '../../../topologies/VoteBubble';

const propTypes = {
  linkedProp: linkedPropType,
};

const PersonImageProp = ({ linkedProp }) => (
  <LinkedResourceContainer
    subject={linkedProp}
    topology={voteBubbleTopology}
  />
);

PersonImageProp.propTypes = propTypes;

export default [
  LinkedRenderStore.registerRenderer(
    PersonImageProp,
    [NS.schema('Person'), NS.aod('Persons')],
    [NS.schema('image'), NS.dbo('thumbnail'), NS.wdt('P18')],
    [detailsBarTopology, voteBubbleTopology]
  ),
  LinkedRenderStore.registerRenderer(
    ({ linkedProp }) => (
      <LinkedResourceContainer subject={linkedProp} />
    ),
    [NS.schema('Person'), NS.aod('Persons')],
    [NS.schema('image'), NS.dbo('thumbnail'), NS.wdt('P18')],
    navbarTopology
  ),
];
