import React, { MouseEventHandler } from 'react';

interface PropTypes {
  className?: string;
  href?: string;
  ref?: any;
  role?: string;
  onClick?: MouseEventHandler;
  id?: string;
  tabIndex?: number;
}

const ExternalLink: React.FC<PropTypes> = ({ children, ...otherProps }) => (
  <a
    {...otherProps}
    rel="nofollow noopener noreferrer"
    target="_blank"
  >
    {children}
  </a>

);

export default ExternalLink;
