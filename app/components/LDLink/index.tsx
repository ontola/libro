import * as schema from '@ontologies/schema';
import {
  ReturnType,
  useLinkRenderContext,
  useProperty,
} from 'link-redux';
import React from 'react';

import { handle } from '../../helpers/logging';
import Link, { LinkPropTypes } from '../Link';

export interface LDLinkProps extends Omit<LinkPropTypes, 'to'> {
  to?: string;
}

const LDLink: React.FC<LDLinkProps> = (props) => {
  const { subject } = useLinkRenderContext();
  const url = useProperty(schema.url, { returnType: ReturnType.Value });

  if (!subject) {
    handle(new Error('LDLINK NO SUBJECT'));

    return <div />;
  }
  const to = url || subject.value;

  return (
    <Link
      to={to}
      {...props}
    />
  );
};

export default LDLink;
