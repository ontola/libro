import { namedNodeShape } from '@ontola/mash';
import PropTypes from 'prop-types';
import React from 'react';
import {
  subjectType,
  useLRS,
  useLinkRenderContext,
} from 'link-redux';

import Link from '../Link';
import { handle } from '../../helpers/logging';
import { NS } from '../../helpers/LinkedRenderStore';

const LDLink = ({
  children,
  to,
  ...rest
}) => {
  const lrs = useLRS();
  const { subject } = useLinkRenderContext();

  if (!subject) {
    handle(new Error('LDLINK NO SUBJECT'));

    return '';
  }
  const href = to?.value
    || lrs.getResourceProperty(subject, NS.schema('url'))?.value
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
  to: namedNodeShape,
};

export default LDLink;
