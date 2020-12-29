import React from 'react';

import { CardFloat } from '../../topologies/Card';

import './HeaderWithMenu.scss';

interface PropTypes {
  menu: React.ReactNode;
}

const HeaderWithMenu: React.FC<PropTypes> = ({ children, menu }) => (
  <div className="HeaderWithMenu">
    <div className="HeaderWithMenu__header">
      {children}
    </div>
    <div className="HeaderWithMenu__menu">
      <CardFloat>
        {menu}
      </CardFloat>
    </div>
  </div>
);

export default HeaderWithMenu;
