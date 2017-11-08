import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import './LinkList.scss';

const propTypes = {
  links: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const LinkList = ({ links }) => {
  const generateLinks = links.map((link, i) => (
    <Link
      activeClassName="LinkList__link--active"
      className="LinkList__link"
      key={i}
      onlyActiveOnIndex
      to={link.to}
    >{link.label}
    </Link>
  ));

  return (
    <nav className="LinkList">{generateLinks}</nav>
  );
};

LinkList.propTypes = propTypes;

export default LinkList;
