import LinkedRenderStore from 'link-lib';
import { linkedPropType } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

import { NS } from '../../../helpers/LinkedRenderStore';
import { retrievePath } from '../../../helpers/iris';

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
    undefined,
    NS.argu('container'),
    NS.argu('sidebar'),
    NS.argu('card'),
    NS.argu('cardFixed'),
    NS.argu('cardMain'),
  ]
);
