import PropTypes from 'prop-types';
import { NamedNode } from 'rdflib';
import React from 'react';
import { subjectType, useLinkContext } from 'link-redux';

import Link from '../Link';
import { retrievePath } from '../../helpers/iris';
import { handle } from '../../helpers/logging';

const LDLink = ({
  children,
  to,
  ...rest
}) => {
  const { subject } = useLinkContext();

  if (!subject) {
    handle(new Error('LDLINK NO SUBJECT'));
    return '';
  }
  const href = retrievePath(to ? to.value : subject.value);

  return (
    <Link
      to={href}
      {...rest}
    >
      {children}
    </Link>
  );
};

LDLink.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  location: PropTypes.string,
  onClick: PropTypes.func,
  subject: subjectType,
  title: PropTypes.string,
  /** Overrides the url */
  to: PropTypes.instanceOf(NamedNode),
};

export default LDLink;
