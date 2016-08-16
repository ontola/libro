// @flow
import React from 'react';
import { Navbar } from 'components';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router';

function navbarLeft() {
  const items = [
    <Link className="Navbar__item Navbar__item--logo" to="/">
      <img src="/static/logo.svg" alt="Logo Argu" />
    </Link>,
    <Link className="Navbar__item" to="/search">
      <FontAwesome name="search" />
      <span className="Navbar__item-text">Search</span>
    </Link>,
  ];

  return items;
}

function navbarRight() {
  const items = [
    <Link className="Navbar__item" to="/motions">
      <FontAwesome name="lightbulb-o" />
      <span className="Navbar__item-text">Motions</span>
    </Link>,
    <Link className="Navbar__item" to="/politicians">
      <FontAwesome name="group" />
      <span className="Navbar__item-text">Politicians</span>
    </Link>,
  ];

  return items;
}

function NavbarContainer() {
  return (
    <Navbar contentLeft={navbarLeft()} contentRight={navbarRight()} />
  );
}

export default NavbarContainer;
