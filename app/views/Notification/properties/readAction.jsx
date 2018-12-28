import LinkedRenderStore from 'link-lib';
import { linkedPropType } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import LRS, { NS } from '../../../helpers/LinkedRenderStore';
import { cardTopology } from '../../../topologies/Card';
import { cardFixedTopology } from '../../../topologies/Card/CardFixed';
import { cardMainTopology } from '../../../topologies/Card/CardMain';
import { containerTopology } from '../../../topologies/Container';
import { primaryResourceTopology } from '../../../topologies/PrimaryResource';
import { headerTopology } from '../../../topologies/Header';

const propTypes = {
  children: PropTypes.node,
  linkedProp: linkedPropType,
};

const ReadAction = ({ linkedProp, children }) => (
  <div
    data-test="Notification-ReadAction"
    onClick={() => LRS.exec(linkedProp)}
    onKeyUp={() => LRS.exec(linkedProp)}
  >
    {children}
  </div>
);

ReadAction.propTypes = propTypes;

export default LinkedRenderStore.registerRenderer(
  ReadAction,
  NS.argu('Notification'),
  NS.argu('readAction'),
  [
    cardFixedTopology,
    cardMainTopology,
    cardTopology,
    containerTopology,
    primaryResourceTopology,
    headerTopology,
  ]
);
