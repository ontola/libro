import React from 'react';

import { isDifferentWebsite } from '../../helpers/iris';
import Link, { LinkPropTypes } from '../Link';

/**
 * Link that also works for external URL's. Don't pass a href attribute.
 */
const LinkDuo = (props: LinkPropTypes): JSX.Element => {
  const {
    children,
    to,
    ...rest
  } = props;

  if (isDifferentWebsite(to)) {
    return (
      <a
        href={to}
        {...rest}
        rel="nofollow noopener noreferrer"
        target="_blank"
      >
        {children}
      </a>
    );
  }

  return <Link {...props} />;
};

export default LinkDuo;
