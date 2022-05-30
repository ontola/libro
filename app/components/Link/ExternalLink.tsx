import React, { MouseEventHandler } from 'react';

export interface ExternalLinkProps {
  className?: string;
  href?: string;
  ref?: any;
  role?: string;
  onClick?: MouseEventHandler;
  id?: string;
  tabIndex?: number;
}

const ExternalLink = React.forwardRef<HTMLAnchorElement, React.PropsWithChildren<ExternalLinkProps>>(
  ({ children, ...otherProps },
    ref,
  ): JSX.Element => (
    <a
      {...otherProps}
      ref={ref}
      rel="nofollow noopener noreferrer"
      target="_blank"
    >
      {children}
    </a>
  ));

ExternalLink.displayName = 'ExternalLink';

export default ExternalLink;
