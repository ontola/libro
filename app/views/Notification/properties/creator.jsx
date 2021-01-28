import * as schema from '@ontologies/schema';
import LinkedRenderStore from 'link-lib';
import {
  Property,
  Resource,
  linkedPropType,
} from 'link-redux';
import React from 'react';

import argu from '../../../ontology/argu';
import { cardTopology } from '../../../topologies/Card';
import { cardMainTopology } from '../../../topologies/Card/CardMain';
import { containerTopology } from '../../../topologies/Container';
import { detailsBarTopology } from '../../../topologies/DetailsBar';
import { navbarTopology } from '../../../topologies/Navbar';
import { fullResourceTopology } from '../../../topologies/FullResource';

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
  argu.Notification,
  schema.creator,
  [
    fullResourceTopology,
    cardTopology,
    cardMainTopology,
    containerTopology,
    detailsBarTopology,
    navbarTopology,
  ]
);
