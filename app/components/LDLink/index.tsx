import { NamedNode } from '@ontologies/core';
import schema from '@ontologies/schema';
import { SomeNode } from 'link-lib';
import {
  ReturnType,
  useLinkRenderContext,
  useProperty,
} from 'link-redux';
import React from 'react';

import { handle } from '../../helpers/logging';
import Link from '../Link';

interface PropTypes {
  children?: React.ReactNode;
  className?: string;
  location?: string;
  onClick?: (e: any) => any;
  subject?: SomeNode;
  target?: '_blank' | '_self' | '_parent' | '_top' | 'modal';
  title?: string;
  to?: NamedNode;
}

const LDLink = ({
  children,
  to,
  ...rest
}: PropTypes) => {
  const { subject } = useLinkRenderContext();
  const url = useProperty(schema.url, { returnType: ReturnType.Value });

  if (!subject) {
    handle(new Error('LDLINK NO SUBJECT'));

    return <div />;
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

export default LDLink;
