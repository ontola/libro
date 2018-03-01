import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import { lowLevel, subjectType } from 'link-redux';

import { retrievePath } from '../../helpers/iris';

const propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  subject: subjectType,
};

const LDLink = ({ className, children, subject }) => {
  const href = retrievePath(subject.value);
  return (
    <Link
      className={className}
      to={href}
    >
      {children}
    </Link>
  );
};
LDLink.propTypes = propTypes;

export default lowLevel.linkedSubject(LDLink);
