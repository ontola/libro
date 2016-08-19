// @flow
import React from 'react';
import { connect } from 'react-redux';

import { Navbar } from 'components';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router';

const itemsLeft = [
  <Link className="Navbar__item Navbar__item--logo" to="/">
    <img src="/static/logo.svg" alt="Argu" />
  </Link>,
];

const itemsRight = [
  <Link className="Navbar__item" to="/motions">
    <FontAwesome name="lightbulb-o" />
    <span className="Navbar__item-text">Moties</span>
  </Link>,
  <Link className="Navbar__item" to="/politicians">
    <FontAwesome name="group" />
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
