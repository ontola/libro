import * as schema from '@ontologies/schema';
import { useLinkRenderContext, useValues } from 'link-redux';
import React, { Ref } from 'react';

import { handle } from '../../helpers/logging';
import Link, { LinkProps } from '../Link';

export interface LDLinkProps extends Omit<LinkProps, 'to'> {
  to?: string;
}

interface PropTypesWithRef extends LDLinkProps {
  innerRef: Ref<HTMLAnchorElement | HTMLButtonElement>;
}

const LDLink: React.FC<PropTypesWithRef> = (props) => {
  const { subject } = useLinkRenderContext();
  const [url] = useValues(schema.url);

  if (!subject) {
    handle(new Error('LDLINK NO SUBJECT'));

    return <div />;
  }

  const to = props.to ?? url ?? subject.value;

  return (
    <Link
      {...props}
      to={to}
    />
  );
};

export default React.forwardRef<HTMLAnchorElement | HTMLButtonElement, LDLinkProps>((props, ref) => (
  <LDLink
    innerRef={ref}
    {...props}
  />
));
