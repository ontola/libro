import React from 'react';

const ExternalLink = ({ children, ...otherProps }: {
  className?: string,
  children: React.ReactNode,
  href?: string,
  ref?: any,
  onClick?: (e: any) => any,
}) => (
  <a
    {...otherProps}
    rel="nofollow noopener noreferrer"
    target="_blank"
  >
    {children}
  </a>

);

export default ExternalLink;
