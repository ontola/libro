import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { anyObjectValue, getP } from 'link-lib';

import { retrievePath } from '../../helpers/iris';

const propTypes = {
  children: PropTypes.node,
};

const LDLink = ({ children }, { schemaObject }) => {
  const p = anyObjectValue(schemaObject, 'http://www.w3.org/1999/02/22-rdf-syntax-ns#subject') || getP(schemaObject, 'href_url');
  const href = retrievePath(p);
  return (
    <Link to={href}>
      {children}
    </Link>
  );
};

LDLink.contextTypes = {
  schemaObject: PropTypes.object,
};
LDLink.propTypes = propTypes;

export default LDLink;
