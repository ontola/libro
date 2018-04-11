import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import { lowLevel, subjectType } from 'link-redux';

import { retrievePath } from '../../helpers/iris';

import './LDLink.scss';

const propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  subject: subjectType,
  theme: PropTypes.oneOf(['parent']),
};

const LDLink = ({
  className,
  children,
  subject,
  theme,
}) => {
  const href = retrievePath(subject.value);
  return (
    <Link
      className={`${className || (theme === 'parent' ? 'LDLink__parent' : '')}`}
      to={href}
    >
      {children}
    </Link>
  );
};
LDLink.propTypes = propTypes;

export default lowLevel.linkedSubject(LDLink);
