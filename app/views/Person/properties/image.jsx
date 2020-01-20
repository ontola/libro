import schema from '@ontologies/schema';
import LinkedRenderStore from 'link-lib';
import { Resource, linkedPropType } from 'link-redux';
import React from 'react';

import { NS } from '../../../helpers/LinkedRenderStore';
import { detailsBarTopology } from '../../../topologies/DetailsBar';
import { navbarTopology } from '../../../topologies/Navbar';
import { voteBubbleTopology } from '../../../topologies/VoteBubble';

const propTypes = {
  linkedProp: linkedPropType,
};

const PersonImageProp = ({ linkedProp }) => (
  <Resource
    subject={linkedProp}
    topology={voteBubbleTopology}
  />
);

PersonImageProp.propTypes = propTypes;

export default [
  LinkedRenderStore.registerRenderer(
    PersonImageProp,
    [schema.Person],
    [schema.image, NS.dbo('thumbnail'), NS.wdt('P18')],
    [detailsBarTopology, voteBubbleTopology]
  ),
  LinkedRenderStore.registerRenderer(
    ({ linkedProp }) => (
      <Resource subject={linkedProp} />
    ),
    [schema.Person],
    [schema.image, NS.dbo('thumbnail'), NS.wdt('P18')],
    navbarTopology
  ),
];
