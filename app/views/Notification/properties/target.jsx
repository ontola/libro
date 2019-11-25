import schema from '@ontologies/schema';
import LinkedRenderStore from 'link-lib';
import { linkedPropType } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { Link } from '../../../components';
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
  onClick: PropTypes.func,
};

const Target = ({
  children = null,
  linkedProp,
  onClick,
}) => (
  <Link
    style={{
      display: 'flex',
      flexGrow: 1,
      paddingTop: '.5em',
    }}
    to={retrievePath(linkedProp.value)}
    onClick={onClick}
  >
    {children}
  </Link>
);

Target.propTypes = propTypes;

export default LinkedRenderStore.registerRenderer(
  Target,
  NS.argu('Notification'),
  schema.target,
  [
    cardFixedTopology,
    cardMainTopology,
    cardTopology,
    containerTopology,
    navbarTopology,
    primaryResourceTopology,
  ]
);
