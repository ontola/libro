import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router';
import { lowLevel, subjectType } from 'link-redux';

import { retrievePath } from '../../helpers/iris';

const propTypes = {
  children: PropTypes.node,
  subject: subjectType,
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
