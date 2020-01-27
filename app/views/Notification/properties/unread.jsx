import LinkedRenderStore from 'link-lib';
import {
  Property,
  linkedPropType,
} from 'link-redux';
import React from 'react';

import argu from '../../../ontology/argu';
import ontola from '../../../ontology/ontola';
import { cardTopology } from '../../../topologies/Card';
import { cardFixedTopology } from '../../../topologies/Card/CardFixed';
import { cardMainTopology } from '../../../topologies/Card/CardMain';
import { containerTopology } from '../../../topologies/Container';
import { navbarTopology } from '../../../topologies/Navbar';
import { fullResourceTopology } from '../../../topologies/FullResource';

const propTypes = {
  linkedProp: linkedPropType,
};

const Unread = ({ linkedProp }) => {
  // eslint-disable-next-line eqeqeq
  if (linkedProp == undefined || linkedProp == false || linkedProp.value === 'false') {
    return null;
  }

  return (
    <Property
      forceRender
      label={ontola.readAction}
    />
  );
};

Unread.propTypes = propTypes;

export default LinkedRenderStore.registerRenderer(
  Unread,
  argu.Notification,
  argu.unread,
  [
    cardFixedTopology,
    cardMainTopology,
    cardTopology,
    containerTopology,
    navbarTopology,
    fullResourceTopology,
  ]
);
