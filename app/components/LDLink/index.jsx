import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import { subjectType, withLinkCtx } from 'link-redux';

import { retrievePath } from '../../helpers/iris';

import './LDLink.scss';

const propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  subject: subjectType,
  theme: PropTypes.oneOf([
    'default',
    'parent',
  ]),
};
const defaultProps = {
  theme: 'default',
};

const LDLink = ({
  className,
  children,
  subject,
  theme,
}) => {
  if (!subject) return 'LDLINK NO SUBJECT';

  const href = retrievePath(subject.value);
  return (
    <Link
      className={`${className || `LDLink__${theme}`}`}
      to={href}
    >
      {children}
    </Link>
  );
};

LDLink.defaultProps = defaultProps;
LDLink.propTypes = propTypes;

export default withLinkCtx(LDLink);
