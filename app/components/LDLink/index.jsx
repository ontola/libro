import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { lowLevel } from 'link-redux';

import { retrievePath } from '../../helpers/iris';

const propTypes = {
  children: PropTypes.node,
  subject: PropTypes.object,
};

const LDLink = ({ children, subject }) => {
  const href = retrievePath(subject.value);
  return (
    <Link to={href}>
      {children}
    </Link>
  );
};
LDLink.propTypes = propTypes;

export default lowLevel.linkedSubject(LDLink);
