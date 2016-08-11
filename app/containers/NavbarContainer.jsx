// @flow
import React from 'react';
import { NavbarWrapper } from 'components';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router';

function navbarLeft() {
  const items = [
    <Link className="navbar-item navbar-logo" to="/">
      <img src="/static/logo.svg" alt="Logo Argu" />
    </Link>,
    <Link className="navbar-item" to="/search">
      <FontAwesome name="search" />
      <span className="icon-left">Search</span>
    </Link>,
  ];

  return items;
}

function navbarRight() {
  const items = [
    <Link className="navbar-item" to="/motions">
      <FontAwesome name="lightbulb-o" />
      <span className="icon-left">Motions</span>
    </Link>,
    <Link className="navbar-item" to="/politicians">
      <FontAwesome name="group" />
      <span className="icon-left">Politicians</span>
    </Link>,
  ];

  return items;
}

function NavbarContainer() {
  return (
    <NavbarWrapper contentLeft={navbarLeft()} contentRight={navbarRight()} />
  );
}

export default NavbarContainer;
