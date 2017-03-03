import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { getP } from 'link-lib';

const propTypes = {
  children: PropTypes.node,
};

const LDLink = ({ children }, { schemaObject }) => {
  const p = getP(schemaObject, '@id') || getP(schemaObject, 'href_url');
  const url = p && new URL(p);
  const href = url && [url.pathname, url.searchParams].join('?');
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
