import PropTypes from 'prop-types';
import { NamedNode } from 'rdflib';
import React from 'react';
import { subjectType, useLinkRenderContext } from 'link-redux';

import Link from '../Link';
import { handle } from '../../helpers/logging';

const LDLink = ({
  children,
  to,
  ...rest
}) => {
  const { subject } = useLinkRenderContext();

  if (!subject) {
    handle(new Error('LDLINK NO SUBJECT'));
    return '';
  }
  const href = to ? to.value : subject.value;

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
  target: PropTypes.oneOf([
    '_blank',
    '_self',
    '_parent',
    '_top',
    'modal',
  ]),
  title: PropTypes.string,
  /** Overrides the url */
  to: PropTypes.instanceOf(NamedNode),
};

export default LDLink;
