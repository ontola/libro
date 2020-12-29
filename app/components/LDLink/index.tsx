import { NamedNode } from '@ontologies/core';
import schema from '@ontologies/schema';
import { SomeNode } from 'link-lib';
import {
  ReturnType,
  useLinkRenderContext,
  useProperty,
} from 'link-redux';
import React, { EventHandler } from 'react';

import { handle } from '../../helpers/logging';
import Link, { LinkTarget } from '../Link';

interface PropTypes {
  children?: React.ReactNode;
  className?: string;
  location?: string;
  onClick?: EventHandler<any>;
  subject?: SomeNode;
  target?: LinkTarget;
  title?: string;
  to?: NamedNode;
}

const LDLink: React.FC<PropTypes> = ({
  children,
  to,
  ...rest
}) => {
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
