import PropTypes from 'prop-types';
import React from 'react';
import { NavLink } from 'react-router-dom';

import './LinkList.scss';

const propTypes = {
  links: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    to: PropTypes.string,
  })).isRequired,
};

const LinkList = ({ links }) => {
  const generateLinks = links.map(link => (
    <NavLink
      exact
      activeClassName="LinkList__link--active"
      className="LinkList__link"
      data-test="LinkList-link"
      key={`${link.label}-${link.to}`}
      to={link.to}
    >{link.label}
    </NavLink>
  ));

  return (
    <nav className="LinkList">{generateLinks}</nav>
  );
};

LinkList.propTypes = propTypes;

export default LinkList;
