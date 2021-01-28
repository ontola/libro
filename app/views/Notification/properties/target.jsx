import * as schema from '@ontologies/schema';
import LinkedRenderStore from 'link-lib';
import { linkedPropType } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import Link from '../../../components/Link';
import { retrievePath } from '../../../helpers/iris';
import argu from '../../../ontology/argu';
import { cardTopology } from '../../../topologies/Card';
import { cardFixedTopology } from '../../../topologies/Card/CardFixed';
import { cardMainTopology } from '../../../topologies/Card/CardMain';
import { containerTopology } from '../../../topologies/Container';
import { navbarTopology } from '../../../topologies/Navbar';
import { fullResourceTopology } from '../../../topologies/FullResource';

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
  argu.Notification,
  schema.target,
  [
    cardFixedTopology,
    cardMainTopology,
    cardTopology,
    containerTopology,
    navbarTopology,
    fullResourceTopology,
  ]
);
