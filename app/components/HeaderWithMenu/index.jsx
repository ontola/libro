import PropTypes from 'prop-types';
import React from 'react';

import './HeaderWithMenu.scss';
import { CardFloat } from '../../topologies/Card';

const HeaderWithMenu = ({ children, menu }) => (
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

HeaderWithMenu.propTypes = {
  children: PropTypes.element,
  menu: PropTypes.element,
};

export default HeaderWithMenu;
