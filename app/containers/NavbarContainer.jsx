
import React from 'react';
import { connect } from 'react-redux';

import { Navbar } from 'components';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router';

const itemsLeft = [
  <Link className="Navbar__item Navbar__item--logo" to="/">
    <img src="/static/logo.svg" className="Navbar__item-image" alt="Argu" />
  </Link>,
];

const itemsRight = [
  <Link className="Navbar__item" to="/motions">
    <span className="Navbar__item-icon"><FontAwesome name="lightbulb-o" /></span>
    <span className="Navbar__item-text">Moties</span>
  </Link>,
  <Link className="Navbar__item" to="/politicians">
    <span className="Navbar__item-icon"><FontAwesome name="group" /></span>
    <span className="Navbar__item-text">Politici</span>
  </Link>,
];

const NavbarContainer = connect(
  () => ({
    contentLeft: itemsLeft,
    contentRight: itemsRight,
  })
)(Navbar);

export default NavbarContainer;
