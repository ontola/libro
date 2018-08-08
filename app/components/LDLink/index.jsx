import PropTypes from 'prop-types';
import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import RouterTypes from 'react-router-prop-types';
import { subjectType, withLinkCtx } from 'link-redux';

import { retrievePath } from '../../helpers/iris';

import './LDLink.scss';

const propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  location: RouterTypes.location.isRequired,
  subject: subjectType,
  theme: PropTypes.oneOf([
    'default',
    'parent',
  ]),
  title: PropTypes.string,
};

const defaultProps = {
  theme: 'default',
};

const LDLink = ({
  className,
  children,
  location,
  subject,
  theme,
  title,
}) => {
  if (!subject) return 'LDLINK NO SUBJECT';

  const href = retrievePath(subject.value);
  const active = (location.pathname + location.hash === href);

  return (
    <Link
      className={`${className || `LDLink__${theme}`} ${active ? 'LDLink__active' : ''}`}
      title={title}
      to={href}
    >
      {children}
    </Link>
  );
};

LDLink.defaultProps = defaultProps;
LDLink.propTypes = propTypes;

export default withLinkCtx(withRouter(LDLink));
