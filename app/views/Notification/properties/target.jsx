import LinkedRenderStore from 'link-lib';
import { linkedPropType } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

import { NS } from '../../../helpers/LinkedRenderStore';
import { retrievePath } from '../../../helpers/iris';
import { cardTopology } from '../../../topologies/Card';
import { cardFixedTopology } from '../../../topologies/Card/CardFixed';
import { cardMainTopology } from '../../../topologies/Card/CardMain';
import { containerTopology } from '../../../topologies/Container';
import { navbarTopology } from '../../../topologies/Navbar';
import { primaryResourceTopology } from '../../../topologies/PrimaryResource';

const propTypes = {
  children: PropTypes.node,
  linkedProp: linkedPropType,
};

const Target = ({ children = null, linkedProp }) => (
  <Link style={{ display: 'flex', flexGrow: 1, paddingTop: '.5em' }} to={retrievePath(linkedProp.value)}>
    {children}
  </Link>
);

Target.propTypes = propTypes;

export default LinkedRenderStore.registerRenderer(
  Target,
  NS.argu('Notification'),
  NS.schema('target'),
  [
    cardFixedTopology,
    cardMainTopology,
    cardTopology,
    containerTopology,
    navbarTopology,
    primaryResourceTopology,
  ]
);
