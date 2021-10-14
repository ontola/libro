import * as schema from '@ontologies/schema';
import LinkedRenderStore from 'link-lib';
import { PropertyProps, Resource } from 'link-redux';
import React from 'react';

import dbo from '../../../ontology/dbo';
import wdt from '../../../ontology/wdt';
import { detailsBarTopology } from '../../../topologies/DetailsBar';
import { navbarTopology } from '../../../topologies/Navbar';
import { voteBubbleTopology } from '../../../topologies/VoteBubble';

const PersonImageProp = ({ linkedProp }: PropertyProps) => (
  <Resource
    subject={linkedProp}
    topology={voteBubbleTopology}
  />
);

export default [
  ...LinkedRenderStore.registerRenderer(
    PersonImageProp,
    [schema.Person],
    [schema.image, dbo.thumbnail, wdt.ns('P18')],
    [detailsBarTopology, voteBubbleTopology],
  ),
  ...LinkedRenderStore.registerRenderer(
    ({ linkedProp }: PropertyProps) => (
      <Resource subject={linkedProp} />
    ),
    [schema.Person],
    [schema.image, dbo.thumbnail, wdt.ns('P18')],
    navbarTopology,
  ),
];
