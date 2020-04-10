import RDFTypes from '@rdfdev/prop-types';
import schema from '@ontologies/schema';
import PropTypes from 'prop-types';
import React from 'react';
import {
  ReturnType,
  subjectType,
  useLinkRenderContext,
  useProperty,
} from 'link-redux';

import Link from '../Link';
import { handle } from '../../helpers/logging';

const LDLink = ({
  children,
  to,
  ...rest
}) => {
  const { subject } = useLinkRenderContext();
  const url = useProperty(schema.url, { returnType: ReturnType.Value });

  if (!subject) {
    handle(new Error('LDLINK NO SUBJECT'));

    return '';
  }
  const href = to?.value
    || url
    || subject.value;

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
  to: RDFTypes.namedNode,
};

export default LDLink;
