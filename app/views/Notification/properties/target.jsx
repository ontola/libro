import { linkedPropType } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

import LinkedRenderStore, { NS } from '../../../helpers/LinkedRenderStore';
import { retrievePath } from '../../../helpers/iris';

const propTypes = {
  children: PropTypes.node,
  linkedProp: linkedPropType,
};

const Target = ({ children = null, linkedProp }) => (
  <Link style={{ display: 'flex', paddingTop: '.5em' }} to={retrievePath(linkedProp)}>
    {children}
  </Link>
);

Target.propTypes = propTypes;

[undefined, NS.argu('collection'), NS.argu('sidebar')].forEach((top) => {
  LinkedRenderStore.registerRenderer(
    Target,
    NS.argu('Notification'),
    NS.schema('target'),
    top
  );
});

export default URL;
