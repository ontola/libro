import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { anyObjectValue, defaultNS, getP } from 'link-lib';

import { retrievePath } from '../../helpers/iris';

const propTypes = {
  children: PropTypes.node,
};

const LDLink = ({ children }, { schemaObject }) => {
  const p = anyObjectValue(schemaObject, defaultNS.rdf('subject')) || getP(schemaObject, 'href_url');
  const href = retrievePath(p.value || p);
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
