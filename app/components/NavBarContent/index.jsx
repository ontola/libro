import { Resource } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import app from '../../ontology/app';

import './NavBarContent.scss';
import NavbarNavigationsMenu from './NavbarNavigationsMenu';

const NavBarContent = ({ children }) => (
  <React.Fragment>
    <NavbarNavigationsMenu />
    {children}
    <div className="NavBarContent__menus">
      <div style={{ flexGrow: 1 }} />
      <Resource subject={app.c_a} />
      <Resource subject={app.search} onError={() => null} />
      <Resource subject={app.menu} />
    </div>
  </React.Fragment>
);

NavBarContent.propTypes = {
  children: PropTypes.element,
};

export default NavBarContent;
