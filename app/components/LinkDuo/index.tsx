import React from 'react';

import { isDifferentWebsite } from '../../helpers/iris';
import Link, { LinkPropTypes } from '../Link';

/**
 * Link that also works for external URL's. Don't pass a href attribute.
 */
const LinkDuo = React.forwardRef<HTMLAnchorElement, React.PropsWithChildren<LinkPropTypes>>((
  props,
  ref,
): JSX.Element => {
  const {
    children,
    ...rest
  } = props;

  if (isDifferentWebsite(props.to)) {
    return (
      <a
        href={rest.to}
        {...rest}
        ref={ref}
        rel="nofollow noopener noreferrer"
        target="_blank"
      >
        {children}
      </a>
    );
  }

  return <Link {...props} />;
});

export default LinkDuo;
