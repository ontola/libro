import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { getP } from 'link-lib';

const propTypes = {
  children: PropTypes.node,
};

const LDLink = ({ children }, { schemaObject }) => {
  const p = getP(schemaObject, '@id');
  const url = p && new URL(p).pathname;
  return (
    <Link to={url}>
      {children}
    </Link>
  );
};

LDLink.contextTypes = {
  schemaObject: PropTypes.object,
};
LDLink.propTypes = propTypes;

export default LDLink;
