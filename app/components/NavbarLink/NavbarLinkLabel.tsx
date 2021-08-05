import React from 'react';

export interface NavbarLinkLabelProps {
  children: React.ReactNode;
}

const NavbarLinkLabel = ({ children }: NavbarLinkLabelProps): JSX.Element => (
  <div className="NavbarLink__label">
    <span className="NavbarLink__truncated-label">
      {children}
    </span>
  </div>
);

export default NavbarLinkLabel;
