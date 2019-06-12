import LinkedRenderStore from 'link-lib';
import {
  Property,
  linkedPropType,
} from 'link-redux';
import React from 'react';

import { NS } from '../../../helpers/LinkedRenderStore';
import { cardTopology } from '../../../topologies/Card';
import { cardFixedTopology } from '../../../topologies/Card/CardFixed';
import { cardMainTopology } from '../../../topologies/Card/CardMain';
import { containerTopology } from '../../../topologies/Container';
import { navbarTopology } from '../../../topologies/Navbar';
import { primaryResourceTopology } from '../../../topologies/PrimaryResource';

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
      label={NS.ontola('readAction')}
    />
  );
};

Unread.propTypes = propTypes;

export default LinkedRenderStore.registerRenderer(
  Unread,
  NS.argu('Notification'),
  NS.argu('unread'),
  [
    cardFixedTopology,
    cardMainTopology,
    cardTopology,
    containerTopology,
    navbarTopology,
    primaryResourceTopology,
  ]
);
