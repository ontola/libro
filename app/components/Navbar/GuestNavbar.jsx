import React, { PropTypes } from 'react';

import NavbarWrapper from './NavbarWrapper';

const propTypes = {
  infoDropdown: PropTypes.object,
};

const childrenLeft = () => [
  // <ForumSelectorContainer />
];

const childrenRight = () => [
  <a className="Navbar__item Navbar__item-text" href="/users/sign_in" id="sign_in">
    <span className="fa fa-sign-in" />
    <span className="icon-left dont-hide">Sign in</span>
  </a>,
];

const GuestNavbar = props => (
  <NavbarWrapper
    contentLeft={childrenLeft()}
    contentRight={childrenRight(props)}
  />
);

GuestNavbar.propTypes = propTypes;

export default GuestNavbar;
